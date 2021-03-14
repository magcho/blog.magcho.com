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
        <Link to={`${previousPath}`}>
          <img src={previousPenguin} alt="Previous" className="light-mode" />
          <img src={previousPenguinWhite} alt="Previous" className="dark-mode" />
          <p>←Previous</p>
        </Link>
      </div>
    )
  } else {
    previousComponent = <></>
  }
  if (nextPath) {
    nextComponent = (
      <div className="next">
        <Link to={`${nextPath}`}>
          <img src={nextPenguin} alt="Next" className="light-mode" />
          <img src={nextPenguinWhite} alt="Next" className="dark-mode" />
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
