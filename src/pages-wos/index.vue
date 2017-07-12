<style scoped lang="scss" type="text/scss">
  @import "../assets/scss/wos/_workorder.scss";

  .hidden{
    display: none;
  }
  .text-white{
    color: white;
  }
</style>

<template>
  <div>
    <div class="wos-bg padding-m">
      <div class="align-center">
        <a class="a-default">
          <!--<div class="avatar80" th:style="|background-image: url(${curUser.avatar})|"></div>-->
          <img class="img-circle" :src="curUser.avatar" width="80px" height="80px"/>
        </a>
      </div>
      <div class="align-center text-white margin-top-s">
        <div class="text-m">{{curUser.nickname}}</div>
        <div class="margin-top text-s">
          <div class="br-wrapper br-theme-fontawesome-stars">
            <star-rating :star-size="18" active-color="#F93"  :rating="entity.rating" :show-rating="false" :read-only="true" :inline="true"></star-rating>
          </div>
        </div>
      </div>
    </div>

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

    <index-order :workOrder="entity.toBeAcceptWorkOrders" type="beAccept"></index-order>
    <index-order :workOrder="entity.processingWorkOrders" type="processing"></index-order>
  </div>
</template>
<script>
  import types from "@/store/mutation-types";
  import indexOrder from "./index-order.vue";
  import StarRating from 'vue-star-rating';

  export default{
    name: "wos-index",
    data() {
        return {
          curUser: this.$store.getters[types.oauth.getCurUser] ,
          entity: {}
        }
      },
    created: function () {
        this.$http.get(this.$woshost + "/workorder/dashboard")
          .then((resp) => {
            this.entity = resp;
            console.log(this.entity)
          });
    },
    methods: {

    },
    components: {
      indexOrder,
      StarRating
    }
  }

</script>
