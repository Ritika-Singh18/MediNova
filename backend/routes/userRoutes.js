import express from "express";

import {
  getDoctors,
  getProfile,
  updateProfile,
  toggleAvailability,
  updateDoctorSchedule,
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import doctorMiddleware from "../middleware/doctorMiddleware.js";

const router = express.Router();

router.get("/doctors", getDoctors);

router.get("/profile/:id", authMiddleware, getProfile);

router.put("/profile/:id", authMiddleware, updateProfile);

router.put(
  "/availability/:id",
  authMiddleware,
  doctorMiddleware,
  toggleAvailability,
);

router.put(
  "/schedule/:id",
  authMiddleware,
  doctorMiddleware,
  updateDoctorSchedule
);

export default router;
