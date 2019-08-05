const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const rp = require('request-promise-native');
const config = require('config');
const message = require('./message');

class App {
  constructor() {
    // 加载所有推荐引擎
    const engineFiles = fs.readdirSync(path.join(__dirname, 'engines'));
    this.engines = [];
    for (const file of engineFiles) {
      const moduleName = file.slice(0, -3); // trim .js
      const Engine = require(`./engines/${moduleName}`);
      this.engines.push(new Engine());
    }
  }

  // 聚合推荐
  async aggregateArticles() {
    let results = [];
    // 聚合所有推荐
    for (const engine of this.engines) {
      const result = await engine.recommend();
      results.push(...result);
    }

    // 过滤掉无用数据
    results = results.filter(article => article.url && article.title);
    console.log(results)

    // 随机取五条记录
    const articles = _.sampleSize(results, 5);
    return articles;
  }

  // 生成消息
  async generateMsg(articles) {
    // 合并成markdown
    const articlesMarkdown = articles.map((article) => {
      return `[${article.title}](${article.url})`;
    }).join('\n- ');
    const msg = message.Markdown('每日推荐', `\n- ${articlesMarkdown}`)
    return msg;
  }

  // 广播消息给钉钉
  broadcastMsg(msg, dingType = 'DING_URL') {
    return rp({
      url: config.get(dingType),
      method: "POST",
      headers: { "content-type": "application/json;charset=utf-8" },
      body: JSON.stringify(msg)
    });
  }
}

module.exports = App;
