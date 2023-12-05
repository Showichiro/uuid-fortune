"use server";

import { cookies } from "next/headers";

type SessionId = string;

export async function getSessionId(): Promise<SessionId | undefined> {
  const cookieStore = cookies();
  return cookieStore.get("session-id")?.value;
}

export async function setSessionId(sessionId: SessionId): Promise<void> {
  const cookieStore = cookies();
  cookieStore.set("session-id", sessionId);
}

export async function getSessionIdAndCreateIfMissing(): Promise<SessionId> {
  const sessionId = await getSessionId();
  if (!sessionId) {
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);

    return newSessionId;
  }

  return sessionId;
}
