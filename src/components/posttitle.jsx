import React from 'react'

class PostTitle extends React.Component {
  render() {
    const HeadingTag = this.props.level || 'h1'
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
        <HeadingTag
          className="title"
          style={{
            borderBottom: `solid ${color} 0.3rem`,
          }}
        >
          {this.props.children}
        </HeadingTag>
      </div>
    )
  }
}

export default PostTitle
