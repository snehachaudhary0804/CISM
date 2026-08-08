const Internship = require("../models/Internship");
const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const internships = await Internship.find({
      "teacherAssignment.teacher": teacherId,
    })
      .populate("student", "name rollNumber email ")
      .populate("domain", "domainName");

    const pending = internships.filter(
      (i) => i.teacherReview.status === "Pending",
    ).length;

    const approved = internships.filter(
      (i) =>
        i.status === "Internship Ongoing" ||
        i.status === "Completion Submitted" ||
        i.status === "Completed",
    ).length;

    const rejected = internships.filter(
      (i) => i.teacherReview.status === "Rejected",
    ).length;
    res.status(200).json({
      success: true,
      totalStudents: internships.length,
      pending,
      approved,
      rejected,
      internships,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const teacher = await User.findById(req.user.id)
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
      data: teacher,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAssignedStudents = async (req, res) => {
  try {
    const internships = await Internship.find({
      "teacherAssignment.teacher": req.user.id,
    }).populate("student", "name email rollNumber department section semester");

    const students = internships.map((internship) => internship.student);

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStudentDetails = async (req, res) => {
  try {
    const internship = await Internship.findOne({
      student: req.params.studentId,
      "teacherAssignment.teacher": req.user.id,
    })
      .populate("student")
      .populate("domain")
      .populate("department")
      .populate("academicSession");

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Student not assigned to you",
      });
    }

    return res.status(200).json({
      success: true,
      data: internship,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTeacherInternships = async (req, res) => {
  try {
    
    const internships = await Internship.find({
      "teacherAssignment.teacher": req.user.id,
    })
      .populate("student", "name rollNumber email department section semester")
      .populate("domain", "domainName")
      .populate("department", "departmentName")
      .populate("academicSession");

    return res.status(200).json({
      success: true,
      count: internships.length,
      data: internships,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.approveCompletion = async (req, res) => {
  try {
    const { internshipId } = req.params;
    const { remarks } = req.body;

    const internship = await Internship.findOne({
      _id: internshipId,
      "teacherAssignment.teacher": req.user.id,
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Already reviewed
    if (internship.teacherReview.status === "Approved") {
      return res.status(400).json({
        success: false,
        message: "Internship already approved.",
      });
    }

    internship.teacherReview.status = "Approved";
    internship.teacherReview.remarks = remarks || "";
    internship.teacherReview.reviewedAt = new Date();

    // Ready for Admin
    internship.status = "Completed";

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

exports.rejectCompletion = async (req, res) => {
  try {
    const { internshipId } = req.params;
    const { remarks } = req.body;

    const internship = await Internship.findOne({
      _id: internshipId,
      "teacherAssignment.teacher": req.user.id,
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    internship.teacherReview.status = "Rejected";
    internship.teacherReview.remarks = remarks || "";
    internship.teacherReview.reviewedAt = new Date();

    internship.completion.status = "Pending";
    internship.rejectionReason = remarks || "";

    await internship.save();

    return res.status(200).json({
      success: true,
      message: "Internship rejected successfully.",
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
