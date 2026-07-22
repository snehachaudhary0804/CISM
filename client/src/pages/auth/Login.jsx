import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCheckCircle,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const user = await login(formData);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }

    } catch (error) {

      console.log(error.response);

      alert(error.response?.data?.message || error.message);

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="login-container">

      {/* Left Panel */}

      <div className="login-left">

        <div className="brand">

          <div className="logo">
            CISM
          </div>

          <h1>CISM</h1>

          <h3>Internship Management System</h3>

          <p>
            Manage internships efficiently for students,
            faculty and administrators.
          </p>

          <div className="features">

            <div className="feature">
              <FaCheckCircle />
              <span>Internship Tracking</span>
            </div>

            <div className="feature">
              <FaCheckCircle />
              <span>NOC Management</span>
            </div>

            <div className="feature">
              <FaCheckCircle />
              <span>Faculty Review</span>
            </div>

            <div className="feature">
              <FaCheckCircle />
              <span>Reports & Analytics</span>
            </div>

          </div>

        </div>

      </div>

      {/* Right Panel */}

      <div className="login-right">

        <div className="login-card">

          <h2>Welcome Back 👋</h2>

          <p>Sign in to continue.</p>

          <form onSubmit={handleSubmit}>            
            <div className="input-group">

              <FaUser className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <FaLock className="input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;