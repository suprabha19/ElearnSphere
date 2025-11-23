import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "STUDENT", // Default role
    secretCode: "",
    // qualifications: "",
    // experience: "",
    // verificationDocument: null,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, verificationDocument: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic validation
    // if (
    //   form.role === "INSTRUCTOR" &&
    //   (!form.qualifications || !form.experience || !form.verificationDocument)
    // ) {
    //   setError(
    //     "Instructors must provide qualifications, experience, and verification document"
    //   );
    //   setIsSubmitting(false);
    //   return;
    // }

    try {
      const data = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      // Attach secretCode if role = INSTRUCTOR or ADMIN
      if (form.role === "INSTRUCTOR" || form.role === "ADMIN") {
        data.secretCode = form.secretCode; // 👈 add secretCode if needed
      }
      // if (form.role === "INSTRUCTOR") {
      //   formData.append("qualifications", form.qualifications);
      //   formData.append("experience", form.experience);
      //   formData.append("verificationDocument", form.verificationDocument);
      // }

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form, // <--- your FormData
        {
          headers: {
            "Content-Type": "application/json", // required for files
          },
        }
      );

      console.log("✅ Signup Success:", res.data);

      // if (form.role === "INSTRUCTOR") {
      //   alert(
      //     "Your instructor application has been submitted for admin approval. You'll receive an email when approved."
      //   );
      // } else {
      //   alert("Account created successfully!");
      // }

      navigate("/login");
    } catch (err) {
      console.error("❌ Signup Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded max-w-md w-full relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-gray-500 hover:text-red-500 text-3xl"
          aria-label="Close Signup Form"
        >
          <IoClose />
        </button>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create an Account
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name:</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
              required
              minLength="8"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role:</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
            >
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
            </select>
          </div>
          {/* Secret Code for Instructor/Admin */}
          {form.role === "INSTRUCTOR" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Secret Code:</label>
              <input
                type="text"
                name="secretCode"
                value={form.secretCode}
                onChange={handleChange}
                placeholder="Enter secret code"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
                required
              />
            </div>
          )}

          {/* {form.role === "INSTRUCTOR" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Qualifications:
                </label>
                <textarea
                  name="qualifications"
                  placeholder="Your degrees, certifications, etc."
                  value={form.qualifications}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
                  rows="3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Experience (years):
                </label>
                <input
                  type="number"
                  name="experience"
                  placeholder="Years of teaching experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#e44d30]"
                  min="0"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Verification Document:
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                  <input
                    type="file"
                    name="verificationDocument"
                    onChange={handleFileChange}
                    className="hidden"
                    id="verificationDocument"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    required
                  />
                  <label
                    htmlFor="verificationDocument"
                    className="cursor-pointer block"
                  >
                    {form.verificationDocument ? (
                      <span className="text-green-600">
                        {form.verificationDocument.name} (Click to change)
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        Upload your ID, certification, or other proof (PDF, DOC,
                        JPG)
                      </span>
                    )}
                  </label>
                </div>
              </div>
            </>
          )} */}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#e44d30] hover:bg-[#e44d40] text-white font-semibold py-3 rounded transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Processing..." : "Sign Up"}
          </button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#e44d30] hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
