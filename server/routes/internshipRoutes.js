const express = require("express");

const router = express.Router();

const {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  assignTeacher,
  updateNOCStatus,
  teacherReview,
  submitCompletion,
  getStudentInternships,
  getTeacherInternships,
  getPendingNOCRequests,
  createInternships,
} = require("../controllers/internshipController");

const {
  auth,
  isAdmin,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");

// Admin
router.post("/",auth, isStudent, createInternships);

router.get("/", auth, isAdmin, getAllInternships);

router.delete("/:id", auth, isAdmin, deleteInternship);

router.put("/:id", auth, isAdmin, updateInternship);

router.put(
  "/assign-teacher/:internshipId",
   auth,
  isAdmin,
  assignTeacher
);

router.put(
  "/noc/:internshipId",
  auth,
  isAdmin,
  updateNOCStatus
);

router.get(
  "/pending-noc",
  auth,
  isAdmin,
  getPendingNOCRequests
);

// Teacher
router.put(
  "/teacher-review/:internshipId",
  auth,
  isTeacher,
  teacherReview
);

router.get(
  "/teacher/internships",
  auth,
  isTeacher,
  getTeacherInternships
);

// Student
router.get(
  "/my-internship",
  auth,
  isStudent,
  getStudentInternships
);

router.put(
  "/completion/:internshipId",
  auth,
  isStudent,
  submitCompletion
);

// Common
router.get("/:id", auth, getInternshipById);

module.exports = router;