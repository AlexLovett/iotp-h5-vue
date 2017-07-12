/**
 * 设备数据
 *
 * @author  hucw
 * @created 2017-06-13
 */
import types from "../mutation-types";

export default {
  state: {
    pageData: null
  },
  mutations: {
    /**
     * 存储设备分页数据
     *
     * @param state 状态对象
     * @param pageData 分页对象
     */
    [types.devices.storePageData]: (state, pageData) => {
      state.pageData = pageData;
    },

  },
  getters: {
    /**
     * 获取设备分页数据
     *
     * @param state 状态对象
     * @returns 返回设备分页数据
     */
    [types.devices.getPageData]: (state) => state.pageData,
  }
}
