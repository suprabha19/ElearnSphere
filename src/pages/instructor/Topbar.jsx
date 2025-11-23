// import React, { useState, useEffect } from "react";

// const Topbar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [instructorName, setInstructorName] = useState("Instructor");

//   useEffect(() => {
//     // Get user from localStorage
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user && user.name) {
//       setInstructorName(user.name);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token"); // clear token too
//     window.location.href = "/login";
//   };

//   // Get first letter of name
//   const initial = instructorName ? instructorName.charAt(0).toUpperCase() : "I";

//   return (
//     <header className="w-full h-16 bg-cream flex items-center justify-between px-6 shadow-md">
//       {/* Left Side - Logo or Title */}
//       <h1 className="text-xl font-bold text-gray-800">ElearnSphere</h1>

//       {/* Right Side - Profile Dropdown */}
//       <div className="relative">
//         {/* Circle with Initial */}
//         <button
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//           className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold"
//         >
//           {initial}
//         </button>

//         {/* Dropdown Menu */}
//         {dropdownOpen && (
//           <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
//             <button
//               onClick={handleLogout}
//               className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Topbar;
