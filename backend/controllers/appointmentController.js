import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

/* Book Appointment */

export const bookAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, time } = req.body;

    /* Check Doctor */

    const doctorUser = await User.findById(doctor);

    if (!doctorUser) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    /* Availability Validation */

    if (!doctorUser.available) {
      return res.status(400).json({
        message: "Doctor is currently unavailable",
      });
    }

    /* Schedule Validation */

    if (!doctorUser.availableSlots.includes(time)) {
      return res.status(400).json({
        message: "Selected slot is unavailable",
      });
    }

    /* Duplicate Booking Check */

    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
      status: {
        $ne: "rejected",
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }

    /* Create Appointment */

    const appointment = await Appointment.create({
      patient,
      doctor,
      date,
      time,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* Get Patient Appointments */

export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.params.patientId,
    })

      .populate(
        "doctor",

        "name email role",
      );

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* Get Doctor Appointments */

export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.params.doctorId,
    })

      .populate(
        "patient",

        "name email",
      );

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* Approve / Reject Appointment */

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,

      {
        status,
      },

      {
        new: true,
      },
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
