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

// 生成早会纪要
async function recommendNotice() {
  try {
    const msg = await app.generateNoticeMsg();
    await app.broadcastMsg(msg, 'WY_WX_URL');
  } catch (err) {
    console.info('推荐失败', err);
    recommendNotice();
  }
}

// 生成吃饭通知
async function recommendEat(tag) {
  try {
    const msg = await app.generateEatMsg(tag);
    await app.broadcastMsg(msg, 'WX_URL');
  } catch (err) {
    console.log('推荐失败', err);
    recommendEat();
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
schedule.scheduleJob('0 45 10 * * *', recommend);

schedule.scheduleJob('0 0 9 * * 1-5', recommendNotice);

schedule.scheduleJob('0 0 10 * * 1-5', recommendEat);
schedule.scheduleJob('0 30 16 * * 1-5', () => { recommendEat(1); });

process.on('unhandledRejection', console.error.bind(console));
