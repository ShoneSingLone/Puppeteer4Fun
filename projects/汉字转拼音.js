const simplePinyin = require("simple-pinyin").default;
const Tools = require("D:/GitHub/Puppeteer4Fun/utils/file.js");


let nameArray = [
    "出生日期",
    "胎儿性别",
    "出生孕周",
    "出生体重",
    "转归",
    "诊断依据",
    "畸形确诊时间",
    "出生缺陷诊断",
];

let resArray = nameArray.map(name => {
    let res = simplePinyin(name, {
        pinyinOnly: false
    });
    let target = (res.reduce((n1, n2, i) => {
        return n1.substr(0, i) + n2.substr(0, 1);
    }));
    console.log(target);
    return target;
});

Tools.writeFile(`D:/GitHub/Puppeteer4Fun/projects/getPages/files/${Date.now()}.js`, resArray);