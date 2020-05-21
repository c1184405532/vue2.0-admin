import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './globaleConfig/routerConfig.js'
import './globaleConfig/userMessage.js'
import router from './router/index'

import './globaleStyle/globale.less'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import {  message } from 'ant-design-vue';

import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false;
Vue.prototype.$message = message;
console.dir(router)
Vue.use(Antd);
Vue.use(VueRouter)
Vue.use(VueApexCharts)
Vue.component('apexchart',VueApexCharts)
//全局Vue实例
window.vm =  new Vue({
    render: h => h(App),
    router
}).$mount('#app')

