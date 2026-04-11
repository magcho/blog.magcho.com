import * as React from 'react'
import { Link } from 'gatsby'

import previousPenguin from '../assets/penguin-previous.svg'
import nextPenguin from '../assets/penguin-next.svg'
import previousPenguinWhite from '../assets/penguin-previous-white.svg'
import nextPenguinWhite from '../assets/penguin-next-white.svg'
import AllTags from '../components/allTags'
import AllCategories from '../components/allCategoris'

const Pagenate = ({ previousPath, nextPath }) => {
  let previousComponent
  let nextComponent

  if (previousPath) {
    previousComponent = (
      <div className="previous">
        <Link to={`${previousPath}`} aria-label="前のページへ">
          <img src={previousPenguin} alt="" className="light-mode" aria-hidden="true" />
          <img src={previousPenguinWhite} alt="" className="dark-mode" aria-hidden="true" />
          <span>←Previous</span>
        </Link>
      </div>
    )
  } else {
    previousComponent = <></>
  }
  if (nextPath) {
    nextComponent = (
      <div className="next">
        <Link to={`${nextPath}`} aria-label="次のページへ">
          <img src={nextPenguin} alt="" className="light-mode" aria-hidden="true" />
          <img src={nextPenguinWhite} alt="" className="dark-mode" aria-hidden="true" />
          <span>Next→</span>
        </Link>
      </div>
    )
  } else {
    nextComponent = <></>
  }

  return (
    <nav className="pagenate" aria-label="Pagination">
      {previousComponent}
      {nextComponent}
    </nav>
  )
}

const Template = ({ parent, siteTitle, children, previousPath, nextPath }) => {
  let headerStyle
  let headerAnkerStyle
  if (parent != undefined) {
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
        <AllCategories />
        <AllTags />
        <Pagenate previousPath={previousPath} nextPath={nextPath} />
        {/* <Pagenate location={location} parent={parent} previous={previous} next={next} currentPage={currentPage} /> */}
      </div>
      <footer>
        <p className="copyright">(C)copyright magcho 2018-</p>
        <p className="google-analytics">google analyticsを導入しています</p>
      </footer>
    </>
  )
}

export default Template
