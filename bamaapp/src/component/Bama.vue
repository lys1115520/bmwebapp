<template>
   <div class="page-tabbar">
      <div class="page-wrap">
      <!--Home.vue-->
      <!--2:div保留(标题)48px高度-->
  
      <!--Home.vue 入口全局组件-->
      <!--3:切换面板列表-->
      <mt-tab-container class="page-tabbar-container" v-model="active">
        <!-- 主页 -->
        <mt-tab-container-item id="index">
         <indexpage @toUser="toUser" @searchpro="searchpro">
         </indexpage>
        </mt-tab-container-item>
        <!-- 商品分类列表 -->
        <mt-tab-container-item id="prolist">
         <fenleipage>
         </fenleipage>
        </mt-tab-container-item>
        <!-- 搜索列表 -->
        <!-- <mt-tab-container-item id="cart">
         <cart>
         </cart>
        </mt-tab-container-item> -->
        <!-- 用户中心 -->
        <mt-tab-container-item id="user">
         <user>
         </user>
        </mt-tab-container-item>
      </mt-tab-container>
      <!--4:tabbar列表-->
      <!--为每个按钮绑定点击事件-->
      <!--当前按钮isSelect:true-->
      <!--其它按钮isSelect:false-->
      <mt-tabbar v-model="active" fixed>
        <mt-tab-item id="index" @click.native="changeState(0)">
         <span :data-focused="currentIndex[0].isSelect" class="iconfont icon-home"></span>
         <br>
         首页   
        </mt-tab-item>
        <mt-tab-item id="prolist" @click.native="changeState(1)">
         <span :data-focused="currentIndex[1].isSelect" class="iconfont icon-unorderedlist"></span>
         <br>
         分类
        </mt-tab-item>
        <mt-tab-item id="cart" @click.native="changeState(2);tocart()">
          <span :data-focused="currentIndex[2].isSelect" class="iconfont icon-gouwuche"></span>
          <br>
          购物车
        </mt-tab-item>
        <mt-tab-item id="user" @click.native="changeState(3)">
          <span :data-focused="currentIndex[3].isSelect" class="iconfont icon-user"></span>
          <br>
          我的
        </mt-tab-item>
      </mt-tabbar>
   </div>
  </div>
</template>
<script>
import Indexpage from "./common/indexpage.vue"
import Fenleipage from "./common/fenleipage.vue"
//import Cart from "./common/cart.vue"
import User from "./common/user.vue"
export default {
  created(){
    //console.log(this.active)
    this.getdetails();

  },
  watch:{
    
    $route(to,from){
      console.log(to) 
      this.active=to.query.key;
    //   this.$router.push({
    //   query:merge(this.$route.query,{'key':this.active})
    // })

      }
  },
  data(){
    return {
      //面板中显示子组件id
      active:"index",
      //创建数组保存图片焦点状态
      currentIndex:[
        {isSelect:true},
        {isSelect:false},
        {isSelect:false},
        {isSelect:false}
      ]
    }
  },
  methods: {
    getdetails(){
      var key=this.$route.query.key;
       //console.log(key)
      if(key!=undefined){
        this.active=key;
      }
    },
    searchpro(val){
      this.active=val;
    },
    toUser(val){//子组件传值
      this.active=val;
    },
    changeState(n){
      //函数功能:将当前参数下标
      //对应数组值修改true其它修改false
      //1:创建循环,循环数组中内容
      for(var i=0;i<this.currentIndex.length;i++){
       //2:判断如果循环下标与n相等 20
       if(n==i){
        //3:当前下标元素true 10:22
        this.currentIndex[i].isSelect=true;
       }else{
        //4:其它元素修改false
        this.currentIndex[i].isSelect=false;
       }
       
      }
    },
    tocart(){
      this.$router.push({path:'/cart'})
    }

  },
  components:{
    "indexpage":Indexpage,
    "fenleipage":Fenleipage,
    "user":User,
  }
}
</script>
<style  scoped>
/*最外层父元素Home.vue*/
.page-tabbar{
  overflow: hidden;/*溢出隐藏*/
}
/*修改 tabbar 默认文字颜色*/
.mint-tabbar>.mint-tab-item{
  color:#999999;
}
/*修改默认tab选中文字样式*/
.mint-tabbar>.mint-tab-item.is-selected{
  background-color: transparent;
  color:#e22976;
}

.page-wrap{
  overflow:auto;/*溢出显示轮动条*/
  padding-bottom: 5em;
}
</style>
<style>
  .mint-tab-item>.mint-tab-item-label{
    font-size: 0.9em ;
  }
</style>


