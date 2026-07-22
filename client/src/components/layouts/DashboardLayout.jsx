import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";


const DashboardLayout = () => {

  return (

    <div className="flex min-h-screen bg-slate-50 transition-colors duration-300">

      {/* Sidebar */}
      <Sidebar />


      {/* Main Area */}
      <div className="flex-1 min-w-0 flex flex-col">


        {/* Header */}
        <Header />


        {/* Content */}
        <main
          className="
            flex-1
            
            overflow-x-hidden
            px-4
            
            py-4
            
            bg-slate-50
          "
        >

          

            <Outlet />

        


        </main>


      </div>


    </div>

  );

};


export default DashboardLayout;