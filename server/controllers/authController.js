const User=require("../models/User");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");



const registerUser=async(req,res)=>{
    try{
        const{name,email,password,role}=req.body;
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success:false,
                message:"User alreday Existed"
            });

        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await  bcrypt.hash(password,salt);
        const user= await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();


        res.status(201).json({
            success:true,
            message:"user registered successfully",
            user
        });
    }
    catch(err){
       res.status(500).json({
          success:false,
          message:err.message
       });
    }

};
// Login User
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

    
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

    
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
module.exports={registerUser,loginUser};