import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import api from "../utils/api";

function Appointment() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const slots = [
    "09:00 AM",
    "10:00 AM",
    "11:30 AM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
  ];

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await api.get("/users/doctors");

        const selectedDoctor = data.find((doc) => doc._id === id);

        setDoctor(selectedDoctor);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBookAppointment = async () => {
    try {
      if (!selectedSlot) {
        return toast.error("Please select an appointment slot");
      }

      if (!user) {
        return toast.error("Please login first");
      }

      if (!doctor.available) {
        return toast.error("Doctor is currently unavailable");
      }

      await api.post("/appointments/book", {
        patient: user.id,
        doctor: id,
        date: "2026-05-30",
        time: selectedSlot,
      });

      toast.success("Appointment booked successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading doctor...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-slate-700">
        Doctor not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[36px] shadow-xl overflow-hidden grid lg:grid-cols-2">
          <div className="bg-gradient-to-br from-indigo-500 to-cyan-500 p-10 flex items-center justify-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full max-w-sm rounded-[32px] object-cover shadow-2xl"
            />
          </div>

          <div className="p-10 lg:p-14">
            <h1 className="text-5xl font-bold text-slate-800">{doctor.name}</h1>

            <p className="text-xl text-slate-500 mt-4">{doctor.speciality}</p>

            <div className="flex flex-wrap gap-4 mt-10">
              {doctor.availableSlots?.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-5 py-3 rounded-2xl border ${
                    selectedSlot === slot
                      ? "bg-indigo-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <button
              onClick={handleBookAppointment}
              className="w-full mt-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Appointment;
