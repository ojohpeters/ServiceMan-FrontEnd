// src/lib/apiRequest.ts
const BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000/api/v1";

async function throwIfNotOk(res: Response) {
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status}: ${text || res.statusText}`);
  }
}

export async function apiRequest(method: string, endpoint: string, data?: any, opts: RequestInit = {}): Promise<Response> {
  const url = `${BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const headers: HeadersInit = { ...(data ? { "Content-Type": "application/json" } : {}) };
  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
    ...opts,
  });
  await throwIfNotOk(res);
  return res;
}