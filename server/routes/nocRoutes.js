const express = require("express");
const router = express.Router();

const {
    createNOC,
    getAllNOCs,
    getNOCById,
    issueNOC,
    deleteNOC
} = require("../controllers/nocController");

const {
    auth,
    isAdmin
} = require("../middleware/authMiddleware");

// Create NOC
router.post("/", auth, isAdmin, createNOC);

// Get All NOCs
router.get("/", auth, getAllNOCs);

// Get NOC By ID
router.get("/:id", auth, getNOCById);

// Issue NOC
router.put("/:id/issue", auth, isAdmin, issueNOC);

// Delete NOC
router.delete("/:id", auth, isAdmin, deleteNOC);

module.exports = router;