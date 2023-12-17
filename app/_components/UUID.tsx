"use client";
import { useChat } from "ai/react";
import { FC } from "react";

type Props = {};

const Result: FC<{ text: string }> = ({ text }) => {
  return (
    <div>
      {text !== "" && (
        <div>
          占い結果は以下のとおりです。
          <div>
            {text.split("\n").map((val, i) => (
              <div key={`${i}`}>{val}</div>
            ))}
          </div>
        </div>
      )}
      {text !== "" && <div>占い結果は一日立つと消えます。</div>}
    </div>
  );
};

export const UUID: FC<Props> = () => {
  const { handleSubmit, messages, input, setInput } = useChat();
  return (
    <div>
      {messages.length === 0 && (
        <form onSubmit={handleSubmit}>
          <div>
            <button type="button" onClick={() => setInput(crypto.randomUUID())}>
              {input === "" ? "UUIDを生成する" : "UUIDを再生成する"}
            </button>
          </div>
          <div>{input === "" ? "ここにUUIDが表示されます。" : input}</div>
          {input !== "" && <button type="submit">このUUIDで占う</button>}
        </form>
      )}
      <Result
        text={messages
          .slice(1)
          .map((val) => val.content)
          .join()}
      />
    </div>
  );
};
