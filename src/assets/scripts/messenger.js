/**
 * 顶部消息提示工具提示
 *
 * @author  hucw
 * @created 2017-06-16
 */

import { Toast } from 'mint-ui';

export default {
  alert: function (msg) {
    Toast(msg);
  },

  success: function (msg) {
    Toast({
      message: msg,
      iconClass: 'fa fa-check fa-2x color-success'
    });
  },

  error: function (msg) {
    Toast({
      message: msg,
      iconClass: 'fa fa-times fa-2x color-danger'
    });
  }
}
