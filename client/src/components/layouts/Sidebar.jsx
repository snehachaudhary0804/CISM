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
import {User} from "lucide-react";
import SidebarMenu from "./SidebarMenu";
import SidebarProfile from "./SidebarProfile";

const adminMenus = {
  main: [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: FaTachometerAlt,
    },
  ],

  management: [
    {
      name: "Students",
      path: "/admin/students",
      icon: FaUsers,
    },
    {
      name: "Teachers",
      path: "/admin/teachers",
      icon: FaChalkboardTeacher,
    },
    {
      name: "Departments",
      path: "/admin/departments",
      icon: FaBuilding,
    },
    {
      name: "Sections",
      path: "/admin/sections",
      icon: FaLayerGroup,
    },
    {
      name: "Domains",
      path: "/admin/domains",
      icon: FaLaptopCode,
    },
    {
      name: "Sessions",
      path: "/admin/sessions",
      icon: FaCalendarAlt,
    },
  ],

  analytics: [
    {
      name: "Reports",
      path: "/admin/reports",
      icon: FaChartBar,
    },
  ],

  system: [
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: FaBell,
    },
  ],
};
const studentMenus = {
  main: [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: FaTachometerAlt,
    },
  ],

  management: [
    {
      name: "My Internship",
      path: "/student/internship",
      icon: FaLaptopCode,
    },
   {
    name:"Profile",
     path:"/student/profile",
     icon:<User/>
    }
   
  ],



  system: [
    {
      name: "Notifications",
      path: "/student/notifications",
      icon: FaBell,
    },
  ],
};
const mainMenu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: FaTachometerAlt,
  },
];

const managementMenu = [
  {
    name: "Students",
    path: "/admin/students",
    icon: FaUsers,
  },
  {
    name: "Teachers",
    path: "/admin/teachers",
    icon: FaChalkboardTeacher,
  },
  {
    name: "Departments",
    path: "/admin/departments",
    icon: FaBuilding,
  },
  {
    name: "Sections",
    path: "/admin/sections",
    icon: FaLayerGroup,
  },
  {
    name: "Domains",
    path: "/admin/domains",
    icon: FaLaptopCode,
  },
  {
    name: "Sessions",
    path: "/admin/sessions",
    icon: FaCalendarAlt,
  },
];

const analyticsMenu = [
  {
    name: "Reports",
    path: "/admin/reports",
    icon: FaChartBar,
  },
];

const systemMenu = [
  {
    name: "Notifications",
    path: "/admin/notifications",
    icon: FaBell,
  },
];
// STUDENT MENU

const studentMainMenu = [
  {
    name:"Dashboard",
    path:"/student/dashboard",
    icon:FaTachometerAlt,
  },
];


const studentManagementMenu = [
  {
    name:"My Internship",
    path:"/student/internship",
    icon:FaLaptopCode,
  },
  {
    name:"Documents",
    path:"/student/documents",
    icon:FaBuilding,
  },
  {
    name:"NOC Status",
    path:"/student/noc",
    icon:FaCalendarAlt,
  },
];


const studentSystemMenu = [
  {
    name:"Notifications",
    path:"/student/notifications",
    icon:FaBell,
  },
];
// TEACHER MENU

const teacherMainMenu = [
  {
    name:"Dashboard",
    path:"/teacher/dashboard",
    icon:FaTachometerAlt,
  },
];


const teacherManagementMenu = [
  {
    name:"Assigned Internships",
    path:"/teacher/internships",
    icon:FaLaptopCode,
  },
  {
    name:"Students",
    path:"/teacher/students",
    icon:FaUsers,
  },
  {
    name:"NOC Requests",
    path:"/teacher/noc",
    icon:FaBuilding,
  },
];


const teacherSystemMenu = [
  {
    name:"Notifications",
    path:"/teacher/notifications",
    icon:FaBell,
  },
];
const Sidebar = ({
  role = "admin",
  user,
}) => {

const [collapsed,setCollapsed] = useState(false);
const main =
  role === "student"
    ? studentMainMenu
    : role === "teacher"
    ? teacherMainMenu
    : mainMenu;

const management =
  role === "student"
    ? studentManagementMenu
    : role === "teacher"
    ? teacherManagementMenu
    : managementMenu;

const analytics =
  role === "admin"
    ? analyticsMenu
    : [];

const system =
  role === "student"
    ? studentSystemMenu
    : role === "teacher"
    ? teacherSystemMenu
    : systemMenu;
return (

<aside
className={`
${collapsed ? "w-24" : "w-64"}
h-screen
flex-shrink-0
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
<span
  className="
    inline-block
    mt-3
    px-3
    py-1
    rounded-full
    bg-blue-600
    text-white
    text-xs
    font-semibold
  "
>
  {role === "student"
    ? "Student"
    : role === "teacher"
    ? "Teacher"
    : "Administrator"}
</span>


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
"
>

<div className="space-y-3">
<SidebarMenu
 title="Main"
 items={main}
 collapsed={collapsed}
/>


<SidebarMenu
title="Management"
items={management}
collapsed={collapsed}
/>


{role !== "student" && analytics.length > 0 && (
  <SidebarMenu
    title="Analytics"
    items={analytics}
    collapsed={collapsed}
  />
)}


<SidebarMenu
title="System"
items={system}
collapsed={collapsed}
/>


</div>


</div>


{/* Profile */}

<div className="mt-auto">
  <SidebarProfile
  collapsed={collapsed}
  user={{
    name:
  user?.name ||
  (role === "student"
    ? "Student"
    : role === "teacher"
    ? "Teacher"
    : "Administrator"),

    role:
      role === "student"
        ? "Student"
        : role === "teacher"
        ? "Teacher"
        : "Admin",
  }}
/>
</div>
</aside>


);

};


export default Sidebar;