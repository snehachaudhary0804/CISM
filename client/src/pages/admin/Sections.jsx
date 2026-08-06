import { useEffect, useState } from "react";
import api from "../../services/api";
import SectionTable from "../../components/tables/SectionTable";
import SectionModal from "../../components/common/SectionModal";
import SectionViewModal from "../../components/common/SectionViewModal";



const Sections = () => {
  const [sections, setSections] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [showModal, setShowModal] = useState(false);
const [selectedSection, setSelectedSection] = useState(null);
const [viewOpen, setViewOpen] = useState(false);
const [editingSection, setEditingSection] = useState(null);
const [departmentFilter, setDepartmentFilter] = useState("");
const [departments, setDepartments] = useState([]);
const [sessionsList, setSessionsList] = useState([]);

const [formData, setFormData] = useState({
  sectionName: "",
  department: "",
  academicSession: "",
});
const filteredSections = sections.filter((section) => {
  const matchesSearch =
    section.sectionName
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    section.department?.departmentName
      ?.toLowerCase()
      .includes(search.toLowerCase());

  const matchesDepartment =
    !departmentFilter ||
    section.department?._id === departmentFilter;

  return matchesSearch && matchesDepartment;
});
const handleView = (section) => {
  console.log(JSON.stringify(section, null, 2));

  setSelectedSection(section);
  setViewOpen(true);
};

const fetchSections = async () => {
  try {
    setLoading(true);

    const res = await api.get("/sections");

    console.log("Sections:", res.data);

    setSections(res.data.data);
  } catch (err) {
    console.error(err.response?.data || err);
  } finally {
    setLoading(false);
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingSection) {
      await api.put(
        `/sections/${editingSection._id}`,
        formData
      );
    } else {
      await api.post("/sections", formData);
    }

    fetchSections();

    setShowModal(false);

    setEditingSection(null);

    setFormData({
      sectionName: "",
      department: "",
      academicSession: "",
    });

  } catch (err) {
    console.log(err.response?.data || err);
  }
};

const handleEdit = (section) => {
  setEditingSection(section);

  setFormData({
    sectionName: section.sectionName,
    department: section.department?._id,
    academicSession: section.academicSession?._id,
  });

  setShowModal(true);
};

const handleDelete = async (id) => {
  if (!window.confirm("Delete this section?")) return;

  await api.delete(`/sections/${id}`);

  fetchSections();
};

const fetchDepartments = async () => {
  try {
    const res = await api.get("/departments");

    console.log("API Response:", res.data);
    console.log("Department Array:", res.data.data);

    setDepartments(res.data.data);
  } catch (err) {
    console.log(err.response?.data || err);
  }
};
const fetchSessions = async () => {
  const res = await api.get("/academic-sessions");

  console.log("Sessions:", res.data.data);

  setSessionsList(res.data.data);
};

useEffect(() => {
  console.log("Fetching data...");

  fetchSections();
  fetchDepartments();
  fetchSessions();
}, []);
console.log("viewOpen:", viewOpen);
console.log("selectedSection:", selectedSection);
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Section Management
          </h1>

          <p className="text-slate-500 mt-1">
            Manage all college sections.
          </p>

          <p className="inline-flex mt-3 rounded-full bg-blue-100 text-blue-700 px-4 py-1 text-sm font-semibold">
            Total Sections: {sections.length}
          </p>
        </div>

        <button
  onClick={() => {
    setEditingSection(null);

    setFormData({
      sectionName: "",
      department: "",
      academicSession: "",
    });

    setShowModal(true);
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold"
>
  + Add Section
</button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search Section..."
            className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
  value={departmentFilter}
  onChange={(e) => setDepartmentFilter(e.target.value)}
  className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">All Departments</option>

  {departments.map((dept) => (
    <option key={dept._id} value={dept._id}>
      {dept.departmentName}
    </option>
  ))}
</select>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        {loading ? (
  <div className="p-10 text-center text-slate-500">
    Loading Sections...
  </div>
) : (
 <SectionTable
  sections={filteredSections}
  onView={handleView}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
)}
      </div>
<SectionModal
  show={showModal}
  onClose={() => setShowModal(false)}
  formData={formData}
  setFormData={setFormData}
  editingSection={editingSection}
  departments={departments}
  sessions={sessionsList}
  onSubmit={handleSubmit}
/>
<SectionViewModal
  show={viewOpen}
  onClose={() => setViewOpen(false)}
  section={selectedSection}
/>
    </div>
  );
};

export default Sections;