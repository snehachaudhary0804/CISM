import { Eye, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";

const InternshipTable = ({ internships }) => {
  if (!internships?.length) {
    return (
      <div className="flex justify-center py-16 text-slate-500 font-medium">
        No internship records found.
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Approved
          </span>
        );

      case "Pending":
        return (
          <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            Pending
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
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {status}
          </span>
        );
    }
  };

  const getNocBadge = (status) => {
    switch (status) {
      case "Issued":
        return (
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Issued
          </span>
        );

      case "Pending":
        return (
          <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
            Pending
          </span>
        );

      default:
        return (
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1400px]">
        <thead className="bg-blue-50 border-b border-blue-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-blue-700">
              Student
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-blue-700">
              Company
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-blue-700">
              Domain
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-blue-700">
              Type
            </th>

            <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide text-blue-700">
              Teacher
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-blue-700">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-blue-700">
              NOC
            </th>

            <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-blue-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {internships.map((item, index) => (
            <tr
              key={item._id}
              className={`
                border-t
                border-slate-200
                hover:bg-blue-50
                transition-colors
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              `}
            >
              <td className="px-6 py-4 font-semibold">{item.student}</td>

              <td className="px-6 py-4">{item.company}</td>

              <td className="px-6 py-4">{item.domain}</td>

              <td className="px-6 py-4 text-center">
                <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {item.type}
                </span>
              </td>

              <td className="px-6 py-4">{item.teacher}</td>

              <td className="px-6 py-4 text-center">
                {getStatusBadge(item.status)}
              </td>

              <td className="px-6 py-4 text-center">{getNocBadge(item.noc)}</td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <button className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200 transition">
                    <Eye size={17} />
                  </button>

                  <button className="rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200 transition">
                    <Pencil size={17} />
                  </button>

                  <button className="rounded-lg bg-emerald-100 p-2 text-emerald-700 hover:bg-emerald-200 transition">
                    <CheckCircle size={17} />
                  </button>

                  <button className="rounded-lg bg-orange-100 p-2 text-orange-700 hover:bg-orange-200 transition">
                    <XCircle size={17} />
                  </button>

                  <button className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200 transition">
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InternshipTable;
