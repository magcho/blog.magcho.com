import React from 'react'
import { Link } from 'gatsby'

const MAX_VISIBLE_TAGS = 3

const Cate = ({ category }) => {
  if (typeof category === 'string' && category.trim()) {
    return (
      <li className="content-category">
        <Link to={`/category/${category}/`}>【{category}】</Link>
      </li>
    )
  }
  return null
}

const TagLinks = ({ tags }) =>
  tags.map((tag) => (
    <li key={tag}>
      <Link to={`/tag/${tag.toLowerCase()}/`}>{tag}</Link>
    </li>
  ))

const Tags = ({ list, category }) => {
  const safeList = Array.isArray(list) ? list : []
  const visibleTags = safeList.slice(0, MAX_VISIBLE_TAGS)
  const hiddenTags = safeList.slice(MAX_VISIBLE_TAGS)

  return (
    <ul className="content-tags">
      <Cate category={category} />
      <TagLinks tags={visibleTags} />
      {hiddenTags.length > 0 && (
        <li className="content-tags-disclosure">
          <details>
            <summary>{`+${hiddenTags.length} more tags`}</summary>
            <ul aria-label="Additional tags">
              <TagLinks tags={hiddenTags} />
            </ul>
          </details>
        </li>
      )}
    </ul>
  )
}

export default Tags
