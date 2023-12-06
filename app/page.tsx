import { UUID } from "./_components/UUID";
import { fortune } from "./_server_functions/fortune";
import { get } from "./_server_functions/kv";

export default async function Home() {
  const prevResult = await get();
  return (
    <main>
      <h1>UUID占い</h1>
      <div>あなたが生成したUUIDに基づいて今日の運勢を占います。</div>
      <UUID prevResult={prevResult} fortune={fortune} />
    </main>
  );
}
