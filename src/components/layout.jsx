import * as React from 'react'
import { Link } from 'gatsby'

import previousPenguin from '../assets/penguin-previous.svg'
import nextPenguin from '../assets/penguin-next.svg'
import previousPenguinWhite from '../assets/penguin-previous-white.svg'
import nextPenguinWhite from '../assets/penguin-next-white.svg'
import AllTags from '../components/allTags'
import AllCategories from '../components/allCategoris'

// class Pagenate extends React.Component {
//   render() {
//     const parentProps = this.props.props
//     const path = this.props.path

//     let previousPath
//     let nextPath

//     if (path.match(/^\/\d*$/) != null) {
//       // 記事一覧ページ
//       previousPath = `/${parentProps.previous != '' ? parentProps.previous : ''}`
//       if (!this.props.lastPageFlag) {
//         nextPath = `/${parentProps.next != '' ? parentProps.next : ''}`
//       } else {
//         nextPath = ''
//       }
//     } else if (path.match(/^\/tag\//) || path.match(/^\/category\//)) {
//       // タグ カテゴリー別一覧ページ
//       previousPath = ''
//       nextPath = ''
//     } else {
//       // 記事個別ページ
//       previousPath = parentProps.previous != null ? parentProps.previous.fields.slug : ''
//       nextPath = parentProps.next != null ? parentProps.next.fields.slug : ''
//     }

//     let previousComponent
//     let nextComponent
//     if (previousPath != '') {
//       previousComponent = (
//         <div className="previous">
//           <Link to={`${previousPath}`}>
//             <img src={previousPenguin} alt="Previous" className="light-mode" />
//             <img src={previousPenguinWhite} alt="Previous" className="dark-mode" />
//             <p>←Previous</p>
//           </Link>
//         </div>
//       )
//     } else {
//       previousComponent = <></>
//     }
//     if (nextPath != '') {
//       nextComponent = (
//         <div className="next">
//            <Link to={`${nextPath}`}>
//             <img src={nextPenguin} alt="Next" className="light-mode" />
//             <img src={nextPenguinWhite} alt="Next" className="dark-mode" />
//             <p>Next→</p>
//           </Link>
//         </div>
//       )
//     } else {
//       nextComponent = <></>
//     }
//     return (
//       <div className="pagenate">
//         {previousComponent}
//         {nextComponent}
//       </div>
//     )
//   }
// }

const Pagenate = ({ location, parent, previous, next, currentPage }) => {
  let previousPath
  let nextPath
  if (parent === 'blog-post') {
    previousPath = previous != null ? previous.fields.slug : ''
    nextPath = next != null ? next.fields.slug : ''
  } else if (location.pathname.match(/^\/\d+\/$/)) {
    if (3 <= currentPage) {
      previousPath = `/${currentPage - 1}/`
    } else if (2 === currentPage) {
      previousPath = '/'
    }
  }

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

const Template = ({ location, siteTitle, children, parent, previous, next, currentPage }) => {
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
        <Pagenate location={location} parent={parent} previous={previous} next={next} currentPage={currentPage} />
      </div>
      <footer>
        <p className="copyright">(C)copyright magcho 2018-</p>
        <p className="google-analytics">google analyticsを導入しています</p>
      </footer>
    </>
  )
}

export default Template
