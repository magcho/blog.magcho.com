import React from 'react'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <main>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <p>
      <Link to="/">トップページに戻る</Link>
    </p>
  </main>
)

export default NotFoundPage
