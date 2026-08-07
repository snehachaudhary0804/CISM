import { useEffect, useState } from "react";
import api from "../../services/api";
import DepartmentTable from "../../components/tables/DepartmentTable";
import DepartmentModal from "../../components/common/DepartmentModal";
import DepartmentViewModal from "../../components/common/DepartmentViewModal";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [formData, setFormData] = useState({
    departmentName: "",
    departmentCode: "",
  });
  const [editingDepartment, setEditingDepartment] = useState(null);
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const res = await api.get("/departments");
      setDepartments(res.data.data);
    } catch (err) {
      console.error("Department Error:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.departmentName.toLowerCase().includes(search.toLowerCase()) ||
      dept.departmentCode.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingDepartment) {
        // Update Department
        await api.put(`/departments/${editingDepartment._id}`, formData);
      } else {
        // Create Department
        await api.post("/departments", formData);
      }

      setShowModal(false);

      setFormData({
        departmentName: "",
        departmentCode: "",
      });

      setEditingDepartment(null);

      fetchDepartments();

      alert(
        editingDepartment
          ? "Department Updated Successfully"
          : "Department Added Successfully",
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);

    setFormData({
      departmentName: department.departmentName,
      departmentCode: department.departmentCode,
    });

    setShowModal(true);
  };

  const handleView = (department) => {
    setSelectedDepartment(department);
    setViewOpen(true);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/departments/${id}`);

      fetchDepartments();

      alert("Department deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Unable to delete department");
    }
  };
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-3">
        Department Management
      </h1>

      <p className="text-slate-500 mt-1 text-center">
        Manage all college departments.
      </p>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p
            className="
              inline-flex
              mt-3
              rounded-full
              bg-blue-100
              text-blue-700
              px-4
              py-1
              text-sm
              font-semibold
            "
          >
            Total Departments: {departments.length}
          </p>
        </div>

        <button
          onClick={() => {
            setEditingDepartment(null);

            setFormData({
              departmentName: "",
              departmentCode: "",
            });

            setShowModal(true);
          }}
          className="
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-5
    py-2.5
    rounded-xl
    font-semibold
    shadow-sm
    transition
  "
        >
          + Add Department
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Department..."
          className="
            w-full
            border
            border-slate-300
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading Departments...
          </div>
        ) : (
          <DepartmentTable
            departments={filteredDepartments}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <DepartmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
        editingDepartment={editingDepartment}
        onSubmit={handleSubmit}
      />
      <DepartmentViewModal
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
        department={selectedDepartment}
      />
    </div>
  );
};

export default Departments;
