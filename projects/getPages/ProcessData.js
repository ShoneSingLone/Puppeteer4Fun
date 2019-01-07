function consoleDataFromTable(selector, $ = window.$) {
    let $panels = $(selector);
    return getItem($panels);
    // return consoleDataFromTable;
}
// consoleDataFromTable("#panel_HqbjTjfxGtb");
/* let aa = [];
Array.prototype.map.call($("#xtszLbTree .tree-title"), titleDom => {
    $title = $(titleDom);
    aa.push($title.attr("title"));
}) */
function getTableHeader(selector) {

    let $table = $(selector);
    debugger;
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
            let prop = $td.attr("field")
            let label = $td.text().trim();
            let tdItem = {
                prop,
                label,
                colspan,
                rowspan
            };
            tableTr.push(tdItem)
        })
        tableHeader.push(tableTr)
        /* tableTr */
    })
    console.log(tableHeader)
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
    let console_log = (`export let model = ${JSON.stringify(model)};`)

    dslArray = getDSLFrom($panels);
    // console.log(`dslArray`, dslArray)
    console_log += (`export let dslArray = ${JSON.stringify(dslArray)};`)

    rules = getRulesFrom(dslArray);
    // console.log(`dslArray`, dslArray)
    console_log += (`export let rules = ${JSON.stringify(rules)};`)
    return (console_log);
}

function getModelFrom($panels, $ = window.$) {

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
    })
    /*  */
    let model = {};
    Array.prototype.map.call($items4model, items4modelDom => {
        let $items4modelDom = $(items4modelDom);
        let id = $items4modelDom.attr("id");
        model[id] = items4modelValueObj[id];
    })
    /*  */
    Array.prototype.map.call($img4model, img4modelDom => {
        let $items4modelDom = $(img4modelDom);
        let id = $items4modelDom.attr("id");
        model[id] = $items4modelDom.attr("src") || false;
    })
    return model;
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
        panel.cellspacing = $tbody.attr("cellspacing")
        console.log(panel.cellspacing);
        let $trS = $panel.find("tbody > tr")
        Array.prototype.map.call($trS, trDom => {
            let row = [];
            let $trDom = $(trDom);
            let $tdS = $trDom.find("> td")
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



                let $items = $.find("[data-options]");
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
                            item.type = "date.picker"
                            return;
                        }

                        if (itemDom.classList.contains("combo-f")) {
                            item.type = "select"
                            return;
                        }
                        if (itemDom.classList.contains("searchbox-f")) {
                            item.type = "search"
                            return;
                        }
                        if (itemDom.classList.contains("switchbutton-f")) {
                            item.type = "switch"
                            item.label = $td.find(".input-label")[0]
                            item.label = item.label.innerText;
                            return;
                        }
                        if (itemDom.classList.contains("checkbox-f")) {
                            item.type = "checkbox"
                            return;
                        }
                        if (item.multiline) {
                            item.type = "textarea"
                            return;
                        }
                    })()

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
    optionString = optionString.replace(/\s*/g, "");
    // console.log(optionString);

    if (optionString) {
        let options = {};
        let proArray = ["prompt", "label"];
        let proMap = {
            prompt: "placeholder",
            label: "label"
        };
        proArray.map(property => {
            let regex = new RegExp(`${property}:'([^']+)'`);
            let regexMatch = optionString.match(regex);
            options[proMap[property]] = regexMatch && regexMatch[1];
        });

        let proArray2 = ["required", "readonly", "editable", "multiple", "multiline", "unSelect", "precision"];
        proArray2.map(property => {
            let regex = new RegExp(`${property}:([^,]*?),|${property}:([^,]*?)$`);
            let regexMatch = optionString.match(regex);
            if (regexMatch) {
                if ("required" === property || "editable" === property || "multiline" === property) {
                    options[property] = Boolean("true" === (regexMatch[1] || regexMatch[2]));
                } else {
                    options[property] = regexMatch[1] || regexMatch[2];
                }
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
            })
            dataString.replace(/\{text:'([^\}]*)',value:'([^\}]*)'\}/g, (full, value, text) => {
                data.push({
                    value,
                    text
                });
            })
            return data;
        })()

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
                })
            })
        })
    })
    return rules;
}

consoleDataFromTable("[id^='panel_panel']");