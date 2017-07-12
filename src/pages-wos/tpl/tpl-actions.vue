<style scoped lang="scss" type="text/scss">

</style>

<template>
  <div>
    <mt-button type="primary" size="small" v-show="order.status===20 || order.status===30" @click="process">开始执行</mt-button>
    <mt-button type="danger"  size="small" v-show="(order.status===20 || order.status===30) && type === 'view'" @click="reject">拒绝工单</mt-button>
    <mt-button type="default" size="small"  v-show="(order.status===20 || order.status===30) && type === 'view'" @click="transfer">转单</mt-button>
    <mt-button type="danger" size="small"
       v-show="order.status===40 && order.deviceType !== 'L'" @click="valuation">工单计价</mt-button>
    <mt-button type="primary" v-show="order.status===60" @click="receipt">现金收款</mt-button>
    <mt-button type="primary" size="small"
       v-show="order.status===60 && order.orderType === 'common' && type === 'view'" @click="revaluation">重新计价</mt-button>
    <mt-button type="danger" size="small"
            v-show="order.status === 45 || order.status===41 || (order.status===40 && order.deviceType === 'L')" @click="finished">结束工单</mt-button>
    <mt-button type="primary" size="small"
            v-show="order.status === 41 && order.deviceEntityId !== null && order.orderType === 'lease' && type === 'view'" @click="experience">
      15天体验
    </mt-button>
    <mt-button class="default" size="small" v-show="type === 'view'" @click="back">返回</mt-button>

  </div>
</template>

<script>
    import { Toast } from 'mint-ui'

    export default{
        name: "actions",
        props: ["type","order"],
        data() {
          return {
            //transferModel: false
          }
        },
        methods: {
          //开始执行
          process() {
              this.$messagebox({
                title: '提示',
                message: '确定执行此操作?',
                showCancelButton: true
              }).then((action) => {
                if(action === 'confirm'){
                  this.$http.post(this.$woshost + "/workorder/" + this.order.id + "/process")
                   .then((resp) => {
                      if(resp.code === 0){
                        Toast({
                            message: "操作成功",
                            iconClass: 'fa fa-check',
                            position: 'top'
                        });
                        setTimeout(() => {
                            location.reload();
                        },1500)

                      }
                   })

                }
              })

            },
          //完成
          finished() {
              this.$messagebox({
                title: '提示',
                message: '确定执行此操作?',
                showCancelButton: true
              }).then((action) => {
                  if(action === 'confirm') {
                    this.$http.post(this.$woshost + "/workorder/" + this.order.id + "/finished")
                      .then((resp) => {
                        console.log(resp)
                      })
                  }
              })
            },
          //拒绝
          reject() {
              let options = {
                showInput: true,
                showCancelButton: true,
                inputValidator(value) {
                    if(value === null || value.replace(/^\s+|\s+$/g,"").length === 0){
                        return "请填写内容";
                    }
                }
              };
              this.$messagebox.prompt(" ","请输入拒绝原因",options).then(({ value, action }) => {
                  if(action === 'confirm'){
                      let reason = {
                        rejectReason: value
                      };
                    this.$http.post(this.$woshost + "/workorder/" + this.order.id + "/reject",reason)
                      .then((resp) => {
                        console.log(resp)
                      })
                  }
              });

            },
          //转单
          transfer() {
            this.$emit("transferModel");
          },
          //工单计价
          valuation() {
             //this.$emit('valuationModel');
            this.$router.push({path: '/wos/workOrder/'+ this.order.id +'/valuation'});
          },
          //现金收款
          receipt() {
            return;
          },
          //重新计价
          revaluation() {
            return
          },
          //15天体验
            experience() {
              let params = {
                deviceEntityId: ''
              };
              this.$http.post(this.$woshost + '/workorder/' + this.order.id + 'f15d', params)
                .then((res) => {
                  console.log(res);
                });
            },
            back() {
              history.back()
            }
        }
    }
</script>
