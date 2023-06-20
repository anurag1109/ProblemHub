const mongoose = require('mongoose');
require('dotenv').config()  
module.exports= mongoose.connect(process.env.CONNECTION,
{ useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(!err){
        console.log("successfully connected")
    }
    else{
        console.log("error in database connection",err)
    }
})
