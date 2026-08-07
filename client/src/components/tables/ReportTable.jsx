import { Eye, Download } from "lucide-react";

const ReportTable = ({
  reports,
  onView,
  onGenerateNOC,
  onDownloadNOC,
  onApprove,
  onAssignTeacher,
}) => {
  if (!reports?.length) {
    return (
      <div className="flex justify-center py-16 text-slate-500 font-medium">
        No report records found.
      </div>
    );
  }

  const statusBadge = (status) => {
    switch (status) {
      case "Applied":
        return (
          <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            Applied
          </span>
        );

      case "Approved":
        return (
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Approved
          </span>
        );

      case "Internship Ongoing":
        return (
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Internship Ongoing
          </span>
        );

      case "Completion Submitted":
        return (
          <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            Completion Submitted
          </span>
        );

      case "Completed":
        return (
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Completed
          </span>
        );

      case "Rejected":
        return (
          <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Rejected
          </span>
        );

      default:
        return (
          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
            {status}
          </span>
        );
    }
  };

  const nocBadge = (status) => {
    if (status === "Issued") {
      return (
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Issued
        </span>
      );
    }

    return (
      <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
        Pending
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1400px]">
        <thead className="bg-blue-50 border-b border-blue-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Student
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Roll No
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Department
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Company
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Domain
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Teacher
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase text-blue-700">
              Type
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase text-blue-700">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase text-blue-700">
              NOC
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase text-blue-700">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report, index) => {
            const canApprove = report.status === "Applied";

            return (
              <tr
                key={report._id}
                className={`
                border-t
                border-slate-200
                hover:bg-blue-50
                transition-colors
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              `}
              >
                <td className="px-6 py-4 font-semibold">
                  {report.student?.name || "-"}
                </td>

                <td className="px-6 py-4">
                  {report.student?.rollNumber || "-"}
                </td>

                <td className="px-6 py-4">
                  {report.department?.departmentName || "-"}
                </td>

                <td className="px-6 py-4">
                  {report.externalDetails?.companyName || "-"}
                </td>

                <td className="px-6 py-4">
                  {report.domain?.domainName || "-"}
                </td>

                <td className="px-6 py-4">
                  {report.teacherAssignment?.teacher?.name || "-"}
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {report.internshipType}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  {statusBadge(report.status)}
                </td>

                <td className="px-6 py-4 text-center">
                  {nocBadge(report.noc?.status)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(report)}
                      className="
                    rounded-lg
                    bg-blue-100
                    p-2
                    text-blue-700
                    hover:bg-blue-200
                    transition
                    "
                    >
                      <Eye size={17} />
                      View
                    </button>
                    <button
                      onClick={() => onApprove(report)}
                      disabled={!canApprove}
                    >
                      {report.status === "Approved" ? "Approved" : "Approve"}
                    </button>
                    <button
                      onClick={() => onAssignTeacher(report)}
                      disabled={report.status !== "Approved"}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition
    ${
      report.status !== "Approved"
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
    }`}
                    >
                      {report.teacherAssignment?.teacher
                        ? "Change Teacher"
                        : "Assign Teacher"}
                    </button>

                    <button
                      onClick={() => onGenerateNOC(report)}
                      disabled={report.noc?.status === "Issued"}
                      className={`
    rounded-lg
    px-3
    py-2
    text-sm
    font-medium
    ${
      report.noc?.status === "Issued"
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "bg-green-100 text-green-700 hover:bg-green-200"
    }
  `}
                    >
                      {report.noc?.status === "Issued"
                        ? "NOC Issued"
                        : "Generate NOC"}
                    </button>

                    <button
                      onClick={() => onDownloadNOC(report)}
                      disabled={!report.noc?.nocFile}
                      className={`
    rounded-lg
    p-2
    transition
    ${
      report.noc?.nocFile
        ? "bg-green-100 text-green-700 hover:bg-green-200"
        : "bg-gray-100 text-gray-400 cursor-not-allowed"
    }
  `}
                    >
                      <Download size={17} />
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
