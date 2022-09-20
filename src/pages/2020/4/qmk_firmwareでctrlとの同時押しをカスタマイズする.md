---
layout: post
title: 'qmk firmwareでctrlとの同時押しをカスタマイズする'
category: プログラミング
date: 2020-04-08
tags:
  - qmk firmware
  - 自作キーボード
---

キー入力が下手なのでバックスペースを連打しがちなのですがバックスペースキーはキーボード上では遥か右上にあります。これが原因で右手首を痛めたことも。入力精度を上げろという話なのですが出来るならもうしてます。

また、以外と日本語入力をしていると使いがちな「ー」伸ばし棒も近くに欲しいものです。

今回は`C-j`にbackspace・`C-n`にハイフンを割り当てます。

## Ctrlキー

Ctrlキー含め装飾キーには様々なキーバインドが割り当てられています。一般的には`C-j`にはreturn・`C-h`にはbackspaceなど色々あります。zsh/bashなどのshellやターミナルのキーバインドに設定されていることが多いです。macでは`C-k`に行末まで削除があったりと気が利いています。

qmk firmwareではraise/lower等のキーマップを変更・追加してカスタマイズするのが一般的ですがこの場合は複合キーを入力するマクロを全てのキーにおいて定義する必要があり厄介です。

今回はレイヤーの定義ではなくプログラムっぽく？キー入力を拡張してみます。

## キータイプ

qmk firmwareにてキー入力を拡張するには`process_record_user()`を用いる方法があります。

[公式ドキュメント](https://docs.qmk.fm/#/custom_quantum_functions?id=programming-the-behavior-of-any-keycode)に詳しくはありますが、`process_record_user()`はqmk firmwareがキー入力を検知しPCへキー情報を送信する前に毎回呼び出される関数です。通常時返り値を`true`とすることで現在のレイヤーのkeymapを見てPCへキー情報を送信してくれます。今回のように何か特別でキーマップは関与しない処理を行う場合は一通りの処理が終わった後`false`を返しておきます。この場合は`process_record_user`を抜けた時点で処理を終了するようになります。

今回は`C-j`と`C-n`の時に任意の処理をし、それ以外はキーマップに従うようにしていきます。

この関数はキーの押下時に加えて"押上"時にも呼び出されます。ctrlとの複合キーであることを判定するにはctrlキー押下時にctrl_pressedという押下フラグを立てておく方法をとります。

そしてポイントなのがキーの反復機能です。テキストエディタでAキーを押しっぱなしにすると`AAAAAAAAAAAAAA`のようにAが大量に入力されます。それはそう。反復機能が働いている時にキーボードが`KC_A`のkey_downコードを連続して送信しているわけではなく、PC側でkey_downコードが来てからなかなかkey_upコードが来ないので押しっぱなしであると判断しています。

qmk firmwareにはキーコードを送信するための関数がいくか用意されていますがよく使うのは`tap_code(KEYCODE)`と`register_code(KEYCODE) / unregister_code(KEYCODE)`です。前者はkey_downコードとkey_upコードを連続して送信し、後者はresigerがdown・unregisterがupのコードを送信するものです。用途に合わせて使い分ける必要があります。

## 実装

defaultのkeymap.cの下の方に`process_record_user()`の記述があります。ここに実装していきます。

```c:title=keymaps.c
~~~~~~~~~~~~~~~~~~~~~~略~~~~~~~~~~~~~~~~~~~~~~~~~~

static bool ctrl_pressed = false;
static bool exceptionaly_ctrl_layer_pressed = false;

bool process_record_user(uint16_t keycode, keyrecord_t *record) {
    if (record->event.pressed) {
#ifdef SSD1306OLED
        set_keylog(keycode, record);
#endif
        // set_timelog();
    }

    switch (keycode) {
    case KC_LCTRL:
        if (record->event.pressed) {
            ctrl_pressed = true;
        } else {
            ctrl_pressed = false;
        }
        break;

    case QWERTY:
        if (record->event.pressed) {
            set_single_persistent_default_layer(_QWERTY);
        }
        return false;
        break;

~~~~~~~~~~~~~~~~~~~~~~略~~~~~~~~~~~~~~~~~~~~~~~~~~
```

上のコードで、引数keycodeに押下/押上されたキーのコードが入っています。`record->event.pressed`にて押下か押上か判断できるのでctrlキーの状態に変化があればフラグを更新します。ここではreturnせずに正常処理をします。

```c:title=keymap.c
~~~~~~~~~~~~~~~~~~~~~~略~~~~~~~~~~~~~~~~~~~~~~~~~~

    case ADJUST:
        if (record->event.pressed) {
            layer_on(_ADJUST);
        } else {
            layer_off(_ADJUST);
        }
        return false;
        break;

    default:
        if (ctrl_pressed || exceptionaly_ctrl_layer_pressed) {
            switch (keycode) {
            case KC_J:
                if (record->event.pressed) {
                    unregister_code(KC_LCTRL);
                    register_code(KC_BSPACE);
                    exceptionaly_ctrl_layer_pressed = true;
                } else {
                    unregister_code(KC_BSPACE);
					if(ctrl_pressed){
						register_code(KC_LCTRL);
					}
                    exceptionaly_ctrl_layer_pressed = false;
                }
                return false;
                break;

            case KC_N:
                if (record->event.pressed) {
                    unregister_code(KC_LCTRL);
                    register_code(KC_MINUS);
                    exceptionaly_ctrl_layer_pressed = true;
                } else {
                    unregister_code(KC_MINUS);
					if(ctrl_pressed){
						register_code(KC_LTRL);
					}
                    exceptionaly_ctrl_layer_pressed = false;
                }
                return false;
                break;
            }
        }
    }
    return true;
}

```

上のコードで、switchにてctrlキーとレイヤ切り替えキーを判定し、それ以外はdefaultに入ります。ここで`ctrl\_pressed`フラグを用いて押下中(修飾キー)であるかを判定し、任意のキーとの組み合わせ(ここでは`C-J`/`C-N`)であれば`register\_code(KEYCODE)`にてキーを打ちます。

今回のようにbackspaceやハイフンといった本来修飾キーを用いないキー(Ctrlとの複合キーではないキー)の場合はPCにこれは修飾キーでないことを伝えるために`unregister_code(KC_LCTRL)`にてctrlキーをを仮想的に押上しておきます。

ここでは長押ししたら複数文字backspace/ハイフンを入力して欲しいので`register`を利用しています。

そして押上時に`unregister`して`register_code(KC_LCTRL)`にて仮想的なctrlキーの押下を戻しておくといいです。backspaceで数文字消した後貼り付けしたい時にctrlキーを押しなおす必要がなくなり、より自然になるかと。

入力時に`Ctrl(down) -> J(down) -> J(up) -> Ctrl(up)`とタイプしているつもりでも指が離れるタイミングによってはupのタイミングが逆になることもあり得るのでフラグで状態管理をして`if(ctrl_pressed || exceptionaly_ctrl_layer_pressed)`のようにどちらのフラグでも対応できると安心。

## おわり

キーマップのカスタマイズは既成のキーボードでも十分できますが、自作キーボードでは大抵のことを作ればできるので楽しい。

## リンク

- [Mac のキーボードショートカット - Apple サポート](https://support.apple.com/ja-jp/HT201236)
- [qmk_firmware/keymap.c at master · qmk/qmk_firmware](https://github.com/qmk/qmk_firmware/blob/master/keyboards/lily58/keymaps/default/keymap.c)
- [qmk firmware/keymap.c at master · magcho/qmk firmware](https://github.com/magcho/qmk_firmware/blob/master/keyboards/lily58/keymaps/magcho/keymap.c)
- [Customizing Functionality - QMK Firmware](https://docs.qmk.fm/#/custom_quantum_functions?id=programming-the-behavior-of-any-keycode)
- [Full List - QMK Firmware](https://docs.qmk.fm/#/keycodes)
