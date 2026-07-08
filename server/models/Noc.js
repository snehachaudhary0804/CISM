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
    },

    issueDate: {
      type: Date,
    },

    nocFile: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Issued"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
nocSchema.index(
    {
        internship: 1,
        student: 1
    },
    {
        unique: true
    }
);
module.exports = mongoose.model("NOC", nocSchema);