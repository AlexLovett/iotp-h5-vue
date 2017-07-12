<style scoped lang="scss" type="text/scss">
  @import "../../assets/scss/wos/_workorder.scss";
  .bg-white {
    height: 80px;
  }
  .logs-timeline,
  .transfer-page,
  .valuation-page{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .valuation-page{
    background-color: #f8f8f9;
  }
  .popup-wos {
    .title {
      height: 40px;
      background-color: #f5f7fa;
    }
  }
</style>

<template>
  <div>
    <!-- 设备信息 -->
    <div class="padding bg-white">
      <div class="bg-box-80 pull-left" :style="'background-image:url(' + entity.productImage + ')'"></div>
      <div style="padding-left: 90px;">
        <div class="text-wrapper padding-top-s" v-if="entity.orderType === 'common'">{{ entity.orderTitle ? entity.orderTitle : entity.productName}}</div>
        <div class="text-wrapper padding-top-s" v-if="entity.orderType === 'lease'">{{ entity.leaseProduct.name}}</div>

        <div class="padding-top-s text-second text-s" v-if="entity.orderType === 'common'">
          <span class="inline">型号：</span>
          <span>{{ entity.productItemCode}}</span>
        </div>

        <div class="padding-top-s text-second text-s" v-if="entity.orderType === 'lease'">
          <span class="inline">产品代码：</span>
          <span>{{ entity.leaseProduct.code }}</span>
        </div>
      </div>
    </div>

    <!-- 工单信息 -->
    <div class="margin-top-l">
      <div class="weui-cells weui-cells-sm">
        <div class="weui-cell">
          <div class="weui-cell__bd weui_cell_primary">工单号: <span>{{ entity.workOrderId }}</span></div>
          <div class="weui-cell__ft"><status :order="entity"></status></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd weui_cell_primary action-logs" @click="openLogs">
            <i class="fa fa-bell-o color-orange-1"></i> &nbsp;
            <span v-if="entity.logs && entity.logs.length > 0">{{ entity.logs[0].created | moment("YYYY-MM-DD HH:mm") }} {{ entity.logs[0].log }}</span>
          </div>
          <div class="weui-cell__ft">
            <i class="fa fa-angle-right fa-lg margin-right"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 工单详情 -->
    <div class="margin-top-l">
      <div class="weui-cells__title text-primary">工单详情</div>
      <div class="weui-cells weui-cells-sm">
        <div class="weui-cell weui-cell-view">
          <div class="weui-cell__bd weui_cell_primary">服务类型</div>
          <div class="weui-cell__ft color-yellow-1">
            <span v-if="entity.orderType === 'common'">{{ entity.shopServiceName}}</span>
            <span v-if="entity.orderType === 'lease'">租赁预约</span>
          </div>
        </div>
        <div class="weui-cell weui-cell-view">
          <div class="weui-cell__bd weui_cell_primary">服务预约时间</div>
          <div class="weui-cell__ft">
            <span>{{ entity.serviceDate | moment("MM-DD")}}</span>
            <span>{{ entity.serviceTime }}</span>
          </div>
        </div>
        <div class="weui-cell weui-cell-view">
          <div class="weui-cell__bd weui_cell_primary">工单创建日期</div>
          <div class="weui-cell__ft"><span v-if="null !== entity.created">{{ entity.created | moment("YYYY-MM-DD HH:mm:ss") }}</span></div>
        </div>

        <div class="weui-cell weui-cell-view" v-if="entity.customerMemo !== null">
          <div class="weui-cell__bd weui_cell_primary">备注说明</div>
          <div class="weui-cell__ft"><span>{{ entity.customerMemo}}</span></div>
        </div>
      </div>
    </div>

    <!-- 图片附件 -->
    <div class="margin-top-l" v-if="entity.images !== null">
      <div class="weui-cells__title text-primary">图片附件</div>
      <div class="weui-cells weui-cells-sm">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="container-fluid">
              <div class="row">
                <div class="col-xs-3 col-zero order-images" v-for="img in entity.images">
                  <a class="fancybox" rel="group" :href="img">
                    <div class="placeholder margin-bottom-s margin-top-s bg-box-48" :style="'background-image:url(' + img +')'"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系信息 -->
    <div class="margin-top-l">
      <div class="weui-cells__title text-primary margin-top-l">联系信息</div>
      <div class="weui-cells weui-cells-sm">
        <div class="weui-cell weui-cell-view">
          <div class="weui-cell__bd weui_cell_primary">联系人</div>
          <div class="weui-cell__ft"><span>{{ entity.contactName}}</span></div>
        </div>
        <div class="weui-cell weui-cell-view">
          <div class="weui-cell__bd weui_cell_primary">联系电话</div>
          <div class="weui-cell__ft"><span>{{ entity.contactMobile }}</span> <span v-if="entity.contactTelephone !== null">{{ entity.contactTelephone }}</span></div>
        </div>
        <div class="weui-cell weui-cell-view">
          <div class="weui-cell__bd weui_cell_primary">联系地址</div>
          <div class="weui-cell__ft"><span>{{ entity.serviceAddress }}</span></div>
        </div>
      </div>
    </div>

    <!-- 费用合计 -->
    <div class="margin-top-l" v-if="entity.feeItems !== null">
      <div class="weui-cells__title text-primary margin-top-l">费用</div>
      <div class="weui-cells">
        <div class="weui-cell weui-cell-view" v-for="item in entity.feeItems">
          <div class="weui-cell__bd weui_cell_primary">{{ item.feeDefName }}</div>
          <div class="weui-cell__ft">
            <span class="currency-rmb color-red-1">{{ item.formatFeeItemPrice }}</span>
            <span class="text-second" v-if="item.feeItemNum > 1">{{ item.feeItemNum }}</span>
          </div>
        </div>
        <div class="weui-cell weui-cell-view">
          <div class="weui-cell__bd"></div>
          <div class="weui-cell__ft">
            合计：
            <del v-if="entity.totalAmount != entity.payment"><span class="text-s currency-rmb text-second">{{ entity.formatTotalAmount }}</span></del>
            <span class="text-m currency-rmb color-red-1">{{ entity.formatPayment }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="margin-top-m align-right padding">
      <actions type="view"
               :order="entity"
               @transferModel="transferModel=true"
               @valuationModel="valuationModel=true"></actions>
    </div>
    <!--<logs-timeline @cancel="cancelLogs" v-show="isActive" :logs="entity.logs"></logs-timeline>-->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade" class="logs-timeline">
      <!--<div class="popup-wos">-->
        <!--<div class="title"></div>-->
        <!--<div class="content"></div>-->
        <!--<div class="foot"></div>-->
      <!--</div>-->
      <logs-timeline @cancel="popupVisible=false" :logs="entity.logs"></logs-timeline>
    </mt-popup>

    <!-- 转单 -->
    <mt-popup
      v-model="transferModel"
      popup-transition="popup-fade"
      class="transfer-page">
      <transfer-page @cancel="transferModel=false" :order="entity"></transfer-page>
    </mt-popup>
  </div>
</template>

<script>
    import actions from "../tpl/tpl-actions.vue"
    import status from "../tpl/tpl-status.vue"
    import logsTimeline from "./logs-timeline.vue"
    import transferPage from './transfer-page.vue'

    export default{
        name: "wos-view",
        data() {
            return {
                entity: {},
                isActive: false,
                popupVisible: false,
                transferModel: false
            }
        },
        created() {
          this.$http.get(this.$woshost + "/workorder/" + this.$route.params.entityId)
            .then((resp) => {
              this.entity = resp
            })

        },
        methods: {
          openLogs: function () {
//              this.isActive = true;
              this.popupVisible = true;
          },
          cancelLogs: function () {
              this.isActive = false
          }
        },
        components: {
          actions,
          status,
          logsTimeline,
          transferPage
        }
    }
</script>
