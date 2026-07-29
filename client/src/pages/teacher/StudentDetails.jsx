import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  FileText,
  Download,
} from "lucide-react";

import { getStudentDetails } from "../services/teacherService";

const StudentDetails = () => {

  const { studentId } = useParams();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {

      const response = await getStudentDetails(studentId);

      setInternship(response.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }
const handleApprove = async () => {
  try {
    await approveInternship(internship._id);

    toast.success("Internship Approved");

    fetchStudent();

  } catch (error) {
    console.log(error);
  }
};

const handleReject = async () => {
  try {

    const remarks = prompt("Enter rejection remarks");

    if (!remarks) return;

    await rejectInternship(
      internship._id,
      remarks
    );

    toast.success("Internship Rejected");

    fetchStudent();

  } catch (error) {
    console.log(error);
  }
};
  const student = internship.student;

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Student Details
      </h1>

      {/* Student Info */}

      <div className="bg-white rounded-xl border shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-5">
          Student Information
        </h2>

        <div className="grid grid-cols-2 gap-5">

          <Info
            label="Name"
            value={student.name}
          />

          <Info
            label="Roll Number"
            value={student.rollNumber}
          />

          <Info
            label="Email"
            value={student.email}
          />

          <Info
            label="Department"
            value={internship.department?.departmentName}
          />

          <Info
            label="Semester"
            value={student.semester}
          />

          <Info
            label="Session"
            value={internship.academicSession?.sessionName}
          />

        </div>

      </div>

      {/* Internship */}

      <div className="bg-white rounded-xl border shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-5">
          Internship Information
        </h2>

        <div className="grid grid-cols-2 gap-5">

          <Info
            label="Company"
            value={internship.externalDetails?.companyName}
          />

          <Info
            label="Domain"
            value={internship.domain?.domainName}
          />

          <Info
            label="Type"
            value={internship.internshipType}
          />

          <Info
            label="Mode"
            value={internship.externalDetails?.mode}
          />

          <Info
            label="Stipend"
            value={internship.externalDetails?.stipend}
          />

          <Info
            label="Status"
            value={internship.status}
          />

        </div>

      </div>

      {/* Offer Letter */}

      <div className="bg-white rounded-xl border shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-4">
          Offer Letter
        </h2>

        <div className="flex gap-4">

          <a
            href={internship.externalDetails?.offerLetter}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2"
          >
            <FileText size={18} />
            View
          </a>

          <a
            href={internship.externalDetails?.offerLetter}
            download
            className="px-4 py-2 rounded-lg bg-green-600 text-white flex items-center gap-2"
          >
            <Download size={18} />
            Download
          </a>

        </div>

      </div>

      {/* Actions */}

      <div className="flex flex-wrap gap-4">

        <button
        onClick={handleApprove}
        className="flex items-center gap-2 px-5 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700">

          <CheckCircle size={18} />

          Approve Internship

        </button>

        <button 
        onClick={handleReject}
        className="flex items-center gap-2 px-5 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700">

          <XCircle size={18} />

          Reject Internship

        </button>

        <button className="flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">

          <FileText size={18} />

          Upload / Generate NOC

        </button>

      </div>

    </div>

  );

};

const Info = ({
  label,
  value,
}) => (
  <div>
    <p className="text-sm text-slate-500">
      {label}
    </p>

    <p className="font-semibold text-slate-800">
      {value || "-"}
    </p>
  </div>
);

export default StudentDetails;