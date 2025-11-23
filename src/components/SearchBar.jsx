import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // Fetch suggestions
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (course) => {
    setQuery(course.title);
    setResults([]);
    navigate(`/courses/${course._id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0]);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      {/* <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border p-2 rounded"
      /> */}
      <form className="flex items-center border rounded-full px-4 py-2 w-full max-w-md bg-white shadow-sm">
        <input
          type="text"
          placeholder="What do you want to learn?"
          className="flex-grow text-gray-700 text-sm outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="submit"
          className="ml-2 bg-[#e44d30] hover:bg-[#e44d30] text-white p-2 rounded-full"
        >
          <FaSearch size={14} />
        </button>
      </form>

      {results.length > 0 && (
        <ul className="absolute bg-white w-full mt-1 border rounded-lg shadow max-h-60 overflow-y-auto z-50">
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
        <p className="absolute bg-white w-full mt-1 p-2 border rounded-lg text-gray-500">
          No results found
        </p>
      )}
    </div>
  );
};

export default SearchBar;
