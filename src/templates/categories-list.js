import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import '../templates/style.scss'
import './post-list.scss'
import Tags from '../components/tags'
import PostTitle from '../components/posttitle'
import Penguin from '../components/penguin'
import Ogp from '../components/ogp'
import ReadMore from '../components/readmore'

class BlogPostTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = this.props.data.site.description
    const postList = this.props.data.allMarkdownRemark.edges
    let tagsList = []
    this.props.pageContext.siteTagsList.map(item => {
      tagsList.push({ fieldValue: item.fieldValue })
    })

    return (
      <Layout
        location={this.props.location}
        siteTitle={siteTitle}
        tagsList={tagsList}
        previous=""
        next=""
      >
        <Helmet
          htmlAttributes={{ lang: 'ja' }}
          meta={[
            {
              name: 'description',
              content: siteDescription,
            },
          ]}
          title={`${this.props.pageContext.categoryName} | ${siteTitle}`}
        />
        <Ogp props={this.props} />
        <h1 className="tag-name">【{this.props.pageContext.categoryName}】</h1>
        {postList.map(item => (
          <article key={item.node.fields.slug} className="post">
            <Link to={item.node.fields.slug}>
              <div className="eyecatch" />
              <PostTitle category={this.props.pageContext.categoryName}>
                {item.node.frontmatter.title}
              </PostTitle>
              <Penguin
                category={this.props.pageContext.categoryName}
                date={item.node.frontmatter.date}
              />
              <p className="excerpt">{item.node.excerpt}</p>
            </Link>
            <ReadMore
              category={this.props.pageContext.categoryName}
              slug={item.node.fields.slug}
            />
            <Tags
              list={item.node.frontmatter.tags}
              category={this.props.pageContext.categoryName}
            />
          </article>
        ))}
      </Layout>
    )
  }
}

export default BlogPostTemplate

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
