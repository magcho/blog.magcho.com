---
layout: post
title: MBAのSerriaをクリーンインストールした時の手順メモ
category: プログラミング
tags:
  - mac
date: 2016-12-30
---

**自分用のメモ記事なので、参考程度にどうぞ。**

## 環境

- MacBookAir macOS Sierra 10.12.2
- homebrew 1.1.5
- homebrew-cask 1.1.5
- mas 1.3.1
- mackup 0.8.15

## 準備編

１. 必要なファイルを外部のストレージにコピー

- home ディレクトリをそのままコピーしてしまえばある程度は安心
- プッシュしていない Git プロジェクトはプロジェクトごとコピーしておけばブランチ構造ごとコピーできる
- VirtualBox のエクスポートツールでバックアップしてもいいし、面倒ならフォルダごとコピーして\*.vbox ファイルをあとでインポートすれば OK

２. Dropbox をインストールし同期できるように設定しておく

- インストール済みならばそれで OK

３. アプリの設定ファイルなどをバックアップ

```
$ brew install mackup
$ mackup backup
```

- エクスポートしたファイル群は Dropbox の共有フォルダにあるので、同期しておく
- /Users/{ユーザー名}/Dropbox/Mackup が作られる

４. homebrwe, homebrew cask でコマンドでインストールしたアプリの一覧を取得する

```
$ cd ~/Dropbox/mac_backup
$ brew list >> brew_list.txt
$ brew cask list >> brew_cask_list.txt
```

- Docker は別で再インストールしたほうがいい(Docker tool box)

５. AppStore でからインストールしたアプリの一覧を取得する

```
$ cd ~/Dropbox/mac_backup
$ brew install mas
$ mas list >> mas_list.txt
```

６. インストール一覧からシェルスクリプトを作る

{% gist 5023c8d38d325b6578112807c1fd46b2 %}

[mac を引っ越す時にアプリを一括インストールするスクリプト](https://gist.github.com/5023c8d38d325b6578112807c1fd46b2)

## リストア編

１. xcode を appstore からインストール

２. xcode を起動し xcode comand line tool をインストール

３. Homebrew をインストール

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

４. 1password をインストールする

```
$ brew cask install 1passwrod
```

- **cask は\[brew cask]とコマンドを打つと気を利かせて homebrew がインストールしてくれるので、自分でやる必要はない**
- 自分は iPhone とも同期しているので icloud 同期で設定

５. Dropbox をインストールしファイルを同期する

```
$ brew cask install dropbox
```

６. mackup をインストールし、復元

```
$ brew install mackup
$ mackup restore
```

７. 準備編(上記)で作ったシェルスクリプトを実行して brew と cask 系を一括インストール

```
$ cd /Users/{ユーザー名}/Dropbox/mac_backup
$ sudo sh brew-install-list.sh
```

８. atom エディタのアドオンと設定を復元

```
$ apm install atom-settings
[atom内のコマンドで（cmd+shift+p)] -> [sync-settings:restore]とタイプしEnter
```

- apm コマンドが使えない場合は一度 atom を起動し \[Atom] -> \[Install Shell Commands]を押し apm が使えるようにする。
- 復元中に、gist のリストとパッケージの最新バージョンが違ったりすると警告が出るので、各自判断で手動ならインストールできます。
- Settings > Packages を見ると atom の再起動が必要なパッケージはダウンロードされた時点で一時停止しているので、インストールを押してやれば OK です。

９. Git 系のセットアップ

- git は sourcetree 内蔵ではなく、自分で入れたものを使っているので brew でインストール後 Sourcetree の設定でシステムの Git に切り替えます
- Github と Bitbucket でログインする。２段階認証にどちらも対応してるのでアクセストークンをあれこれする必要はなく、ID と PW でログインして、携帯などで 6 桁の数字を確認して２段階認証しておきましょう
- Ouath か Basic で認証したり SSH キーを認証したりしておく。

## 後記

アプリのインストール管理は brew-file とやらでできるらしいので、もっと早く知りたかった。それと、1password って appstore からだと 7,800 円するけど、cask なら試用版をメール認証なしでインストールできるっていう発見。
