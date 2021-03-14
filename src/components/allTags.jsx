import * as React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

const AllTags = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const tags = allMarkdownRemark.group.sort((a, b) => {
    if (a.totalCount > b.totalCount) return -1
    if (a.totalCount < b.totalCount) return 1
    return 0
  })

  return (
    <nav className="tag-link">
      <h1 className="title">Tags</h1>
      <ul>
        {tags.map((tag) => {
          if (tag.fieldValue == '') {
            return ''
          }
          return (
            <li key={tag.fieldValue}>
              <Link to={`/tag/${tag.fieldValue}/`}>{tag.fieldValue}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AllTags
