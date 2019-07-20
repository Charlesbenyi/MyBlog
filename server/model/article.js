let mongoose = require('mongoose')

let articleSchema = mongoose.Schema({
    "title":String,
    "articleId":String,
    "describle":String,
    "catalog":String,
    "content":String,
    "publishtime":String,
    "comments":[{
        "date":String,
        "username":String,
        "comment":String
    }]
})

module.exports = mongoose.model("Article",articleSchema,"articles")