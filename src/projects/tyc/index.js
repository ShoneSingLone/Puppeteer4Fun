const puppeteer = require("puppeteer");
var Tesseract = require("tesseract.js");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let h1Element,
    filename = "h1Element.png";

  await page.goto("https://example.com");
  h1Element = await page.$("h1");
  await h1Element.screenshot({
    path: filename,
  });
  Tesseract.recognize(filename, {
    lang: "chi_sim",
  })
    .progress((p) => console.log("progress", p))
    .catch((err) => console.log(err))
    .then((result) => {
      console.log(result.text);
      process.exit(0);
    });
  /* 中文 */
  filename = "baidusu.png";
  await page.goto(
    "https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_8422248464105723030%22%7D&n_type=0&p_from=1"
  );
  // h1Element = await page.$("#su");
  await page.screenshot({
    path: filename,
  });
  await browser.close();
  Tesseract.recognize(filename, {
    lang: "chi_sim",
  })
    .progress((p) => console.log("progress", p))
    .catch((err) => console.log(err))
    .then((result) => {
      console.log(result.text);
      process.exit(0);
    });
})();
