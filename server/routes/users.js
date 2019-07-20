var express = require('express');
var router = express.Router();
let mongoose = require("../db/db")
let multiparty = require('multiparty')


mongoose
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//测试这一个用户是不是可以
router.post('/pic',(req,res,next)=>{
  let form = new multiparty.Form()
  form.uploadDir = '../vueblog/static'
  form.keepExtensions = true
  form.maxFieldsSize = 2*1024*1024
  form.maxfilesSize = 5*1024*1024
  console.log('图片上传第一步')
  form.parse(req,(err,fields,files)=>{
    if(err){
      console.log(err.message)
    }
    else{
      console.log(fields)
      console.log(files)
      let name = files.file[0].originalFilename
      let oldpath = files.file[0].path
      let newpath = '../vueblog/static/'+name
      console.log(newpath)
      let fs = require('fs')
      fs.renameSync(oldpath,newpath)
    }
    
  })
})

// 注册一个页面
router.post("/register",(req,res,doc)=>{
  let User = require('../model/user')
  let userId = req.body.userId,age = req.body.age,username = req.body.username
  let article = req.body.article,birth =  req.body.birth,password = req.body.password
  console.log(userId+"--"+age+"--"+username+"--"+article+"--"+birth)
  function errsend(err){
    res.json({
      status:0,
      message:err,
      result:''
    })
  }
  function send(){
    if(doc){
      res.json({
        status:1,
        message:'',
        result:''
      })
    }
  }
  let user = {
    userId,
    password,
    username,
    age,
    article,
    birth,
    
  }
  let r1 = new Promise((resolve,reject)=>{
    User.create(user,(err,doc)=>{
      if(err){
        reject(err.message)
      }else{
        resolve()
      }
    })
  })
  r1.then(send)
  r1.catch(errsend)
})

//更新用户的数据
router.post('/updateuser',(req,res,next)=>{
  let User = require('../model/user')
  console.log(req.body)
  let userId = req.body.userId
  let age = req.body.age,birth = req.body.birth,username = req.body.username
  let article = req.body.article
  console.log(userId)
  let r1 = new Promise((resolve,reject)=>{
    User.updateMany({
      "userId":userId
    },{
      "age":age,
      "birth":birth,
      "username":username,
      "article":article
    },(err,doc)=>{
      if(err){
        reject(err)
      }else{
        resolve(doc)
      }
    })
  })
  function errsend(err){
    res.json({
      status:0,
      message:err,
      result:''
    })
  }
  function send(doc){
    if(doc){
      res.json({
        status:1,
        message:'',
        result:''
      })
    }
  }
  r1.then(send)
  r1.catch(errsend)
})
//删除一个用户
router.post('/deleteone',(req,res,next)=>{
  let User = require("../model/user")
  let userId = req.body.userId
  console.log(userId)
  function errsend(err){
    res.json({
      status:0,
      message:err,
      result:''
    })
  }
  function send(){
    
      res.json({
        status:1,
        message:'',
        result:''
      })
  }
  let r1 = new Promise((resolve,reject)=>{
    User.remove({userId},(err,doc)=>{
      if(err){
        reject(err.message)
      }else{
        resolve()
      }
    })
  })
  r1.then(send)
  r1.catch(errsend)
})
//获取一个用户
router.get("/getoneuser",(req,res,next)=>{
  let User = require("../model/user")
  function send(doc){
    if(doc){
      res.json({
      status:1,
      message:'',
      result:doc
    })
    }else{
      res.json({
        status:0,
        message:'',
        result:'没有这个用户'
      })
    }
  }
  function errsend (err){
    res.json({
      status:0,
      message:err,
      result:''
    })
  }
  let userId = req.query.userId
  console.log(userId)
  let r1 = new Promise((resolve,reject)=>{
    User.findOne({
      userId:userId
    },(err,doc)=>{
      if(err){
        reject(err.message)
      }else{
        resolve(doc)
      }
    })
  })
  r1.then(send)
  r1.catch(errsend)
})
//用户展示
router.get("/listuser",(req,res,next)=>{
  let User = require("../model/user")
  function send(doc){
    res.json({
      status:1,
      message:'',
      result:doc
    })
  }
  function errsend (err){
    res.json({
      status:0,
      message:'',
      result:err
    })
  }
  let r1 = new Promise((resolve,reject)=>{
    User.find({},(err,doc)=>{
      if(err){
        reject(err)
      }else{
        resolve(doc)
      }
    })
  })
  r1.then(send)
  r1.catch(errsend)
})

// 测试拿到用户数据组
router.get("/test",(req,res,next)=>{
  let User  = require("../model/user")
  let params = {
    "userId":'user'
  }
  function errorsend(err){
    res.json({
      status:0,
      message:err,
      result:''
    })
  }
  function send(doc){
    res.json({
      status:'1',
      message:'',
      result:doc
    })
  }
  let p = new Promise((resolve,reject)=>{
    User.find(params,(err,doc)=>{
      if(err){
        reject(err.message)
      }else{
        resolve(doc)
      }
    })
  })
  p.then(send)
  p.catch(errorsend)
})

//将测试的用户转化成一个Promise
// let r1 = new Promise((resolve,reject)=>{
//   router.get('/test',(req,res,next)=>{
//     let User = require('../model/user')
//     let params={
//       userId:'user'
//     }
//     User.findOne(params,(error,doc)=>{
//       if(error){
//         reject(res.json({
//           status:0,
//           message:error.message,
//           result:''
//         }))
//       }else{
//         resolve(res.json({
//           status:1,
//           message:'',
//           result:doc
//         }))
//       }
//     })
//   })
// })

//测试可不可以找到一个用户
// router.get('/test',(req,res,next)=>{
//   let User = require('../model/user')
//   let params={
//     userId:'user'
//   }
//   User.find(params,(error,doc)=>{
//     if(error){
//       res.json({
//         status:0,
//         message:error.message,
//         result:''
//       })
//     }else{
//       if(doc){
//         res.json({
//           status:1,
//           message:'',
//           result:doc
//         })
//       }else{
//         res.json({
//           status:0,
//           message:'没有找到用户',
//           result:''
//         })
//       }
//     }
//   })
// })
module.exports = router;
