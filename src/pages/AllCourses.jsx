import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AllCourses.css";

function AllCourses() {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Introduction to Python Programming",
      image: "intro to python proggramming.jpg",
      alt: "Python Programming Course",
    },
    {
      id: 2,
      title: "Advanced Excel for Data Analysis",
      image: "exforda.jpg",
      alt: "Excel for Data Analysis Course",
      description: "Master Excel's advanced features for data analysis...",
      duration: "4 weeks",
    },
    {
      id: 3,
      title: "Creative Writing Workshop",
      image: "cww.jpg",
      alt: "Creative Writing Course",
      description: "Enhance your writing skills through creative exercises...",
      duration: "6 weeks",
    },
    {
      id: 4,
      title: "Project Management Essentials",
      image: "Pme.jpg",
      alt: "Project Management Course",
      description: "Learn the fundamentals of project management...",
      duration: "5 weeks",
    },
    {
      id: 5,
      title: "SEO Optimization Techniques",
      image: "seo.jpg",
      alt: "SEO Optimization Course",
      description: "Improve your website's visibility with SEO techniques...",
      duration: "4 weeks",
    },
    {
      id: 6,
      title: "Data Science Fundamentals",
      image: "gdf.jpg",
      alt: "Data Science Course",
      description: "Get started with data science and machine learning...",
      duration: "8 weeks",
    },
    {
      id: 7,
      title: "Web Development Bootcamp",
      image: "web.jpg",
      alt: "Web Development Bootcamp",
      description:
        "Become a full-stack web developer in this comprehensive bootcamp...",
      duration: "12 weeks",
    },
    {
      id: 8,
      title: "Digital Marketing Strategies",
      image: "dms.jpeg",
      alt: "Digital Marketing Course",
      description:
        "Learn effective digital marketing strategies to grow your business...",
      duration: "6 weeks",
    },
  ];

  return (
    <div className="all-courses-container">
      {/* Navigation Sidebar (unchanged) */}

      {/* Courses Row */}
      <div className="courses-row">
        <h2 className="courses-heading">Available Courses</h2>
        <div className="row-container">
          {courses.map((course) => (
            <div key={course.id} className="course-card-horizontal">
              <div className="course-image-horizontal">
                <img
                  src={`/images/${course.image}`}
                  alt={course.alt}
                  className="subject-image-horizontal"
                  onError={(e) => {
                    e.target.src = "/images/default-course.jpg";
                    e.target.alt = "Default course image";
                  }}
                />
              </div>
              <div className="course-info-horizontal">
                <h3>{course.title}</h3>
                <button
                  className="view-btn-horizontal"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllCourses;
