import { useEffect, useState ,Fragment } from "react";
import {
  ChevronDown,
  ChevronUp,
  
} from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import NotificationPanel from "./NotificationPanel";
import ProgressTimeline from "./ProgressTimeline";
import { getStudentInternships } from "../../services/studentService";
import { toast } from "react-hot-toast";
import { getMyNotifications } from "../../services/studentService";
const StudentNotifications = () => {


  const [expandedId, setExpandedId] = useState(null);


const [notifications,setNotifications] = useState([]);
  const [internships, setInternships] = useState([]);
const [loading, setLoading] = useState(true);
const fetchNotifications = async()=>{

 const data = await getMyNotifications();

 console.log("NOTIFICATIONS:", data);

 setNotifications(data || []);

};
useEffect(()=>{

  fetchNotifications();

},[]);
useEffect(()=>{

 console.log("STATE NOTIFICATIONS:", notifications);

},[notifications]);

const fetchInternships = async () => {
  try {
    setLoading(true);

    const res = await getStudentInternships();
    
    setInternships(res.data || []);
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to load internships."
    );
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchInternships();
}, []);
  return (

    <DashboardLayout role="student">


      <div className="space-y-6">



        {/* Header */}

        <div>

          <h1 className="
          text-2xl
          font-bold
          text-slate-800
          ">
            Notifications
          </h1>


          <p className="
          text-slate-500
          mt-1
          ">
            Internship updates and approval notifications
          </p>

        </div>





        {/* Internship Table */}


        <div className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        overflow-hidden
        ">


          <table className="
          w-full
          text-left
          ">


            <thead className="
            bg-slate-50
            border-b
            border-slate-200
            ">


              <tr>


                <th className="p-4 text-sm font-semibold text-slate-600">
                  Company
                </th>


                <th className="p-4 text-sm font-semibold text-slate-600">
                  Domain
                </th>


                <th className="p-4 text-sm font-semibold text-slate-600">
                  Type
                </th>


                <th className="p-4 text-sm font-semibold text-slate-600">
                  Status
                </th>


                <th className="p-4 text-sm font-semibold text-slate-600">
                  Action
                </th>


              </tr>


            </thead>




            <tbody>


              {
                internships.map((internship)=>(

                  <Fragment key={internship._id}>

                  <tr
                
                  className="
                  border-b
                  border-slate-100
                  hover:bg-slate-50
                  "
                  >


                    <td className="
                    p-4
                    font-medium
                    text-slate-800
                    ">
                      {internship.internshipType === "External"
                              ? internship.externalDetails?.companyName
                              : internship.inHouseDetails?.projectTitle}
                    </td>



                    <td className="p-4 text-slate-600">
                        {internship.domain?.domainName}
                    </td>



                    <td className="p-4 text-slate-600">
                     {internship.internshipType}
                    </td>




                    <td className="p-4">


                      <span
                      className="
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      bg-blue-100
                      text-blue-700
                      "
                      >

                        {internship.status}

                      </span>


                    </td>





                    <td className="p-4">


                      <button
                      onClick={()=>
                        setExpandedId(
                          expandedId === internship._id
                          ? null
                          : internship._id
                        )
                      }

                      className="
                      flex
                      items-center
                      gap-2
                      text-blue-600
                      font-medium
                      "
                      >

                        View

                        {
                          expandedId === internship._id
                          ?
                          <ChevronUp size={18}/>
                          :
                          <ChevronDown size={18}/>
                        }


                      </button>


                    </td>



                  </tr>





                  {
                    expandedId === internship._id && (

                      <tr>


                        <td
                        colSpan="5"
                        className="
                        bg-slate-50
                        p-6
                        "
                        >


                          <div className="
                          space-y-6
                          ">



                            {/* Internship Progress */}

                            <div>

                              <h2 className="
                              font-semibold
                              text-slate-800
                              mb-3
                              ">
                                Internship Progress
                              </h2>


                             <ProgressTimeline
   internship={internship}
/>


                            </div>






                            {/* Notifications */}

                            <div>

                              <h2 className="
                              font-semibold
                              text-slate-800
                              mb-3
                              ">
                                Notifications
                              </h2>

                              <NotificationPanel
  notifications={notifications}
/>


                            </div>



                          </div>


                        </td>


                      </tr>

                    )
                  }




                  </Fragment>

                ))
              }


            </tbody>


          </table>



        </div>



      </div>


    </DashboardLayout>

  );

};


export default StudentNotifications;