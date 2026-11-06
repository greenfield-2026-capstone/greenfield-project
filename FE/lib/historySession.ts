import { createHmac, timingSafeEqual } from "node:crypto";

export const historyCookie = "histour-history-session";
export const sessionAge = 60 * 60 * 24 * 7;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function signature(value: string) {
  const secret = process.env.HISTORY_SESSION_SECRET;
  return secret && secret.length >= 32 ? createHmac("sha256", secret).update(value).digest() : null;
}

export function issueHistorySession(user: { id?: unknown; email?: unknown }) {
  const id = user.id;
  const validId = typeof id === "number"
    ? Number.isSafeInteger(id)
    : typeof id === "string" && (uuid.test(id) || /^-?\d+$/.test(id));
  if (!validId || typeof user.email !== "string") return null;
  const value = Buffer.from(JSON.stringify({ id: String(id), email: user.email, expires: Date.now() + sessionAge * 1000 })).toString("base64url");
  const mac = signature(value);
  return mac ? value + "." + mac.toString("base64url") : null;
}

export function readHistorySession(token?: string): { id: string; email: string } | null {
  const [value, encodedMac, extra] = token?.split(".") ?? [];
  if (!value || !encodedMac || extra !== undefined) return null;
  const expected = signature(value);
  const actual = Buffer.from(encodedMac, "base64url");
  if (!expected || actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  try {
    const session = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
    return session.expires > Date.now() ? { id: session.id, email: session.email } : null;
  } catch {
    return null;
  }
}
