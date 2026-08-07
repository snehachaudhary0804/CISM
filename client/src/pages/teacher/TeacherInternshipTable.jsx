import { Eye, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react";
import StatusBadge from "../../components/common/StatusBadge";
import { approveReview, rejectReview } from "../../services/teacherService";
const TeacherInternshipTable = ({ internships = [], loading, onRefresh }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [remarks, setRemarks] = useState("");

  const handleApproveReview = async (id) => {
    try {
      await approveReview(id, remarks);
      alert("Review approved successfully.");
      setRemarks("");
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectReview = async (id) => {
    try {
      await rejectReview(id, remarks);
      alert("Review rejected successfully.");
      setRemarks("");
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!internships.length)
    return (
      <p className="text-center text-gray-500 py-10">No internships found.</p>
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
          <th className="text-left p-4">Internship Status</th>
          <th className="text-left p-4">Review Status</th>
          <th className="text-center p-4">Action</th>
        </tr>
      </thead>

      <tbody>
        {internships.map((item) => (
          <Fragment key={item._id}>
            <tr key={item._id} className="border-b hover:bg-slate-50">
              <td className="p-4">{item.student?.name}</td>

              <td className="p-4">{item.student?.rollNumber}</td>

              <td className="p-4">
                {item.externalDetails?.companyName || "-"}
              </td>

              <td className="p-4">{item.domain?.domainName || "-"}</td>

              <td className="p-4">{item.internshipType}</td>

              <td className="px-6 py-4">
                <StatusBadge status={item.status} />
              </td>

              <td className="px-6 py-4">
                <StatusBadge
                  status={
                    item.teacherReview?.status
                      ? item.teacherReview.status
                      : "Pending Review"
                  }
                />
              </td>

              <td className="p-4 text-center">
                <button
                  onClick={() =>
                    setExpandedId(expandedId === item._id ? null : item._id)
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
                <td colSpan={8} className="bg-slate-50 p-6">
                  <h3 className="text-xl font-bold mb-4">Internship Details</h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Student Information
                      </h4>

                      <p>
                        <strong>Name:</strong> {item.student?.name}
                      </p>
                      <p>
                        <strong>Roll No:</strong> {item.student?.rollNumber}
                      </p>
                      <p>
                        <strong>Email:</strong> {item.student?.email}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">
                        Internship Information
                      </h4>

                      <p>
                        <strong>Company:</strong>{" "}
                        {item.externalDetails?.companyName}
                      </p>
                      <p>
                        <strong>Domain:</strong> {item.domain?.domainName}
                      </p>
                      <p>
                        <strong>Mode:</strong> {item.externalDetails?.mode}
                      </p>
                      <p>
                        <strong>Stipend:</strong>{" "}
                        {item.externalDetails?.stipend}
                      </p>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Documents</h4>

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
                        {item.completionDocuments?.report?.url && (
                          <>
                            <a
                              href={item.completionDocuments.report.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                            >
                              View Report
                            </a>

                            <a
                              href={item.completionDocuments.report.url}
                              download
                              className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700"
                            >
                              Download Report
                            </a>
                          </>
                        )}

                        {/* Certificate */}
                        {item.completionDocuments?.certificate?.url && (
                          <>
                            <a
                              href={item.completionDocuments.certificate.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                            >
                              View Certificate
                            </a>

                            <a
                              href={item.completionDocuments.certificate.url}
                              download
                              className="px-4 py-2 rounded-lg bg-green-100 text-green-700"
                            >
                              Download Certificate
                            </a>
                          </>
                        )}
                        {item.completionDocuments?.ppt?.url && (
                          <>
                            <a
                              href={item.completionDocuments.ppt.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 rounded-lg bg-orange-600 text-white"
                            >
                              View PPT
                            </a>

                            <a
                              href={item.completionDocuments.ppt.url}
                              download
                              className="px-4 py-2 rounded-lg bg-orange-100 text-orange-700"
                            >
                              Download PPT
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <hr className="my-8" />

                  <div className="mt-6">
                    {item.teacherAssignment?.teacher && (
                      <>
                        <label className="block font-semibold mb-2">
                          Teacher Remarks
                        </label>

                        <textarea
                          rows={4}
                          placeholder="Enter your review remarks..."
                          className="w-full border rounded-lg p-3 mb-4"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                        />

                        <div className="flex gap-4">
                          <button
                            onClick={() => handleApproveReview(item._id)}
                            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                          >
                            Approve Review
                          </button>

                          <button
                            onClick={() => handleRejectReview(item._id)}
                            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                          >
                            Reject Review
                          </button>
                        </div>
                      </>
                    )}

                    {item.teacherReview?.status === "Approved" && (
                      <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-semibold">
                        ✓ Review Approved
                      </span>
                    )}

                    {item.teacherReview?.status === "Rejected" && (
                      <span className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold">
                        ✗ Review Rejected
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherInternshipTable;
