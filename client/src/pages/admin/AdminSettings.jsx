import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminSettings = () => {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Settings
      </h1>

      <div className="space-y-6">

        {/* Change Password */}

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-lg font-bold text-slate-800">
            Change Password
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Update your account password.
          </p>

          <button
            onClick={() => navigate("change-password")}
            className="
              mt-5
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-2
              rounded-lg
            "
          >
            Change Password
          </button>

        </div>

        {/* Logout */}

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-lg font-bold text-red-600">
            Logout
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Sign out from your account.
          </p>

          <button
            onClick={handleLogout}
            className="
              mt-5
              bg-red-600
              hover:bg-red-700
              text-white
              px-5
              py-2
              rounded-lg
            "
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );
};

export default AdminSettings;