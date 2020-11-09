---
title: Open Lighting Architectureについて
date: 2018-10-13
category: 舞台技術
tags:
  - OLA
  - DMX512
  - Art-Net
---

## OLA とは

[Open Lighting Project](https://www.openlighting.org/) という組織が開発をしています。この組織は、2004 年当時、オープンな照明用のプロトコル Art-Net に目をつけた大学生がそれを活用できるように OSS などを整備していくことを目的に作られたものみたいです。[(※History)](https://www.openlighting.org/openlightingproject/about/history/)
OLA の他にも Linux 系で Art-Net 扱うためのライブラリである libartnet や rdm テスターなども製作しています。

その製作プロジェクトの一つである OLA。これは DMX over Ethernet の各種プロトコルや USB の DMX ノード各種などの信号を変換するノードです。対応しているプロトコル、デバイスは[OLA の HP](https://www.openlighting.org/ola/)からも確認できます。

面白いのが、メーカーが仕様を一般に公開していないノードであっても OLA が対応している点です。開発者がロジアナなどで解析しているんだとか。

## OLA の使い方

OLA は Linux と MacOS・FreeBSD に対応している。残念ながら Windows には対応していないが公式 HP では VM で Ubuntu を動かす方法を紹介している。様々なプラットフォームに対応してる OLA だが操作方法は全て同じで Web 上の GUI で操作できる。
![ola web ui](スクリーンショット 2018-10-14 0.13.04.png)

"Add Universe"ボタンを押して、Universe Id と Universe Name を入力し、使いたいプロトコルにチェックを入れ、"Add Universe"を押すだけです、簡単ですね。
![](スクリーンショット 2018-10-14 1.20.54.png)

しかし、このままでは左に青字で書かれている Plugins のデバイスが右のチェックボックスに表示されていません。これは OLA は OLA がデバイスを認識していないためです。試しに何かしらの USB デバイスを接続して"Reload Plugin"してみてください、一覧に表示されるようになったと思います

でもデバイスによっては接続しても表示してくれないものもあります、そのような場合は別途設定を行う必要があります。

## 表示されないデバイスを使えるようにする

ここでは、Raspberry pi に FTDI USB DMX を接続する流れを説明していきます。

1. RaspberryPi が FTDI デバイスを扱えるようにルールファイルを作成します。詳しくは[公式 Wiki](https://wiki.openlighting.org/index.php/OLA_Device_Specific_Configuration#Open_DMX_USB_.2F_FTDI_RS485)にも書いてあります。
   `/etc/udev/rules.d/10-local.rules`というパスに

```bash:title=10-local.rules
# udev rules for ftdi devices
SUBSYSTEM=="usb|usb_device", ACTION=="add", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", GROUP="plugdev"
```

を保存します、多分ルールファイルはデフォルトでは存在しないので新規作成してください。

1. 左のリストから"FTDI USB DMX"をクリックし、詳細を見ます。`Enabled in Config File`と`Active`が No になっていますね。OLA で使用するためにはこの２つが YES になっていなければなりません。
   ![](スクリーンショット 2018-10-14 1.27.56.png)

1. まず、競合しているデバイスを停止させます`Conflicts with`に書かれているデバイスはこの FTDI 　 USB 　 DMX と同じドライバーであったり、物理的にポートが同じなどの理由で同時に使用できません。なので競合しているデバイスの方を止めます。
   ![](スクリーンショット 2018-10-14 1.47.49.png)
   `Config Location`に書いてあるパスに設定ファイルがあるので、編集します。

```bash:title=ola-usbserial.conf
device_dir = /dev
device_prefix = ttyUSB
device_prefix = cu.usbserial-
device_prefix = ttyU
enabled = true  <--------　falseに変更してください
pro_fps_limit = 190
tri_use_raw_rdm = false
ultra_fps_limit = 40
```

のように enabled を false にします。`Enttec Open DMX`も同様です。

1. 次に`FTDI USB DMX`の設定ファイルを編集します。

```bash:title=ola-ftdidmx.conf
enabled = false <-- trueに変更してください
frequency = 30
```

1. USB でデバイスを接続して`Reload Plugin`をすれば Yes になると思います。
   ![](スクリーンショット 2018-10-14 2.05.34.png)
