const puppeteer = require('puppeteer');
const Tools = require("../../utils/file");
const chalk = require('chalk');
/* private config data */
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

    await pageUsername.type(pageUsernameInput);
    await pageUserpwd.type(pageUserpwdInput);
    await page.waitFor(1000 * 3);
    await pageYZM.type(String(yzmValue));
    await pageSubmit.click();
    await page.waitFor(1000 * 3);

    let recObj = await page.evaluate(() => {
        let downloadBtn = document.getElementById('download');

        function consoleDataFromTable(selector, $ = window.$) {
            let $body = $(selector);
            let target = $body.find("[src$='png']");
            Array.prototype.map.call(target, eleDom => {
                let $ele = $(eleDom);
                let src = $ele.attr("src");
                let alt = $ele.attr("alt") || Date.now() + 'img';
                downloadFile(alt, src);
                let $a = $(`<a class="downloadme"href="${src}" download="${alt}.png">${alt}.png</a>`);
                $body.append($a);
                console.log(alt, src);
            })


            let downloadme = document.getElementsByClassName("downloadme");
            debugger;
            Array.prototype.map.call(downloadme, eleDom => {
                eleDom.click();
            })

        }

        function scrjqueryOnload() {
            consoleDataFromTable("body");
        }

        function downloadFile(fileName, content) {
            var aLink = document.createElement('a');
            var blob = new Blob([content]);
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.dispatchEvent(evt);
        }
        let scrjquery = document.createElement("script");
        scrjquery.src = "https://cdn.bootcss.com/jquery/3.3.1/jquery.js";
        scrjquery.onload = scrjqueryOnload;
        document.body.appendChild(scrjquery);
        debugger;
    });
    // $eval 对应 document.querySelector，$$eval 对应 document.querySelectorAll，够用了
    // let comments = await page.$$eval('.comment-item .comment-con', els => {
    //     return els.map(item => item.innerText);
    // });

    // 关闭浏览器
    // await browser.close();
}

crawler();