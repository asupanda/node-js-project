const mongoose = require('mongoose');
const productSchema=mongoose.Schema({
    name: {
        type: String,
    },
    bgcolor: {
        type: String,
    },
    panelcolor:String,
    textcolor:String,
    discount:{
        type:Number,
        default:0
    },
    price: Number,
    image: Buffer
});
module.exports=mongoose.model("Product",productSchema);