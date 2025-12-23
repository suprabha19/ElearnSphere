// src/pages/student/StudentProfile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        bio: data.bio || "",
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Failed to load profile");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/users/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-6">👤 My Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={profile.email}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[#e44d30] hover:bg-[#d43d20] text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
