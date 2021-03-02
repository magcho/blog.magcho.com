---
layout: post
title: MySQL, Nginx(Openresty)で動的リバースプロキシ
category: プログラミング
date: 2021-01-24
tags:
  - Nginx
---

開発検証のために本番環境ドメイン(example.com)のサブドメインに PR 名を付与した(PR-1.example.com)を staging 環境として公開した手順メモ

今回は 1 台の VPS 内に Jenkins を用い PR 数分の docker-compose コンテナ群を作り、空いている任意のポートに公開したのち Nginx を用いて{PR 名}.example.com へのアクセスを 127.0.0.1:{公開中のポート}にリバースプロキシしていきます。

## 概要

vps 内で稼働している DB に以下のようにサブドメインと port 番号のペアを登録しておき、これらを Nginx から読み込んで`PR-16.example.com`へのアクセスを`127.0.0.1:49161`へ転送する。

```sql
mysql> select * from rpx;
+-----------+-------+
| subdomain | port  |
+-----------+-------+
| PR-16     | 49161 |
| PR-17     | 49162 |
| PR-19     | 49164 |
+-----------+-------+
3 rows in set (0.00 sec)
```

## 構成

- ubuntu18.04.5
- Nginx(Openresty)
- lua-nginx-module
- mysql-nginx-module
- MySQL

Nginx 動的リバースプロキシで検索すると Redis を用いた例が多く出てくる。今回は検証環境なのでアクセス数や処理性能は考えなくていいので手軽に MySQL にした。

## 手順

### Openresty のセットアップ

Nginx の config ファイル内に Lua を用いて MySQL へのアクセス処理を記述する。通常の`apt install nginx`でインストールできる Nignx には lua-module が含まれていないので自分で Nginx をビルドし直すか諸モジュールが含まれる Openresty ビルド版をインストールする必要がある。今回は既存の Nginx を止め Openresty をインストールした。手順は[Openresty document](https://openresty.org/en/linux-packages.html#ubuntu)

この VPS では別の web アプリケーションを動かしていたので、その設定を Nginx から引き継ぐために Openresty の設定を変更する。`/usr/local/openresty/nginx/conf/nginx.conf`が最初に読み込まれる設定ファイル。デフォルトの設定のうち必要ない server 部をコメントアウトし、既存の Nignx の設定を読みにいくように末尾に`include /usr/local/openresty/nginx/conf/conf.d/*.conf;`を書き加えシンボリックリンクを貼る

```diff-conf:title=/usr/local/openresty/nginx/conf/nginx.conf
~~~~
    # HTTPS server
+   #
+   #server {
+   #    listen       443 ssl;
+   #    server_name  localhost;
+
+   #    ssl_certificate      cert.pem;
+   #    ssl_certificate_key  cert.key;
+
+   #    ssl_session_cache    shared:SSL:1m;
+   #    ssl_session_timeout  5m;
+
+   #    ssl_ciphers  HIGH:!aNULL:!MD5;
+   #    ssl_prefer_server_ciphers  on;
+
+   #    location / {
+   #        root   html;
+   #        index  index.html index.htm;
+   #    }
+   #}
+   include /usr/local/openresty/nginx/conf/conf.d/*.conf;
 }

```

```bash
$ sudo ln -s /etc/nginx/conf.d /usr/local/openresty/nginx/conf/conf.d/
```

設定変更後 Openresty を有効化して動作を確認する。

### MySQL の準備

subdomain と port の対応を示すための DB を作りアクセスする用のユーザーも作る

```sql
CREATE database databasename;
CREATE USER 'username'@'localhost' IDENTIFIED by 'password';
GRANT SELECT ON databasename.* TO 'username'@'localhost' IDENTIFIED BY 'password';
CREATE TABLE tablename(subdomain VARCHAR(255) PRIMARY KEY, port INT);
```

Nginx からは DB の読みとり権限だけ必要なので当該ユーザーに SELECT 権限を与えておきます。別途転送したいサブドメインと port 番号を insert する処理を作っておきましょう。

### Nginx の設定ファイルへの Lua スクリプトの記述

```conf:title=/etc/nginx/conf.d/hoge.conf
server{
listen 443 ssl;
	server_name ~^(?<subdomain>[^\.]+).example.com$;
	location / {
		proxy_set_header X-Forwarded-Host $host:$server_port;
		proxy_set_header X-Forwarded-Proto $scheme;
		set $localport "";
		rewrite_by_lua '
			local mysql = require "resty.mysql"

			local db, err = mysql:new()
			if not db then
				ngx.say("failed to instantiate mysql: ", err)
				return
			end
			local ok, err, errcode, sqlstate = db:connect{
				host = "127.0.0.1",
				port = 3306,
				database = "databasename",
				user = "username",
				password = "password",
				charset = "utf8",
				max_packet_size = 1024 * 1024,
			}
			if not ok then
				ngx.log(ngx.ERR, "failed to connect: ", err, ": ", errcode, " ", sqlstate)
				return ngx.exit(500)
			end

			res, err, errcode, sqlstate = db:query("select port from tablename where subdomain = \'" ..ngx.var.subdomain.. "\' limit 1;")
			if not res then
				ngx.log(ngx.ERR, "bad result #1: ", err, ": ", errcode, ": ", sqlstate, ".")
				return ngx.exit(404)
			else
				ngx.var.localport = res[1]["port"]
			end
		';
		proxy_pass http://127.0.0.1:$localport;
		break;
	}
}
```

server 部の server_name で`~^(?<subdomain>[^\.]+).example.com$;`としてサブドメインに subdomain という名前をつけてマッチしておくと後続の処理で変数として利用することができる。

lua から Nginx conf の変数を参照・代入することができる。しかし lua で新しい変数を宣言することはできないので先に変数`localport`を宣言しておくと lua から`ngx.env.localport`でアクセスできる。

db:query()に SQL クエリを入れて実行する。Lua の結合演算子`..`を利用できます。クエリの実行結果は`res`に２次元の配列(table)で返却されます。Lua は 1 based index な言語なので最初の要素の index は 1 です、クエリに`limit 1`をかけているので`res[1]['port']`で転送すべき port 番号が分かります。なのでこの番号に`proxy_pass`すれば OK です。

## おまけ

サブドメインが可変なので https にするには毎回発行・無効化せずワイルドカード証明書を当てておきます。ワイルドカード証明書は DNS 認証しかできないので

```bash
sudo certbot certonly \
  --manual \
  --domain *.example.com \
  --email mail@example.com \
  --agree-tos \
  --manual-public-ip-logging-ok \
  --preferred-challenges dns
```

表示された文字列をネームサーバの TXT レコードに登録し認証すれば OK。

自動更新するにはネームサーバーのレコード登録を自動化する必要があり外部 API に対応したネームサーバにすると良さそうです。

## 参考

- https://blog.ssrf.in/post/2017-08-09-dynamic-reverse-proxy-with-nginx/
- https://github.com/openresty/lua-nginx-module
- https://github.com/openresty/lua-resty-mysql
