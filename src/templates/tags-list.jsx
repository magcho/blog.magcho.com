import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Penguin from '../components/penguin'
import '../templates/style.scss'
import './post-list.scss'
import Tags from '../components/tags'
import PostTitle from '../components/posttitle'
import Ogp from '../components/ogp'
import ReadMore from '../components/readmore'

class BlogPostTemplate extends React.Component {
  render() {
    const postList = this.props.pageContext.postList
    const siteTitle = this.props.pageContext.siteMetadata.title
    const siteDescription = this.props.pageContext.siteMetadata.description
    const tagName = this.props.pageContext.tagName
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
          title={`${tagName} | ${siteTitle}`}
        />
        <Ogp props={this.props} />
        <h1 className="tag-name">#{tagName}</h1>
        {postList.map(item => {
          return (
            <article key={item.node.fields.slug} className="post">
              <Link to={item.node.fields.slug}>
                <div className="eyecatch" />
                <PostTitle category={item.node.frontmatter.category}>
                  {item.node.frontmatter.title}
                </PostTitle>
                <Penguin
                  category={item.node.frontmatter.category}
                  date={item.node.frontmatter.date}
                />
                <p className="excerpt">{item.node.excerpt}</p>
              </Link>
              <ReadMore
                category={item.node.frontmatter.category}
                slug={item.node.fields.slug}
              />
              <Tags
                list={item.node.frontmatter.tags}
                category={item.node.frontmatter.category}
              />
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogPostTemplate
