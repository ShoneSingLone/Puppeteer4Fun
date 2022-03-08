($) => {
  let $boxs = $(`div[class^="box"]`);
  let boxs = [];

  [1].map.call($boxs, (eleBox, index) => {
    let box = {};

    let $box = $(eleBox);
    let $title = $box.find(".title");
    box.title = $title.text();
    box.subTitle = $title.attr("title");
    box.img = {
      src: $box.find("img").attr("src"),
    };
    box.links = [];
    let $links = $box.find(".link");

    [1].map.call($links, (eleLink) => {
      let $link = $(eleLink);
      let $img = $link.find("img");
      let img = {
        src: $img.attr("src"),
        alt: $img.attr("alt"),
      };
      let reg = new RegExp(`opacity:0.5`, `g`);
      let link = {
        isEnable: !reg.test($link.attr("style")),
        path: !reg.test($link.attr("path")),
        title: $link.text(),
        img,
        option: JSON.parse($link.attr("data-options")),
      };
      box.links.push(link);
    });
    boxs.push(box);
  });
  console.log(`data = ${JSON.stringify(boxs)}`);
};

let data = [
  {
    title: "儿童保健",
    subTitle:
      "包含儿童健康管理,体质测验与促进系统,早期综合发展评价系统,新生儿疾病筛查",
    img: {
      src: "css/blue/icon/t1.png",
    },
    links: [
      {
        isEnable: false,
        path: true,
        title: "儿童健康管理系统",
        img: {
          src: "css/blue/icon/i5.png",
          alt: "儿童健康管理系统",
        },
        option: {
          mkid: "302",
          cxmc: "儿童健康管理系统",
          img: "icon/i5.png",
          sm: "专案管理,档案与体检,集体儿童,专案管理,综合查询,统计分析,代码设置,系统维护",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "体质测验与促进系统",
        img: {
          src: "css/blue/icon/i2.png",
          alt: "体质测验与促进系统",
        },
        option: {
          mkid: "304",
          cxmc: "体质测验与促进系统",
          img: "icon/i2.png",
          sm: "在校人员登记,统计分析,系统维护",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "早期综合发展评价系统",
        img: {
          src: "css/blue/icon/i17.png",
          alt: "早期综合发展评价系统",
        },
        option: {
          mkid: "303",
          cxmc: "早期综合发展评价系统",
          img: "icon/i17.png",
          sm: "发育筛查,智力测验,行为评定,人格测验",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "托幼园所管理",
        img: {
          src: "css/blue/icon/i7.png",
          alt: "托幼园所管理",
        },
        option: {
          mkid: "401",
          cxmc: "托幼园所管理",
          img: "icon/i7.png",
          sm: "在校人员登记,体检管理,综合查询,统计分析,系统维护",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "高危专案儿管理",
        img: {
          src: "css/blue/icon/i20.png",
          alt: "高危专案儿管理",
        },
        option: {
          mkid: "306",
          cxmc: "高危专案儿管理",
          img: "icon/i20.png",
          sm: "",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
    ],
  },
  {
    title: "妇女保健",
    subTitle: "包含孕前保健,孕产妇保健,产前筛查与诊断,妇儿基础档案",
    img: {
      src: "css/blue/icon/t1.png",
    },
    links: [
      {
        isEnable: true,
        path: true,
        title: "孕前优生服务",
        img: {
          src: "css/blue/icon/i1.png",
          alt: "孕前优生服务",
        },
        option: {
          mkid: "203",
          cxmc: "孕前优生服务",
          img: "icon/i1.png",
          sm: "孕优档案管理,档案查询,统计分析,代码管理",
          dialog: "False",
          qx: "True",
          syzt: "True",
        },
      },
      {
        isEnable: true,
        path: true,
        title: "孕产妇保健",
        img: {
          src: "css/blue/icon/i26.png",
          alt: "孕产妇保健",
        },
        option: {
          mkid: "204",
          cxmc: "孕产妇保健",
          img: "icon/i26.png",
          sm: "代码设置,事务中心,接口管理,基卫数据上传,孕情管理,孕期保健,未建档分娩,高危管理,综合查询,统计分析",
          dialog: "False",
          qx: "True",
          syzt: "True",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "产前筛查与诊断",
        img: {
          src: "css/blue/icon/i5.png",
          alt: "产前筛查与诊断",
        },
        option: {
          mkid: "209",
          cxmc: "产前筛查与诊断",
          img: "icon/i5.png",
          sm: "产筛产诊,综合查询,统计分析,代码设置",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: true,
        path: true,
        title: "婚前保健服务",
        img: {
          src: "css/blue/icon/i22.png",
          alt: "婚前保健服务",
        },
        option: {
          mkid: "202",
          cxmc: "婚前保健服务",
          img: "icon/i22.png",
          sm: "婚前医学检查,综合查询,统计分析,代码管理",
          dialog: "False",
          qx: "True",
          syzt: "True",
        },
      },
      {
        isEnable: true,
        path: true,
        title: "妇女病普查",
        img: {
          src: "css/blue/icon/i21.png",
          alt: "妇女病普查",
        },
        option: {
          mkid: "210",
          cxmc: "妇女病普查",
          img: "icon/i21.png",
          sm: "健康体检,综合查询,数据统计,系统设置",
          dialog: "False",
          qx: "True",
          syzt: "True",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "两癌筛查",
        img: {
          src: "css/blue/icon/i23.png",
          alt: "两癌筛查",
        },
        option: {
          mkid: "212",
          cxmc: "两癌筛查",
          img: "icon/i23.png",
          sm: "档案与体检,综合查询,统计分析,系统维护",
          dialog: "False",
          qx: "False",
          syzt: "True",
        },
      },
    ],
  },
  {
    title: "综合管理",
    subTitle:
      "包含妇幼卫生检测,妇幼卫生统计,妇幼保健服务绩效考评,出生医学证明管理",
    img: {
      src: "css/blue/icon/t1.png",
    },
    links: [
      {
        isEnable: false,
        path: true,
        title: "妇幼卫生监测",
        img: {
          src: "css/blue/icon/i1.png",
          alt: "妇幼卫生监测",
        },
        option: {
          mkid: "702",
          cxmc: "妇幼卫生监测",
          img: "icon/i1.png",
          sm: "",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "妇幼卫生统计",
        img: {
          src: "css/blue/icon/i3.png",
          alt: "妇幼卫生统计",
        },
        option: {
          mkid: "701",
          cxmc: "妇幼卫生统计",
          img: "icon/i3.png",
          sm: "",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "妇幼保健服务绩效考评",
        img: {
          src: "css/blue/icon/i9.png",
          alt: "妇幼保健服务绩效考评",
        },
        option: {
          mkid: "704",
          cxmc: "妇幼保健服务绩效考评",
          img: "icon/i9.png",
          sm: "",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: true,
        path: true,
        title: "出生医学证明",
        img: {
          src: "css/blue/icon/i8.png",
          alt: "出生医学证明",
        },
        option: {
          mkid: "208",
          cxmc: "出生医学证明",
          img: "icon/i8.png",
          sm: "证明签发,证明流转,综合查询,统计分析,代码设置,数据上传",
          dialog: "False",
          qx: "True",
          syzt: "True",
        },
      },
    ],
  },
  {
    title: "疾病控制",
    subTitle: "包含计划免疫,疫苗安全控制",
    img: {
      src: "css/blue/icon/t1.png",
    },
    links: [
      {
        isEnable: false,
        path: true,
        title: "计划免疫",
        img: {
          src: "css/blue/icon/i13.png",
          alt: "计划免疫",
        },
        option: {
          mkid: "501",
          cxmc: "计划免疫",
          img: "icon/i13.png",
          sm: "",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "疫苗安全管理",
        img: {
          src: "css/blue/icon/i10.png",
          alt: "疫苗安全管理",
        },
        option: {
          mkid: "502",
          cxmc: "疫苗安全管理",
          img: "icon/i10.png",
          sm: "",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "母婴阻断",
        img: {
          src: "css/blue/icon/i25.png",
          alt: "母婴阻断",
        },
        option: {
          mkid: "503",
          cxmc: "母婴阻断",
          img: "icon/i25.png",
          sm: "档案与检查,综合查询,统计报表,代码管理",
          dialog: "False",
          qx: "False",
          syzt: "True",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "新生儿疾病筛查",
        img: {
          src: "css/blue/icon/i6.png",
          alt: "新生儿疾病筛查",
        },
        option: {
          mkid: "301",
          cxmc: "新生儿疾病筛查",
          img: "icon/i6.png",
          sm: "采血与实验,物流管理,综合查询,报表统计",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "叶酸增补服务管理",
        img: {
          src: "css/blue/icon/i24.png",
          alt: "叶酸增补服务管理",
        },
        option: {
          mkid: "213",
          cxmc: "叶酸增补服务管理",
          img: "icon/i24.png",
          sm: "库存管理,统计分析",
          dialog: "False",
          qx: "False",
          syzt: "True",
        },
      },
    ],
  },
  {
    title: "健康服务",
    subTitle: "包含短信服务平台,膳食营养管理,托幼园所管理",
    img: {
      src: "css/blue/icon/t1.png",
    },
    links: [
      {
        isEnable: false,
        path: true,
        title: "母子健康手册",
        img: {
          src: "css/blue/icon/i18.png",
          alt: "母子健康手册",
        },
        option: {
          mkid: "211",
          cxmc: "母子健康手册",
          img: "icon/i18.png",
          sm: "健康手册,库存管理,统计分析",
          dialog: "False",
          qx: "False",
          syzt: "True",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "营养膳食管理",
        img: {
          src: "css/blue/icon/i11.png",
          alt: "营养膳食管理",
        },
        option: {
          mkid: "951",
          cxmc: "营养膳食管理",
          img: "icon/i11.png",
          sm: "",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "居民健康档案",
        img: {
          src: "css/blue/icon/i28.png",
          alt: "居民健康档案",
        },
        option: {
          mkid: "150",
          cxmc: "居民健康档案",
          img: "icon/i28.png",
          sm: "健康档案,孕产妇健康管理,0～6岁儿童健康管理,重点患病人群健康管理,中医药健康管理,其他医疗卫生服务,业务查询,绩效管理,代码管理",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "妇儿基础档案",
        img: {
          src: "css/blue/icon/i27.png",
          alt: "妇儿基础档案",
        },
        option: {
          mkid: "200",
          cxmc: "妇儿基础档案",
          img: "icon/i27.png",
          sm: "",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
    ],
  },
  {
    title: "系统管理",
    subTitle: "包含平台系统管理,帮助系统,联系我们",
    img: {
      src: "css/blue/icon/t1.png",
    },
    links: [
      {
        isEnable: true,
        path: true,
        title: "系统管理",
        img: {
          src: "css/blue/icon/i15.png",
          alt: "系统管理",
        },
        option: {
          mkid: "109",
          cxmc: "系统管理",
          img: "icon/i15.png",
          sm: "数据处理,集成平台代码管理,集成平台用户管理,集成平台消息管理,接口管理",
          dialog: "False",
          qx: "True",
          syzt: "True",
        },
      },
      {
        isEnable: false,
        path: true,
        title: "移动平台",
        img: {
          src: "css/blue/icon/i16.png",
          alt: "移动平台",
        },
        option: {
          mkid: "952",
          cxmc: "移动平台",
          img: "icon/i16.png",
          sm: "",
          dialog: "False",
          qx: "False",
          syzt: "False",
        },
      },
      {
        isEnable: true,
        path: true,
        title: "帮助中心",
        img: {
          src: "css/blue/icon/i14.png",
          alt: "帮助中心",
        },
        option: {
          mkid: "953",
          cxmc: "帮助中心",
          img: "icon/i14.png",
          sm: "",
          dialog: "True",
          qx: "False",
          syzt: "True",
        },
      },
      {
        isEnable: true,
        path: true,
        title: "联系我们",
        img: {
          src: "css/blue/icon/i15.png",
          alt: "联系我们",
        },
        option: {
          mkid: "954",
          cxmc: "联系我们",
          img: "icon/i15.png",
          sm: "",
          dialog: "True",
          qx: "False",
          syzt: "True",
        },
      },
    ],
  },
];
console.dir(data);
