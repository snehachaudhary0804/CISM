const ReportModal = ({
  show,
  onClose,
  report,
}) => {

  if (!show || !report) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-2xl font-bold text-slate-800">
            Internship Report Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-red-500"
          >
            ×
          </button>

        </div>


        {/* Body */}
        <div className="space-y-5 p-6">


          <div>
            <p className="text-sm text-slate-500">
              Student
            </p>

            <p className="font-semibold">
              {report.student?.name}
            </p>
          </div>


          <div>
            <p className="text-sm text-slate-500">
              Roll Number
            </p>

            <p className="font-semibold">
              {report.student?.rollNumber}
            </p>
          </div>


          <div>
            <p className="text-sm text-slate-500">
              Department
            </p>

            <p className="font-semibold">
              {report.department?.departmentName}
            </p>
          </div>


          <div>
            <p className="text-sm text-slate-500">
              Company
            </p>

            <p className="font-semibold">
              {report.externalDetails?.companyName}
            </p>
          </div>


          <div>
            <p className="text-sm text-slate-500">
              Domain
            </p>

            <p className="font-semibold">
              {report.domain?.domainName}
            </p>
          </div>


          <div className="grid grid-cols-2 gap-4">


            <div>
              <p className="text-sm text-slate-500">
                Teacher
              </p>

              <p className="font-semibold">
                {
                report.teacherAssignment?.teacher?.name || "-"
                }
              </p>
            </div>



            <div>
              <p className="text-sm text-slate-500">
                Status
              </p>

              <p className="font-semibold">
                {report.status}
              </p>
            </div>


          </div>


          <div>
            <p className="text-sm text-slate-500">
              NOC Status
            </p>

            <p className="font-semibold">
              {report.noc?.status}
            </p>
          </div>



          {
            report.externalDetails?.offerLetter &&
            <a
              href={report.externalDetails.offerLetter}
              target="_blank"
              className="text-blue-600 underline"
            >
              View Offer Letter
            </a>
          }


        </div>



        {/* Footer */}
        <div className="flex justify-end border-t p-5">

          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Close
          </button>

        </div>


      </div>

    </div>
  );
};


export default ReportModal;