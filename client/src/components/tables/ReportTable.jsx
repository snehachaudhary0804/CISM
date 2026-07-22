import {
  Eye,
  Download,
} from "lucide-react";


const ReportTable = ({ reports }) => {


  if (!reports?.length) {
    return (
      <div className="flex justify-center py-16 text-slate-500 font-medium">
        No report records found.
      </div>
    );
  }



  const statusBadge = (status) => {

    if (status === "Approved") {
      return (
        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Approved
        </span>
      );
    }


    if (status === "Pending") {
      return (
        <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          Pending
        </span>
      );
    }


    return (
      <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Rejected
      </span>
    );

  };



  const nocBadge = (status) => {

    if(status === "Issued"){

      return (
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Issued
        </span>
      );

    }


    return (
      <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
        Pending
      </span>
    );

  };




  return (

    <div className="overflow-x-auto">


      <table className="w-full min-w-[1400px]">


        <thead className="bg-blue-50 border-b border-blue-100">


          <tr>


            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Student
            </th>


            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Roll No
            </th>


            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Department
            </th>


            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Company
            </th>


            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Domain
            </th>


            <th className="px-6 py-4 text-left text-sm font-bold uppercase text-blue-700">
              Teacher
            </th>


            <th className="px-6 py-4 text-center text-sm font-bold uppercase text-blue-700">
              Type
            </th>


            <th className="px-6 py-4 text-center text-sm font-bold uppercase text-blue-700">
              Status
            </th>


            <th className="px-6 py-4 text-center text-sm font-bold uppercase text-blue-700">
              NOC
            </th>


            <th className="px-6 py-4 text-center text-sm font-bold uppercase text-blue-700">
              Action
            </th>


          </tr>


        </thead>




        <tbody>


        {
          reports.map((report,index)=>(


            <tr
              key={report._id}
              className={`
                border-t
                border-slate-200
                hover:bg-blue-50
                transition-colors
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
              `}
            >


              <td className="px-6 py-4 font-semibold">
                {report.student?.name || "-"}
              </td>


              <td className="px-6 py-4">
                {report.student?.rollNumber || "-"}
              </td>


              <td className="px-6 py-4">
                {report.department?.departmentName || "-"}
              </td>


              <td className="px-6 py-4">
                {report.externalDetails?.companyName || "-"}
              </td>


              <td className="px-6 py-4">
                {report.domain?.domainName || "-"}
              </td>


              <td className="px-6 py-4">
                {report.teacher?.name || "-"}
              </td>


              <td className="px-6 py-4 text-center">

                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {report.internshipType}
                </span>

              </td>


              <td className="px-6 py-4 text-center">
                {statusBadge(report.status)}
              </td>


              <td className="px-6 py-4 text-center">
                {nocBadge(report.noc)}
              </td>



              <td className="px-6 py-4">

                <div className="flex justify-center gap-2">


                  <button
                    className="
                    rounded-lg
                    bg-blue-100
                    p-2
                    text-blue-700
                    hover:bg-blue-200
                    transition
                    "
                  >
                    <Eye size={17}/>
                  </button>



                  <button
                    className="
                    rounded-lg
                    bg-green-100
                    p-2
                    text-green-700
                    hover:bg-green-200
                    transition
                    "
                  >
                    <Download size={17}/>
                  </button>


                </div>


              </td>


            </tr>


          ))
        }


        </tbody>



      </table>


    </div>

  );

};


export default ReportTable;