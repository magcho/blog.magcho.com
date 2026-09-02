import * as React from 'react'
import { Link, graphql } from 'gatsby'

import '../templates/style.scss'
import './post-list.scss'
import Layout from '../components/layout'
import Tags from '../components/tags'
import PostTitle from '../components/posttitle'
import Penguin from '../components/penguin'
import Ogp from '../components/ogp'
import ReadMore from '../components/readmore'

export const Head = ({ data, pageContext }) => {
  const categoryName = pageContext.categoryName
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <>
      <title>{`${categoryName} | ${siteTitle}`}</title>
      <meta name="description" content={siteDescription} />
      <Ogp title={siteTitle} description={siteDescription} />
    </>
  )
}

const CategoryPostListTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const postList = data.allMarkdownRemark.edges

  return (
    <Layout location={location} siteTitle={siteTitle} previous="" next="">
      <div className="listing-heading">
        <h1>【{pageContext.categoryName}】</h1>
      </div>
      {postList.map((item) => (
        <article key={item.node.fields.slug} className="post listing-card">
          <Link to={item.node.fields.slug}>
            <div className="eyecatch" />
            <PostTitle category={pageContext.categoryName} level="h2">
              {item.node.frontmatter.title}
            </PostTitle>
            <Penguin category={pageContext.categoryName} date={item.node.frontmatter.date} />
            <p className="excerpt">{item.node.excerpt}</p>
          </Link>
          <ReadMore category={pageContext.categoryName} slug={item.node.fields.slug} />
          <Tags list={item.node.frontmatter.tags} category={pageContext.categoryName} />
        </article>
      ))}
    </Layout>
  )
}

export default CategoryPostListTemplate

export const categoryPostList = graphql`
  query CategoryPage($categoryName: String) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: [{ frontmatter: { date: DESC } }]
      filter: { frontmatter: { category: { eq: $categoryName } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 180)
          fields {
            slug
          }
          frontmatter {
            title
            tags
            date(formatString: "MM/DD")
          }
        }
      }
    }
  }
`
