import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store';
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// 引用组件
Vue.use(ElementUI);

// 不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.$axios = axios
//设置一个基础请求地址
axios.defaults.baseURL = '/api'

new Vue({
  router,
  store:store,
  render: h => h(App),
}).$mount('#app')
