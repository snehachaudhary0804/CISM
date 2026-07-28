import { Outlet } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default StudentLayout;