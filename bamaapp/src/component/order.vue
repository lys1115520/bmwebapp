<template>
    <div class="page-tabbar">
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
            <!-- 头部 -->
            <div class="headmodule">
                <div>
                  <h2>订单详情</h2>
                </div>
                <span @click="del=!del" v-show="!del">编辑</span>
                <span @click="del=!del" v-show="del">完成</span>
                <span class="iconfont icon-viewgallery" @click="backhome"></span>
            </div>
            <!-- 订单列表 -->
            <div class="bodycontent">
                <div class="salemsgdiv">
                    <div class="salemsg">
                        <label class="salemsgleft">
                            <input type="checkbox" v-model="checked" @click="check_all()">
                            <span></span>
                            <span>平台自营</span>
                        </label>
                        <div class="salemsgright">
                            <span>全场包邮</span>
                            <span>领取优惠劵</span>
                        </div>
                    </div>
                </div>               
                <!-- 购物车商品列表 -->

                <ul class="prolist">
                    <li class="prolistItem" v-for="(item,index) in prolist" :key="index">
                        <label class="salemsgleft checkbox">
                            <input type="checkbox" v-model="selected"
                            :value="item">
                            <span></span>
                        </label>
                        <div class="prolistImg"><img :src="'http://127.0.0.1:3000/'+item.pic" width="100%" alt=""></div>
                        <div class="promsg">
                            <a href="#" class="protitle">{{item.titles}}</a>
                            <p class="propec"> 规格 ：<span>主商品</span></p>
                            <div class="pricecount">
                                <span class="proprice">￥{{item.price.toFixed(2)}}</span>
                                <div class="procount" v-show="!del">
                                    <a href="javascript:;" @click="item.lcount>1?item.lcount--:''"><i class="iconfont icon-minus-square"></i></a>
                                    <span>{{item.lcount}}</span>
                                    <a href="javascript:;" @click="item.lcount<99?item.lcount++:''"><i class="iconfont icon-plus-square"></i></a>
                                </div>
                                <div v-show="del" style="color:red;height:1.5em">
                                    <span @click="delpro" :data-index="index" :data-lid="item.lid">删除</span>
                                </div>
                            </div>

                        </div>
                    </li>
                    

                </ul>

                <div class="adressBox"><!--地址栏-->
                    <input type="checkbox" checked class="checkAdress" @click="del=!del">
                    <div class="adressBoxLeft">
                        <p>{{adresslist[0].address}}</p>
                        <p>
                            <span>{{adresslist[0].tel}}</span>
                            <span>{{adresslist[0].name}}</span>
                        </p>
                    </div>
                    <div class="adressBoxright">                       
                        <router-link :to="'/adress'">
                            更换
                        </router-link>
                    </div>
                </div>

            </div>
            <!-- 底部全选结算栏 -->
            <div class="footmodule">
                <div class="leftcheckall">
                    <label class="salemsgleft checkbox">
                        <input type="checkbox" v-model="checked" @click="check_all()">
                        <span></span>
                        <b>全选</b>
                    </label>
                    <div class="footp">
                        <p>合计 : <span>￥{{getTotal.totalPrice}}.00</span></p>
                        <p>(不含运费，已优惠<span>￥0.00</span>)</p>
                    </div>
                </div>
                <div class="rightbtn" >
                    <button :class={active:del} @click="!del && submit()">
                        结算( <span>{{getTotal.totalNum}}</span> )
                    </button>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import { Toast } from 'vant';
export default {
    created(){
        
        if(this.login()){
            //是否登录
            this.loadcart();//加载购物车
        }
        this.loadadress();//加载地址表
       
    },
    destroyed(){
        document.body.style.position = 'relative';
        document.body.style.overflow = 'auto';
    },
    data() {
        return {
            boolen:false,
            prolist:[],
            lcount:1,
            selected:[],
            checked:false,
            del:false,
            adresslist:[{address:"湖南省沅江市天马家具安置小区3栋",name:"刘义颂",tel:"13968853090"}],
        }
    },
    mounted(){
       
    },

    watch:{
        $route(to,from){//监听地址栏变化 关闭模态框
            this.boolen=false;
            document.body.style.position = 'relative';
            document.body.style.overflow = 'auto';
        }  
    },
    methods:{
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
        login(){//是否登录
            var uid=localStorage.getItem("uid");
            //console.log(uid);
            if(!uid){
                return false
            }else{
                return true
            }
        },
         loadadress(){//加载地址 
             if(localStorage.addressInfo!=""){
                 var addressInfo=JSON.parse(localStorage.addressInfo);
                 this.adresslist=addressInfo;
                 localStorage.addressInfo=[];
             }      
         },
        loadcart(){//加载商品
            let selectedInfo=JSON.parse(localStorage.selectedInfo);
            this.prolist=selectedInfo;
            console.log(this.prolist)
        },
        check_all(){//全选按钮功能 
            if(this.checked==false){
                this.selected = [];//先清空防止重复 再全添加
                this.prolist.forEach(a => {
                    this.selected.push(a)
                })
            } else{
                this.selected = []
            }
        },
        submit(){//结算提交
            console.log("tijiao ")
        },
        delpro(e){//删除商品
            var lid = e.target.dataset.lid;//获取当前点击对象的自定义属性
            var index = e.target.dataset.index;
            var uid=localStorage.getItem("uid");
            //删除之前判断是否删除
            this.$messagebox({
               title:"消息",
               message:"是否删除商品",
               showConfirmButton:true,
               showCancelButton:true,
            }).then(result=>{
                if("cancel"==result){
                    return
                }else{
                    if(!uid){//没登录删除缓存数据
                        this.prolist.splice(index,1);
                        var cartInfo=JSON.parse(localStorage.cartInfo);
                        var newcartInfo=[];
                        for(var i=0;i<cartInfo.length;i++){
                            if(cartInfo[i].lid!=lid){
                                newcartInfo.push(cartInfo[i]);
                            }
                        };
                        localStorage.cartInfo=JSON.stringify(newcartInfo);//更新本地缓存
                    }else{//已登录删除服务器数据
                        //发送ajax删除商品
                        var url = "del"
                        var obj = {lid:lid}
                        this.axios.get(url,{params:obj}).then(result=>{
                        //console.log(result)
                        //刷新
                        this.loadcart();
                        if(this.selected.length==0){
                            this.del=false
                        }
                        });
                    }
                }
            });  
        },

    },
    computed:{//计算属性
        getTotal:function(){//计算总计
             if((this.selected.length==this.prolist.length)&&this.selected.length>0){//复选框全选中 则全选框选中
                 this.checked=true;
             }else{
                 this.checked=false;
             }
            var totalPri = 0;//已选中列表的数量乘以价格 相加的和
            for (var i = 0,len = this.selected.length; i < len; i++) {
                totalPri+=Number(this.selected[i].price)*Number(this.selected[i].lcount);
            }
            return {totalNum:this.selected.length,totalPrice:totalPri}
		},

    }

} 
</script>

<style scoped>
button.active{
    color: #999 !important;
    
}
.page-tabbar{
  overflow: hidden;/*溢出隐藏*/
}
.page-tabbar>.container{
  font-size: 1.0em;
  font-family:"Microsoft YaHei";
}
.container{
  overflow:auto;/*溢出显示轮动条*/
  padding-bottom: 5em;
  
}
.headmodule{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 2.9em; 
    border-bottom: 1px solid #ddd;
    position: fixed;
}
.headmodule>div{
    width:45%;
    height: 2em;
    line-height: 2em;
    border: 1px solid red;
    border-radius: 0.3em;
    text-align: center;
    font-size:1.3em;
    font-weight: 500;
}
/* 购物车主体 */
.bodycontent{
    margin-top:3em;
}
/* 全选框 和复选框的美化 */
label input{
    /* appearance: none; */
    -webkit-appearance: none;
    outline: none;
    display: none;
}
label input[type="checkbox"]+span{
    margin-right:0.5em;
    width:1.4em;height:1.4em;
    display:inline-block;
    background:url('../../../assets/image/common/checkedfalse.png') no-repeat;
    background-size:1.4em 1.4em;
    background-position:0 0;}
label input[type="checkbox"]:checked+span{
    background:url('../../../assets/image/common/checkedtrue.png') no-repeat;
    background-size:1.4em 1.4em;
    background-position:0 0;
}
.salemsgleft{
    display: flex;
    align-items: center;
    font-size: 0.9em;
}
.salemsg,.salemsgright{
    display: flex;
    width: 100%;
    height: 3em;
    justify-content: space-between;
    align-items: center;
}
.salemsgleft,.salemsgright{
    width: 50%;
    height: 100%;
    line-height:3em;
}
.salemsgright span:first-child{
    color: #999;
    font-size: 0.9em;
}
.salemsgright span:last-child{
    color: #E63D59;
    font-size: 0.93em;
}
/* 购物车商品列表 */
.prolist{
    border: 1px solid #ddd;
    font-size: 1em;
}
.salemsgdiv,.prolistItem{
    padding:0 1em;
    background-color: azure;
} 
.prolistItem{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.prolistImg{
    width: 11em;
    height: 5.9em;
    border: 1px solid #ddd;
    margin: 0.5em;
    box-shadow: #999 0.09em 0.09em;
}
.checkbox{width: 2em;}
.pricecount,.procount{
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.pricecount span{
    width: 1.5em;
    text-align: center;
}
.protitle{
    display: block;
    width: 14em;
    height: 3em;
    line-height: 1.45em;
    font-size: 0.9em;
    color: black;
    overflow: hidden;
}
.proprice{
    color: #E63D59;
}
.propec{
    color: #999;
    font-size: 0.9em;
    margin-top: 0.4em;
}
/* 底部全选结算栏 */
.footmodule{
    width: 100%;
    position: fixed;
    background-color: #fff;
    bottom: 0;
    z-index: 999;
}
.leftcheckall{
    width: 75%;
    height: 3.4em;
    padding-left: 1em;
    border: 1px solid #ddd;
    background-color: #ddd;
}
.footmodule,.leftcheckall{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.leftcheckall .checkbox{
    width: 25%;
}
.footp{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: right;
    padding-right: 0.4em;
    width: 75%;
    height:3.5em;
}
.footp p:last-child{
    font-size: 0.9em;
    color: #999;
}
.rightbtn{
    width: 25%;
    height:3.5em;
    line-height: 3.5em;
    text-align: center;
    
}
.rightbtn button{
    width: 100%;
    height: 100%;
    background-color: #E63D59;
    color: #fff;
    outline: none;
    border: none;
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
.adressBox{
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 10%;
    padding: 0.5em;
    width: 100%;
}
.checkAdress{
    position: relative;
    left: -0.2em;
}
.adressBoxLeft{
    padding: 1em;
    width: 75%;
    font-size: 0.6em;
    line-height: 1.5em;
    border: 1px solid #888888;
    overflow: hidden;
    box-shadow: 2px 4px 3px #888888;
    border-radius: 0.5em;
}
.adressBoxright{
    padding: 1em 0 1em 0;
    text-align: center;
    margin: 1em;
    width: 15%;
    font-size: 0.8em;
    color: #fff;
    line-height: 1.5em;
    border-radius: 0.5em;
    box-shadow: 2px 4px 3px #888888;
    background-color: rgb(216, 182, 182);
    overflow: hidden;
}
</style>
