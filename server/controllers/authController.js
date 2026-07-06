const User=require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken=require("../utils/generateToken");



const registerUser=async(req,res)=>{
    try{
        const{
            name,
            email,
            password,
            role,
            employeId,
            rollNumber,
            department,
            section,
            semester,
            academicSession}=req.body;
            
            

            if(!name||!password||!role){
                return res.status(400).json({
                    success:false,
                    message:"Name Password and Role are required."
                });
            }
            


            if(!["student","techer","admin"].includes(role)){
                return res.status(400).json({
                    success:false,
                    message:"Invalid Role"
                });
            }




            let exixtingUser;
            if(role==="student"){
                if(!rollNumber){
                     return res.status(400).json({
                          success:false,
                          message:"User alreday Existed with this Email"
                    });
                }
                 existingUser=await User.findOne({rollNumber});
            }
            else{
                if(!employeId){
                    return res.status(400).json({
                        success:false,
                        message:"EmployeeId is required."
                    });
                }
                 existingUser=await User.findOne({employeId});
            }
            if(existingUser){
                return res.status(400).json({
                    status:false,
                    message:"User already EXisted"
                });
            }


        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await  bcrypt.hash(password,salt);



        const user= await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            employeId,
            rollNumber,
            department,
            section,
            semester,
            academicSession
        });
        res.status(201).json({
            success:true,
            message:`${role} created successfully`,
            data:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                rollNumber:user.rollNumber,
                employeId:user.employeId
            }
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
             success:false,
             message:"Server Error"
       });
    }

};
// Login User
const loginUser = async (req, res) => {
    try {

        const { 
             password,
             role,
             rollNumber,
             employeId

         } = req.body;

        if(!role || !password){
            return res.status(400).json({
                success:false,
                message:"role and Password are required"
            });

        }
        let user ;
        if(!role==="student"){
            if(!rollNumber){
                 return res.status(400).json({
                    success:false,
                    message:"Roll number is required"
                 });
            }
                user=await User.findOne({rollNumber});
        }
        else if(role==="teacher" || role==="admin"){
            if(!employeId){
                return res.status(400).json({
                    success:false,
                    message:"EmployeId is required"
                });
            }
            user=await User.findOne({employeId});
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Invalid Role"
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if(user.role !=role){
            return res.status(401).json({
                success:false,
                message:"Invalid role"
            })
        }
    
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

    
        const token =generateToken(user._id);
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                rollNumber:user.rollNumber,
                employeId:user.employeId
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getProfile = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            user: req.user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
module.exports={registerUser,loginUser,getProfile};