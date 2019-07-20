let mongoose = require("mongoose")

let CatalogSchema = mongoose.Schema({
    "cname":String
    
})

module.exports=mongoose.model("Catalog",CatalogSchema,"catalogs")