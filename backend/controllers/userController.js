import User from "../models/User.js";

export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({
      role: "doctor",
    }).select("-password");

    res.json(doctors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const toggleAvailability = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    doctor.available = !doctor.available;

    await doctor.save();

    res.status(200).json({
      available: doctor.available,
      message: "Availability updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateDoctorSchedule = async (req, res) => {
  try {
    const { availableSlots } = req.body;

    const doctor = await User.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    doctor.availableSlots = availableSlots;

    await doctor.save();

    res.status(200).json({
      message: "Schedule updated successfully",
      availableSlots: doctor.availableSlots,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
