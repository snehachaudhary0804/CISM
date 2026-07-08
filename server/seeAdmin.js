require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

async function createAdmin() {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({
      email: "admin@gmail.com",
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // Create Admin
    const admin = await User.create({
      name: "System Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
    console.log(admin);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

createAdmin();