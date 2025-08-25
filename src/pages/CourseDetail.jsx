import React from "react";
import { useParams } from "react-router-dom";
import "./CourseDetail.css";

function CourseDetail() {
  const { id } = useParams();

  const courses = [
    {
      id: 1,
      title: "Introduction to Python Programming",
      image: "intro to python proggramming.jpg",
      description:
        "Learn Python from scratch with hands-on exercises and real-world projects. Perfect for beginners who want to start their programming journey.",
      duration: "8 weeks",
      syllabus: ["Basic Syntax", "Data Structures", "OOP Concepts"],
      price: "$99",
    },
    {
      id: 2,
      title: "Advanced Excel for Data Analysis",
      image: "exforda.jpg",
      description:
        "Master Excel's advanced features for data analysis. Learn pivot tables, advanced formulas, data visualization, and automation techniques used by business analysts.",
      duration: "6 weeks",
      syllabus: [
        "Pivot Tables",
        "Advanced Formulas",
        "Data Visualization",
        "Automation",
      ],
      price: "$79",
    },
    {
      id: 3,
      title: "Creative Writing Workshop",
      image: "cww.jpg",
      description:
        "Enhance your writing skills through creative exercises and feedback. Suitable for all levels, from beginners to advanced writers.",
      duration: "4 weeks",
      syllabus: [
        "Storytelling Techniques",
        "Character Development",
        "Editing and Feedback",
      ],
      price: "$59",
    },
    {
      id: 4,
      title: "Project Management Essentials",
      image: "Pme.jpg",
      description:
        "Learn the fundamentals of project management, including planning, execution, and monitoring. Ideal for aspiring project managers.",
      duration: "5 weeks",
      syllabus: ["Project Planning", "Risk Management", "Agile Methodologies"],
      price: "$109",
    },
    {
      id: 5,
      title: "SEO Optimization Techniques",
      image: "seo.jpg",
      description:
        "Improve your website's visibility with SEO techniques. Learn keyword research, on-page optimization, and link building strategies.",
      duration: "4 weeks",
      syllabus: ["Keyword Research", "On-Page SEO", "Link Building"],
      price: "$89",
    },
    {
      id: 6,
      title: "Data Science Fundamentals",
      image: "gdf.jpg",
      description:
        "Get started with data science and machine learning. Learn data analysis, visualization, and basic machine learning algorithms.",
      duration: "8 weeks",
      syllabus: [
        "Data Analysis",
        "Data Visualization",
        "Machine Learning Basics",
      ],
      price: "$149",
    },
    {
      id: 7,
      title: "Web Development Bootcamp",
      image: "web.jpg",
      description:
        "Become a full-stack web developer. Learn HTML, CSS, JavaScript, and backend development with Node.js.",
      duration: "12 weeks",
      syllabus: ["HTML & CSS", "JavaScript", "Node.js", "Database Management"],
      price: "$199",
    },
    {
      id: 8,
      title: "Digital Marketing Strategies",
      image: "dms.jpeg",
      description:
        "Learn effective digital marketing strategies to grow your business. Covering SEO, social media marketing, and content marketing.",
      duration: "6 weeks",
      syllabus: ["SEO", "Social Media Marketing", "Content Marketing"],
      price: "$129",
    },
  ];

  const course = courses.find((c) => String(c.id) === String(id));
  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div className="course-detail-container">
      <div className="course-content">
        <div className="course-image-container">
          <img
            src={`/images/${course.image}`}
            alt={course.title}
            className="course-image"
            onError={(e) => {
              e.target.src = "/images/default-course.jpg";
              e.target.alt = "Default course image";
            }}
          />
        </div>

        <div className="course-details">
          <h1 className="course-title">{course.title}</h1>

          <div className="course-meta">
            <span className="duration">
              <strong>Duration:</strong> {course.duration}
            </span>
            <span className="price">Price: {course.price}</span>
          </div>

          <div className="description-section">
            <h2>Description</h2>
            <p className="description">{course.description}</p>
          </div>

          <div className="syllabus-section">
            <h2>Syllabus</h2>
            <ul className="syllabus-list">
              {course.syllabus.map((item, index) => (
                <li key={index} className="syllabus-item">
                  <span className="bullet">•</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <button className="enroll-button">Enroll Now</button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
