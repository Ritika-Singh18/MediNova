import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ProfileSettings from "./pages/ProfileSettings";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/doctors" element={<Doctors />} />

      <Route path="/appointment/:id" element={<Appointment />} />

      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile-settings"
        element={
          <ProtectedRoute>
            <ProfileSettings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;