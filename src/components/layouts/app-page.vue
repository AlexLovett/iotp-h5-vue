<!-- 分页组件 -->
<style scoped lang="scss" type="text/scss">
  @import "~variables";

  .has-no-more {
    color: $font-lighter;
    text-align: center;
    @extend %padding-m;

    .hr, .last-tips {
      position: relative;
      width: 40%;
      display: inline-block;
      vertical-align: middle;
    }

    .hr:before {
      content: '';
      display: block;
      height: 1px;
      background-color: $border;
    }

    .last-tips {
      width: auto;
      color: $font-lighter;
      @extend %padding-left-m;
      @extend %padding-right-m;
    }
  }
</style>

<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="isLoading"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false">

    <div v-if="totalElements > 0">
      <slot></slot>
    </div>

    <div class="padding align-center" v-show="isLoading">
      <div class="inline-block">
        <mt-spinner type="double-bounce" color="#20A0FF" :size="28"></mt-spinner>
      </div>
      <div class="font-lighter font-s margin-top-s">加载中...</div>
    </div>

    <div class="has-no-more" v-show="isLastPage && isLoading == false">
      <div class="hr"></div>
      <div class="last-tips">·</div>
      <div class="hr"></div>
    </div>

    <div v-if="totalElements === 0 && isLoading == false">
      <app-empty-view></app-empty-view>
    </div>
  </div>
</template>

<script>
  import AppEmptyView from '@/components/layouts/app-empty-view';
  import _ from 'lodash';

  export default{
    name: "app-page",
    components: {AppEmptyView},
    props: {
      // [必须] 分页数据请求URL
      url: {
        type: String,
        required: true
      },
      // [可选] 请求参数,json格式
      params: {
        type: Object,
        default: {}
      },
      // [可选] 分页数据状态mutation
      mutation: {
        type: String,
        default: ""
      },
      // [可选] 分页数据状态getter
      getter: {
        type: String,
        default: ""
      }
    },
    data: function () {
      return {
        totalElements: 0,
        totalPages: 0,
        fileList: [],
        curPage: 0,
        isLoading: true,
        isLastPage: false
      }
    },
    created: function () {
      this.loadMore();
    },
    methods: {
      /**
       * 加载更多数据
       */
      loadMore: function () {
        this.isLoading = true;

        if (this.fileList.length > 0) {
          this.curPage++;
        }
        if (this.totalPages > 0 && this.curPage > (this.totalPages - 1)) {
          this.isLoading = false;
          this.isLastPage = true;
          return;
        }

        const requestData = _.assign({
          page: this.curPage,
          size: 7,
        }, this.params);
        this.$http.get(this.url, requestData)
          .then((page) => {
            this.totalElements = page.totalElements;
            this.totalPages = page.totalPages;
            this.fileList = this.fileList.concat(page.fileList);

            this.commitStore();

            setTimeout(() => {
              this.isLoading = false;
              this.$store.commit("hideLoading");
            }, 1000);
          });
      },

      /**
       * 提交状态存储
       */
      commitStore: function () {
        if (this.mutation === "") {
          return;
        }
        this.$store.commit(this.mutation, {
          totalElements: this.totalElements,
          totalPages: this.totalPages,
          fileList: this.fileList
        });
      },

      /**
       * 从状态存储获取
       */
      getStore: function () {
        if (this.mutation === "") {
          return null;
        }
        return this.$store.getters(this.getter);
      }
    },
    watch: {
      // 监听分页数据变化事件通知
      fileList(value) {
        this.$bus.emit('page-loaded', value);
      }
    }
  }
</script>
