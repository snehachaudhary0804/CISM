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
            employeeId,
            rollNumber,
            department,
            section,
            semester,
            academicSession}=req.body;
            
            

            if(!name||!password||!role||!email){
                return res.status(400).json({
                    success:false,
                    message:"Name, Password, Role and Email are required."
                });
            }
            


            if(!["student","teacher","admin"].includes(role)){
                return res.status(400).json({
                    success:false,
                    message:"Invalid Role"
                });
            }
            
            const emailExists = await User.findOne({ email });

           if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists."
                });
            }

            
            let existingUser;
            if(role==="student"){
                if(!rollNumber){
                     return res.status(400).json({
                          success:false,
                          message:"RollNumber is required"
                    });
                }
                 existingUser=await User.findOne({rollNumber});
            }
            else{
                if(!employeeId){
                    return res.status(400).json({
                        success:false,
                        message:"EmployeeId is required."
                    });
                }
                 existingUser=await User.findOne({employeeId});
            }
            if(existingUser){
                return res.status(400).json({
                    success:false,
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
            employeeId,
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
                employeeId:user.employeeId
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

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        // Find User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Generate JWT
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                profilePhoto: user.profilePhoto
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