/**
 * 钉钉消息类型
 * https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.2a504a97Oaz1dg&treeId=257&articleId=105735&docType=1
 */
module.exports = {
  //  文本消息
  //  msgtype	true	string	此消息类型为固定text
  //  content	true	string	消息内容
  //  atMobiles	false	string	被@人的手机号
  //  isAtAll	false	bool	@所有人时:true,否则为:false
  Text: (content, mobile, isAtAll = false) => {
    return {
      "msgtype": "text",
      "text": { content },
      "at": mobile ? { "atMobiles": [mobile], isAtAll } : { isAtAll }
    }
  },
  // FeedCard类型
  // msgtype	true	string	此消息类型为固定feedCard
  // title	true	string	单条信息文本
  // messageURL	true	string	点击单条信息到跳转链接
  // picURL	true	string	单条信息后面图片的URL
  FeedCard: (links) => {
    return {
      "feedCard": { links }, 
      "msgtype": "feedCard"
    }
  },
  // link类型
  // msgtype	String	是	消息类型，此时固定为:link
  // title	String	是	消息标题
  // text	String	是	消息内容。如果太长只会部分展示
  // messageUrl	String	是	点击消息跳转的URL
  // picUrl	String	否	图片URL
  Link: (text, title, picUrl = '', messageUrl) => {
    return {
      "msgtype": "link", 
      "link": { text, title, picUrl, messageUrl }
    }
  },
  // markdown类型
  // msgtype	true	string	此消息类型为固定markdown
  // title	true	string	首屏会话透出的展示内容
  // text	true	string	markdown格式的消息
  // atMobiles		Array	被@人的手机号(在text内容里要有@手机号)
  // isAtAll	false	bool	@所有人时:true,否则为:false
  Markdown: (title, text, atMobiles = [], isAtAll = false) => {
    return {
      "msgtype": "markdown",
      "markdown": { title, text },
      "at": { atMobiles, isAtAll }
    }
  },
  // ActionCard类型
  // msgtype	true	string	此消息类型为固定actionCard
  // title	true	string	首屏会话透出的展示内容
  // text	true	string	markdown格式的消息
  // singleTitle	true	string	单个按钮的方案。(设置此项和singleURL后btns无效。)
  // singleURL	true	string	点击singleTitle按钮触发的URL
  // btnOrientation	false	string	0-按钮竖直排列，1-按钮横向排列
  // hideAvatar	false	string	0-正常发消息者头像,1-隐藏发消息者头像
  ActionCard: (title, text, hideAvatar = '1', btnOrientation = '1', singleTitle, singleURL) => {
    return {
      "actionCard": {
        title, 
        text, 
        hideAvatar, 
        btnOrientation, 
        singleTitle,
        singleURL
      }, 
      "msgtype": "actionCard"
    }
  }
}