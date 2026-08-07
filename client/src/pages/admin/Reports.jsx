import {
  Download,
  FileSpreadsheet,
  FileText,
  Users,
  GraduationCap,
  Briefcase,
  FileCheck,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import api from "../../services/api";
import ReportTable from "../../components/tables/ReportTable";
import ReportModal from "../../components/common/ReportModal";
import GenerateNOCModal from "../../components/common/GenerateNOCModal";
import AssignTeacherModal from "../../components/common/AssignTeacherModal";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  approveInternship,
  getAllInternships,
} from "../../services/adminService";
import { useAuth } from "../../context/AuthContext";

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const [selectedInternship, setSelectedInternship] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    internships: 0,
    nocs: 0,
  });
  const CHART_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];

  const handleView = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };
  const downloadCSV = () => {
    if (!filteredReports.length) {
      alert("No reports available");
      return;
    }

    const headers = [
      "Student",
      "Roll Number",
      "Department",
      "Company",
      "Domain",
      "Teacher",
      "Internship Type",
      "Status",
      "NOC Status",
    ];

    const rows = filteredReports.map((report) => [
      report.student?.name || "-",
      report.student?.rollNumber || "-",
      report.department?.departmentName || "-",
      report.externalDetails?.companyName || "-",
      report.domain?.domainName || "-",
      report.teacherAssignment?.teacher?.name || "-",
      report.internshipType || "-",
      report.status || "-",
      report.noc?.status || "-",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "internship-reports.csv";

    link.click();

    window.URL.revokeObjectURL(url);
  };
  const downloadExcel = () => {
    if (!filteredReports.length) {
      alert("No reports available");
      return;
    }

    const excelData = filteredReports.map((report) => ({
      Student: report.student?.name || "-",

      Roll_Number: report.student?.rollNumber || "-",

      Department: report.department?.departmentName || "-",

      Company: report.externalDetails?.companyName || "-",

      Domain: report.domain?.domainName || "-",

      Teacher: report.teacherAssignment?.teacher?.name || "-",

      Internship_Type: report.internshipType || "-",

      Status: report.status || "-",

      NOC_Status: report.noc?.status || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Internship Reports");

    XLSX.writeFile(workbook, "internship-reports.xlsx");
  };
  const downloadPDF = () => {
    if (!filteredReports.length) {
      alert("No reports available");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Internship Management Report", 14, 20);

    const tableData = filteredReports.map((report) => [
      report.student?.name || "-",

      report.student?.rollNumber || "-",

      report.department?.departmentName || "-",

      report.externalDetails?.companyName || "-",

      report.domain?.domainName || "-",

      report.status || "-",

      report.noc?.status || "-",
    ]);

    autoTable(doc, {
      startY: 30,

      head: [
        [
          "Student",
          "Roll No",
          "Department",
          "Company",
          "Domain",
          "Status",
          "NOC",
        ],
      ],

      body: tableData,
    });

    doc.save("internship-report.pdf");
  };
  const handleDownloadNOC = (report) => {

    if (!report.noc?.nocFile) {
      return alert("NOC file not found.");
    }

    const BASE_URL = import.meta.env.VITE_API_URL.replace("/api/v1", "");

    window.open(
      `${BASE_URL}/${report.noc.nocFile.replace(/^\/+/, "")}`,
      "_blank",
    );
  };
  const handleGenerateNOC = (report) => {
    setSelectedReport(report);
    setShowGenerateModal(true);
  };
  const generateNOC = async (data) => {
    try {
      const nocData = {
        internshipId: data.report._id,
        studentId: data.report.student._id,
        hodName: data.hodName,
        remarks: data.remarks,
      };

      

      const response = await api.post("/nocs", nocData);

      alert("NOC Generated Successfully");

      setShowGenerateModal(false);
      setSelectedReport(null);

      fetchReports();
    } catch (error) {
      console.log("NOC ERROR:", error.response?.data || error);

      alert(error.response?.data?.message || "NOC generation failed.");
    }
  };
  const handleApprove = async (report) => {


    try {
      const res = await approveInternship(report._id);

      fetchReports();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  const handleAssignTeacher = async () => {
    try {
      await assignTeacher(selectedInternship._id, teacherId);

      alert("Teacher Assigned Successfully");

      setShowAssignModal(false);
      setTeacherId("");

      onRefresh();
    } catch (error) {
      alert(error.response?.data?.message || "Assignment Failed");
    }
  };
  const filteredReports = (reports || []).filter((report) => {
    const departmentMatch =
      !selectedDepartment || report.department?._id === selectedDepartment;

    const sessionMatch =
      !selectedSession || report.academicSession?._id === selectedSession;

    const statusMatch = !selectedStatus || report.status === selectedStatus;

    return departmentMatch && sessionMatch && statusMatch;
  });
  const fetchFilters = async () => {
    try {
      const deptRes = await api.get("/departments");
      setDepartments(deptRes.data.data);

      const sessionRes = await api.get("/academic-sessions");
      setSessions(sessionRes.data.data);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await api.get("/internships")

      const internships = res.data.data || res.data.internships || [];


      console.table(
        internships.map((i) => ({
          Student: i.student?.name,
          Status: i.status,
          NOC_Status: i.noc?.status,
          NOC: i.noc,
        })),
      );

      setReports(internships);

      setStats({
        students: new Set(internships.map((i) => i.student?._id)).size,

        teachers: new Set(
          internships
            .filter((i) => i.teacherAssignment?.teacher)
            .map((i) => i.teacherAssignment.teacher._id),
        ).size,

        internships: internships.length,

        nocs: internships.filter((i) => i.noc?.status === "Issued").length,
      });
    } catch (error) {
      console.log(error.response?.data || error);

      setReports([]);
    } finally {
      setLoading(false);
    }
  };
  const departmentChartData = Object.values(
    filteredReports.reduce((acc, report) => {
      const dept = report.department?.departmentName || "Unknown";

      if (!acc[dept]) {
        acc[dept] = {
          name: dept,
          value: 0,
        };
      }

      acc[dept].value++;

      return acc;
    }, {}),
  );
  const statusChartData = Object.values(
    filteredReports.reduce((acc, report) => {
      const status = report.status || "Unknown";

      if (!acc[status]) {
        acc[status] = {
          name: status,
          value: 0,
        };
      }

      acc[status].value++;

      return acc;
    }, {}),
  );
  const domainChartData = Object.values(
    filteredReports.reduce((acc, report) => {
      const domain = report.domain?.domainName || "Unknown";

      if (!acc[domain]) {
        acc[domain] = {
          name: domain,
          value: 0,
        };
      }

      acc[domain].value++;

      return acc;
    }, {}),
  );
  const reportCards = [
    {
      title: "Total Students",
      value: stats.students,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Teachers",
      value: stats.teachers,
      icon: GraduationCap,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Internships",
      value: stats.internships,
      icon: Briefcase,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "NOCs Issued",
      value: stats.nocs,
      icon: FileCheck,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  useEffect(() => {
    fetchReports();
    fetchFilters();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}

      <h1 className="text-4xl font-bold text-center text-slate-800 mb-3">
        Reports & Analytics
      </h1>

      <p className="text-slate-500 mt-1 text-center">
        Generate internship reports and analyze records.
      </p>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div></div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl"
          >
            <FileText size={18} />
            PDF
          </button>

          <button
            onClick={downloadExcel}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl"
          >
            <FileSpreadsheet size={18} />
            Excel
          </button>

          <button
            onClick={downloadCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
          >
            <Download size={18} />
            CSV
          </button>
        </div>
      </div>

      {/* Filters */}

      <div
        className="
bg-white
border
border-slate-200
rounded-2xl
shadow-sm
p-6
"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3"
          >
            <option value="">All Departments</option>

            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.departmentName}
              </option>
            ))}
          </select>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3"
          >
            <option value="">All Sessions</option>

            {sessions.map((session) => (
              <option key={session._id} value={session._id}>
                {session.sessionName}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3"
          >
            <option value="">All Status</option>

            <option value="Pending">Pending</option>

            <option value="Approved">Approved</option>

            <option value="Rejected">Rejected</option>
          </select>

          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
            Generate
          </button>
        </div>
      </div>

      {/* Cards */}
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-3">
        {" "}
        Overview
      </h2>

      <div
        className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
"
      >
        {reportCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
bg-white
border
border-slate-200
rounded-2xl
shadow-sm
p-6
"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 font-medium">{item.title}</p>

                  <h2 className="text-3xl font-bold mt-3">{item.value}</h2>
                </div>

                <div
                  className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h1 className="text-3xl font-bold text-center text-slate-800 mb-3">
        {" "}
        Analysis
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Department Chart */}

        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-lg mb-4">
            Department Wise Internships
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentChartData}>
              <CartesianGrid />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Chart */}

        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-lg mb-4">Internship Status</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {statusChartData.map((item, index) => (
                  <Cell
                    key={index}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Domain Chart */}

        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-lg mb-4">Domain Wise Internships</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={domainChartData}>
              <CartesianGrid />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Table */}
      <h1 className="text-3xl font-bold text-center text-slate-800 mb-3">
        {" "}
        Internships
      </h1>
      <div
        className="
bg-white
rounded-2xl
border
border-slate-200
shadow-sm
overflow-hidden
"
      >
        {loading ? (
          <div className="p-10 text-center">Loading Reports...</div>
        ) : (
          <ReportTable
            reports={reports}
            onView={handleView}
            onGenerateNOC={handleGenerateNOC}
            onDownloadNOC={handleDownloadNOC}
            onApprove={handleApprove}
            onAssignTeacher={handleAssignTeacher}
          />
        )}
      </div>
      <ReportModal
        show={showModal}
        report={selectedReport}
        onClose={() => {
          setShowModal(false);
          setSelectedReport(null);
        }}
      />

      <GenerateNOCModal
        isOpen={showGenerateModal}
        onClose={() => {
          setShowGenerateModal(false);
          setSelectedReport(null);
        }}
        report={selectedReport}
        onGenerate={generateNOC}
      />
      <AssignTeacherModal
        open={showAssignModal}
        internship={selectedInternship}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedInternship(null);
        }}
        onAssigned={fetchReports}
      />
    </div>
  );
};

export default Reports;
