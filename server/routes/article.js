let express = require('express')
let mongoose = require('mongoose')
let Article = require('../model/article')
let db = require('../db/db')
let router = express.Router()


//查找文章有多少
router.get('/size',(req,res,next)=>{
   Article.find({},(err,doc)=>{
       if(err){
           res.json({
               status:0,
               message:'',
               result:"查询语句错误"
           })
       }else{
           if(doc){
               let total = doc.length
               res.json({
                   status:1,
                   message:'返回成功',
                   total:total
               })
           }
       }
   })
})

//展示所有的文章
router.get('/listall',(req,res,next)=>{
    let p1 = new Promise((resolve,reject)=>{
        // Article.find({},(err,doc)=>{
        //     if(err){
        //         console.log("failure")
        //         reject(err)
        //     }else{
        //         resolve(doc)
        //     }
        // })
        let pageSize = req.query.pageSize
        let currentPage = req.query.currentPage
        let cname = req.query.cname
        // console.log(req);
        console.log(cname)
        let skip = (currentPage-1)*pageSize
        let params = {
        }
        if(cname){
            params = {
                catalog:cname
            }
        }
        console.log(params)
        // console.log(req)
        console.log(pageSize+"-----------"+currentPage)
        let article = Article.find(params).skip(skip).limit(parseInt(pageSize))
        article.exec((err,doc)=>{
            if (err) {
                console.log(err);
                reject()
            } else {
                resolve(doc)
            }
        })
    })
    async function listall(params) {
        let doc = await p1
        res.json({
            status:1,
            message:'',
            result:doc
        })
    }
    listall()
})
//插入一片文章
router.post('/insert',(req,res,next)=>{
    // "title":String,
    // "articleId":String,
    // "describle":String,
    // "catalog":String,
    // "content":String,
    // "publishtime":String,
    let title = req.body.title
    
    let p1 = new Promise((resolve,reject)=>{
        Article.findOne({'title':title},(err,doc)=>{
            if (err) {
                console.log("fialure")
                reject(err)
            } else {
                if (doc) {
                    console.log(doc);
                    console.log('错误')
                    reject()
                } else {
                    console.log('可以插入')
                    resolve()
                }
            }
        })
    })
    p1.then(()=>{
        let title = req.body.title
        let articleId = req.body.title
        let describle = req.body.describle
        let catalog = req.body.catalog
        let content = req.body.content
        let time = new Date();
        console.log(catalog)
        let year = time.getFullYear()
        let month = time.getMonth()+1
        let day = time.getDate()
        console.log("----------"+title)
        let publishtime = year+'--'+month+'--'+day
        let params= {
            title,
            articleId,
            describle,
            catalog,
            content,
            publishtime
        }
        Article.create(params,(err,doc)=>{
            if (err) {
                res.json({
                    status:0,
                    message:err,
                    result:'添加失败'
                })
            } else {
                res.json({
                    status:1,
                    message:'',
                    result:'添加成功'
                })
            }
        })
    }).catch(err=>{
        res.json({
            status:0,
            message:'',
            result:'文章已经存在了'
        })
    })
})
//删除文章
router.post("/delete",(req,res,next)=>{
    let title = req.body.title
    Article.remove({title},(err,doc)=>{
        if (err) {
            res.json({
                status:0,
                message:'',
                result:'删除失败'
            })
        }else{
            res.json({
                status:1,
                message:'',
                result:'删除成功'
            })
        }
    })
})
//查找一个单独的文章
router.post('/findeone',(req,res,next)=>{
    let title = req.body.title
    console.log(title)
    let p1 = new Promise((resolve,reject)=>{
        Article.findOne({title:title},(err,doc)=>{
            if(err){
                reject()
            }else{
                if(doc){
                    resolve(doc)
                }else{
                    reject()
                }
            }
        })
    })
    p1.then(doc=>{
        res.json({
            status:1,
            message:'',
            result:doc
        })
    }).catch((err)=>{
        res.json({
            status:0,
            message:'',
            result:'没有查找到数据'
        })
    })
})
module.exports =  router