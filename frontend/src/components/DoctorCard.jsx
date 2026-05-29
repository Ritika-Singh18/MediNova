import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  return (
    <div className="group bg-white rounded-[28px] overflow-hidden shadow-md hover:shadow-2xl transition duration-500 border border-slate-100 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-700"
        />

        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
            doctor.available
              ? "bg-emerald-100 text-emerald-600"
              : "bg-red-100 text-red-500"
          }`}
        >
          {doctor.available ? "Available" : "Unavailable"}
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-slate-800">{doctor.name}</h2>

        <p className="text-slate-500 mt-1 text-sm">{doctor.speciality}</p>

        <div className="flex justify-between items-center mt-5">
          <div>
            <p className="text-xs text-slate-400">Experience</p>

            <h3 className="font-semibold text-sm text-slate-700">
              {doctor.experience}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">Rating</p>

            <h3 className="font-semibold text-sm text-slate-700">
              ⭐ {doctor.rating}
            </h3>
          </div>
        </div>

        <Link to={`/appointment/${doctor._id}`}>
          <button className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-medium hover:scale-[1.02] transition duration-300">
            Book Appointment
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;
