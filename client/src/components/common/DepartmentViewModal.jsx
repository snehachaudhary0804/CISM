const DepartmentViewModal = ({
  isOpen,
  onClose,
  department,
}) => {

  if (!isOpen || !department) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-2xl font-bold text-slate-800">
            Department Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-red-500"
          >
            ×
          </button>

        </div>


        <div className="space-y-5 p-6">

          <div>
            <p className="text-sm text-slate-500">
              Department Name
            </p>

            <p className="font-semibold text-slate-800">
              {department.departmentName}
            </p>
          </div>


          <div>
            <p className="text-sm text-slate-500">
              Department Code
            </p>

            <p className="font-semibold text-slate-800">
              {department.departmentCode}
            </p>
          </div>


          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              Active
            </span>

          </div>


        </div>


        <div className="border-t p-5 flex justify-end">

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


export default DepartmentViewModal;