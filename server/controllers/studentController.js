const Student=require("../models/Student")
const createStudent=async(req,res)=>{
    try{
        const existingStudent = await Student.findOne({
             user: req.user._id,
        
        });

        if (existingStudent) {
             return res.status(400).json({
             message: "Student profile already exists.",
            });
        }
        const student=await Student.create({
            user:req.user._id,
            enrollment:req.body.enrollment,
            course:req.body.course,
            semester:req.body.semester,
            phone:req.body.phone
        });
        res.status(201).json(student)
    }
    catch(err){
           res.status(500).json({
            message:err.message
           });
    }
};
module.exports={createStudent};