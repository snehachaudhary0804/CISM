const DepartmentModal = ({
  show,
  onClose,
  formData,
  setFormData,
  editingDepartment,
  onSubmit,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          {editingDepartment ? "Edit Department" : "Add Department"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block font-medium">
              Department Name
            </label>

            <input
              type="text"
              value={formData.departmentName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  departmentName: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Department Code
            </label>

            <input
              type="text"
              value={formData.departmentCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  departmentCode: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              {editingDepartment ? "Update" : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default DepartmentModal;