const ViewStudentModal = ({ open, onClose, student }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">Student Details</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold">{student?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Roll Number</p>
            <p className="font-semibold">{student?.rollNumber}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold">{student?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-semibold">{student?.phone || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-semibold">
              {student?.department?.departmentName || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Section</p>
            <p className="font-semibold">
              {student?.section?.sectionName || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Semester</p>
            <p className="font-semibold">{student?.semester}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>

            <p className="font-semibold">
              {student?.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentModal;
