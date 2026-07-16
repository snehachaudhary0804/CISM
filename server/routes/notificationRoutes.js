const express = require("express");
const router = express.Router();

const {
    createNotification,
    getAllNotifications,
    getMyNotifications,
    markAsRead,
    deleteNotification
} = require("../controllers/notificationController");

const {
    auth,
    isAdmin
} = require("../middleware/authMiddleware");

// Create Notification
router.post("/", auth, isAdmin, createNotification);

// Get All Notifications (Admin)
router.get("/", auth, isAdmin, getAllNotifications);

// Get Logged-in User Notifications
router.get("/my", auth, getMyNotifications);

// Mark Notification as Read
router.put("/:id/read", auth, markAsRead);

// Delete Notification
router.delete("/:id", auth, deleteNotification);

module.exports = router;