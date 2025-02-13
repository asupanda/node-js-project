const mongoose = require('mongoose');
const config = require('config');
const dbgr=require('debug')("development:mongoose-connection")//development phase mongoose se connection aa raha hai

mongoose.connect(`${config.get("MONGODB_URI")}/my-store`)
.then(function(){
    console.log("mongoose connected successfully");
dbgr("debugger connected successfully");
})
.catch(function(err){
    console.log(err)
})
module.exports=mongoose.connection;