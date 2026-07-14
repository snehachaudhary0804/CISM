const User = require("../models/User");
const Internship = require("../models/Internship");
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
      pendingInternships,
      approvedInternships,
      rejectedInternships,
      pendingNOC,
      issuedNOC,
      totalNotifications,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "teacher" }),
      Department.countDocuments(),
      Section.countDocuments(),
      Internship.countDocuments(),

      Internship.countDocuments({
        status: "Pending",
      }),

      Internship.countDocuments({
        status: "Teacher Approved",
      }),

      Internship.countDocuments({
        status: "Rejected",
      }),

      NOC.countDocuments({
        status: "Pending",
      }),

      NOC.countDocuments({
        status: "Issued",
      }),

      Notification.countDocuments(),
    ]);



    // ===========================
    // Recent Internships
    // ===========================

    const recentInternships = await Internship.find()
      .populate("student", "name rollNumber")
      .populate(
        "teacherAssignment.teacher",
        "name employeeId"
      )
      .populate("domain", "domainName")
      .sort({ createdAt: -1 })
      .limit(5);



    // ===========================
    // Recent NOCs
    // ===========================

    const recentNOCs = await NOC.find()
      .populate("student", "name rollNumber")
      .sort({ createdAt: -1 })
      .limit(5);



    // ===========================
    // Recent Notifications
    // ===========================

    const recentNotifications = await Notification.find()
      .populate("receiver", "name role")
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
                  $eq: [
                    "$$internship.status",
                    "Teacher Approved",
                  ],
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
                  $eq: [
                    "$$internship.status",
                    "Pending",
                  ],
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
                  $eq: [
                    "$$internship.status",
                    "Rejected",
                  ],
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
            i => i.status === "Pending"
          ).length,

          approvedInternships: internships.filter(
            i => i.status === "Teacher Approved"
          ).length,

          rejectedInternships: internships.filter(
            i => i.status === "Rejected"
          ).length,
        };

      })
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

    const formattedMonthlyAnalytics =
      monthlyAnalytics.map((item) => ({
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

        departmentStats,

        teacherStats,

        domainStats,

        monthlyAnalytics: formattedMonthlyAnalytics,

      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};