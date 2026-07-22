import { useEffect, useState } from "react";
import { getAllStudents } from "../../services/adminService";
import Loader from "../../components/common/Loader";
import StudentTable from "../../components/tables/StudentTable";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const fetchStudents = async () => {
  try {
    const response = await getAllStudents();

    setStudents(response.data || []);
    setPagination(response.pagination || {});
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchStudents();
}, []);

if (loading) return <Loader />;
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  <h1 className="text-3xl font-bold text-gray-800">
    Student Management
  </h1>

  <p className="text-gray-500 mt-1">
    Manage all registered students.
  </p>

  <p className="inline-flex
mt-3
rounded-full
bg-blue-100
text-blue-700
px-4
py-1
text-sm
font-semibold">
    Total Students: {students.length}
  </p>
</div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search Student..."
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select className="border
border-slate-300
rounded-xl
px-4
py-3
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none">
            <option>All Departments</option>
          </select>

          <select className="border
border-slate-300
rounded-xl
px-4
py-3
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none">
            <option>All Sections</option>
          </select>

          <select className="border
border-slate-300
rounded-xl
px-4
py-3
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none">
            <option>All Status</option>
          </select>

        </div>

      </div>
       <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
         <StudentTable students={students} />
      </div>

    </div>
  );
};

export default Students;