const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/authController");

const {
  auth,
  isAdmin,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");

router.post("/register", auth, isAdmin, registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getProfile);
router.patch("/profile", auth, updateProfile);
router.patch("/change-password", auth, changePassword);

router.get("/admin", auth, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin!",
  });
});

router.get("/teacher", auth, isTeacher, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Teacher!",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Student!",
  });
});

module.exports = router;
