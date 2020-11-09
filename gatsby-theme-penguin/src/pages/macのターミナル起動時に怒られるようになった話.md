---
layout: post
title: macのターミナル起動時に怒られるようになった話
category: プログラミング
tags:
  - mac
date: 2018-06-05
---

今日ターミナルを起動すると

```bash
Can't locate local/lib.pm in @INC (you may need to install the local::lib module)
```

と表示されるようになった。とりあえず perl を最新にしてみようと plenv をインストール
<https://github.com/tokuhirom/plenv#homebrew-on-mac-os-x>
公式の説明どうりに

```bash
$ brew install plenv
$ brew install perl-build
```

.bachrc に追記

```bash
if which plenv > /dev/null; then eval "$(plenv init -)"; fi
```

最新版をダウンロード、インストール

```bash
$ plenv install 5.26.2
$ plenv global 5.26.2
```

パッケージマネージャーもインストール(pip 的なやつ)

```bash
$ plenv install-cpanm
$ PLENV_INSTALL_CPANM="-v" plenv install-cpanm
```

そして local/lib.pm をインストール

```bash
$ cpan
$ install local/lib.pm
```
