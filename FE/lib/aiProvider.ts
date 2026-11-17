// Called only by server routes and server-side translation.
type Message = { role: string; content: string };

export function getAIProvider() {
  const anthropicKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (anthropicKey) {
    return {
      kind: "anthropic" as const,
      endpoint: new URL("https://api.anthropic.com/v1/messages"),
      apiKey: anthropicKey,
      model: process.env.ANTHROPIC_MODEL?.trim() || "claude-haiku-4-5-20251001",
      workspace: process.env.ANTHROPIC_WORKSPACE_ID?.trim(),
    };
  }
  const base = process.env.LITELLM_URL?.trim().replace(/\/+$/, "");
  const apiKey = process.env.LITELLM_API_KEY?.trim();
  const model = process.env.LITELLM_MODEL?.trim();
  if (!base || !apiKey || !model) return null;
  return {
    kind: "litellm" as const,
    endpoint: new URL(`${base.endsWith("/v1") ? base : `${base}/v1`}/chat/completions`),
    apiKey,
    model,
  };
}

export async function requestAI(
  provider: NonNullable<ReturnType<typeof getAIProvider>>,
  messages: Message[],
  { timeout, maxTokens, temperature }: { timeout: number; maxTokens: number; temperature?: number },
) {
  const { endpoint, apiKey, model } = provider;
  const anthropic = provider.kind === "anthropic";
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const body = anthropic ? {
    model,
    max_tokens: maxTokens,
    system: messages.filter(m => m.role === "system").map(m => m.content).join("\n\n"),
    messages: messages.filter(m => m.role !== "system"),
  } : { model, messages, temperature, max_tokens: maxTokens };
  if (anthropic) {
    headers["x-api-key"] = apiKey;
    headers["anthropic-version"] = "2023-06-01";
    if (provider.workspace) headers["anthropic-workspace-id"] = provider.workspace;
  } else {
    headers.Authorization = `Bearer ${apiKey}`;
  }
  const response = await fetch(endpoint.href, {
    method: "POST", headers, signal: AbortSignal.timeout(timeout), body: JSON.stringify(body),
  });
  if (!response.ok) return { ok: false as const, status: response.status };
  const data = await response.json();
  const content: unknown = anthropic
    ? (Array.isArray(data.content) ? data.content.filter((block: {type?: string; text?: unknown}) => block?.type === "text" && typeof block.text === "string").map((block: {text: string}) => block.text).join("") : undefined)
    : data.choices?.[0]?.message?.content;
  return { ok: true as const, content };
}
