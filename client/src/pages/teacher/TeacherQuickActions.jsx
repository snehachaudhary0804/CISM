import { Link } from "react-router-dom";
import {
  Users,
  ClipboardCheck,
  Bell,
  UserCircle,
} from "lucide-react";

const actions = [
  {
    title: "Assigned Students",
    description: "View all assigned students",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    link: "/teacher/students",
  },
  {
    title: "Pending Reviews",
    description: "Review internship requests",
    icon: ClipboardCheck,
    color: "bg-yellow-100 text-yellow-600",
    link: "/teacher/students",
  },
  {
    title: "Notifications",
    description: "Check latest updates",
    icon: Bell,
    color: "bg-green-100 text-green-600",
    link: "/teacher/notifications",
  },
  {
    title: "Profile",
    description: "Manage your profile",
    icon: UserCircle,
    color: "bg-purple-100 text-purple-600",
    link: "/teacher/profile",
  },
];

const TeacherQuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;

        return (
          <Link
            key={index}
            to={action.link}
            className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color}`}
            >
              <Icon size={24} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              {action.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {action.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default TeacherQuickActions;