import { useEffect, useState } from "react";

import {
  getAllTeachers,
  getAllDepartments,
  registerTeacher,
} from "../../services/adminService";

import Loader from "../../components/common/Loader";
import TeacherTable from "../../components/tables/TeacherTable";
import TeacherModal from "../../components/common/TeacherModal";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalType, setModalType] = useState("view");

  const [search, setSearch] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("");

  const fetchTeachers = async () => {
    try {
      const response = await getAllTeachers();

      setTeachers(response.teachers || response.data?.teachers || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDepartments = async () => {
    try {
      const res = await getAllDepartments();
      setDepartments(
        res.departments || res.data?.departments || res.data || [],
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchDepartments();
  }, []);

  const openView = (teacher) => {
    setSelectedTeacher(teacher);
    setModalType("view");
    setIsModalOpen(true);
  };

  const openEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setSelectedTeacher(null);
    setModalType("add");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;

    try {
      await deleteTeacher(id);
      fetchTeachers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (modalType === "add") {
        await registerTeacher(formData);
      } else if (modalType === "edit") {
        await updateTeacher(selectedTeacher._id, formData);
      }

      setIsModalOpen(false);
      fetchTeachers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name?.toLowerCase().includes(search.toLowerCase()) ||
      teacher.email?.toLowerCase().includes(search.toLowerCase()) ||
      teacher.employeeId?.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      !departmentFilter || teacher.department?._id === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-3">
        Teacher Management
      </h1>

      <p className="text-slate-500 mt-1 text-center">
        View and manage all registered teachers.
      </p>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p
            className="inline-flex
    mt-3
    rounded-full
    bg-blue-100
    text-blue-700
    px-4
    py-1
    text-sm
    font-semibold"
          >
            Total Teachers: {teachers.length}
          </p>
        </div>

        <button
          onClick={openAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl"
        >
          + Add Teacher
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-3"
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        <TeacherTable
          teachers={filteredTeachers}
          onView={openView}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>
      <TeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teacher={selectedTeacher}
        mode={modalType}
        departments={departments}
        onSave={handleSave}
      />
    </div>
  );
};

export default Teachers;
