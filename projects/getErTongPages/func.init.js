window.global = {};
window.global.over = false;

function postM(obj) { /* 更新命令 */
    try {
        console.info(JSON.stringify(obj));
    } catch (error) {
        console.error(error)
    }
}

function createScript(innerHTML, id) {
    var myScript = document.createElement("script");
    myScript.id = id;
    myScript.innerHTML = innerHTML;
    return myScript;
}
/**
 * 动态更新浏览器端的执行代码
 * 
 */
function updateFunction() {
    postM({
        action: "updateFunction"
    })
}
/**
 * 执行client端的代码
 * 
 */
function execFunction() {
    postM({
        action: "execFunction"
    })
}