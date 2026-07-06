const mongoose=require("mongoose");
const academicSessionSchema=new mongoose.Schema(
    {
        sessionName:{
            type:String,
            unique:true,
            required:true,
            trim:true
        },
        startYear:{
            type:Number,
            required:true
        },
        endYear:{
            type:Number,
            reqired:true
        },
        isActive:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model("AcademicSession",academicSessionSchema);