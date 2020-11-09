import React from 'react'
import { Link } from 'gatsby'

import './readmore.scss'

const ReadMore = props => {
  let color = ''
  switch (props.category) {
    case '舞台技術':
      color = '#7CB3D9'
      break

    case '日記':
      color = '#00bb16'
      break

    case '電子工作':
      color = '#F18AF2'
      break

    case 'プログラミング':
      color = '#F29333'
      break

    default:
      color = '#b0cc05'
      break
  }
  return (
    <Link
      to={props.slug}
      style={{ textDecoration: 'none' }}
      className="readmore-link"
    >
      <div className={`readmore ${props.category}`}>続きを読む</div>
    </Link>
  )
}

export default ReadMore
