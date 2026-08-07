const SessionModal = ({
  show,
  onClose,
  formData,
  setFormData,
  editingSession,
  onSubmit,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          {editingSession ? "Edit Academic Session" : "Add Academic Session"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Session Name */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Session Name
            </label>

            <input
              type="text"
              placeholder="2025-2026"
              value={formData.sessionName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sessionName: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Start Year */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Start Date
            </label>

            <input
              type="Date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startDate: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* End Year */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              End Date
            </label>

            <input
              type="Date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endDate: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Current Session */}
          <div className="flex items-center gap-3">
            <input
              id="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isActive: e.target.checked,
                })
              }
              className="h-4 w-4"
            />

            <label htmlFor="isActive" className="font-medium text-slate-700">
              Active Academic Session
            </label>
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
              {editingSession ? "Update Session" : "Save Session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionModal;
