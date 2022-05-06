---
layout: post
title: M1 macでemacs-ngをビルドする
category: プログラミング
date: 2021-12-11
tags:
- emacs
---

先日[Intel mac向けにemacs-ngをビルドする記事](/2021/10/emacs-ng/)を書きました。しばらく使ってみましたが深刻な問題が起こることもなく常用できそうだったのでM1 mac向けにもビルドして普段使いしたいと思った次第です。


## ビルド手順

ビルドに必要な依存関係をドキュメントに従ってインストールします。https://emacs-ng.github.io/emacs-ng/build/building/

以下のコマンドでビルドします。

```shell
brew install gnutls texinfo autoconf zlib libgccjit jansson

export CPATH="$CPATH:$(brew --prefix libgccjit)/include"
export LIBRARY_PATH="$LIBRARY_PATH:$(brew --prefix libgccjit)/lib/gcc/11"

./autogen.sh

./configure --with-json --with-native-compilation --with-modules --without-x --with-gnutls --with-xml2

make -j8

make install
```

今回は`--with-native-compilation`と`--with-json`を有効化します。jsonの方は`libjansson`をbrewでインストールし、configure時にオプションを渡してあげればOKです。

native compilationの方は、現状コンパイラがlibgccjitのパスを見つけられないみたいなので、環境変数を利用してコンパイラにパスを渡しておけばビルドできます。


## 追記
インストール先を`/opt/emacs-ng`にしたかったので最近は以下のオプションでコンパイルしています

```shell
./configure \
 --enable-locallisppath=/opt/emacs-ng/share/site-lisp \
 --infodir=/opt/emacs-ng/share/info/emacs \
 --prefix=/opt/emacs-ng \
 --with-json \
 --with-native-compilation \
 --with-modules \
 --with-gnutls \
 --with-xml2 \
 --without-x \
 --without-ns \
 --without-dbus \
 --without-imagemagick \
 --without-selinux
```
