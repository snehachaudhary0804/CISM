import {
  CheckCircle,
  Circle,
} from "lucide-react";


const ProgressTimeline = ({ steps = [] }) => {


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
        h-full
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
        Internship Progress
      </h2>



      <div className="space-y-6">

        {steps.map((step, index) => (

          <div
            key={index}
            className="
              flex
              items-start
              gap-4
            "
          >

            {/* Icon */}

            <div>

              {
                step.completed ?

                (
                  <CheckCircle
                    size={28}
                    className="text-green-600"
                  />
                )

                :

                (
                  <Circle
                    size={28}
                    className="text-slate-400"
                  />
                )

              }

            </div>



            {/* Line + Text */}

            <div
              className="
                flex-1
                border-b
                border-slate-100
                pb-4
              "
            >

              <h3
                className="
                  font-bold
                  text-slate-800
                "
              >
                {step.title}
              </h3>


              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                "
              >
                {step.description}
              </p>


            </div>


          </div>

        ))}

      </div>


    </div>
  
  );
};


export default ProgressTimeline;