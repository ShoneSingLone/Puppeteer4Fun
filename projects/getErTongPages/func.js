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
            contents: consoleDataFromTable("#content_2100101"),
            filename: `${title.innerText.split(">")[1]}.js`
        },
    });
}