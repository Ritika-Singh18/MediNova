import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

dotenv.config();

const DOCTOR_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    /* Clean Existing Data */

    await User.deleteMany({
      role: { $in: ["doctor", "patient"] },
    });

    const doctorPassword = await bcrypt.hash("doctor123", 10);

    const patientPassword = await bcrypt.hash("patient123", 10);

    /* Doctors */

    const doctors = [
      // General Physician
      {
        name: "Dr. Noah Anderson",
        email: "noah@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "General Physician",
        experience: "6 Years",
        rating: 4.7,
        available: true,
        image: "https://randomuser.me/api/portraits/men/28.jpg",
        about: "Comprehensive primary healthcare specialist.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Olivia White",
        email: "olivia@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "General Physician",
        experience: "8 Years",
        rating: 4.8,
        available: true,
        image: "https://randomuser.me/api/portraits/women/31.jpg",
        about: "Experienced physician focused on preventive care.",
        availableSlots: DOCTOR_SLOTS,
      },

      // Gynecologist
      {
        name: "Dr. Emma Wilson",
        email: "emma@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Gynecologist",
        experience: "9 Years",
        rating: 4.8,
        available: true,
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        about: "Experienced gynecologist specializing in women's health.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Ava Brooks",
        email: "ava@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Gynecologist",
        experience: "11 Years",
        rating: 4.9,
        available: false,
        image: "https://randomuser.me/api/portraits/women/66.jpg",
        about: "Women's reproductive health specialist.",
        availableSlots: DOCTOR_SLOTS,
      },

      // Dermatologist
      {
        name: "Dr. Priya Sharma",
        email: "priya@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Dermatologist",
        experience: "12 Years",
        rating: 4.9,
        available: false,
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        about: "Skin health and cosmetic dermatology.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Emily Clark",
        email: "emily@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Dermatologist",
        experience: "9 Years",
        rating: 4.8,
        available: true,
        image: "https://randomuser.me/api/portraits/women/52.jpg",
        about: "Advanced dermatological treatments.",
        availableSlots: DOCTOR_SLOTS,
      },

      // Pediatrician
      {
        name: "Dr. David Kim",
        email: "david@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Pediatrician",
        experience: "6 Years",
        rating: 4.7,
        available: true,
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        about: "Dedicated children's healthcare specialist.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Hannah Scott",
        email: "hannah@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Pediatrician",
        experience: "10 Years",
        rating: 4.9,
        available: true,
        image: "https://randomuser.me/api/portraits/women/73.jpg",
        about: "Preventive and developmental child care.",
        availableSlots: DOCTOR_SLOTS,
      },

      // Neurologist
      {
        name: "Dr. Michael Lee",
        email: "michael@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Neurologist",
        experience: "8 Years",
        rating: 4.8,
        available: true,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        about: "Brain and nervous system specialist.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Sophia Green",
        email: "sophia@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Neurologist",
        experience: "11 Years",
        rating: 4.9,
        available: true,
        image: "https://randomuser.me/api/portraits/women/41.jpg",
        about: "Expert in neurological disorders.",
        availableSlots: DOCTOR_SLOTS,
      },

      // Gastroenterologist
      {
        name: "Dr. Isabella Moore",
        email: "isabella@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Gastroenterologist",
        experience: "10 Years",
        rating: 4.8,
        available: true,
        image: "https://randomuser.me/api/portraits/women/50.jpg",
        about: "Digestive system disorders specialist.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Liam Foster",
        email: "liam@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Gastroenterologist",
        experience: "13 Years",
        rating: 4.9,
        available: true,
        image: "https://randomuser.me/api/portraits/men/51.jpg",
        about: "Expert in digestive health treatments.",
        availableSlots: DOCTOR_SLOTS,
      },

      // Cardiologist
      {
        name: "Dr. Sarah Johnson",
        email: "sarah@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Cardiologist",
        experience: "10 Years",
        rating: 4.9,
        available: true,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        about: "Heart specialist providing advanced cardiac care.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Robert King",
        email: "robert@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Cardiologist",
        experience: "12 Years",
        rating: 4.8,
        available: false,
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        about: "Interventional cardiology specialist.",
        availableSlots: DOCTOR_SLOTS,
      },

      // Orthopedic
      {
        name: "Dr. James Brown",
        email: "james@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Orthopedic",
        experience: "11 Years",
        rating: 4.9,
        available: false,
        image: "https://randomuser.me/api/portraits/men/41.jpg",
        about: "Bone and joint treatment expert.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Ethan Carter",
        email: "ethan@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Orthopedic",
        experience: "8 Years",
        rating: 4.7,
        available: true,
        image: "https://randomuser.me/api/portraits/men/42.jpg",
        about: "Sports injury and orthopedic specialist.",
        availableSlots: DOCTOR_SLOTS,
      },

      // ENT Specialist
      {
        name: "Dr. Olivia Carter",
        email: "olivia.carter@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "ENT Specialist",
        experience: "7 Years",
        rating: 4.8,
        available: true,
        image: "https://randomuser.me/api/portraits/women/22.jpg",
        about: "Ear, nose and throat specialist.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Lucas Reed",
        email: "lucas@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "ENT Specialist",
        experience: "10 Years",
        rating: 4.9,
        available: true,
        image: "https://randomuser.me/api/portraits/men/23.jpg",
        about: "Advanced ENT treatment specialist.",
        availableSlots: DOCTOR_SLOTS,
      },

      // Psychiatrist
      {
        name: "Dr. Ethan Walker",
        email: "ethan.walker@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Psychiatrist",
        experience: "13 Years",
        rating: 4.9,
        available: true,
        image: "https://randomuser.me/api/portraits/men/56.jpg",
        about: "Mental health and behavioral therapy expert.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Grace Allen",
        email: "grace@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Psychiatrist",
        experience: "9 Years",
        rating: 4.8,
        available: false,
        image: "https://randomuser.me/api/portraits/women/57.jpg",
        about: "Mental wellness specialist.",
        availableSlots: DOCTOR_SLOTS,
      },

      // Urologist
      {
        name: "Dr. Sophia Martinez",
        email: "sophia.martinez@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Urologist",
        experience: "9 Years",
        rating: 4.7,
        available: false,
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        about: "Urinary tract specialist.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Henry Parker",
        email: "henry@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Urologist",
        experience: "11 Years",
        rating: 4.9,
        available: true,
        image: "https://randomuser.me/api/portraits/men/46.jpg",
        about: "Kidney and urinary system expert.",
        availableSlots: DOCTOR_SLOTS,
      },

      // Ophthalmologist
      {
        name: "Dr. Daniel Scott",
        email: "daniel@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Ophthalmologist",
        experience: "11 Years",
        rating: 4.9,
        available: true,
        image: "https://randomuser.me/api/portraits/men/61.jpg",
        about: "Advanced eye care specialist.",
        availableSlots: DOCTOR_SLOTS,
      },
      {
        name: "Dr. Chloe Bennett",
        email: "chloe@medinova.com",
        password: doctorPassword,
        role: "doctor",
        speciality: "Ophthalmologist",
        experience: "8 Years",
        rating: 4.8,
        available: true,
        image: "https://randomuser.me/api/portraits/women/62.jpg",
        about: "Vision and eye surgery expert.",
        availableSlots: DOCTOR_SLOTS,
      },
    ];

    /* Patients */

    const patients = [];

    for (let i = 1; i <= 8; i++) {
      patients.push({
        name: `Patient ${i}`,
        email: `patient${i}@gmail.com`,
        password: patientPassword,
        role: "patient",
      });
    }

    await User.insertMany(doctors);
    await User.insertMany(patients);

    console.log("Seed Data Inserted Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();
