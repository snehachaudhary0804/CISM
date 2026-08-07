const SectionViewModal = ({ show, onClose, section }) => {
  if (!show || !section) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-2xl font-bold text-slate-800">Section Details</h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="text-sm text-slate-500">Section</p>
            <p className="font-semibold">{section.sectionName}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Department</p>
            <p className="font-semibold">
              {section.department?.departmentName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Academic Session</p>
            <p className="font-semibold">
              {section.academicSession?.sessionName || "Not Assigned"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Students</p>
            <p className="font-semibold">{section.students || 0}</p>
          </div>
        </div>

        <div className="flex justify-end border-t p-5">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionViewModal;
