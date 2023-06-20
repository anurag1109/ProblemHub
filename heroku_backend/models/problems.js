const mongoose=require('mongoose');
Schema=mongoose.Schema;
module.exports=new mongoose.Schema({
        user_id:{
            type: Schema.Types.ObjectId, ref: 'Users',
            required:true
        },
        title:{
          type:String,
          required:true
        },
        question:{
            type:String,
        },
        answer:{
            type:String,
        },
        type_id:{
            type:mongoose.Schema.Types.ObjectId, ref:'ProblemTypes',
            required:true
        }
},{ timestamps: true }).index({title:1,question:1,answer:1})