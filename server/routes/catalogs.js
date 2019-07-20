let express = require('express')
let mongoose = require('mongoose')
let Catalog = require('../model/catalog')
let db = require('../db/db')
let router = express.Router()

//测试这个接口
router.get('/test',(req,res,next)=>{
    console.log("=========================")
    console.log(req.query.username);
    console.log("==========================");
    console.log(req.body)
    console.log(req.params)
    
    function send(){
        res.json({
            status:1,
            message:'success',
            result:''
        })
    }
    function err(mes){
        res.json({
            status:0,
            message:mes,
            result:""
        })
    }
    let p1 = new Promise((resolve,reject)=>{
        Catalog.create({
            "cname":"test"
        },(error,doc)=>{
           if(error){
               reject(error.message)
           }else{
               resolve();
           }
        })
    })
    p1.then(send)
    p1.catch(err)
})
//插入一个种类
router.post('/insert',(req,res,next)=>{
    // let cname = req.body.cname;
    let cname = req.body.cname
    console.log(cname)
    function send(){
        res.json({
            status:1,
            message:'success',
            result:''
        })
    }
    function err(mes){
        res.json({
            status:0,
            message:mes,
            result:""
        })
    }
    let p1 = new Promise((resolve,reject)=>{
        Catalog.create({
            "cname":cname
        },(error,doc)=>{
           if(error){
               reject(error.message)
           }else{
               resolve();
           }
        })
    })
    p1.then(send)
    p1.catch(err)
})
//查找所有的种类
router.get('/listall',(req,res,next)=>{
    function send(doc){
        res.json({
            status:1,
            message:'',
            result:doc
        })
    }
    function err(mes){
        res.json({
            status:0,
            message:mes,
            result:''
        })
    }
    let p1 = new Promise((resolve,reject)=>{
        Catalog.find({},(err,doc)=>{
            if(err){
                reject(err.message)
            }else{
                if(doc){
                    resolve(doc)
                }else{
                    reject("没有数据")
                }
            }
        })
    })
    p1.then(send)
    .catch(err)
})
//删除一个种类
router.post("/delete",(req,res,next)=>{
    let cname = req.body.cname;
    console.log(cname)
    function send(){
        res.json({
            status:1,
            message:'success',
            result:''
        })
    }
    function err(mes){
        res.json({
            status:0,
            message:mes,
            result:""
        })
    }
    let p1 = new Promise((resolve,reject)=>{
        Catalog.remove({
            "cname":cname
        },(error,doc)=>{
           if(error){
               reject(error.message)
           }else{
               resolve();
           }
        })
    })
    p1.then(send)
    p1.catch(err)
})
router.post('')
module.exports = router

