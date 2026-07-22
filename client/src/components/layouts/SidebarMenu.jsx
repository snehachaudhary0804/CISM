import { NavLink } from "react-router-dom";


const SidebarMenu = ({
  title,
  items,
  collapsed = false,
}) => {

  return (

    <div className="mb-7">


      {!collapsed && (

        <p
          className="
            px-4
            mb-3
            text-xs
            font-bold
            uppercase
            tracking-widest
            text-blue-400
          "
        >
          {title}
        </p>

      )}



      <div className="space-y-2">


        {
          items.map((item)=>{

            const Icon = item.icon;


            return (

              <NavLink
                key={item.name}
                to={item.path}

                className={({isActive})=>

                  `
                  group
                  flex
                  items-center
                  ${
                    collapsed
                    ?
                    "justify-center"
                    :
                    "gap-3"
                  }
                  rounded-3xl
                  px-4
                  py-3
                  transition-all
                  duration-300

                  ${
                    isActive

                    ?

                    "bg-white text-blue-700 shadow-lg"

                    :

                    "text-blue-100 hover:bg-blue-600 hover:text-white"
                  }

                  `
                }
              >


                <Icon
                  className="
                    text-xl
                    flex-shrink-9
                  "
                />



                {
                  !collapsed && (

                    <span
                      className="
                        font-medium
                        text-[15px]
                      "
                    >
                      {item.name}
                    </span>

                  )
                }



              </NavLink>


            );

          })
        }


      </div>


    </div>

  );

};


export default SidebarMenu;