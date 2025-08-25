import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaCaretDown } from "react-icons/fa";
import SearchBar from "./SearchBar";

const dropdowns = {
  Knowledgebase: ["AI-Powered Knowledgebase", "Knowledgebase Grid"],
  Courses: ["All Courses", "Single Course"],
  Shop: ["Products Section", "Single Product"],
  Blog: ["Blog Grid", "Blog Single"],
  Pages: ["About Us", "Services", "Pricing", "FAQ"],
};

const getPath = (label) => {
  const map = {
    "AI-Powered Knowledgebase": "/knowledgebase",
    "Knowledgebase Grid": "/grid",
    "All Courses": "/allcourses",
    "Single Course": "/singlecourse",
    "Products Section": "/products",
    "Single Product": "/single-product",
    "Blog Grid": "/blogs",
    "Blog Single": "/blog/1",
    "About Us": "/about-us",
    Services: "/services",
    Pricing: "/pricing",
    FAQ: "/faq",
  };
  return map[label] || "/";
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearch = (query) => {
    alert(`Searching for: ${query}`);
  };

  const toggleExplore = () => {
    setExploreOpen(!exploreOpen);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#fcf8f3] z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <div className="bg-[#e44d30] rounded-[17px] text-white font-bold text-[40px] w-12 h-12 flex items-center justify-center ml-0 ">
            E
          </div>
          <div>
            <p className="text-2xl font-bold text-black ml-0 pl-0">
              <Link to="/" className="text-2xl font-bold text-[#e44d30]">
                ElearnSphere
              </Link>
            </p>
            <p className="text-[12px] text-gray-500 uppercase tracking-wider">
              An E-learning platform
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4" ref={dropdownRef}>
          {/* Explore */}
          <div className="relative">
            <button
              onClick={toggleExplore}
              className="flex items-center text-gray-700 font-medium hover:text-[#e44d30]"
            >
              Explore <FaCaretDown className="ml-1" />
            </button>

            {exploreOpen && (
              <div className="fixed left-0 top-[70px] w-full bg-[#fcf8f3] shadow-lg py-6 z-50">
                <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8 px-6">
                  {Object.entries(dropdowns).map(([category, items], idx) => (
                    <div key={idx}>
                      <p className="font-semibold text-gray-900 mb-2">
                        {category}
                      </p>
                      <ul className="space-y-1 text-gray-600">
                        {items.map((item, i) => (
                          <li key={i}>
                            <Link
                              to={getPath(item)}
                              className="block hover:text-[#e44d30] text-sm"
                              onClick={() => setExploreOpen(false)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auth Links */}
          <Link to="/login" className="text-[#e44d30] hover:underline">
            Log In
          </Link>
          <Link
            to="/signup"
            className="border border-[#e44d30] text-[#e44d30] px-3 py-1 rounded hover:bg-[#e44d30] hover:text-white"
          >
            Enroll Now
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4">
          <SearchBar onSearch={handleSearch} />
          {Object.entries(dropdowns).map(([category, items], idx) => (
            <div key={idx} className="mt-4">
              <p className="font-semibold text-gray-900">{category}</p>
              {items.map((item, i) => (
                <Link
                  key={i}
                  to={getPath(item)}
                  className="block text-gray-700 text-sm py-1 hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          ))}
          <div className="mt-4 flex flex-col space-y-2">
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
            <Link
              to="/signup"
              className="border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white text-center"
            >
              Join for Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
