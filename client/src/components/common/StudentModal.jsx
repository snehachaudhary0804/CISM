import { useEffect, useState } from "react";
import { X, Save, Loader2, UserPlus, UserPen } from "lucide-react";

import {
  updateStudent,
  getAllDepartments,
  getAllSections,
  getAllAcademicSessions,
} from "../../services/adminService";

import { registerUser } from "../../services/authService";

const StudentModal = ({
  open,
  onClose,
  formData,
  setFormData,
  editingStudent,
  fetchStudents,
  updateStudent,
}) => {
  const [departments, setDepartments] = useState([]);
  const [sections, setSections] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadDropdowns();
    }
  }, [open]);

  const loadDropdowns = async () => {
    try {
      const [deptRes, sectionRes, sessionRes] = await Promise.all([
        getAllDepartments(),
        getAllSections(),
        getAllAcademicSessions(),
      ]);

      setDepartments(deptRes.data || []);
      setSections(sectionRes.data || []);
      setSessions(sessionRes.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingStudent) {
        await updateStudent(editingStudent._id, formData);

        alert("Student updated successfully");
      }

      fetchStudents();

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update student");
    }
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-blue-600">
          <div className="flex items-center gap-3 text-white">
            {editingStudent ? <UserPen size={24} /> : <UserPlus size={24} />}

            <div>
              <h2 className="text-2xl font-bold">
                {editingStudent ? "Edit Student" : "Add Student"}
              </h2>

              <p className="text-blue-100 text-sm">
                {editingStudent
                  ? "Update student information"
                  : "Register a new student"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Roll Number */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Roll Number
              </label>

              <input
                type="text"
                name="rollNumber"
                required
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            {!editingStudent && (
              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}

            {/* Department */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Department
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Department</option>

                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
            </div>

            {/* Section */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Section
              </label>

              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Section</option>

                {sections.map((section) => (
                  <option key={section._id} value={section._id}>
                    {section.sectionName}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Session */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Academic Session
              </label>

              <select
                name="academicSession"
                value={formData.academicSession}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Session</option>

                {sessions.map((session) => (
                  <option key={session._id} value={session._id}>
                    {session.sessionName}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Semester
              </label>

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Active */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-5 w-5"
                />

                <span className="font-medium text-slate-700">
                  Student Active
                </span>
              </label>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-5 border-t border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {editingStudent ? "Update Student" : "Add Student"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
