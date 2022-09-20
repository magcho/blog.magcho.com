---
layout: post
title: M5Paper V1.1にPlatform.ioから書き込みをする
category: 電子工作
date: 2022-05-08
tags:
  - M5Paper
---

[M5Paper](https://switch-science.com/catalog/7359/)の出荷時に書き込まれているファームウェアーをベースに機能を追加してみようと思い[初期ファームウェア](https://github.com/m5stack/M5Paper_FactoryTest)をvscode(platform.io)で開いたもののビルドできない&書き込めなくて困ったので解決方法をメモ

## 環境

- MacOS Monterey

## ビルドエラー

初期ファームウェアのコード [m5stack/M5Paper_FactoryTest](https://github.com/m5stack/M5Paper_FactoryTest) をクローンし、vscodeで開いた後、ビルドをするとエラーで完了しない。

```log
Building in release mode
Compiling .pio/build/m5stack-fire/src/frame/frame_factorytest.cpp.o
src/frame/frame_factorytest.cpp: In member function 'bool Frame_FactoryTest::checkGrove(int, int)':
src/frame/frame_factorytest.cpp:180:32: error: call of overloaded 'begin(int&, int&, int)' is ambiguous
     Wire1.begin(sda, scl, 10000);
                                ^
In file included from .pio/libdeps/m5stack-fire/M5EPD/src/M5EPD.h:5,
                 from src/frame/frame_base.h:4,
                 from src/frame/frame_factorytest.h:4,
                 from src/frame/frame_factorytest.cpp:1:
/Users/magcho/.platformio/packages/framework-arduinoespressif32/libraries/Wire/src/Wire.h:79:10: note: candidate: 'bool TwoWire::begin(int, int, uint32_t)'
     bool begin(int sda=-1, int scl=-1, uint32_t frequency=0); // returns true, if successful init of i2c bus
          ^~~~~
/Users/magcho/.platformio/packages/framework-arduinoespressif32/libraries/Wire/src/Wire.h:80:10: note: candidate: 'bool TwoWire::begin(uint8_t, int, int, uint32_t)'
     bool begin(uint8_t slaveAddr, int sda=-1, int scl=-1, uint32_t frequency=0);
          ^~~~~
*** [.pio/build/m5stack-fire/src/frame/frame_factorytest.cpp.o] Error 1
=============================================================================== [FAILED] Took 4.85 seconds ===============================================================================
The terminal process "platformio 'run', '--environment', 'm5stack-fire'" terminated with exit code: 1.
```

おそらくこのコードが書かれた以後、i2cのライブラリのインターフェースが変更されたっぽいので今の状態に合わせてキャストしておく

```diff-cpp:title=frame_factorytest.cpp
 bool Frame_FactoryTest::checkGrove(int sda, int scl)
 {
-    Wire1.begin(sda, scl, 10000);
+    Wire1.begin(sda, scl, (uint32_t)10000);
     bool groveCheck = true;

```

これでビルドが通る。

## 書き込み

めでたくビルドができたのでデバイスに書き込もうとするとエラー

```log
Building in release mode
Retrieving maximum program size .pio/build/m5stack-fire/firmware.elf
Checking size .pio/build/m5stack-fire/firmware.elf
Advanced Memory Usage is available via "PlatformIO Home > Project Inspect"
RAM:   [          ]   1.0% (used 45440 bytes from 4521984 bytes)
Flash: [===       ]  32.8% (used 2151237 bytes from 6553600 bytes)
Configuring upload protocol...
AVAILABLE: cmsis-dap, esp-prog, espota, esptool, iot-bus-jtag, jlink, minimodule, olimex-arm-usb-ocd, olimex-arm-usb-ocd-h, olimex-arm-usb-tiny-h, olimex-jtag-tiny, tumpa
CURRENT: upload_protocol = esptool
Looking for upload port...
Auto-detected: /dev/cu.usbmodem52D20507581
Uploading .pio/build/m5stack-fire/firmware.bin
esptool.py v3.3
Serial port /dev/cu.usbmodem52D20507581
Connecting......
Chip is ESP32-D0WDQ6-V3 (revision 3)
Features: WiFi, BT, Dual Core, 240MHz, VRef calibration in efuse, Coding Scheme None
Crystal is 40MHz
MAC: 08:3a:f2:66:ca:84
Uploading stub...

A fatal error occurred: Failed to write to target RAM (result was 01070000: Operation timed out)
*** [upload] Error 2
=============================================================================== [FAILED] Took 6.51 seconds ===============================================================================
The terminal process "platformio 'run', '--target', 'upload', '--environment', 'm5stack-fire'" terminated with exit code: 1.

```

最初はデバイスドライバーの不足を疑い[公式ページ](https://docs.m5stack.com/en/core/m5paper)からデバイスドライバーをインストールした。ドライバーは２種類あるが不安ならどっちもインストールせよと書いてあるのでどっちもインストールするも症状変わらず。

ここでデバイス一覧を眺めるとM5Paperから`usbmodemXXXXXX`と`wchusbserialXXXXXX`の２種類のシリアルポートが生えてることに気がついた

```shell
$ ls /dev | grep usb | grep tty
tty.usbmodem52D20507581
tty.wchusbserial52D20507581
```

先ほどのエラーログを見る限り`/dev/cu.usbmodemXXXXXXX`を使おうとしてコケているので設定から`/dev/wchusbserialXXXXXX`を使うように指定してみる

```ini:title=platformio.ini
  ; PlatformIO Project Configuration File
  ;
  ;   Build options: build flags, source filter
  ;   Upload options: custom upload port, speed and extra flags
  ;   Library options: dependencies, extra library storages
  ;   Advanced options: extra scripting
  ;
  ; Please visit documentation for the other options and examples
  ; https://docs.platformio.org/page/projectconf.html

  [env:m5stack-fire]
  platform = espressif32
  board = m5stack-fire
  framework = arduino
  upload_speed = 2000000
  monitor_speed = 115200
  board_build.partitions = default_16MB.csv
  build_flags =
 	-DCORE_DEBUG_LEVEL=4
 	-DBOARD_HAS_PSRAM
 	-mfix-esp32-psram-cache-issue
  lib_deps =
     m5stack/M5EPD
+ upload_port = /dev/cu.wchusbserialXXXXXXXXXXXXX
```

これでuploadを押すと書き込めるようになった。

## TODO

後でPR投げておくかな
