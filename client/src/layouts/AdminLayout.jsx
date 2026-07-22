import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}