/**
 * 
 * 主执行方法
 * 
 */

function exec() {
    writeFile();
}

function getComboboxData($ = window.$) {
    let $target = $(".panel.combo-p");
    let targetArray = [];
    Array.prototype.map.call($target, trDom => {
        let htmlString = trDom.innerHTML;
        let $trDom = $(trDom);

        let dictionary = {
            id: $trDom.attr("id"),
            data: []
        };
        let regexp = new RegExp("class=\"combobox-item\">([^<]*)</div>", "g");
        let getItem = (full, item) => {
            dictionary.data.push({
                label: item,
                value: item
            });
        };
        htmlString.replace(regexp, getItem);
        targetArray.push(dictionary);
    });
    return (`module.exports = ${JSON.stringify(targetArray)}`);
}


function writeFile() {
    /*  postM({
         action: "writeFile",
         content: {
             contents: getComboboxData(""),
             filename: `select${$("#exec-payload").val()}.js`
         },
     }); */

    // postM({
    //     action: "writeFile",
    //     content: {
    //         contents: getDSLFrom2("#asdfasdfasdfasdf"),
    //         filename: `妇女病普查影像检查dsl.js`
    //     }
    // });
    // postM({
    //     action: "writeFile",
    //     content: {
    //         contents: getTableHeader("#header"),
    //         filename: `随访 header.js`
    //     },
    // });
    /*  postM({
         action: "writeFile",
         content: {
             contents: consoleDataFromTableMultil("#maintable"),
             // contents: consoleDataFromTable(".panel.theme-panel-blue.easyui-fluid"),
             filename: `mock${$("#exec-payload").val()}.js`
         },
     }); */

    let targetArray = [{
        "cc": "lyh-dnsy-contents",
        "lx": "dasy",
        "title": "首页"
    }, {
        "cc": "lyh-jbda-contents",
        "lx": "jbzl",
        "title": "基础档案"
    }, {
        "cc": "lyh-bsxwN-contents",
        "lx": "bsxw_n",
        "title": "病史询问(男)"
    }, {
        "cc": "lyh-bsxwV-contents",
        "lx": "bsxw_v",
        "title": "病史询问(女)"
    }, {
        "cc": "lyh-tgjc-contents",
        "lx": "tgjc",
        "title": "体格检查"
    }, {
        "cc": "lyh-lcjc-contents",
        "lx": "hyjc",
        "title": "临床检查"
    }, {
        "cc": "lyh-yxjc-contents",
        "lx": "yxjc",
        "title": "影像检查"
    }, {
        "cc": "lyh-pgbg-contents",
        "lx": "pgbg",
        "title": "评估报告"
    }, {
        "cc": "lyh-zysf-contents",
        "lx": "zysf",
        "title": "早期随访登记"
    }, {
        "cc": "lyh-rsjj-contents",
        "lx": "rsjj",
        "title": "妊娠结局登记"
    }, {
        "cc": "lyh-csqx-contents",
        "lx": "csqx",
        "title": "出生缺陷登记"
    }];

    postM({
        action: "writeFile",
        content: {
            contents: `export let dsl = ` + getTableHeader(`#asdfasdfasdfasdf`),
            filename: `档案总览-table.js`
        },
    });

  /*   for (let index = 0; index < targetArray.length; index++) {
        const element = targetArray[index];
        postM({
            action: "writeFile",
            content: {
                contents: `export let dsl = ` + getDSLFromTable(`.${element.cc}`),
                filename: `档案总览-${element.title}.js`
            },
        });
    } */

    /* 获取列表 */
    /*  let $li = $("#DivyqysYwDbasy > div.lyh-left-nav.lyh-fl > ul").find("li");

     let arr = Array.prototype.map.call($li, li => {
         return {
             cc: li.dataset.cc,
             lx: li.dataset.lx,
             title: li.innerHTML,
         };
     }); */

    /*  postM({
         action: "writeFile",
         content: {
             contents: JSON.stringify(arr),
             // contents: consoleDataFromTable(".panel.theme-panel-blue.easyui-fluid"),
             filename: `档案总览数组${$("#exec-payload").val()}.js`
         },
     }); */
}

/* 档案首页获取table信息
 * 有ID就是model.id = ***

 */

function getDSLFromTable(contentselector, $ = window.$) {
    let $contents = $(contentselector);

    let title = $contents.find(".lyh-right-header").text();
    let contentArray = [];

    let $mainContent = $contents.find(".lyh-right-content");

    /* titleInfo */
    let $subTitles = $mainContent.find(">div");
    Array.prototype.map.call($subTitles, subTitle => {
        let $subTitle = $(subTitle);
        let $table = $subTitle.find("+table");
        let dsl = getDSLFrom3($table, $subTitle.text().trim());
        let model = getModelFromDsl(dsl);
        contentArray.push({
            model,
            dsl
        });
    });

    /* tableInfo */
    /*  
     let model = {};
     let $tables = $mainContent.find('>table');
     Array.prototype.map.call($tables, table => {
         let dsl = getDSLFrom3(table);
         dslArray.push(dsl);
     }) */

    return JSON.stringify({
        title,
        contentArray
    });
}
/*  */
function getModelFromDsl(dsl) {
    let model = {};
    dsl.rows.map(row => {
        row.map(col => {
            if (col.id) {
                model[col.id] = "";
            }
        });
    });

    return model;
}
/*  */
function consoleDataFromTableMultil(selector, $ = window.$) {
    let $panels = $(selector);
    let console_log = "";
    let model = {},
        rules = {},
        dslArray = [];
    Array.prototype.map.call($panels, panel => {
        let $panel = $(panel);

        model = {
            ...model,
            ...getModelFrom($panel)
        };
        let currentDsl = getDSLFrom($panel);
        dslArray.push(currentDsl);
        rules = { ...rules,
            ...getRulesFrom(currentDsl)
        };
    });
    console_log += (`export let model = ${JSON.stringify(model)};`);
    console_log += (`export let dslArray = ${JSON.stringify(dslArray)};`);
    console_log += (`export let rules = ${JSON.stringify(rules)};`);
    return console_log;
}

function consoleDataFromTable(selector, $ = window.$) {
    let $panels = $(selector);
    return getItem($panels);
    // return consoleDataFromTable;
}
/* let aa = [];
Array.prototype.map.call($("#xtszLbTree .tree-title"), titleDom => {
    $title = $(titleDom);
    aa.push($title.attr("title"));
}) */
function getTableHeader(selector, $ = window.$) {

    let $table = $(selector);
    let tableHeader = [];
    let $trs = $table.find("tr");
    Array.prototype.map.call($trs, trDom => {
        let $tr = $(trDom);
        let tableTr = [];
        let $tds = $tr.find("td");
        Array.prototype.map.call($tds, tdDom => {
            let $td = $(tdDom);
            let rowspan = Number($td.attr("rowspan") || 1);
            let colspan = Number($td.attr("colspan") || 1);
            let prop = $td.attr("field");
            let label = $td.text().trim();
            let tdItem = {
                prop,
                label,
                colspan,
                rowspan
            };
            tableTr.push(tdItem);
        });
        tableHeader.push(tableTr);
        /* tableTr */
    });
    console.log(tableHeader);
    /* tableHeader */
    return (`export let dslTableHeader = ${JSON.stringify(tableHeader)}`);
}


function getItem($panels, $ = window.$) {
    /* 无嵌套一层级数据对象 */
    let model = {};
    /*  export let ruleForm = {
         name: "",
         region: "",
         date1: "",
         date2: "",
         delivery: false,
         type: [],
         resource: "",
         desc: ""
     }; */
    /* 描述页面布局控件类型 */
    let dslArray = [];
    /* {
        rowspan: 1,
        colspan: 1,
        type: "single.select",
        items: [{
            prop: "region",
            type: "select",
            placeholder: "请选择活动区域",
            label: "活动区域",
            data: [{
                label: "区域一",
                value: "shanghai"
            }, {
                label: "区域二",
                value: "beijing"
            }]
        }]
    } */

    let rules = {};
    /*  region: [{
        required: true,
        message: "请选择活动区域",
        trigger: "change"
    }], */

    model = getModelFrom($panels);
    let console_log = (`export let model = ${JSON.stringify(model)};`);

    dslArray = getDSLFrom($panels);
    // console.log(`dslArray`, dslArray)
    console_log += (`export let dslArray = ${JSON.stringify(dslArray)};`);

    rules = getRulesFrom(dslArray);
    // console.log(`dslArray`, dslArray)
    console_log += (`export let rules = ${JSON.stringify(rules)};`);
    return (console_log);
}

function getModelFrom($panels, $ = window.$) {
    debugger;

    let $trS = $panels.find("tbody > tr");
    /*  */
    let $items4model = $trS.find("[data-options]");
    let $items4modelValue = $trS.find("input[type='hidden']");
    let $img4model = $trS.find("td img");
    /*  */
    let items4modelValueObj = {};
    Array.prototype.map.call($items4modelValue, items4modelValueDom => {
        let $items4modelValueDom = $(items4modelValueDom);
        items4modelValueObj[$items4modelValueDom.attr("id")] = $items4modelValueDom.attr("value");
    });
    /*  */
    let model = {};
    Array.prototype.map.call($items4model, items4modelDom => {
        let $items4modelDom = $(items4modelDom);
        let id = $items4modelDom.attr("id");
        model[id] = items4modelValueObj[id];
    });
    /*  */
    Array.prototype.map.call($img4model, img4modelDom => {
        let $items4modelDom = $(img4modelDom);
        let id = $items4modelDom.attr("id");
        model[id] = $items4modelDom.attr("src") || false;
    });
    return model;
}

/* 
档案总览，只是展示
 */
function getDSLFrom3($table, title, $ = window.$) {
    /* Panels=>panel=>row=>col=>items? */
    let tableInfo = {
        title,
        rows: []
    };

    tableInfo.cellspacing = $table.attr("cellspacing") || "";
    tableInfo.cellpadding = $table.attr("cellpadding") || "";
    let $trS = $table.find("tbody > tr");
    Array.prototype.map.call($trS, trDom => {
        let row = [];
        let $trDom = $(trDom);
        let $tdS = $trDom.find("> td");
        Array.prototype.map.call($tdS, tdDom => {
            let col = {
                rowspan: 1,
                colspan: 1,
            };
            let $td = $(tdDom);
            col.rowspan = $td.attr("rowspan") ? Number($td.attr("rowspan")) : 1;
            col.colspan = $td.attr("colspan") ? Number($td.attr("colspan")) : 1;
            col.width = $td.attr("width") ? $td.attr("width") : "";
            let id = $td.attr("id");
            if (id && id.length && id.length > 0) {
                col.type = "input";
                col.id = id;
            } else {
                col.type = "label";
                col.label = $td.text();
            }
            row.push(col);
        });
        tableInfo.rows.push(row);
        /* end let panel = {}; */
    });
    return tableInfo;
}
/* 没有标题直接一个表单
 */
function getDSLFrom2(selector, $ = window.$) {
    /* Panels=>panel=>row=>col=>items? */
    let panels = [];
    let panel = {
        title: false,
        rows: []
    };
    let $table = $(selector);
    panel.cellspacing = $table.attr("cellspacing");
    console.log(panel.cellspacing);
    let $trS = $table.find("tbody > tr");
    Array.prototype.map.call($trS, trDom => {
        let row = [];
        let $trDom = $(trDom);
        let $tdS = $trDom.find("> td");
        Array.prototype.map.call($tdS, tdDom => {
            let col = {
                rowspan: 1,
                colspan: 1,
                items: []
            };
            let $td = $(tdDom);
            col.rowspan = $td.attr("rowspan") ? Number($td.attr("rowspan")) : 1;
            col.colspan = $td.attr("colspan") ? Number($td.attr("colspan")) : 1;
            col.width = $td.attr("width") ? $td.attr("width") : "";
            let $items = $td.find("[data-options]");
            debugger;
            Array.prototype.map.call($items, itemDom => {
                let item = {
                    prop: "prop:id",
                    type: "input",
                    placeholder: "placeholder",
                    /*
                    label: "label",
                     data: [{
                        label: "区域一",
                        value: "shanghai"
                    }, {
                        label: "区域二",
                        value: "beijing"
                    }] */
                };

                item = converItem($(itemDom), item);

                /*  类型：scha-vue\src\components\input_type_string.js*/
                (() => {
                    if (itemDom.classList.contains("datebox-f")) {
                        item.type = "date.picker";
                        return;
                    }

                    if (itemDom.classList.contains("combo-f")) {
                        item.type = "select";
                        return;
                    }
                    if (itemDom.classList.contains("searchbox-f")) {
                        item.type = "search";
                        return;
                    }
                    if (itemDom.classList.contains("switchbutton-f")) {
                        item.type = "switch";
                        item.label = $td.find(".input-label")[0];
                        item.label = item.label.innerText;
                        return;
                    }
                    if (itemDom.classList.contains("checkbox-f")) {
                        item.type = "checkbox";
                        return;
                    }
                    if (item.multiline) {
                        item.type = "textarea";
                        return;
                    }
                })();

                col.items.push(item);
                /* end let col = []; */
            });

            /* 可以根据其他一些信息(items)判断type用于td内用几个item 默认input*/
            col.type = "input";
            if (col.colspan > 1 || col.rowspan > 1) {
                let $img = $td.find("img");
                if (col.items.length < 1 && $img) {
                    let imgItem = {};
                    imgItem.src = $img.attr("src");
                    imgItem.alt = $img.attr("alt");
                    imgItem.width = $img.attr("width");
                    imgItem.height = $img.attr("height");
                    imgItem.id = $img.attr("id");
                    imgItem.title = $img.attr("title");
                    imgItem.type = "avatar";
                    col.items.push(imgItem);
                    col.type = "input";
                }
            }

            row.push(col);
            /* end let row = []; */
        });
        panel.rows.push(row);
        /* end let panel = {}; */
    });
    panels.push(panel);
    /* end let panels = []; */

    return `export let dslArray = ${JSON.stringify(panels)};`;
}

function getDSLFrom($panels, $ = window.$) {
    /* Panels=>panel=>row=>col=>items? */
    let panels = [];
    Array.prototype.map.call($panels, panelDom => {
        let panel = {
            title: false,
            rows: []
        };
        let $panel = $(panelDom);
        let panelTitleDom = $panel.find(".panel-header > div.panel-title")[0];
        if (panelTitleDom) {
            panel.title = panelTitleDom.innerText;
        }
        let $tbody = $panel.find("table");
        panel.cellspacing = $tbody.attr("cellspacing");
        console.log(panel.cellspacing);
        let $trS = $panel.find("tbody > tr");
        Array.prototype.map.call($trS, trDom => {
            let row = [];
            let $trDom = $(trDom);
            let $tdS = $trDom.find("> td");
            Array.prototype.map.call($tdS, tdDom => {
                let col = {
                    rowspan: 1,
                    colspan: 1,
                    items: []
                };
                let $td = $(tdDom);
                col.rowspan = $td.attr("rowspan") ? Number($td.attr("rowspan")) : 1;
                col.colspan = $td.attr("colspan") ? Number($td.attr("colspan")) : 1;
                col.width = $td.attr("width") ? $td.attr("width") : "";

                let $items = $td.find("[data-options]");
                Array.prototype.map.call($items, itemDom => {
                    let item = {
                        prop: "prop:id",
                        type: "input",
                        placeholder: "placeholder",
                        /*
                        label: "label",
                         data: [{
                            label: "区域一",
                            value: "shanghai"
                        }, {
                            label: "区域二",
                            value: "beijing"
                        }] */
                    };

                    item = converItem($(itemDom), item);

                    /*  类型：scha-vue\src\components\input_type_string.js*/
                    (() => {
                        if (itemDom.classList.contains("datebox-f")) {
                            item.type = "date.picker";
                            return;
                        }

                        if (itemDom.classList.contains("combo-f")) {
                            item.type = "select";
                            return;
                        }
                        if (itemDom.classList.contains("searchbox-f")) {
                            item.type = "search";
                            return;
                        }
                        if (itemDom.classList.contains("switchbutton-f")) {
                            item.type = "switch";
                            item.label = $td.find(".input-label")[0];
                            item.label = item.label.innerText;
                            return;
                        }
                        if (itemDom.classList.contains("checkbox-f")) {
                            item.type = "checkbox";
                            return;
                        }
                        if (item.multiline) {
                            item.type = "textarea";
                            return;
                        }
                    })();

                    col.items.push(item);
                    /* end let col = []; */
                });

                /* 可以根据其他一些信息(items)判断type用于td内用几个item 默认input*/
                col.type = "input";
                if (col.colspan > 1 || col.rowspan > 1) {
                    let $img = $td.find("img");
                    if (col.items.length < 1 && $img) {
                        let imgItem = {};
                        imgItem.src = $img.attr("src");
                        imgItem.alt = $img.attr("alt");
                        imgItem.width = $img.attr("width");
                        imgItem.height = $img.attr("height");
                        imgItem.id = $img.attr("id");
                        imgItem.title = $img.attr("title");
                        imgItem.type = "avatar";
                        col.items.push(imgItem);
                        col.type = "input";
                    }
                }

                row.push(col);
                /* end let row = []; */
            });
            panel.rows.push(row);
            /* end let panel = {}; */
        });
        panels.push(panel);
        /* end let panels = []; */
    });
    return panels;
}


function converItem($subItem, subItem, $ = window.$) {
    /* prop跟model中的key对应，取id */
    subItem = {
        prop: $subItem.attr("id")
    };
    let optionString = $subItem.data().options;
    let bind = $subItem.data().bind;

    //去空格
    try {
        optionString = optionString.replace(/\s*/g, "");
        console.clear();
        console.log(optionString);
    } catch (error) {
        debugger;
    }

    if (optionString) {
        let options = {};
        let proArray = ["prompt", "label"];
        let proMap = {
            prompt: "placeholder",
            label: "label"
        };
        proArray.map(property => {
            try {
                let regex = new RegExp(`${property}:'([^']+)'`);
                let regexMatch = optionString.match(regex);
                options[proMap[property]] = regexMatch && regexMatch[1];
                console.clear();
                console.log("property", property);
            } catch (error) {
                debugger;
            }
        });


        let proArray2 = ["required", "readonly", "editable", "multiple", "multiline", "unSelect", "precision"];
        proArray2.map(property => {
            try {
                let regex = new RegExp(`${property}:([^,]*?),|${property}:([^,]*?)$`);
                let regexMatch = optionString.match(regex);
                if (regexMatch) {
                    if ("required" === property || "editable" === property || "multiline" === property) {
                        options[property] = Boolean("true" === (regexMatch[1] || regexMatch[2]));
                    } else {
                        options[property] = regexMatch[1] || regexMatch[2];
                    }
                }
            } catch (error) {
                debugger;
            }
        });



        //用RegExp处理data
        /* 下拉框 data key value */
        let itemData = (() => {
            let data = [];
            let regex = new RegExp("data:\\[(.*)\\]", "g");
            let regexMatch = regex.exec(optionString);
            if (!(regexMatch && regexMatch.length > 1)) return data;
            let dataString = regexMatch[1];
            dataString.replace(/\{value:'([^\}]*)',text:'([^\}]*)'\}/g, (full, value, text) => {
                data.push({
                    value,
                    text
                });
            });
            dataString.replace(/\{text:'([^\}]*)',value:'([^\}]*)'\}/g, (full, value, text) => {
                data.push({
                    value,
                    text
                });
            });
            return data;
        })();

        /* Switch data key value */
        /* 
                let itemData = (() => {
                    let data = [];
                    let regex = new RegExp("data:\\[(.*)\\]", "g");
                    let regexMatch = regex.exec(optionString);
                    if (!(regexMatch && regexMatch.length > 1)) return data;
                    let dataString = regexMatch[1];
                    dataString.replace(/\{value:'([^\}]*)',text:'([^\}]*)'\}/g, (full, value, text) => {
                        data.push({
                            value,
                            text
                        });
                    })
                    return data;
                })() */

        subItem = { ...subItem,
            ...options
        };
        if (itemData && itemData.length > 0) {
            subItem.data = itemData;
        } else {

        }
    }
    if (bind) {
        subItem.bind = bind;
    }
    if (!subItem.type) subItem.type = "input";

    return subItem;
}


function getRulesFrom(dslArray) {
    let rules = {};
    Array.prototype.map.call(dslArray, table => {
        Array.prototype.map.call(table.rows, row => {
            Array.prototype.map.call(row, col => {
                Array.prototype.map.call(col.items, item => {
                    let prop = item.prop;

                    let rule = [];
                    if (item.required) {
                        rule.push({
                            required: true,
                            message: "不能为空",
                            trigger: "blur"
                        });
                    }
                    if (rule.length > 0) rules[prop] = rule;
                });
            });
        });
    });
    return rules;
}