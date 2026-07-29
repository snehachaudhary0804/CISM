import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const getStatusColor = (status) => {
  switch (status) {
    case "Teacher Assigned":
      return "bg-yellow-100 text-yellow-700";

    case "Teacher Approved":
      return "bg-green-100 text-green-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    case "Completed":
      return "bg-blue-100 text-blue-700";

    case "NOC Issued":
      return "bg-purple-100 text-purple-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};
const RecentAssignedInternships = ({ internships = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Student
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Company
              </th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
             Type
             </th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Domain
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {internships.length > 0 ? (
              internships.slice(0, 5).map((internship) => (
                <tr
                  key={internship._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {internship.student?.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {internship.student?.rollNumber}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {internship.externalDetails?.companyName ||
                      internship.inHouseDetails?.projectTitle ||
                      "-"}
                  </td>
                  <td className="px-5 py-4">
                       {internship.internshipType}
                    </td>

                  <td className="px-5 py-4">
                    {internship.domain?.domainName || "-"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        internship.status
                      )}`}
                    >
                      {internship.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <Link
                      to={`/teacher/internship/${internship._id}`}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-slate-500"
                >
                  No assigned internships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentAssignedInternships;