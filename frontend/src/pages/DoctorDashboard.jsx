import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import api from "../utils/api";

const allSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
];

function DoctorDashboard() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get(`/appointments/doctor/${user.id}`);

      setAppointments(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load appointments");
    }
  };

  const fetchDoctorProfile = async () => {
    try {
      const { data } = await api.get(`/users/profile/${user.id}`);

      setAvailable(data.available);

      setSelectedSlots(data.availableSlots || []);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load doctor profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();

    fetchDoctorProfile();
  }, []);

  const approveAppointment = async (appointmentId) => {
    try {
      await api.put(`/appointments/status/${appointmentId}`, {
        status: "approved",
      });

      toast.success("Appointment approved");

      fetchAppointments();
    } catch (error) {
      console.log(error);

      toast.error("Failed to approve appointment");
    }
  };

  const rejectAppointment = async (appointmentId) => {
    try {
      await api.put(`/appointments/status/${appointmentId}`, {
        status: "rejected",
      });

      toast.success("Appointment rejected");

      fetchAppointments();
    } catch (error) {
      console.log(error);

      toast.error("Failed to reject appointment");
    }
  };

  const handleAvailabilityToggle = async () => {
    try {
      const { data } = await api.put(`/users/availability/${user.id}`);

      setAvailable(data.available);

      toast.success(
        data.available ? "You are now available" : "You are now unavailable",
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to update availability",
      );
    }
  };

  const handleSlotToggle = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((item) => item !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const saveSchedule = async () => {
    try {
      await api.put(`/users/schedule/${user.id}`, {
        availableSlots: selectedSlots,
      });

      toast.success("Schedule updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save schedule");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-slate-700">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}

        <div className="bg-white rounded-[32px] shadow-lg p-8 h-fit">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://randomuser.me/api/portraits/men/28.jpg"
              alt="doctor"
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100"
            />

            <h2 className="text-2xl font-bold text-slate-800 mt-5">
              {user?.name}
            </h2>

            <p className="text-slate-500 mt-2">Doctor Account</p>

            <div
              className={`mt-4 px-4 py-2 rounded-full text-sm font-medium ${
                available
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {available ? "Currently Available" : "Currently Unavailable"}
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium">
              Dashboard
            </button>

            <button className="w-full py-3 rounded-2xl bg-indigo-100 text-indigo-700 font-medium">
              Schedule Manager
            </button>

            <button
              onClick={handleAvailabilityToggle}
              className={`w-full py-3 rounded-2xl font-medium transition ${
                available
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {available
                ? "Available (Click to Disable)"
                : "Unavailable (Click to Enable)"}
            </button>

            <button
              onClick={() => navigate("/profile-settings")}
              className="w-full py-3 rounded-2xl border border-slate-200 text-slate-600 hover:border-indigo-400 transition"
            >
              Profile Settings
            </button>
          </div>
        </div>

        {/* Main Content */}

        <div className="lg:col-span-3 space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-slate-800">
              Doctor Dashboard
            </h1>

            <p className="text-slate-500 mt-4">
              Manage appointments and monitor your daily schedule.
            </p>
          </div>

          <div className="bg-white rounded-[32px] shadow-lg p-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Manage Schedule
            </h2>

            <p className="text-slate-500 mt-2">
              Select available appointment slots.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {allSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleSlotToggle(slot)}
                  className={`py-3 rounded-2xl border transition ${
                    selectedSlots.includes(slot)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white border-slate-200"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <button
              onClick={saveSchedule}
              className="mt-8 px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium"
            >
              Save Schedule
            </button>
          </div>

          {/* Analytics */}

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[28px] shadow-lg p-8">
              <p className="text-slate-500">Total Appointments</p>

              <h2 className="text-4xl font-bold text-slate-800 mt-4">
                {appointments.length}
              </h2>
            </div>

            <div className="bg-white rounded-[28px] shadow-lg p-8">
              <p className="text-slate-500">Pending Requests</p>

              <h2 className="text-4xl font-bold text-slate-800 mt-4">
                {
                  appointments.filter((item) => item.status === "pending")
                    .length
                }
              </h2>
            </div>

            <div className="bg-white rounded-[28px] shadow-lg p-8">
              <p className="text-slate-500">Approved Appointments</p>

              <h2 className="text-4xl font-bold text-slate-800 mt-4">
                {
                  appointments.filter((item) => item.status === "approved")
                    .length
                }
              </h2>
            </div>
          </div>

          {/* Appointment Requests */}

          <div className="bg-white rounded-[32px] shadow-lg p-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Appointment Requests
            </h2>

            <div className="overflow-x-auto mt-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="pb-4 text-slate-500">Patient</th>

                    <th className="pb-4 text-slate-500">Date</th>

                    <th className="pb-4 text-slate-500">Time</th>

                    <th className="pb-4 text-slate-500">Status</th>

                    <th className="pb-4 text-slate-500">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((item) => (
                      <tr key={item._id} className="border-b border-slate-100">
                        <td className="py-5 font-medium text-slate-700">
                          {item.patient?.name}
                        </td>

                        <td className="py-5 text-slate-500">{item.date}</td>

                        <td className="py-5 text-slate-500">{item.time}</td>

                        <td className="py-5">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                              item.status === "approved"
                                ? "bg-emerald-100 text-emerald-600"
                                : item.status === "pending"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-500"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="py-5">
                          {item.status === "pending" ? (
                            <div className="flex gap-3">
                              <button
                                onClick={() => approveAppointment(item._id)}
                                className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm hover:bg-emerald-600 transition"
                              >
                                Approve
                              </button>

                              <button
                                onClick={() => rejectAppointment(item._id)}
                                className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600 transition"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-sm">
                              No Action Required
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-10 text-slate-500"
                      >
                        No appointments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DoctorDashboard;
