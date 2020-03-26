const puppeteer = require('puppeteer');

module.exports = class JuejinEngine {
  async recommend() {
    try {
      const browser = await (puppeteer.launch({
        args: ['--no-sandbox'],
        ignoreHTTPSErrors: true,
        timeout: 30000,
        headless: true
      }));
      const page = await browser.newPage();

      await page.goto('https://juejin.im/welcome/frontend');
      await page.waitFor(2000);

      const juejinResult = await page.evaluate(() => {
        const view = document.querySelectorAll('.entry-list');
        const result = [];
        if (view.length) {
          const itemArr = view[0].querySelectorAll('li.item .entry-box');
          for (let i = 0; i < itemArr.length; i++) {
            result.push({
              title: itemArr[i].querySelector('.title-row .title').innerText,
              // picURL: 'http://s4.51cto.com/wyfs02/M02/9E/BC/wKioL1mVSAHi7u21AAAvG4csxsY248.jpg-wh_651x-s_2790934136.jpg',
              url: itemArr[i].querySelector('.title-row .title').href
            });
          }
        }
        return result;
      });

      // console.log(juejinResult);
      browser.close();
      return juejinResult;
    } catch (e) {
      console.warn('获取juejin失败', e);
      return [];
    }
  }
}
