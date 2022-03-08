const fs = require("fs");
const puppeteer = require("puppeteer");
const mainURL =
  require("D:/PrivateConfings/Puppeteer4Fun/configs").url20220308234315;

(async () => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    /* 打开的同时，headless：false */
    devtools: true,
    // headless: false
    defaultViewport: {
      width: 1366,
      height: 768,
    },
  });
  const page = await browser.newPage();
  page.setViewport({
    width: 1280,
    height: 926,
  });

  let counter = 0;
  page.on("response", async (response) => {
    const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
    if (matches && matches.length === 2) {
      const extension = matches[1];
      const buffer = await response.buffer();
      fs.writeFileSync(
        `images/image-${counter}.${extension}`,
        buffer,
        "base64"
      );
      counter += 1;
    }
  });

  await page.goto(mainURL);
  // await page.waitFor(1000 * 10);
  await browser.close();
})();
