import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// Layout
import DashboardLayout from "../components/layouts/DashboardLayout";

// Auth
import Login from "../pages/auth/Login";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import Teachers from "../pages/admin/Teachers";
import Departments from "../pages/admin/Departments";
import Sections from "../pages/admin/Sections";
import Domains from "../pages/admin/Domains";
import Sessions from "../pages/admin/Sessions";
import Reports from "../pages/admin/Reports";
import Notifications from "../pages/admin/Notifications";

// Teacher
import TeacherDashboard from "../pages/teacher/Dashboard";

// Student
import StudentDashboard from "../pages/student/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* ---------------- ADMIN ---------------- */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/teachers" element={<Teachers />} />
          <Route path="/admin/departments" element={<Departments />} />
          <Route path="/admin/sections" element={<Sections />} />
          <Route path="/admin/domains" element={<Domains />} />
          <Route path="/admin/sessions" element={<Sessions />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>
      </Route>

      {/* ---------------- TEACHER ---------------- */}
      <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      </Route>

      {/* ---------------- STUDENT ---------------- */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Route>

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
      
  );
};

export default AppRoutes;