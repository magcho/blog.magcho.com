import React from 'react'

class PostTitle extends React.Component {
  render() {
    let color
    switch (this.props.category) {
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
        color = '#e4ff3c'
        break
    }
    return (
      <div className="title-flame">
        <h1
          className="title"
          style={{
            borderBottom: `solid ${color} 0.3rem`,
          }}
        >
          {this.props.children}
        </h1>
      </div>
    )
  }
}

export default PostTitle
