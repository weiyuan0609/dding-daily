/**
 * 微信消息类型
 */
module.exports = {
  // markdown类型
  // msgtype	true	string	此消息类型为固定markdown
  // content
  Markdown: (content) => {
    return {
      "msgtype": "markdown",
      "markdown": { content }
    }
  },
}