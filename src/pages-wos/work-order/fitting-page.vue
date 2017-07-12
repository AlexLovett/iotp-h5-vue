<!-- 工单计价-服务费用组件 -->
<template>
  <div class="popup-window in">
    <div class="popup-window-content">
      <div class="popup-window-body">
        <div class="weui-cells__title text-primary">服务费用</div>

        <div class="weui-cells weui-cells-sm weui-cells_checkbox">
          <div class="weui-cell weui-cell-view"
               :data-unid="item.id"
               v-for="(item, index) in fwListData"
               @click="addService(item.id, item.formatPriceAfter)">
            <div class="weui-cell__hd">
              <input type="checkbox"
                     class="weui-check"
                     v-model="serviceCheckedList"
                     :value="item.id"/>
              <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd weui_cell_primary">
              {{ item.name }}
            </div>
            <div class="weui-cell__ft">
              <div class="color-red-1">
                <div class="inline">
                  <del class="text-second margin-right">
                    <i class="fa fa-jpy text-s"></i>
                    <span class="currency-number text-s">{{ item.formatPrice }}</span>
                  </del>
                  <i class="fa fa-jpy text-s"></i>
                  <span class="currency-number text-m">{{ item.formatPriceAfter }}</span>
                </div>
              </div>
              <div class="product-number margin-top">
                <a href="javascript:void(0);"
                   class="btn btn-sm quantity-decrease"
                   @click="decrease($event, index)">-</a>
                <input type="number"
                       class="quantity"
                       value="1"
                       v-model="quatityNum[index]"
                       @focus="quatityFocus">
                <a href="javascript:void(0);"
                   class="btn btn-sm quantity-increase"
                   @click="increase($event, index)">+</a>
              </div>
            </div>
          </div>
        </div>

        <div class="weui-cells weui-cells-lg">
          <div class="weui-cell">
            <div class="weui-cell__bd weui_cell_primary">修改总价</div>
            <div class="weui-cell__ft">
              <input type="number"
                     step="0.01"
                     min="0"
                     class="adjustFee color-red-1"
                     value="0"
                     v-model="subTotal"/>
            </div>
          </div>
        </div>
      </div>

      <div class="popup-window-footer">
        <div class="pull-left subTotal" style="width: 100px">
          ￥ <span class="currency-number" id="subTotal">{{ subTotal }}</span>
        </div>
        <div style="padding-left: 100px">
          <button type="button" class="btn btn-primary btn-block" id="btnSubmit" @click="submitFee">确认费用</button>
          <a class="btn btn-danger btn-block" href="" v-if="false">返回首页</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  @import "../../assets/scss/wos/_workorder.scss";
  .popup-window .popup-window-content .popup-window-body{
    padding-top: 0;
    background: #f8f8f9;
  }
  .weui-cells__title{
    border-bottom: rem(1px) solid #D9D9D9;
    margin-bottom: 0;
    padding-bottom: rem(5px);
  }
  .quantity-decrease,
  .quantity-increase{
    display: inline-block;
    width: rem(25px);
    height: rem(25px);
    text-align: center;
    vertical-align: bottom;
    line-height: 21px;
    border: 1px solid $border;
    border-radius: 0;
    margin-right: -4px;
  }
  .quantity{
    border: 1px solid $border;
    border-left: 0;
    border-right: 0;
    text-align: center;
    height: rem(25px);
    padding: 0 5px;
    width: rem(50px);
    margin-right: -4px;
  }
  .weui-check{
    margin: 2px 7px;
    line-height: normal;
    position: absolute;
    left: auto;
    width: rem(20px);
    height: rem(20px);
    opacity: 0;
  }
  .text-second{
    color: $font-light;
    font-size: $font-size-s;
  }
  .text-m{
    font-size: $font-size-m;
  }
  .adjustFee{
    border: 1px solid $border;
    text-align: right;
    height: rem(30px);
    padding: 5px;
    font-size: $font-size-m;
  }
</style>
<script type="text/javascript">
  export default{
    name: 'fitting-page',
    data() {
      return {
        quatityNum: [1, 2, 3, 4 , 5, 6, 7, 8, 9], //数量数组
        fwListData: [], //接口返回选项卡数据
        serviceCheckedList: [], //多选
        subTotalArr: [], //存放金额数组
        subTotal: 0 //总金额
      }
    },
    created() {
      this.$http.get(this.$woshost + '/workorder/' + this.$route.params.entityId + '/fee/items')
        .then((res) => {
          console.log(res);
          this.fwListData = res.serviceItems;
        });
    },
    methods: {
      //选中状态
      addService(itemid, price) {
        let curserviceArr = this.serviceCheckedList;
        let that = this;
        let hasin = true;
        curserviceArr.forEach((item, index) => {
          if (item === itemid) {
            that.serviceCheckedList.splice(index, 1);
            hasin = false;
            that.subTotal -= that.subTotalArr[index];
            that.subTotalArr.splice(index, 1);
          }
        });
        this.subTotal = 0;
        hasin && (this.serviceCheckedList.push(itemid), this.subTotalArr.push(price));
        this.calculate();
      },
      calculate() {
        for(let i = 0;i < this.subTotalArr.length; i++){
          this.subTotal += Number(this.subTotalArr[i]);
        }
        this.subTotal = Number(this.subTotal.toFixed(2));
      },
      //减数量
      decrease(e, index) {
        //取消事件冒泡
        e.stopPropagation();
        this.quatityNum[index] > 0 && this.quatityNum[index]--;
      },
      //加数量
      increase(e, index) {
        //取消事件冒泡
        e.stopPropagation();
        this.quatityNum[index]++;
      },
      quatityFocus(e) {
        return;
      },
      //回写费用
      submitFee() {
        this.$emit('transferData', this.subTotal);
        this.$emit('cancel');
      }
    }
  }
</script>
