import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorCard from "../components/DoctorCard";

import api from "../utils/api";

const specialities = [
  "All",
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Gastroenterologist",
  "Cardiologist",
  "Orthopedic",
  "ENT Specialist",
  "Psychiatrist",
  "Urologist",
  "Ophthalmologist",
];

function Doctors() {
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get("/users/doctors");

        setDoctors(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpeciality =
      selected === "All" || doctor.speciality === selected;

    const matchesSearch =
      doctor.name?.toLowerCase().includes(search.toLowerCase()) ||
      doctor.speciality?.toLowerCase().includes(search.toLowerCase());

    return matchesSpeciality && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading doctors...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-slate-800 text-center">
          Find Your Specialist
        </h1>

        <p className="text-slate-500 text-center mt-5 max-w-3xl mx-auto">
          Browse experienced doctors and book appointments.
        </p>

        <div className="mt-12 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search doctors or specialities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm bg-white"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {specialities.map((item) => (
            <button
              key={item}
              onClick={() => setSelected(item)}
              className={`px-5 py-3 rounded-2xl font-medium transition ${
                selected === item
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold text-slate-700">
              No Doctors Found
            </h2>

            <p className="text-slate-500 mt-3">
              Try searching with a different name or speciality.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Doctors;
