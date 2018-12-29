const puppeteer = require('puppeteer');
const Tools = require("../../utils/file");const chalk = require('chalk');
const mainURL = require('D:/PrivateConfings/Puppeteer4Fun/configs').mainURL;
const pageUsernameInput = require('D:/PrivateConfings/Puppeteer4Fun/configs').pageUsername;
const pageUserpwdInput = require('D:/PrivateConfings/Puppeteer4Fun/configs').pageUserpwd;

async function crawler() {
    // 新开一个浏览器，headless false 方便可视化代码的操作
    let browser = await puppeteer.launch({
        headless: false
    });

    // 开一个 tab 页
    let page = await browser.newPage();
    // 加载 url 页面
    await page.goto(mainURL, {
        waitUntil: 'networkidle2'
    });

    // 等待手动完成验证登录

    const pageUsername = await page.$(`#user`);
    const pageUserpwd = await page.$(`#paw`);
    const pageYZM = await page.$(`#yzm`);
    const pageSubmit = await page.$(`#btnLogin`);

    let yzmValue = await page.evaluate(() => {
        let yzm, yzms;
        yzm = document.querySelector(`#autoyzm`);
        yzm = yzm.innerHTML;
        yzms = yzm.split("=");
        yzms = yzms[0].split(`+`);
        return Number(yzms[0]) + Number(yzms[1]);
    });
    console.log("yzmValue", yzmValue);


    await pageUsername.type(pageUsernameInput);
    await pageUserpwd.type(pageUserpwdInput);
    await page.waitFor(1000 * 3);
    await pageYZM.type(String(yzmValue));
    await pageSubmit.click();
    await page.waitFor(1000 * 5);

    // 打开新的链接
    await page.click('#deskList > div.box2 > div.cell.clearfix > div:nth-child(4)');
    console.time("打开新的链接");
    await page.waitFor(1000 * 5);

    let recObj = await page.evaluate(() => {
        return document.body.innerHTML;
    });
    console.timeEnd("打开新的链接");
    await page.waitFor(1000 * 5);
    console.log("recObj", recObj);
    Tools.writeFile('./rec.js', JSON.stringify(recObj)).then(r => {
        chalk.green(r);
    }).catch(error => {
        chalk.red(error);
    })
    /* $eval 对应 document.querySelector，$$eval 对应 document.querySelectorAll */
    // let comments = await page.$$eval('.comment-item .comment-con', els => {
    //     return els.map(item => item.innerText);
    // });

    // 关闭浏览器
    // await browser.close();
}

crawler();