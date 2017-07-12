<style scoped lang="scss" type="text/scss">
  @import "~variables";

</style>

<template>
  <div>
    <a data-v-7db7761a="" class="mint-cell mint-field ripple" v-on:click="openPicker()">
      <div class="mint-cell-left"></div>
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">{{ label }}</span>
        </div>
        <div class="mint-cell-value">
          <input :placeholder="placeholder" type="text" class="mint-field-core" :value="computeDate" readonly>
          <div class="mint-field-clear">
            <i class="fa fa-caret-down"></i>
          </div>
        </div>
      </div>
      <div class="mint-cell-right"></div>
    </a>

    <mt-datetime-picker
      ref="datetimePicker"
      :type="type"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
      :startDate="startDate"
      :endDate="endDate"
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
  import moment from "moment";

  export default{
    name: "v-date-picker",
    props: {
      // label: 字段文本
      label: String,
      // placeholder: 选择框默认显示内容
      placeholder: String,
      // value: 设置默认值
      defaultVal: String,

      format: {
        type: String,
        default: "YYYY-MM-DD"
      },
      // type: 日历类型，可选: 'date'，'datetime', 'time'
      type: {
        type: String,
        default: "date"
      },
      // startDate: 日期的最小可选值
      startDate: Date,
      // endDate: 日期的最大可选值
      endDate: Date
    },
    data: function () {
      return {
        date: ""
      };
    },
    computed: {
        computeDate: function () {
          if(this.date !== "") {
            return moment(this.date).format(this.format);
          }
          if(this.defaultVal !== ""){
              return moment(this.defaultVal).format(this.format);
          }
          return "";
        }
    },
    methods: {
      openPicker: function () {
        this.$refs.datetimePicker.open();
      },

      handleConfirm: function (secDate) {
        this.date = moment(secDate).format(this.format);
        this.$emit("input", this.date)
      }
    }
  }
</script>
