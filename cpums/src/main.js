import Vue from 'vue'
import App from './App.vue';
import axios from 'axios';

//px自动转化为rem
import 'amfe-flexible'

// vue-router插件
import router from './router'
import store from './store'
// vant插件
import { Tabbar, TabbarItem, Icon, Grid, GridItem, Search, Card, Empty  } from 'vant';
import { Image as VanImage } from 'vant';
import { Cell, CellGroup, Form,Field, Button, NavBar,RadioGroup, Radio, Divider } from 'vant';
import { Uploader, Popup, AddressEdit, Area, AddressList} from 'vant'
// 富文本编辑器插件

// 不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.$axios = axios
//设置一个基础请求地址
axios.defaults.baseURL = '/api'

Vue.config.productionTip = false
//引入vant插件
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Search);
Vue.use(Card);
Vue.use(NavBar);
Vue.use(VanImage);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Form);
Vue.use(Uploader);
Vue.use(Empty);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Divider);
Vue.use(Uploader);
Vue.use(Popup);
Vue.use(AddressEdit);
Vue.use(Area);
Vue.use(AddressList);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
