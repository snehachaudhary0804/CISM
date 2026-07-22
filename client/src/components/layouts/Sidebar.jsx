import { useState } from "react";
import { FaBars } from "react-icons/fa";

import {
  FaTachometerAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaBuilding,
  FaLayerGroup,
  FaLaptopCode,
  FaCalendarAlt,
  FaChartBar,
  FaBell,
} from "react-icons/fa";

import SidebarMenu from "./SidebarMenu";
import SidebarProfile from "./SidebarProfile";


const mainMenu = [
  {
    name:"Dashboard",
    path:"/admin/dashboard",
    icon:FaTachometerAlt,
  },
];


const managementMenu = [
  {
    name:"Students",
    path:"/admin/students",
    icon:FaUsers,
  },
  {
    name:"Teachers",
    path:"/admin/teachers",
    icon:FaChalkboardTeacher,
  },
  {
    name:"Departments",
    path:"/admin/departments",
    icon:FaBuilding,
  },
  {
    name:"Sections",
    path:"/admin/sections",
    icon:FaLayerGroup,
  },
  {
    name:"Domains",
    path:"/admin/domains",
    icon:FaLaptopCode,
  },
  {
    name:"Sessions",
    path:"/admin/sessions",
    icon:FaCalendarAlt,
  },
];


const analyticsMenu = [
  {
    name:"Reports",
    path:"/admin/reports",
    icon:FaChartBar,
  },
];


const systemMenu = [
  {
    name:"Notifications",
    path:"/admin/notifications",
    icon:FaBell,
  },
];



const Sidebar = () => {

const [collapsed,setCollapsed] = useState(false);


return (

<aside
className={`
${collapsed ? "w-24" : "w-64"}
transition-all
duration-300
bg-blue-700
text-white
flex
flex-col
border-r
border-blue-600
shadow-xl
`}
>


{/* Logo */}

<div
className="
h-20
border-b
border-slate-600
flex
items-center
justify-between
px-5
"
>


{
!collapsed && (

<div>

<h1
className="
text-3xl
font-black
font-extrabold
tracking-wide
text-white
"
>
CISM
</h1>


<p
className="
text-xs
text-blue-100
mt-1
"
>
Internship Portal
</p>


</div>

)
}



<button
onClick={()=>setCollapsed(!collapsed)}
className="
p-2
rounded-lg
hover:bg-blue-800
transition
"
>

<FaBars/>

</button>


</div>




{/* Menu */}

<div
className="
flex-1
overflow-y-auto
px-4
py-6
space-y-3
"
>


<SidebarMenu
title="Main"
items={mainMenu}
collapsed={collapsed}
/>


<SidebarMenu
title="Management"
items={managementMenu}
collapsed={collapsed}
/>


<SidebarMenu
title="Analytics"
items={analyticsMenu}
collapsed={collapsed}
/>


<SidebarMenu
title="System"
items={systemMenu}
collapsed={collapsed}
/>


</div>





{/* Profile */}

<SidebarProfile
collapsed={collapsed}
user={{
name:"Administrator",
role:"Admin",
}}
/>


</aside>


);

};


export default Sidebar;