var Tesseract = require("tesseract.js");
const path = require("path");

(async () => {
  let filename = path.resolve(__dirname, "baidusu.png");
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
