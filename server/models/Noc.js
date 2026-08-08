const mongoose = require("mongoose");

const nocSchema = new mongoose.Schema(
  {
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // NOC Details
    nocNumber: {
      type: String,
      required: true,
      unique: true,
    },

    issueDate: {
      type: Date,
      required: true,
    },

    validTill: {
      type: Date,
      required: true,
    },

    hodName: {
      type: String,
      required: true,
    },

    remarks: {
      type: String,
      default: "",
    },

    // Generated PDF
    nocFile: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Issued"],
      default: "Issued",
    },
  },
  {
    timestamps: true,
  },
);

// One NOC per internship
nocSchema.index(
  {
    internship: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("NOC", nocSchema);
