import { useEffect, useState } from "react";
import InternshipCards from "./InternshipCards";
import StudentInternshipTable from "./studentInternshipTable";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { getStudentInternships } from "../../services/studentService";

const Internship = () => {
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);

        const response = await getStudentInternships();

      

        setInternships(response.data || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load internships");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const filteredInternships = internships.filter((item) => {
    const matchesSearch = item.externalDetails?.companyName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="p-10 text-center">Loading internships...</div>
      </DashboardLayout>
    );
  }
  if (error) {
    return (
      <DashboardLayout role="student">
        <div className="p-10 text-center text-red-500">{error}</div>
      </DashboardLayout>
    );
  }
  return (
    
      <div className="p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-3">
          My Internships
        </h1>
        <p className="text-1xl  text-center text-slate-800 mb-3">
          View and manage all your internship records.
        </p>

        <InternshipCards internships={internships} />

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-5">
            <input
              type="text"
              placeholder="Search by company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-xl px-4 py-2 w-full md:w-80"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-xl px-4 py-2"
            >
              <option>All</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

          <StudentInternshipTable internships={filteredInternships} />
        </div>
      </div>
  
  );
};

export default Internship;
