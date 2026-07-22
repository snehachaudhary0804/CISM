import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";


const SidebarProfile = ({
  collapsed = false,
  user = {
    name: "Administrator",
    role: "Admin",
  },
}) => {


return (

<div
className="
border-t
border-blue-600
p-4
"
>


{/* User */}

<div
className={`
flex
${collapsed ? "justify-center" : "items-center gap-3"}
`}
>


<div
className="
w-11
h-11
rounded-full
bg-white 
text-blue-600
flex
items-center
justify-center
text-white
shadow-md
"
>

<FaUserCircle size={25}/>

</div>



{
!collapsed && (

<div className="flex-1 min-w-0">

<h3
className="
text-white
font-bold
truncate
"
>
{user.name}
</h3>


<p
className="
text-xs
text-blue-100
mt-1
"
>
{user.role}
</p>


</div>

)
}


</div>





{/* Actions */}

{
!collapsed && (

<div
className="
mt-4
space-y-2
"
>


<button
className="
w-full
flex
items-center
gap-3
px-4
py-2.5
rounded-xl
text-sm
font-medium
text-blue-100
hover:bg-blue-600
hover:text-white
transition
"
>

<FaCog/>

<span>
Settings
</span>

</button>





<button
className="
w-full
flex
items-center
gap-3
px-4
py-2.5
rounded-xl
text-sm
font-medium
text-red-400
hover:bg-red-500/25
transition
"
>

<FaSignOutAlt/>

<span>
Logout
</span>

</button>



</div>

)
}


</div>


);

};


export default SidebarProfile;