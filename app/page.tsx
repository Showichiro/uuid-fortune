import { UUID } from "./_components/UUID";
import { fortune } from "./_server_functions/fortune";
import { get } from "./_server_functions/kv";

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
