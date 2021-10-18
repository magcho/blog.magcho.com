---
layout: post
title: GitHub Actionsのセルフホストランナーを試す
category:  プログラミング
date: 2021-10-18
tags:
- github
---

## 初めに
GitHub Actionsには2000分/月の無料枠がありますがビジュアルテストなど時間がかかりそうなテストをたくさん回そうとすると足りなくなることがあります。GitHubが提供しているSelf hosted runnerのエージェントを自前で用意したマシンに入れることで代わりの実行環境として利用できます。

## VM

Oracle cloudのARMマシンが余っていたのでこのマシンたちを利用して構築しました。[セルフホストランナーをサポートするアーキテクチャとオペレーティングシステム](https://docs.github.com/ja/actions/hosting-your-own-runners/about-self-hosted-runners#supported-architectures-and-operating-systems-for-self-hosted-runners )に記載されているようにLinuxであればARMでも利用できます。

## インストール

Jenkinsのようにマシンにエージェントをインストールしてから設定するのかと思いきや、まず最初に設定するリポジトリ/Organizationの設定画面からnew self-hosted runnerをクリックし、表示されるコマンドをマシンに入力していきます。

このself-hosted runnerはエージェント側からGitHubに向けてのhttpsのロングポーリング[^1]になっているのでIPの固定や外部からのネットワークを開けることなく利用できます。オフィスや自宅サーバーに優しいです。外から内向きの通信が必要ないのでFWで塞いでおきました。

## 運用

self-hosted runnerをActionsで利用するには`runs-on: 'self-hosted'`とするかインストール時に付与したラベル名で利用できます。

複数マシンに同一ラベルを付与しておけば`runs-on: 'hoge-label'`で利用できます。同一ラベルが付与されたマシンのうちIdle状態のマシンに割り当てられます。何度か試してみたところ複数台がIdle状態であればマシンのうち一番若い名前が付与されたマシンから割り当てられるようです。

多めにテスト回しそうだなと思ったときにマシンを追加で登録して、忙しい時期が過ぎたら追加で増やしたマシンを削除すれば良さそうです。ただ、GitHub上ではこのメトリクスが取れないので自前で監視のしくみを整える必要がありそうです。

## 雑感

Githubの通常の実行環境であれば毎回マシンが破棄されるで依存パッケージ等のキャッシュや、環境変数など気を遣う部分が多かったのですがセルフホストランナーではマシンの環境変数やフォルダーへのアクセスができるので対応しやすいです。



[^1]: https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#communication-between-self-hosted-runners-and-github
