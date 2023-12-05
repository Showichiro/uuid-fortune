"use client";
import { FC, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {
  prevResult: string | null;
  fortune: (previousState: string, formData: FormData) => Promise<string>;
};

const Submit: FC = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "生成中..." : "このUUIDで占う"}
    </button>
  );
};

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

export const UUID: FC<Props> = ({ prevResult, fortune }) => {
  const [uuid, setUuid] = useState("");
  const [state, formAction] = useFormState(fortune, "");
  return (
    <div>
      {(prevResult ?? state) === "" && (
        <form action={formAction}>
          <div>
            <button type="button" onClick={() => setUuid(crypto.randomUUID())}>
              {uuid === "" ? "UUIDを生成する" : "UUIDを再生成する"}
            </button>
          </div>
          <div>{uuid === "" ? "ここにUUIDが表示されます。" : uuid}</div>
          <input type="hidden" name="uuid" value={uuid} />
          {uuid !== "" && <Submit />}
        </form>
      )}
      <Result text={prevResult ?? state} />
    </div>
  );
};
