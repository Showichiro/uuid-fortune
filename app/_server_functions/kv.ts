"use server";
import { kv } from "@vercel/kv";
import { getSessionId, getSessionIdAndCreateIfMissing } from "./session";

export async function get() {
  "use server";
  const sessionId = await getSessionId();
  if (!sessionId) {
    return null;
  }
  return kv.get<string>(`session-${sessionId}`);
}

export async function set(value: string) {
  "use server";
  const sessionId = await getSessionIdAndCreateIfMissing();
  const oneDay = 24 * 60 * 60;
  return kv.setex(`session-${sessionId}`, oneDay, value);
}
