<!-- 工单计价 -->
<style scoped lang="scss" type="text/scss">
  @import "../../assets/scss/wos/_workorder.scss";
  .servicefee-page{
    width: 100%;
    height: 100%;
  }
  .weui-cells{
    overflow: inherit;
  }
  .weui-cells__title{
    color: $font-primary;
  }
  #adjustFee{
    border: 1px solid $border;
    text-align: right;
    height: rem(30px);
    padding: 5px;
    font-size: $font-size-m;
  }
</style>

<template>
  <div>
    <div class="weui-cells__title text-primary">工单详情</div>
    <div class="weui-cells weui-cells-sm">
      <div class="weui-cell weui-cell-view">
        <div class="weui-cell__bd weui_cell_primary">工单号</div>
        <div class="weui-cell__ft color-yellow-1">
          <span>{{ entity.workOrderId }}</span>
        </div>
      </div>
      <div class="weui-cell weui-cell-view">
        <div class="weui-cell__bd weui_cell_primary">设备名称</div>
        <div class="weui-cell__ft">
          <span>{{ entity.productName }}</span>
        </div>
      </div>
      <div class="weui-cell weui-cell-view">
        <div class="weui-cell__bd weui_cell_primary">设备货号</div>
        <div class="weui-cell__ft">
          <span>{{ entity.productItemCode }}</span>
        </div>
      </div>

      <div class="weui-cell weui-cell-view">
        <div class="weui-cell__bd weui_cell_primary">保修期</div>
        <div class="weui-cell__ft">
          <span class="color-red-1" v-if="entity.serviceDate >= new Date().getTime()">已过保修期</span>
          <span class="color-green-1" v-if="entity.serviceDate < new Date().getTime()">保修期内</span>
        </div>
      </div>
      <div class="weui-cell weui-cell-view">
        <div class="weui-cell__bd weui_cell_primary">工单类型</div>
        <div class="weui-cell__ft">
          <span class="color-red-1">{{ entity.shopServiceName }}</span>
        </div>
      </div>
    </div>

    <div class="weui-cells__title text-primary">工单计价</div>
    <div class="weui-cells weui-cells-sm">
      <div class="weui-cell weui-cell-view" @click="serviceFee">
        <div class="weui-cell__bd weui_cell_primary">服务费用</div>
        <div class="weui-cell__ft">
          <i class="fa fa-angle-right fa-lg margin-right"></i>
        </div>
      </div>
      <div class="weui-cell weui-cell-view" @click="fittingFee">
        <div class="weui-cell__bd weui_cell_primary">配件费用</div>
        <div class="weui-cell__ft">
          <i class="fa fa-angle-right fa-lg margin-right"></i>
        </div>
      </div>
    </div>

    <div class="weui-cells weui-cells-sm">
      <div class="weui-cell">
        <div class="weui-cell__bd weui_cell_primary">修改总价</div>
        <div class="weui-cel__ft">
          <input class="color-red-1" v-model="totalFee" type="number" step="0.01" min="0" id="adjustFee" value="0">
        </div>
      </div>
    </div>
    <div class="page-footer page-footer-fill">
      <div class="pull-left subTotal" style="width: 100px">
        ￥ <span class="currency-number" id="subTotal">{{ totalFee }}</span>
      </div>
      <div style="padding-left: 100px">
        <button type="button"
                class="btn btn-primary btn-block"
                id="btnSubmit"
                @click="confirmFee">确认费用</button>
        <a class="btn btn-danger btn-block" href="" v-if="false">返回首页</a>
      </div>
    </div>

    <mt-popup
      v-model="serviceFeePopup"
      popup-transition="popup-fade" class="servicefee-page">
     <child-page @transferData="getFee"
                 @cancel="serviceFeePopup=false"
                 :dataType="serviceType"></child-page>
    </mt-popup>
  </div>
</template>

<script type="text/javascript">
  import childPage from './service-page.vue'

  export default {
    name: 'valuation-page',
    props: ['order'],
    data() {
      return{
        entity: {},
        checklistVal: [],
        checklistOpts: [
          {
            label: '选项A',
            value: '值A'
          },
          {
            label: '选项B',
            value: '值B'
          }
        ],
        entityId: this.$route.params.entityId,
        serviceFeePopup: false,
        serviceType: '',
        serviceItem: [],
        totalFee: 0
      }
    },
    created() {
      this.$http.get(this.$woshost + "/workorder/" + this.entityId)
        .then((res) => {
          console.log(res);
          this.entity = res;
        })
    },
    methods: {
      //配件费用页面
      fittingFee() {
        this.serviceFeePopup = true;
        this.serviceType = 'fitting';
      },
      //服务费用页面
      serviceFee() {
        this.serviceFeePopup = true;
        this.serviceType = 'service';
      },
      //获取费用总计
      getFee(fee, serviceItem) {
        this.totalFee = fee;
        this.serviceItem = serviceItem;
        console.log(fee);
        console.log(serviceItem);
      },
      //提交费用总计和费用项目
      confirmFee() {
        this.$http.post(this.$woshost + '/workorder/' + this.entityId + '/fee/calculate', {
          adjustFee: this.totalFee,
          reCalculateFee: true,
          serviceFeeItems: this.serviceItem.join(';')
        }).then((res) => {
          console.log(res);
        });
      }
    },
    components: {
      childPage
    }
  }
</script>
