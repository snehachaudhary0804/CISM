import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getTeacherStudents } from "../../services/teacherService";
import AssignedStudentsTable from "./teacher/AssignedStudentsTable";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getTeacherStudents();
      setStudents(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const keyword = search.toLowerCase();

      return (
        student.name?.toLowerCase().includes(keyword) ||
        student.rollNumber?.toLowerCase().includes(keyword) ||
        student.email?.toLowerCase().includes(keyword)
      );
    });
  }, [students, search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading Students...
      </div>
    );
  }

  return (
    <div className="space-y-6">
    

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 text-slate-400" size={18} />

        <input
          type="text"
          placeholder="Search by name, roll number or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            border-slate-300
            py-2.5
            pl-10
            pr-4
            focus:ring-2
            focus:ring-blue-500
            focus:outline-none
          "
        />
      </div>

      <AssignedStudentsTable students={filteredStudents} />
    </div>
  );
};

export default Students;
