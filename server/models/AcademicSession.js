const mongoose=require("mongoose");
const academicSessionSchema=new mongoose.Schema(
    {
        sessionName:{
            type:String,
            unique:true,
            required:true,
            trim:true
        },
        startDate:{
            type:Date,
            required:true
        },
        endDate:{
            type:Date,
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