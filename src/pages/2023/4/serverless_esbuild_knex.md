---
layout: post
title: Serverless framework & esbuild & KnexでLamdaにApiをデプロイする
category: プログラミング
date: 2023-05-11
slug: serverless_esbuild_knex
tags:
  - serverless framework
---

KnexというDBのクエリビルダーライブラリがあります、このライブラリをTypeScriptから利用するとビルド時に考慮すべき部分があり、serverless_esbuidでハマってどうにかしたので記録に残します。

## Knex

[Knex.js](https://knexjs.org/) は以下のような説明がHPにあるように

> Knex.js (pronounced /kəˈnɛks/) is a "batteries included" SQL query builder for PostgreSQL, CockroachDB, MSSQL, MySQL, MariaDB, SQLite3, Better-SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.

様々なDBに対応しているクエリビルダーライブラリです。以下の様なコードを書くことで各種データベースに接続することができる様になっています。


> ```js
> import Knex from 'knex
> const knex = Knex({
>   client: 'sqlite3', 
>   connection: {
>     filename: "./mydb.sqlite"
>   }
> });
> ```
> ref: https://knexjs.org/guide/#configuration-options

`client`に文字列で利用したいDBの種類を記述し、Knexの内部的でこの文字列にマッチするDBのコネクターライブラリを選択的に動的importしています。なのでこの例ではファイル内で`sqlite3`のコネクタライブラリをimportしていなくてもnode_modules内に存在しないと実行時エラーになります。

このような動的importの仕様があるためKnexを利用する際にはモジュールバンドラーではこの点を考慮する必要があります。

## esbuildと動的import

esbuildはこの記事の執筆現在、この[issue]( https://github.com/evanw/esbuild/issues/700 )にもあるように動的importをサポートしていません。esbuildのプラグインを用いて解決することもできる様ですが根本的な解決ではありません。

esbuildのbundleオプションを用いるとエントリーポイント内からimportしているファイル群を辿ってバンドルします。デフォルトでtree-shakingが有効化されているのでエントリーポイントから辿れないパッケージはnode_modules内であってもバンドル対象には含まれません。

[serverless-offline](https://github.com/dherault/serverless-offline) のパッケージ
