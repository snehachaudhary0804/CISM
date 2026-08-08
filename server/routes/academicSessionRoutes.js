const express = require("express");
const router = express.Router();

const {
  createAcademicSession,
  getAllAcademicSessions,
  getAcademicSessionById,
  updateAcademicSession,
  deleteAcademicSession,
} = require("../controllers/academicSessionController");

const { auth, isAdmin } = require("../middleware/authMiddleware");

// Create Academic Session (Admin Only)
router.post("/", auth, isAdmin, createAcademicSession);
router.get("/", getAllAcademicSessions);
router.get("/:id", getAcademicSessionById);
router.put("/:id", auth, isAdmin, updateAcademicSession);
router.delete("/:id", auth, isAdmin, deleteAcademicSession);
module.exports = router;
