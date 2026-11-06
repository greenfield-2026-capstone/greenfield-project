import { NextRequest, NextResponse } from "next/server";
import { historyCookie, issueHistorySession, sessionAge } from "@/lib/historySession";

function clearSession(response: NextResponse) {
  response.cookies.set(historyCookie, "", { path: "/", maxAge: 0 });
  return response;
}

export async function POST(request: NextRequest) {
  try {
    const { mode, email, password, name } = await request.json();
    if ((mode !== "login" && mode !== "signup") || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid account request" }, { status: 400 });
    }
    const base = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080").replace(/\/+$/, "");
    const result = await fetch(base + "/auth/" + mode, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
      signal: AbortSignal.timeout(15000),
    });
    if (!result.ok) return NextResponse.json({ error: "Account request failed" }, { status: result.status });
    const data = await result.json();
    const response = NextResponse.json({ user: data.user });
    const token = mode === "login" && data.user ? issueHistorySession(data.user) : null;
    if (!token) return clearSession(response);
    response.cookies.set(historyCookie, token, {
      httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: sessionAge,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Account unavailable" }, { status: 502 });
  }
}

export function DELETE() {
  return clearSession(new NextResponse(null, { status: 204 }));
}
