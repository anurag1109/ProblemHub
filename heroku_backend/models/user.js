const mongoose=require('mongoose');

module.exports=new mongoose.Schema({
        username:{
            type:String,
            required:[true,'username is requird'],
            unique:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
          type:String
        },
        email:{
            type:String,
            required:[true,"email is required"],
            unique:true
        },
        role:{
            type:String,
            enum:["super_admin","admin","user"],
            default:"user"
        },
        password:{
            salt:{
                type:String,
                required:true,
            },
            hashedPassword:{
                type:String,
                required:true,
            },
            varificationCode:{
                type:Number
            },
        },
        dateOfBirth:{
            type:Date,
            // required:true,
            trim: true,
        },
        status:{
            type:String,
            enum:["Active","Inactive"],
            default:"Inactive"
        },
        picture:{
            type:String,
        }
},{ timestamps: true }).index({username:1,firstName:1,lastName:1,email:1})