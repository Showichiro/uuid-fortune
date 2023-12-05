"use server";

import { cookies } from "next/headers";

type SessionId = string;

export async function getSessionId(): Promise<SessionId | undefined> {
  "use server";
  const cookieStore = cookies();
  return cookieStore.get("session-id")?.value;
}

export async function setSessionId(sessionId: SessionId): Promise<void> {
  "use server";
  const cookieStore = cookies();
  cookieStore.set("session-id", sessionId);
}

export async function getSessionIdAndCreateIfMissing(): Promise<SessionId> {
  "use server";
  const sessionId = await getSessionId();
  if (!sessionId) {
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);

    return newSessionId;
  }

  return sessionId;
}
