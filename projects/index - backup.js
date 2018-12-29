const puppeteer = require('puppeteer');
const autoScroll = require('./autoScroll');
const url = 'https://item.jd.com/4311178.html';

async function crawler() {
    // 新开一个浏览器，headless false 方便可视化代码的操作
    let browser = await puppeteer.launch({
        headless: false
    });

    // 开一个 tab 页
    let page = await browser.newPage();
    // 加载 url 页面
    await page.goto(url, {
        waitUntil: 'networkidle2'
    });

    // 等一等
    await page.waitFor(500);

    // 点开评论 tab
    await page.click('li[data-anchor="#comment"]');

    // 滚一滚，让评论加载加载，这个方法内容继续往下看
    // 不滚也可以，单纯想展示一下 page.evaluate()
    await autoScroll(page);

    // 获取评论，多数情况直接操作 dom 就可以了
    // $eval 对应 document.querySelector，$$eval 对应 document.querySelectorAll，够用了
    let comments = await page.$$eval('.comment-item .comment-con', els => {
        return els.map(item => item.innerText);
    });

    // 输出一下评论，宣告抓到了
    comments.forEach((item, index) => {
        console.log(`comment ${index} =======================`);
        console.log(item);
    });
    // 关闭浏览器
    await browser.close();
}

crawler();