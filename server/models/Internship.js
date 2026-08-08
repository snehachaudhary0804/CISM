const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    academicSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicSession",
    },
    internshipType: {
      type: String,
      enum: ["External", "In-House"],
      required: true,
    },
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
      required: true,
    },
    externalDetails: {
      companyName: String,
      companyAddress: String,
      companyWebsite: String,
      hrName: String,
      hrEmail: String,
      hrPhone: String,
      jobRole: String,
      mode: {
        type: String,
        enum: ["remote", "on-site", "hybrid"],
      },
      stipend: Number,
      startDate: Date,
      endDate: Date,
      offerLetter: String,
    },
    inHouseDetails: {
      mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      projectTitle: String,
      batch: String,
      startDate: Date,
      endDate: Date,
      duration: Number,
    },
    noc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NOC",
      default: null,
    },
    teacherAssignment: {
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      assignedAt: Date,
    },
    teacherReview: {
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
      remarks: {
        type: String,
        default: "",
      },
      reviewedAt: Date,
    },
    completion: {
      status: {
        type: String,
        enum: ["Pending", "Submitted", "Completed"],
        default: "Pending",
      },

      submittedAt: Date,
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Approved",
        "Internship Ongoing",
        "Completion Submitted",
        "Completed",
        "Rejected",
      ],
      default: "Applied",
    },
    rejectionReason: {
      type: String,
      default: "",
    },
    completionDocuments: {
      report: {
        public_id: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          default: "",
        },
      },

      certificate: {
        public_id: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          default: "",
        },
      },

      ppt: {
        public_id: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          default: "",
        },
      },

      submittedAt: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Internship", internshipSchema);
