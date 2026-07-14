const Internship = require("../models/Internship");
const Notification = require("../models/Notification");
const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  try {

    const teacherId = req.user.id;

    const internships = await Internship.find({
      "teacherAssignment": teacherId,
    })
      .populate("student","name rollnumber email ")
      .populate("domain","domainName");

    const pending = internships.filter(
      i => i.status === "Pending"
    ).length;

    const approved = internships.filter(
      i => i.status === "Approved"
    ).length;

    const rejected = internships.filter(
      i => i.status === "Rejected"
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
exports.getNotifications = async (req, res) => {
  try {

    const notifications = await Notification.find({
      receiver: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.markNotificationRead = async (req, res) => {
  try {

    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.notificationId,
        receiver: req.user.id,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification,
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
    })
      .populate(
        "student",
        "name email rollNumber department section semester"
      );

    const students = internships.map(
      internship => internship.student
    );

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


