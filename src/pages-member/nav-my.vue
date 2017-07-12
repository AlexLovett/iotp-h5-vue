<style scoped lang="scss" type="text/scss">
  @import "~variables";

</style>

<template>
  <div>
    <div class="fadeIn">

      <div class="header">
        <img src="/static/images/avatar.png" width="100" height="100" class="img-circle"/>

        <div class="color-white font-l margin-top">hucw</div>
      </div>

    </div>

    <app-nav navId="my"></app-nav>
  </div>
</template>

<script>
  import AppNav from '@/pages-member/nav';

  export default{
    name: "my",
    components: {
      "app-nav": AppNav
    }
  }
</script>
