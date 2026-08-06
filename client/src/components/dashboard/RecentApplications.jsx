import { Eye } from "lucide-react";


const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    case "Teacher Assigned":
      return "bg-blue-100 text-blue-700";

    case "Completion Submitted":
      return "bg-purple-100 text-purple-700";

    case "NOC Approved":
      return "bg-emerald-100 text-emerald-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
};
const RecentApplications = ({ internships = [] }) => {

return (

<div
className="
bg-white
rounded-2xl
border
border-slate-200
shadow-md
 hover:shadow-xl transition-all duration-300
overflow-hidden
"
>


{/* Header */}

<div
className="
relative
flex
items-center
justify-between
gap-4
px-6
py-5
border-b
border-slate-200

"
>


<div  className="text-center w-full ">




<p
className="
mt-2
text-sm
text-slate-500



"
>
Latest submitted internship records
</p>


</div>



<button
className="
px-4
py-2
rounded-xl
bg-blue-50
text-blue-600
font-semibold
hover:bg-blue-100
transition
"
>
View All
</button>


</div>




{/* Table */}

<div className="overflow-x-auto px-2">


<table className="w-full min-w-[750px]">


<thead>

<tr
className="
text-left
text-sm
font-bold
text-slate-500
uppercase 
tracking-wide
"
>

<th className="px-6 py-4">
Student
</th>

<th className="px-6 py-4">
Company
</th>

<th className="px-6 py-4">
Type
</th>

<th className="px-6 py-4">
Teacher
</th>

<th className="px-6 py-4">
Status
</th>

<th className="px-6 py-4 text-center">
Action
</th>


</tr>

</thead>



<tbody>


{
internships.map((app)=>(

<tr
key={app._id}
className="
border-t
border-slate-100
hover:bg-blue-50
transition
"
>


<td
className="
px-6
py-5
font-semibold
text-slate-800
whitespace-nowrap
"
>
{app.student?.name}
</td>



<td
className="
px-6
py-5
whitespace-nowrap
"
>
{app.externalDetails?.companyName || "-"}
</td>



<td className="px-6 py-5">
{app.internshipType}
</td>



<td className="px-6 py-5 whitespace-nowrap">
{app.teacherAssignment?.teacher?.name || "Not Assigned"}
</td>



<td className="px-6 py-5">

<span
className={`
px-3
py-1
rounded-full
text-xs
font-bold
${getStatusColor(app.status)}
`}
>
{app.status}
</span>

</td>



<td className="px-6 py-5 text-center">


<button
className="
p-2
rounded-lg
hover:bg-blue-100
transition
"
>

<Eye
size={19}
className="text-blue-600"
/>

</button>


</td>



</tr>


))
}


</tbody>


</table>


</div>



</div>

);

};


export default RecentApplications;