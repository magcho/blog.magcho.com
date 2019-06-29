import React from 'react'
import { Link } from 'gatsby'

import previousPenguin from '../assets/penguin-previous.svg'
import nextPenguin from '../assets/penguin-next.svg'

const CategoriesLinks = () => {
  const categories = ['舞台技術', '電子工作', 'プログラミング', '日記']
  return (
    <aside className="category-link">
      <h1 className="title">Categories</h1>
      <ul>
        {categories.map(category => {
          return (
            <li key={category}>
              <Link to={`/category/${category}/`}>{category}</Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

const TagsLinks = props => {
  return (
    <aside className="tag-link">
      <h1 className="title">Tags</h1>
      <ul>
        {props.tags.map(tag => {
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
    </aside>
  )
}

class Pagenate extends React.Component {
  render() {
    const parentProps = this.props.props
    const path = this.props.path

    let previousPath
    let nextPath

    if (path.match(/^\/\d*$/) != null) {
      // 記事一覧ページ
      previousPath = parentProps.previous != '' ? parentProps.previous : ''
      if (!this.props.lastPageFlag) {
        nextPath = parentProps.next != '' ? parentProps.next : ''
      } else {
        nextPath = ''
      }
    } else if (path.match(/^\/tag\//) || path.match(/^\/category\//)) {
      // タグ カテゴリー別一覧ページ
      previousPath = ''
      nextPath = ''
    } else {
      // 記事個別ページ
      previousPath =
        parentProps.previous != null ? parentProps.previous.fields.slug : ''
      nextPath = parentProps.next != null ? parentProps.next.fields.slug : ''
    }

    let previousComponent
    let nextComponent
    if (previousPath != '') {
      previousComponent = (
        <div className="previous">
          <Link to={previousPath}>
            <img src={previousPenguin} alt="Previous" />
            <p>←Previous</p>
          </Link>
        </div>
      )
    } else {
      previousComponent = <></>
    }
    if (nextPath != '') {
      nextComponent = (
        <div className="next">
          <Link to={nextPath}>
            <img src={nextPenguin} alt="Next" />
            <p>Next→</p>
          </Link>
        </div>
      )
    } else {
      nextComponent = <></>
    }
    return (
      <div className="pagenate">
        {previousComponent}
        {nextComponent}
      </div>
    )
  }
}

const Footer = () => (
  <footer>
    <p className="copyright">(C)copyright magcho 2018-</p>
  </footer>
)

class Template extends React.Component {
  render() {
    const { location, siteTitle, children } = this.props
    let headerStyle
    let headerAnkerStyle
    if (this.props.parent != undefined) {
      headerStyle = { height: '200px' }
      headerAnkerStyle = { lineHeight: '200px' }
    } else {
      headerAnkerStyle = {}
      headerStyle = {}
    }
    return (
      <>
        <header style={headerStyle}>
          <Link to={'/'} style={headerAnkerStyle}>
            <div className="title">{siteTitle}</div>
          </Link>
        </header>
        <div className="mainframe">
          <main>{children}</main>
          <CategoriesLinks />
          <TagsLinks tags={this.props.tagsList} />
          <Pagenate
            props={this.props}
            path={location.pathname}
            lastPageFlag={this.props.lastPageFlag}
          />
        </div>

        <Footer />
      </>
    )
  }
}

export default Template
