import { Eye, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { approveInternship, rejectInternship } from "../../services/teacherService";


const TeacherInternshipTable = ({
  internships = [],
  loading,
  onRefresh,
}) => {
  const [expandedId, setExpandedId] = useState(null);
  const handleApprove = async (id) => {
  try {
    await approveInternship(id);
    alert("Internship approved successfully.");
    onRefresh();
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Approval failed");
  }
};
const handleReject = async (id) => {
  const remarks = prompt("Enter rejection remarks:");

  if (remarks === null) return;

  try {
    await rejectInternship(id, remarks);
    alert("Internship rejected.");
    onRefresh();
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Rejection failed");
  }
};

  if (loading) return <p>Loading...</p>;

  if (!internships.length)
    return (
      <p className="text-center text-gray-500 py-10">
        No internships found.
      </p>
    );

  return (
    <table className="w-full">
          <thead className="bg-slate-100 border-b">
  <tr>
    <th className="text-left p-4">Student</th>
    <th className="text-left p-4">Roll No</th>
    <th className="text-left p-4">Company</th>
    <th className="text-left p-4">Domain</th>
    <th className="text-left p-4">Type</th>
    <th className="text-left p-4">Status</th>
    <th className="text-center p-4">Action</th>
  </tr>
</thead>

<tbody>
  {internships.map((item) => (
    <>
      <tr
        key={item._id}
        className="border-b hover:bg-slate-50"
      >
        <td className="p-4">
          {item.student?.name}
        </td>

        <td className="p-4">
          {item.student?.rollNumber}
        </td>

        <td className="p-4">
          {item.externalDetails?.companyName || "-"}
        </td>

        <td className="p-4">
          {item.domain?.domainName || "-"}
        </td>

        <td className="p-4">
          {item.internshipType}
        </td>

       <td className="p-4">
  <span
    className={`
      px-3 py-1 rounded-full text-sm font-semibold
      ${
        item.teacherReview?.status === "Approved"
          ? "bg-green-100 text-green-700"
          : item.teacherReview?.status === "Rejected"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }
    `}
  >
    {item.teacherReview?.status || "Pending"}
  </span>
</td>

        <td className="p-4 text-center">
          <button
            onClick={() =>
              setExpandedId(
                expandedId === item._id
                  ? null
                  : item._id
              )
            }
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <Eye size={16} />

            {expandedId === item._id ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}

            View
          </button>
        </td>
      </tr>

      {expandedId === item._id && (
        <tr>
          <td
            colSpan={7}
            className="bg-slate-50 p-6"
          >
            <h3 className="text-xl font-bold mb-4">
              Internship Details
            </h3>

            <div className="grid grid-cols-2 gap-6">

              <div>
                <h4 className="font-semibold mb-2">
                  Student Information
                </h4>

                <p><strong>Name:</strong> {item.student?.name}</p>
                <p><strong>Roll No:</strong> {item.student?.rollNumber}</p>
                <p><strong>Email:</strong> {item.student?.email}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">
                  Internship Information
                </h4>

                <p><strong>Company:</strong> {item.externalDetails?.companyName}</p>
                <p><strong>Domain:</strong> {item.domain?.domainName}</p>
                <p><strong>Mode:</strong> {item.externalDetails?.mode}</p>
                <p><strong>Stipend:</strong> {item.externalDetails?.stipend}</p>
              </div>
             <div className="mt-6">
  <h4 className="font-semibold mb-3">
    Documents
  </h4>

  <div className="flex gap-3 flex-wrap">

    {/* Offer Letter */}
    {item.externalDetails?.offerLetter && (
      <a
        href={item.externalDetails.offerLetter}
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        View Offer Letter
      </a>
    )}


    {/* Report */}
    {item.completionDetails?.reportFile && (
      <>
        <a
          href={item.completionDetails.reportFile}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
        >
          View Report
        </a>

        <a
          href={item.completionDetails.reportFile}
          download
          className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700"
        >
          Download Report
        </a>
      </>
    )}


    {/* Certificate */}
    {item.completionDetails?.certificateFile && (
      <>
        <a
          href={item.completionDetails.certificateFile}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          View Certificate
        </a>

        <a
          href={item.completionDetails.certificateFile}
          download
          className="px-4 py-2 rounded-lg bg-green-100 text-green-700"
        >
          Download Certificate
        </a>
      </>
    )}

  </div>
</div>
            </div>

            <div className="mt-6 flex gap-4">

  {item.teacherReview?.status === "Pending" && (
    <>
      <button
        onClick={() => handleApprove(item._id)}
        className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
      >
        Approve Internship
      </button>

      <button
        onClick={() => handleReject(item._id)}
        className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
      >
        Reject Internship
      </button>
    </>
  )}
 
 {item.teacherReview?.status === "Approved" && (
<>
  <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-semibold">
    ✓ Internship Approved
  </span>

  
</>
)}

  {item.teacherReview?.status === "Rejected" && (
    <span className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold">
      ✗ Internship Rejected
    </span>
  )}

</div>
          </td>
        </tr>
      )}
    </>
  ))}
</tbody>
    </table>
  );
};

export default TeacherInternshipTable;