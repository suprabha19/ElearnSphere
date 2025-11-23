import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Overview", path: "overview" },
  { label: "Enrolled Courses", path: "courses" },
  { label: "Deadlines", path: "deadlines" },
  { label: "Performance", path: "performance" },
  { label: "Quizzes", path: "quizzes" },
  { label: "Notes & Bookmarks", path: "notes" },
  { label: "Forum", path: "forum" },
  { label: "Certificates", path: "certificates" },
  { label: "Gamification", path: "gamification" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6 text-blue-700">
        Student Dashboard
      </h2>
      <nav className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-500 text-white" : "text-gray-800"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
