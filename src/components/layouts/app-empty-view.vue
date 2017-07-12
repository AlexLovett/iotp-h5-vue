<style scoped lang="scss" type="text/scss">
    @import "~variables";

    .empty-icon {
      font-size: rem(80px);
    }
</style>

<template>
<div>
  <div class="padding-m align-center font-light">
    <i class="iconfont icon-sad empty-icon"></i>
    <p class="font-lighter margin-top">这里什么都没有</p>
  </div>
</div>
</template>

<script>
    export default{
      name: "appEmptyView"
    }
</script>
