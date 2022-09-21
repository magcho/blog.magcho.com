import * as React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import Penguin from '../components/penguin'
import '../templates/style.scss'
import './post-list.scss'
import Tags from '../components/tags'
import PostTitle from '../components/posttitle'
import Ogp from '../components/ogp'
import ReadMore from '../components/readmore'

export const Head = ({ data, pageContext }) => {
  const tagName = pageContext.tagName
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.siteDescription

  return (
    <>
      <title>{`${tagName} | ${siteTitle}`}</title>
      <meta name="description" content={siteDescription} />
      <Ogp title={siteTitle} description={siteDescription} />
    </>
  )
}

const TagsListTemplate = ({ location, pageContext, data }) => {
  const siteTitle = data.site.siteMetadata.title
  const tagName = pageContext.tagName
  const postList = data.allMarkdownRemark.edges

  return (
    <Layout location={location} siteTitle={siteTitle} previous="" next="">
      <h1 className="tag-name">#{tagName}</h1>
      {postList.map((item) => {
        const slug = item.node.fields.slug
        const title = item.node.frontmatter.title
        const category = item.node.frontmatter.category
        const tags = item.node.frontmatter.tags
        const date = item.node.frontmatter.date
        const excerpt = item.node.excerpt

        return (
          <article key={slug} className="post">
            <Link to={slug}>
              <div className="eyecatch" />
              <PostTitle category={category}>{title}</PostTitle>
              <Penguin category={category} date={date} />
              <p className="excerpt">{excerpt}</p>
            </Link>
            <ReadMore category={category} slug={slug} />
            <Tags list={tags} category={category} />
          </article>
        )
      })}
    </Layout>
  )
}

export default TagsListTemplate

export const TagPostList = graphql`
  query TagPostList($tagName: String) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { eq: $tagName } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            title
            category
            tags
            date(formatString: "MM/DD")
          }
        }
      }
    }
  }
`
