import {
  Eye,
  Upload,
  Download,
  User,
} from "lucide-react";


const StudentQuickActions = () => {

  const actions = [
    {
      title:"View Internship",
      icon:Eye,
      color:"bg-blue-100 text-blue-600",
    },
    {
      title:"Upload Documents",
      icon:Upload,
      color:"bg-green-100 text-green-600",
    },
    {
      title:"Download NOC",
      icon:Download,
      color:"bg-purple-100 text-purple-600",
    },
    {
      title:"Update Profile",
      icon:User,
      color:"bg-orange-100 text-orange-600",
    },
  ];


  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-6
        shadow-md
      "
    >

      <h2
        className="
          text-xl
          font-extrabold
          text-slate-800
          mb-6
        "
      >
        Quick Actions
      </h2>


      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
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


export default StudentQuickActions;