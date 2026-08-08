const User = require("../models/User");
const Internship = require("../models/Internship");
const NOC = require("../models/NOC");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

exports.getDashboard = async (req, res) => {
  try {
    const student = await User.findById(req.user._id)
      .populate("department")
      .populate("section")
      .populate("academicSession");

    const internship = await Internship.findOne({
      student: req.user._id,
    })
      .populate("teacherAssignment.teacher")
      .populate("domain")
      .populate("noc");
    const timeline = [];

    if (internship) {
      timeline.push({
        title: "Internship Applied",
        status: "completed",
      });

      if (internship.teacherReview?.status === "Approved") {
        timeline.push({
          title: "Teacher Approved",
          status: "completed",
        });
      }

      if (internship.noc?.status === "Approved") {
        timeline.push({
          title: "NOC Approved",
          status: "completed",
        });
      }

      if (internship.completion?.status === "Submitted") {
        timeline.push({
          title: "Completion Submitted",
          status: "completed",
        });
      }
    }
    const noc = await NOC.findOne({
      student: req.user._id,
    });

    return res.status(200).json({
      success: true,
      data: {
        student,

        currentInternship: internship,

        noc,

        timeline,
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
    }).populate("teacherAssignment.teacher", "name email employeeId");

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

exports.uploadCompletionDocuments = async (req, res) => {
  try {
    const { internshipId } = req.params;

    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // student can upload only his internship documents
    if (internship.student.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (req.files.report) {
      const report = await uploadToCloudinary(
        req.files.report[0],
        "cism/completion/report",
      );

      internship.completionDocuments.report = {
        public_id: report.public_id,
        url: report.secure_url,
      };
    }

    if (req.files.certificate) {
      const certificate = await uploadToCloudinary(
        req.files.certificate[0],
        "cism/completion/certificate",
      );

      internship.completionDocuments.certificate = {
        public_id: certificate.public_id,
        url: certificate.secure_url,
      };
    }

    if (req.files.ppt) {
      const ppt = await uploadToCloudinary(
        req.files.ppt[0],
        "cism/completion/ppt",
      );

      internship.completionDocuments.ppt = {
        public_id: ppt.public_id,
        url: ppt.secure_url,
      };
    }

    const docs = internship.completionDocuments;

    if (docs.report?.url && docs.certificate?.url && docs.ppt?.url) {
      internship.completion.status = "Submitted";
      internship.completion.submittedAt = new Date();
      internship.status = "Completion Submitted";
    }

    await internship.save();
    await createNotification({
      sender: req.user.id,

      receiver: internship.teacherAssignment.teacher,

      student: req.user.id,

      internship: internship._id,

      title: "Completion Documents Submitted",

      message: "Student has uploaded internship completion documents.",

      type: "Review",

      action: "Completion Submitted",
    });

    res.status(200).json({
      success: true,
      message: "Completion documents uploaded successfully",
      data: internship,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
