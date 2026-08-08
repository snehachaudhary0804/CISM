const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  approveInternship,
  rejectInternship,
  getAllInternships,
  completeInternship,
} = require("../controllers/adminController");
const { adminDashboard } = require("../controllers/dashboardController");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.get("/dashboard", auth, isAdmin, adminDashboard);
router.get("/students", auth, isAdmin, getAllStudents);
router.get("/student/:id", auth, isAdmin, getStudentById);
router.put("/student/:id", auth, isAdmin, updateStudent);
router.delete("/student/:id", auth, isAdmin, deleteStudent);

router.get("/teachers", auth, isAdmin, getAllTeachers);
router.get("/teacher/:id", auth, isAdmin, getTeacherById);
router.put("/teacher/:id", auth, isAdmin, updateTeacher);
router.delete("/teacher/:id", auth, isAdmin, deleteTeacher);

// Internship Management
router.get("/internships", auth, isAdmin, getAllInternships);

router.patch(
  "/internships/:internshipId/approve",
  auth,
  isAdmin,
  approveInternship,
);

router.patch(
  "/internships/:internshipId/reject",
  auth,
  isAdmin,
  rejectInternship,
);
router.put(
  "/internship/:internshipId/complete",
  auth,
  isAdmin,
  completeInternship,
);

module.exports = router;
