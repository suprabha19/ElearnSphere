import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#fcf8f3] border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div className="ml-20">
          <div className="flex items-center space-x-2">
            <div className="bg-[#e44d30] rounded-[12px] text-white font-bold text-2xl w-10 h-10 flex items-center justify-center">
              E
            </div>
            <div>
              <p className="text-xl font-bold text-[#e44d30]">ElearnSphere</p>
              <p className="text-[13px] text-gray-500 uppercase tracking-wider">
                An E-learning Platform
              </p>
            </div>
          </div>
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            ElearnSphere is an e-learning platform designed to provide
            high-quality courses in Computer Science, IT, and beyond. Learn,
            grow, and achieve your goals with us.
          </p>

          {/* Social Media */}
          <div className="mt-4">
            <p className="mb-2 text-gray-500">Follow us</p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="p-2 text-orange-600 rounded-full border-2 border-orange-600 h-10 w-10 cursor-pointer hover:bg-orange-100 transition" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="p-2 text-orange-600 rounded-full border-2 border-orange-600 h-10 w-10 cursor-pointer hover:bg-orange-100 transition" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="p-2 text-orange-600 rounded-full border-2 border-orange-600 h-10 w-10 cursor-pointer hover:bg-orange-100 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Navigate */}
        <div className="ml-35">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Navigate</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-[#e44d30] flex items-center gap-2"
              >
                <FaArrowUpRightFromSquare className="text-orange-600 text-xs" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allcourses"
                className="hover:text-[#e44d30] flex items-center gap-2"
              >
                <FaArrowUpRightFromSquare className="text-orange-600 text-xs" />
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="hover:text-[#e44d30] flex items-center gap-2"
              >
                <FaArrowUpRightFromSquare className="text-orange-600 text-xs" />
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-[#e44d30] flex items-center gap-2"
              >
                <FaArrowUpRightFromSquare className="text-orange-600 text-xs" />
                Log In
              </Link>
            </li>
            {/* <Link
                to="/blogs"
                className="hover:text-[#e44d30] flex items-center gap-2"
              >
                <FaArrowUpRightFromSquare className="text-orange-600 text-xs" />
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="hover:text-[#e44d30] flex items-center gap-2"
              >
                <FaArrowUpRightFromSquare className="text-orange-600 text-xs" />
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#e44d30] flex items-center gap-2"
              >
                <FaArrowUpRightFromSquare className="text-orange-600 text-xs" />
                Contact
              </Link> */}
            {/* </li> */}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Get in Touch
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Email: support@elearnsphere.com
          </p>
          <p className="text-sm text-gray-600 mb-2">Phone: +977-9812345678</p>
          <p className="text-sm text-gray-600">Location: Kathmandu, Nepal</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ElearnSphere. All Rights Reserved.
        {/* <span className="ml-4">
          <Link to="/terms" className="hover:text-[#e44d30]">
            Terms
          </Link>{" "}
          ·
          <Link to="/privacy" className="hover:text-[#e44d30] ml-2">
            Privacy
          </Link>{" "}
          ·
          <Link to="/help" className="hover:text-[#e44d30] ml-2">
            Help
          </Link> */}
        {/* </span> */}
      </div>
    </footer>
  );
};

export default Footer;
