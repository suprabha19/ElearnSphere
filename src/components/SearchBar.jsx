import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border rounded-full px-4 py-2 w-full max-w-md bg-white shadow-sm"
    >
      <input
        type="text"
        placeholder="What do you want to learn?"
        className="flex-grow text-gray-700 text-sm outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 bg-[#e44d30] hover:bg-[#e44d30] text-white p-2 rounded-full"
      >
        <FaSearch size={14} />
      </button>
    </form>
  );
};

export default SearchBar;
