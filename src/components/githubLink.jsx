import React from 'react'

const GithubLink = ({ filePath }) => {
  const relatedFilePath = filePath.match(/\/src\/pages\/.*/)
  const githubUrl = `https://github.com/magcho/blog.magcho.com/edit/master${relatedFilePath}`
  return (
    <div className="github-link">
      <a href={githubUrl}>この記事の編集</a>
    </div>
  )
}

export default GithubLink
