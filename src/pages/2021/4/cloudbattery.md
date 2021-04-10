---
layout: post
title: Cloud Batteryでバッテリー残量を確認する
category:  日記
date: 2021-04-11
tags:
- mac
---

## バッテリー残量を確認したい

ついこないだやっとBig Surにアップデートをしました。アップデートしてから気がついたんですがBig Surはメニューバーにバッテリー残量の数値を出せなくなっていました。

アイコンの満ち欠けでなんとなくの残量はわかりますし、マウスでクリックすれば数値を確認することはできるのですが常時表示されていないとなんとなく不安です。

そこで以前利用していた[Battery Monitor](https://apps.apple.com/jp/app/battery-monitor-health-info/id836505650)を入れてバッテリー残量が20%を下回ったら通知バナーを出すように設定していました。しかし最近導入した大きめのディスプレイで作業していると右上の通知バナーに気がつかず、「いきなり画面が消えた！」と思って本体の画面を見たら赤い電池マークが点滅していることが何度もあり、どうにかしたかった。

## Cloud Batteryで出来ること

探すと[Cloud Battery](https://apps.apple.com/jp/app/cloud-battery/id1481005137)というアプリを見つけました、これは単一のiCloudアカウントでログインしているデバイスに入れておけば全てのデバイスのバッテリー残量をiCloud越しに共有し、さらには通知もできるという素晴らしいアプリです。

数多くのデバイスに対応し、自分の手持ちではmac, iPhone, iPad, Apple pencil, Apple Watch, MagicTrackpad 2のバッテリー情報を共有できました。AppStoreのスクリーンショットを見る限りAppleデバイスではなくても登録できるっぽいんですが手持ちのBluetoothイヤホンは登録できませんでした。残念


さらに、デバイス間で残量を共有しているのでmacのバッテリーが20%を下回ったときにApple WatchやiPhoneでpush通知を受け取ることができます。通知は指定値を下回ったら通知されるものに加え指定値を超えたときに通知することもできます。なので通常はApple Watchの充電完了通知はペアリングしているiPhoneしか通知が届きませんがこの機能により全てのデバイスでpush通知がきます。iPadで動画見てても気がつけるのはうれしい

## Cloud Batteryを使う上で

とっても便利なCloud Batteryですが気にかけなければならない点がいくつかあります。

１つ目はBluetoothを用いること。iosアプリで利用するときにbluetoothを切っていると、OS側からオンにしませんか？みたいなポップアップが出ます。オンにしておけば問題ないのですが、自分が使っているワイヤレスイヤホンが同時２つまでしかペアリングできないので、利用していない端末のBluetoothの新規接続をOFFにしているのでよくこのポップアップが出ますがそれ以外に実害はないので今のところ問題なさそう。

２つ目はiCloud同期のタイミングがマチマチなところ。バッテリー残量が20%になったとの通知を受けとったのでmacを充電しようと思って見たら残り３％ぐらいになってて焦ったりします。同期はリアルタイムではない様子。１０分ぐらい遅れているな〜と思う時もあればほぼリアルタイムな時もありマチマチなので通知設定をするときは余裕を持っておいた方が良さそう。

３つ目はmac版のアプリがよく落ちること。mac版は他のプラットフォームと違い常時起動させておく必要があります。なのでmacの設定からスタートアップに設定しています。macの起動と同時に必ずCloud Batteryも起動しているのですが、何時間か作業をしているといつの間にか落ちていることが何度かありました。AppStoreのレビューには動作が不安定というコメントがないのでおま環かもしれませんがこれは不便。なので自分が行った解決策も書いておきます。

## Cloud Batteryを常時起動させたい

自分の手元でmac版のCloud Batteryがいつの間にか落ちていることがあるので、自動起動 and 落ちていたら自動的に起動するように設定しました。

よくある`systemctl`を用いたデーモン化というやつなのですが、macには`systemctl`はなく、同様の機能を持った`launchctl`を用いて設定するようです。

詳しいことは`man`コマンドから読めます
```bash
$ man launchd
$ man launchctl
$ man launchd.plist
```

`~/Library/LaunchAgents/`ディレクトリに以下のplistを作り

```xml:title=/Users/{user_name}/Library/LaunchAgents/hoge.fuga.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
        <key>KeepAlive</key>
        <true/>
        <key>Label</key>
        <string>hoge.fuga.cloudbattery</string>
        <key>ProgramArguments</key>
        <array>
                <string>/Applications/Cloud Battery.app/Contents/MacOS/Cloud Battery</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
        <key>StartInterval</key>
        <integer>300</integer>
        <key>StandardErrorPath</key>
        <string>/dev/null</string>
        <key>StandardOutPath</key>
        <string>/dev/null</string>
</dict>
</plist>
```

```bash
$ launchctl load ~/Library/LaunchAgents/com.hoge.fuga.plist
```

すれば設定完了です、コマンドを打ってすぐにアプリが起動しメニューバーに表示されます。あとは５分おきに起動を確認して、落ちていたら再起動し起動していたら何もしない挙動になります。

これで快適なバッテリー管理が出来る！

## plistメモ
| name             | value                                                                                        |
| :-------------   | :-------------                                                                               |
| KeepAlive        | cronのように定期実行なら`true` 常時起動なら`false`                                           |
| Label            | 識別名なので被らなければなんでも良い                                                         |
| ProgramArguments | 起動したいバイナリを指定、`〇〇.app`はディレクトリなのでその中のバイナリーを指すようにする |
| RunAtLoad        | スタートアップに登録するなら`true`                                                           |
| StartInterval    | 単位は秒                                                                                     |


## 参考
- https://www.alanyan.ca/CloudBattery/
- https://news.mynavi.jp/article/20071211-iul01/resources/Leopard_launchd_newkeywords.pdf
- https://qiita.com/rsahara/items/7d37a4cb6c73329d4683
