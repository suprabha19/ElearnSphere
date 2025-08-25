import React, { useState } from "react";
import hero from "../assets/hero.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  FaLaptopCode,
  FaProjectDiagram,
  FaDatabase,
  FaRobot,
  FaShieldAlt,
  FaCloud,
} from "react-icons/fa";

const categories = [
  {
    name: "Web Development",
    icon: <FaLaptopCode />,
    image: "/images/web.jpg",
    description:
      "Build modern websites and apps using HTML, CSS, JavaScript, and frontend/backend frameworks. Build modern websites and applications using HTML, CSS, JavaScript, and popular frontend/backend frameworks. Learn to design responsive interfaces and dynamic user experiences.Master full-stack development concepts and create real-world projects from scratch. Whether you're a beginner or upskilling, this course sets the foundation for a tech career.",
  },
  {
    name: "Data Structures & Algorithms",
    icon: <FaProjectDiagram />,
    image: "/images/DSA.jpg",
    description:
      "Sharpen your problem-solving and coding skills essential for software development and interviews.Master the building blocks of efficient coding by learning how to work with arrays, linked lists, trees, graphs, and more. Understand core algorithms like sorting, searching, and recursion to solve complex problems with confidence. This course sharpens your logical thinking and helps you write optimized, clean code. Whether you're preparing for interviews or leveling up your skills, it’s a must-have.",
  },
  {
    name: "Database Systems",
    icon: <FaDatabase />,
    image: "/images/DBA.jpg",
    description:
      "Understand relational and non-relational databases, including SQL, MySQL, and MongoDB. Gain in-depth knowledge of how data is stored, accessed, and managed in modern software systems. Learn SQL for relational databases, explore NoSQL systems like MongoDB, and understand database design, normalization, and transactions. This course prepares you to build fast, secure, and reliable data-driven applications from the ground up.",
  },
  {
    name: "Artificial Intelligence",
    icon: <FaRobot />,
    image: "/images/AI.jpg",
    description:
      "Dive into AI fundamentals, machine learning, and deep learning using real-world applications.Step into the world of intelligent systems by learning how machines think, learn, and make decisions. Explore machine learning, neural networks, and real-world AI applications using tools like Python and TensorFlow. Through hands-on projects, you’ll build smart systems that analyze, predict, and interact with users. A gateway into one of tech’s most exciting frontiers.",
  },
  {
    name: "Cybersecurity",
    icon: <FaShieldAlt />,
    image: "/images/cyber.jpg",
    description:
      "Learn to protect systems, detect threats, and perform ethical hacking and penetration testing. Understand the principles and practices that keep data, systems, and networks safe in today’s digital age. Learn about ethical hacking, encryption, firewalls, malware, and security protocols to protect against cyber threats. This course equips you with both offensive and defensive skills, making it perfect for aspiring cybersecurity professionals and tech-savvy defenders.",
  },
  {
    name: "Cloud Computing",
    icon: <FaCloud />,
    image: "/images/cloud.jpg",
    description:
      "Get started with cloud platforms like AWS and Azure, virtualization, and deployment. Discover how modern applications run in the cloud and scale globally with ease. Learn the fundamentals of cloud platforms like AWS, Azure, and Google Cloud, including virtualization, storage, compute, and deployment. Master containers, microservices, and serverless architecture to build powerful cloud-native applications ready for real-world challenges.",
  },
];

const Categories = () => {
  const [selected, setSelected] = useState("Web Development");
  const selectedCategory = categories.find((cat) => cat.name === selected);

  return (
    <>
      <section className="bg-[#fcf8f3] w-full px-35 py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 text-center space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why Choose ElearnSphere?
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Your gateway to limitless learning — personalized, accessible, and
              powered by AI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* CARD 1 */}
            <div className="w-[270px] bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-[#e44d30]">
                Expert Instructors
              </h3>
              <p className="text-gray-600 text-sm">
                Learn from industry pros with real-world experience.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="w-[270px] bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-[#e44d30]">
                Flexible Learning
              </h3>
              <p className="text-gray-600 text-sm">
                Anytime, anywhere access with mobile-friendly courses.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="w-[270px] bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-[#e44d30]">
                AI-Powered Assistance
              </h3>
              <p className="text-gray-600 text-sm">
                Smart recommendations, doubt-solving, and guidance.
              </p>
            </div>

            {/* CARD 4 */}
            <div className="w-[270px] bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-[#e44d30]">
                Certificates & Rewards
              </h3>
              <p className="text-gray-600 text-sm">
                Earn certificates and showcase your skills to employers.
              </p>
            </div>

            {/* CARD 5 */}
            <div className="w-[270px] bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-[#e44d30]">
                Community Support
              </h3>
              <p className="text-gray-600 text-sm">
                Engage with peers, join forums, and grow together.
              </p>
            </div>

            {/* CARD 6 */}
            <div className="w-[270px] bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-[#e44d30]">
                Real-World Projects
              </h3>
              <p className="text-gray-600 text-sm">
                Build portfolio-worthy projects as you learn.
              </p>
            </div>

            {/* CARD 7 */}
            <div className="w-[270px] bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-[#e44d30]">
                Progress Tracking
              </h3>
              <p className="text-gray-600 text-sm">
                Track your course journey and set personal goals.
              </p>
            </div>

            {/* CARD 8 */}
            <div className="w-[270px] bg-white p-6 pl-3 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2 text-[#e44d30]">
                Doubt Clearance Sessions
              </h3>
              <p className="text-gray-600 text-sm">
                Live Q&A and 1-on-1 doubt clearing from instructors.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-0">
        <h2 className="text-3xl font-bold text-center py-10 mb-4">
          Explore Categories
        </h2>
        <div className="w-full flex flex-wrap justify-center gap-6 px-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => setSelected(cat.name)}
              className={`w-50 h-45 flex flex-col items-center justify-center shadow-sm cursor-pointer hover:border transition
            ${
              selected === cat.name
                ? "bg-[#e44d30] text-white border-transparent"
                : "bg-white text-[#e44d30] hover:border-[#e44d30]"
            }`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <p className="font-medium text-center px-2">{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Selected Category Content */}
        {selected && (
          <div className="mt-25 ml-30 flex flex-col md:flex-row items-center gap-10 p-0 rounded ">
            <img
              src={categories.find((cat) => cat.name === selected)?.image}
              alt={selected}
              className="md:w-1/3 object-cover rounded-tl-[150px] rounded-tr-[150px] rounded-bl-[150px]"
              style={{ borderBottomRightRadius: "0px" }}
            />
            <div className="w-full mx-10 mr-20 text-center md:text-left md:w-2/3">
              <h3 className="text-4xl font-bold mb-3">{selected}</h3>
              <p className="text-gray-700 mb-4 mt-6 text-xl">
                {categories.find((cat) => cat.name === selected)?.description}
              </p>
              <Link to="/allcourses">
                <button className="bg-[#e74c3c] text-white text-xl px-6 py-2 mt-4 rounded hover:bg-[#c0392b] transition">
                  View Course
                </button>
              </Link>
            </div>
          </div>
        )}
      </section>
      <section className="w-full py-12 mt-20">
        <div className="mx-auto px-6">
          <div className="h-[360px] bg-[#dba839] rounded-tl-[200px] rounded-br-[200px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between">
            {/* Text */}
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl ml-5 md:text-4xl font-bold text-black leading-tight">
                Let's Find The Right <br />
                Course For You!
              </h1>
              <p className="text-lg ml-5 text-black mt-4 max-w-md">
                Discover the perfect course tailored to your interests and goals
                with our comprehensive guide. Explore a variety of subjects,
                learn about different programs, and find the best fit for your
                educational journey.
              </p>
              <Link to="/signup">
                <button className="mt-6 ml-5 inline-flex items-center bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition">
                  Start Learning <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </div>

            {/* Image */}
            <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
              <img
                src={hero}
                alt="Learning illustration"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
