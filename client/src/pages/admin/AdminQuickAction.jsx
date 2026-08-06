import {
  Users,
  UserCog,
  FileCheck,
  BarChart3,
} from "lucide-react";

import QuickAction1 from "../../components/dashboard/QuickAction1";

const actions = [
  {
    title: "Students",
    description: "Manage student records",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    link: "/admin/students",
  },
  {
    title: "Teachers",
    description: "Manage teacher records",
    icon: UserCog,
    color: "bg-green-100 text-green-600",
    link: "/admin/teachers",
  },
  {
    title: "Issue NOC",
    description: "Manage NOC requests",
    icon: FileCheck,
    color: "bg-purple-100 text-purple-600",
    link: "/admin/noc",
  },
  {
    title: "Reports",
    description: "View analytics & reports",
    icon: BarChart3,
    color: "bg-orange-100 text-orange-600",
    link: "/admin/reports",
  },
];

const AdminQuickActions = () => {
  return <QuickAction1 actions={actions} />;
};

export default AdminQuickActions;