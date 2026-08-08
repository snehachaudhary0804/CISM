const express = require("express");
const router = express.Router();

const {
  createDomain,
  getAllDomains,
  getDomainById,
  updateDomain,
  deleteDomain,
} = require("../controllers/domainController");

const { auth, isAdmin } = require("../middleware/authMiddleware");

// Admin Routes
router.post("/", auth, isAdmin, createDomain);
router.put("/:id", auth, isAdmin, updateDomain);
router.delete("/:id", auth, isAdmin, deleteDomain);

// Common Routes (Logged-in Users)
router.get("/", auth, getAllDomains);
router.get("/:id", auth, getDomainById);

module.exports = router;
