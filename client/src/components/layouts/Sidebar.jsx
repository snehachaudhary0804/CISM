import { User } from "lucide-react";
import { FilePlus } from "lucide-react";
import { useState } from "react";
import {
  FaBars,
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
const menus = {
  admin: {
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
  },

  student: {
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
        name: "Apply Internship",
        icon: FilePlus,
        path: "/student/apply-internship",
      },
    ],
  },

  teacher: {
    main: [
      {
        name: "Dashboard",
        path: "/teacher/dashboard",
        icon: FaTachometerAlt,
      },
    ],

    management: [
      {
        name: "Assigned Internships",
        path: "/teacher/internships",
        icon: FaLaptopCode,
      },
    ],
  },
};
const Sidebar = ({ role = "admin", user }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { main, management, analytics, system } = menus[role] || menus.admin;
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
        {!collapsed && (
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
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
p-2
rounded-lg
hover:bg-blue-800
transition
"
        >
          <FaBars />
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
          <SidebarMenu title="Main" items={main} collapsed={collapsed} />

          <SidebarMenu
            title="Management"
            items={management}
            collapsed={collapsed}
          />

          {role !== "student" && analytics?.length > 0 && (
            <SidebarMenu
              title="Analytics"
              items={analytics}
              collapsed={collapsed}
            />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
