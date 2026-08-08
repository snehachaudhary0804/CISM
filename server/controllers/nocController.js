const mongoose = require("mongoose");
const NOC = require("../models/Noc");
const Internship = require("../models/Internship");
const User = require("../models/User");
const generateNOC = require("../utils/generateNoc");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const createNOC = async (req, res) => {
  try {
    

    const { internshipId, studentId, hodName, remarks = "" } = req.body;

    const issueDate = new Date();

    const validTill = new Date();
    validTill.setMonth(validTill.getMonth() + 6);

    const nocNumber = `NOC-${Date.now()}`;

    const studentData = await User.findById(studentId);

    if (!studentData) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const fileName = `${nocNumber}.pdf`;

    const uploadDir = path.join(__dirname, "../uploads/nocs");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, fileName);

    const doc = new PDFDocument();

    const stream = fs.createWriteStream(uploadPath);

    doc.pipe(stream);

    doc.fontSize(18).text("NO OBJECTION CERTIFICATE", {
      align: "center",
    });

    doc.moveDown();

    doc
      .fontSize(12)
      .text(`NOC Number: ${nocNumber}`)
      .text(`Student: ${studentData.name}`)
      .text(`Roll No: ${studentData.rollNumber}`)
      .text(`Issue Date: ${issueDate.toDateString()}`)
      .text(`Valid Till: ${validTill.toDateString()}`)
      .text(`Issued By: ${hodName}`);

    doc.end();

    await new Promise((resolve, reject) => {
      stream.on("finish", resolve);
      stream.on("error", reject);
    });

    const nocFile = `/uploads/nocs/${fileName}`;
    const existingNOC = await NOC.findOne({
      internship: internshipId,
      student: studentId,
    });

    if (existingNOC) {
      return res.status(400).json({
        success: false,
        message: "NOC already exists",
      });
    }
    const noc = await NOC.create({
      internship: internshipId,
      student: studentId,
      nocNumber,
      issueDate,
      validTill,
      hodName,
      remarks,
      nocFile,
      issuedBy: req.user._id,
      status: "Issued",
    });



    const updatedInternship = await Internship.findByIdAndUpdate(
      internshipId,
      {
        $set: {
          noc: noc._id,
        },
      },
      {
        new: true,
      },
    );

    
    

    return res.status(201).json({
      success: true,
      message: "NOC created successfully",
      noc,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllNOCs = async (req, res) => {
  try {
    const nocs = await NOC.find()
      .populate("student", "name email rollNumber")
      .populate("internship")
      .populate("issuedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: nocs.length,
      data: nocs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getNOCById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid NOC ID.",
      });
    }
    const noc = await NOC.findById(id)
      .populate("student", "name email rollNumber")
      .populate("internship", "companyName internshipTitle")
      .populate("issuedBy", "name email");

    if (!noc) {
      return res.status(404).json({
        success: false,
        message: "NOC not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: noc,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const issueNOC = async (req, res) => {
  try {
    const { id } = req.params;
    const { nocFile } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid NOC ID.",
      });
    }

    const noc = await NOC.findById(id);

    if (!noc) {
      return res.status(404).json({
        success: false,
        message: "NOC not found.",
      });
    }

    if (noc.status === "Issued") {
      return res.status(400).json({
        success: false,
        message: "NOC has already been issued.",
      });
    }

    noc.status = "Issued";
    noc.issueDate = new Date();
    noc.nocFile = nocFile || "";

    // Logged-in admin/teacher issuing the NOC
    noc.issuedBy = req.user.id;

    await noc.save();

    return res.status(200).json({
      success: true,
      message: "NOC issued successfully.",
      data: noc,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteNOC = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid NOC ID.",
      });
    }
    const noc = await NOC.findById(id);

    if (!noc) {
      return res.status(404).json({
        success: false,
        message: "NOC not found.",
      });
    }

    await NOC.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "NOC deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createNOC,
  getAllNOCs,
  getNOCById,
  issueNOC,
  deleteNOC,
};
