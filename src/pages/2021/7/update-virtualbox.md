---
layout: post
title: virtualBoxをアップデートした
category:  プログラミング
date: 2021-07-26
tags:
- homebrew
---

昨日`brew update && brew upgrade`したらvirtualboxがアップデートできなかったので対応をメモ。

## エラー文

```shell
$ brew upgrade
==> Casks with 'auto_updates' or 'version :latest' will not be upgraded; pass `--greedy` to upgrade them.
==> Upgrading 1 outdated package:
virtualbox 6.1.22,144080 -> 6.1.24,145767
==> Upgrading virtualbox
==> Caveats
virtualbox requires a kernel extension to work.
If the installation fails, retry after you enable it in:
  System Preferences → Security & Privacy → General

For more information, refer to vendor documentation or this Apple Technical Note:
  https://developer.apple.com/library/content/technotes/tn2459/_index.html

==> Downloading https://download.virtualbox.org/virtualbox/6.1.24/VirtualBox-6.1.24-145767-OSX.dmg
Already downloaded: /Users/magcho/Library/Caches/Homebrew/downloads/df87b6f6114108c8ca37e767f9f6e0206aa4d1c8c9237a5de5548075abbc45fd--VirtualBox-6.1.24-145767-OSX.dmg
==> Running uninstall script VirtualBox_Uninstall.tool

Welcome to the VirtualBox uninstaller script.

Executing: /usr/bin/kmutil showloaded --list-only --bundle-identifier org.virtualbox.kext.VBoxUSB
No variant specified, falling back to release
Executing: /usr/bin/kmutil showloaded --list-only --bundle-identifier org.virtualbox.kext.VBoxNetFlt
No variant specified, falling back to release
Executing: /usr/bin/kmutil showloaded --list-only --bundle-identifier org.virtualbox.kext.VBoxNetAdp
No variant specified, falling back to release
Executing: /usr/bin/kmutil showloaded --list-only --bundle-identifier org.virtualbox.kext.VBoxDrv
No variant specified, falling back to release
And the following KEXTs will be unloaded:
    org.virtualbox.kext.VBoxUSB
    org.virtualbox.kext.VBoxDrv

And the traces of following packages will be removed:
    org.virtualbox.pkg.vboxkexts
    org.virtualbox.pkg.virtualbox
    org.virtualbox.pkg.virtualboxcli

The uninstallation processes requires administrative privileges
because some of the installed files cannot be removed by a normal
user. You may be prompted for your password now...

unloading org.virtualbox.kext.VBoxUSB
Executing: /usr/bin/kmutil unload -b org.virtualbox.kext.VBoxUSB
Error Domain=KMErrorDomain Code=71 "Kernel request failed: (libkern/kext) kext is in use or retained (cannot unload) (-603946984)" UserInfo={NSLocalizedDescription=Kernel request failed: (libkern/kext) kext is in use or retained (cannot unload) (-603946984)}
An error occurred durning 'sudo /sbin/kextunload -m org.virtualbox.kext.VBoxUSB', there should be a message above. (rc=71)
unloading org.virtualbox.kext.VBoxDrv
Executing: /usr/bin/kmutil unload -b org.virtualbox.kext.VBoxDrv
Error Domain=KMErrorDomain Code=71 "Kernel request failed: (libkern/kext) kext is in use or retained (cannot unload) (-603946984)" UserInfo={NSLocalizedDescription=Kernel request failed: (libkern/kext) kext is in use or retained (cannot unload) (-603946984)}
An error occurred durning 'sudo /sbin/kextunload -m org.virtualbox.kext.VBoxDrv', there should be a message above. (rc=71)
Failed to unload one or more KEXTs, please reboot the machine to complete the uninstall.
==> Purging files for version 6.1.24,145767 of Cask virtualbox

Error: virtualbox: Failure while executing; `/usr/bin/sudo -E -- /usr/local/Caskroom/virtualbox/6.1.22,144080/VirtualBox_Uninstall.tool --unattended` exited with 1. Here's the output:

Welcome to the VirtualBox uninstaller script.

Executing: /usr/bin/kmutil showloaded --list-only --bundle-identifier org.virtualbox.kext.VBoxUSB
No variant specified, falling back to release
Executing: /usr/bin/kmutil showloaded --list-only --bundle-identifier org.virtualbox.kext.VBoxNetFlt
No variant specified, falling back to release
Executing: /usr/bin/kmutil showloaded --list-only --bundle-identifier org.virtualbox.kext.VBoxNetAdp
No variant specified, falling back to release
Executing: /usr/bin/kmutil showloaded --list-only --bundle-identifier org.virtualbox.kext.VBoxDrv
No variant specified, falling back to release
And the following KEXTs will be unloaded:
    org.virtualbox.kext.VBoxUSB
    org.virtualbox.kext.VBoxDrv

And the traces of following packages will be removed:
    org.virtualbox.pkg.vboxkexts
    org.virtualbox.pkg.virtualbox
    org.virtualbox.pkg.virtualboxcli

The uninstallation processes requires administrative privileges
because some of the installed files cannot be removed by a normal
user. You may be prompted for your password now...

unloading org.virtualbox.kext.VBoxUSB
Executing: /usr/bin/kmutil unload -b org.virtualbox.kext.VBoxUSB
Error Domain=KMErrorDomain Code=71 "Kernel request failed: (libkern/kext) kext is in use or retained (cannot unload) (-603946984)" UserInfo={NSLocalizedDescription=Kernel request failed: (libkern/kext) kext is in use or retained (cannot unload) (-603946984)}
An error occurred durning 'sudo /sbin/kextunload -m org.virtualbox.kext.VBoxUSB', there should be a message above. (rc=71)
unloading org.virtualbox.kext.VBoxDrv
Executing: /usr/bin/kmutil unload -b org.virtualbox.kext.VBoxDrv
Error Domain=KMErrorDomain Code=71 "Kernel request failed: (libkern/kext) kext is in use or retained (cannot unload) (-603946984)" UserInfo={NSLocalizedDescription=Kernel request failed: (libkern/kext) kext is in use or retained (cannot unload) (-603946984)}
An error occurred durning 'sudo /sbin/kextunload -m org.virtualbox.kext.VBoxDrv', there should be a message above. (rc=71)
Failed to unload one or more KEXTs, please reboot the machine to complete the uninstall.
```

VBoxUSBでエラーなので、類似事例を探すと以下のフォーラムが見つかった。
https://forum.macbidouille.com/index.php?showtopic=420332

接続してるBluetoothデバイスを外すといいと書いてある。ほんとかよと思いながらも接続していたトラックパッドとマウスのBluetoothを設定からペアリング解除し接続しているUSBデバイスを全て外したのち、再起動し
`brew update && brew upgrade`するとすんなりアップデートできた。

Bluetoothのペアリングをやり直して今回は対応終了。

## 最後に
ザーッと検索したところ類似のエラーが起こっている人が少なかっので、自分が追加でインストールしているExtention Packに要因があるのかもしれないと思った。検証はしてないので予想。
