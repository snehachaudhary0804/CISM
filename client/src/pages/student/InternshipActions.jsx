import {
  Upload,
  Download,
  Clock,
  CheckCircle,
} from "lucide-react";


const InternshipActions = ({ internship }) => {


  const offerUploaded =
    !!internship.externalDetails?.offerLetter;


  const internshipApproved =
  internship.status === "Approved" ||
  internship.status === "Internship Ongoing" ||
  internship.status === "Completion Submitted" ||
  internship.status === "Completed";

const nocIssued =
  internship.noc?.status === "Issued";

const teacherAssigned =
  !!internship.teacherAssignment?.teacher;

const reportUploaded =
  !!internship.completionDocuments?.report?.url;

const certificateUploaded =
  !!internship.completionDocuments?.certificate?.url;

const pptUploaded =
  !!internship.completionDocuments?.ppt?.url;

  return (

    <div className="flex flex-wrap gap-3 mt-6">


      {/* STEP 1 : Upload Offer Letter */}
      {!offerUploaded && (

        <button
          className="
          flex items-center gap-2
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4 py-2
          rounded-lg
          "
        >
          <Upload size={17}/>
          Upload Offer Letter
        </button>

      )}



      {/* STEP 2 : Waiting for approval */}

    {offerUploaded && !internshipApproved && (
  <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg flex items-center gap-2">
    <Clock size={16} />
    Waiting for Admin Approval
  </div>
)}
{internshipApproved && !nocIssued && (
  <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
    <Clock size={16} />
    Waiting for NOC Generation
  </div>
)}

   {nocIssued && !teacherAssigned && (
  <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2">
    <Clock size={16} />
    Waiting for Teacher Assignment
  </div>
)}
      {/* STEP 3 : Download NOC */}

      {nocIssued && (

        <button
          className="
          flex items-center gap-2
          bg-green-600
          hover:bg-green-700
          text-white
          px-4 py-2
          rounded-lg
          "
        >

          <Download size={17}/>

          Download NOC

        </button>

      )}


{teacherAssigned &&
 internship.status === "Internship Ongoing" && (
  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
    <CheckCircle size={16} />
    Internship Ongoing
  </div>
)}
      {/* STEP 4 : Upload completion documents */}

      {nocIssued && (

        <>


        {!reportUploaded && (

          <button
          className="
          flex items-center gap-2
          bg-indigo-600
          text-white
          px-4 py-2
          rounded-lg
          "
          >

          <Upload size={17}/>
          Upload Report

          </button>

        )}



        {!certificateUploaded && (

          <button
          className="
          flex items-center gap-2
          bg-purple-600
          text-white
          px-4 py-2
          rounded-lg
          "
          >

          <Upload size={17}/>
          Upload Certificate

          </button>

        )}



        {!pptUploaded && (

          <button
          className="
          flex items-center gap-2
          bg-orange-600
          text-white
          px-4 py-2
          rounded-lg
          "
          >

          <Upload size={17}/>
          Upload PPT

          </button>

        )}

        </>

      )}




      {/* All completed */}

      {
        reportUploaded &&
        certificateUploaded &&
        pptUploaded &&

        <div
        className="
        flex items-center gap-2
        bg-green-100
        text-green-700
        px-4 py-2
        rounded-lg
        "
        >

        <CheckCircle size={17}/>

        Documents Submitted

        </div>


      }
      {internship.status === "Completed" && (
  <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg flex items-center gap-2">
    <CheckCircle size={16} />
    Internship Completed
  </div>
)}


    </div>

  );

};


export default InternshipActions;