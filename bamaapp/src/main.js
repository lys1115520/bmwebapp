import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'

//main.js
//1:引入mint-ui库中所有组件:完整引入
import MintUI from 'mint-ui'
//2:单独引入mint-ui样式文件
import'mint-ui/lib/style.css'
//3:将mint-ui组件库中组件注册vue实例中
Vue.use(MintUI);
//引入小图标的样式文件
import './font/iconfont.css'
import './font2/iconfont.css'
//4:引入axios.js 请求ajax数据的
import axios from "./axios.js"
Vue.config.productionTip = false
//5引入vant列子
 import { Toast } from 'vant';
 Vue.use(Toast);
 import { Popup } from 'vant';
 Vue.use(Popup);
 import { AddressEdit } from "vant";
 Vue.use(AddressEdit);
 import { NavBar } from 'vant';
Vue.use(NavBar);

 



new Vue({//注册store  vuex;
  router,
  render: h => h(App),
  store
}).$mount('#app')
