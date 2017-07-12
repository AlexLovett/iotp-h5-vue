<style scoped lang="scss" type="text/scss">
  @import "../../assets/scss/wos/_popupwindow.scss";
  .transfer-page{
    .popup-window-title{
      h4{
        text-align: left;
      }
      a.close{
        color: inherit;
        &:hover{
          color: #495060;
          text-decoration: none;
        }
        &:active{
          outline: 0;
        }
        &:focus{
          outline: 0;
        }
      }
    }
    .popup-window-body{
      .handle-person-title,
      .handle-remark-title{
        border-bottom: 1px solid #D9D9D9;
        padding-left: 15px;
        padding-bottom: 5px;
        font-weight: 200;
        color: #999;
        margin: 0;
      }
      .handle-remark-title{
        height: 40px;
        line-height: 63px;
      }
      ul{
        list-style: none;
        margin: 0;
        padding: 0;
        li{
          border-bottom:1px solid #D9D9D9;
          padding: 13px 0;
          padding-right: 15px;
          margin-left: 15px;
          .fa{
            float: right;
          }
          &:last-child{
            margin-left: 0;
            padding-left: 15px;
          }
        }
      }
      #remark{
        padding-left: 15px;
        padding-top: 10px;
        width: 100%;
        resize: none;
        border: none;
        border-bottom: 1px solid #D9D9D9;
      }
    }
  }
</style>

<template>
  <div class="popup-window in" title="转单">
    <div class="popup-window-content">
      <div class="popup-window-title">
        <a class="close" data-dismiss="popupwindow" @click="cancelLogs">
          <i class="fa fa-close fa-lg fa-fw"></i>
        </a>
        <h4>请选择工单处理人</h4>
      </div>
      <div class="popup-window-body">
        <h4 class="handle-person-title">处理人</h4>
        <ul>
          <li v-for="item in persons" @click="selectPerson(item)"><span class="handle-person-name">{{ item }}</span><i v-if="activeName==item" class="fa fa-check"></i></li>
        </ul>
        <h4 class="handle-remark-title">备注说明</h4>
        <textarea v-model="remark" name="remark" id="remark" cols="30" rows="10" placeholder="请填写转单说明">

        </textarea>
      </div>
      <div class="popup-window-footer">
        <button type="button" class="btn btn-primary btn-block" id="btnPopupOk" @click="onOk">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import toast from 'scripts/toast'

  export default {
    name: 'transfer-page',
    props: ['order'],
    data() {
      return{
        remark: '',
        persons: ['秦师傅', '超人', '小萝莉', '小白'],
        activeName: ''
      }
    },
    methods: {
      onOk: function () {
        if(!this.activeName) {
          toast.error('请选择转单人员！');
          return;
        }
        let params = {
          assigneeId: '',
          memos: ''
        };
        console.log(this.order);
        this.$http.post(this.$woshost + "/workorder/" + this.order.id + "/transfer", params)
          .then((resp) => {
            console.log(resp)
          });
        this.$emit("cancel");
      },
      cancelLogs: function () {
        this.$emit("cancel")
      },
      selectPerson: function (person) {
        this.activeName = person;
      }
    }
  }
</script>
