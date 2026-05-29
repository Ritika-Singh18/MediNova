import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import api from "../utils/api";

function PatientDashboard() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get(`/appointments/patient/${user.id}`);

      setAppointments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-slate-700">
        Loading appointments...
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
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100"
            />

            <h2 className="text-2xl font-bold text-slate-800 mt-5">
              {user?.name}
            </h2>

            <p className="text-slate-500 mt-2">Patient Account</p>
          </div>

          <div className="mt-10 space-y-4">
            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium">
              Dashboard
            </button>

            <button className="w-full py-3 rounded-2xl border border-slate-200 text-slate-600 hover:border-indigo-400 transition">
              My Appointments
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
              Patient Dashboard
            </h1>

            <p className="text-slate-500 mt-4">
              Track appointments and manage your healthcare activities.
            </p>
          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-[28px] shadow-lg p-8">
              <p className="text-slate-500">Pending Appointments</p>

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

            <div className="bg-white rounded-[28px] shadow-lg p-8">
              <p className="text-slate-500">Rejected Appointments</p>

              <h2 className="text-4xl font-bold text-slate-800 mt-4">
                {
                  appointments.filter((item) => item.status === "rejected")
                    .length
                }
              </h2>
            </div>
          </div>

          {/* Appointments Table */}

          <div className="bg-white rounded-[32px] shadow-lg p-8">
            <h2 className="text-3xl font-bold text-slate-800">
              My Appointments
            </h2>

            <div className="overflow-x-auto mt-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="pb-4 text-slate-500">Doctor</th>

                    <th className="pb-4 text-slate-500">Date</th>

                    <th className="pb-4 text-slate-500">Time</th>

                    <th className="pb-4 text-slate-500">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((item) => (
                      <tr key={item._id} className="border-b border-slate-100">
                        <td className="py-5 font-medium text-slate-700">
                          {item.doctor?.name}
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
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

export default PatientDashboard;
