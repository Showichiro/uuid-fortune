# uuid-fortune

UUIDを生成して、AIがUUIDに基づいて占いをしてくれるアプリです。

# 技術スタック

Next v14を利用しています。app routerでアプリを作っています。UUIDをクライアントから送信する過程で[Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)を利用しています。  
session管理のために[`@vercel/kv`](https://vercel.com/docs/storage/vercel-kv)を利用しています。  
AIはOpenAIを利用しています(gpt-3.5-turbo-16k-0613)。
パッケージマネージャーはpnpmを利用しています。


# 環境変数

OpenAIのAPIキー及びvercel/kvのRedisのURL等々の設定が必要です。
具体的には以下の変数の設定が必要です。

```
OPENAI_KEY=
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

# アプリ起動

```
pnpm run dev
```

=> `http://localhost:3000`にアクセスすることでアプリを開くことができます。