/**
 * 工单系统路由配置
 *
 * @author  hucw
 * @created 2017-06-14
 */
export default [
  {
    path: '/wos',
    name: 'wos',
    component: function (resolve) {
      require(['@/pages-wos/wos'], resolve);
    }
  },
  {
    path: '/wos/bind/vendor',
    name: 'wos-bind-vendor',
    component: function (resolve) {
      require(['@/pages-wos/bind-vendor'], resolve);
    }
  },
  {
    path: '/wos/index',
    name: 'wos-index',
    component: function (resolve) {
      require(['@/pages-wos/index'], resolve);
    }
  },
  {
    path: '/wos/workOrder/:type/list',
    name: 'wos-page',
    component: function (resolve) {
      require(['@/pages-wos/work-order/list'], resolve);
    }
  },
  {
    path: '/wos/workOrder/:entityId',
    name: 'wos-view',
    component: function (resolve) {
      require(['@/pages-wos/work-order/view'], resolve);
    }
  },
  {
    path: '/wos/workOrder/:entityId/valuation',
    name: 'wos-valuation',
    component: function (resolve) {
      require(['@/pages-wos/work-order/valuation-page'], resolve);
    }
  }
]
