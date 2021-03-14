import * as React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Penguin from '../components/penguin'
import '../templates/style.scss'
import Tags from '../components/tags'
import PostTitle from '../components/posttitle'
import Ogp from '../components/ogp'

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const postDescription = post.excerpt
  const { previous, next } = pageContext
  const tagsList = data.allMarkdownRemark.group

  return (
    <Layout
      location={location}
      siteTitle={siteTitle}
      tagsList={tagsList}
      previous={previous}
      next={next}
      parent={'blog-post'}
    >
      <Helmet
        htmlAttributes={{ lang: 'ja' }}
        meta={[
          {
            name: 'description',
            content: postDescription,
          },
        ]}
        title={`${post.frontmatter.title} | ${siteTitle}`}
      />
      <Ogp title={siteTitle} description={postDescription} />

      <article key={post.id}>
        <div className={'content-header'}>
          <div className={'title'}>
            <PostTitle category={post.frontmatter.category}>{post.frontmatter.title}</PostTitle>
          </div>
          <div className={'date'}>
            <Penguin category={post.frontmatter.category} date={post.frontmatter.date} />
          </div>
        </div>
        <Tags list={post.frontmatter.tags || []} category={post.frontmatter.category || []} />
        <div className={'content-body'} dangerouslySetInnerHTML={{ __html: post.html }} />
        <Tags list={post.frontmatter.tags || []} category={post.frontmatter.category || []} />
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
      frontmatter {
        title
        tags
        category
        date(formatString: "MM/DD")
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
