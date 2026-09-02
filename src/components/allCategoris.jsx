import * as React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

const AllCategories = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 100) {
        group(field: { frontmatter: { category: SELECT } }) {
          fieldValue
        }
      }
    }
  `)

  const categories = allMarkdownRemark.group.map((category) => category.fieldValue)
  return (
    <nav className="category-link" aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="title">Categories</h2>
      <ul>
        {categories.map((category) => {
          return (
            <li key={category}>
              <Link to={`/category/${category.toLowerCase()}/`}>{category}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AllCategories
