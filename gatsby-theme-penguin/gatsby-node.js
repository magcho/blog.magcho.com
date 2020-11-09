const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.jsx')
    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                title
                description
              }
            }
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
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
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges
        const postsPerPage = 10
        const numPages = Math.ceil(posts.length / postsPerPage)
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/` : `/${i + 1}`,
            component: path.resolve('./src/templates/index.jsx'),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
              result: result,
              tagsList: result.data.allMarkdownRemark.group,
              siteMetadata: result.data.site.siteMetadata,
            },
          })
        })

        // タグ別記事ページ
        _.each(result.data.allMarkdownRemark.group, items => {
          createPage({
            path: `/tag/${items.fieldValue}/`,
            component: path.resolve('./src/templates/tags-list.jsx'),
            context: {
              postList: items.edges,
              tagName: items.fieldValue,
              siteMetadata: result.data.site.siteMetadata,
              siteTagsList: result.data.allMarkdownRemark.group,
            },
          })
        })

        const categoriesList = ['舞台技術', '電子工作', 'プログラミング', '日記']
        _.each(categoriesList, category => {
          createPage({
            path: `/category/${category}/`,
            component: path.resolve('./src/templates/categories-list.jsx'),
            context: {
              categoryName: category,
              siteTagsList: result.data.allMarkdownRemark.group,
            },
          })
        })

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
