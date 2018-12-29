/**
 * 
 * 主执行方法
 * 
 */
function exec() {
    postM({
        action: "newPage",
        content: $("html")[0].outerHTML
    });
}