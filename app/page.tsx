import { cookies } from "next/headers";
import { kv } from "@vercel/kv";
import { UUID } from "./_components/UUID";
import { OpenAI } from "openai";

export async function fortune(_: string, formData: FormData): Promise<string> {
  "use server";
  const uuid = formData.get("uuid") as string | null;
  if (uuid === null) {
    throw Error("uuid not found");
  }
  const ai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
  const result = await ai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `あなたはUUIDに基づいて占いを行う占い師です。占い結果は総合運・仕事運(勉強運)・恋愛運・金運・ラッキーアイテムについて記載してください。UUIDのどの部分を見て判断したのかについても記載してください。`,
      },
      {
        role: "user",
        content: `UUIDは${crypto.randomUUID()}です。今日の運勢を教えてください`,
      },
    ],
    model: "gpt-3.5-turbo-16k-0613",
  });
  const text = result.choices[0].message.content ?? "生成に失敗しました";
  return text;
}

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

export async function get() {
  "use server";
  const sessionId = getSessionId();
  if (!sessionId) {
    return null;
  }
  return kv.get<string>(`session-${sessionId}`);
}

export async function set(value: string) {
  const sessionId = getSessionIdAndCreateIfMissing();
  return kv.set(`session-${sessionId}`, value);
}

export default async function Home() {
  const prevResult = await get();
  return (
    <main>
      <h1>UUID占い</h1>
      <UUID prevResult={prevResult} fortune={fortune} />
    </main>
  );
}
