import { useEffect, useState } from "react";
import {
  
  deleteStudent,
} from "../../services/adminService";
import {
  getAllStudents,
  getAllDepartments,
  getAllSections,
  getAllAcademicSessions,
} from "../../services/adminService";
import Loader from "../../components/common/Loader";
import StudentTable from "../../components/tables/StudentTable";
import StudentModal from "../../components/common/StudentModal";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [showModal, setShowModal] = useState(false);
const [editingStudent, setEditingStudent] = useState(null);
const [departments, setDepartments] = useState([]);
const [sections, setSections] = useState([]);

const [selectedDepartment, setSelectedDepartment] = useState("");
const [selectedSection, setSelectedSection] = useState("");
const [selectedStatus, setSelectedStatus] = useState("");
const [search, setSearch] = useState("");
const [sessions, setSessions] = useState([]);
const [selectedSession, setSelectedSession] = useState("");
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  rollNumber: "",
  password: "",
  department: "",
  section: "",
  academicSession: "",
  semester: 1,
  isActive: true,
});
  const handleView = (student) => {
  console.log(student);
};

const handleEdit = (student) => {
  setEditingStudent(student);

  setFormData({
    name: student.name,
    email: student.email,
    phone: student.phone,
    rollNumber: student.rollNumber,
    department: student.department?._id || "",
    section: student.section?._id || "",
    academicSession: student.academicSession?._id || "",
    semester: student.semester,
    isActive: student.isActive,
    password: "",
  });

  setShowModal(true);
};

const handleDelete = async (id) => {
  if (!window.confirm("Delete this student?")) return;

  try {
    await deleteStudent(id);;
    fetchStudents();
    alert("Student deleted successfully");
  } catch (err) {
    console.error(err);
    alert("Unable to delete student");
  }
};
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
const loadFilters = async () => {
  try {
    const [deptRes, sectionRes, sessionRes] = await Promise.all([
      getAllDepartments(),
      getAllSections(),
      getAllAcademicSessions(),
    ]);

    setDepartments(deptRes.data || []);
    setSections(sectionRes.data || []);
    setSessions(sessionRes.data || []);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchStudents();
  loadFilters();
}, []);
const filteredStudents = students.filter((student) => {
  const matchesSearch =
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(search.toLowerCase());

  const matchesDepartment =
    !selectedDepartment ||
    student.department?._id === selectedDepartment;

  const matchesSection =
    !selectedSection ||
    student.section?._id === selectedSection;

  const matchesSession =
    !selectedSession ||
    student.academicSession?._id === selectedSession;

  const matchesStatus =
    selectedStatus === "" ||
    String(student.isActive) === selectedStatus;

  return (
    matchesSearch &&
    matchesDepartment &&
    matchesSection &&
    matchesSession &&
    matchesStatus
  );
});
if (loading) return <Loader />;
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

  <div>
    <h1 className="text-3xl font-bold text-gray-800">
      Student Management
    </h1>

    <p className="text-gray-500 mt-1">
      Manage all registered students.
    </p>
  </div>

  <div className="flex items-center gap-3">

    <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-4 py-1 text-sm font-semibold">
      Total Students: {students.length}
    </span>

    <button
  onClick={() => {
    setEditingStudent(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      rollNumber: "",
      password: "",
      department: "",
      section: "",
      academicSession: "",
      semester: 1,
      isActive: true,
    });

    setShowModal(true);
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition"
>
  + Add Student
</button>

  </div>

 </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          <input
            type="text"

            placeholder="Search Student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <select
  value={selectedSection}
  onChange={(e) => setSelectedSection(e.target.value)}
  className="border border-slate-300 rounded-xl px-4 py-3"
>
  <option value="">All Sections</option>

  {sections.map((section) => (
    <option key={section._id} value={section._id}>
      {section.sectionName}
    </option>
  ))}
</select>
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
          <select className="border
border-slate-300
rounded-xl
px-4
py-3
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none">
            <select
  value={selectedStatus}
  onChange={(e) => setSelectedStatus(e.target.value)}
  className="border border-slate-300 rounded-xl px-4 py-3"
>
  <option value="">All Status</option>
  <option value="true">Active</option>
  <option value="false">Inactive</option>
</select>
          </select>

        </div>

      </div>
       <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
      
  
         <StudentTable
  students={filteredStudents}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
      </div>
<StudentModal
  open={showModal}
  onClose={() => setShowModal(false)}
  formData={formData}
  setFormData={setFormData}
  editingStudent={editingStudent}
  fetchStudents={fetchStudents}
/>    </div>
  );
};

export default Students;