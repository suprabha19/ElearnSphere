// src/pages/admin/Settings.jsx
import React, { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "react-toastify";

const Settings = () => {
  const [settings, setSettings] = useState({
    platformName: "ElearnSphere",
    platformEmail: "admin@elearnsphere.com",
    allowRegistration: true,
    requireEmailVerification: false,
    maxCoursesPerInstructor: 50,
    maxStudentsPerCourse: 1000,
  });

  const handleSave = (e) => {
    e.preventDefault();
    // In a real application, you would send this to the backend
    toast.success("Settings saved successfully");
    console.log("Settings saved:", settings);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Platform Settings</h1>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            General Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform Name
              </label>
              <input
                type="text"
                value={settings.platformName}
                onChange={(e) =>
                  setSettings({ ...settings, platformName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce472c]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform Email
              </label>
              <input
                type="email"
                value={settings.platformEmail}
                onChange={(e) =>
                  setSettings({ ...settings, platformEmail: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce472c]"
              />
            </div>
          </div>
        </div>

        {/* Registration Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Registration Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Allow Registration</p>
                <p className="text-sm text-gray-600">
                  Enable or disable new user registrations
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowRegistration}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      allowRegistration: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ce472c]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ce472c]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  Email Verification
                </p>
                <p className="text-sm text-gray-600">
                  Require email verification for new users
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.requireEmailVerification}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      requireEmailVerification: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ce472c]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ce472c]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Course Limits */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Course Limits
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Courses per Instructor
              </label>
              <input
                type="number"
                value={settings.maxCoursesPerInstructor}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxCoursesPerInstructor: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce472c]"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Students per Course
              </label>
              <input
                type="number"
                value={settings.maxStudentsPerCourse}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxStudentsPerCourse: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce472c]"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#ce472c] text-white px-6 py-3 rounded-lg hover:bg-[#e44d30] transition flex items-center gap-2"
          >
            <Save size={20} />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
