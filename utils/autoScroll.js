async function autoScroll(page) {
    //  page.evaluate 能获取上下文，相当于在当前页面执行 js，想干啥就干啥
    await page.evaluate(() => {
        // 返回 promise，evaluate 会等 promise resolve
        return new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 200;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 500);
        });
    });
}

module.exports = autoScroll;