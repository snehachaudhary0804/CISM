const User=require("../models/User");
const registerUser=async(req,res)=>{
    try{
        const{name,email,password,role}=req.body;
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"User alreday Existed"
            });

        }
        const user= await User.create({
            name,
            email,password,
            role
        });
        res.status(201).json({
            message:"user registered successfully",
            user
        });
    }
    catch(err){
       res.status(500).json({
          message:err.message
       });
    }

};
module.exports={registerUser};