import React from 'react'
import { Link } from 'gatsby'

const Cate = props => {
  if (props.category.category != '') {
    return (
      <li className={props.category.category}>
        <Link to={`/category/${props.category.category}/`}>
          【{props.category.category}】
        </Link>
      </li>
    )
  }
  return null
}
const Tags = props => {
  return (
    <ul className="content-tags">
      <Cate category={props} />
      {props.list.map(tag => {
        return (
          <li key={tag} className={tag}>
            <Link to={`/tag/${tag}/`}>{tag}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Tags
