---
layout: post
title: 既存プロジェクトに後からopenapiを追加してAxiosのリクエストをJestでテストしたい
category: プログラミング
date: 2022-09-19
tags:
  - Jest
---

スタート当初はOpenAPIが存在せず、仕様を整理する目的で後からOpenAPIが追加されたプロジェクトがありました。OpenAPIの仕様を満たせているかは人力でレビューするのみでありスキーマを定義した旨味がないなーと思っていたので後からOpenAPIを追加した場合でも仕様を満たせていることを担保できる仕組みを整備しました。

SwaggerもといOpenAPIはAPIの定義ファイルから [openapi-generator-cli](https://github.com/OpenAPITools/openapi-generator-cli) などを利用して定義通りのリクエストであることを担保できます。しかしこの方法はプロジェクト立ち上げ時の既存コードがない状態ではいいですが、既存のコードがあるとこの自動生成コードに置き換える必要があり大変です。

既存コードではAxiosでリクエストを行いJestの単体テストを行う環境が整備されていたのでここに乗っかる形で自動テスト時にOpenAPIの仕様を満たせているかを担保したいと思います。

## Axiosはリクエスト直前に処理を追加できる

Aixosには[Interceptors](https://axios-http.com/docs/interceptors)というリクエストとレスポンスの直前・直後のそれぞれに処理を追加できる機構が存在します

```typescript
const axios = Axios.create()

axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // リクエスト直前のここでOpenAPIの定義通りのリクエストになっているかを判定する
})
```

テスト時のみリクエスト直前でOpenAPIの定義通りになっているかを判定するようにしておき、この場所でOepnAPIのvalidationを行なっていきます。

## AxiosのリクエストがOpenAPIの定義通りかでvalitionチェックする

Validationには[openapi-request-validator](https://www.npmjs.com/package/openapi-request-validator)を利用します。このライブラリだけではOpenAPIのyamlファイルが読めないので別途[@apidevtools/swagger-parser](https://www.npmjs.com/package/@apidevtools/swagger-parser)を用います。

これらのライブラリを用いてテストするとこのようになります

```typescript
import swaggerParser from '@apidevtools/swagger-parser'
import OpenAPIRequestValidator from 'openapi-request-validator'

const testRequset = {
  headers: {
    Authorization: `token xxxxxxxxxxxxxxxxxxxxxx`,
    'content-type': 'application/json',
  },
  body: {
    hoge: 'huga',
  },
  params: {
    foo: 'bar',
  },
}

const OPEN_API_FILE_PATH = '/path/to/openapi.yml'

const openapi = await swaggerParser.parse(OPEN_API_FILE_PATH)

// 今回リクエストする定義を取り出す
const requestUrl = '/api/sample'
const requestMethod = 'get'
const requestBodyDefinition = openapi.paths[requestUrl][requestMethod].requestBody

// 取り出した定義でvalidatorを作る
const validator = new OpenAPIRequestValidator({ requestBody: requestBodyDefinition })

// リクエストが定義に一致するか確認する
const error = validator.validateRequest(testRequset)

if (error === undefined) {
  // 定義通りで問題がない時
} else {
  // 定義とは異なるリクエストを送ろうとしている時
}
```

validatorを作るときにファイル全体ではなく検査対象のリクエスト定義のみに絞って引数に与える必要があります。

## Axiosのintersepter内でvalidationする

上記の２つを組み合わせると

```typescript
import axios, { AxiosRequestConfig } from 'axios'
import swaggerParser from '@apidevtools/swagger-parser'
import OpenAPIRequestValidator from 'openapi-request-validator'

async function createAxiosInstanceWithRequestValidator() {
  const OPEN_API_FILE_PATH = '/path/to/openapi.yml'
  const openapi = await swaggerParser.parse(OPEN_API_FILE_PATH)

  const axios = Axios.create()

  axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const requestBodyDefinition = openapi.paths[config.url][config.method].requestBody

    const validator = new OpenAPIRequestValidator({ requestBody: requestBodyDefinition })

    const error = validator.validateRequest(testRequset)

    let signal = {}
    if (error === undefined) {
      signal = { isValid: true, errors: [] }
    } else {
      signal = { isValid: false, errors: error.errors }
    }
    throw signal
  })

  return axios
}
```

Jestで検査している都合上エラーではなくテスト内部からJestにテスト結果を伝えるためにthrowで大域脱出しています

そして実際にJestで扱うためにSignalをいい感じに受け取ってJestに渡してくれる以下のようなヘルパーを用意して

```typescript
async function validationHelper(handler: Promise<unkown>): Promise<Boolean> {
  // リクエストのバリデーション結果は大域脱出でthrowされてくるのでキャッチする
  try {
    await handler
  } catch (signal) {
    if (signal instanceof Error) {
      // 通常のエラーであれば再度エラーを投げ直す
      throw signal
    }
    const validateRequestResult = signal as { isValid: boolean; errors?: any }

    if (validateRequestResult.isValid === false) {
      throw Error('リクエストがOpenAPIの定義通りではありません')
    }

    // リクエストが定義通りに行われた場合はTrueを返す
    return true
  }
}
```

そして実際のテストは

```typescript
describe('リクエストが定義通りかどうかのテスト', () => {
  test('/hogeへのgetリクエストはOpenAPIの定義通りである', async () => {
    const axios = await createAxiosInstanceWithRequestValidator()

    const requestHandler = axios.get('/hoge', { a: 'A' })

    await expect(validationHelper(requestHandler)).resolved.toBe(true)
  })
})
```

このように検査できます。これでめでたくリクエストが定義通りでない場合はvalidationHelperがエラーを投げるのでJestでfaliするようになりました。

## 最後に

スキーマーファーストではないものの、Axiosのintersepterを用いてテストすることで既存のAxiosの実装コードに手を加えることなくテストコードのみの追加で既存のリクエスト部分をテスト時にvalidationすることができました。

私はテスト時のみこの確認を行なっていますが本番時にもvalidationしたければ同様にintersepterをして、今回のhelperにあたる部分を用意するだけの２点の変更で実現できると思います。
