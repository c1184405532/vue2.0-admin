import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/global/index.js";
import Antd, { message } from "ant-design-vue";

// import VueApexCharts from 'vue-apexcharts'

import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;
Vue.prototype.$message = message;
Vue.use(Antd);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
