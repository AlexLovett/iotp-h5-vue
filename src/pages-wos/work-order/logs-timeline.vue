<style scoped lang="scss" type="text/scss">
  @import "../../assets/scss/wos/_popupwindow.scss";
  .popup-window .popup-window-content .popup-window-body{
    padding-top: 0;
    overflow: auto;
    height: calc(100% - 90px);
  }
  .log-timeline {
    position: relative;
    padding: 0;
    margin-top: 15px;
    margin-bottom: 0;
    &:before {
       content: '';
       position: absolute;
       top: 0;
       left: 20px;
       height: 100%;
       width: 1px;
       background: #F1F1F1
     }
    .log-timeline-row {
      position: relative;
      margin: 8px 0;
      .log-timeline-node {
        position: absolute;
        top: 5px;
        left: 17px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #F1F1F1
      }
      .log-timeline-content {
        position: relative;
        margin-left: 38px;
        padding: 0 0 5px;
        text-align: left;
        font-size: 12px;
        color: #878787;
        .log-timeline-log {
          float: left
        }
        .log-timeline-time {
          width: 160px;
          float: left;
          display: inline-block
        }
        &:after {
           content: "";
           display: table;
           clear: both
         }
      }
    }
    .active {
      .log-timeline-node {
        position: absolute;
        top: 0;
        left: 15px;
        width: 0;
        height: 0;
        background-color: transparent;
        color: #F60
      }
      .log-timeline-content {
        color: #F60;
        font-size: 14px;
        font-weight: 600
      }
    }
  }
</style>

<template>
  <div class="popup-window in" title="工单处理日志">
    <div class="popup-window-content">
      <div class="popup-window-title">
        <a class="close" data-dismiss="popupwindow" @click="cancelLogs">
          <i class="fa fa-close fa-lg fa-fw"></i>
        </a>
        <h4>工单处理日志</h4>
      </div>
      <div class="popup-window-body">
        <slot>
          <div class="log-timeline">
            <div class="log-timeline-row" v-for="(log,index) in logs" :class="{active : index === 0}">
              <div v-if="log.log !== undefined && null !== log.log &&  log.log !== 'null'">
                <div class="log-timeline-node">
                  <i class="fa fa-dot-circle-o" v-if="index === 0"></i>
                </div>
                <div class="log-timeline-content">
                  <span>{{ log.created | moment('YYYY-MM-DD HH:mm') }}</span>
                  &nbsp;&nbsp;
                  <span>{{ log.log}}</span>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </div>
      <div class="popup-window-footer">
        <button type="button" class="btn btn-primary btn-block" id="btnPopupOk" @click="onOk">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default{
        name: "logs-timeline",
        props: ["logs"],
        data() {
            return {
                isActive: true
            }
        },
        methods: {
          onOk: function () {
            this.$emit("cancel")
          },
          cancelLogs: function () {
            this.$emit("cancel")
          }
        }
    }
</script>
