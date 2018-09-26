import React from 'react'
import Helmet from 'react-helmet'



const snsOgp = (props) => {
  const ogType = props.pageUrl == '/' ? 'website' : 'article'
  return(
    <Helmet
      meta={[
        { name: 'property', content: 'og:title' },{ name: 'content', content: `${props.ogType}` },
        { name: 'property', content: 'og:url' },{ name: 'content', content: `${props.directLink}` },
        { name: 'property', content: 'og:image' },{ name: 'content', content: `${props.ogType}` },
        { name: 'property', content: 'og:site_name' },{ name: 'content', content: `${ogType}` },
        { name: 'name', content: 'twitter:card' },{ name: 'content', content: `summary` },
        { name: 'name', content: 'twitter:site' },{ name: 'content', content: `@magcho0527` },
      ]}
    />
  )
}




// <!-- ※基本共通設定 -->
// <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
// <title> ページの タイトル</title>
// <meta property="og:title" content=" ページの タイトル" />
// <meta property="og:type" content=" ページの種類" />
// <meta property="og:url" content=" ページの URL" />
// <meta property="og:image" content=" サムネイル画像の URL" />
// <meta property="og:site_name" content="サイト名" />
// <meta property="og:description" content=" ページのディスクリプション" />

// <!--  Facebook用設定 -->
// <meta property="fb:app_id" content="App-ID（15文字の半角数字）" />
// もしくは
// <meta property="fb:admins" content="adminID（15文字の半角数字）" />

// <!-- ※ Twitter共通設定 -->
// <meta name="twitter:card" content=" Twitterカードの種類" />

export default snsOgp