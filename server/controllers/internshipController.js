const Internship=require("../models/Internship");
const User=require("../models/User");
const Department=require("../models/Department");
const AcadmicSession=require("../models/AcademicSession");
const Domain = require("../models/Domain");

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
          
            
            const departmentExists=await Department.findoneById(department);
            if(!DepartmentExists){
                return res.status(404).json({
                    success:false,
                    message:"Department not found"
                });
            }
            
            const sessionExists=await AcademicSession.findoneById(academicSession);
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
                 data: internship,
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
      .populate("teacher")
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
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found.",
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
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found.",
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

    const teacher = await User.findById(teacherId);

    if (!teacher || teacher.role !== "Teacher") {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    internship.teacher = teacherId;

    internship.teacherAssignment = {
      teacher: teacherId,
      assignedAt: new Date(),
    };

    internship.status = "Teacher Assigned";

    await internship.save();

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

    internship.teacherReview = {

      status,
      remarks,
      reviewedAt: new Date(),

    };

    if (status === "Approved") {
      internship.status = "Teacher Approved";
    }

    if (status === "Rejected") {
      internship.status = "Rejected";
    }

    await internship.save();

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
      .populate("teacher", "name email")
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
