// src/pages/instructor/InstructorProfile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InstructorProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    qualifications: "",
    experience: "",
    expertise: [],
  });
  const [newExpertise, setNewExpertise] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

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
        qualifications: data.qualifications || "",
        experience: data.experience || "",
        expertise: data.expertise || [],
      });
      setProfilePicture(data.profilePicture || "");
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

  const handleAddExpertise = () => {
    if (newExpertise.trim() && !profile.expertise.includes(newExpertise.trim())) {
      setProfile({ ...profile, expertise: [...profile.expertise, newExpertise.trim()] });
      setNewExpertise("");
    }
  };

  const handleRemoveExpertise = (index) => {
    setProfile({
      ...profile,
      expertise: profile.expertise.filter((_, i) => i !== index),
    });
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

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPicture(true);
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:5000/api/users/profile/picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfilePicture(data.profilePicture);
      toast.success("Profile picture updated!");
    } catch (err) {
      console.error("Error uploading picture:", err);
      toast.error("Failed to upload picture");
    } finally {
      setUploadingPicture(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-6">👤 My Profile</h1>

      {/* Profile Picture */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {profilePicture ? (
              <img
                src={`http://localhost:5000${profilePicture}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl text-gray-500">
                {profile.fullName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <label className="bg-[#e44d30] hover:bg-[#d43d20] text-white px-4 py-2 rounded-lg cursor-pointer transition">
              {uploadingPicture ? "Uploading..." : "Upload Picture"}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="hidden"
                disabled={uploadingPicture}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
          </div>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Qualifications
          </label>
          <textarea
            name="qualifications"
            value={profile.qualifications}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
            placeholder="e.g., PhD in Computer Science, MSc in Data Science"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience
          </label>
          <textarea
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
            placeholder="Describe your teaching and professional experience"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Areas of Expertise
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newExpertise}
              onChange={(e) => setNewExpertise(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddExpertise())}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
              placeholder="e.g., Machine Learning, Web Development"
            />
            <button
              type="button"
              onClick={handleAddExpertise}
              className="bg-[#e44d30] hover:bg-[#d43d20] text-white px-4 py-2 rounded-lg transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.expertise.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveExpertise(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
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

export default InstructorProfile;
