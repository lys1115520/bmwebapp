<template>
    <div class="container">
        <!-- 顶部的搜索条 -->
        <div class="searchBox">
            <div class="logoJpg">
                <img src="../../../assets/image/logo.jpg" alt="" height="100%">
            </div>
            <div class="searchInput">
                <span class="iconfont icon-search"></span>
                <input v-model="val" type="text" placeholder="搜索商品" autofocus="autofocus">
            </div>
            <div class="headright" @click="searchpro()">
                <span id="headerseach">搜索</span>
            </div>
        </div>
        <!--下面的分类面板主体 -->
        <div class="height"></div>
        <div class="tabmain">
            <div class="lefttab">
                <ul>
                    <li v-for="(item,index) in list" :key="index" :class="{active:num==index}" @click="choose(index)"><a href="#">{{item}}</a></li>    
                </ul>
            </div> 
            <div class="lefttabshadow">
                <!--占位  -->
            </div>
            <div class="righttab">
                <div v-for="(item1,index) in fenlei" :key="index" v-show="index == num">     <!--v-show="index == num"--> 
                    <ul v-for="(item2,index) in item1" :key="index">
                        <li class="bigtitle">{{item2.titles}}</li>
                        <li>
                            <router-link :to="'/prolist?egtitle='+item2.egtitle" class="righttabImg">
                                <img :src="'http://127.0.0.1:3000/'+item2.pic" alt="" height="100%">
                            </router-link>
                            <p class="smalltitle">{{item2.titles}}</p>
                        </li>  
                    </ul>
    
                </div>

            </div>
        </div>
    
        <mt-search class="headSearch"
        cancel-text="取消"
        placeholder="搜索">
        </mt-search>
 
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: ["乌龙茶", "红茶", "绿茶","黑茶","白茶","花茶","茶食品","茶具"],
            num:0,
            fenlei:[],
            val:"",
        }
    },
    created() {
     //组件创建成功
     this.load();
    },
    methods: {
        choose(index) {
            this.num = index;
        },
        load(){
             //发送的接口地址
            var url="fenleilist";
            //发送ajax
            this.axios.get(url).then(result=>{
                 this.fenlei = result.data;
                //console.log(this.fenlei);
            })
        },
        searchpro(){//搜索商品
            if(this.val!=""){
                var key=this.val;
                this.$router.push('/prolist?key='+key)
            }
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
    background-color:#ff505b;
    
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
    border: 1px solid #000;
    border-radius: 0.3em;
    padding: 0.1em;
    line-height: 2.5em;
}
.searchInput input{
    height: 100%;
    width: 90%;
    color: aliceblue;
    background-color:#ff505b;
    outline: none;
    font-size: 1.1em;
}
.searchInput ::-webkit-input-placeholder{
    color: aliceblue;
}
.searchInput .icon-search{
    font-size: 1.8em;
    margin: 0 0.2em;
}
.headright{
    width: 15%;
    height: 2.3em;
    line-height: 2.3em;
}
#headerseach{
    color: aliceblue;
    font-size: 1.0em;
    padding-left: 0.4em;
}
.headSearch{
    display: none;
}
/*头部样式*/
.height{
    height:2.9em;
}
.tabmain{
    display: flex;
    padding: 0.1em;
}
.lefttab{
    width:35%;height:100%;
    border-right:1px solid #999;
    position:fixed;
}
.lefttabshadow{
    width:35%;height:100%;
}
.lefttab>ul>li{
    display: block;
    width: 100%;height: 3.7.0em;
    line-height: 3.7em;
    text-align: center;
    border-bottom: 1px solid #999;
    
    font-size: 1em;
    color: #000;
}
.lefttab>ul>li.active{
    border-bottom: 1.2px solid red;
    
}
.lefttab>ul>li.active a{
    color: red;
}
.righttab>ul{
    text-align: left;
    padding-left: 1.5em;
}
.righttab ul li:last-child{
    background-color: #ddd;
    padding:0.8em;
}
.bigtitle{
    width: 50%;
    height: 2.3em;
    line-height: 2.3em;
    text-align: center;
    font-size: 1.3em;
}
.smalltitle{
    width: 50%;
    height: 1.3em;
    line-height: 1.3em;
    text-align: center;
    font-size: 0.95em;
}
.righttabImg{
    display: block;
    width: 100%;
    height: 8em;
}
.righttab{
     width:65%;height:100%;
}
</style>
<style>
.mint-searchbar .mint-searchbar-inner .mintui-search {
    font-size: 1.5em;
    color: #000;
}
.mint-searchbar-core{padding-left:0.5em;}
</style>

