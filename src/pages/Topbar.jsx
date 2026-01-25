import { FaShoppingCart, FaGlobe, FaSearch } from "react-icons/fa";
import NotificationBell from "../components/NotificationBell";

const Topbar = () => {
  return (
    <div className="w-full h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold text-blue-700">coursera</h1>
        <div className="flex items-center gap-1 text-gray-700 font-medium cursor-pointer">
          <span>Explore</span>
          <span>▼</span>
        </div>
        <span className="text-gray-700 font-medium cursor-pointer">
          My Learning
        </span>
      </div>

      {/* Middle search */}
      <div className="flex-1 mx-10">
        <div className="relative">
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="w-full pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-blue-600 p-2 rounded-full">
            <FaSearch size={16} />
          </button>
        </div>
      </div>

      {/* Right section icons */}
      <div className="flex items-center gap-5">
        {/* Cart */}
        <div className="relative">
          <FaShoppingCart size={18} className="text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
        </div>

        {/* Globe */}
        <div className="relative">
          <FaGlobe size={18} className="text-gray-700" />
        </div>

        {/* Notifications */}
        <NotificationBell />

        {/* Profile */}
        <div className="bg-orange-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-semibold">
          S
        </div>
      </div>
    </div>
  );
};

export default Topbar;
