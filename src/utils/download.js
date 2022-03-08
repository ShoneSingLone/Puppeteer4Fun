// var fs = require('fs');
// const request = require('request');
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const _ = require("lodash");

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
  try {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  } catch (error) {
    return false;
  }
}

/**
 * https://www.baidu.com/static/main.js
 * /site/www.baidu.com/static/main.js
 *
 * @export
 * @param {any} url
 * @returns
 */
exports.downloadResource = function (url) {
  let path = url.match("https://(.*)")[1].split("/");
  var filename = _.last(path).split("?")[0];
  path = path.slice(0, path.length - 1).join("/");

  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      responseType: "stream",
    })
      .then((response) => {
        // console.log(response);
        const dir = `./site/${path}`;
        mkdirsSync(dir);
        const target = `${dir}/${filename}`;
        response.data.pipe(fs.createWriteStream(target)).on("close", resolve);
      })
      .catch((e) => {
        console.log(e);
        resolve();
      });
  });
};

exports.downloadBuffer = function (url, buffer) {
  var matchPathArray = url.match("https://(.*)");
  if (_.isArray(matchPathArray) && matchPathArray.length > 1) {
    let path = matchPathArray[1].split("/");
    var filename = _.last(path).split("?")[0];
    if (!filename) {
      return "";
    }
    path = path.slice(0, path.length - 1).join("/");
    return new Promise((resolve, reject) => {
      const dir = `./sites/${path}`;
      const target = `${dir}/${filename}`;
      if (mkdirsSync(dir)) {
        fs.writeFile(target, buffer, function (err) {
          if (err) return reject(err);
          console.log(target);
          resolve(target);
        });
      } else {
        reject(target);
      }
    });
  } else {
    return "";
  }
};

exports.download = function (url, dirname, filename, append) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      responseType: "stream",
    })
      .then((response) => {
        // console.log(response);
        const dir = `./assets/${dirname}`;
        mkdirsSync(dir);
        const target = append
          ? `${dir}/${filename}.${append}`
          : `${dir}/${filename}`;
        response.data.pipe(fs.createWriteStream(target)).on("close", resolve);
      })
      .catch((e) => {
        console.log(e);
        resolve();
      });
  });
};

exports.downloadResponse = function (response, filename) {
  return new Promise((resolve, reject) => {
    response.data.pipe(fs.createWriteStream(filename)).on("close", resolve);
  });
};
