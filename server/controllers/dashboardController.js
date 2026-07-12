const User = require("../models/User");
const Internship = require("../models/Internship");
const Department = require("../models/Department");
const Section = require("../models/Section");
const Notification = require("../models/Notification");
const NOC = require("../models/NOC");

exports.adminDashboard = async (req, res) => {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalDepartments,
      totalSections,
      totalInternships,
      pendingInternships,
      approvedInternships,
      rejectedInternships,
      pendingNOC,
      issuedNOC,
      totalNotifications,
       recentInternships = await Internship.find()
            .populate("student", "name rollNumber")
            .populate("teacherAssignment", "name employeeId")
            .sort({ createdAt: -1 })
            .limit(5),

         recentNOCs = await NOC.find()
              .populate("student", "name rollNumber")
              .sort({ createdAt: -1 })
               .limit(5),

          recentNotifications = await Notification.find()
               .populate("receiver", "name role")
               .sort({ createdAt: -1 })
               .limit(5),

         departmentStats = await Department.aggregate([
               {
                 $lookup: {
                   from: "users",
                   localField: "_id",
                   foreignField: "department",
                   as: "students",
                 },
               },
               {
                 $lookup: {
                   from: "internships",
                   localField: "_id",
                   foreignField: "department",
                    as: "internships",
                    },
                },
                {
                   $project: {
                    departmentName: 1,
                    departmentCode: 1,
                    totalStudents: {
                       $size: {
                       $filter: {
                            input: "$students",
                            as: "student",
                            cond: {
                             $eq: ["$$student.role", "student"],
                         },
                        },
                        },
                   },
                   totalInternships: {
                     $size: "$internships",
                   },
                   approvedInternships: {
                     $size: {
                       $filter: {
                         input: "$internships",
                         as: "internship",
                         cond: {
                           $eq: ["$$internship.status", "Approved"],
                         },
                       },
                     },
                   },
                   pendingInternships: {
                     $size: {
                    $filter: {
                      input: "$internships",
                      as: "internship",
                      cond: {
                        $eq: ["$$internship.status", "Pending"],
                      },
                    },
                  },
                },
                rejectedInternships: {
                  $size: {
                    $filter: {
                      input: "$internships",
                      as: "internship",
                      cond: {
                        $eq: ["$$internship.status", "Rejected"],
                      },
                   },
                 },
               },
             },
           },
           {
             $sort: {
               departmentName: 1,
             },
           },
         ]),
         teacherStats = await User.aggregate([
  {
    $match: {
      role: "teacher",
    },
  },
  {
    $lookup: {
      from: "internships",
      localField: "_id",
      foreignField: "teacher",
      as: "internships",
    },
  },
  {
    $project: {
      name: 1,
      employeeId: 1,

      assignedStudents: {
        $size: "$internships",
      },

      pendingReviews: {
        $size: {
          $filter: {
            input: "$internships",
            as: "internship",
            cond: {
              $eq: ["$$internship.status", "Pending"],
            },
          },
        },
      },

      approvedInternships: {
        $size: {
          $filter: {
            input: "$internships",
            as: "internship",
            cond: {
              $eq: ["$$internship.status", "Approved"],
            },
          },
        },
      },

      rejectedInternships: {
        $size: {
          $filter: {
            input: "$internships",
            as: "internship",
            cond: {
              $eq: ["$$internship.status", "Rejected"],
            },
          },
        },
      },
    },
  },
  {
    $sort: {
      name: 1,
    },
  },
]),
domainStats = await Internship.aggregate([
  {
    $lookup: {
      from: "domains",
      localField: "domain",
      foreignField: "_id",
      as: "domain",
    },
  },
  {
    $unwind: "$domain",
  },
  {
    $group: {
      _id: "$domain.domainName",
      totalInternships: {
        $sum: 1,
      },
    },
  },
  {
    $project: {
      _id: 0,
      domainName: "$_id",
      totalInternships: 1,
    },
  },
  {
    $sort: {
      totalInternships: -1,
    },
  },
]),
 monthlyAnalytics = await Internship.aggregate([
  {
    $group: {

      _id: {
         year:{$year :"$createdAt"},
         month:{$month: "$createdAt"} 
        },
      totalInternships: { $sum: 1 },
    },
  },
  {
    $sort: {
        "_id.year":1,
      "_id.month": 1,
    },
  },
]),
monthNames = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
],

formattedMonthlyAnalytics = monthlyAnalytics.map((item) => ({
    year:item._id.year,
  month: monthNames[item._id.month],
  totalInternships: item.totalInternships,
}))

         
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "teacher" }),
      Department.countDocuments(),
      Section.countDocuments(),
      Internship.countDocuments(),
      Internship.countDocuments({ status: "Pending" }),
      Internship.countDocuments({ status: "Approved" }),
      Internship.countDocuments({ status: "Rejected" }),
      NOC.countDocuments({ status: "Pending" }),
      NOC.countDocuments({ status: "Issued" }),
      Notification.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
         overview: {
             totalStudents,
             totalTeachers,
             totalDepartments,
             totalSections,
             totalInternships,
             pendingInternships,
             approvedInternships,
             rejectedInternships,
             pendingNOC,
             issuedNOC,
             totalNotifications,
         },
         recentInternships,
         recentNOCs,
         recentNotifications,
         recentInternships,
         departmentStats,
         teacherStats,
         domainStats,
         monthlyAnalytics :formattedMonthlyAnalytics,
        }
    
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};