---
layout: post
title: .gitignoreを自動生成するサブコマンドを作ろう
category: プログラミング
date: 2020-06-14
tags:
  - git
---

## demo

[![asciicast](https://asciinema.org/a/339422.svg)](https://asciinema.org/a/339422)

gitignoreを言語とに自動生成してくれるサービスはいくつかありますが、わざわざwebサイトを開くのも面倒です。
幸いなことにgitignore.ioがapiを提供してくれています、これを利用してgitにサブコマンドを追加しましょう。

ついでに.gitignoreを上書き・追記の確認・gitignore.ioにテンプレートが存在しない場合はエラーを表示などもあると親切ですね。shにするとこんな感じに。

```bash
#!/bin/bash
RES=$(curl -Ls http://gitignore.io/api/$1	-w 'http_code=%{http_code}')

if [ $1 = 'list' ]; then
	echo "$RES"
	exit 0
fi

if [ 200 = "${RES##*http_code=}" ]; then
	if [ -f .gitignore ]; then
		echo -n ".gitignore already exits. Append ? [y/N/o]: "
		read ANS
		case $ANS in
			[Yy]*)
				echo 'Append'
				echo "${RES%%http_code*}" >> .gitignore
				;;
			"" | [Nn]*)
				echo 'Cancel'
				;;
			[Oo]*)
				echo 'Overwrid'
				echo "${RES%%http_code*}" > .gitignore
				;;
	     esac
	else
		echo 'Created .gitignore'
		echo "${RES%%http_code*}" > .gitignore
	fi
else
	echo "$1 is undefined."
fi
```

.gitconfigに書くとときには全体を関数にする・ダブルクォーテーションをエスケープ・`echo -n`が使えないので`printf`に差し替えなどをすると以下になります。

書いていて気づいたんですが、#はエスケープせずに動きますね。

```yaml:title=.gitconfig
[alias]
  # gitignoreの言語別セットを自動生成
  ignore = "!f(){ RES=$(curl -Ls http://gitignore.io/api/$1  -w 'http_code=%{http_code}'); if [ \"$1\" = 'list' ]; then echo \"$RES\";exit 0; fi; if [ 200 = \"${RES##*http_code=}\" ]; then if [ -f .gitignore ]; then printf  \".gitignore already exits. Append ? [y/N/o]: \";read ANS;case $ANS in [Yy]*) echo 'Append';echo \"${RES%%http_code*}\" >> .gitignore;;\"\" | [Nn]*)echo 'Cancel';;[Oo]*)echo 'Overwride';echo \"${RES%%http_code*}\" > .gitignore;;esac;else echo \"${RES%%http_code*}\" > .gitignore;fi;else echo \"$1 is undefined.\" ;fi;};f "
```

## 使い方

```bash
git ignore [language]
git ignore java
git ignore node,stylus
```
