import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="px-6 pt-6">
      <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl px-8 py-4 flex justify-between items-center">
        {/* Logo */}

        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
          MediNova
        </h1>

        {/* Nav Links */}

        <div className="hidden md:flex gap-8 font-medium text-slate-700">
          <Link to="/" className="hover:text-indigo-600 transition">
            Home
          </Link>

          <Link to="/doctors" className="hover:text-indigo-600 transition">
            Doctors
          </Link>

          <Link to="/about" className="hover:text-indigo-600 transition">
            About
          </Link>
        </div>

        {/* Right Side */}

        <div className="flex gap-3 items-center">
          {user ? (
            <>
              {/* User Info */}

              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-slate-700">
                  {user.name}
                </p>

                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
              </div>

              {/* Dashboard Button */}

              <Link
                to={
                  user.role === "doctor"
                    ? "/doctor/dashboard"
                    : "/patient/dashboard"
                }
              >
                <button className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg hover:scale-105 transition">
                  Dashboard
                </button>
              </Link>

              {/* Logout Button */}

              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium shadow-md hover:scale-[1.03] transition duration-300">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg hover:scale-105 transition">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
