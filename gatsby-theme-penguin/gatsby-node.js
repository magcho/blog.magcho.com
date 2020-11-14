const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
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
  `)

  if (result.errors) {
    throw result.errors
  }

  // create index pages
  const posts = result.data.allMarkdownRemark.edges
  const indexTempalte = path.resolve('./src/templates/index.jsx')
  const POST_PAR_PAGE = 10
  const numPages = Math.ceil(posts.length / POST_PAR_PAGE)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve('./src/templates/index.jsx'),
      context: {
        limit: POST_PAR_PAGE,
        skip: i * POST_PAR_PAGE,
        numPages,
        currentPage: i + 1,
        result: result,
        tagsList: result.data.allMarkdownRemark.group,
        siteMetadata: result.data.site.siteMetadata,
      },
    })
  })

  // blog posts
  const blogPostTemplate = path.resolve('./src/templates/blog-post.jsx')
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
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
