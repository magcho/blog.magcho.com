---
layout: post
title: Serverless frameworkでlamdaの200MB上限を超える
category: プログラミング
date: 2023-02-08
tags:
  - "serverless framework"
---


AWS Lamdaにデプロイをする場合は以下のようなファイルサイズ制限があります。

> デプロイパッケージ (.zip ファイルアーカイブ) のサイズ50 MB (zip 圧縮済み、直接アップロード) 250 MB (解凍後)[^1]

Serverless frameworkでデプロイする際もこの制限を受けます。この計算には関数実行に必要なものすべての合計になるのでアセットなどのプログラム以外も含みます。MLのモデルデータやsqliteファイルなどが原因で250MBをこえる場合に対応する話をします。


アセットデータをs3に別途保存しておきlamda起動時に毎回ダウンロードすることで回避はできるのですが、せっかくstart upが早いlamdaを利用しているのに関わらずs3からのダウンロード分の時間が追加でかかってしまうのは残念です。ここは別の手段としてカスタムランタイム機能を利用してみます。

## カスタムランタイム

> AWS Lambda は、ネイティブでは、Java、Go、PowerShell、Node.js、C#、Python、Ruby のコードをサポートしています。[^3]

Lamdaでは以上の言語をサポートしています、これ以外の言語を実行する際にはランタイムを載せた(docker) conitanerを作り、これをを用いるカスタムランタイムが利用できます。このカスタムランタイムですがネイティブ実行の場合と比べても遜色ないほどcold upが早いです。AWSすごい

> Lambda では、最大 10GB のイメージをサポートしています。[^4]

そして何よりカスタムランタイムであれば最大10GBのイメージサイズまで扱えます。もちろんこのサイズはOSやNode.js runtimeを含めたものであるため10GBまでのアセットを使えるわけではありませんが数GBであればこの方法で対応できます。AWSすごい


## Serverless frameworkでカスタムランタイムを利用する

Lamda上で動作するコンテナイメージを作る為には[AWSが専用に用意するベースイメージ](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/runtimes-images.html)を利用することを推奨しています。

Amazon LinuxのベースイメージにNode.jsをインストールすることから始めることもできますが、Node.jsをインストール済みのイメージもAWS公式で用意されているのでこちらを利用して

```Dockerfile
FROM public.ecr.aws/lambda/nodejs:16

COPY database.sqlite3 /var/task

COPY package.json /var/task
COPY package-lock.json /var/task

RUN npm ci

COPY ./dist/app.mjs /var/task

CMD ["app.get"]
```

ドキュメント ["AWS ベースイメージからのイメージの作成"](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/images-create.html#images-create-from-base)を参考にこのようなDockerfileを書きます。


Lamdaの実行に必要なファイルはすべて`/var/task`ディレクトリに入れること、実行したいjsファイルのなかでエントリーポイントとなる関数を１つnamed exportしておき`CMD [{ファイル名}.{関数名}]`を記述しておきます。

`docker build`でビルドした後lamdaを実行するAWSアカウントでECRにレジストリを１つ作りそこにイメージをアップロードしておきます。`xxxxxxxxxxxxxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/xxxxxxxxxxxx:xxxxxxxxxxxxxx`のようなURIになると思います。

これをserverless.ymlに`handler`の代わりに`image`を以下のように記載して

```yaml
service: test
frameworkVersion: "3"

functions:
  hello:
    # handler: "app.get" <- 不要
    image: "xxxxxxxxxxxxxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/xxxxxxxxxxxx:xxxxxxxxxxxxx"
```

`sls deploy`するとOKです。コマンド実行時のユーザーにはECRのdescribe権限などが追加で必要になるので権限不足のエラーメッセージをみながら調整すると良さそうです。


## カスタムランタイムも`sls offline`で動かしたい

`sls offline`プラグインを用いてローカルでAPIを起動してもカスタムランタイムの部分は起動しません。offline pluginは`handler`に記載されたファイルを実行するためです。

そこで`serverless.yaml`の中をローカル時は`handler`デプロイ時は`image`を使うようにしたいのですがyamlで分岐処理を書くのは大変そうで諦めました(書けないこともないらしい)yamlを書くよりjsを書く方が慣れているのでここをjsで書きましょう。

そもそもserverless.yamlをやめてserverless.jsに置き換えてしまうこともできるのですが、すでにyamlで多くの設定を行なっているなどの理由で書き直ししたくないなーって時は一部だけjsを使うという方法が取れます

```yaml:title=serverless.yaml
service: test
frameworkVersion: "3"

functions: ${file('./hogehuga.cjs'):functions}
```

```javascript:title=hogehuga.cjs
module.exports.functions = () => {
  if('offlineの判定'){
    return {
      hello:{
        handler: 'app.get'
      }
    }
  }else{
    return {
      hello:{
        image: 'xxxxxxxxxxxxxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/xxxxxxxxxxxx:xxxxxxxxxxxxx'
      }
    }
  }
}
```

yaml内で`file(jsファイル名.関数名)`と書くとslsコマンド実行時にjsファイルが評価され、serverless.yamlの内容として扱われるのでどのランライムを利用するかの判定をjsで行うことができます。

この方法で`sls offline`と`sls deploy`時それぞれで判定されるようにjsを書いておけばローカルではNode.jsランタイム・lamdaではカスタムランタイムが利用できます。


[^1]: https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/gettingstarted-limits.html#function-configuration-deployment-and-execution
[^2]: https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/runtimes-custom.html
[^3]: https://aws.amazon.com/jp/lambda/faqs/
[^4]: https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/images-create.html#images-types
