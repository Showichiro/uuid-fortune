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
  try {
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
    set(text);
    return text;
  } catch (e) {
    console.error(e);
    return "生成に失敗しました";
  }
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

export default async function Home() {
  const prevResult = await get();
  return (
    <main>
      <h1>UUID占い</h1>
      <div>
        UUID(Universally Unique
        IDentifier)は340,282,366,920,938,463,463,374,607,431,768,211,456通りの可能性がある文字列です。
        人の選択したUUIDと重複する可能性は殆どありません。つまり、あなたがUUIDを選択することで、星占いや血液型占いよりもパーソナライズされた占いを行うことができます。
      </div>
      <UUID prevResult={prevResult} fortune={fortune} />
    </main>
  );
}
