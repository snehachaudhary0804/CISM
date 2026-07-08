const express = require("express");
const router = express.Router();

const {
    createSection,
    getAllSections,
    getSectionById,
    updateSection,
    deleteSection
} = require("../controllers/sectionController");

const {
    auth,
    isAdmin
} = require("../middleware/authMiddleware");

// Create Section
router.post("/", auth, isAdmin, createSection);

// Get All Sections
router.get("/", auth, getAllSections);

// Get Section By ID
router.get("/:id", auth, getSectionById);

// Update Section
router.put("/:id", auth, isAdmin, updateSection);

// Delete Section
router.delete("/:id", auth, isAdmin, deleteSection);

module.exports = router;