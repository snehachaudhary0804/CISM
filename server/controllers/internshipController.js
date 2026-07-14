const Internship=require("../models/Internship");
const User=require("../models/User");
const Department=require("../models/Department");
const AcademicSession=require("../models/AcademicSession");
const Domain = require("../models/Domain");
const Notification = require("../models/Notification");

exports.createInternships=async(req,res)=>{
    try{

       const{
             department,
             academicSession,
             domain,
             internshipType,
             externalDetails,
             inHouseDetails
            }=req.body;
        const student=req.user._id;
        if(
            !student ||
            !internshipType||!department||!academicSession||!domain
            )
            {
                return res.status(400).json({
                    success:false,
                    message:"please fill all required fields"
                });
            }
               // Validate internship type details

          if (internshipType === "External" && !externalDetails) {
              return res.status(400).json({
                   success: false,
                   message: "External internship details are required."
               });
          }

          if (internshipType === "In-House" && !inHouseDetails) {
               return res.status(400).json({
                   success: false,
                   message: "In-House internship details are required."
               });
          }
            
            const departmentExists=await Department.findById(department);
            if(!departmentExists){
                return res.status(404).json({
                    success:false,
                    message:"Department not found"
                });
            }
            
            const sessionExists=await AcademicSession.findById(academicSession);
            if(!sessionExists){
                return res.status(404).json({
                    success:false,
                    message:"Academic Session not found"
                });
            }
             const domainExists = await Domain.findById(domain);
             if (!domainExists) {
                  return res.status(404).json({
                    success: false,
                    message: "Domain not found.",
                  });
            }
            const existingInternship = await Internship.findOne({
                    student,
                    status: { $ne: "Rejected" }
                  });

            if (existingInternship) {
                return res.status(400).json({
                    success: false,
                    message: "Student already has an active internship.",
               });
            }
            const internship=await Internship.create({
                 student,
                 internshipType,
                 academicSession,
                 domain,
                 externalDetails,
                 inHouseDetails,
                 department,
                 status:"Applied"
            });
            return res.status(201).json({
                 success: true,
                 message: "Internship created successfully.",
                 data: internship
           });
            
    }
    catch(error){
          return res.status(500).json({
          success: false,
          message: error.message,
       });
   }
};
exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find()
      .populate("student", "name email rollNumber")
      .populate("teacherAssignment.teacher", "name email")
      .populate("department", "departmentName")
      .populate("academicSession")
      .populate("domain");

    return res.status(200).json({
      success: true,
      count: internships.length,
      data: internships,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate("student")
      .populate("teacherAssignment.teacher")
      .populate("department")
      .populate("academicSession")
      .populate("domain");

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: internship,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateInternship = async (req, res) => {
  try {
   const internship = await Internship.findOne({
    _id: req.params.id,
    student: req.user._id
   });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found.",
      });
    }
     if (
  internship.status !== "Applied" &&
  internship.status !== "Rejected"
) {
  return res.status(400).json({
    success: false,
    message: "Approved internship cannot be updated."
  });
}

    return res.status(200).json({
      success: true,
      message: "Internship updated successfully.",
      data: internship,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findOne({
    _id: req.params.id,
    student: req.user._id
    });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found.",
      });
    }
    if (
    internship.status !== "Applied" &&
    internship.status !== "Rejected"
) {
    return res.status(400).json({
        success:false,
        message:"Approved internship cannot be deleted."
    });
}

    await internship.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Internship deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.assignTeacher = async (req, res) => {
  try {
    const { internshipId } = req.params;
    const { teacherId } = req.body;

    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    const teacher = await User.findOne({
         _id: teacherId,
         role: "teacher",
    });

    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

  

    internship.teacherAssignment = {
      teacher: teacherId,
      assignedAt: new Date(),
    };

    internship.teacherReview.status ="Pending";

    await internship.save();
    
     const notification = await Notification.create({
    sender: req.user._id,
    receiver: teacherId,
    title: "New Internship Assigned",
    message: "You have been assigned a new internship for review.",
    type: "Internship"
});

console.log("Notification created:", notification);

    return res.status(200).json({
      success: true,
      message: "Teacher assigned successfully",
      data: internship,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateNOCStatus = async (req, res) => {
  try {

    const { internshipId } = req.params;
    const { status, remark, nocFile } = req.body;

    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }
     if (!["Pending", "Approved", "Rejected"].includes(status)) {
          return res.status(400).json({
             success: false,
             message: "Invalid NOC status.",
        });
    }
    internship.noc.status = status;
    internship.noc.remark = remark || "";
    internship.noc.issueDate = new Date();

    if (nocFile) {
      internship.noc.nocFile = nocFile;
    }

    if (status === "Approved") {
      internship.status = "NOC Approved";
    }

    if (status === "Rejected") {
      internship.status = "Rejected";
    }

    await internship.save();

    return res.status(200).json({
      success: true,
      message: "NOC updated successfully",
      data: internship,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



exports.teacherReview = async (req, res) => {

  try {

    const { internshipId } = req.params;

    const { status, remarks } = req.body;

    const internship = await Internship.findById(internshipId);

    if (!internship) {

      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }
      if (
          !internship.teacherAssignment.teacher ||
           internship.teacherAssignment.teacher.toString() !== req.user._id.toString()
        ) {
             return res.status(403).json({
                 success: false,
                 message: "You are not assigned to this internship.",
           });
          }
    
     if (!["Approved", "Rejected"].includes(status)) {
           return res.status(400).json({
              success: false,
              message: "Invalid review status.",
         });
      }
       internship.teacherReview.status = status;
       internship.teacherReview.remarks = remarks;
       internship.teacherReview.reviewedAt = new Date();

    if (status === "Approved") {
      internship.status = "Teacher Approved";
    }

    if (status === "Rejected") {
      internship.status = "Rejected";
    }

    await internship.save();
     await Notification.create({
        sender: req.user._id,
        receiver: internship.student,
        title: "New Internship Assigned",
        message: "You have been assigned a new internship for review.",
        type: "Internship"
     });
    return res.status(200).json({
      success: true,
      message: "Review submitted successfully",
      data: internship,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
exports.submitCompletion = async (req, res) => {

  try {

    const { internshipId } = req.params;

    const {
      internshipReport,
      completionCertificate,
      presentation,
    } = req.body;

    const internship = await Internship.findById(internshipId);

    if (!internship) {

      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });

    }

    internship.documents = {
      internshipReport,
      completionCertificate,
      presentation,
    };

    internship.completion.status = "Submitted";
    internship.completion.submittedAt = new Date();

    internship.status = "Completion Submitted";

    await internship.save();

    return res.status(200).json({
      success: true,
      message: "Completion submitted successfully",
      data: internship,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
exports.getStudentInternships = async (req, res) => {

  try {

    const internships = await Internship.find({
      student: req.user._id,
    })
      .populate("teacherAssignment.teacher", "name email")
      .populate("department")
      .populate("academicSession")
      .populate("domain");

    return res.status(200).json({

      success: true,
      count: internships.length,
      data: internships,

    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
exports.getTeacherInternships = async (req, res) => {
  try {
    console.log(req.user);
    const internships = await Internship.find({
      "teacherAssignment.teacher": req.user._id,
    })
      .populate("teacherAssignment.teacher","name email")
      .populate("student", "name email")
      .populate("department")
      .populate("academicSession")
      .populate("domain");

    return res.status(200).json({

      success: true,
      count: internships.length,
      data: internships,

    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
exports.getPendingNOCRequests = async (req, res) => {

  try {

    const internships = await Internship.find({
      "noc.status": "Pending",
    })
      .populate("student", "name email")
      .populate("department")
      .populate("academicSession");

    return res.status(200).json({

      success: true,
      count: internships.length,
      data: internships,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};
