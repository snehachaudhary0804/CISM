const express = require("express");
const router = express.Router();

const {
  auth,
  isTeacher,
} = require("../middleware/authMiddleware");

const {
    getDashboard,
    getProfile,
    getAssignedStudents,
    getNotifications,
    markNotificationRead,
    getStudentDetails,
} = require("../controllers/teacherController");

router.get("/dashboard", auth, isTeacher, getDashboard);

router.get("/profile", auth, isTeacher,getProfile);

router.get("/notifications", auth, isTeacher, getNotifications);

router.put(
  "/notifications/:notificationId/read",
  auth,
  isTeacher,
  markNotificationRead
);

router.get(
  "/students",
  auth,
  isTeacher,
  getAssignedStudents
);

router.get(
  "/student/:studentId",
  auth,
  isTeacher,
  getStudentDetails
);

module.exports = router;