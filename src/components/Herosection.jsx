import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Herosection = () => {
  return (
    <>
      <section className="bg-[#fcf8f3] w-full min-h-screen px-20 py-8 mt-8 flex items-center">
        <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-4">
          {/* ✏️ Left Content */}
          <div className="lg:w-[40%] w-full space-y-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Unlock Your Potential with ElearnSphere
            </h1>
            <p className="text-gray-700 text-lg">
              Explore wide range of courses, expert instructors, and AI-powered
              tools to boost your learning journey.
            </p>
            <p className="text-gray-700 text-lg">
              The world is learning differently, from startups to schools, from
              curious minds to career climbers - ElearnSphere is empowering
              learners everywhere.
            </p>
            {/* Search Input */}
            {/* Get Started Button (linked to signup) */}
            <div className="mt-4">
              <Link
                to="/signup"
                className="bg-black text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition-colors inline-block"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* 🎥 Right Side Videos */}
          <div className="lg:w-[70%] w-full flex flex-col sm:flex-row items-center justify-center gap-4">
            <video
              src="./videos/video1.mp4"
              autoPlay
              muted
              loop
              className="w-full sm:w-1/2 h-[450px] object-cover rounded-bl-[160px] mt-15 sm:mt-16 shadow-md"
            />
            <video
              src="./videos/video2.mp4"
              autoPlay
              muted
              loop
              className="w-full sm:w-1/2 h-[450px] object-cover rounded-tr-[160px] mb-15 sm:mb-16 shadow-md"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Herosection;
