<style scope type="text/css" lang="scss">
  @import "~variables";
  @import "src/assets/scss/wos/iotp.h5";

  $white-1: #ffffff;
  $light-1: #f2f2f2;
  $text_second:  lighten($font-primary, 20%);
  $text_light:   lighten($font-primary, 40%);

  .wos-bg{
    padding: 25px;
    background-color: $primary;
    background-image: -webkit-linear-gradient(top, #2F8CFC, #03A9F4); /* Chrome 10-25, iOS 5+, Safari 5.1+ */
    background-image:         linear-gradient(to bottom, #2F8CFC, #03A9F4); /* Chrome 26, Firefox 16+, IE 10+, Opera */
  }

  .workorder-status {
    @extend %padding-top;
    @extend %padding-bottom;
    position: relative;
    width: 70px;
    margin: 0 auto;

    .workorder-badge {
      position: absolute;
      right: 8px;
      top: 5px;

      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      font-size: 12px;
      color: $white-1;
      border-radius: 50%;
      background-color: $red-2;
    }
  }

  $border-width: 8px;

  .workorder-all {
    position: relative;
    @include border(left);

    &:before,
    &:after {
      position: absolute;
      top: 40%;
      left: 0;

      display: block;
      content: "";

      border: $border-width solid transparent;
      border-left: $border-width solid $light-1;
    }

    &:after {
      left: -1px;
      border-left: $border-width solid $white-1;
    }
  }
  .img-thumbnail{
    display: inline-block;
    max-width: 100%;
    height: auto;
    padding: 4px;
    position: absolute;
    line-height: 1.42857143;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }
  .product-info {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    max-width: 60%;
    overflow: hidden;

    div {
      @extend %text-wrapper;
      width: 100%;
      display: block;
    }
  }
  .bg-box-80 {
    width: 80px;
    height: 60px;
    background: url(~/assets/images/avatar.png) center no-repeat #f5f7fa;
    background-size: cover;
    position: relative;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  // ---------------------------------
  // 工单列表
  .orders.workorders {
    li {
      /*@extend %margin-top;
      @extend %margin-bottom;*/

      .contact-info {
        color: $text_second;
        @include font-size(12px);
      }
    }

    .contact-info {
      @extend %padding-top;
      @extend %margin-top;
      border-top: 1px dashed $light-1;
      color: $text_second;
      font-size: 12px;
    }
  }
  //---------------------------------
  // 工作日志


  .popup-window{
    .popup-window-content{
      .popup-window-title{
        position: relative;
        width: auto;
      }
    }
  }
</style>

<template>
    <div class="list-container orders workorders">
      <div class="bg-white align-center">
        <div class="weui-flex">
          <div class="weui-flex__item">
            <div class="workorder-status">
              <router-link class="a-default" to="/wos/workOrder/beAccept/list">
                <i class="fa fa-calendar-check-o text-second"></i>
                <div class="text-s margin-top-s">待确认</div>
              </router-link>
              <div class="workorder-badge" v-if="entity.countBeAccept > 0">{{ entity.countBeAccept }}</div>
            </div>
          </div>
          <div class="weui-flex__item">
            <div class="workorder-status">
              <router-link class="a-default" to="/wos/workOrder/processing/list">
                <i class="fa fa-truck text-second"></i>
                <div class="text-s margin-top-s">进行中</div>
              </router-link>
              <div class="workorder-badge" v-if="entity.countProcessing > 0">{{ entity.countProcessing }}</div>
            </div>
          </div>
          <div class="weui-flex__item">
            <div class="workorder-status">
              <router-link class="a-default" to="/wos/workOrder/beRating/list">
                <i class="fa fa-handshake-o text-second"></i>
                <div class="text-s margin-top-s">待评价</div>
              </router-link>
              <div class="workorder-badge" v-if="entity.countRating > 0">{{ entity.countRating}}</div>
            </div>
          </div>
          <div class="weui-flex__item workorder-all">
            <div class="workorder-status">
              <router-link class="a-default" to="/wos/workOrder/all/list">
                <i class="fa fa-file-text text-second"></i>
                <div class="text-s margin-top-s">全部工单</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
        <app-page :url="pageUrl" :params="params">
          <ul>
            <li class="list-item margin-bottom bg-white" v-for="item in fileList">
              <router-link :to="'/wos/workOrder/' + item.id" class="a-default">
                <div class="order-info">
                  <img class="img-thumbnail pull-left" src="#" :src="item.productImage" width="50" height="50"/>

                  <div class="product-info">
                    <div  v-if="item.orderType === 'common'">
                      <div class="text-wrapper text-normal">{{ item.orderTitle !== null ? item.orderTitle : item.productName }}</div>
                      <div class="text-s text-second">型号：<span>{{ item.productItemCode}}</span></div>
                    </div>

                    <div  v-if="item.orderType === 'lease'">
                      <div class="text-wrapper text-normal">{{ item.leaseProduct.name }}</div>
                      <div class="text-s text-second">产品代码：<span>{{ item.leaseProduct.code }}</span></div>
                    </div>
                  </div>
                </div>

                <div class="order-field">
                  <div class="pull-right">
                    <i class="fa fa-clock-o text-light fa-lg"></i>
                    <div class="text-s" style="margin-top: 2px;"><status :order="item"></status></div>
                  </div>
                  <div class="product-field-info text-s">
                    <div>
                      服务项目：
                      <span class="color-green-1" v-if="item.orderType === 'common'">{{ item.shopServiceName }}</span>
                      <span class="color-yellow-1" v-if="item.orderType === 'lease'">租赁预约</span>
                    </div>
                    <div class="padding-top-s">
                      预约时间：
                      <span>{{ item.serviceDate | moment("MM-DD") }}</span> <span>{{ item.serviceTime}}</span>
                    </div>
                  </div>
                </div>

                <div class="contact-info">
                  <div>
                    联系信息：
                    <span>{{ item.contactName }}({{ item.contactMobile }})</span>
                  </div>
                  <div class="padding-top-s">
                    服务地址：
                    <span v-if="!item.newAddress">{{ item.serviceAddress }}</span>
                    <span v-if="item.newAddress">{{ item.newAddress}}</span>
                  </div>
                </div>
              </router-link>

              <div class="order-foot">
                <div style="float: right">
                  <actions type="list" :order="item"></actions>
                </div>
                <div class="text-second text-s">工单号：{{ item.workOrderId }}</div>
              </div>
            </li>
          </ul>
        </app-page>
    </div>
</template>

<script>

  import actions from "../tpl/tpl-actions.vue"
  import status from "../tpl/tpl-status.vue"
  import AppPage from '@/components/layouts/app-page';

  export default{
    name: "wos-page",
    data(){
      return {
        topStatus: '',
        allLoaded: false,
        type: this.$route.params.type,
        params: {
          size: 3,
          type: this.$route.params.type
        },

        fileList: [],
        pageUrl: this.$woshost + "/workorder/page",
        entity: []
      }
    },
    created: function () {
      /*this.$http.get(this.$woshost + "/workorder/page", this.params)
        .then((resp) => {
          this.page = resp;
          this.pagelist = resp.fileList;
        })*/

      this.$bus.on("page-loaded", (fileList) => {
        this.fileList = fileList;
      });

      this.$http.get(this.$woshost + "/workorder/dashboard")
        .then((resp) => {
          this.entity = resp;
          console.log(this.entity)
        });
    },
    components: {
      actions,
      status,
      AppPage
    }
  }
</script>
