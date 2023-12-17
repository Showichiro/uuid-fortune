import { set } from "@/app/_server_functions/kv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(req: Request) {
  const json = await req.json();

  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k-0613",
    messages: [
      {
        role: "system",
        content: `あなたはUUIDに基づいて占いを行う占い師です。占い結果は総合運・仕事運(勉強運)・恋愛運・金運・ラッキーアイテムについて記載してください。UUIDのどの部分を見て判断したのかについても記載してください。`,
      },
      {
        role: "user",
        content: `UUIDは${json.messages[0].content}です。今日の運勢を教えてください`,
      },
    ],
    temperature: 0.7,
    stream: true,
  });

  const stream = OpenAIStream(res, {
    onFinal(completion) {
      set(completion);
    },
  });

  return new StreamingTextResponse(stream);
}
