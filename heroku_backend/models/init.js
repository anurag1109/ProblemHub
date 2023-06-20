const util=require('../util')
const mongoose=require('mongoose');
const userSchema=require("./user");
const problemSchema=require("./problems");
const problemTypesSchema=require('./problemTypes')
module.exports=function(){
    util.model.Users=mongoose.model("Users",userSchema);
    util.model.Problems=mongoose.model("Problems",problemSchema);
    util.model.ProblemsTypes=mongoose.model("ProblemTypes",problemTypesSchema)
}