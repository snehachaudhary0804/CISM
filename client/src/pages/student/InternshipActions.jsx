import {
  Upload,
  Download,
  Clock,
  CheckCircle,
} from "lucide-react";


const InternshipActions = ({ internship }) => {


  const offerUploaded =
    !!internship.externalDetails?.offerLetter;


  const nocApproved =
    internship.noc?.status === "Approved" &&
    internship.noc?.nocFile;


  const reportUploaded =
    !!internship.documents?.internshipReport;


  const certificateUploaded =
    !!internship.documents?.completionCertificate;


  const pptUploaded =
    !!internship.documents?.presentation;



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

      {offerUploaded && !nocApproved && (

        <div
          className="
          flex items-center gap-2
          bg-yellow-100
          text-yellow-700
          px-4 py-2
          rounded-lg
          "
        >

          <Clock size={17}/>

          Waiting for Teacher Approval

        </div>

      )}



      {/* STEP 3 : Download NOC */}

      {nocApproved && (

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



      {/* STEP 4 : Upload completion documents */}

      {nocApproved && (

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


    </div>

  );

};


export default InternshipActions;