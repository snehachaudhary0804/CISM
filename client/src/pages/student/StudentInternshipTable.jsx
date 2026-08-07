import { Fragment, useState } from "react";
import { Eye, ChevronDown, ChevronUp } from "lucide-react";

import InternshipExpanded from "./StudentExpand";

const StudentInternshipTable = ({ internships = [] }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-700",
      Approved: "bg-green-100 text-green-700",
      Rejected: "bg-red-100 text-red-700",
      Active: "bg-blue-100 text-blue-700",
      Completed: "bg-purple-100 text-purple-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          styles[status] || "bg-slate-100 text-slate-700"
        }`}
      >
        {status}
      </span>
    );
  };

  if (!internships.length) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <h2 className="text-xl font-semibold text-slate-700">
          No Internship Records
        </h2>

        <p className="text-slate-500 mt-2">
          Your internships will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-blue-50 border-b border-blue-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                Company
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                Domain
              </th>

              <th className="px-6 py-4 text-center text-sm font-bold text-blue-700">
                Type
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                Duration
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                Teacher
              </th>

              <th className="px-6 py-4 text-center text-sm font-bold text-blue-700">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-bold text-blue-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {internships.map((item) => (
              <Fragment key={item._id}>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-5 font-semibold text-slate-800">
                    {item.internshipType === "External"
                      ? item.externalDetails?.companyName
                      : item.inHouseDetails?.projectTitle}
                  </td>

                  <td className="px-6 py-5">{item.domain?.domainName}</td>

                  <td className="px-6 py-5 text-center">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {item.internshipType}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    {item.internshipType === "External"
                      ? `${new Date(
                          item.externalDetails?.startDate,
                        ).toLocaleDateString()} - ${new Date(
                          item.externalDetails?.endDate,
                        ).toLocaleDateString()}`
                      : `${item.inHouseDetails?.startDate} - ${item.inHouseDetails?.endDate}`}
                  </td>

                  <td className="px-6 py-5">
                    {item.teacherAssignment?.teacher?.name || "Not Assigned"}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {getStatusBadge(item.status)}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => toggleExpand(item._id)}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        transition
                      "
                    >
                      <Eye size={16} />
                      View
                      {expandedId === item._id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </td>
                </tr>

                {expandedId === item._id && (
                  <tr>
                    <td colSpan={7} className="bg-slate-50 p-6">
                      <InternshipExpanded internship={item} />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentInternshipTable;
