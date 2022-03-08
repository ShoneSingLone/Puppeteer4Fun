const puppeteer = require("puppeteer");
const { downloadBuffer } = require("./utils/download.js");
const _ = require("lodash");
const path = require("path");

const URL = {
  main: "https://www.baidu.com",
};

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    executablePath: path.resolve(
      "C://Program Files//Google//Chrome//Application//chrome.exe"
    ),
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();
  page.on("response", async (response) => {
    const { _url, _resourceType, _headers } = response;
    const contentType = _headers["content-type"];
    const filename = _.camelCase(decodeURIComponent(_url));
    // console.log(_resourceType, filename, contentType);
    async function handleHtml() {
      try {
        const buffer = await response.buffer();
        await downloadBuffer(_url, buffer);
      } catch (error) {
        console.error(error);
        console.log(response);
      }
    }
    handleHtml();
  });
  await page.goto(URL.main);
}

main();
