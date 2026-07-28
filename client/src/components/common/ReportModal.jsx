const ReportModal = ({ show, onClose, report }) => {
  if (!show || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Internship Report
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Info label="Student" value={report.student?.name} />
          <Info label="Roll Number" value={report.student?.rollNumber} />

          <Info
            label="Department"
            value={report.department?.departmentName}
          />

          <Info
            label="Teacher"
            value={report.teacherAssignment?.teacher?.name}
          />

          <Info
            label="Company"
            value={report.externalDetails?.companyName}
          />

          <Info
            label="Domain"
            value={report.domain?.domainName}
          />

          <Info
            label="Internship Type"
            value={report.internshipType}
          />

          <Info
            label="Status"
            value={report.status}
          />

          <Info
            label="NOC Status"
            value={report.noc?.status}
          />

          <Info
            label="Mode"
            value={report.externalDetails?.mode}
          />

          <Info
            label="Stipend"
            value={report.externalDetails?.stipend}
          />

          <Info
            label="Duration"
            value={
              report.externalDetails?.startDate &&
              report.externalDetails?.endDate
                ? `${new Date(
                    report.externalDetails.startDate
                  ).toLocaleDateString()} - ${new Date(
                    report.externalDetails.endDate
                  ).toLocaleDateString()}`
                : "-"
            }
          />

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="mt-1 text-slate-800 font-semibold">
      {value || "-"}
    </p>
  </div>
);

export default ReportModal;