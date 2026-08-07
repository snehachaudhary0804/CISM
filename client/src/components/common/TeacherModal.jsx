import { useEffect, useState } from "react";
import { X } from "lucide-react";

const TeacherModal = ({
  isOpen,
  onClose,
  teacher,
  mode = "view",
  departments = [],
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    designation: "",
    password: "",
    department: "",
  });

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || "",
        employeeId: teacher.employeeId || "",
        email: teacher.email || "",
        phone: teacher.phone || "",
        designation: teacher.designation || "",
        password: "",
        department: teacher.department?._id || teacher.department || "",
      });
    } else {
      setFormData({
        name: "",
        employeeId: "",
        email: "",
        phone: "",
        designation: "",
        password: "",
        department: "",
      });
    }
  }, [teacher, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData);
    }
  };

  const readOnly = mode === "view";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            {mode === "add"
              ? "Add Teacher"
              : mode === "edit"
                ? "Edit Teacher"
                : "Teacher Details"}
          </h2>

          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={readOnly}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Employee ID
            </label>
            <input
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              disabled={readOnly || mode === "edit"}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={readOnly}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={readOnly}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Designation
            </label>
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              disabled={readOnly}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={readOnly}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Department</option>

              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.departmentName || dept.name}
                </option>
              ))}
            </select>
          </div>

          {mode === "add" && (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4 bg-slate-50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
          >
            Close
          </button>

          {mode !== "view" && (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              {mode === "add" ? "Create Teacher" : "Update Teacher"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherModal;
