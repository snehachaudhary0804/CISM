import {
  UserPlus,
  GraduationCap,
  Building2,
  FileSpreadsheet,
  Bell,
  Briefcase,
} from "lucide-react";


const actions = [
  {
    title: "Add Student",
    icon: UserPlus,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Add Teacher",
    icon: GraduationCap,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Add Department",
    icon: Building2,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Generate Report",
    icon: FileSpreadsheet,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Send Notification",
    icon: Bell,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    title: "Assign Internship",
    icon: Briefcase,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
];

const QuickActions = () => {

  return (

    <div
     className="
bg-white
rounded-2xl
border
border-slate-200
p-6
shadow-md
hover:shadow-xl
transition-all
duration-300
"
    >


      {/* Header */}

     <h2 className="text-xl font-extrabold text-slate-800">
  Quick Actions
</h2>

<p className="text-sm text-slate-500 mt-1 mb-6">
  Frequently used administrator actions
</p>
{/* Action Buttons */}

<div
  className="
   grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-5
    p-6
  "
>
  {
    actions.map((action,index)=>{

      const Icon = action.icon;

      return (
<button
                key={index}
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-3
                  p-5
                  rounded-xl
                  bg-slate-50
                  hover:bg-slate-100
                  transition
                "
              >

                <div
                  className={`
                    ${action.color}
                    p-3
                    rounded-xl
                  `}
                >

                  <Icon size={25}/>

                </div>


                <span
                  className="
                    text-sm
                    font-bold
                    text-slate-700
                    text-center
                  "
                >
                  {action.title}
                </span>


              </button>

      );

    })
  }

</div>


    </div>

  );

};


export default QuickActions;