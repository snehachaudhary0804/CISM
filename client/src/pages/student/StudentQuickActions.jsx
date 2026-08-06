import {
  Briefcase,
  Upload,
  FileCheck,
  UserCircle,
} from "lucide-react";

import QuickAction1 from "../../components/dashboard/QuickAction1";

const actions = [
  {
    title: "My Internship",
    description: "View internship details",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-600",
    link: "/student/internships",
  },
  {
    title: "Upload Documents",
    description: "Submit reports & certificates",
    icon: Upload,
    color: "bg-green-100 text-green-600",
    link: "/student/internships",
  },
  {
    title: "NOC Status",
    description: "View issued NOC",
    icon: FileCheck,
    color: "bg-purple-100 text-purple-600",
    link: "/student/internships",
  },
  {
    title: "Profile",
    description: "Manage your profile",
    icon: UserCircle,
    color: "bg-orange-100 text-orange-600",
    link: "/student/profile",
  },
];

const StudentQuickActions = () => {
  return <QuickAction1 actions={actions} />;
};

export default StudentQuickActions;