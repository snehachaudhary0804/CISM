const express = require("express");

const router = express.Router();

const {
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
  uploadOfferLetter,
  uploadCompletionDocument,
} = require("../controllers/internshipController");
const upload = require("../middleware/upload");
const {
  auth,
  isAdmin,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");


// Admin
router.post("/", auth, isStudent, createInternships);

router.get("/", auth, isAdmin, getAllInternships);

router.delete("/:id", auth, isAdmin, deleteInternship);

router.put("/:id", auth, isAdmin, updateInternship);

router.put("/assign-teacher/:internshipId", auth, isAdmin, assignTeacher);

router.put("/noc/:internshipId", auth, isAdmin, updateNOCStatus);

router.get("/pending-noc", auth, isAdmin, getPendingNOCRequests);

// Teacher
router.put("/teacher-review/:internshipId", auth, isTeacher, teacherReview);

router.get("/teacher/internships", auth, isTeacher, getTeacherInternships);

// Student
router.get("/my-internship", auth, isStudent, getStudentInternships);

router.patch(
  "/:internshipId/offer-letter",
  auth,
  isStudent,
  upload.single("offerLetter"),
  uploadOfferLetter,
);
router.patch(
  "/:internshipId/completion-document",
  auth,
  isStudent,
  upload.single("file"),
  uploadCompletionDocument,
);
// Common
router.get("/:id", auth, getInternshipById);

module.exports = router;
