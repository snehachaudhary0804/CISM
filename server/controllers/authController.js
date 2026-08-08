const User=require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken=require("../utils/generateToken");



const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      employeeId,
      rollNumber,
      department,
      section,
      semester,
      academicSession,
      phone,
      isActive,
    } = req.body;

    // Required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, Password and Role are required.",
      });
    }

    // Validate role
    if (!["student", "teacher", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role.",
      });
    }

    // Email already exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Student validation
    if (role === "student") {
      if (
        !rollNumber ||
        !department ||
        !section ||
        !semester ||
        !academicSession
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Roll Number, Department, Section, Semester and Academic Session are required.",
        });
      }

      const existingStudent = await User.findOne({ rollNumber });

      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: "Roll Number already exists.",
        });
      }
    }

    // Teacher validation
    if (role === "teacher") {
      if (!employeeId || !department) {
        return res.status(400).json({
          success: false,
          message: "Employee ID and Department are required.",
        });
      }

      const existingTeacher = await User.findOne({ employeeId });

      if (existingTeacher) {
        return res.status(400).json({
          success: false,
          message: "Employee ID already exists.",
        });
      }
    }

    // Admin validation
    if (role === "admin") {
      if (!employeeId) {
        return res.status(400).json({
          success: false,
          message: "Employee ID is required.",
        });
      }

      const existingAdmin = await User.findOne({ employeeId });

      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "Employee ID already exists.",
        });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      employeeId,
      rollNumber,
      department,
      section,
      semester,
      academicSession,
      phone: phone || "",
      isActive:
        typeof isActive === "boolean"
          ? isActive
          : true,
    });

    return res.status(201).json({
      success: true,
      message: `${role} registered successfully.`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        department: user.department,
        employeeId: user.employeeId,
        rollNumber: user.rollNumber,
        section: user.section,
        semester: user.semester,
        academicSession: user.academicSession,
        isActive: user.isActive,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Register User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const user = await User.findOne({ email })
            .populate("department")
            .populate("section")
            .populate("academicSession");
    
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        



const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = generateToken(user._id);

        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getProfile = async (req, res) => {
    try {
        
  

        const user = await User.findById(req.user._id)
            .populate("department")
            .populate("section")
            .populate("academicSession")
            .select("-password");

      

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.error("PROFILE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateProfile = async (req, res) => {
    try {

        const { phone } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { phone },
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
const changePassword = async (req, res) => {
  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports={registerUser,loginUser,getProfile,updateProfile,changePassword};