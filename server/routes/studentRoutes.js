const express = require("express");
const router = express.Router();

const { auth, isStudent } = require("../middleware/authMiddleware");

const {
  getDashboard,
  getProfile,
  getNotifications,
  markNotificationRead,
  getInternshipStatus,
  getAssignedTeacher
  
} = require("../controllers/studentController");

router.get(
  "/dashboard",
  auth,
  isStudent,
  getDashboard
);
router.get(
  "/profile",
  auth,
  isStudent,
  getProfile
);
router.get(
  "/notifications",
  auth,
  isStudent,
  getNotifications
);
router.put(
  "/notifications/:notificationId/read",
  auth,
  isStudent,
  markNotificationRead
);
router.get(
  "/internship-status",
  auth,
  isStudent,
  getInternshipStatus
);
router.get(
  "/teacher",
  auth,
  isStudent,
  getAssignedTeacher
);
module.exports = router;