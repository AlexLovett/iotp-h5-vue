# 品智云H5端
---

## 快速开始

``` bash
# 安装依赖，推荐使用淘宝仓库，节省大量时间
npm install --registry=https://registry.npm.taobao.org

# 本地开发，服务端口: 8000
npm run dev

# 生产环境打包，可加参数 --report 输出详细报告
npm run build-release

# 测试环境打包，可加参数 --report 输出详细报告
npm run build-stage
```

> 若使用本地环境开发，请在根目录添加 `local.conf.js` 本地配置文件，内容如下：
>
>   `module.exports = "http://192.168.199.218";`
>
> 请把上面IP地址替换成本机的IP地址，便于手机调试。
>
> 此文件名已添加到gitigore，不用提交到git进行版本管理，避免多人开发造成文件冲突。
>
> 若不添加，系统默认使用 `http://localhost`，但无法在手机上调试。

## API

详见: [http://192.168.199.10:8081/swagger/index.html](http://192.168.199.10:8081/swagger/index.html)

## 开发约定

### 文件夹命名

* 统一小写，禁止大写， _规避跨平台区分大小写导致找不到目录问题_
* 多个单词间 `-` 隔开，禁止驼峰命名，如 `lease-product`
* 业务功能页面文件统一放到 `src/pages` 目录下
* 模块名开头，按模块区分，如 `product`, `lease`

### 文件命名

* 统一小写，禁止大写, _规避跨平台区分大小写导致找不到文件问题_
* 结合文件夹命名，文件命名按模块页面或者按模块功能区分，如`view.js`, `product-form.js`,
* 多个单词间 `-` 隔开，禁止驼峰命名，如 `product-form.js`


### JS规范

请严格遵循ESLint规范进行编码，详细规范参考更目录下文件 `.eslintrc`。

对某个规则若有疑问可提出讨论。


### 模板文件

* 列表视图文件，默认使用 `list` 命名。某些特殊列表视图，使用 `-list` 后缀
* 表单视图文件，默认使用 `form` 命名, 同上特殊视图使用 `-form` 后缀
* 查看视图文件，默认使用 `view` 命名，特殊特殊视图使用 `-view` 后缀


## 目录结构

```bash
app
-- build                      // webpack构建脚本
-- config                     // webpack配置
-- static                     // 静态资源文件夹
-- src
  -- assets
    -- fonts                  // 字体图标
    -- images                 // 图片
    -- scripts                // app通用脚本封装
    -- scss                   // app样式库，包含通用的工具、组件等
  -- compontents              // vue通用组件
  -- paegs                    // 各业务功能页面，按模块区分
  -- store                    // vue状态管理
  -- app.vue                  // app页面入口
  -- main.js                  // vue入口文件
  -- routers.js               // 路由配置
```


## 全局函数(对象)

### `$http`

网络请求对象，基于`axios`封装，全局挂在Vue.prototype，Vue实例内调用：`this.$http.[method]`。

对请求响应错误拦截，若无特殊需求，默认使用toast提示错误信息。

同时对登录授权拦截，若没有授权token，则自动转到登录页面进行登录。

_methods_

封装了几个常用请求方法，统一返回Promise：

`this.$http.get(url, params)`

`this.$http.post(url, params)`

`this.$http.del(url, params)`

`this.$http.put(url, params)`

> 请求成功直接返回API中的数据体(data)


_demo_

```javascript
this.$http.get("/baseUrl/device/save", {
	name: '设备信息'
})
.then((respData) => {
	console.log(“保存成功”)
})
.catch((error) => {
	// 若非特殊需要，不用捕获异常
	console.log(“异常处理”)
})
```



### `$toast`

短消息提示函数，全局挂在Vue.prototype，Vue实例内调用：`this.$toast.[method]`，

其中 `method` 支持以下方法：

_methods_

`this.$toast.success(msg)`

`this.$toast. error(msg)`

`this.$toast. warn(msg)`

`this.$toast. info(msg)`

`this.$toast. toast(msg)`


_demo_

```javascript
this.$toast.success('成功消息');

this.$toast.error('错误消息');

this.$toast.toast('类安卓APP底部弹出短消息提示');
```


### `$loading`

请求遮罩处理，全局挂在Vue.prototype。

_demo_

```javascript
// 显示
this.$loading.show();

// 隐藏
this.$loading.hide();
```


## UI组件

### app-view

通用页面视图组件，封装了 加载状态、空白页面、错误提示，通过参数可以控制显示页面加载状态、空白页面等

如何使用：

```html
<app-view
  :isLoading="false"
  :isEmpty="false"
  :isError="false"
  :errMsg="">
  <!-- 页面内容 -->
</app-view>
```

属性说明:

* `isLoading`：是否显示加载中提示，值为： true|false。
* `isEmpty`: 是否显示空白提示，值为： true|false。若为true，loading隐藏。
* `isError`: 是否显示错误提示，值为： true|false。若为true，loading & empty 隐藏。
* `errMsg`：错误提示，默认为空。


### app-page

无限滚动分页加载组件。

此组件适用于展示分页数据页面，同时需结合后端返回的 `ApiPage` 对象，该组件基于 `ApiPage` 对象属性如 totalElements，fileList等字段进行分页管理。

_demo_


```javascript
<div>
	<app-page :url="pageUrl" :params="pageParams">

	   <!-- 具体列表页面内容布局 -->
		<ul v-if="fileList.length > 0 ">
			<li v-for="item in fileList"></li>
		</ul>

	</app-page>
</div>

<script>
import AppPage from '@/components/layouts/app-page';

export default{
    name: "pageList",
    data: function () {
      return {
        pageUrl: this.$apihost + "/member/devices",
        pageParams: {
          shopId: this.$store.state.auth.curShop.id
        },
        fileList: []
      }
    },
    components: {
      "app-page": AppPage
    },
    created: function () {
      // 监听AppPage组件分页数据加载完毕事件
      this.$bus.on("page-loaded", (fileList) => {
        this.fileList = fileList;
	   });
    }
  }
</script>
```

_props_

- `url`: [必须] 获取分页数据的URL
- `params`: [可选] 请求参数, JSON格式
