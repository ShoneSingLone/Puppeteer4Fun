/**
 * 
 * 主执行方法
 * 
 */
function exec() {
    writeFile()
}

function writeFile() {
    postM({
        action: "writeFile",
        content: {
            contents: getTableHeader("#this-table"),
            filename: `妇女病普查个人信息表头.js`
        },
    });
    /*   postM({
          action: "writeFile",
          content: {
              contents: consoleDataFromTable("#formFnbpcJbzl"),
              filename: `ceshi.js`
          },
      }); */
}