---
layout: post
title: GulpでSharpを使って画像のリサイズをする
category:  プログラミング
date: 2020-05-04
tags:
- Gulp
---

[gulp-sharp](https://www.npmjs.com/package/gulp-sharp ) で画像のリサイズをしたい時にできなかったので自分でそれっぽいのを書いた。

フロントエンドで画像を扱う時にsrcディレクトリには元の大きさの画像を用意してdistディレクトリには適切なサイズまで小さくして公開する運用をしている。

自分は欲しい大きさにresizeしてからoptimiseをしています、gulpでのresizeで一番npmでダウンロード数が多いのは[gulp-image-resize](https://www.npmjs.com/package/gulp-image-resize )です。このライブラリはGraphicsMagick か ImageMagickまたはその両方を必要とします。CIでサイトをビルドする時にこれらがインストールされていないときは自分でapt等でインストールをする必要がありますが、ciの制約でインストールができなかったのでsharpを使ってresizeさせたかった。

探すと[gulp-sharp](https://www.npmjs.com/package/gulp-sharp )はあるんですが、メンテナンスされてないのでインストール時にエラーが出ました。

凝ったことしなければgulpのプラグインは簡単に書けたので、ここにメモ。

## 自作gulp-sharp

```shell
npm i through2 gulp-util sharp
```


```js:title=my-gulp-sharp.js
const through = require("through2");
const gulputil = require("gulp-util");
const sharp = require("sharp");

module.exports = (options) =>
  through.obj((file, encoding, callback) => {
    if (file.isNull()) {
      callback(null, file);
      return;
    }
    if (file.isStream()) {
      callback(new gulputil.PluginError("gulp-sharp", "Streams un supported"));
    }

    if (file.isBuffer()) {
      const payload = {};
      if (options.width && typeof options.width === "number") {
        payload.width = options.width;
      }
      if (options.height && typeof options.height === "number") {
        payload.height = options.height;
      }

      sharp(file.contents)
        .resize(payload)
        .toBuffer()
        .then((data) => {
          callback(
            null,
            new gulputil.File({
              base: file.base,
              cwd: file.cwd,
              path: file.path,
              contents: data,
            })
          );
        });
    }
  });
```

npmでsharpとgulpプラグインを作るためにthrough2とgulp-utilをインストールします。

あとはgulpfile.jsからいつも通り読み込みます。

```js:title=gulpfile.js
cost gulp = require('gulp')
const my-gulp-sharp = require('./my-gulp-sharp')

const resize = (cb)=>{
  gulp
    .src('./img/*.+(png|jpg)')
	.pipe(my-gulp-sharp({ height: 200, width: 300 }))
	.pipe(gulp.dist('./dist/img'))
	.on('end',cb)
}
```
heightとwidthをオプションで渡していますが、どちらかを省略するとアスペクト比を保った数値でいい感じに縮小してくれます。

sharpはfilebuffの他streamでも使えるみたいですが、今回の形でgulpで使った時はfilebuffのみで動作したので実装しませんでした。
