const SessionViewModal = ({ show, onClose, session }) => {
  if (!show || !session) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Academic Session Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-slate-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-500">
              Session Name
            </label>
            <p className="mt-1 rounded-lg border bg-slate-50 p-3 font-medium text-slate-800">
              {session.sessionName}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-500">
              Status
            </label>
            <p className="mt-1">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  session.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {session.isActive ? "Active" : "Inactive"}
              </span>
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-500">
              Start Date
            </label>
            <p className="mt-1 rounded-lg border bg-slate-50 p-3 text-slate-700">
              {session.startDate
                ? new Date(session.startDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-500">
              End Date
            </label>
            <p className="mt-1 rounded-lg border bg-slate-50 p-3 text-slate-700">
              {session.endDate
                ? new Date(session.endDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-500">
              Created At
            </label>
            <p className="mt-1 rounded-lg border bg-slate-50 p-3 text-slate-700">
              {session.createdAt
                ? new Date(session.createdAt).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionViewModal;
