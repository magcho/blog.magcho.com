---
layout: post
title: ArduinoでDMXを受ける
category: 舞台技術
tags:
  - DMX512
date: 2018-01-05
---

DMXSerial 使っただけ。この方法だと HardwareSerial を使うので、スケッチ書き込み時に TX,RX からピンを抜いておかないと書き込みエラーが出たりするので、組み込みで半田付けしてからスケッチ修正できない。ムムム

![null](./images/20180105190616.png)

<https://qiita.com/loveandsheep/items/e1295ec9ce589>
