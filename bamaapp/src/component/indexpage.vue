<template>
    <div class="container">
        <!-- 顶部的搜索条 -->
        <div class="searchBox">
            <div class="logoJpg">
                <img src="../../../assets/image/logo.jpg" alt="" height="100%">
            </div>
            <div class="searchInput">
                <span class="iconfont icon-search"></span>
                <input @focus="searchpro()" type="text" placeholder="搜索商品">
            </div>
            <div class="userLogo" @click="toUser">
                <span class="iconfont icon-user" id="headerlogo"></span>
            </div>
        </div>
        <!-- 首页的图片 -->
        <div class="indexImg">
            <div>
                <div>
                    <img src="../../../assets/image/index/index1.jpg" alt="" width="100%">
                </div>
                <div>
                    <img src="../../../assets/image/index/index2.jpg" alt="" width="100%">
                </div>
                <div>
                    <img src="../../../assets/image/index/index3.jpg" alt="" width="100%">
                </div>
                <div>
                    <img src="../../../assets/image/index/index4.jpg" alt="" width="100%">
                </div>
                <div>
                    <img src="../../../assets/image/index/index5.jpg" alt="" width="100%">
                </div>
                <div>
                    <img src="../../../assets/image/index/index6.jpg" alt="" width="100%">
                </div>
                <div>
                    <img src="../../../assets/image/index/index7.jpg" alt="" width="100%">
                </div>
                <div>
                    <img src="../../../assets/image/index/index8.jpg" alt="" width="100%">
                </div>
                <div>
                    <img src="../../../assets/image/index/index9.jpg" alt="" width="100%">
                </div>
                <div>
                    <img src="../../../assets/image/index/index10.jpg" alt="" width="100%">
                </div>
                <div>
                    <img src="../../../assets/image/index/index11.jpg" alt="" width="100%">
                </div>
                <div class="prolist"><!--爆款茶礼4-->
                    <div class="proitem" v-for="(item1,index) in bkcl" :key="index">
                        <router-link :to="'/detail?lid='+item1.lid">
                            <a href="#" class="proimg">
                                <img :src="'http://127.0.0.1:3000/'+item1.pic" width="100%" alt="">
                            </a>
                            <p class="protext">
                                <a href="#">{{item1.titles}}</a>
                            </p>
                            <p class="proprice">￥{{item1.price.toFixed(2)}}</p>
                        </router-link>
                    </div>
                </div>
                <div>
                    <img src="../../../assets/image/index/index12.jpg" alt="" width="100%">
                </div>
                <!--赛珍珠2-->
                <div class="prolist">
                    <div class="proitem" v-for="(item2,index) in szz" :key="index">
                        <router-link :to="'/detail?lid='+item2.lid">
                            <a href="#" class="proimg"><img :src="'http://127.0.0.1:3000/'+item2.pic" alt="" width="100%"></a>
                            <p class="protext">
                                <a href="#">{{item2.titles}}</a>
                            </p>
                            <p class="proprice">￥{{item2.price.toFixed(2)}}</p>
                        </router-link>
                    </div>
                </div>
                <div>
                    <img src="../../../assets/image/index/index13.jpg" alt="" width="100%">
                </div>
                 <div></div><!--买一送一 4-->
                <div>
                    <img src="../../../assets/image/index/index14.jpg" alt="" width="100%">
                </div>
                 <div></div><!--口碑热销2-->
                <div>
                    <img src="../../../assets/image/index/index15.jpg" alt="" width="100%">
                </div>
                 <div></div><!--老茶客2-->
                <div>
                    <img src="../../../assets/image/index/index16.jpg" alt="" width="100%">
                </div>
                 <div></div><!--轻奢茶礼2-->
                <div>
                    <img src="../../../assets/image/index/index17.jpg" alt="" width="100%">
                </div>
                <div></div><!--春天的礼物2-->
                <!--  -->
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            bkcl:[],
            szz:[],
        }
    },
    created() {
     //组件创建成功
     this.load();
    },
    methods:{
        load(){
            //发送的接口地址
            var url="index";
            //发送ajax
            this.axios.get(url).then(result=>{
                //console.log(result.data.bkcl);
                var bkcl = result.data.bkcl;
                var szz = result.data.szz;
                this.bkcl = bkcl;
                this.szz = szz;
                //console.log(this.szz);
            })
        },
        toUser(){//子组件向父组件传值
            let prams = "user";
            this.$emit('toUser',prams);
        },
        searchpro(){//搜索框的跳转  子组件向父组件传值
            let prams = "prolist";
            this.$emit('searchpro',prams);
        },

    },
}
</script>

<style scoped>
.searchBox{
    position: fixed;
    display: flex;
    width: 100%;
    height: 2.8em;
    
    margin-top: 0.2em;
    align-items: center;
    z-index: 999;
}
.logoJpg{
    width: 15%;
    height:2.3em;
    padding-left: 0.2em;
}
.searchInput{
    display: flex;
    width: 70%;
    height: 2.3em;
    background-color:#fff;
    border: 1px solid #000;
    border-radius: 0.3em;
    padding: 0.1em;
    line-height: 2.5em;
}
.searchInput input{
    height: 70%;
    width: 90%;
    background-color:rgba (250,250,250,0.1);
    padding: 0.3em 0;
    outline: none;
    font-size: 1.1em;
}
.searchInput .icon-search{
    font-size: 1.8em;
    margin: 0 0.2em;
}
.userLogo{
    width: 15%;
    height: 2.3em;
    line-height: 2.3em;
}
#headerlogo{
    font-size: 1.8em;
    padding-left: 0.4em;
}
/*头部样式*/
.indexImg{
    width: 100%;
    padding: 0.1em;
}
.indexImg img{
    vertical-align: bottom;/*消除图片之间的间隙*/
}
/*加载的商品列表*/
.prolist{
   display: flex;/*弹性布局*/
   flex-wrap: wrap;/*子元素换行*/
   padding:4px;
 }
.proitem{
    width: 45%;
    margin-left: 3.3%;
    margin-bottom: 0.5em;
}
.proimg{
    display: block;
    width: 100%;
    height: 10.25em;
}
.protext{
    width: 100%;
    height: 2.7em;
    font-size: 0.92em;
    color: #000;
    line-height: 1.4em;
    margin: 0.4em 0;
    overflow: hidden;
}
.proprice{
    color:red;
}
</style>
