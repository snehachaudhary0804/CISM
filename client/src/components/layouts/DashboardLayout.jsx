import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar role={user?.role} user={user} />

      {/* Main Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        <Header role={user?.role} user={user} />

        <main
          className="
            flex-1
            overflow-y-auto
            bg-slate-50
            px-8
            py-8
          "
        >
          {children ? children : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
