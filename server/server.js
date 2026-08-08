const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const academicSessionRoutes = require("./routes/academicSessionRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const domainRoutes = require("./routes/domainRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const nocRoutes = require("./routes/nocRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const adminRoutes = require("./routes/adminRoutes");
const path = require("path");
connectDB();
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/academic-sessions", academicSessionRoutes);
app.use("/api/v1/internships", internshipRoutes);
app.use("/api/v1/domains", domainRoutes);
app.use("/api/v1/sections", sectionRoutes);
app.use("/api/v1/nocs", nocRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("HELLO SNEHA TEST");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
