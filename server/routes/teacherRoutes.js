const express = require("express");
const router = express.Router();

const { auth, isTeacher } = require("../middleware/authMiddleware");

const {
  getDashboard,
  getProfile,
  getAssignedStudents,
  getStudentDetails,
  approveInternship,
  rejectInternship,
  getTeacherInternships,
  approveCompletion,
  rejectCompletion,
} = require("../controllers/teacherController");

router.get("/dashboard", auth, isTeacher, getDashboard);

router.get("/profile", auth, isTeacher, getProfile);

router.get("/students", auth, isTeacher, getAssignedStudents);

router.get("/student/:studentId", auth, isTeacher, getStudentDetails);
router.patch(
  "/review/:internshipId/approve",
  auth,
  isTeacher,
  approveCompletion,
);

router.patch("/review/:internshipId/reject", auth, isTeacher, rejectCompletion);
router.get("/internships", auth, isTeacher, getTeacherInternships);

module.exports = router;
