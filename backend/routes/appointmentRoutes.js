import express from "express";

import {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import doctorMiddleware from "../middleware/doctorMiddleware.js";

const router = express.Router();

/* Book Appointment */

router.post(
  "/book",

  authMiddleware,

  bookAppointment,
);

/* Patient Appointments */

router.get(
  "/patient/:patientId",

  authMiddleware,

  getPatientAppointments,
);

/* Doctor Appointments */

router.get(
  "/doctor/:doctorId",

  authMiddleware,

  getDoctorAppointments,
);

/* Approve / Reject Appointment */

router.put(
  "/status/:id",

  authMiddleware,

  doctorMiddleware,

  updateAppointmentStatus,
);

export default router;
