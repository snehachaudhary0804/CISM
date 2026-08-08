const User = require("../models/User");
const Department = require("../models/Department");
const Section = require("../models/Section");
const AcademicSession = require("../models/AcademicSession");
const Domain = require("../models/Domain");
const Internship = require("../models/Internship");

exports.getAllStudents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      department,
      section,
      semester,
      academicSession,
      status,
    } = req.query;

    const query = {
      role: "student",
    };

    // Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { rollNumber: { $regex: search, $options: "i" } },
      ];
    }

    // Filters
    if (department) query.department = department;
    if (section) query.section = section;
    if (semester) query.semester = Number(semester);
    if (academicSession) query.academicSession = academicSession;

    if (status) {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const students = await User.find(query)
      .populate("department", "departmentName")
      .populate("section", "sectionName")
      .populate("academicSession", "sessionName")
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    const updatedStudents = await Promise.all(
      students.map(async (student) => {
        const internship = await Internship.findOne({
          student: student._id,
        }).populate("teacherAssignment.teacher", "name");

        return {
          ...student.toObject(),
          assignedTeacher: internship?.teacherAssignment?.teacher || null,
        };
      }),
    );
    const totalStudents = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      students: updatedStudents,
      pagination: {
        totalStudents,
        currentPage: Number(page),
        totalPages: Math.ceil(totalStudents / Number(limit)),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }
    const student = await User.findOne({
      _id: id,
      role: "Student",
    })
      .populate("department", "name")
      .populate("section", "name")
      .populate("academicSession", "name")
      .select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const internship = await Internship.findOne({
      student: id,
    })
      .populate("teacher", "name employeeId")
      .populate("domain", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      student,
      internship,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student details",
    });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const {
      name,
      email,
      phone,
      department,
      section,
      semester,
      academicSession,
      status,
    } = req.body;

    const student = await User.findOne({
      _id: id,
      role: "Student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Update fields
    if (name !== undefined) student.name = name;
    if (email !== undefined) student.email = email;
    if (phone !== undefined) student.phone = phone;
    if (department !== undefined) student.department = department;
    if (section !== undefined) student.section = section;
    if (semester !== undefined) student.semester = semester;
    if (academicSession !== undefined)
      student.academicSession = academicSession;
    if (status !== undefined) student.status = status;

    await student.save();

    const updatedStudent = await User.findById(student._id)
      .populate("department", "name")
      .populate("section", "name")
      .populate("academicSession", "name")
      .select("-password");

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update student",
    });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student = await User.findOne({
      _id: id,
      role: "Student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    student.status = "Inactive";

    await student.save();

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete student",
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
    const { name, email, phone, department, isActive } = req.body;

    const teacher = await User.findOne({
      _id: id,
      role: "teacher",
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    // Check email uniqueness
    if (email && email !== teacher.email) {
      const existing = await User.findOne({ email });

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Email already exists.",
        });
      }
    }

    teacher.name = name ?? teacher.name;
    teacher.email = email ?? teacher.email;
    teacher.phone = phone ?? teacher.phone;
    teacher.department = department ?? teacher.department;

    if (typeof isActive === "boolean") {
      teacher.isActive = isActive;
      teacher.status = isActive ? "Active" : "Inactive";
    }

    await teacher.save();

    return res.status(200).json({
      success: true,
      message: "Teacher updated successfully.",
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
        message: "Teacher not found.",
      });
    }

    await teacher.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Teacher deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getAllInternships = async (req, res) => {
  try {
    const { search, status, department, teacher, type } = req.query;

    const filter = {};

    if (status) filter.status = status;

    if (department) filter.department = department;

    if (type) filter.internshipType = type;

    if (teacher) filter["teacherAssignment.teacher"] = teacher;

    let internships = await Internship.find(filter)
      .populate("student", "name rollNumber email")
      .populate("department", "departmentName")
      .populate("domain", "domainName")
      .populate("teacherAssignment.teacher", "name")
      .populate("noc");

    if (search) {
      internships = internships.filter((i) =>
        i.student?.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return res.status(200).json({
      success: true,
      internships,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.rejectInternship = async (req, res) => {
  try {
    const { internshipId } = req.params;

    const { remarks } = req.body;

    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    internship.status = "Rejected";
    internship.noc.status = "Rejected";
    internship.rejectionReason = remarks;
    internship.noc.remark = remarks;
    await internship.save();

    return res.status(200).json({
      success: true,
      message: "Internship rejected successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.completeInternship = async (req, res) => {
  try {
    const { internshipId } = req.params;

    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    if (internship.teacherReview.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message: "Teacher review is not approved.",
      });
    }

    internship.status = "Completed";
    internship.completion.status = "Completed";

    await internship.save();

    return res.status(200).json({
      success: true,
      message: "Internship completed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.approveInternship = async (req, res) => {
  try {
    const { internshipId } = req.params;

    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    if (internship.status === "Approved") {
      return res.status(400).json({
        success: false,
        message: "Internship already approved.",
      });
    }

    internship.status = "Approved";

    await internship.save();

    return res.status(200).json({
      success: true,
      message: "Internship approved successfully.",
      data: internship,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
