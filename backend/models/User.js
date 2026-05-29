import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["patient", "doctor"],
      default: "patient",
    },

    /* Doctor Fields */

    speciality: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    available: {
      type: Boolean,
      default: true,
    },

    image: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      default: "",
    },

    availableSlots: {
      type: [String],
      default: [],
    },
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
