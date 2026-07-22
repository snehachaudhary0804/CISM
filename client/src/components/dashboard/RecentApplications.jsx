import { Eye } from "lucide-react";


const applications = [
  {
    id: 1,
    student: "Sneha Chaudhary",
    company: "Infosys",
    type: "External",
    teacher: "Dr. Sharma",
    status: "Approved",
  },
  {
    id: 2,
    student: "Rahul Kumar",
    company: "TCS",
    type: "External",
    teacher: "Prof. Gupta",
    status: "Pending",
  },
  {
    id: 3,
    student: "Anjali Singh",
    company: "College Lab",
    type: "In-House",
    teacher: "Dr. Verma",
    status: "Rejected",
  },
  {
    id: 4,
    student: "Aman Yadav",
    company: "Wipro",
    type: "External",
    teacher: "Prof. Mishra",
    status: "Approved",
  },
];


const getStatusColor = (status) => {

  switch(status){

    case "Approved":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }

};



const RecentApplications = () => {

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
applications.map((app)=>(

<tr
key={app.id}
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
{app.student}
</td>



<td
className="
px-6
py-5
whitespace-nowrap
"
>
{app.company}
</td>



<td className="px-6 py-5">
{app.type}
</td>



<td className="px-6 py-5 whitespace-nowrap">
{app.teacher}
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