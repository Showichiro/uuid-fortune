"use server";
import { OpenAI } from "openai";
import { set } from "./kv";

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
