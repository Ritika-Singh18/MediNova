# 🏥 MediNova - Healthcare Appointment Booking Platform

MediNova is a full-stack healthcare appointment booking platform that connects patients and doctors through a modern and intuitive web application. Patients can browse doctors, book appointments, and manage their healthcare journey, while doctors can manage schedules, availability, and appointment requests.

---

## 🚀 Live Demo

### Frontend

https://medi-nova-kappa.vercel.app/

### Backend API

https://medinova-backend-jnoc.onrender.com

---

# 📌 Features Implemented

## 👨‍⚕️ Patient Features

* User Registration & Login
* JWT Authentication
* Browse Doctors by Specialty
* Search Doctors
* View Doctor Profiles
* Book Appointments
* View Appointment History
* Manage Personal Profile

---

## 🩺 Doctor Features

* Doctor Registration & Login
* Doctor Dashboard
* Toggle Availability Status
* Manage Available Appointment Slots
* View Appointment Requests
* Approve Appointments
* Reject Appointments
* Update Profile Information

---

## 🔒 Security Features

* Password Hashing using bcryptjs
* JWT-based Authentication
* Protected Routes
* Role-based Authorization
* Backend Appointment Validation

---

## 📅 Appointment Management

* Book appointments with specific doctors
* Doctor-specific schedules
* Prevent booking unavailable doctors
* Prevent booking unavailable time slots
* Prevent duplicate appointment bookings
* Appointment approval/rejection workflow

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Framer Motion
* React Hot Toast
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

## Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

# 📂 Project Structure

```text
MediNova
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── config
│   └── server.js
│
└── README.md
```

---

# ⚙️ Local Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Ritika-Singh18/MediNova.git
```

```bash
cd MediNova
```

---

## 2️⃣ Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🗄 Database

MongoDB Atlas is used as the primary database.

Collections:

* Users
* Appointments

---

# 🔑 Test Credentials

## Doctor

```text
Email: noah@medinova.com
Password: doctor123
```

## Patient

```text
Email: patient1@gmail.com
Password: patient123
```

---

# 🎯 Future Improvements

* Email Notifications
* Video Consultation Support
* Online Payments
* Appointment Reminders
* Doctor Ratings & Reviews
* Medical Report Uploads
* Admin Dashboard

---

# 👩‍💻 Author

**Ritika Singh**

Developed as a Full Stack Healthcare Appointment Management System using the MERN Stack.
