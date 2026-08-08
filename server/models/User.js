const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rollNumber: {
      type: String,
      sparse: true,
      required: function () {
        return this.role === "student";
      },
      trim: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: function () {
        return this.role === "student" || this.role === "teacher";
      },
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: function () {
        return this.role === "student";
      },
    },
    academicSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicSession",
      required: function () {
        return this.role === "student";
      },
    },
    semester: {
      type: Number,
      required: function () {
        return this.role === "student";
      },
      min: 1,
      max: 8,
    },
    assignedTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    employeeId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      required: function () {
        return this.role === "teacher";
      },
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("User", userSchema);
