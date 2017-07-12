<style scoped lang="scss" type="text/scss">
  @import "../assets/scss/wos/_workorder.scss";
</style>
<template>
  <div class="margin-top-m">
    <div class="padding-m border-bottom bg-white">
      <i :class="titleIcon"></i>&nbsp;&nbsp;<span class="valign-middle text-normal">{{ title }}</span>
    </div>
    <div v-if="!workOrder || workOrder.length === 0">
      <div class="padding-l align-center text-second bg-white">暂无{{ title }}</div>
    </div>

    <ul class="orders workorders" v-show="workOrder && workOrder.length > 0">
      <li v-for="order in workOrder">
        <div>
          <router-link class="a-default" :to="'/wos/workOrder/' + order.id">
            <div class="order-info">
              <img class="img-thumbnail pull-left" :src="order.productImage" width="50" height="50"/>

              <div class="product-info">
                <div v-if="order.orderType === 'common'">
                  <div class="text-wrapper text-normal"> {{ order.orderTitle }}</div>
                  <div class="text-s text-second">型号：{{ order.productItemCode }}</div>
                </div>

                <div v-if="order.orderType === 'lease'">
                  <div class="text-wrapper text-normal">{{ order.leaseProduct.name }}</div>
                  <div class="text-s text-second">产品代码：{{ order.leaseProduct.code }}</div>
                </div>
              </div>
            </div>

            <div class="order-field">
              <div class="pull-right">
                <i class="fa fa-clock-o text-light fa-lg"></i>
                <div class="text-s" style="margin-top: 2px;"><status :order="order"></status></div>
              </div>
              <div class="product-field-info text-s">
                <div>
                  服务项目：
                  <!--<span class="color-green-1" th:text="*{shopServiceName}"></span>-->
                  <span class="color-green-1" v-if="order.orderType === 'common'">{{ order.shopServiceName }}</span>
                  <span class="color-yellow-1" v-if="order.orderType === 'lease'">租赁预约</span>
                </div>
                <div class="padding-top-s">
                  预约时间：
                  <span>{{ order.serviceDate | moment("MM-DD") }}</span> <span>{{ order.serviceTime }}</span>
                </div>
              </div>
            </div>

            <div class="contact-info">
              <div>
                联系信息：
                <span>{{ order.contactName}}({{ order.contactMobile}})</span>
              </div>
              <div class="padding-top-s">
                服务地址：
                <span v-if="order.newAddress === null">{{ order.serviceAddress }}</span>
                <span v-if="order.newAddress !== null">{{ order.newAddress }}</span>
              </div>
            </div>
          </router-link>

          <div class="order-foot">
            <div style="float: right">
              <actions type="list" :order="order"></actions>
            </div>
            <div class="text-second text-s">工单号：{{ order.workOrderId }}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import actions from "./tpl/tpl-actions.vue"
  import status from "./tpl/tpl-status.vue"

  export default{
      name: "index-order",
      props: [
          "workOrder",
          "type"
      ],
      data() {
          return {
            beAccept: "fa fa-calendar-check-o fa-lg color-pink-1 valign-middle",
            processing: "fa fa-truck fa-lg color-blue-1 valign-middle",
          }
      },
      components: {
          actions,
          status
      },
      computed: {
          titleIcon() {
              return this.type === 'beAccept' ? this.beAccept : this.processing
          },
          title() {
              return this.type === 'beAccept' ? "待确认工单" : "进行中工单";
          }
      }
  }
</script>

