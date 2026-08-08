const Section = require("../models/Section");
const User = require("../models/User");
const Department = require("../models/Department");

const createSection = async (req, res) => {
  try {
    const { sectionName, department } = req.body;

    if (!sectionName || !department) {
      return res.status(400).json({
        success: false,
        message: "Section Name and Department are required.",
      });
    }

    // Check if department exists
    const departmentExists = await Department.findById(department);

    if (!departmentExists) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    // Prevent duplicate section in same department
    const existingSection = await Section.findOne({
      sectionName,
      department,
    });

    if (existingSection) {
      return res.status(400).json({
        success: false,
        message: "Section already exists in this department.",
      });
    }

    const section = await Section.create({
      sectionName,
      department,
    });

    return res.status(201).json({
      success: true,
      message: "Section created successfully.",
      data: section,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllSections = async (req, res) => {
  try {
    const sections = await Section.find()
      .populate("department", "departmentName departmentCode")
      .sort({ sectionName: 1 });
    const data = [];

    for (const section of sections) {
      const studentsList = await User.find({
        role: "student",
        section: section._id,
      });



      const students = studentsList.length;

      data.push({
        _id: section._id,
        sectionName: section.sectionName,
        department: section.department,

        students,
        isActive: section.isActive,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findById(id).populate(
      "department",
      "departmentName departmentCode",
    );

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { sectionName, department, isActive } = req.body;

    const section = await Section.findById(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found.",
      });
    }

    // If department is changed, verify it exists
    if (department) {
      const departmentExists = await Department.findById(department);

      if (!departmentExists) {
        return res.status(404).json({
          success: false,
          message: "Department not found.",
        });
      }
    }

    // Prevent duplicate section name in the same department
    const duplicateSection = await Section.findOne({
      sectionName: sectionName || section.sectionName,
      department: department || section.department,
      _id: { $ne: id },
    });

    if (duplicateSection) {
      return res.status(400).json({
        success: false,
        message: "Section already exists in this department.",
      });
    }

    section.sectionName = sectionName || section.sectionName;
    section.department = department || section.department;

    if (typeof isActive === "boolean") {
      section.isActive = isActive;
    }

    await section.save();

    return res.status(200).json({
      success: true,
      message: "Section updated successfully.",
      data: section,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findById(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found.",
      });
    }

    await Section.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully.",
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
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection,
};
