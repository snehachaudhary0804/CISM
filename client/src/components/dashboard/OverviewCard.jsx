import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBuilding,
  FaLayerGroup,
  FaLaptopCode,
  FaClock,
  FaCheckCircle,
  FaBell,
} from "react-icons/fa";

import StatCard from "./StatCard";

const OverviewCard = ({ overview }) => {
  if (!overview) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 2xl:grid-cols-4 gap-8">
      <StatCard
        title="Students"
        value={overview.totalStudents ?? 0}
        icon={<FaUserGraduate />}
        color="bg-blue-600"
      />

      <StatCard
        title="Teachers"
        value={overview.totalTeachers ?? 0}
        icon={<FaChalkboardTeacher />}
        color="bg-green-600"
      />

      <StatCard
        title="Departments"
        value={overview.totalDepartments ?? 0}
        icon={<FaBuilding />}
        color="bg-purple-600"
      />

      <StatCard
        title="Sections"
        value={overview.totalSections ?? 0}
        icon={<FaLayerGroup />}
        color="bg-orange-500"
      />

      <StatCard
        title="Internships"
        value={overview.totalInternships ?? 0}
        icon={<FaLaptopCode />}
        color="bg-indigo-600"
      />

      <StatCard
        title="Pending Reviews"
        value={overview.pendingInternships ?? 0}
        icon={<FaClock />}
        color="bg-yellow-500"
      />

      <StatCard
        title="Approved"
        value={overview.approvedInternships ?? 0}
        icon={<FaCheckCircle />}
        color="bg-emerald-600"
      />

      <StatCard
        title="Notifications"
        value={overview.totalNotifications ?? 0}
        icon={<FaBell />}
        color="bg-pink-600"
      />
    </div>
  );
};

export default OverviewCard;
