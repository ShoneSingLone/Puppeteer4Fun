const puppeteer = require("puppeteer");
const PATH = require("path");
const Tools = require("D:/GitHub/Puppeteer4Fun/utils/file.js");
const $ = require("jquery");
const mainURL = require("D:/PrivateConfings/Puppeteer4Fun/configs").mainURL_et;
const subURL = require("D:/PrivateConfings/Puppeteer4Fun/configs").subURL_et;
const pageUsernameInput =
  require("D:/PrivateConfings/Puppeteer4Fun/configs").pageUsername_et;
const pageUserpwdInput =
  require("D:/PrivateConfings/Puppeteer4Fun/configs").pageUserpwd_et;

let resolvePath = (subpath) => {
  return PATH.resolve("D:/GitHub/Puppeteer4Fun", subpath);
};

(async () => {
  // 新开一个浏览器，headless false 方便可视化代码的操作
  let browser = await puppeteer.launch({
    /* 打开的同时，headless：false */
    devtools: true,
    // headless: false
    defaultViewport: {
      width: 1440,
      height: 1000,
    },
  });

  // 直接是第一个 tab 页
  let pagesArray = await browser.pages();
  let firstPage = pagesArray[0];

  console.global = {
    page: firstPage,
  };

  // 加载 url 页面
  await firstPage.goto(mainURL, {
    waitUntil: "networkidle2",
  });

  // 完成验证登录
  const pageUsername = await firstPage.$(`#user`);
  const pageUserpwd = await firstPage.$(`#paw`);
  const pageYZM = await firstPage.$(`#yzm`);
  const pageSubmit = await firstPage.$(`#btnLogin`);

  console.time("yzm");
  let yzmValue = await firstPage.evaluate(() => {
    let yzm, yzms;
    yzm = document.querySelector(`#autoyzm`);
    yzm = yzm.innerHTML;
    yzms = yzm.split("=");
    yzms = yzms[0].split(`+`);
    return Number(yzms[0]) + Number(yzms[1]);
  });
  await pageUsername.type(pageUsernameInput);
  await pageUserpwd.type(pageUserpwdInput);
  await pageYZM.type(String(yzmValue));
  await pageSubmit.click();
  console.timeEnd("yzm");
  await firstPage.waitFor(1000 * 2);
  // 加载 url 页面
  await firstPage.goto(subURL, {
    waitUntil: "networkidle2",
  });

  let scriptArray = [];
  /* jquery */
  // scriptArray.push(await Tools.readFile("D:/GitHub/Puppeteer4Fun/node_modules/jquery/dist/jquery.js"));
  /* 处理数据的函数工具 */
  // scriptArray.push(await Tools.readFile("D:/GitHub/Puppeteer4Fun/projects/getPages/ProcessData.js"));
  /* 其他的函数 */
  scriptArray.push(
    await Tools.readFile(
      "D:/GitHub/Puppeteer4Fun/projects/getPages/func.init.js"
    )
  );
  /* 会执行的函数，保证是最后一个加入，id 与 scriptArray.length-1 相关*/
  scriptArray.push(
    await Tools.readFile("D:/GitHub/Puppeteer4Fun/projects/getPages/func.js")
  );

  let initPage = await firstPage.evaluate(
    (scriptArray, htmlString) => {
      /* func.init中的function需要再init之后才能使用 */
      function createScript(innerHTML, id) {
        var myScript = document.createElement("script");
        myScript.id = id;
        myScript.innerHTML = innerHTML;
        return myScript;
      }
      console.time("evaluate");
      var scriptDIV = document.createElement("div");
      scriptDIV.id = "my-script-group";

      scriptArray.map((scriptString, index) => {
        scriptDIV.append(createScript(scriptString, "my-script-" + index));
      });

      /* 执行后才有 exec、 updateFunction */
      document.body.append(scriptDIV);
      $(htmlString).prependTo($("body"));
      console.timeEnd("evaluate");

      return true;
    },
    scriptArray,
    await Tools.readFile(
      "D:/GitHub/Puppeteer4Fun/projects/getPages/component.html"
    )
  );

  firstPage.on("console", (msg) => {
    let infoString = msg.text();
    let type = msg.type();
    if (type === "info" && typeof infoString === "string") {
      let { action, content } = JSON.parse(infoString);
      const STRATEGY = {
        writeFile: async () => {
          return await Tools.writeFile(
            `D:/GitHub/Puppeteer4Fun/projects/getPages/files/${
              Date.now() + content.filename
            }`,
            content.contents
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
          let scriptString = await Tools.readFile(
            "D:/GitHub/Puppeteer4Fun/projects/getPages/func.js"
          );
          scriptString = scriptString.replace("####", Date.now());
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
    }
  });
  console.log("initPage", initPage);
  // await browser.close;
})();
