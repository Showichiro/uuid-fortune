# uuid-fortune

UUIDを生成して、AIがUUIDに基づいて占いをしてくれるアプリです。

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