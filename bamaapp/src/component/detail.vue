<template>
    <div class="container">
        <!-- 遮罩弹出层 -->
        <div v-show="boolen" class="surpermask">
            <ul>
                <li>
                    <router-link :to="'/bama?key=index'">
                        <span class="iconfont icon-home" ></span>首页
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/bama?key=user'">
                        <span class="iconfont icon-user" ></span>我的
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/bama?key=prolist'">
                        <span class="iconfont icon-search" ></span>搜索
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="header">
            <div>
                <span class="ico1 iconfont icon-icon-test2" @click="back"></span>
            </div>
            <div>
                <span class="ico2 iconfont icon-icon-test1"></span>
                <span class="ico3 iconfont icon-unorderedlist" @click="backhome"></span>
            </div>
        </div>

        <div class="cousel">
            <mt-swipe :auto="0">
                <mt-swipe-item v-for="(item1,index) in pics" :key="index"><img :src="'http://127.0.0.1:3000/'+item1.lg" alt="" width="100%"></mt-swipe-item>
            </mt-swipe>
        </div><!--轮播图-->
        <div class="bodytext">
            <p class="title">
            {{product.titles}}
            </p>

            <p class="salemsg">
                2019.05.31-2019.06.20 买就送茶家族{{product.cname}}
            </p>

            <div class="price">
                <div class="left">￥<strong>{{product.price}}</strong></div>
                <div class="right">销量<span>{{product.lcount}}</span></div>
            </div>

            <div class="salecondition">
                <ul>
                    <li class="m-6">领券</li>
                    <div>
                        <li class="mj">满199减10</li>
                        <li class="mj">满499减20</li>
                    </div>
                    <li class="right-row"></li>
                </ul>
            </div>

            <div class="prospec">
                <ul>
                    <div>
                        <li class="m-6">已选</li>
                        <li>主商品</li>
                    </div>  
                    <li class="right-row"></li>
                </ul>
            </div>

            <div class="adress">
                <p><span class="m-6">送至</span>北京北京市朝阳区</p>
                <p><span class="m-6">运费</span>包邮</p>
                <p><span class="m-6">提示</span> <span></span>正品保障 <span></span>七天无理由退货</p>
            </div>

            <div class="conment">
                <ul>
                    <li class="m-6">评论(暂无评价)</li>
                    <li class="right-row"></li>
                </ul>
            </div>
        </div>
        
        <div class="prodetail">
            <ul>
                <li class="prointr1" @click="choose(0)" :class="{active:num==0}">商品介绍</li>
                <li class="prointr2" @click="choose(1)" :class="{active:num==1}">规格参数</li>
            </ul>
            <div class="prointr1-text" v-show="0 == num">
                <div class="text">
                   <p>商品名称 : <span>八马茶业2019新茶 洞庭碧落春茶业 绿茶礼盒装150克</span> </p>
                   <p>商品编号 : <span>201806281343541</span> </p>
                   <p>店铺 : <span>八马茶业商城</span> </p>
                   <p>时间 : <span>2019-04-07 20:23:29</span> </p>
                   <p>级别 : <span>特级</span> </p>
                   <p>包装 : <span>礼盒装</span> </p>
                   <p>干茶形状 : <span>条形</span> </p>
                   <p>生长季节 : <span>春季</span> </p>
                   <p>食品工艺 : <span>炒青绿茶</span> </p>
                   <p>是否进口 : <span>否</span> </p>
                </div>

                <div class="picture">
                    <img v-for="(item2,index) in dtlpics" :key="index" :src="'http://127.0.0.1:3000/'+item2.psrc" width="100%" alt="">
                    <!-- <img src="../../../assets/image/img/1/right_pro/mxcl/main03.jpg" width="100%" alt="">
                    <img src="../../../assets/image/img/1/right_pro/mxcl/main03.jpg" width="100%" alt="">
                    <img src="../../../assets/image/img/1/right_pro/mxcl/main03.jpg" width="100%" alt=""> -->
                </div>
            </div>

            <div class="prointr2-text" v-show="1 == num">
               <p>详细参数</p>
               <p><span class="left">生产许可证编号:</span><span>SC11432050600289</span></p>
               <p><span class="left">储藏方法:</span><span>防潮湿、防异味、避光直射</span></p>
               <p><span class="left">保质期:</span><span>18个月</span></p>
               <p><span class="left">食品添加剂:</span><span>无</span></p>
               <p><span class="left">产品名称:</span><span>八马 碧螺春 礼盒</span></p>
               <p><span class="left">净含量:</span><span>150g</span></p>
               <p><span class="left">品牌:</span><span>八马</span></p>
               <p><span class="left">产地:</span><span>中国大陆</span></p>
               <p><span class="left">省份:</span><span>江苏省</span></p>
               <p><span class="left">货号:</span><span>BF029</span></p>
            </div>
        </div>

        <div class="footer">
            <div class="cart">
                <div>
                  <router-link :to="'/cart'"> 
                    <mt-badge class="huizhang" size="small" type="primary">{{pron}}</mt-badge>
                    <span class="iconfont icon-gouwuche"></span><br>
                    <span>购物车</span>
                  </router-link>
                </div>
            </div>
            <div class="kefu">
                <div>
                    <span class="iconfont icon-user"></span><br>
                    <span>客服</span>
                </div> 
            </div>
            <div class="addcart" @click="addcart()">加入购物车</div>
            <div class="buybtn" @click="Tocart()">立即购买</div>
        </div>

        <!-- 遮罩弹出层 加入购物车-->
        <div v-show="addboolen" class="addcartmask">
            <div :class={active:addboolen} class=propcart>
                <div class="addcarpro">
                    <div class="leftimg">
                        <div>
                            <img :src="'http://127.0.0.1:3000/'+product.smpic" alt=""  height="80%" width="80%">
                        </div>
                    </div>
                    <div class="righttext">
                        <p>{{product.titles}}</p>
                        <p style="color:red">￥{{product.price}}元 <span @click="canceladdcart()">x</span>   </p>
                    </div>
                </div>
                <ul>
                    <li>属性</li>
                    <li class="prospc">主商品</li>
                    <li>数量</li>
                    <li>
                        <div class="procount">
                            <a href="#" @click="reducen()"><i class="iconfont icon-minus-square"></i></a>
                            <input type="number" value="1" v-model="n">
                            <a href="#" @click="addn()"><i class="iconfont icon-plus-square"></i></a>
                        </div>
                    </li>
                </ul>
                <button @click="insertcart()">确认</button>
            </div>
            
        </div>

    </div>    
</template>

<script>
export default {
    created(){
        this.loaddetail();
        this.getpron();//获取购物车个数
    },
    destroyed(){
        document.body.style.position = 'relative';
        document.body.style.overflow = 'auto';
    },
    data() {
        return {
            num:0,
            product:{},
            pics:[],
            dtlpics:[],
            boolen:false,
            addboolen:false,
            n:1,
            pron:1,

        }
    },
    methods:{
        choose(index) {
            this.num = index;
        },
        loaddetail(){
            var lid=this.$route.query.lid;
            var url="details";
            var obj={lid:lid};
            if(lid!==undefined){
                //发送ajax
                this.axios.get(url,{params:obj}).then(result=>{
                    var{product,pics,dtlpics}=result.data;
                    this.product=product;
                    this.pics=pics;
                    this.dtlpics=dtlpics;
                    //console.log(this.dtlpics); 
                    console.log(this.product)  
                })
            }else{
                alert("请先登录");
            }
        },
        back(){
            this.$router.go(-1);
        },
        backhome(){//弹层出现禁止body滚动条
            if(this.boolen==true){
                this.boolen=false;
                document.body.style.position = 'relative';
                document.body.style.overflow = 'auto';
            }else{
                this.boolen=true;
                document.body.style.position = 'fixed';
                document.body.style.overflow = 'hidden';
            }
        },
        canceladdcart(){
            this.addboolen=false;
            document.body.style.position = 'relative';
            document.body.style.overflow = 'auto';
        },
        addcart(){
            this.addboolen=true;
            document.body.style.position = 'fixed';
            document.body.style.overflow = 'hidden';
        },
        getpron(){
            let cartInfo=localStorage.cartInfo?JSON.parse(localStorage.cartInfo):[];
                this.pron=cartInfo.length;
        },
        insertcart(){//加入购物车
           //是否登录
            var uid=localStorage.getItem("uid");
            console.log(uid);
            if(!uid){
                 //初始化本地缓存购物车 未登录插入本地缓存 
                let cartInfo=localStorage.cartInfo?JSON.parse(localStorage.cartInfo):[];
                //判断本地每个数组中是否有此种商品
                let isHaveGoods=cartInfo.find(cart=>cart.lid==this.product.lid);
                    console.log(isHaveGoods);
                    console.log(this.product.lid)
                if(isHaveGoods==undefined){
                    let newGoodsInfo = {
                        lid:this.product.lid,
                        titles:this.product.titles,
                        price:this.product.price,
                        pic:this.product.smpic,
                        lcount:this.n,
                    };
                    cartInfo.push(newGoodsInfo);
                    localStorage.cartInfo=JSON.stringify(cartInfo);
                    this.$toast("加入成功");
                    this.canceladdcart();
                }else{ 
                    this.$toast("已有此商品");
                    this.canceladdcart();
                }
            }else{//用户已登录 发送ajax请求购物车表 
                var url="addcart";
                var obj={lid:this.product.lid,
                        titles:this.product.titles,
                        price:this.product.price,
                        image:this.product.smpic,
                        lcount:this.n,
                        uid:uid};
                this.axios.get(url,{params:obj}).then(result=>{
                    var result=result.data;
                    if(result.length>0){
                        this.$toast("已有此商品");
                        this.canceladdcart();
                    }else{
                        this.$toast("加入成功");
                        this.canceladdcart();
                    } 
                })
            }
        },
        reducen(){//数量减少
            if(this.n>1){
                this.n--;
            }  
        },
        addn(){//数量减少
            if(this.n<999){
                this.n++;
            }  
        },
        Tocart(){//立即购买
            this.$router.push({path:'/cart'})
            //是否登录
            var uid=localStorage.getItem("uid");
            console.log(uid);
            if(!uid){
                 //初始化本地缓存购物车 未登录插入本地缓存 
                let cartInfo=localStorage.cartInfo?JSON.parse(localStorage.cartInfo):[];
                //判断本地每个数组中是否有此种商品
                let isHaveGoods=cartInfo.find(cart=>cart.lid==this.product.lid);
                    //console.log(isHaveGoods);
                    //console.log(this.product.lid)
                if(isHaveGoods==undefined){
                    let newGoodsInfo = {
                        lid:this.product.lid,
                        titles:this.product.titles,
                        price:this.product.price,
                        image:this.product.smpic,
                        lcount:this.n,
                    };
                    cartInfo.push(newGoodsInfo);
                    localStorage.cartInfo=JSON.stringify(cartInfo);
                    //this.$toast("加入成功");
                    //this.canceladdcart();
                }
            }else{//用户已登录 发送ajax请求购物车表 
                var url="addcart";
                var obj={lid:this.product.lid,
                        titles:this.product.titles,
                        price:this.product.price,
                        pic:this.product.smpic,
                        lcount:this.n,
                        uid:uid};
                this.axios.get(url,{params:obj}).then(result=>{
                    var result=result.data;
                    if(result.length>0){
                        console.log("已有")
                    }else{
                        console.log("加入成功");
                    } 
                })
            }
        },//立即购买
        

    }
}
</script>


<style scoped>
/*头部的样式*/ 
.header{
    width: 100%;
    box-sizing: border-box;
    height: 3.4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6em;
    position: fixed;
    z-index: 900;
}
.header div span{
    display: block;
    font-size: 1.3em;
    width: 1.3em;
    height: 1.3em;
    text-align: center;
    line-height: 1.3em;
    background-color:rgba(100,100,100,0.3);
    border: 1px solid #999;
    border-radius: 1em;
}
.header div:last-child{
    display: flex;
}
.header div span:last-child{
    margin-left: 0.5em;
}
/*轮播的样式*/ 
.cousel{
    width: 100%;
    height: 24em;
}
.mint-swipe-indicator{
    opacity: 0.8 !important;
    background: #352121;
}
/*文本主体*/
.bodytext{
    padding: 0.5em;
}
.title{
    width: 100%;
    height: 2.5em;
    font-size: 0.9em;
    line-height: 1.3em;
}
.salemsg{
    width: 100%;
    height: 1em;
    font-size: 0.75em;
    margin: 0.6em 0;
    color: red;
}
.price,.salecondition>ul,.salecondition div,.prospec div{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.salecondition>ul,.prospec ul,.conment ul{
    display: flex;
    height: 1.5em;
    font-size: 0.8em;
    margin: 0.5em 0;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    padding: 0.5em 0;
    justify-content: space-between;
    align-items: center;
}
.adress{
    height: 5.5em;
    font-size: 0.8em;
    margin: 0.5em 0;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    padding: 0.5em 0;
}
.adress p{
    height: 2em;
}
.price .left{
    font-size: 1.3em;
    color: red;
    font-weight: 500;
}
.price .right{
    font-size: 0.8em;
}
.mj{
    width: 44%;
    margin-left: 0.2em;
    height: 1.2em;
    background-color:rgba(220,0,0,0.6);
    padding: 0.3em;
    border: 1px solid #000;
    font-size: 0.3em;
    color: aliceblue;
}
.m-6{
    margin: 0 0.6em 0 0.6em;
    color: #999;
}
.right-row{
    display: block;
    width: 1.5em;
    height: 1.5em;
     margin: 0 0.6em 0 0.6em;
    background-image: url(../../../assets/image/common/right-row.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
/*商品规格和介绍*/ 
.prodetail>ul{
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top:1px solid #999;
    border-bottom:1px solid #999;
}
.prodetail>ul li{
    width: 50%;
    height: 2.5em;
    text-align: center;
    line-height: 2.5em;
}
.prodetail>ul li.active{
    box-sizing: border-box;
    border-bottom: 1px solid red;
}
.prodetail>ul li:first-child{
    border-right:1px solid #999; 
}

.prointr1-text>.text p{
    margin: 0.2em;
    padding: 0.2em;
}
.prointr1-text img{
    vertical-align: bottom;/*消除图片之间的间隙*/
}
.container{
    margin-bottom: 5em;
}

.prointr2-text{
    border-top: 1px solid #999;
    border-left: 1px solid #999;
    border-right: 1px solid #999;
    margin: 0.5em;
}
.prointr2-text p:first-child,.prointr2-text p:first-child~p{
    border-bottom: 1px solid #999;
    height: 1.8em;
    line-height: 1.8em;
    padding: 0.3em;
}
.prointr2-text span{
    text-align: left;
}
.prointr2-text .left{
    display: inline-block;
    width: 35%;
    color: #999;
    border-right: 1px solid #999;
    font-size: 0.9em;
}
.left+span{
    margin-left: 0.5em;
    font-size: 0.9em;
    font-weight: 700;
}

/*底部*/
.footer{
    display: flex;
    position: fixed;
    bottom: 0;
    z-index: 900;
    background-color: aliceblue;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    width: 100%;
}
.cart,.kefu{
    width: 20%;
    height: 2.5em;
    padding: 1em 1em 0 1em;
    font-size: 0.8em;
    text-align: center;
}
.addcart,.buybtn{
    width: 30%;
    height: 3.5em;
    line-height: 3.5em;
    text-align: center;
}
.addcart{
    background-color: #FFA526;
}
.buybtn{
    background-color: #E63D59;
}
.surpermask{
    position: fixed;
    z-index: 1000;
    width: 100%;
    left: 0;
    top: 2.8rem;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
}
.surpermask>ul{
    width: 30%;
    position: absolute;
    right: 1em;
    top: 1em;
    background-color: aliceblue;
    border-radius: 0.5em;
    text-align: center;
}
.surpermask>ul li{
    width: 100%;
    height: 2.8em;
    line-height: 2.8em;
    border-bottom: 1px solid #999;
}
.surpermask>ul li:last-child{
    border: none;
}

.addcartmask{
    position: fixed;
    z-index: 1000;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    overflow: hidden;
}
.addcartmask>div{
    background-color: aliceblue;
    width: 100%;
    height: 30em;
    position: absolute;
    bottom: 0;
}
.addcartmask ul{
    padding: 1em;
}
.addcartmask ul li{
    font-size: 1.2em;
    height: 3em;
    line-height: 3em;
}
.procount{
    display:flex;
    justify-content: left;
    align-items: center;
    font-size: 2em;
}
.procount input{
    width: 2em;
    text-align: center;
    outline: none;

}
.addcarpro{
    width: 100%;
    height: 9em;
    display: flex;
    border-bottom: 1px solid #999;
}
.addcarpro .leftimg{
    width: 45%;

}

.leftimg div{
    padding: 1em 0em 0.5em 0em;
    text-align: center;
    position: relative;
    top: -1.5em;
    left: 0.5em;
    border-radius: 0.3em;
    background-color: aliceblue;
}
.addcarpro .righttext{
    width: 55%;
    padding-left: 0.5em;
    padding-top: 1em;
    padding-right: 0.3em;
    overflow: hidden;
}
.addcarpro .righttext p{
    height: 4.5em;
}
.righttext span{
    display: inline-block;
    border-radius: 50%;
    border: 1px solid #999;
    width: 1.5em;
    height: 1.5em;
    color: #999;
    text-align: center;
    line-height: 1.3em;
    font-size: 1.5em;
    position: relative;
    right: -3em;
}
.prospc{
    width: 20%;
    height: 2.5em;
    line-height: 2.5em;
    border-radius: 0.5em;
    text-align: center;
    background-color: #E63D59;
    color: aliceblue;
}
.addcartmask button{
    width: 100%;
    height: 2.5em;
    font-size: 1.2em;
    background-color: #E63D59;
    position: fixed;
    bottom: 0;
    color: aliceblue;
    outline: none;
}
.propcart{
    position: absolute;
    top: 50em;
}
.addcartmask .active{
    position: absolute;
    top: 12em;
    transition: top 1s;

}
</style>
