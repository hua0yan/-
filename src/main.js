import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/styles/index.less";
import touTiaoIcon from "@/components/touTiaoIcon.vue";
Vue.component("touTiaoIcon", touTiaoIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
