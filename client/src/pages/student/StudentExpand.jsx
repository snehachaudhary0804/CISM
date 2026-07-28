import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  IndianRupee,
  CalendarDays,
  BriefcaseBusiness,
  FileText,
  Download,
  Upload,
  Eye,
} from "lucide-react";
import { uploadOfferLetter,uploadCompletionDocument } from "../../services/studentService";
import { useState } from "react";
import { toast } from "react-hot-toast";
import InternshipActions from "./InternshipActions";



const InternshipExpanded = ({ internship }) => {
   const [uploading, setUploading] = useState(false);
   const handleOfferLetterUpload = async (e) => {
   const file = e.target.files[0];

  if (!file) return;

  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("offerLetter", file);

    const res = await uploadOfferLetter(
      internship._id,
      formData
    );

    toast.success(res.message);

    // We'll refresh the table in the next step

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Upload Failed"
    );
  } finally {
    setUploading(false);
  }
};

const handleCompletionUpload = async (
  e,
  documentType
) => {

  const file = e.target.files[0];

  if (!file) return;

  try {

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("documentType", documentType);

    const res =
      await uploadCompletionDocument(
        internship._id,
        formData
      );

    toast.success(res.message);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Upload Failed"
    );

  } finally {

    setUploading(false);

  }

};
  const details =
  internship.internshipType === "External"
    ? internship.externalDetails
    : internship.inHouseDetails;
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Company Details */}
      <div className="bg-white border rounded-xl p-5">
        <h3 className="font-bold text-slate-800 mb-4">
          Company Details
        </h3>

        <p>
          <span className="font-semibold">Company:</span>{" "}
          {internship.externalDetails?.companyName || "N/A"}
        </p>

        <p>
          <span className="font-semibold">HR Name:</span>{" "}
          {internship.externalDetails?.hrName || "N/A"}
        </p>

        <p>
          <span className="font-semibold">HR Email:</span>{" "}
          {internship.externalDetails?.hrEmail || "N/A"}
        </p>

        <p>
          <span className="font-semibold">Mode:</span>{" "}
          {internship.externalDetails?.mode}
        </p>
      </div>


      {/* Teacher Details */}
      <div className="bg-white border rounded-xl p-5">

        <h3 className="font-bold text-slate-800 mb-4">
          Teacher Details
        </h3>

        <p>
          <span className="font-semibold">Teacher:</span>{" "}
          {internship.teacherAssignment?.teacher?.name || "Not Assigned"}
        </p>

        <p>
          <span className="font-semibold">Review:</span>{" "}
          {internship.teacherReview?.status || "Pending"}
        </p>

        <p>
          <span className="font-semibold">Remark:</span>{" "}
          {internship.teacherReview?.remarks || "N/A"}
        </p>

      </div>


      {/* NOC */}
      <div className="bg-white border rounded-xl p-5">

        <h3 className="font-bold text-slate-800 mb-4">
          NOC Details
        </h3>

        <p>
          <span className="font-semibold">Status:</span>{" "}
          {internship.noc?.status}
        </p>

        <p>
          <span className="font-semibold">Remark:</span>{" "}
          {internship.noc?.remark || "N/A"}
        </p>

      </div>


      {/* Documents */}
       <div className="bg-white border rounded-xl p-5">

  <h3 className="font-bold text-slate-800 mb-4">
    Documents
  </h3>

  {/* Offer Letter */}

  <div className="flex justify-between items-center py-2 border-b">

    <span>Offer Letter</span>

    {internship.externalDetails?.offerLetter ? (

      <a
        href={internship.externalDetails.offerLetter}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 font-medium"
      >
        View
      </a>

    ) : (

      <span className="text-red-500">
        Not Uploaded
      </span>

    )}

  </div>

  {/* Report */}

  <div className="flex justify-between items-center py-2 border-b">

    <span>Internship Report</span>

    {internship.completionDocuments?.report?.url ? (

      <a
        href={internship.completionDocuments.report.url}
        target="_blank"
        rel="noreferrer"
        className="text-green-600 font-medium"
      >
        Uploaded
      </a>

    ) : (

      <label className="cursor-pointer text-blue-600">

        Upload

        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) =>
            handleCompletionUpload(e, "report")
          }
        />

      </label>

    )}

  </div>

  {/* Certificate */}

  <div className="flex justify-between items-center py-2 border-b">

    <span>Completion Certificate</span>

    {internship.completionDocuments?.certificate?.url ? (

      <a
        href={internship.completionDocuments.certificate.url}
        target="_blank"
        rel="noreferrer"
        className="text-green-600 font-medium"
      >
        Uploaded
      </a>

    ) : (

      <label className="cursor-pointer text-blue-600">

        Upload

        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) =>
            handleCompletionUpload(e, "certificate")
          }
        />

      </label>

    )}

  </div>

  {/* PPT */}

  <div className="flex justify-between items-center py-2">

    <span>Presentation (PPT)</span>

    {internship.completionDocuments?.ppt?.url ? (

      <a
        href={internship.completionDocuments.ppt.url}
        target="_blank"
        rel="noreferrer"
        className="text-green-600 font-medium"
      >
        Uploaded
      </a>

    ) : (

      <label className="cursor-pointer text-blue-600">

        Upload

        <input
          type="file"
          accept=".ppt,.pptx,.pdf"
          className="hidden"
          onChange={(e) =>
            handleCompletionUpload(e, "ppt")
          }
        />

      </label>

    )}

  </div>

</div>
      <div className="md:col-span-2">
        <InternshipActions internship={internship} />
      </div>
    </div>
  );
};

export default InternshipExpanded;