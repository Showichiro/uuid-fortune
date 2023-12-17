import { UUID } from "./_components/UUID";

export default async function Home() {
  return (
    <main>
      <h1>UUID占い</h1>
      <div>あなたが生成したUUIDに基づいて今日の運勢を占います。</div>
      <UUID  />
    </main>
  );
}
