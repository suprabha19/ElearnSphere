import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaUser } from "react-icons/fa";

const DashboardTopbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const profileRef = useRef();

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // Fetch search suggestions
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/search?query=${query}`
        );
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResults([]);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (course) => {
    setQuery(course.title);
    setResults([]);
    const role = userProfile?.role?.toLowerCase();
    if (role === "student") {
      navigate(`/student-dashboard/course/${course._id}`);
    } else {
      navigate(`/courses/${course._id}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleProfileClick = () => {
    const role = userProfile?.role?.toLowerCase();
    if (role === "student") {
      navigate("/student-dashboard/profile");
    } else if (role === "instructor") {
      navigate("/instructor-dashboard/profile");
    }
    setDropdownOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-2xl" ref={dropdownRef}>
        <div className="flex items-center border rounded-full px-4 py-2 bg-white shadow-sm">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-grow text-gray-700 text-sm outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="ml-2 bg-[#e44d30] hover:bg-[#d43d20] text-white p-2 rounded-full"
          >
            <FaSearch size={14} />
          </button>
        </div>

        {results.length > 0 && (
          <ul className="absolute bg-white w-full mt-1 border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
            {results.map((course) => (
              <li
                key={course._id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(course)}
              >
                {course.title}
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <p className="absolute bg-white w-full mt-1 p-2 border rounded-lg text-gray-500 shadow-lg">
            No results found
          </p>
        )}
      </div>

      {/* Profile Icon with Dropdown */}
      <div className="relative ml-6" ref={profileRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-10 h-10 rounded-full bg-[#e44d30] text-white flex items-center justify-center font-bold hover:bg-[#d43d20] transition"
        >
          {userProfile?.profilePicture ? (
            <img
              src={`http://localhost:5000${userProfile.profilePicture}`}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            getInitials(userProfile?.fullName)
          )}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
            <div className="px-4 py-3 border-b">
              <p className="font-semibold text-gray-800">{userProfile?.fullName}</p>
              <p className="text-sm text-gray-500">{userProfile?.email}</p>
              <p className="text-xs text-gray-400 mt-1 capitalize">
                {userProfile?.role?.toLowerCase()}
              </p>
            </div>
            <button
              onClick={handleProfileClick}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <FaUser size={14} />
              View Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTopbar;
