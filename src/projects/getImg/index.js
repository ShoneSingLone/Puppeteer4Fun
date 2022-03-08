const puppeteer = require("puppeteer");
const mainURL =
  require("D:/PrivateConfings/Puppeteer4Fun/configs").url201907172248;
const fs = require("fs").promises;

async function init(firstPage, scriptArray, myToolPanel) {
  return await firstPage.evaluate(
    (scriptArray, htmlString) => {
      /* func.init中的function需要再init之后才能使用 */
      function createScript(innerHTML, id) {
        let myScript = document.createElement("script");
        myScript.id = id;
        myScript.innerHTML = innerHTML;
        return myScript;
      }
      console.time("evaluate");
      let scriptDIV = document.createElement("div");
      scriptDIV.id = "my-script-group";

      scriptArray.forEach((scriptString, index) => {
        scriptDIV.append(createScript(scriptString, "my-script-" + index));
      });
      /* 执行后才有 exec、 updateFunction */
      document.body.append(scriptDIV);
      $(htmlString).prependTo($("body"));
      console.timeEnd("evaluate");
      return true;
    },
    scriptArray,
    myToolPanel
  );
}

(async () => {
  // 新开一个浏览器，headless false 方便可视化代码的操作
  let browser = await puppeteer.launch({
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

  // 直接是第一个 tab 页
  let pagesArray = await browser.pages();
  let firstPage = pagesArray[0];

  // 加载 url 页面
  await firstPage.goto(mainURL, {
    waitUntil: "networkidle2",
  });

  let yzmValue = await firstPage.evaluate(() => {
    console.log("debugger");
  });
  await firstPage.waitFor(1000 * 2);
  // 加载 url 页面
  let scriptArray = [];
  /* jquery */
  let jQuery = await fs.readFile(
    "D:/GitHub/Puppeteer4Fun/node_modules/jquery/dist/jquery.min.js",
    "utf-8"
  );
  scriptArray.push(jQuery);
  /* lodash */

  let lodash = await fs.readFile(
    "D:/GitHub/Puppeteer4Fun/projects/getImg/lodash.js",
    "utf-8"
  );
  scriptArray.push(lodash);
  /* 处理数据的函数工具 */
  // scriptArray.push(await fs.readFile("D:/GitHub/Puppeteer4Fun/projects/getPages/ProcessData.js", "utf-8"));
  /* 其他的函数 */
  scriptArray.push(
    await fs.readFile(
      "D:/GitHub/Puppeteer4Fun/projects/getPages/func.init.js",
      "utf-8"
    )
  );
  /* 会执行的函数，保证是最后一个加入，id 与 scriptArray.length-1 相关*/
  scriptArray.push(
    await fs.readFile(
      "D:/GitHub/Puppeteer4Fun/projects/getImg/pageFunctions.js",
      "utf-8"
    )
  );

  /* 工具  */
  let myToolPanel = await fs.readFile(
    "D:/GitHub/Puppeteer4Fun/projects/getPages/component.html",
    "utf-8"
  );
  /*  */

  init(firstPage, scriptArray, myToolPanel);

  firstPage.on("console", (msg) => {
    let infoString = msg.text();
    let type = msg.type();
    if (type === "info" && typeof infoString === "string") {
      try {
        let { action, content } = JSON.parse(infoString);
        const STRATEGY = {
          init: async (content) => {
            console.log(content);
            return await init(firstPage, scriptArray, myToolPanel);
          },
          writeFile: async () => {
            return await fs.writeFile(
              `D:/GitHub/Puppeteer4Fun/projects/getImg/files/${
                Date.now() + content.filename
              }`,
              "content.contents"
            );
          },
          writeImg: async () => {
            //过滤data:URL
            let base64Data = content.contents.replace(
              /^data:image\/\w+;base64,/,
              ""
            );
            let dataBuffer = new Buffer(base64Data, "base64");
            return await fs.writeFile(
              `D:/GitHub/Puppeteer4Fun/projects/getImg/files/${Date.now()}.png`,
              dataBuffer
            );
          },
          execFunction: async () => {
            console.log(require.cache);
            /* https://stackoverflow.com/questions/15666144/how-to-remove-module-after-require-in-node-js */
            let targetPath = resolvePath("projects/getPages/func.client.js");
            /* 保证重新读取 */
            delete require.cache[targetPath];
            let main = require(targetPath).main;
            console.clear();
            main && main();
          },
          updateFunction: async () => {
            /* 重新读取function */
            let scriptString = await fs.readFile(
              "D:/GitHub/Puppeteer4Fun/projects/getImg/pageFunctions.js",
              "utf-8"
            );
            // scriptString = scriptString.replace("#<##>#", Date.now());
            /* 只能是 Serializable：简单来说，就是String，目前完全够了*/
            let args = JSON.stringify({
              scriptString,
              scriptId: "my-script-" + String(scriptArray.length - 1),
              groupId: "my-script-group",
            });
            try {
              await firstPage.evaluate((args) => {
                let { scriptString, scriptId, groupId } = JSON.parse(args);
                try {
                  /* 删除原有的*/
                  let scriptEle = document.getElementById(scriptId);
                  scriptEle.remove();
                  /* 更新*/
                  let groupEle = document.getElementById(groupId);
                  groupEle.append(createScript(scriptString, scriptId));
                  /* 重新绑定执行函数*/
                  let btnEle = document.getElementById("exec");
                  btnEle.onclick = exec;
                  console.log("update success");
                } catch (error) {
                  console.error("error page.evaluate((updateFunction)", error);
                  console.error(error);
                }
              }, args);
            } catch (error) {
              console.error(error);
            }
          },
        };
        STRATEGY[action] && STRATEGY[action](content);
      } catch (error) {
        if (infoString === "init") {
          init(firstPage, scriptArray, myToolPanel);
        }
      }
    }
  });
})();
