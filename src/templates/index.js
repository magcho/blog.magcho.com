import React from 'react'
import { Link } from 'gatsby'
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
    const siteMetadata = this.props.pageContext.additionalContext.siteMetadata
    const posts = get(this, 'props.pageContext.group')
    const tagsList = this.props.pageContext.additionalContext.tagsList

    const index = this.props.pageContext.index
    let previousUrl
    if(index >= 2){
      previousUrl = index -1 != 1 ? (index - 1).toString() : "/"
    }else{
      previousUrl = ""
    }
    const nextUrl = this.props.pageContext.last ? "" : (index + 1).toString()
    const lastPageFlag = this.props.pageContext.last

      
    return (
      <Layout location={this.props.location}
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
        <Ogp props={this.props}/>
        {posts.map(({ node }) => {
          return (
            <article key={node.fields.slug}>
              <div className={'content-header'}>
                <div className={'title'}>
                  <Link to={node.fields.slug}>
                    <PostTitle category={node.frontmatter.category}>
                      {node.frontmatter.title}
                    </PostTitle>
                  </Link>
                </div>
                <Penguin category={node.frontmatter.category}  date={node.frontmatter.date}/>
              </div>
              <div className={'content-body'} dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              <ReadMore category={node.frontmatter.category} slug={node.fields.slug}/>
              <Tags list={node.frontmatter.tags || [] } category={node.frontmatter.category || []}/>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex
