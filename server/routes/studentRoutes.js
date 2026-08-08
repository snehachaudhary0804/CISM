const express = require("express");
const router = express.Router();

const { auth, isStudent } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  getDashboard,
  getProfile,
  markNotificationRead,
  getInternshipStatus,
  getAssignedTeacher,
  uploadCompletionDocuments,
} = require("../controllers/studentController");

router.get("/dashboard", auth, isStudent, getDashboard);
router.get("/profile", auth, isStudent, getProfile);
router.get("/internship-status", auth, isStudent, getInternshipStatus);
router.get("/teacher", auth, isStudent, getAssignedTeacher);

router.post(
  "/completion/:internshipId",
  auth,
  isStudent,
  upload.fields([
    {
      name: "report",
      maxCount: 1,
    },
    {
      name: "certificate",
      maxCount: 1,
    },
    {
      name: "ppt",
      maxCount: 1,
    },
  ]),
  uploadCompletionDocuments,
);
module.exports = router;
