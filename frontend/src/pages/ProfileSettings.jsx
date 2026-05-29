import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import api from "../utils/api";

function ProfileSettings() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get(`/users/profile/${user.id}`);

      setName(data.name);

      setEmail(data.email);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.put(
        `/users/profile/${user.id}`,

        {
          name,

          email,
        },
      );

      localStorage.setItem(
        "user",

        JSON.stringify(data),
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FF] flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-lg p-10">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Profile Settings
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-600 mb-2">Full Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-2">Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSettings;
