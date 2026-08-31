import React from 'react'
import { Link } from 'gatsby'

import '../templates/style.scss'

const NotFoundPage = () => (
  <main className="not-found" id="main-content">
    <h1>ページが見つかりません</h1>
    <p>URLが変更されたか、入力に誤りがある可能性があります。</p>
    <Link to="/">トップページへ戻る</Link>
  </main>
)

export default NotFoundPage
