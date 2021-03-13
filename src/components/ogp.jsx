import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const OgpHelmet = ({ description, title }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const ogpTitle = title || site.siteMetadata.title
  const ogpDescription = description || site.siteMetadata.description

  return (
    <Helmet htmlAttributes={{ prefix: 'og: http:ogp.me/ns#' }}>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@magcho0527" />
      <meta name="twitter:player" content="@magcho0527" />
      <meta property="og:title" content={ogpTitle} />

      <meta property="og:description" content={ogpDescription} />
      <meta property="og:site_name" content={ogpTitle} />
      <meta property="og:image" content={`${site.siteMetadata.siteUrl}/twitter-icon.jpg`} />
    </Helmet>
  )
}

export default OgpHelmet
