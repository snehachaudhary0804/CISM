const express=require("express");
const router=express.Router();

const{registerUser,loginUser,getProfile}=require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");



router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getProfile);



router.get("/admin", protect, authorize("admin"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin!"
    });
});


router.get("/teacher", protect, authorize("teacher"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Teacher!"
    });
});


router.get("/student", protect, authorize(""), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Student!"
    });
});

module.exports=router;