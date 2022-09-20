---
layout: post
title: AxiosにJWTつけてレスポンスに型もつけたい
category: プログラミング
date: 2021-06-11
tags:
  - TypeScript
---

JWTを用いたAPIリクエストをするSPAをReactで作っていた中で、全てのAxiosのリクエストのヘッダーにJWTを付与してさらにレスポンスに型をつけたかった。

SPAからバックエンドサーバーに通信する際のリクエストヘッダーに`Bearer: {JWT}`を付与したく、さらにはJWTの有効期限が切れている場合は勝手にJWTを更新した上でリクエストをする仕組みが欲しかった。

## axiosのレスポンスに型をつける

Axiosの型定義を見ると`AxiosResponce<T = any>`といった形でレスポンスの型情報[^1]に型パラメータが使える。

```TypeScript
export interface AxiosResponse<T = any>  {
  data: T;  // 👈
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}
```

しかし、Axiosは非同期的に使うと思うので`await axios.get()`の返り値は`AxiosPromise`ですが、以下のような型定義[^2]なので同じとみなせます。

```typescript
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}
```

ということは、以下のようなコードがかけます。

`https://example.com/api/`のレスポンスが以下の型である時

```typescript
interface ApiResponceType {
  name: string
  id: string
}
```

リクエストするAxiosのコードは

```typescript
import axios, { AxiosRequestConfig, AxiosResponce } from 'axios'

const responce = await axios.get<ApiResponceType>('https://example.com/api/')

responce.data // ここの型がApiResponceTypeになる
```

## Bearerヘッダーを付与・JWTの有効期限も考慮する

axiosのインスタンスを作り、そこにBearerヘッダーを付与しておきます。さらにaxiosのrequest/responceにミドルウェア的に処理を挟み込める仕組みとしてinterrceptors[^4]があるので、これを用いてJWTの有効期限が切れていた時はJWTの更新・再リクエストをおこないます。

```typescript
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

export const apiClient = async <T, R = AxiosResponse<T>>(
  url: string,
  method: 'get' | 'post',
  data?: any,
  headers?: Map<string, string>,
  ...requestConfig: any
): Promise<R> => {
  if (!user) {
    throw new Error('undefined currentuser')
  }
  const jwtToken = getJwtToken() // 👈 任意の方法で保持しているJWT

  const config: AxiosRequestConfig = {
    ...requestConfig,
    url: url,
    method: method,
    data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
      ...headers,
    },
  }

  const customAxios = axios.create()

  let isRetry = false
  customAxios.interceptors.response.use(
    (res: AxiosResponse<T>) => res,
    async (error: AxiosError) => {
      if (error.response?.status === 401 && isRetry) {
        // 👈 JWT有効期限切れかつ一回目のリクエストである時
        isRetry = true
        await refreshJwtToken()

        const originalRequestConfig = error.config
        return customAxios.request(originalRequestConfig) // 👈 再度リクエスト
      } else {
        return Promise.reject(error)
      }
    }
  )
  return customAxios.request(config)
}

const responce = apiClient<ApiResponceType>('https://example.com/api/', { id: 1 })
responce.data // 👈 ApiResponceTypeの型がつく
```

[^1]: https://github.com/axios/axios/blob/e9965bfafc82d8b42765705061b9ebe2d5532493/index.d.ts#L83-L90
[^2]: https://github.com/axios/axios/blob/e9965bfafc82d8b42765705061b9ebe2d5532493/index.d.ts#L101
[^3]: https://github.com/axios/axios/blob/e9965bfafc82d8b42765705061b9ebe2d5532493/index.d.ts#L137-L154
[^4]: https://axios-http.com/docs/interceptors
