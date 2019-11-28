import React from 'react'
import Helmet from 'react-helmet'

class OgpHelmet extends React.Component {
  render() {
    const parentProps = this.props.props
    let ogType = parentProps.location.pathname == '/' ? 'blog' : 'article'
    let ogTitle = ''
    let ogDescription = ''
    const locationPath = parentProps.location.pathname
    if (locationPath == '/') {
      // index
      ogTitle = parentProps.pageContext.siteMetadata.title
      ogDescription = parentProps.pageContext.siteMetadata.description
      ogType = 'blog'
    } else if (locationPath.match(/^\/\d*$/)) {
      // page
      ogTitle = parentProps.pageContext.siteMetadata.title
      ogDescription = parentProps.pageContext.siteMetadata.description
      ogType = 'blog'
    } else if (locationPath.match(/^\/category/) != null) {
      // category
      ogTitle = parentProps.data.site.siteMetadata.title
      ogDescription = parentProps.data.site.siteMetadata.description
      ogType = 'blog'
    } else if (locationPath.match(/^\/tag/) != null) {
      // tag
      ogTitle = parentProps.pageContext.siteMetadata.title
      ogDescription = parentProps.pageContext.siteMetadata.description
      ogType = 'blog'
    } else {
      // blog post
      ogTitle = `${parentProps.data.markdownRemark.frontmatter.title} | ${parentProps.data.site.siteMetadata.title}`
      ogDescription = parentProps.data.markdownRemark.excerpt
      ogType = 'article'
    }

    return (
      <Helmet htmlAttributes={{ prefix: 'og: http://ogp.me/ns#' }}>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@magcho0527" />
        <meta name="twitter:player" content="@magcho0527" />
        <meta property="og:title" content={ogTitle} />

        <meta property="og:type" content={ogType} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={parentProps.location.href} />
        <meta property="og:site_name" content={ogTitle} />
        <meta
          property="og:image"
          content={`${parentProps.location.origin}/twitter-icon.jpg`}
        />
      </Helmet>
    )
  }
}

export default OgpHelmet
