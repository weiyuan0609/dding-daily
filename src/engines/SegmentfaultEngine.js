const puppeteer = require('puppeteer');

module.exports = class SegmentFaultEngine {
  async recommend() {
    try {
      const browser = await (puppeteer.launch({
        args: ['--no-sandbox'],
        timeout: 30000,
        ignoreHTTPSErrors: true,
        headless: true
      }));
      const page = await browser.newPage();

      await page.goto('https://segmentfault.com/blogs/hottest');
      await page.waitFor(10000);

      const segResult = await page.evaluate(() => {
        const $ = window.$;
        const segView = $('.stream-list');
        const result = [];
        if (segView.length) {
          const itemArr = segView.find('.stream-list__item');
          itemArr.each((index, item) => {
            result.push({
              title: $($(item).find('.title')[0]).text(),
              // picURL: 'http://s4.51cto.com/wyfs02/M02/9E/BC/wKioL1mVSAHi7u21AAAvG4csxsY248.jpg-wh_651x-s_2790934136.jpg',
              url: `https://segmentfault.com${$(item).find('.title a').attr('href')}`
            });
          });
        }
        return result;
      });

      // console.log(segResult);
      browser.close();
      return segResult;
    } catch (e) {
      console.warn('获取segmentfault失败', e);
      return [];
    }
  }
}
