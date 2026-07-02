const express = require("express");
const cors= require("cors");
const dotenv =require("dotenv");
const connectDB=require("./config/db")
const authRoutes = require("./routes/authRoutes");
const studentRoutes=require("./routes/studentRoutes");

dotenv.config();   
connectDB();
const app=express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/student",studentRoutes);




app.get("/",(req,res)=>{
    res.send("HELLO SNEHA TEST");
});

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log("Server running on port 5000");
});