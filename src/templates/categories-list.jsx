import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'

import '../templates/style.scss'
import './post-list.scss'
import Layout from '../components/layout'
import Tags from '../components/tags'
import PostTitle from '../components/posttitle'
import Penguin from '../components/penguin'
import Ogp from '../components/ogp'
import ReadMore from '../components/readmore'

const CategoryPostListTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const postList = data.allMarkdownRemark.edges

  return (
    <Layout location={location} siteTitle={siteTitle} previous="" next="">
      <Helmet
        htmlAttributes={{ lang: 'ja' }}
        meta={[
          {
            name: 'description',
            content: data.site.siteMetadata.description,
          },
        ]}
        title={`${pageContext.categoryName} | ${siteTitle}`}
      />
      <Ogp />
      <h1 className="tag-name">【{pageContext.categoryName}】</h1>
      {postList.map((item) => (
        <article key={item.node.fields.slug} className="post">
          <Link to={item.node.fields.slug}>
            <div className="eyecatch" />
            <PostTitle category={pageContext.categoryName}>{item.node.frontmatter.title}</PostTitle>
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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $categoryName } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
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
