const mongoose=require('mongoose');
const studentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true  
      },
    enrollment:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        required:true

    },
    phone:{
        type:String
    }
},
{
    timestamps:true
});
module.exports=mongoose.model('Student',studentSchema);