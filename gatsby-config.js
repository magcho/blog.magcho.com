module.exports = {
  trailingSlash: 'always',
  siteMetadata: {
    title: "magcho's blog",
    author: 'magcho',
    description: 'magchoの日記とか思いつきを記録するブログ',
    siteUrl: 'https://blog.magcho.com',
    categories: ['舞台技術', '電子工作', 'プログラミング', '日記'],
    postParPage: 10,
    social: {
      twitter: '@magcho0527',
    },
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs-title',
            options: {
              className: 'code-title',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`UA-125180742-2`],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        setup: () => ({
          title: "magcho's blog",
          description: 'magchoの日記とか思いつきを記録するブログ',
          feed_url: 'https://blog.magcho.com/rss.xml',
          site_url: 'https://blog.magcho.com',
          language: 'ja',
        }),
        feeds: [
          {
            serialize: ({ query: { allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: `https://blog.magcho.com${node.fields.slug}`,
                  guid: `https://blog.magcho.com${node.fields.slug}`,
                  custom_elements: [{ 'content:encoded': node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(sort: [{ frontmatter: { date: DESC } }]) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "magcho's blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `magchoの雑記`,
        short_name: `magchoBlog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#7cb3d9`,
        display: `minimal-ui`,
        icon: `src/assets/icon.jpg`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
