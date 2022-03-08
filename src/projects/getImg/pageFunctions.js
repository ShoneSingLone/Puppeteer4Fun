function logImg(img) {
  function sendData(img) {
    let oCanvas = document.createElement("canvas");
    let oCtx = oCanvas.getContext("2d");

    oCanvas.width = img.naturalWidth;
    oCanvas.height = img.naturalHeight;
    oCtx.drawImage(img, 0, 0);

    let target = oCanvas.toDataURL();
    postM({
      action: "writeImg",
      content: {
        contents: target,
        filename: `select.js`,
      },
    });
  }

  return new Promise((resolve, reject) => {
    let _img = new Image();
    _img.onload = function ({ target }) {
      sendData(target);
      _img.onload = null;
      _img = null;
      resolve();
    };

    _img.onerror = function (error) {
      reject(error);
    };
    _img.setAttribute("crossOrigin", "Anonymous");
    _img.src = img.src;
  });

  /* if (img.complete) {
         sendData(img);
     } else {
         let _img = new Image();
         _img.onload = function ({
             target
         }) {
             sendData(target);
             _img.onload = null;
             _img = null;
         };
         _img.src = img.src;
     } */
}

/**
 * Data:#<##>#
 *
 * 主执行方法
 *
 */

function exec() {
  writeFile();
}

function writeFile($ = window.$ || window.jQuery) {
  let imgArray = _.map($("img"), (img) => img);
  //  imgArray.map(img => logImg(img));
  generatorImg(imgArray);
}

function generatorImg(imgArray) {
  function next() {
    let currentImg = imgArray.shift();
    if (currentImg)
      logImg(currentImg)
        .then(() => next())
        .catch((error) => {
          console.log(error);
          next();
        });
  }
  next();
}
