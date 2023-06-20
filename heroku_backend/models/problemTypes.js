const mongoose=require('mongoose');

module.exports=new mongoose.Schema({
        title:{
            type:String,
            required:true,
            unique:true
        },
        value:{
            type:String,
            required:true,
            unique:true
        },
        picture:{
            type:String,
        }
},{ timestamps: true })