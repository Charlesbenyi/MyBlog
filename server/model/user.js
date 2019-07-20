let mongoose = require ('mongoose')

let Userschema = mongoose.Schema({
    "userId":String,
    "age":Number,
    "birth":String,
    "username":String,
    "article":String,
    "password":String
})

module.exports = mongoose.model("User",Userschema,"users")