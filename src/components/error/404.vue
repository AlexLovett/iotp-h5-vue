<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .tips {
    width: rem(320px);
  }
</style>

<template>
  <div class="full-height valign-center font-light bg-white">
    <div class="align-center block-center">

      <img src="/static/images/404.png" class="tips"/>

      <div class="margin-top-xl font-m" v-show="redirectUri.name !== ''">
        <router-link :to="redirectUri.path" replace>返回{{redirectUri.name}}</router-link>
        <!--<div class="font-m">
          <span v-html="curShopLink"></span>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import MutationTypes from "@/store/mutation-types";

  export default{
    name: "error-404",
    computed: {
      redirectUri: function () {
        // 获取重定向路径
        let redirect = "";
        let name = "";
        const role = this.$store.getters[MutationTypes.oauth.getRole];
        console.log(role);
        if (role === "USER") {
          const curShop = this.$store.getters[MutationTypes.oauth.getCurShop];
          console.log(curShop);
          if(curShop !== null) {
            redirect = "/shop_" + curShop.id;
            name = curShop.name;
          }
        } else {
          redirect = "/wos";
          name = "工单系统";
        }
        return {
          path: redirect,
          name: name
        };
      }
    }
  }
</script>
