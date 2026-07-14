const express = require("express");
const cors= require("cors");
const dotenv =require("dotenv");
const connectDB=require("./config/db")
const authRoutes = require("./routes/authRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const academicSessionRoutes = require("./routes/academicSessionRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const domainRoutes = require("./routes/domainRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const nocRoutes = require("./routes/nocRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();   
connectDB();
const app=express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/academic-sessions", academicSessionRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/domains", domainRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/nocs", nocRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/admin", adminRoutes);

app.get("/",(req,res)=>{
    res.send("HELLO SNEHA TEST");
});




const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log("Server running on port 5000");
});