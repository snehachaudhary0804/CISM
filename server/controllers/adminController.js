const User = require("../models/User");
const Department = require("../models/Department");
const Section = require("../models/Section");
const AcademicSession = require("../models/AcademicSession");
const Domain = require("../models/Domain");
const Internship = require("../models/Internship");
const Notification = require("../models/Notification");


exports.getAllStudents = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const { search, department, section } = req.query;

    const filter = {
      role: "student",
    };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (department) {
      filter.department = department;
    }

    if (section) {
      filter.section = section;
    }

    const students = await User.find(filter)
      .populate("department")
      .populate("section")
      .populate("academicSession")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalStudents = await User.countDocuments(filter);

    return res.status(200).json({
      success: true,

      pagination: {
        totalStudents,
        currentPage: page,
        totalPages: Math.ceil(totalStudents / limit),
        limit,
      },

      data: students,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findOne({
      _id: id,
      role: "student",
    })
      .populate("department", "departmentName departmentCode")
      .populate("section", "sectionName")
      .populate("academicSession", "sessionName");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      department,
      section,
      academicSession,
      semester,
      status,
    } = req.body;

    const student = await User.findOne({
      _id: id,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (name) student.name = name;
    if (email) student.email = email;
    if (department) student.department = department;
    if (section) student.section = section;
    if (academicSession) student.academicSession = academicSession;
    if (semester) student.semester = semester;
    if (status) student.status = status;

    await student.save();

    const updatedStudent = await User.findById(student._id)
      .populate("department", "departmentName departmentCode")
      .populate("section", "sectionName")
      .populate("academicSession", "sessionName");

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findOne({
      _id: id,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



exports.getAllTeachers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = {
      role: "teacher",
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } },
      ],
    };

    const totalTeachers = await User.countDocuments(query);

    const teachers = await User.find(query)
      .populate("department", "departmentName departmentCode")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalTeachers,
      currentPage: page,
      totalPages: Math.ceil(totalTeachers / limit),
      teachers,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await User.findOne({
      _id: id,
      role: "teacher",
    })
      .select("-password")
      .populate("department", "departmentName departmentCode");

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      success: true,
      teacher,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      employeeId,
      department,
    } = req.body;

    const teacher = await User.findOne({
      _id: id,
      role: "teacher",
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    if (name) teacher.name = name;
    if (email) teacher.email = email;
    if (employeeId) teacher.employeeId = employeeId;
    if (department) teacher.department = department;

    await teacher.save();

    const updatedTeacher = await User.findById(id)
      .select("-password")
      .populate("department", "departmentName departmentCode");

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await User.findOne({
      _id: id,
      role: "teacher",
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



exports.assignTeacher = async (req, res) => {
  try {
    const { studentId, teacherId } = req.body;

    if (!studentId || !teacherId) {
      return res.status(400).json({
        success: false,
        message: "Student ID and Teacher ID are required",
      });
    }

    // Check student
    const student = await User.findOne({
      _id: studentId,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Check teacher
    const teacher = await User.findOne({
      _id: teacherId,
      role: "teacher",
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // Student already assigned?
    if (student.assignedTeacher) {
      return res.status(400).json({
        success: false,
        message: "Student already has an assigned teacher",
      });
    }

    // Maximum 10 students per teacher
    const totalAssigned = await User.countDocuments({
      role: "student",
      assignedTeacher: teacherId,
    });

    if (totalAssigned >= 10) {
      return res.status(400).json({
        success: false,
        message: "Teacher already has maximum students assigned",
      });
    }

    // Optional: Same department validation
    if (
      student.department &&
      teacher.department &&
      student.department.toString() !== teacher.department.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Student and Teacher belong to different departments",
      });
    }

    // Assign teacher
    student.assignedTeacher = teacherId;
    await student.save();

    // Notification for student
    await Notification.create({
      receiver: student._id,
      title: "Teacher Assigned",
      message: `You have been assigned to ${teacher.name}.`,
      type: "System",
    });

    // Notification for teacher
    await Notification.create({
      receiver: teacher._id,
      title: "New Student Assigned",
      message: `${student.name} has been assigned to you.`,
      type: "System",
    });

    return res.status(200).json({
      success: true,
      message: "Teacher assigned successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

