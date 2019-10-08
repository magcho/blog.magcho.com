---
layout: post
title: Dockerで立ち上げたwebサーバでmod_rewriteしたかった話
category: プログラミング
tags:
  - Docker
date: 2017-08-11
---

## 内容

DockerHub の公式の PHP イメージを使っていて、mod_rewite したい人向けのお話です。結論だけ知りたい人は読み飛ばしてね。

## 事の発端

僕自身が立ち上げた web サービスではもともと URL が`http://example.com/index.php?cmd=view&page=123`という感じでとてもダサかったので、かっこよくしたかった。WordPress などではパーマリンクと呼ばれ URL がイカした感じになっているので、僕も方法をパクった。
調べると apache 側の設定で mod_rewrite を使うとアクセス時に URL を記述したルールに基づいて置換してくれるらしい。

僕の web サービスではアクセスを全て index.php で受け、get パラメータで動作を変化させている、pukiwiki とか？の設計をパクったはず。動作ルールは以下

`example.com/index.php?cmd=[動作モード]&page=[記事のNo.]`

- cmd
  - view 記事の表示、page で記事を指定
  - edit 記事の編集、page で記事を指定
  - category カテゴリーごとに記事一覧を表示する　　などなど

これを`example.com/[動作モード]/[記事のNo.]`にしたかった。
さらに view の時には`example.com/[記事のNo.]`にしたい。

このルールで URL を置換させるには.htaccess に

```:title=.htaccess
RewriteEngine On
RewriteBase /
RewriteRule ^([0-9]+) index.php?cmd=view&page=$1 [L]
RewriteRule ^edit/([0-9]+) index.php?cmd=edit&page=$1 [L]
RewriteRule ^edit index.php?cmd=edit [L]
RewriteRule ^category index.php?cmd=category [L]
```

のように記述する、よくある正規表現と似ているので特に迷うことはないだろう。

いざ、Docker で立てた開発環境に置いてみると、500 エラー。なんで！！
しばらく悩むも解決せず、諦めて本番環境に置いてみると動いた！なんで！！

理由は単純だった、使っているシステムが違った。どちらも apache なのは違いないが、本番は CentOS で構成されており、開発環境の Docker の公式 image の php は debian で構成されていた。

[https://github.com/docker-library/php/blob/2630167f7e69394bdd91f240443a0a521fd7872d/7.0/apache/Dockerfile:embed:cite]

debian 系の apache で mod_rewrite を有効化するにはコンテナに入ってコマンドを打てばいいらしい。

```
$ docker exec -it {php_container_name} bash
$ a2enmod rewrite
```

そして/etc/apache2/sites-available/000-default.conf の<VirtualHost \*:80>の中に

```
    <Directory /var/www/html>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>
```

を追加して再起動すれば OK!

でも、せっかく docker-compose 使ってるからいちいちコマンド打つの面倒だよね。ってことで

## 結論

**Dockerfile**

```
FROM php:7.0-apache
RUN  a2enmod rewrite
```

**docker-compse.yml**

```yml
php-7.0:
  build: .
  ports:
    - '80:80'
  volumes:
    - '../:/var/www/html'
    - './000-default.conf:/etc/apache2/sites-available/000-default.conf'
```

**000-default.conf**

```
<VirtualHost *:80>
    <Directory /var/www/html>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>
~~~~~~~~~~~~~~以下略~~~~~~~~~~~~~~~~
```

この３ファイルを同じディレクトリに入れ`docker-compose up`で OK。

ちなみに、mysql も使いたいよって人は

**Dockerfile**

```
FROM php:7.0-apache
RUN apt-get update && \
  docker-php-ext-install pdo_mysql mysqli mbstring && \
  a2enmod rewrite
```

こうすれば良いです。
