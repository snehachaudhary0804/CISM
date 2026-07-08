const express=require("express");
const router=express.Router();

const{registerUser,loginUser,getProfile,}=require("../controllers/authController");

const {auth,isAdmin,isTeacher,isStudent} = require("../middleware/authMiddleware");



router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",auth,getProfile);



router.get("/admin", auth,isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin!"
    });
});


router.get("/teacher", auth,isTeacher, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Teacher!"
    });
});


router.get("/student", auth,isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Student!"
    });
});

module.exports=router;