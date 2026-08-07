import { useState } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = ({ role = "admin", user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dashboardTitle =
    role === "student"
      ? "Student Dashboard"
      : role === "teacher"
        ? "Teacher Dashboard"
        : "Admin Dashboard";

  return (
    <header
      className="
        sticky
        top-0
        z-30
        bg-white
        border-b
        border-slate-200
        shadow-sm
        px-5
        lg:px-8
        py-4
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* Left */}

        <div>
          <h1
            className="
              text-xl
              lg:text-2xl
              font-extrabold
              text-blue-700
            "
          >
            {dashboardTitle}
          </h1>

          <p
            className="
              text-sm
              text-slate-500
              mt-1
            "
          >
            {today}
          </p>
        </div>

        {/* Right */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          {/* Notification */}

          <button
            className="
              relative
              w-11
              h-11
              rounded-xl
              bg-blue-100
              text-blue-700
              hover:bg-blue-100
              transition
              flex
              items-center
              justify-center
            "
          >
            <FaBell />

            <span
              className="
                absolute
                -top-1
                -right-1
                w-5
                h-5
                rounded-full
                bg-red-500
                text-white
                text-xs
                flex
                items-center
                justify-center
              "
            >
              3
            </span>
          </button>

          {/* Profile */}

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="
                flex
                items-center
                gap-3
                bg-blue-50
                hover:bg-blue-100
                transition
                px-3
                py-2
                rounded-xl
              "
            >
              <div
                className="
                  w-10
                  h-10
                  rounded-full
                   bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>

              <div className="hidden md:block text-left">
                <h3 className="font-bold text-slate-800">
                  {user?.name || "Administrator"}
                </h3>

                <p className="text-xs text-slate-500">
                  {role === "student"
                    ? "Student"
                    : role === "teacher"
                      ? "Teacher"
                      : "Admin"}
                </p>
              </div>

              <FaChevronDown size={14} />
            </button>

            {open && (
              <div
                className="
                    absolute
                    right-0
                    mt-3
                    w-52
                    bg-white               
                    border
                    border-slate-200
                    rounded-xl
                    shadow-xl
                    overflow-hidden
                  "
              >
                <button
                  onClick={() => {
                    if (role === "admin") {
                      navigate("/admin/profile");
                    } else if (role === "teacher") {
                      navigate("/teacher/profile");
                    } else {
                      navigate("/student/profile");
                    }

                    setOpen(false);
                  }}
                  className="
    w-full
    text-left
    px-5
    py-3
    hover:bg-blue-50
  "
                >
                  Profile
                </button>

                <button
                  onClick={() => {
                    if (role === "admin") {
                      navigate("/admin/settings");
                    } else if (role === "teacher") {
                      navigate("/teacher/settings");
                    } else {
                      navigate("/student/settings");
                    }

                    setOpen(false);
                  }}
                  className="
    w-full
    text-left
    px-5
    py-3
    hover:bg-slate-100
  "
                >
                  Settings
                </button>
                <button
                  onClick={() => {
                    logout();

                    navigate("/login");
                  }}
                  className="
    w-full
    text-left
    px-5
    py-3
    text-red-500
    hover:bg-red-50
  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
