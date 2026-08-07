import { useEffect, useState } from "react";
import AdminInternshipTable from "./AdminInternshipTable";
import {
  getAllInternships,
  getDepartments,
  getAllTeachers,
} from "../../services/adminService";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [teachers, setTeachers] = useState([]);

  const fetchDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.departments || []);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTeachers = async () => {
    try {
      const res = await getAllTeachers();

      setTeachers(res.teachers || []);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredInternships = internships.filter((item) => {
    const matchesSearch = item.student?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = !statusFilter || item.status === statusFilter;

    const matchesDepartment =
      !departmentFilter || item.department?._id === departmentFilter;

    const matchesTeacher =
      !teacherFilter || item.teacherAssignment?.teacher?._id === teacherFilter;

    return (
      matchesSearch && matchesStatus && matchesDepartment && matchesTeacher
    );
  });
  const fetchInternships = async () => {
    try {
      const res = await getAllInternships();
      setInternships(res.internships || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInternships();
    fetchDepartments();
    fetchTeachers();
  }, []);
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Internship Management
          </h1>

          <p className="text-slate-500 mt-1">
            Manage all internship applications.
          </p>

          <p className="inline-flex mt-3 rounded-full bg-blue-100 text-blue-700 px-4 py-1 text-sm font-semibold">
            Total Internships : {internships.length}
          </p>
        </div>

        <button
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-2.5
            rounded-xl
            font-semibold
            transition
          "
        >
          + Add Internship
        </button>
      </div>

      <div className="bg-white rounded-xl p-5 mb-6 shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="Applied">Applied</option>
            <option value="NOC Approved">NOC Approved</option>
            <option value="Completion Submitted">Completion Submitted</option>

            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Departments</option>

            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.departmentName}
              </option>
            ))}
          </select>
          <select
            value={teacherFilter}
            onChange={(e) => setTeacherFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Teachers</option>

            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Table */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <AdminInternshipTable
          internships={filteredInternships}
        ></AdminInternshipTable>
      </div>
    </div>
  );
};

export default Internships;
