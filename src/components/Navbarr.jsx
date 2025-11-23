import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaSearch,
  FaBars,
  FaTimes,
  FaCaretDown,
} from "react-icons/fa";

const dropdowns = {
  Knowledgebase: ["AI-Powered Knowledgebase", "Knowledgebase Grid"],
  Shop: ["Products", "Single Product"],
  Courses: ["All Courses", "Single Course"],
  Blog: ["Blog Grid", "Blog Single"],
  Pages: ["About Us", "Services", "Pricing"],
};

const getPath = (label) => {
  const map = {
    "E-Learning & Courses": "/",
    "AI-Powered Knowledgebase": "/knowledgebase",
    "Tech Camp Home": "/TechCamp",
    "Knowledgebase Grid": "/grid",
    "All Courses": "/allcourses",
    "Single Course": "/singlecourse",
    Articles: "/articles",
    Topics: "/topics",
    FAQs: "/faqs",
    "Products Section": "/products",
    "Single Product": "/single-product",
    Cart: "/cart",
    Checkout: "/checkout",
    "Blog Grid": "/blogs",
    "Blog Single": "/blog/1",
    "About Us": "/about-us",
    Contact: "/contact",
    Pricing: "/pricing",
  };
  return map[label] || "/";
};

const Navbarr = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const navRef = useRef(null);

  const toggleDropdown = (item) => {
    setActiveDropdown(activeDropdown === item ? null : item);
  };

  const toggleMobileDropdown = (item) => {
    setMobileDropdown(mobileDropdown === item ? null : item);
  };

  useEffect(() => {
    if (searchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        navRef.current &&
        !navRef.current.contains(e.target)
      ) {
        setSearchVisible(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchVisible, activeDropdown]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim() === "") return;
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 w-full bg-[#fcf8f3] z-50">
        <div className="w-full mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="bg-[#e44d30] rounded-[17px] text-white font-bold text-[40px] w-12 h-12 flex items-center justify-center ml-0 lg:ml-16">
              E
            </div>
            <div>
              <p className="text-2xl font-bold text-black ml-0 pl-0">
                ElearnSphere
              </p>
              <p className="text-[12px] text-gray-500 uppercase tracking-wider">
                An E-learning platform
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {[
              { label: "Home", path: "/" },
              "Knowledgebase",
              "Courses",
              "Shop",
              "Blog",
              "Pages",
              "Contact Us",
            ].map((item, index) => {
              if (typeof item === "object") {
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className="font-semibold text-black px-3 py-2 border-2 border-transparent hover:border-black"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={index} className="relative">
                  <button
                    className="font-semibold text-black flex items-center gap-1 px-3 py-2 border-2 border-transparent hover:border-black"
                    onClick={() => toggleDropdown(item)}
                  >
                    {item}
                    {dropdowns[item] && (
                      <FaCaretDown className="w-4 h-4 text-black mt-1" />
                    )}
                  </button>
                  {dropdowns[item] && activeDropdown === item && (
                    <div className="absolute left-0 top-12 mt-2 shadow-md py-2 w-60 bg-white z-50">
                      {dropdowns[item].map((option, idx) => (
                        <Link
                          key={idx}
                          to={getPath(option)}
                          className="block px-4 py-2 text-[16px] text-black font-medium hover:bg-gray-100"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {option}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center space-x-4 mr-15">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-black bg-gray-300 hover:bg-[#e44d30]">
              <FaShoppingBag
                size={16}
                className="text-gray-700 hover:text-white"
              />
            </button>

            {/* Search */}
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
                    placeholder="Search courses, topics..."
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

            {/* Enroll Now */}
            {/* <Link
              to="/signup"
              className="bg-[#e44d30] hover:bg-[#c0392b] text-white px-4 py-2 whitespace-nowrap"
            >
              Enroll Now
            </Link> */}
          </div>

          {/* Mobile Menu Icons */}
          <div className="lg:hidden flex items-center space-x-3">
            <button className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center">
              <FaShoppingBag size={16} className="text-black" />
            </button>
            <button
              onClick={() => setSearchVisible(!searchVisible)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300"
            >
              {searchVisible ? (
                <span className="text-white text-xl font-bold">&#x2715;</span>
              ) : (
                <FaSearch size={16} className="text-gray-700" />
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#fcf8f3] px-8 pb-4 mt-[7px]">
            {[
              { label: "Home", path: "/" },
              "Knowledgebase",
              "Courses",
              "Shop",
              "Blog",
              "Pages",
              "Contact Us",
            ].map((item, index) => {
              if (typeof item === "object") {
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className="block py-2 border-b font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={index} className="py-2 border-b">
                  <div
                    onClick={() => toggleMobileDropdown(item)}
                    className="flex justify-between items-center cursor-pointer font-medium"
                  >
                    <span>{item}</span>
                    {dropdowns[item] && (
                      <span>{mobileDropdown === item ? "−" : "+"}</span>
                    )}
                  </div>
                  {mobileDropdown === item && (
                    <ul className="ml-4 mt-1 space-y-1 text-sm text-gray-700">
                      {dropdowns[item].map((option, idx) => (
                        <li key={idx}>
                          <Link
                            to={getPath(option)}
                            className="block py-1 hover:underline"
                            onClick={() => setMenuOpen(false)}
                          >
                            {option}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbarr;
