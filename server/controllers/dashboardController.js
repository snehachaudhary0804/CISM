const User = require("../models/User");
const Internship = require("../models/Internship");
const Department = require("../models/Department");
const Section = require("../models/Section");
const NOC = require("../models/Noc");
exports.adminDashboard = async (req, res) => {
  

  try {
    // ===========================
    // Overview Counts
    // ===========================

    const [
      totalStudents,
      totalTeachers,
      totalDepartments,
      totalSections,
      totalInternships,
      nocPending,
      nocApproved,
      teacherAssigned,
      teacherApproved,
      completed,
      rejected,
      pendingNOC,
      issuedNOC,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "teacher" }),
      Department.countDocuments(),
      Section.countDocuments(),
      Internship.countDocuments(),

      Internship.countDocuments({ status: "NOC Pending" }),
      Internship.countDocuments({ status: "NOC Approved" }),
      Internship.countDocuments({
        "teacherAssignment.teacher": { $ne: null },
      }),
      Internship.countDocuments({ status: "Approved" }),
      Internship.countDocuments({ status: "Completed" }),
      Internship.countDocuments({ status: "Rejected" }),
      NOC.countDocuments({
        status: "Pending",
      }),

      NOC.countDocuments({
        status: "Issued",
      }),
    ]);

    // ===========================
    // Recent NOCs
    // ===========================

    const recentNOCs = await NOC.find()
      .populate("student", "name rollNumber")
      .sort({ createdAt: -1 })
      .limit(5);

    // ===========================
    // Recent Internships
    // ===========================

    const recentInternships = await Internship.find()
      .populate("student", "name rollNumber")
      .populate("department", "departmentName")
      .populate("domain", "domainName")
      .populate("teacherAssignment.teacher", "name")
      .sort({ createdAt: -1 })
      .limit(5);
    // ===========================
    // Department Statistics
    // ===========================

    const departmentStats = await Department.aggregate([
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
                  $eq: ["$$internship.status", "NOC Pending"],
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
    ]);
    // ===========================
    // Teacher Statistics
    // ===========================

    const teachers = await User.find({
      role: "teacher",
    }).select("name employeeId");

    const teacherStats = await Promise.all(
      teachers.map(async (teacher) => {
        const internships = await Internship.find({
          "teacherAssignment.teacher": teacher._id,
        });

        return {
          teacherId: teacher._id,
          name: teacher.name,
          employeeId: teacher.employeeId,

          assignedStudents: internships.length,

          pendingReviews: internships.filter(
            (i) => i.status === "Teacher Assigned",
          ).length,

          approvedInternships: internships.filter(
            (i) => i.status === "Approved",
          ).length,

          rejectedInternships: internships.filter(
            (i) => i.status === "Rejected",
          ).length,
        };
      }),
    );
    // ===========================
    // Domain Statistics
    // ===========================

    const domainStats = await Internship.aggregate([
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
    ]);
    // ===========================
    // Monthly Analytics
    // ===========================

    const monthlyAnalytics = await Internship.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          totalInternships: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    const internshipTypeStats = await Internship.aggregate([
      {
        $group: {
          _id: "$internshipType",
          total: {
            $sum: 1,
          },
        },
      },
    ]);
    const monthNames = [
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
    ];

    const formattedMonthlyAnalytics = monthlyAnalytics.map((item) => ({
      year: item._id.year,
      monthNumber: item._id.month,
      month: monthNames[item._id.month],
      totalInternships: item.totalInternships,
    }));
    return res.status(200).json({
      success: true,

      data: {
        overview: {
          totalStudents,
          totalTeachers,
          totalDepartments,
          totalSections,

          totalInternships,

          teacherAssigned, // Pending Internship Reviews

          nocPending,
          nocApproved,
          teacherApproved,
          completed,
          rejected,

          pendingNOC,
          issuedNOC,
        },
        approvalChart: [
          {
            name: "NOC Approved",
            value: nocApproved,
          },
          {
            name: "Teacher Approved",
            value: teacherApproved,
          },
          {
            name: "Rejected",
            value: rejected,
          },
        ],

        departmentChart: departmentStats.map((item) => ({
          name: item.departmentCode,
          value: item.totalInternships,
        })),
        internshipTypeStats,

        recentInternships,

        recentNOCs,

        departmentStats,

        teacherStats,

        domainStats,

        monthlyAnalytics: formattedMonthlyAnalytics,
      },
    });
  } catch (error) {
   console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
