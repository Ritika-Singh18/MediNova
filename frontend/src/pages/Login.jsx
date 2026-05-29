import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../utils/api";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      /* Save Token */
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful");

      /* Role Based Redirect */

      if (data.user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/patient/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FF] overflow-hidden">
      {/* Navbar */}

      <Navbar />

      {/* Login Section */}

      <section className="relative flex justify-center px-6 py-16">
        {/* Background Glow */}

        <div className="absolute top-0 left-10 w-72 h-72 bg-cyan-200 blur-3xl opacity-20 rounded-full"></div>

        <div className="absolute bottom-0 right-10 w-72 h-72 bg-indigo-300 blur-3xl opacity-20 rounded-full"></div>

        {/* Login Card */}

        <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/20 rounded-[32px] shadow-2xl p-10">
          {/* Heading */}

          <h1 className="text-4xl font-bold text-slate-800 text-center">
            Welcome Back
          </h1>

          <p className="text-slate-500 text-center mt-4 leading-relaxed">
            Login to continue managing your appointments and healthcare records.
          </p>

          {/* Form */}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
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
                placeholder="Enter password"
                className="w-full mt-2 px-5 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Forgot Password */}

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Bottom Link */}

          <p className="text-center text-slate-500 mt-8">
            Don’t have an account?
            <Link
              to="/register"
              className="text-indigo-600 font-medium ml-2 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
