import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//导入vant组件并引入css样式
import Vant from "vant";
Vue.use(Vant);
import "vant/lib/index.less";
//引入style样式
import "@/styles/index.less";
import "@/styles/theme.less";
//引入公共组件=>图标
import touTiaoIcon from "@/components/touTiaoIcon.vue";
Vue.component("touTiaoIcon", touTiaoIcon); //注册全局组件
//引入适配插件
import "amfe-flexible";
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
