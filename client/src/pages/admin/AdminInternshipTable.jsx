import { Eye, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, Fragment } from "react";
import StatusBadge from "../../components/common/StatusBadge";

import {
  approveInternship,
  rejectInternship,
  completeInternship,
  getAllTeachers,
  assignTeacher,
} from "../../services/adminService";

const AdminInternshipTable = ({
  internships = [],
  loading,
  onRefresh,
}) => {
  const [expandedId, setExpandedId] = useState(null);

  const [showAssignModal, setShowAssignModal] =
    useState(false);

  const [selectedInternship, setSelectedInternship] =
    useState(null);

  const [teachers, setTeachers] = useState([]);

  const [teacherId, setTeacherId] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await getAllTeachers();
      setTeachers(res.teachers || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveInternship(id);

      alert("Internship approved successfully.");

      onRefresh();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Approval failed"
      );
    }
  };

  const handleReject = async (id) => {
    const remarks = prompt(
      "Enter rejection remarks"
    );

    if (remarks === null) return;

    try {
      await rejectInternship(id, remarks);

      alert("Internship rejected.");

      onRefresh();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Rejection failed"
      );
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeInternship(id);

      alert("Internship completed.");

      onRefresh();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Completion failed"
      );
    }
  };

  const handleAssignTeacher = async () => {
    try {
      await assignTeacher({
        studentId: selectedInternship.student._id,
        teacherId,
      });

      alert("Teacher Assigned Successfully");

      setShowAssignModal(false);
      setTeacherId("");

      onRefresh();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Assignment Failed"
      );
    }
  };

  if (loading)
    return <p>Loading...</p>;

  if (!internships.length)
    return (
      <p className="text-center py-10 text-gray-500">
        No internships found.
      </p>
    );

  return (
    <>
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[420px]">

            <h2 className="text-xl font-bold mb-5">
              Assign Teacher
            </h2>

            <select
              value={teacherId}
              onChange={(e) =>
                setTeacherId(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            >
              <option value="">
                Select Teacher
              </option>

              {teachers.map((teacher) => (
                <option
                  key={teacher._id}
                  value={teacher._id}
                >
                  {teacher.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setShowAssignModal(false)
                }
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAssignTeacher}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Assign
              </button>

            </div>
          </div>
        </div>
      )}

      <table className="w-full">

        <thead className="bg-slate-100 border-b">

          <tr>

            <th className="p-4 text-left">
              Student
            </th>

            <th className="p-4 text-left">
              Roll No
            </th>

            <th className="p-4 text-left">
              Company
            </th>

            <th className="p-4 text-left">
              Domain
            </th>

            <th className="p-4 text-left">
              Type
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {internships.map((item) => (

            <Fragment key={item._id}>

              <tr className="border-b hover:bg-slate-50">

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
                  <StatusBadge
                    status={item.status}
                  />
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
                    <h3 className="text-xl font-bold mb-6">
                      Internship Details
                    </h3>

                    <div className="grid grid-cols-2 gap-8">

                      <div>
                        <h4 className="font-semibold mb-3">
                          Student Information
                        </h4>

                        <p>
                          <strong>Name:</strong>{" "}
                          {item.student?.name}
                        </p>

                        <p>
                          <strong>Roll No:</strong>{" "}
                          {item.student?.rollNumber}
                        </p>

                        <p>
                          <strong>Email:</strong>{" "}
                          {item.student?.email}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">
                          Internship Information
                        </h4>

                        <p>
                          <strong>Company:</strong>{" "}
                          {item.externalDetails?.companyName}
                        </p>

                        <p>
                          <strong>Domain:</strong>{" "}
                          {item.domain?.domainName}
                        </p>

                        <p>
                          <strong>Mode:</strong>{" "}
                          {item.externalDetails?.mode}
                        </p>

                        <p>
                          <strong>Stipend:</strong>{" "}
                          ₹{item.externalDetails?.stipend || 0}
                        </p>
                      </div>

                    </div>

                    <hr className="my-8" />

                    <h4 className="font-semibold mb-4">
                      Documents
                    </h4>

                    <div className="flex gap-3 flex-wrap">

                      {item.externalDetails?.offerLetter && (
                        <a
                          href={item.externalDetails.offerLetter}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Offer Letter
                        </a>
                      )}

                      {item.completionDocuments?.report?.url && (
                        <a
                          href={item.completionDocuments.report.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                        >
                          Report
                        </a>
                      )}

                      {item.completionDocuments?.certificate?.url && (
                        <a
                          href={item.completionDocuments.certificate.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                        >
                          Certificate
                        </a>
                      )}

                      {item.completionDocuments?.ppt?.url && (
                        <a
                          href={item.completionDocuments.ppt.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                        >
                          PPT
                        </a>
                      )}

                    </div>

                    <hr className="my-8" />

                    <div className="flex gap-4 flex-wrap">

                      {item.status === "Applied" && (
                        <>
                          <button
                            onClick={() =>
                              handleApprove(item._id)
                            }
                            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                          >
                            Approve Internship
                          </button>

                          <button
                            onClick={() =>
                              handleReject(item._id)
                            }
                            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                          >
                            Reject Internship
                          </button>
                        </>
                      )}

                      {item.status === "NOC Approved" && (
                        <button
                          className="px-5 py-2 rounded-lg bg-blue-600 text-white"
                        >
                          Generate NOC
                        </button>
                      )}

                      {item.status ===
                        "Completion Submitted" && (
                        <button
                          onClick={() => {
                            setSelectedInternship(
                              item
                            );
                            setShowAssignModal(
                              true
                            );
                          }}
                          className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                          Assign Teacher
                        </button>
                      )}

                      {item.status ===
                        "Teacher Assigned" && (
                        <span className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold">
                          Teacher Assigned
                        </span>
                      )}

                      {item.teacherReview
                        ?.status ===
                        "Approved" &&
                        item.status ===
                          "Teacher Assigned" && (
                          <button
                            onClick={() =>
                              handleComplete(
                                item._id
                              )
                            }
                            className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                          >
                            Complete Internship
                          </button>
                        )}

                      {item.status ===
                        "Completed" && (
                        <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-semibold">
                          Internship Completed
                        </span>
                      )}

                      {item.status ===
                        "Rejected" && (
                        <span className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold">
                          Internship Rejected
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

    </>
  );
};

export default AdminInternshipTable;