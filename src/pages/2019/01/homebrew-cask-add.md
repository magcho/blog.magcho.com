---
title: homebrew-caskにないアプリは自分で追加しよう
date: 2019-08-20
category: プログラミング
tags:
  - homebrew
---

## Cask に追加してみる

1. homebrew を更新し、作業中は自動更新を止める

   まず`brew update`で更新をかけておきます、これで Cask 含め brew 本体も更新されます。

   次に、homebrew は Cask を自動更新する仕様なので作業中はこれを止めておきます。

   ```bash
   $ export HOMEBREW_NO_AUTO_UPDATE=1
   ```

   環境変数なのでターミナルを開き直したあとや、別のターミナルには効きませんのでご注意を。

1. Cask に追加したいアプリケーションをインストールしておく

   今までと同じようにブラウザでインストーラーなどをダウンロードし、インストールします。後々使うのでダウンロードしたファイルを消さないようにしましょう。

1. github 上で[homebrew-cask](https://github.com/Homebrew/homebrew-cask)を fork する
1. local 上の homebrew ディレクトリの git に fork したリポジトリを追加する
   ```bash
   $ github_user='<my-github-username>'
   $ cd "$(brew --repository)"/Library/Taps/Homebrew/homebrew-cask
   $ git remote add "${github_user}" "https://github.com/${github_user}/homebrew-cask"
   ```
1. Cask 名を決める

   いわゆる`brew cask install 〇〇`のところの名前です。命名規則があるようなのですがこれを自動で決めてくれるコマンドがあります。

   ```bash
   $ "$(brew --repository)/Library/Taps/Homebrew/homebrew-cask/developer/bin/generate_cask_token" '/Applications/〇〇.app'
   ```

1. Cask の定義ファイルを作る

   定義ファイルは.rb ファイルのテキストです。Stanzas という記法らしいです。これもコマンドにて雛形を作ってくれます。

   ```bash
   $ brew cask create {Cask名}
   ```

1. 定義ファイルを書く

   [homebrew-cask の仕様](https://github.com/Homebrew/homebrew-cask/blob/master/doc/development/adding_a_cask.md#cask-stanzas)などを読みながら雛形の空欄を埋めていきます。

   ちなみに`SHA-256`の部分は.app ではなくダウンロードした.zip や.dmg などのファイルのハッシュ値です。これは以下のコマンドで確認できます。ダウンロードフォルダにファイルが残っていると思うので以下のような感じで確認できます。

   ```bash
   $ shasum -a 256 "~/Downloads/〇〇.zip"
   ```

   また、url にバージョンの数字などが含まれる場合は変数としておくことでバージョンアップ時に定義ファイルを自動更新できるので変更しておきましょう。変数は`#{version}`で置き換えることができます。ここで注意したいのは先のコマンドで作った雛形ではシングルクオートですが、変数を含める際にはダブルクオートでなければなりません。

   ```
   Before url 'https://example.com/app-v1.0.1.zip'
   After  url "https://example.com/app-v#{version}.zip"
   ```

   name の部分にはスペースを含めることができます。大文字小文字やスペース位置などを正確に入力しておきましょう。

   app には`/Applications`にインストールされているファイル名を入力しておきます。

1. 書き上げた定義ファイルの確認

   まず実際にインストールできるか確認しましょう。手順の中ですでに PC 内にインストール済みなので、アンインストールするか、`-f`オプションで上書きしましょう。

   ```bash
   $ brew cask install -f 〇〇
   ```

   インストール後動作に問題がなければ OK です。

   定義ファイルのシンタックスチェックや、必要事項の記入漏れなどを確認・自動修正してくれるコマンドが備えれらています。

   ```bash
   $ brew cask audit 〇〇 --download
   $ brew cask style Casks/〇〇.rb

   $ brew cask style Casks/〇〇.rb --fix   // <- 自動修正してくれます。
   ```

   これにて定義ファイルが完成です。次は PR をしていきます。

1. 変更を commit・push する

   コミットメッセージにもガイドラインが決まっています。

   > The first line is commit summary, 50 characters or less,<br>
   > Followed by an empty line,<br>
   > Followed by an explanation of the commit, wrapped to 72 characters.

   [ここ](https://github.com/Homebrew/homebrew-cask/blob/master/doc/development/adding_a_cask.md#commit-messages)には例とかもっと詳しいガイドラインの紹介とかがあります
   そして fork した自分のリポジトリに push します

   ```bash
   $ git push <my-github-username> {branch名}
   ```

1. プルリクエストを出す

   普通に Github 上でプルリクを発行します。メッセージに自動で必要項目の雛形が出てくるので記入、チェックを入れて PR しましょう。1~2 日ぐらいでレビュー or マージしてくれます。みなさん優しくて不都合があっても教えてくれます。

   これで晴れて homebrew のコントリビュータになれました！！ヤッタネ！！

1. 最後に作業した環境を戻しておきます

   推奨されているのでやっときましょう

   ```bash
   $ cd "$(brew --repository)"/Library/Taps/Homebrew/homebrew-cask
   $ git checkout master
   ```
