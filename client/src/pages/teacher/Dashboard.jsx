import { useEffect, useState } from "react";
import { getTeacherDashboard } from "../../services/teacherService";

import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

import DashboardHero from "../../components/dashboard/DashboardHero";
import StatCard from "../../components/dashboard/StatCard";
import ChartCard from "../../components/dashboard/ChartCard";
import RecentAssignedInternships from "./RecentAssignedInternships";
import TeacherQuickActions from "./TeacherQuickActions";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#F59E0B", "#22C55E", "#EF4444"];

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getTeacherDashboard();
      setDashboardData(response);
    } catch (error) {
      console.error(error);
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

  const stats = [
    {
      title: "Assigned Students",
      value: dashboardData.totalStudents,
      growth: "+0%",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending Review",
      value: dashboardData.pending,
      growth: "+0%",
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Approved",
      value: dashboardData.approved,
      growth: "+0%",
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Rejected",
      value: dashboardData.rejected,
      growth: "+0%",
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  const approvalData = [
    {
      name: "Pending",
      value: dashboardData.pending,
    },
    {
      name: "Approved",
      value: dashboardData.approved,
    },
    {
      name: "Rejected",
      value: dashboardData.rejected,
    },
  ];

  const domainData = dashboardData.internships.reduce((acc, internship) => {
    const domain = internship.domain?.domainName || "Unknown";

    const existing = acc.find((item) => item.name === domain);

    if (existing) {
      existing.value += 1;
    } else {
      acc.push({
        name: domain,
        value: 1,
      });
    }

    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 space-y-4">
      <DashboardHero
        user="Teacher"
        subtitle="Manage assigned students, review internships, approve requests and monitor student progress."
        overviewTitle="Pending Reviews"
        overviewValue={dashboardData.pending || 0}
        overviewText="Internship requests waiting for your review"
        buttonText="Review Internships"
      />

      {/* Statistics */}

      <section>
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-3">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item, index) => (
            <StatCard key={index} {...item} />
          ))}
        </div>
      </section>

      {/* Charts */}

      <section>
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-3">
          Internship Analytics
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
          <ChartCard
            title="Approval Status"
            subtitle="Assigned internship status"
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
                  {approvalData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Students by Domain"
            subtitle="Assigned internship domains"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="value" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      {/* Quick Actions */}

      <section>
        <div className="w-full">
          <TeacherQuickActions />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
