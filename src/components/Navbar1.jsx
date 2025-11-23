import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Navbar1 = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchVisible]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim() === "") return;
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#fcf8f3] z-50 shadow-md">
      <div className="w-full mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="text-xl font-bold text-[#e44d30]">
          <Link to="/">ElearnSphere</Link>
        </div>

        {/* Right - Search & Enroll */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setSearchVisible(!searchVisible)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 hover:bg-[#e44d30]"
            >
              {searchVisible ? (
                <span className="text-white text-xl font-bold">&#x2715;</span>
              ) : (
                <FaSearch size={16} className="text-gray-700" />
              )}
            </button>
            {searchVisible && (
              <div className="absolute top-[45px] right-0 w-72 bg-white border border-gray-300 rounded-md shadow-lg flex items-center px-2 py-1 z-50">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="flex-grow px-3 py-2 outline-none text-sm"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={handleSearchSubmit}
                  className="text-gray-500 hover:text-black px-2"
                >
                  <FaSearch />
                </button>
              </div>
            )}
          </div>

          {/* Enroll Now Button */}
          <Link
            to="/signup"
            className="bg-[#e44d30] hover:bg-[#c0392b] text-white px-4 py-2 rounded"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
