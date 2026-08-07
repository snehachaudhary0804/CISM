const SectionModal = ({
  show,
  onClose,
  formData,
  setFormData,
  editingSection,
  departments,
  sessions,
  onSubmit,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          {editingSection ? "Edit Section" : "Add Section"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Section Name */}

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Section Name
            </label>

            <input
              type="text"
              placeholder="Section A"
              value={formData.sectionName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sectionName: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Department */}

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Department
            </label>

            <select
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.departmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Session */}

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Academic Session
            </label>

            <select
              value={formData.academicSession}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  academicSession: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Academic Session</option>

              {sessions.map((session) => (
                <option key={session._id} value={session._id}>
                  {session.sessionName}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2 font-medium hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
            >
              {editingSection ? "Update Section" : "Save Section"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectionModal;
