const Department = require("../models/Department");
const User = require("../models/User");
const Section = require("../models/Section");


const createDepartment = async (req, res) => {
  try {
    const { departmentName, departmentCode } = req.body;

    // Validation
    if (!departmentName || !departmentCode) {
      return res.status(400).json({
        success: false,
        message: "Department name and code are required.",
      });
    }

    // Check duplicate
    const existingDepartment = await Department.findOne({
      $or: [{ departmentName }, { departmentCode }],
    });

    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: "Department already exists.",
      });
    }

    // Create department
    const department = await Department.create({
      departmentName,
      departmentCode,
    });

    return res.status(201).json({
      success: true,
      message: "Department created successfully.",
      data: department,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({
      departmentName: 1,
    });

    const departmentData = await Promise.all(
      departments.map(async (department) => {
        const teachers = await User.countDocuments({
          role: "teacher",
          department: department._id,
          isActive: true,
        });

        const students = await User.countDocuments({
          role: "student",
          department: department._id,
          isActive: true,
        });

        const sections = await Section.countDocuments({
          department: department._id,
          isActive: true,
        });

        return {
          _id: department._id,
          departmentName: department.departmentName,
          departmentCode: department.departmentCode,
          teachers,
          students,
          sections,
          isActive: department.isActive,
          createdAt: department.createdAt,
          updatedAt: department.updatedAt,
        };
      }),
    );

    return res.status(200).json({
      success: true,
      count: departmentData.length,
      data: departmentData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}; 

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { departmentName, departmentCode, hod, isActive } = req.body;

    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    // Check duplicate department name
    if (departmentName) {
      const existingName = await Department.findOne({
        departmentName,
        _id: { $ne: req.params.id },
      });

      if (existingName) {
        return res.status(400).json({
          success: false,
          message: "Department name already exists.",
        });
      }

      department.departmentName = departmentName;
    }

    // Check duplicate department code
    if (departmentCode) {
      const existingCode = await Department.findOne({
        departmentCode,
        _id: { $ne: req.params.id },
      });

      if (existingCode) {
        return res.status(400).json({
          success: false,
          message: "Department code already exists.",
        });
      }

      department.departmentCode = departmentCode;
    }

    if (hod !== undefined) {
      department.hod = hod;
    }

    if (isActive !== undefined) {
      department.isActive = isActive;
    }

    await department.save();

    return res.status(200).json({
      success: true,
      message: "Department updated successfully.",
      data: department,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    await department.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Department deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
