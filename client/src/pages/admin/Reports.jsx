import {
  Download,
  FileSpreadsheet,
  FileText,
  Users,
  GraduationCap,
  Briefcase,
  FileCheck,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../../services/api";
import ReportTable from "../../components/tables/ReportTable";
import ReportModal from "../../components/common/ReportModal";





const Reports = () => {
  
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("");
const [selectedSession, setSelectedSession] = useState("");
const [selectedStatus, setSelectedStatus] = useState("");
const [stats, setStats] = useState({
  students: 0,
  teachers: 0,
  internships: 0,
  nocs: 0,
});
  const [selectedReport,setSelectedReport]=useState(null);
const [showModal,setShowModal]=useState(false);

const handleView=(report)=>{
    setSelectedReport(report);
    setShowModal(true);
};
  useEffect(() => {
  fetchReports();
}, []);


const fetchReports = async () => {

  try {

    setLoading(true);

    const res = await api.get("/internships");

    console.log("Reports:", res.data);

    
    const internships = res.data.data;

setStats({
  students: new Set(
    internships.map((i) => i.student?._id)
  ).size,

  teachers: new Set(
    internships
      .filter((i) => i.teacherAssignment?.teacher)
      .map((i) => i.teacherAssignment.teacher._id)
  ).size,

  internships: internships.length,

  nocs: internships.filter(
    (i) => i.noc?.status === "Approved"
  ).length,
});

  } catch(error){

    console.error(
      error.response?.data || error
    );

  } finally {

    setLoading(false);

  }

};
const reportCards = [
  {
    title: "Total Students",
    value: stats.students,
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Teachers",
    value: stats.teachers,
    icon: GraduationCap,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Internships",
    value: stats.internships,
    icon: Briefcase,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "NOCs Issued",
    value: stats.nocs,
    icon: FileCheck,
    color: "bg-orange-100 text-orange-600",
  },
];

return (

<div className="space-y-8">


{/* Header */}

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">


<div>

<h1 className="text-3xl font-bold text-slate-800">
Reports & Analytics
</h1>


<p className="text-slate-500 mt-2">
Generate internship reports and analyze records.
</p>

</div>



<div className="flex gap-3 flex-wrap">


<button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl">
<FileText size={18}/>
PDF
</button>


<button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl">
<FileSpreadsheet size={18}/>
Excel
</button>


<button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl">
<Download size={18}/>
CSV
</button>


</div>


</div>





{/* Filters */}

<div className="
bg-white
border
border-slate-200
rounded-2xl
shadow-sm
p-6
">


<div className="grid grid-cols-1 md:grid-cols-4 gap-4">


<select className="border border-slate-300 rounded-xl px-4 py-3">
<option>All Departments</option>
</select>


<select className="border border-slate-300 rounded-xl px-4 py-3">
<option>All Sessions</option>
</select>


<select className="border border-slate-300 rounded-xl px-4 py-3">
<option>All Status</option>
</select>


<button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
Generate
</button>


</div>


</div>





{/* Cards */}

<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
">


{
reportCards.map((item,index)=>{

const Icon=item.icon;


return (

<div
key={index}
className="
bg-white
border
border-slate-200
rounded-2xl
shadow-sm
p-6
"
>


<div className="flex justify-between items-center">


<div>

<p className="text-slate-500 font-medium">
{item.title}
</p>


<h2 className="text-3xl font-bold mt-3">
{item.value}
</h2>

</div>


<div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center`}>
<Icon size={28}/>
</div>


</div>


</div>

);

})
}



</div>





{/* Report Table */}

<div
className="
bg-white
rounded-2xl
border
border-slate-200
shadow-sm
overflow-hidden
"
>


{
 loading ?

 <div className="p-10 text-center">
   Loading Reports...
 </div>

 :

 <ReportTable
  reports={reports}
  onView={handleView}
/>

}


</div>
<ReportModal
  show={showModal}
  report={selectedReport}
  onClose={() => {
    setShowModal(false);
    setSelectedReport(null);
  }}
/>


</div>

);

};


export default Reports;