const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teacher:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    department:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Deaprtment"
    },
    academicSession:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"AcademicSession"
    },
    internshipType: {
      type: String,
      enum: ["External", "In-House"],
      required: true,
    },
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
       required:true
    },
    externalDetails:{
      companyName:String,
      companyAddress:String,
      companyWebsite:String,
      hrName:String,
      hrEmail:String,
      hrPhone:String,
      jobRole:String,
      mode:{
        type:string,
        enum:["remote","on-site","hybrid"]
      },
      stipend:Number,
      startDate:Date,
      endDate:Date,
      offerLetter:String,

    },
    inHouseDetails:{
      mentor:{
        type:momgoose.Schema.Types.ObjectId,
        ref:"User"
      },
      projectTitle:string,
      batch:String,
      startDate:date,
      endDate:date,
      duration:Number,
    },
    noc:{
      status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
      },
      issueDate:Date,
      remark:{
        type:String,
        default:""
      },
      nocFile:{
        type:String,
        default:""
      },
    },
    documnents:{
      internshipReport:{
        type:string,
        default:""
      },

      completionCertificate:{
       type:String
      },
      presentation:{
        type:string,
        default:""
      },

    },
     teacherAssignment: {
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      assignedAt: Date,

    },
    teacherReview:{
      status:{
        type:string,
        enum:["Pending", "Approved", "Rejected"],
        default:"Pending"
      },
      remarks:{
        type:string,
        default:""
      },
      reviewdAt:Date
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
        "NOC Pending",
        "NOC Approved",
        "Internship Ongoing",
        "Completion Submitted",
        "Teacher Assigned",
        "Teacher Approved",
        "Rejected",
      ],
      default: "Applied",
    }, 
     rejectionReason: {
         type: String,
         default: "",
    },
     },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Internship",
  internshipSchema
);