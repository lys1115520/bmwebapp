<template>
    <div class="container" @touchmove.prevent>
        <!-- 页头 -->
        <div class="header" v-show="2!=num">
            <img class="headerimg" src="../../../assets/image/common/loginuser.jpg" width="100%" alt="">
            <div class="userimg">
                <img src="../../../assets/image/common/user-pic.png" width="100%" alt="">
            </div>
            <div class="btnbox">
                <div @click="selected(0)">登 录<span></span></div>
                <div @click="selected(1)">注 册<span></span></div>
            </div>
        </div>
        <!-- 注册表单 -->
        <div id="form1" v-show="1 == num">
            <ul class="regbody formlist">
                <li>
                    <span>手机号码</span>
                    <input type="text" @blur="checkphone()" v-model="regphone" placeholder="输入手机号" ref='regphone'>
                </li>
                <li>
                    <span>图片验证</span>
                    <input type="text" placeholder="输入图片码" @blur=check(0) v-model="regtpm">
                    <span class="checkpic" @click="tupianma()" ref='tupianma'>2214</span>
                </li>
                <li>
                    <span>验证码</span>
                    <input type="text" placeholder="短信验证码" v-model="regdxm">
                    <span class="checknum">获取验证码</span>
                </li>
                <li>
                    <span>密码</span>
                    <input type="text" v-model="regupwd" placeholder="设置6位数字密码" @blur=check(1) ref='regupwd1'>
                </li>
                <li>
                    <span>确认密码</span>
                    <input type="text" placeholder="再次输入密码" @blur=check(2)
                    ref='regupwd2'>
                </li>
            </ul>
            <div class="agreecheckbox">
                <input type="checkbox" v-model="checked"> 同意 商城用户注册协议
            </div>
            <div class="subbox">
                <button class="regsub"  @click="regsubmit()" :disabled="!checked">注 册</button>
            </div>
        </div>
        
        <!-- 登录表单 -->
        <div v-show="0 == num">
            <ul class="logbody formlist">
                <li>
                    <span>用户名</span>
                    <input type="text" v-model="logphone" placeholder="账号/手机号">
                </li>
                <li>
                    <span>密码</span>
                    <input type="text" v-model="logupwd" placeholder="请输入密码">
                    <span><img src="#" alt=""></span>
                </li>
            </ul>
            <div class="forgetpwd">
                忘记密码？
            </div>
            <div class="subbox">
                <button class="logsub" @click="logsubmit()" > 登录 </button>
            </div>
        </div>
        <!-- 登录成功 -->
        <div v-show="2 == num">
            <div class="usermsg">
            个人中心
            <ul>
                <li>欢迎13968853090用户{{uid}}号</li>
                <li>物流信息</li>
                <li>我的收藏</li>
                <li>我的订单</li>
                <li @click="logOut()">退出登录</li>
                <li>设置</li>
            </ul>
            </div>
        </div>

    </div>    
</template>

<script>
export default {
    data() {
        return {
            num:0,
            regphone:"",
            regupwd:"",
            regtpm:"",
            regdxm:"",
            logphone:"",
            logupwd:"",
            checked:true,
            uid:"",

        }
    },
    created(){
        this.islogin();
    },
    methods: {
        selected(n) {//切换登录与注册 v-show
            this.num = n;
        },
        checkphone(){//验证手机号是否重名
            var phoneReg=new RegExp("^[0-9]{11}$","ig");
            var phone=this.regphone;
            if(phone !=""){
                if(!phoneReg.test(phone)){
                    phoneReg.lastIndex = 0;//重置正则初始位置
                    this.$toast("手机格式不正确");
                    this.regphone="";
                    this.$refs.regphone.focus();
                    return;
                }else{//验证格式正确发送验证是否重名
                    var url1 = "phone";
                    var obj = {phone:phone};
                    //7:并且获取服务器返回结果
                    this.axios.get(url1,{params:obj}).then(result=>{
                        if(result.data.length>0){
                            this.$toast("手机号已重复");
                            this.regphone="";
                            this.$refs.regphone.focus();
                            return;
                        }else{
                            this.$toast("手机号可注册");
                            return;
                        }
                    })
                }
            }
        },//验证手机号是否重名
        tupianma(){//点击切换图片验证码
            this.$refs.tupianma.innerHTML=Math.floor(Math.random()*10000);   
        },//点击切换图片验证码
        check(n){//验证手机和密码格式及图片码
            if(n==0){
                if(this.regtpm!=""){
                    if(this.$refs.tupianma.innerHTML!=this.regtpm){
                    this.$toast("图片码错误");
                    this.regtpm="";
                    return;
                    }
                } //图片码的验证  
            }else if(n==1){
                let upwdReg=new RegExp("^[0-9]{6}$","ig");
                let upwd=this.regupwd;
                if(upwd !=""){
                    if(!upwdReg.test(upwd)){
                        upwdReg.lastIndex = 0;//重置正则初始位置
                        this.$toast("密码格式不正确");
                        this.regupwd="";
                        this.$refs.regupwd1.focus();
                        return;
                    }
                };    
            }else if(n==2){
                if(this.$refs.regupwd2.value!=""){
                    if(this.$refs.regupwd2.value!=this.regupwd){
                        this.$toast("密码不一致");
                        this.$refs.regupwd2.value="";
                        this.$refs.regupwd2.focus();
                    }
                }
            }
        },//验证手机和密码格式及图片码
        regsubmit(){//注册
             if(this.regphone!=""
             &&this.regupwd!=""
             &&this.regtpm!=""
             &&this.regdxm!=""
             &&this.$refs.regupwd2.value!=""){
                var url = "reg";
                var phone=this.regphone;
                var upwd=this.regupwd;
                var obj = {
                    phone:phone,
                    upawd:upwd
                };
                 //处理字符串
                var qs=require("qs")
                obj=qs.stringify(obj)
                this.axios.post(url,obj).then(result=>{
                    console.log(result.data)
                    if(result.data.data.affectedRows>0){
                        this.$toast(`${result.data.msg},请登录`);
                        this.num=0;        
                        return;
                    }
                })
            } else {
                this.$toast("请输入完整信息");
            }
        },//注册
        logsubmit(){//登录
            if(this.logphone!=""
             &&this.logupwd!=""){
                var url = "log";
                var phone=this.logphone;
                var upwd=this.logupwd;
                var obj = {
                    phone:phone,
                    upawd:upwd
                };
                 //处理字符串
                var qs=require("qs")
                obj=qs.stringify(obj)
                this.axios.post(url,obj).then(result=>{
                    //console.log(result.data[0].uid)
                    if(result.data.length>0){
                        this.$toast(`登录成功`); 
                        localStorage.setItem("uid", `${result.data[0].uid}`);
                        this.uid=localStorage.getItem("uid");
                        this.num=2;
                        
                    }else{
                        this.$toast(`用户名或密码错误`);
                    }
                })
            }else{
                this.$toast("请输入完整信息");
            }
        },//登录
        islogin(){//是否登录
            var uid=localStorage.getItem("uid");
            //console.log(uid);
            if(!uid){
                this.num=0;
            }else{
                this.num=2;
            }
        },
        logOut(){//退出登录
            localStorage.removeItem("uid");
            this.num=0;
            this.logphone="",
            this.logupwd="",
            this.$router.push({path:'/bama'})
            window.location.reload();
        }


    },
    // watch:{
    //     $route(to,from){
    //   console.log(to) 
    //   this.active=to.query.key;}
    // },
}
</script>

<style scoped>
 .container{
    overflow: hidden;
} 
.header{
    width: 100%;
    height:11em;
}
.headerimg{
    position: relative;
}
.userimg{
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 6%;
    left: 40%;
    width:4em;
    height:4em;
    border-radius: 0.3em; 
}
.btnbox{
    width: 100%;
    position: fixed;
    display: flex;
    top: 17.4%;
    left: 0%;
    justify-content: space-around;
    align-items: center;
}
.btnbox>div{
    width: 50%;
    height: 3.0em;
    line-height: 3.0em;
    text-align: center;
    font-size: 1.2em;
    color: #fff;
}
/*注册表单部分*/
.regbody>li,.formlist>li{
    padding: 0.3em;
    display: flex;
    width: 100%;
    height: 3em;
    line-height: 3em;
    border-bottom: 0.4px solid #999;
}
.regbody>li>input,.formlist>li>input{
    width: 45%;
    height: 2.8em;
    outline: none;
    margin-top: 0.2em;
    overflow: hidden;
}
.regbody>li>span:first-child,.formlist>li>span:first-child{
    width: 25%;
    padding-right: 0.5em;
    text-align: right;
    color: #999;
}
.checknum{
    color: indianred;
    font-size: 0.8em;
    padding-left: 0.5em;
}
.checkpic{
    height: 100%;
    text-align: center;
    display: inline-block;
    width: 20%;
    background-image:url(../../../assets/image/common/yztu.jpg);
    overflow: hidden; 
}
.agreecheckbox{
    width: 100%;
    height: 4em;
    line-height: 4em;
    padding-left: 1em;
}
.regsub,.logsub{
    width: 90%;
    height: 3em;
    line-height: 3em;
    text-align: center;
    border-radius: 0.5em;
    background-color:#E63D59;
    color: #fff;
    margin: 0 auto;
    display: inline-block;
    outline: none;
    border: none;
}
.subbox{
    text-align: center;
}
/*登录表单部分*/ 
.forgetpwd{
    width: 100%;
    height: 4em;
    line-height: 4em;
    text-align: right;
    padding-right:1em;
    color: #999; 
}
.usermsg{
    font-size: 1.5em;
}
.usermsg>ul li{
    text-align: center;
    line-height: 1.5em;
    margin-top: 0.5em;
}
</style>

