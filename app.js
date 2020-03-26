const schedule = require('node-schedule');
const App = require('./src/App');
const app = new App();

async function recommend() {
  try {
    const articles = await app.aggregateArticles();
    const msg = await app.generateMsg(articles);
    await app.broadcastMsg(msg);
  } catch (err) {
    console.info('推荐失败', err);
    recommend();
  }
}

/**
 *  * * * * * *
 *  ┬ ┬ ┬ ┬ ┬ ┬
 *  │ │ │ │ │ |
 *  │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
 *  │ │ │ │ └───── month (1 - 12)
 *  │ │ │ └────────── day of month (1 - 31)
 *  │ │ └─────────────── hour (0 - 23)
 *  │ └──────────────────── minute (0 - 59)
 *  └───────────────────────── second (0 - 59, OPTIONAL)
 *  每分钟的第30秒触发： '30 * * * * *'
 *  每小时的1分30秒触发 ：'30 1 * * * *'
 *  每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
 *  每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
  * 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
  * 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
 */
schedule.scheduleJob('0 40 19 * * *', recommend);

process.on('unhandledRejection', console.error.bind(console));
