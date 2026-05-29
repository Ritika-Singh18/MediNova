import { useEffect, useState } from "react";

import DoctorCard from "./DoctorCard";
import api from "../utils/api";

function TopDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const { data } = await api.get("/users/doctors");

      // Show only first 4 doctors on home page
      setDoctors(data.slice(0, 4));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <section id="top-doctors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <h1 className="text-5xl font-bold text-center text-slate-800">
          Meet Our Top Doctors
        </h1>

        <p className="text-center text-slate-500 mt-5 text-lg max-w-3xl mx-auto leading-relaxed">
          Experienced specialists dedicated to providing world-class healthcare
          services and personalized patient care.
        </p>

        {/* Loading */}

        {loading ? (
          <div className="text-center mt-20 text-slate-500">
            Loading doctors...
          </div>
        ) : (
          <>
            {/* Doctors Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>

            {/* Empty State */}

            {doctors.length === 0 && (
              <div className="text-center mt-20">
                <h2 className="text-2xl font-semibold text-slate-700">
                  No Doctors Found
                </h2>

                <p className="text-slate-500 mt-3">
                  No doctors are available at the moment.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default TopDoctors;
