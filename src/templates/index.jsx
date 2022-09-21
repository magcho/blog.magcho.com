import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Penguin from '../components/penguin'
import '../templates/style.scss'
import Tags from '../components/tags'
import PostTitle from '../components/posttitle'
import ReadMore from '../components/readmore'
import Ogp from '../components/ogp'

export const Head = ({ data }) => {
  const siteMetadata = data.site.siteMetadata

  return (
    <>
      <title>{siteMetadata.title}</title>
      <meta name="description" content="{siteMetadata.description}" />
      <Ogp />
    </>
  )
}

const BlogIndex = ({ data, location, pageContext }) => {
  const siteMetadata = data.site.siteMetadata
  const posts = data.allMarkdownRemark.edges

  const currentPageNum = pageContext.currentPage

  let previousPath
  let nextPath
  if (3 <= currentPageNum) {
    previousPath = `/${currentPageNum - 1}`
  } else if (currentPageNum === 2) {
    previousPath = '/'
  }

  if (pageContext.numPages !== currentPageNum) {
    nextPath = `/${currentPageNum + 1}`
  }

  return (
    <Layout siteTitle={siteMetadata.title} previousPath={previousPath} nextPath={nextPath}>
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

export default BlogIndex

export const BlogListQuery = graphql`
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
