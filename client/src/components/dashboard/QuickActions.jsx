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
    color: "from-blue-600 to-blue-700",
  },
  {
    title: "Add Teacher",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Add Department",
    icon: Building2,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Generate Report",
    icon: FileSpreadsheet,
    color: "from-slate-600 to-slate-700",
  },
  {
    title: "Send Notification",
    icon: Bell,
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Assign Internship",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-600",
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
        shadow-md
        shadow-md
hover:shadow-xl
transition-all
duration-300
        overflow-hidden
      "
    >


      {/* Header */}

      <div
        className="
          px-6
          py-5
          border-b
          min-w-0
          text-center
          border-slate-200
          
        "
      >

       


        <p
          className="
            text-sm
            text-slate-500
            mt-3
            leading-relaxed
            break-words
          "
        >
          Frequently used administrator actions
        </p>


      </div>


{/* Action Buttons */}

<div
  className="
    flex
    flex-wrap
    justify-center
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
          className={`
            bg-gradient-to-r
            ${action.color}
            text-white
            rounded-2xl
            p-5
            h-[140px]
            w-[220px]
            flex
            flex-col
            items-center
            justify-center
            hover:-translate-y-1
            hover:scale-[1.02]
            hover:shadow-xl
            transition-all
            duration-300
          `}
        >

          <Icon size={32}/>

          <h3
            className="
              mt-3
              text-base
              font-bold
              leading-snug
              text-left
            "
          >
            {action.title}
          </h3>

        </button>

      );

    })
  }

</div>


    </div>

  );

};


export default QuickActions;