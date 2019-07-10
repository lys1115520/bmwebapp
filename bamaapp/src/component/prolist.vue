<template>
    <div class="container">
        <div class="header">
            <mt-search
            @keyup.enter.native="loadpro3"
            v-model="value"
            cancel-text="取消"
            placeholder="搜索">
            </mt-search>
            <ul class="btnconditions">
                <li @click="choose(0)" :class="{active:num==0}">默认排序<span></span></li>
                <li @click="choose(1)" :class="{active:num==1}">销量</li>
                <li @click="choose(2)" :class="{active:num==2}">价格</li>
                <li  :class="{active:num==3}">筛选<span></span></li>
            </ul>
        </div>

        <div id="zhanwei"></div>
        <div class="prolist">
            <ul>
                <li v-for="(item,index) in list0" :key="index">
                    <div class="leftimg"><img :src="'http://127.0.0.1:3000/'+item.smpic" alt="" width="100%"></div>
                    <div class="righttext">
                        <p class="title">
                            <router-link :to="'/detail?lid='+item.lid">
                            {{item.titles}} </router-link>
                        </p>
                        <p class="youhui">
                            <span>￥{{item.price.toFixed(2)}}</span><strong>领劵</strong>
                        </p>
                        <p class="haoping">
                            <span>自营 </span>
                            <span> 好评100% </span>
                            <span> 销量 <strong>6</strong> </span>
                        </p>
                    </div>
                </li>

            </ul>
            <div v-show="listnum==0">
                <h1>没有更多了！</h1>
            </div>
            <div v-show="listnum==1" @click="loadpro()">
                <h1>点击加载更多！</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.loadpro();
        this.loadpro2();
    },
    data() {
        return {
            value:"铁观音",
            list0:[],
            pno:0,    //页码
            pageSize:4,//页大小
            listnum:1,
            num:1,
            n:0
        }
    },
    methods:{
        choose(index) {
            this.num = index;
            this.n = index;
            this.loadpro1(this.n);
            //console.log("aaa")
        },
        loadpro(){
            //1:获取当前页码加1
            this.pno++;
            //3:创建参数对象
            var egtitle=this.$route.query.egtitle;
            console.log(egtitle);
            var obj = {
                pno:this.pno,
                pageSize:this.pageSize,
                egtitle:egtitle};
            
            var url="prolist";
            this.axios.get(url,{params:obj}).then(result=>{
                //console.log(result.data);
                if(result.data.length==this.pageSize){
                    this.listnum=1
                }else{
                    this.listnum=0
                }
                var rows = this.list0.concat(result.data);
                this.list0 = rows;
            })
        },
        loadpro1(index){
            //创建参数对象
            var egtitle=this.$route.query.egtitle;
            var obj = {
                egtitle:egtitle,
                n:this.n};
            
            var url="prolist1";
            this.axios.get(url,{params:obj}).then(result=>{
                console.log(result.data);
                this.listnum=1
                this.list0=[];
                var rows = this.list0.concat(result.data);
                this.list0 = rows;
            })
        },
        loadpro2(){//模糊搜索
            var key=this.$route.query.key;
            //console.log(key)
            if(key!=undefined){
                var obj={key};
                var url="prolist2";
                this.axios.get(url,{params:obj}).then(result=>{
                    console.log(result.data);
                    this.listnum=1
                    this.list0=[];
                    var rows = this.list0.concat(result.data);
                    this.list0 = rows;
                })
            }    
        },
        loadpro3(){
            var key=this.value;
            console.log(key)
            var obj={key};
            var url="prolist2";
            this.axios.get(url,{params:obj}).then(result=>{
                console.log(result.data);
                this.listnum=1
                this.list0=[];
                var rows = this.list0.concat(result.data);
                this.list0 = rows;
            })
        },
    
    },//methods

}
</script>

<style scoped>
.header{
    position: fixed;
    z-index: 1;
    width: 100%;
}
.btnconditions{
    display: flex;
    align-items: center;
    background-color: aliceblue;
    padding: 0.3em;
    font-size: 0.95em;
    font-family: 'Courier New', Courier, monospace;
    z-index: 999;
}
.btnconditions li{
    width: 25%;
    height: 2.0em;
    line-height: 2.0em;
    border-right: 1px solid #999;
    text-align: center;
}
.btnconditions .active{
    border-bottom: 1px solid red;
    color: red;
}
.btnconditions li:last-child{
    border-right:none;
}
#zhanwei{
    height: 5em;
}
.prolist ul li{
    display: flex;
    justify-content: space-around;

    margin-top: 0.3em;
}
.prolist ul li .leftimg{
    width: 28%;
}
.prolist ul li .righttext{
    width: 65%;
    height: 6.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.righttext .haoping{
    display: flex;
    align-items: center
}
.righttext .title a{
    color: #0894ec;
    font-size: 0.85em;
}
.youhui span{
    color: red;
    font-size: 1.35em;
}
.youhui{
    height: 1.8em;
    line-height: 1.8em;
}
.youhui strong{
    display: inline-block;
    background-color: red;
    color: aliceblue;
    width: 3.5em;
    height: 90%;
    font-size: 0.7em;
    margin-left: 1.7em;
    margin-bottom: 0.2em;
    text-align: center;
    border-radius: 20%;
}
h1{
    width: 100%;
    margin-top: 2em;
    text-align: center;
}
.haoping{
    font-size: 0.9em;
    color: #999;
}
</style>
