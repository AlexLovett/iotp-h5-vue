/**
 * 过滤器定义
 *
 * @author  hucw
 * @created 2017-06-23
 */
import moment from "moment";

export default {
  /**
   * 图片过滤器，解析地址
   *
   * @param url 图片地址
   * @param wh  阿里云OSS图片处理样式，支持：
   *   w100, w200, w300, w400
   *   wh100, wh200, wh300, wh400
   *   q70
   */
  img: function (url, wh = "") {
    if (url === null || url === "" || url === "undefined") {
      return "/static/images/placeholder.png";
    }
    if (url.indexOf("http") > -1) {
      return url.indexOf("assets.xohaa.net") > -1 ? url + wh : url
    }
    return url;
  },

  /**
   * 格式化日期
   *
   * @param date    时间
   * @param format  时间格式，默认格式化为 YYYY-MM-DD
   * @returns {string}
   */
  formatDate: function (date, format = "YYYY-MM-DD") {
    return (date === null || date === "") ? "" : moment(date).format(format);
  },

  /**
   * 格式化时间
   *
   * @param date    时间
   * @param format  时间格式，默认格式化为 YYYY-MM-DD  HH:mm
   * @returns {string}
   */
  formatTime: function (date, format = "YYYY-MM-DD HH:mm") {
    return (date === null || date === "") ? "" : moment(date).format(format);
  }
}
