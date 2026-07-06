const express = require("express");
const router = express.Router();

const {
    createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} = require("../controllers/departmentController");

// Test Route
router.get("/test", (req, res) => {
    res.send("Department Route Working");
});

// Create Department
router.post("/", createDepartment);

// Get All Departments


module.exports = router;