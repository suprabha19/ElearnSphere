// src/components/FeaturedCourses.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaUserGraduate } from "react-icons/fa";

const courses = [
  {
    id: 1,
    title: "Full-Stack Web Development with React and Spring Boot",
    price: "$39.99",
    duration: "40 hours",
    lessons: "120",
    students: "850",
    image: "/images/course1.jpg",
  },
  {
    id: 2,
    title: "Mastering Data Structures and Algorithms in Java",
    price: "$29.99",
    duration: "32 hours",
    lessons: "90",
    students: "950",
    image: "/images/course2.jpg",
  },
  {
    id: 3,
    title: "Cybersecurity Essentials: From Zero to Hero",
    price: "$34.99",
    duration: "36 hours",
    lessons: "110",
    students: "780",
    image: "/images/course3.jpg",
  },
  {
    id: 4,
    title: "Artificial Intelligence and Machine Learning Bootcamp",
    price: "$45.00",
    duration: "50 hours",
    lessons: "150",
    students: "1,200",
    image: "/images/course4.jpg",
  },
  {
    id: 5,
    title: "Cloud Computing with AWS, Azure, and Google Cloud",
    price: "$38.50",
    duration: "42 hours",
    lessons: "100",
    students: "640",
    image: "/images/course5.jpg",
  },
  {
    id: 6,
    title: "Building Scalable APIs with Node.js and Express",
    price: "$27.99",
    duration: "28 hours",
    lessons: "85",
    students: "710",
    image: "/images/course6.jpg",
  },
];

const Courses = () => {
  return (
    <section className="w-full px-4 md:px-20 py-12 bg-[#fcf8f3]">
      <h2 className="text-4xl font-bold text-center mb-12">
        Featured Online Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-8 ">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center gap-6 p-4 transition-all duration-300 hover:bg-white hover:shadow-lg"
          >
            <img
              src={course.image}
              alt="Course"
              className="w-38 h-38 rounded-tl-[500px] rounded-br-[500px] rounded-bl-[500px] rounded-tr-[500px] object-cover border-white shadow-md"
            />
            <div>
              <p className="text-[#ff5b5b] font-semibold text-lg">
                {course.price} / {course.duration}
              </p>
              <h3 className="text-xl font-bold mt-1 mb-3">{course.title}</h3>
              <div className="flex gap-6 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <FaBook /> {course.lessons} Lessons
                </div>
                <div className="flex items-center gap-1">
                  <FaUserGraduate /> {course.students} Students
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Courses Button */}
      <div className="flex justify-center mt-12">
        <Link to="/allcourses">
          <button className="bg-[#ff5b5b] hover:bg-[#e14e4e] text-white font-semibold px-6 py-3 shadow-md transition-all duration-300">
            View All Courses
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Courses;
