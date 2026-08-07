import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardHero from "../../components/dashboard/DashboardHero";
import StatCard from "../../components/dashboard/StatCard";
import InternshipDetails from "../student/InternshipDetails";
import ProgressTimeline from "../student/ProgressTimeline";
import StudentQuickActions from "../student/StudentQuickActions";

import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../services/studentService";
import { Briefcase, UserCheck, FileCheck, Trophy } from "lucide-react";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getStudentDashboard();
        setDashboardData(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  const internship = dashboardData?.currentInternship;

 

  const statusOrder = {
    Applied: 1,
    Approved: 2,
    "Internship Ongoing": 3,
    "Completion Submitted": 4,
    Completed: 5,
  };

  const currentStage = statusOrder[internship?.status] || 0;

  const workflowSteps = [
    currentStage >= 1,
    currentStage >= 2,
    !!internship?.teacherAssignment?.teacher,
    internship?.noc?.status === "Issued",
    currentStage >= 3,
    currentStage >= 4,
    internship?.teacherReview?.status === "Approved",
    currentStage >= 5,
  ];

  const completedSteps = workflowSteps.filter(Boolean).length;

  const completion = `${Math.round(
    (completedSteps / workflowSteps.length) * 100,
  )}%`;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        Loading Dashboard...
      </div>
    );
  }
  const steps = [
    {
      title: "Internship Applied",
      completed: currentStage >= 1,
    },
    {
      title: "Admin Approved",
      completed: currentStage >= 2,
    },
    {
      title: "Faculty Assigned",
      completed: !!internship?.teacherAssignment?.teacher,
    },
    {
      title: "NOC Issued",
      completed: internship?.noc?.status === "Issued",
    },
    {
      title: "Internship Ongoing",
      completed: currentStage >= 3,
    },
    {
      title: "Documents Submitted",
      completed: currentStage >= 4,
    },
    {
      title: "Teacher Review",
      completed: internship?.teacherReview?.status === "Approved",
    },
    {
      title: "Internship Completed",
      completed: currentStage >= 5,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 space-y-4">
      <DashboardHero
        user={dashboardData?.student?.name}
        subtitle="Track your internship progress, assigned faculty, NOC status and important updates from one place."
        overviewTitle={
          dashboardData?.currentInternship?.externalDetails?.companyName
        }
        overviewValue={dashboardData?.currentInternship?.status}
        overviewText={
          dashboardData?.currentInternship?.externalDetails?.companyName
        }
        buttonText="View Internship"
      />

      <h2 className="text-4xl font-bold text-center text-slate-800 mb-3">
        Dashboard Overview
      </h2>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <StatCard
          title="Internship"
          value={internship?.status}
          icon={Briefcase}
        />

        <StatCard
          title="Teacher"
          value={internship?.teacherAssignment?.teacher?.name || "Not Assigned"}
          icon={UserCheck}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="NOC"
          value={internship?.noc?.status || "Pending"}
          icon={FileCheck}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />

        <StatCard
          title="Completion"
          value={completion}
          icon={Trophy}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Main Content */}

      {/* Progress + Notifications */}
      <div className="mt-8">
        <InternshipDetails internship={internship} />
      </div>

      <div className="h-full">
        <ProgressTimeline steps={steps} />
      </div>

      {/* Quick Actions */}
      <div className="mt-6 mb-8">
        <StudentQuickActions internship={internship} />
      </div>
    </div>
  );
};

export default Dashboard;
