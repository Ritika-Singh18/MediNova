import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate("/doctors");
  };

  const handleLearnMore = () => {
    const doctorsSection =
      document.getElementById("top-doctors");

    if (doctorsSection) {
      doctorsSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-40 pb-20 px-6 bg-[#F5F7FF] min-h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            Trusted By 10,000+ Patients
          </div>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold leading-tight text-slate-800">
            Healthcare
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              {" "}Made Simple
            </span>
          </h1>

          <p className="mt-8 text-lg text-slate-500 leading-relaxed">
            Find top specialists, book appointments instantly,
            and manage your healthcare journey effortlessly.
          </p>

          <div className="flex gap-4 mt-10 flex-wrap">
            <button
              onClick={handleBookAppointment}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-xl hover:scale-105 transition"
            >
              Book Appointment
            </button>

            <button
              onClick={handleLearnMore}
              className="px-8 py-4 rounded-2xl border border-slate-300 hover:bg-white transition"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 blur-3xl opacity-30 rounded-full"></div>

          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
            alt="doctor"
            className="relative rounded-[40px] shadow-2xl w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;