import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Penguin from '../components/penguin'
import '../templates/style.scss'
import Tags from '../components/tags'
import PostTitle from '../components/posttitle'
import ReadMore from '../components/readmore'
import Ogp from '../components/ogp'

class BlogIndex extends React.Component {
  render() {
    const siteMetadata = this.props.data.site.siteMetadata
    const posts = this.props.data.allMarkdownRemark.edges
    const tagsList = this.props.data.allMarkdownRemark.group

    // const index = this.props.pageContext.index
    const currentPageNum = this.props.pageContext.currentPage
    let previousUrl
    if (currentPageNum >= 2) {
      previousUrl = currentPageNum - 1 != 1 ? (currentPageNum - 1).toString() : '/'
    } else {
      previousUrl = ''
    }
    const lastPageFlag = this.props.pageContext.numPages == currentPageNum
    const nextUrl = lastPageFlag ? '' : (currentPageNum + 1).toString()

    return (
      <Layout
        location={this.props.location}
        siteTitle={siteMetadata.title}
        tagsList={tagsList}
        previous={previousUrl}
        next={nextUrl}
        lastPageFlag={lastPageFlag}
      >
        <Helmet
          htmlAttributes={{ lang: 'ja' }}
          meta={[{ name: 'description', content: siteMetadata.description }]}
          title={siteMetadata.title}
        />
        <Ogp props={this.props} />
        {posts.map(({ node }) => {
          return (
            <article key={node.fields.slug}>
              <div className={'content-header'}>
                <div className={'title'}>
                  <Link to={node.fields.slug}>
                    <PostTitle category={node.frontmatter.category}>{node.frontmatter.title}</PostTitle>
                  </Link>
                </div>
                <Penguin category={node.frontmatter.category} date={node.frontmatter.date} />
              </div>
              <div className={'content-body'}>
                <p className={'excerpt'} dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
              <ReadMore category={node.frontmatter.category} slug={node.fields.slug} />
              <Tags list={node.frontmatter.tags || []} category={node.frontmatter.category || []} />
            </article>
          )
        })}
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MM/DD")
            title
            category
            tags
          }
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        edges {
          node {
            id
            excerpt(pruneLength: 400)
            frontmatter {
              date(formatString: "MM/DD")
              title
              category
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`

export default BlogIndex
