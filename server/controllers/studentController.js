const User = require("../models/User");
const Internship = require("../models/Internship");
const Notification = require("../models/Notification");
const NOC = require("../models/NOC");


exports.getDashboard = async (req, res) => {
  try {

    const student = await User.findById(req.user.id)
      .populate("department")
      .populate("section")
      .populate("academicSession");

    const internship = await Internship.findOne({
      student: req.user.id,
    })
      .populate("teacherAssignment")
      .populate("domain");

    const noc = await NOC.findOne({
      student: req.user.id,
    });

    const notifications = await Notification.find({
      receiver: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: {
        student,
        internship,
        noc,
        notifications,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.getProfile = async (req, res) => {
  try {

    const student = await User.findById(req.user.id)
      .populate("department")
      .populate("section")
      .populate("academicSession");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
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


exports.getInternshipStatus = async (req, res) => {
  try {

    const internship = await Internship.findOne({
      student: req.user._id,
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "No internship found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        internshipStatus: internship.status,
        teacherReview: internship.teacherReview,
        noc: internship.noc,
        completion: internship.completion,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
exports.getAssignedTeacher = async (req, res) => {
  try {

    const internship = await Internship.findOne({
      student: req.user._id,
    }).populate(
      "teacherAssignment.teacher",
      "name email employeeId"
    );

    if (!internship || !internship.teacherAssignment.teacher) {
      return res.status(404).json({
        success: false,
        message: "No teacher assigned",
      });
    }

    return res.status(200).json({
      success: true,
      teacher: internship.teacherAssignment.teacher,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};