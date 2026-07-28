import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardHero from "../../components/dashboard/DashboardHero";
import StatCard from "../../components/dashboard/StatCard";
import InternshipDetails from "../student/InternshipDetails";
import ProgressTimeline from "../student/ProgressTimeline";
import NotificationPanel from "../student/NotificationPanel";
import StudentQuickActions from "../student/StudentQuickActions";

import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../services/studentService";
import {
  Briefcase,
  UserCheck,
  FileCheck,
  Trophy,
} from "lucide-react";

const Dashboard = () => {
  const [dashboardData,setDashboardData] = useState(null);
  const [loading,setLoading] = useState(true);


  useEffect(()=>{
     const fetchDashboard = async()=>{

   try{

    const data = await getStudentDashboard();

    setDashboardData(data.data);

   }
   catch(error){
    console.log(error);

   }
   finally{

    setLoading(false);

   }

 };


 fetchDashboard();
 },[]);

 const internship = dashboardData?.currentInternship;

const progress = [
    internship,
    internship?.teacherReview?.status === "Approved",
    internship?.noc?.status === "Approved",
    internship?.completion?.status === "Submitted"
].filter(Boolean).length;

const completion = `${progress * 25}%`;
 if(loading){

 return (
   <div className="p-10 text-center">
      Loading dashboard...
   </div>
 );

}
  return (
    <DashboardLayout  role="student"
  user={dashboardData?.student}>
  <div className="space-y-8 pb-12">
  <DashboardHero
    user={dashboardData?.student?.name}
    subtitle="Track your internship progress, assigned faculty, NOC status and important updates from one place."
    overviewTitle={
       dashboardData?.currentInternship?.externalDetails?.companyName
    }
    overviewValue={
      dashboardData?.currentInternship?.status
    }
    overviewText={dashboardData?.currentInternship?.externalDetails?.companyName}
    buttonText="View Internship"
  />


{/* Stats */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

  <StatCard
    title="Internship"
    value={internship?.status}
    icon={Briefcase}
  />

  <StatCard
    title="Teacher"
    value={
      internship?.teacherAssignment?.teacher?.name ||
      "Not Assigned"
    }
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
{/* Internship Details */}
<div className="mt-8">

  <InternshipDetails internship={internship} />

</div>

{/* Progress + Notifications */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8 items-stretch">
<div className="h-full">
  <ProgressTimeline
    steps={[
      {
        title: "Internship Applied",
        description: "Internship submitted",
        completed: true,
      },
      {
        title: "Teacher Approved",
        description:
          internship?.teacherReview?.status === "Approved"
            ? "Teacher approved internship"
            : "Waiting for teacher approval",
        completed:
          internship?.teacherReview?.status === "Approved",
      },
      {
        title: "NOC Approved",
        description:
          internship?.noc?.status === "Approved"
            ? "NOC approved"
            : "Waiting for NOC approval",
        completed:
          internship?.noc?.status === "Approved",
      },
      {
        title: "Completion Submitted",
        description:
          internship?.completion?.status === "Submitted"
            ? "Completion submitted"
            : "Not submitted",
        completed:
          internship?.completion?.status === "Submitted",
      },
    ]}
  />
</div>
<div className="h-full">
  <NotificationPanel
    notifications={dashboardData?.notifications || []}
  />
  </div>

</div>

{/* Quick Actions */}
<div className="mt-6 mb-8">

  <StudentQuickActions />

</div>
</div>
</DashboardLayout>
  )
};

export default Dashboard;