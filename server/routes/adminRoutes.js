const express = require("express");
const router = express.Router();

const { 
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    assignTeacher
} = require("../controllers/adminController");

const { auth, isAdmin } = require("../middleware/authMiddleware");


router.get(
  "/students",
  auth,
  isAdmin,
  getAllStudents
);
router.get(
  "/student/:id",
  auth,
  isAdmin,
  getStudentById
);
router.put(
  "/student/:id",
  auth,
  isAdmin,
  updateStudent
);
router.delete(
  "/student/:id",
  auth,
  isAdmin,
  deleteStudent
);


router.get(
  "/teachers",
  auth,
  isAdmin,
  getAllTeachers
);
router.get(
    "/teacher/:id",
    auth,
    isAdmin,
    getTeacherById
)
router.put(
    "/teacher/:id",
    auth,
    isAdmin,
    updateTeacher
);
router.delete(
    "/teacher/:id",
    auth,
    isAdmin,
    deleteTeacher
)
router.post(
  "/assign-teacher",
  auth,
  isAdmin,
  assignTeacher
);
module.exports=router;