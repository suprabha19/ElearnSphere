import React from "react";
import { useParams, Link } from "react-router-dom";
import "./SingleCourses.css";
import CourseDetail from "./CourseDetail"; // Import the CourseDetail component
function SingleCourse() {
  // This would normally come from an API call using the courseId
  const { courseId } = useParams();

  // // Sample course data - in a real app this would come from your backend
  const courses = {
    1: {
      title: "Introduction to Python Programming",
      description:
        "This comprehensive Python course takes you from beginner to proficient programmer. Learn Python fundamentals, data structures, and build real-world applications through hands-on projects.",
      duration: "6 weeks",
      level: "Beginner",
      price: "$99",
      students: 1250,
      syllabus: [
        "Week 1: Python Basics - Syntax, Variables, Data Types",
        "Week 2: Control Flow - Conditionals, Loops",
        "Week 3: Functions and Modules",
        "Week 4: Object-Oriented Programming",
        "Week 5: Working with Files and APIs",
        "Week 6: Final Project - Build a Real Application",
      ],
      requirements: [
        "No prior programming experience needed",
        "Computer with internet access",
        "Dedication to practice 5-7 hours per week",
      ],
      thumbnail: "/images/intro to python proggramming.jpg",
    },
    2: {
      title: "Advanced Excel for Data Analysis",

      description:
        "Master Excel's advanced features for data analysis. Learn pivot tables, advanced formulas, data visualization, and automation techniques used by business analysts.",
      duration: "4 weeks",
      level: "Intermediate",
      price: "$79",
      rating: 4.6,
      students: 890,
      syllabus: [
        "Week 1: Advanced Formulas and Functions",
        "Week 2: Data Analysis with PivotTables",
        "Week 3: Data Visualization Techniques",
        "Week 4: Automation with Macros and VBA",
      ],
      requirements: [
        "Basic Excel knowledge",
        "Excel 2016 or later installed",
        "Interest in data analysis",
      ],
      thumbnail: "/images/exforda.jpg",
    },
  };

  const course = courses[courseId] || courses[1]; // Default to first course if not found

  return (
    <div className="single-course-page">
      {/* Course Header Section */}
      <div className="course-header">
        <div className="breadcrumb">
          <Link to="/all-courses">All Courses</Link> &gt; {course.title}
        </div>
        <h1 className="course-title">{course.title}</h1>
        <div className="course-meta">
          <span className="level">Level: {course.level}</span>
          <span className="duration">Duration: {course.duration}</span>
        </div>
      </div>

      {/* Main Course Content */}
      <div className="course-content">
        {/* Left Column */}
        <div className="course-left-column">
          <div className="course-thumbnail">
            <img src={course.thumbnail} alt={course.title} />
          </div>

          <div className="course-description">
            <h2>Course Description</h2>
            <p>{course.description}</p>
          </div>

          <div className="course-syllabus">
            <h2>Syllabus</h2>
            <ul>
              {course.syllabus.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="course-right-column">
          <div className="course-enrollment">
            <div className="price">{course.price}</div>
            <button className="enroll-btn">Enroll Now</button>
            <button className="wishlist-btn">Add to Wishlist</button>
          </div>
        </div>
        <ul>
          {course.requirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SingleCourse;
