import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

/* Middleware */

app.use(cors());

app.use(express.json());

/* Auth Routes */

app.use("/api/auth", authRoutes);

/* Appointment Routes */

app.use("/api/appointments", appointmentRoutes);

/* User Routes */

app.use("/api/users", userRoutes);

/* Test Route */

app.get("/", (req, res) => {
  res.json({
    message: "Backend server is running",
  });
});

/* Port */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
