const Tools = require("../../utils/file");

(async () => {
  try {
    let PDJSString = await Tools.readFile(
      "D:/GitHub/Puppeteer4Fun/projects/getPages/ProcessData.js"
    );
    let JSString_jquery = await Tools.readFile(
      "D:/GitHub/Puppeteer4Fun/node_modules/jquery/dist/jquery.js"
    );
    console.log(JSString_jquery);
  } catch (error) {
    console.log(error);
  }
})();
