const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");

const {
  auth,
  isAdmin,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");

// Test Route
router.get("/test", (req, res) => {
  res.send("Department Route Working");
});

// Create Department
router.post("/", auth, isAdmin, createDepartment);

// Get All Departments
router.get("/", auth, getDepartments);

router.get("/:id", auth, getDepartmentById);

router.put("/:id", auth, isAdmin, updateDepartment);

router.delete("/:id", auth, isAdmin, deleteDepartment);

module.exports = router;
