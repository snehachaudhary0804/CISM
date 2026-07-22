import { useEffect, useState } from "react";
import { getAllTeachers } from "../../services/adminService";
import Loader from "../../components/common/Loader";
import TeacherTable from "../../components/tables/TeacherTable";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      const response = await getAllTeachers();

      // Change this line if your service returns a different structure
      setTeachers(response.teachers || response.data?.teachers || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Teacher Management
          </h1>

          <p className="text-slate-500 mt-1">
            View and manage all registered teachers.
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
            Total Teachers: {teachers.length}
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition shadow-sm font-semibold">
          + Add Teacher
        </button>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search teacher..."
            className="border border-slate-300 rounded-xl px-4 py-3 focus:borderline-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <select className="
border
border-slate-300
rounded-xl
px-4
py-3
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
">
            <option>All Departments</option>
          </select>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        <TeacherTable teachers={teachers} />
      </div>

    </div>
  );
};

export default Teachers;