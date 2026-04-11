exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ prefix: 'og: http://ogp.me/ns#', lang: 'ja' })
}
