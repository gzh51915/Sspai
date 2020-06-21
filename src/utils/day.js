import dayjs from "dayjs";
// 配置dayjs插件
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
var updateLocale = require("dayjs/plugin/updateLocale");
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);
// dayjs的替换文字，%s和%d是占位符
dayjs.updateLocale("en", {
  relativeTime: {
    future: "%s前",
    past: "%s后",
    s: "几秒钟",
    m: "一分钟",
    mm: "%d分钟",
    h: "一小时",
    hh: "%d小时",
    d: "一天",
    dd: "%d天",
    M: "一个月",
    MM: "%d个月",
    y: "一年",
    yy: "%d年",
  },
});

export default dayjs;
