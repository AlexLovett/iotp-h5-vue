<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .card {
    position: relative;
    @extend %margin-m;
  }

  .device-type {
    position: absolute;
    top: rem(3px);
    left: rem(-7px);

    width: rem(80px);
    height: rem(30px);
    background: $transparent no-repeat;
    background-size: rem(80px) rem(30px);
    z-index: 1;
    text-align: center;
    color: $white;
    line-height: rem(28px);
    font-size: $font-size-s;
  }

  .device-type.device-type-i {
    background-image: url("/static/images/devices/tag-i.png");
  }

  .device-type.device-type-l {
    background-image: url("/static/images/devices/tag-l.png");
  }

  .device-status {
    height: rem(25px);
    line-height: 25px;
    margin-top: rem(3px);
    font-size: $font-size-s;

    i {
      font-size: 16px;
      margin-top: -3px;
    }
  }
</style>

<template>
  <div class="fadeIn">
    <app-view class="has-nav">

      <div class="bg-gradient padding-xl flex">
        <div class="flex-item font-l font-white">我的设备</div>
        <div class="ripple padding-left padding-right">
          <i class="iconfont icon-tianjia font-white icon-xl"></i>
        </div>
      </div>

      <app-page :url="pageUrl" :params="pageParams">
        <div v-if="!justOneIotDevice && fileList.length > 0">

          <div class="card"
               v-for="item in fileList"
               v-if="fileList.length > 0 ">

            <div class="device-type device-type-i" v-if="item.deviceType === 'I'"> 智能设备 </div>
            <div class="device-type device-type-l" v-if="item.deviceType === 'L'"> 租赁设备 </div>

            <div class="flex padding ripple">
              <div>
                <img class="img-thumbnail" :src=" $filters.img(item.productImage, '!wh100') " width="90" height="90"/>
              </div>
              <div class="flex-item padding-left">
                <div class="font-bold font-title text-wrapper"> {{item.deviceName}} </div>

                <div class="device-status">
                  <div class="color-danger" v-if="item.deviceType === 'L' && !item.leaseProductActived">
                    <i class="fa fa-ban"></i> 待激活
                  </div>

                  <div v-if="item.deviceType === 'I' || (item.deviceType === 'L' && item.leaseProductActived)">
                    <div class="color-danger" v-if="item.iotDeviceDto != null && item.iotDeviceDto.locked">
                      <i class="fa fa-lock"></i> 已锁机
                    </div>

                    <div v-if="item.iotDeviceDto != null && !item.iotDeviceDto.locked">
                      <div v-if="item.iotDeviceDto.online">
                        <span class="color-success" v-if="item.iotDeviceDto.powerOn"><i
                          class="fa fa-wifi"></i> 在线</span>
                        <span class="color-danger" v-if="!item.iotDeviceDto.powerOn"><i class="fa fa-power-off"></i> 已关机</span>
                      </div>
                      <div v-if="!item.iotDeviceDto.online">
                        <span class="color-danger"><i class="fa fa-exclamation-triangle"></i> 已离线</span>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="font-s font-light margin-top" v-if="item.deviceType === 'C'">
                  <div class="margin-bottom-s">产品货号：{{item.itemCode}}</div>
                  <div>购买日期：{{ $filters.formatDate(item.purchasedDate) }}</div>
                </div>

                <div class="font-s font-light margin-top" v-if="item.deviceType !== 'C'">
                  <div class="margin-bottom-s">SN：{{item.iotDeviceDto.deviceId}}</div>
                  <div class="margin-bottom-s">MAC：{{item.iotDeviceDto.deviceMac}}</div>
                  <!--<div>购买日期：{{ filters.formatDate(item.purchasedDate) }}</div>-->
                </div>
              </div>
            </div>

            <div class="bg padding flex">
              <div class="flex-item"></div>
              <div>
                <button type="button" class="btn btn-sm btn-danger btn-round"
                        v-if="item.deviceType === 'L' && !item.leaseProductActived">
                  去激活设备
                </button>

                <router-link :to="{ path: '/serviceorder/create', query: getDeviceParams(item)}"
                             class="btn btn-sm btn-default-outline btn-round"
                             v-if="item.deviceType !== 'L' || (item.deviceType === 'L' && item.leaseProductActived)">
                  一键报修
                </router-link>
              </div>
            </div>
          </div>

          <div v-if="justOneIotDevice && fileList.length > 0">

          </div>
        </div>
      </app-page>
    </app-view>

    <app-nav navId="devices"></app-nav>
  </div>
</template>

<script>
  import Vue from 'vue';
  import AppNav from '@/pages-member/nav';
  import AppPage from '@/components/layouts/app-page';
  import types from "@/store/mutation-types";
  import {Lazyload, InfiniteScroll} from 'mint-ui';
  import AppView from "@/components/layouts/app-view";

  Vue.use(InfiniteScroll);

  export default{
    name: "devices",
    data: function () {
      return {
        pageUrl: this.$apihost + "/member/devices",
        pageParams: {
          shopId: this.$store.state.auth.curShop.id
        },
        fileList: [],
        justOneIotDevice: true
      }
    },
    components: {
      AppView,
      "app-nav": AppNav,
      "app-page": AppPage,
      "v-lazy": Lazyload
    },
    created: function () {
      this.$bus.on("page-loaded", (fileList) => {
        this.fileList = fileList;

        if (this.fileList.length === 1) {
          const device = this.fileList[0];
          this.justOneIotDevice = device.deviceType !== "C";
        } else {
          this.justOneIotDevice = false;
        }
      });

      setInterval(() => {
        this.refreshStatus();
      }, 10000);
    },
    methods: {
      /**
       * 刷新设备状态
       */
      refreshStatus: function () {
        const iotDeviceIds = this.getIotDeviceIds();
        if (iotDeviceIds === "") {
          return;
        }

        this.$http.get(this.$apihost + "/iot/waterdevice/status", {
          deviceIds: iotDeviceIds
        })
          .then((data) => {
            this.renderIotDeviceStatus(data);
          });
      },

      /**
       * 获取智能设备ID
       *
       * @returns {string}
       */
      getIotDeviceIds: function () {
        let deviceIds = "";
        if (this.fileList.length === 0) {
          return "";
        }

        for (let i = 0; i < this.fileList.length; i++) {
          const device = this.fileList[i];
          if (device.deviceType !== "C" && device.iotDeviceDto !== null) {
            if (deviceIds !== "") {
              deviceIds += ",";
            }
            deviceIds += device.iotDeviceDto.id;
          }
        }
        return deviceIds;
      },

      /**
       * 渲染智能设备状态
       *
       * @param deviceStatusList 智能设备状态信息
       */
      renderIotDeviceStatus: function (deviceStatusList) {
        for (let i = 0; i < this.fileList.length; i++) {
          const device = this.fileList[i];
          if (device.deviceType === "C") {
            continue;
          }

          for (let j = 0; j < deviceStatusList.length; j++) {
            const statusObj = deviceStatusList[j];
            if (device.iotDeviceDto.id !== statusObj.id) {
              continue;
            }

            device.iotDeviceDto.powerOn = statusObj.powerOn;
            device.iotDeviceDto.online = statusObj.online;
            device.iotDeviceDto.locked = statusObj.locked;
          }
        }
      },

      /**
       * 获取跳转传递参数
       *
       * @param userDevice
       */
      getDeviceParams: function (userDevice) {
        return {
          id: userDevice.id,
          deviceName: userDevice.deviceName,
          productId: userDevice.productId,
          productImage: userDevice.productImage,
          itemCode: userDevice.itemCode,
          purchasedDate: this.$filters.formatDate(userDevice.purchasedDate),
        }
      }
    }
  }
</script>
