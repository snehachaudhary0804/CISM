import {
  Bell,
  CheckCircle,
  Clock,
} from "lucide-react";




const NotificationPanel = ({
  notifications = [],
  onRead,
}) => {
  console.log("PANEL RECEIVED:", notifications);
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
      {/* Header */}
      <div
        className="
           
          flex
          items-center
          justify-between
          mb-6
        "
      >

        <h2
          className="
          
            text-xl
            font-extrabold
            text-slate-800
          "
        >
          Notifications
        </h2>


        <div
          className="
            bg-blue-100
            text-blue-600
            p-3
            rounded-xl
          "
        >
          <Bell size={22}/>
        </div>

      </div>



      {/* Notifications */}

      <div className="space-y-4">


        {
          notifications.length === 0 ?

          (
            <p className="text-slate-500 text-center">
              No notifications available
            </p>
          )

          :

          notifications.map((notification)=>(

            <div
              key={notification._id}
              className="
                flex
                gap-4
                items-start
                p-4
                rounded-xl
                bg-white
              "
            >

              <div>

                {
                  notification.isRead

                  ?

                  <CheckCircle
                    size={22}
                    className="text-green-600"
                  />

                  :

                  <Clock
                    size={22}
                    className="text-orange-500"
                  />

                }

              </div>


              <div>

                <h3
                  className="
                    font-semibold
                    text-slate-800
                  "
                >
                  {notification.title}
                </h3>


                <p
                  className="
                    text-sm
                    text-slate-500
                    mt-1
                  "
                >
                  {notification.message}
                </p>


              </div>


            </div>

          ))

        }


      </div>


    </div>
  );
};


export default NotificationPanel;