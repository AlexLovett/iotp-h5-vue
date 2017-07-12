<style scoped lang="scss" type="text/scss">
  @import "~variables";
</style>

<template>
  <div>
    <div class="padding bg-white flex">
      <div class="padding-left-m">
        <img class="img-thumbnail" :src=" $filters.img(userDevice.productImage, '!wh100') " width="90" height="90"/>
      </div>
      <div class="flex-item padding-left-m">
        <div class="font-bold font-title text-wrapper"> {{userDevice.deviceName}} </div>
        <div class="font-s font-light margin-top-l">
          <div class="margin-bottom-s">产品货号：{{userDevice.itemCode}}</div>
          <div>购买日期：{{ userDevice.purchasedDate }}</div>
        </div>
      </div>
    </div>

    <div class="form-group margin-top-l">
      <v-selector class="form-field" label="服务类型" placeholder="请选择预约服务"
                  v-model="formData.shopServiceDefId"
                  :data="shopServiceData" valKey="id" labelKey="name"></v-selector>

      <v-date-picker class="form-field" label="预约日期" placeholder="请选择预约日期"
                     v-model="formData.serviceDate"
                     :startDate="formData.serviceDate"
                     :endDate="endDate"
                     :defaultVal="$filters.formatDate(new Date())"></v-date-picker>

      <v-selector class="form-field" label="预约时间段" placeholder="请选择预约时间段"
                  v-model="formData.serviceTime"
                  :data="serviceTimeData"></v-selector>
    </div>
  </div>
</template>

<script>
  import VSelector from "@/components/ui/v-selector";
  import VDatePicker from "@/components/ui/v-date-picker";
  import moment from "moment";

  export default{
    name: "serviceorder-form",
    components: {VSelector, VDatePicker},
    data: function () {
      return {
        formData: {
          shopServiceDefId: "",
          serviceDate: new Date(),
          serviceTime: ""
        },

        shopServiceData: []
      }
    },
    computed: {
      userDevice: function () {
        return this.$route.query;
      },

      endDate: function () {
        // 最大日期默认一个月后
        const date = moment(new Date()).add(1, 'M');
        return new Date(date.year(), date.month(), date.date());
      },

      /**
       * 计算获取可用的时间段
       *
       * @returns {[string,string,string,string]}
       */
      serviceTimeData: function () {
        let data = ["09:00~11:00", "11:00~13:00", "13:00~15:00", "15:00~18:00"];
        if(this.formData.serviceDate !== "") {
           // 同一天根据当前时间过滤可用时间段
          if(moment(this.formData.serviceDate).isSame(new Date(), 'day')) {
            let now = moment();
            let today = moment();
            // 是否09:00以前
            /*if(now.isBefore())*/
            console.log("同一天");
          }
        }
        return data;
      }
    },
    created: function () {
      this.$http.get(this.$apihost + "/shop/service/list")
        .then((data) => {
          this.shopServiceData = data;
        })
    }
  }
</script>
