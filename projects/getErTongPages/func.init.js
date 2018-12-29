window.global = {};
window.global.over = false;


function createScript(innerHTML, id) {
    var myScript = document.createElement("script");
    myScript.id = id;
    myScript.innerHTML = innerHTML;
    return myScript;
}

function updateFunction() {
    /* 更新命令 */
    console.log("updateFunction");
}