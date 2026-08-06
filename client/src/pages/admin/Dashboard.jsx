import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/adminService";

import {
  Users,
  GraduationCap,
  Briefcase,
  Clock,
  Building2,
  FileText,
} from "lucide-react";

import DashboardHero from "../../components/dashboard/DashboardHero";
import StatCard from "../../components/dashboard/StatCard";
import ChartCard from "../../components/dashboard/ChartCard";
import RecentApplications from "../../components/dashboard/RecentApplications";
import AdminQuickAction from "./AdminQuickAction";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";


const approvalData = [
  { name: "Approved", value: 170 },
  { name: "Pending", value: 40 },
  { name: "Rejected", value: 15 },
];


const departmentData = [
  { name: "CSE", value: 120 },
  { name: "CS", value: 90 },
  { name: "AIML", value: 70 },
  { name: "ECE", value: 45 },
  { name: "ME", value: 30 },
];


const internshipType = [
  { name: "External", value: 180 },
  { name: "In-House", value: 106 },
];


const COLORS = [
  "#2563EB",
  "#16A34A",
  "#F97316",
];


const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchDashboard();
  }, []);


  const fetchDashboard = async () => {
     try {
    const response = await getDashboardData();

    console.log(response.data);   // ADD THIS

    setDashboardData(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        Loading Dashboard...
      </div>
    );
  }


  const overview = dashboardData?.overview || {};
const approvalData = dashboardData.approvalChart || [];
const departmentData = dashboardData.departmentChart || [];

const internshipType =
  dashboardData.internshipTypeStats?.map((item) => ({
    name: item._id,
    value: item.total,
  })) || [];
console.log(JSON.stringify(approvalData, null, 2));
console.log(JSON.stringify(departmentData, null, 2));
console.log(JSON.stringify(internshipType, null, 2));
  const stats = [
    {
      title:"Students",
      value: overview.totalStudents || 0,
      growth:"+0%",
      icon:Users,
      iconBg:"bg-blue-100",
      iconColor:"text-blue-600",
    },
    {
      title:"Teachers",
      value: overview.totalTeachers || 0,
      growth:"+0%",
      icon:GraduationCap,
      iconBg:"bg-green-100",
      iconColor:"text-green-600",
    },
    {
      title:"Internships",
      value: overview.totalInternships || 0,
      growth:"+0%",
      icon:Briefcase,
      iconBg:"bg-purple-100",
      iconColor:"text-purple-600",
    },
     {
  title: "NOC Pending",
  value: overview.pendingNOC || 0,
  growth: "+0%",
  icon: Clock,
  iconBg: "bg-orange-100",
  iconColor: "text-orange-600",
},
    {
      title:"Departments",
    value: overview.totalDepartments || 0,
      growth:"+0%",
      icon:Building2,
      iconBg:"bg-cyan-100",
      iconColor:"text-cyan-600",
    },
    {
      title:"NOCs Issued",
      value: overview.issuedNOC || 0,
      growth:"+0%",
      icon:FileText,
      iconBg:"bg-pink-100",
      iconColor:"text-pink-600",
    },
  ];


  return (

    <div className="min-h-screen bg-slate-50 space-y-4">


     <DashboardHero
  user="Administrator"
  overviewValue={overview.teacherAssigned || 0}
  overviewText="Pending Internship Reviews"
/>


      {/* Statistics */}

      <section >
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-3">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {
            stats.map((item,index)=>(
              <StatCard
                key={index}
                {...item}
              />
            ))
          }
        </div>
      </section>



      {/* Charts */}

      <section >

        <h2 className="text-4xl font-bold text-center text-slate-800 mb-3">
          Internship Analytics
        </h2>


        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">


          <ChartCard
            title="Approval Status"
            subtitle="Overall internship approvals"
          >

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={approvalData}
                dataKey="value"
                nameKey="name"
                outerRadius={85}
                label
              >

              {
                approvalData.map((_,index)=>(
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))
              }

              </Pie>

              <Tooltip/>
              <Legend/>

            </PieChart>
          </ResponsiveContainer>


          </ChartCard>



          <ChartCard
            title="Department Analytics"
            subtitle="Internships by department"
          >

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData}>

              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>

              <Bar
                dataKey="value"
                fill="#2563EB"
                radius={[8,8,0,0]}
              />

            </BarChart>
          </ResponsiveContainer>


          </ChartCard>




          <ChartCard
            title="Internship Type"
            subtitle="External vs In-House"
          >

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={internshipType}
                dataKey="value"
                nameKey="name"
                outerRadius={85}
                label
              >

              <Cell fill="#2563EB"/>
              <Cell fill="#10B981"/>

              </Pie>

              <Tooltip/>
              <Legend/>

            </PieChart>

          </ResponsiveContainer>

          </ChartCard>


        </div>

      </section>



      {/* Recent Applications */}

      <section >

        <h2 className="text-4xl font-bold text-center text-slate-800 mb-3">
        
    
          Recent Applications
        </h2>

        <RecentApplications
  internships={dashboardData.recentInternships}
/>

      </section>




      {/* Bottom Panels */}

      <section >

  <div className="w-full">
     <h2 className="text-4xl font-bold text-center text-slate-800 mb-3">
        
    
        Quick Action
        </h2>

    <AdminQuickAction/>

  </div>

</section>


    </div>

  );

};


export default Dashboard;