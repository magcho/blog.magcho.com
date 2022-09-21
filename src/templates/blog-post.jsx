import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import '../templates/style.scss'
import Tags from '../components/tags'
import PostTitle from '../components/posttitle'
import Ogp from '../components/ogp'
import GithubLink from '../components/githubLink'

export const Head = ({ data }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const postDescription = post.excerpt

  return (
    <>
      <title>{`${post.frontmatter.title} | ${siteTitle}`}</title>
      <meta name="description" content={postDescription} />
      <Ogp title={siteTitle} description={postDescription} />
    </>
  )
}

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  const previousPath = pageContext.previous ? pageContext.previous.fields.slug : null
  const nextPath = pageContext.next ? pageContext.next.fields.slug : null

  return (
    <Layout location={location} siteTitle={siteTitle} previousPath={previousPath} nextPath={nextPath}>
      <article key={post.id}>
        <div className={'content-header'}>
          <div className={'title'}>
            <PostTitle category={post.frontmatter.category}>{post.frontmatter.title}</PostTitle>
          </div>
        </div>
        <div id="article-meta">
          <span>
            Created at: <time dateTime={post.frontmatter.fullDate}>{post.frontmatter.fullDate}</time>
          </span>
          <span>
            Last updated at:
            <time dateTime={post.fields.lastFileUpdatedAt}>
              {post.fields.lastFileUpdatedAt} (Revision: {post.fields.fileRevisionCount})
            </time>
          </span>
        </div>

        <Tags list={post.frontmatter.tags || []} category={post.frontmatter.category || []} />
        <div className={'content-body'} dangerouslySetInnerHTML={{ __html: post.html }} />
        <Tags list={post.frontmatter.tags || []} category={post.frontmatter.category || []} />
        <GithubLink filePath={post.fileAbsolutePath} />
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fileAbsolutePath
      frontmatter {
        title
        tags
        category
        fullDate: date(formatString: "YYYY-MM-DD")
      }
      fields {
        lastFileUpdatedAt(formatString: "YYYY-MM-DD")
        fileRevisionCount
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
