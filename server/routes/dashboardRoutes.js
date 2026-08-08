const express = require("express");

const router = express.Router();

const { auth, isAdmin } = require("../middleware/authMiddleware");

const { adminDashboard } = require("../controllers/dashboardController");

router.get("/admin", auth, isAdmin, adminDashboard);

module.exports = router;
