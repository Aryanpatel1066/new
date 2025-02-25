const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const serverConfig = require("./config/server.config");
const UserModel = require("./models/user.model");

const app = express();
const corsOptions = {
  origin: "http://localhost:5173" ,  
  methods: ["GET", "POST", "PUT", "DELETE"],   
  allowedHeaders: ["Content-Type", "Authorization"],  
  credentials: true, // Required for cookies/auth headers

};

// Apply CORS middleware globally
app.use(cors(corsOptions));

app.use(express.json())

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.DB_URL);
    console.log("✅ MongoDB Connected Successfully!");
    await initializeAdmin(); // Ensures only one admin exists
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    process.exit(1);
  }
};

// Initialize Admin User
const initializeAdmin = async () => {
  try {
    const adminEmail = "aryanpatel1248@gmail.com";
    const adminUserId = "admin";

    // Check if an admin user already exists
    const existingAdmin = await UserModel.findOne({ userType: "ADMIN" });

    if (existingAdmin) {
      console.log("✅ Admin user already exists:", existingAdmin.email);
      return;
    }

    // Check if an existing user has the admin email
    const existingEmail = await UserModel.findOne({ email: adminEmail });

    if (existingEmail) {
      console.log("⚠️ A user with the admin email already exists. Please update manually.");
      return;
    }

    // Create the admin user
    const adminUser = new UserModel({
      name: "Aryan",
       email: adminEmail,
      userType: "ADMIN",
      password: bcrypt.hashSync("welcome1", 8),
    });

    await adminUser.save();
    console.log("🎉 Admin user created successfully!");
  } catch (error) {
    console.error("❌ Error initializing admin:", error);
  }
};
require("./routes/user.route")(app)
require("./routes/address.route")(app)
require("./routes/email.route")(app)
require("./routes/payment.route")(app)
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});
 // Start Server
connectDB().then(() => {
  app.listen(serverConfig.server_port, () => {
    console.log(`🚀 Server started on port: ${serverConfig.server_port}`);
  });
});
