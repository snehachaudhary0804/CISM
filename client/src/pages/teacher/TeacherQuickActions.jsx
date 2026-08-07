import { Users, ClipboardCheck, Bell, UserCircle } from "lucide-react";

import QuickAction1 from "../../components/dashboard/QuickAction1";

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
  return <QuickAction1 actions={actions} />;
};

export default TeacherQuickActions;
