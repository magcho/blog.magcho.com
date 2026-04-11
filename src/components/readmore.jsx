import React from 'react'
import { Link } from 'gatsby'

import './readmore.scss'

const ReadMore = props => {
  return (
    <Link
      to={props.slug}
      style={{ textDecoration: 'none' }}
      className="readmore-link"
      aria-label={`「${props.title}」を読む`}
    >
      <span className={`readmore ${props.category}`}>続きを読む</span>
    </Link>
  )
}

export default ReadMore
