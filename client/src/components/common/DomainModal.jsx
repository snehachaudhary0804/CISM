const DomainModal = ({
  show,
  onClose,
  formData,
  setFormData,
  editingDomain,
  onSubmit,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          {editingDomain ? "Edit Domain" : "Add Domain"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Domain Name */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Domain Name
            </label>

            <input
              type="text"
              placeholder="Web Development"
              value={formData.domainName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  domainName: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Enter domain description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 resize-none"
            />
          </div>

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
              {editingDomain ? "Update Domain" : "Save Domain"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DomainModal;
