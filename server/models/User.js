const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        enum:["student","teacher","admin"],
        required:true
    },
    phone:{
        type:String,
        default:""
    },
    profilePhoto:{
        type:String,
        default:""
    },
    isActive:{
        type:Boolean,
        default:true
    },
    rollNumber:{
        type:String,
        sparse:true,
        required: function () {
           return this.role === "student";
        },
        trim:true,
        sparse:true
    
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true
    },
    section: {
       type:mongoose.Schema.Types.ObjectId,
       ref: "Section",
       required:true
    },
    academicSession:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AcademicSession"
    },
    semester: {
         type: Number,
         required: function () {
              return this.role === "student";
        },
        min: 1,
        max: 8,
    },
    employeeId: {
         type: String,
         unique: true,
         sparse: true,
         trim: true,
         required: function () {
             return this.role === "teacher";
        },
    }
},
{
    timestamps:true
}
);
module.exports=mongoose.model("User",userSchema);