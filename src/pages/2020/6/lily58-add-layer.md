---
layout: post
title: Lily58にレイヤーを追加する
category:  プログラミング
date: 2020-06-20
tags:
- lily58
- 自作キーボード
---


自分は [Lily58 Pro](https://yuchi-kbd.hatenablog.com/entry/2018/12/23/214342) という左右分割の自作キーボードを使っています。ErgoDoxよりは小さくCorneよりは大きいのでとても自分に合っています。

Lily58のデフォルトFWにはRaise/Lower/Adjustの3レイヤーが定義されていますが、最近会計処理を多くやることになってテンキーが欲しくなったので追加しようと思います。Lily58にはオプションとしてOLEDがつきます、デフォルトでレイヤー名やキー入力の履歴を表示してくれる親切設計でした。

## keymap.cにテンキーレイヤーを追加する

レイヤー定義は`keymap.c`に書き込みます。

レイヤーの切り替え方は何通りかあります、デフォルトのRaise/Lowerは押している時だけレイヤーを切り替える方式です。そのレイヤーのキーを１つタイプするだけならば便利な方式ですが、テンキーレイヤー等では連続して数値を入力し続けたいことがほとんどなので今回は一回押したらレイヤーを切り替え、もう一度押すとレイヤーが戻るtoggle方式にしました。


まず、以下のようにNUMBERレイヤーを定義します。
```c:title=keymap.c
 #define _QWERTY 0
 #define _LOWER 1
 #define _RAISE 2
 #define _ADJUST 3
+#define _NUMBER 4
```

```c:title=keymap.c
	[_ADJUST] =
		LAYOUT(XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                   XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,\
		XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                   XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,\
		XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX,                   XXXXXXX, XXXXXXX, RGB_TOG, RGB_HUI, RGB_SAI, RGB_VAI,\
		XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, XXXXXXX, RGB_MOD, RGB_HUD, RGB_SAD, RGB_VAD,\
		_______, _______, _______, _______, _______, _______, _______, _______),


+/* NUMBER
+     * ,-----------------------------------------.                    ,-----------------------------------------.
+     * |      |      |      |      |      |      |                    |      |      |      |      |      |      |
+     * |------+------+------+------+------+------|                    |------+------+------+------+------+------|
+     * |      |      |      |      |      |      |                    |      |   7  |   8  |   9  |BSPACE|      |
+     * |------+------+------+------+------+------|                    |------+------+------+------+------+------|
+     * |      |      |      |      |      |      |-------.    ,-------|   =  |   4  |   5  |   6  |   +  |      |
+     * |------+------+------+------+------+------|       |    |NUMBER |------+------+------+------+------+------|
+     * |      |      |      |      |      |      |-------|    |-------|   0  |   1  |   2  |   3  |   -  |      |
+     * `-----------------------------------------/       /     \      \-----------------------------------------'
+     *                   | LAlt | LGUI |LOWER | /Space  /       \Enter \  |RAISE |BackSP| RGUI |
+     *                   |      |      |      |/       /         \      \ |      |      |      |
+     *                   `----------------------------'           '------''--------------------'
+		 */
+	 [_NUMBER] =
+		 LAYOUT(_______, _______, _______, _______, _______, _______,                   _______, _______, _______, _______, _______, _______,\
+		 _______, _______, _______, _______, _______, _______,                   KC_PDOT, KC_P7,   KC_P8,   KC_P9,   KC_BSPC, _______,\
+		 _______, _______, _______, _______, _______, _______,                   KC_PEQL, KC_P4,   KC_P5,    KC_P6,  KC_PPLS, _______,\
+		 _______, _______, _______, _______, _______, _______, _______, _______, KC_P0,   KC_P1,   KC_P2,   KC_P3,   KC_PMNS, _______,\
+		 KC_LSFT, KC_LGUI, LOWER, KC_SPC, KC_ENT, RAISE, KC_RGUI, KC_RALT)
);
```


NUMBERレイヤーへtoggleするためのキーをQWERTYレイヤーに定義します。右手側の一番左の１つだけ横に出ているキーに割り当てます。

`TG(レイヤー番号)`のように割り当て、切り替え先のレイヤーには`KC_TRANSPARENT`かそのエイリアスである`_______`を割り当ておきます。

```c:title=keymap.c
/* QWERTY
	 * ,-----------------------------------------.                    ,-----------------------------------------.
	 * |  `   |   1  |   2  |   3  |   4  |   5  |                    |   6  |   7  |   8  |   9  |   0  |BSPACE|
	 * |------+------+------+------+------+------|                    |------+------+------+------+------+------|
	 * | Tab  |   Q  |   W  |   E  |   R  |   T  |                    |   Y  |   U  |   I  |   O  |   P  |BSPACE|
	 * |------+------+------+------+------+------|                    |------+------+------+------+------+------|
	 * |LCTRL |   A  |   S  |   D  |   F  |   G  |-------.    ,-------|   H  |   J  |   K  |   L  |   ;  |  '   |
	 * |------+------+------+------+------+------|CSLOCK |    |NUMBER |------+------+------+------+------+------|
	 * | LAlt |   Z  |   X  |   C  |   V  |   B  |-------|    |-------|   N  |   M  |   ,  |   .  |   /  |RShift|
	 * `-----------------------------------------/       /     \      \-----------------------------------------'
	 *                   |Lshift| LGUI |LOWER | /Space  /       \Enter \  |RAISE | RGUI | RAlt |
	 *                   |      |      |      |/       /         \      \ |      |      |      |
	 *                   `----------------------------'           '------''--------------------'
	 */

    [_QWERTY] =
	LAYOUT(KC_GRV, KC_1, KC_2, KC_3, KC_4, KC_5, KC_6, KC_7, KC_8, KC_9, KC_0, SUSHI,\
		KC_TAB, KC_Q, KC_W, KC_E, KC_R, KC_T, KC_Y, KC_U, KC_I, KC_O, KC_P, KC_MINS,\
		KC_LCTRL, KC_A, KC_S, KC_D, KC_F, KC_G, KC_H, KC_J, KC_K, KC_L, KC_SCLN, KC_QUOT,\
		KC_LALT, KC_Z, KC_X, KC_C, KC_V, KC_B, KC_CAPS, TG(_NUMBER), KC_N, KC_M, KC_COMM, KC_DOT, KC_SLSH, KC_RSFT, \
		KC_LSFT, KC_LGUI, LOWER, KC_SPC, KC_ENT, RAISE, KC_RGUI, KC_RALT),

```


これでNUMBERレイヤーが動作します。

## 3層目のレイヤーを使う

[qmk firmwareのドキュメント](https://docs.qmk.fm/#/feature_layers) にもありますがレイヤーは階層構造を持ち`KC_TRANSPARENT`で下のレイヤーを透過的に利用できます。

自分はRaizeレイヤーに矢印キーを割り当てているのでNUMBERレイヤーの時にLOWERキーを押したらLOWERレイヤーに一時的に切り替わってくれると嬉しいです。
つまり、QWERTY -> NUMBER -> LOWER とレイヤーを変化されているのでQWERTYから数えて3層目のレイヤーです。

Lily58ではQERTYレイヤ状態でLOWERキー押下時に`layer_on(_LOWER)`でレイヤーを切り替えています。この関数の実装上今回のケースでは期待しない動作になります。
今回はRaise/Lowerキーの押下/押上時に処理を追加して対応します。

```c:title=keymap.c
static bool prelayer_numberlayer = false;

bool process_record_user(uint16_t keycode, keyrecord_t *record) {
	case LOWER:
        if (record->event.pressed) {
			is_prelayer_numberlayer = layer_state_is(_NUMBER);
            layer_off(_NUMBER);

            layer_on(_LOWER);
            update_tri_layer_RGB(_LOWER, _RAISE, _ADJUST);
        } else {
            layer_off(_LOWER);
            update_tri_layer_RGB(_LOWER, _RAISE, _ADJUST);

            if (is_prelayer_numberlayer) {
                layer_on(_NUMBER);
            }
        }
        return false;
		
	case RAISE:
        if (record->event.pressed) {
			is_prelayer_numberlayer = layer_state_is(_NUMBER);
            layer_off(_NUMBER);

            layer_on(_RAISE);
            update_tri_layer_RGB(_LOWER, _RAISE, _ADJUST);
        } else {
            layer_off(_RAISE);
            update_tri_layer_RGB(_LOWER, _RAISE, _ADJUST);

            if (is_prelayer_numberlayer) {
                layer_on(_NUMBER);
            }
        }
        return false;
}
```

以上の実装で3層目のレイヤーも期待する動作になります。


## OLEDに表示されるレイヤー名を修正する

Lily58のオプションで付けられるOLEDにはレイヤー名や入力履歴等が表示されています。OLED周りの実装はlibに入っています。ここに直接手を加えていきます。

レイヤー名の表示はkeymap.cの`read_layer_state()`で呼び出されています。

この関数の実装にNUMBERレイヤーに関する記述をすると

```c:title=lib/layer_state_reader.c
#define L_BASE 0
#define L_LOWER (1 << 1)
#define L_RAISE (1 << 2)
#define L_ADJUST (1 << 3)
#define L_ADJUST_TRI (L_ADJUST | L_RAISE | L_LOWER)
+#define L_NUMBER (1 << 4)
```

```c:title=lib/layer_state_reader.c
const char *read_layer_state(void) {
    switch (layer_state) {
+        case L_NUMBER:
+            snprintf(layer_state_str, sizeof(layer_state_str), "Layer: Number");
+            break;
        default:
            snprintf(layer_state_str, sizeof(layer_state_str), "Layer: Undef-%ld", layer_state);
    }

    return layer_state_str;
}
```
これでOLEDにLayer: Numberと表示されるようになります。めでたしめでたし。

## おまけ

qmkではレイヤーの状態を`unit32_t layer_state` で保持し、下位ビットから順にレイヤー1・レイヤー2を割り当ててそのビットが立っているかどうかを判定しているらしい。

`layer_on(LAYER)`は指定したビットを立てるわけではなく、現在の`layer_state`を左に指定量ビットシフトしている。確かに`keymap.c`で`#define _NUMBER 4`を定義しましたね。当然`layer_off(LAYER)`は右に指定量ビットシフトです。

今までLily58にFWを書き込む時には繋いでるTRRSを抜いて書き込んでいたのですが、軽く調べた感じ繋ぎっぱなしで書き込んで問題なさそう(私は設計者ではないので信憑性のない情報)
[回路図](https://github.com/kata0510/Lily58/tree/master/Pro/PCB ) を見た感じUSBの通信線とは別のピンでPro Micro同士を繋いでいます。TRRSのアサインは先端からUSBからのVCC/GND/通信線/NCっぽい。ProMicroの仕様書をざっと見た感じFW書き込み時にシリアルピンは影響なさそうなのでTRRSを抜かずに書き込めそうです。
