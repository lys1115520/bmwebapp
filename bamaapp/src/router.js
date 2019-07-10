import Vue from 'vue'//引入node-module的Vue模块
import Router from 'vue-router'//引入node-module的router模块

//引入组件到相应的路径名变量
import bmhome from "./components/bamobile/Bama.vue"
import cart from "./components/bamobile/common/cart.vue"
import user from "./components/bamobile/common/user.vue"
import detail from "./components/bamobile/common/detail.vue"
import prolist from "./components/bamobile/common/prolist.vue"
import order from "./components/bamobile/common/order.vue"
import adress from "./components/bamobile/common/adress.vue"

//使用路由配置组件的访问路径
Vue.use(Router)
export default new Router({
  routes: [
    {path:'/',redirect:"/bama"},
    {path:'/bama',component:bmhome},
    {path:'/cart',component:cart},
    {path:'/user',component:user},
    {path:'/detail',component:detail},
    {path:'/prolist',component:prolist},
    {path:'/order',component:order},
    {path:'/adress',component:adress},
  ]
})
