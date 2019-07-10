//app.js node.js 服务器
//1:第三方模块 
//  express          web服务器
//  cors             跨域
//  express-session  session
//  body-parser      处理post数据
//  multer           上传文件
//  fs               文件操作(内置)
//  mysql            mysql驱动模块 
//下载指令:联网 
//npm i express-session body-parser //multer mysql express cors
//1:引入二个模块  express mysql
const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
//2:创建连接池

var pool = mysql.createPool({
  host:"127.0.0.1",
  user:"root",
  password:"",
  port:3306,
  database:"bamaphone",
  connectionLimit:15
})
//3:创建express对象
var server = express();
server.use(bodyParser.urlencoded({extended:false}));
//4:指定静态目录
server.use(express.static("public"))
//5:处理跨域请求
const cors = require("cors");
server.use(cors({
  origin:["http://127.0.0.1:8080",
  "http://localhost:8080"],
  credentials:true
}));
//6:添加session功能
const session = require("express-session");
server.use(session({
  secret:"128位字符串",
  resave:true,
  saveUninitialized:true
}));
//9:绑定监听端口
server.listen(3000);

//功能一：首页商品的加载；
server.get("/index",(req,res)=>{
  var output={bkcl:[],szz:[]};
  var sq1=`select * from bmphone_index where feileiname=?`;
  var sq2=`select * from bmphone_index where feileiname=?`;
  pool.query(sq1,['bkcl'],(err,result)=>{
    if(err) console.log(err);
      //console.log(result);   
    output.bkcl=result;
    pool.query(sq2,['szz'],(err,result)=>{
      if(err) console.log(err);
      output.szz=result;
      res.send(output);
    })
  })
});
//功能二；分类列表页的商品加载res.send(output);
server.get("/fenleilist",(req,res)=>{
  var fenlei=[[],[],[],[],[],[],[],[]];
  var sq1=`select * from fenleilist where egtitle=?`;
  pool.query(sq1,['wlc'],(err,result)=>{
    if(err) console.log(err);
      //console.log(result);   
      fenlei[0]=result;
    pool.query(sq1,['hc'],(err,result)=>{
      if(err) console.log(err);
      fenlei[1]=result;
      pool.query(sq1,['lc'],(err,result)=>{
        if(err) console.log(err);
        fenlei[2]=result;
        pool.query(sq1,['heij'],(err,result)=>{
          if(err) console.log(err);
          fenlei[3]=result;
          pool.query(sq1,['bc'],(err,result)=>{
            if(err) console.log(err);
            fenlei[4]=result;
            pool.query(sq1,['huac'],(err,result)=>{
              if(err) console.log(err);
              fenlei[5]=result;
              pool.query(sq1,['csp'],(err,result)=>{
                if(err) console.log(err);
                fenlei[6]=result;
                pool.query(sq1,['cj'],(err,result)=>{
                  if(err) console.log(err);
                  fenlei[7]=result;
                  res.send(fenlei);
                })
              })
            })
          })
        })
      })
    })
  })
});
//功能三 产品列表查询功能
server.get("/prolist",(req,res)=>{
  var egtitle=req.query.egtitle;
  var pno = req.query.pno;
  var ps = req.query.pageSize;
  //2:默认值 
  if(!pno){pno=1}
  if(!ps){ps=4}
  var offset = (pno-1)*ps;
      ps = parseInt(ps);
      //console.log(egtitle)
  var all=` where egtitle=? LIMIT ?,?`;
  var sql1=`select*from bm_product_details`;
      sql1+=all;
  pool.query(sql1,[egtitle,offset,ps],(err,result)=>{
    if (err) console.log(err);
    //console.log(result)
    res.send(result);
  });
});
//功能四 条件搜索
server.get("/prolist1",(req,res)=>{
  var egtitle=req.query.egtitle;
  var n = req.query.n;
  //console.log(n)
  
  var all2=` ORDER BY price ASC`;
  var all3=` ORDER BY price DESC`;
  var sql1=`select*from bm_product_details where egtitle=?`;
      if(n==0){
        sql1+=all2;
      }else if(n==1){
        sql1+=all3;
      }else{
        sql1+=all2;
      }
  pool.query(sql1,[egtitle],(err,result)=>{
    if (err) console.log(err);
    //console.log(result)
    res.send(result);
  });
});

//五 模糊查询SELECT * FROM emp WHERE ename LIKE '%e%';
server.get("/prolist2",(req,res)=>{
  var key=req.query.key;
  //console.log(key)
  var sql1=`select*from bm_product_details where titles LIKE concat('%',?,'%')`;
  pool.query(sql1,[key],(err,result)=>{
    if (err) console.log(err);
       //console.log(result)
    res.send(result);
  });
});

//功能六  商品详情
server.get("/details",(req,res)=>{
  var lid=req.query.lid;
  var output={product:{},pics:[],dtlpics:[]};
  if(lid!==undefined){
    var sql1=`select * from bm_product_details where lid=?`;
    pool.query(sql1,[lid],(err,result)=>{
      if(err) console.log(err);
        //console.log(result);    
      output.product=result[0];
      
      var sql2=`select * from bm_main_pics where lid=?`;
      pool.query(sql2,[lid],(err,result)=>{
        //console.log(result);
        if(err) console.log(err);   
        output.pics=result; 

        var sql3=`select * from bm_details_pics where lid=?`;
        pool.query(sql3,[lid],(err,result)=>{
          if(err) console.log(err);   
          output.dtlpics=result;
          res.send(output);
          //console.log(output)
        })    
      });
    })
  }else{
    res.send(output);
  }
});
//七 用户的用户名重复查询
server.get("/phone",(req,res)=>{
  var phone=req.query.phone;
  var sql1=`select * from bm_user where phone=?`;
  pool.query(sql1,[phone],(err,result)=>{
    if (err) console.log(err);
    if(result.length>0){//有用户名重复
			res.send(result);
			//console.log(result)
      return;
    }else{
      res.send(result);
    }
  });
});

//八 用户的注册功能`uid`, `uname`, `upawd`, `phone`
server.post("/reg",(req,res)=>{
  var $upwd=req.body.upawd;
  var $phone=req.body.phone;
  console.log($upwd)
  console.log($phone)
  var sql2="INSERT INTO bm_user SET phone=?, upawd=?";
  var sql1=`select * from bm_user where phone=?`;
  pool.query(sql1,[$phone],(err,result)=>{
    if (err) console.log(err);
    if(result.length>0){//有用户名重复
			//res.send(result);
			//console.log(result)
      return;
    }else{
      pool.query(sql2,[$phone,$upwd],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
          res.send({code:200,msg:'注册成功',data:result});
          console.log("注册成功");
        }else{
          res.send({code:200,msg:'注册失败',data:result});
          console.log("注册失败");
        }
      });
    }
  });


  
});
//九 用户的登录
server.post("/log",(req,res)=>{
  var $upwd=req.body.upawd;
  var $phone=req.body.phone;
  console.log($upwd)
  console.log($phone)
  var sql2="select * from bm_user where phone=? and upawd=?";
  pool.query(sql2,[$phone,$upwd],(err,result)=>{
      if(err) throw err;
      console.log(result);
      if(result.length>0){
        req.session.uid = result[0].uid; 
        res.send(result);
      }else{
        res.send(result);
      }
      
  });
});
//十 加入购物车
server.get("/addcart",(req,res)=>{
  var lid=req.query.lid;
  var uid=req.query.uid;
  var pic=req.query.pic;
  var titles=req.query.titles;
  var price=req.query.price;
  var lcount=req.query.lcount;
    var sql1=`select * from bm_cart where lid=? and uid=?`;
    pool.query(sql1,[lid,uid],(err,result)=>{
        if(err) console.log(err);
         //是否重复 
        if(result.length>0){
            res.send(result)
            //console.log(result); 
        }else{
            var sql2=`INSERT INTO bm_cart VALUES (null,?,?,?,?,?,?)`;
            pool.query(sql2,[lid,uid,titles,price,pic,lcount],(err,result)=>{
                if(err)console.log(err);
                //console.log(result.affectedRows);//.affectedRows
                res.send(result)
            });
        }
    })
})
// 11 购物车列表
server.get("/cart",(req,res)=>{
  var uid=req.query.uid;
    var sql1=`select lid,titles,price,pic,lcount from bm_cart where uid=?`;
    pool.query(sql1,[uid],(err,result)=>{
        if(err) console.log(err);  
        if(result.length>0){
            res.send(result)
            //console.log(result); 
        }else{
            res.send(result)
            //console.log(result);
        }
    })
})
//12 删除购物车指定的商品select * from bm_cart where lid=?
server.get("/del",(req,res)=>{
  //参数:lid
  var lid = req.query.lid;
  //sql:
  var sql = "DELETE FROM bm_cart WHERE lid = ?";
  //json
  pool.query(sql,[lid],(err,result)=>{
     if(err)throw err;
     //console.log(result);
     res.send({code:1,msg:"删除成功"})
  })
})


