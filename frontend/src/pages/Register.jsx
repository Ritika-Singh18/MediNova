import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import api from "../utils/api";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    password: "",

    confirmPassword: "",

    role: "patient",
  });

  /* Handle Input Change */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /* Handle Register */

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      /* Password Validation */

      if (formData.password !== formData.confirmPassword) {
        return toast.error("Passwords do not match");
      }

      /* API Request */

      const { data } = await api.post(
        "/auth/register",

        {
          name: formData.name,

          email: formData.email,

          password: formData.password,

          role: role,
        },
      );

      /* Save Token */

      localStorage.setItem(
        "token",

        data.token,
      );

      localStorage.setItem(
        "user",

        JSON.stringify(data.user),
      );

      toast.success("Account created successfully");

      /* Role Based Redirect */

      if (data.user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/patient/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FF] overflow-hidden">
      {/* Navbar */}

      <Navbar />

      {/* Register Section */}

      <section className="relative flex justify-center px-6 py-16">
        {/* Background Glow */}

        <div className="absolute top-0 left-10 w-72 h-72 bg-cyan-200 blur-3xl opacity-20 rounded-full"></div>

        <div className="absolute bottom-0 right-10 w-72 h-72 bg-indigo-300 blur-3xl opacity-20 rounded-full"></div>

        {/* Register Card */}

        <div className="relative z-10 w-full max-w-lg bg-white/80 backdrop-blur-xl border border-white/20 rounded-[32px] shadow-2xl p-10">
          {/* Heading */}

          <h1 className="text-4xl font-bold text-slate-800 text-center">
            Create Account
          </h1>

          <p className="text-slate-500 text-center mt-4 leading-relaxed">
            Join MediNova and manage your healthcare appointments seamlessly.
          </p>

          {/* Role Selector */}

          <div className="flex bg-slate-100 p-1 rounded-2xl mt-8">
            {/* Patient */}

            <button
              type="button"
              onClick={() => {
                setRole("patient");

                setFormData({
                  ...formData,

                  role: "patient",
                });
              }}
              className={`flex-1 py-3 rounded-2xl font-medium transition ${
                role === "patient"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md"
                  : "text-slate-600"
              }`}
            >
              Patient
            </button>

            {/* Doctor */}

            <button
              type="button"
              onClick={() => {
                setRole("doctor");

                setFormData({
                  ...formData,

                  role: "doctor",
                });
              }}
              className={`flex-1 py-3 rounded-2xl font-medium transition ${
                role === "doctor"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md"
                  : "text-slate-600"
              }`}
            >
              Doctor
            </button>
          </div>

          {/* Form */}

          <form onSubmit={handleRegister} className="mt-8 space-y-5">
            {/* Full Name */}

            <div>
              <label className="text-sm font-medium text-slate-600">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Email */}

            <div>
              <label className="text-sm font-medium text-slate-600">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Password */}

            <div>
              <label className="text-sm font-medium text-slate-600">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Confirm Password */}

            <div>
              <label className="text-sm font-medium text-slate-600">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Submit Button */}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition duration-300"
            >
              Create Account
            </button>
          </form>

          {/* Bottom Link */}

          <p className="text-center text-slate-500 mt-8">
            Already have an account?
            <Link
              to="/login"
              className="text-indigo-600 font-medium ml-2 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;
