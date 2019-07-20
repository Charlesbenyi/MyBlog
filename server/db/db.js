
let mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/blog")

mongoose.connection.on("connected",()=>{
    console.log("mongoose连接成功")
})

mongoose.connection.on("error",()=>{
    console.log("mongoose发生错误")
})

mongoose.connection.on("disconnected",()=>{
    console.log("mongoose连接已经断开！")
})

module.exports = mongoose
