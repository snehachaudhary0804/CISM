import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TeacherInternshipTable from "./TeacherInternshipTable";
import { getTeacherInternships } from "../../services/teacherService";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const res = await getTeacherInternships();
      setInternships(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = internships.filter((item) => {
    const student =
      item.student?.name?.toLowerCase().includes(search.toLowerCase()) || false;

    const company =
      item.externalDetails?.companyName
        ?.toLowerCase()
        .includes(search.toLowerCase()) || false;

    const status = statusFilter === "All" || item.status === statusFilter;

    return (student || company) && status;
  });

  return (
    <div className="space-y-6">
       <h1 className="text-4xl font-bold text-center text-slate-800 mb-3">
          Assigned Student
        </h1>
        <p className="text-1xl  text-center text-slate-800 mb-3">
          View and manage all Assigned Students.
        </p>
      <div className="bg-white rounded-xl p-5 shadow">
        <div className="flex justify-between mb-5">
          <input
            placeholder="Search Student or Company..."
            className="border rounded-lg px-4 py-2 w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg px-4 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <TeacherInternshipTable
          internships={filtered}
          loading={loading}
          onRefresh={fetchInternships}
        />
      </div>
    </div>
  );
};

export default Internships;
