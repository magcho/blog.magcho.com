---
layout: post
title: Gatsby.jsをv3に更新した
category: プログラミング
date: 2021-03-14
tags:
  - gatsby.js
---

2021年3月にGatsby.jsのv3がリリースされました、多少の破壊的な変更はあるもののv1からv2の時ほどの苦労はなくアップデートできた気がします。

いくつか進化がありますが、一番にビルド速度が一段と早くなった気がします。HotReloadが特に早くなりエディタからブラウザに画面を切り替えるとすでにリロードされており待ち時間が無くなっているように感じます、すごい。さらにはブラウザ上にエラーメッセージがモーダルでしっかり表示されるようになりました。これで開発も一段と楽になった気がします。また、いよいよincremental buildが正式に使えるようになりました。deployにかかる時間が大幅に短縮されるのではないでしょうか。

v2からv3への更新にあたっていくつかの破壊的な更新があるため多少修正しないとビルドが通りませんでした。内容は公式の[マイグレーションガイド](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#updating-your-dependencies)に従えばOKでした。

また、v2の時にもいろいろなアップデートがあり推奨される記法が変わっていたのでこれらも修正していきます。

## 更新作業

まずはnpmでGatsby.jsをアップデートします。これはnpm7の仕様変更によるものですがpeer dependencies周りでエラーになったので`npm install gatsby@latest --legacy-peer-deps`オプション付きで更新します。

次にgraphql関係のimportを修正しました。[マイグレーションガイド](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#using-a-global-graphql-tag-for-queries) にも書いてありますが`graphql`がグローバルではなくなったのでインポート文を追加しておきます。

```diff-js
+ import { graphql } from "gatsby"
```

また、まだv3になりたてだからか有名どころのGatsby.jsのプラグインでも未対応なものが多い印象です。(gatsby-transformer-remarkとか)インストール時やビルド時に未対応である旨のwarningが出ますが自分の環境では今のところ問題なくビルドできます。

自分の環境ではこの修正だけでビルドが通るようになりました。楽チン！しかしマイグレーションガイドにもあるようにv3で非推奨になりv4で削除する記法が多くありますのでさらに対応していきます。

１年ほど前はステートのあるcomponentはclass記法で書いていましたがいつの間にかReact.jsに追従したのかfunction記法になっていました。以下のように修正していきます。

```js
// class記法(v2)
export defalut class HogeComponent extends React.Component {
  const blogTitle = this.props.data.site.siteMetadata.title
  render(){
    return(
	  <>
	    blog title: {blogTitle}
	  </>
	)
  }
}
export const hogeQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`


// funciton記法(v3)
import { graphql } from 'gatsby'

export defalut const HogeComponent = ({ data }) => {
  const blogTitle = data.site.siteMetadata
  return (
    <>
      blog title: {blogTitle}
	</>
  )
}
export const hogeQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```

次は`useStaticQuery`に対応します。今までは`gatsby-node.js`から直接呼ばれていたpage componentだけがgraphqlを通じてデータをfetchしていました。そこから呼ばれるcomponentへはpropsを用いたバケツリレーをしていましたが`useStaticQuery`が登場したことによりpage componentに似た記法でcomponent自身がデータをfetchできるようになりました[^1] 。

```js
import { useStaticQuery, graphql } from 'gatsby'
export default const FugaComponent = () => {
  const { site } = useStaticQuery(graphql`
	query {
	  site {
	    siteMetadata {
		  title
		}
	  }
	}
  `)
  const siteTitle = site.sitemetadata.title

  return (
	<div>
	  <h1>{siteTitle}</h1>
	</div>
  )
}
```

## Incremental Build

[リリースノート](https://www.gatsbyjs.com/docs/reference/release-notes/v3.0/#incremental-builds-in-oss)に書いてありますが、incremental buildがデフォルトで有効化されました。`/.cache/`と`/public/`ディレクトリの内容を２回目以降のビルドで再利用するようになりビルド時間が短縮されました。デプロイフローにてこれらのキャッシュを破棄しないように修正する必要がありそうです。

このブログは現状Netlifyでbuild and deployをしていますがビルドが遅いのが気になっていました。Netlifyのbuild環境はRuby/Python/Go/Rusy/Node..などなどたくさんのランタイムをインストールした後にビルドを始めるので時間がかかります、なのでGithub Actionsに乗り換えることを検討中です。

[^1]: StaticQueryという物を利用すれば今までもcomponent自身でfetchできていたようです。知らなかった。
