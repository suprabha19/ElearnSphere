import React from "react";

const Services = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-900">
      {/* Breadcrumb + Title */}
      <div className="text-center py-10">
        <p className="text-sm text-gray-500">Home / Services</p>
        <h1 className="text-4xl font-bold">Services</h1>
        <div className="mt-2">
          <i className="fa-solid fa-chevron-down text-gray-400 text-sm" />
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          <span className="text-red-500 text-5xl align-middle mr-2">*</span>
          Empowering Your Learning
        </h1>
        <h2 className="text-3xl text-red-600">Enhancing Your Education</h2>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-20 px-4 md:px-0">
        {/* Service 1 */}
        <div className="bg-white p-6 rounded shadow transition-all duration-300 ease-in-out border-l-4 border-transparent hover:-translate-y-1 hover:shadow-xl hover:border-red-500">
          <h3 className="font-bold text-red-600 mb-2">Explore Our Services</h3>
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <img
                src="/images/exploreepistrophe.png"
                alt="Explore"
                className="w-6 h-6"
              />
            </div>
            <h4 className="text-lg font-bold">Exploring Epistrophe</h4>
          </div>
          <p className="text-gray-600">
            Iceland resources for personalized learning experiences.
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-white p-6 rounded shadow transition-all duration-300 ease-in-out border-l-4 border-transparent hover:-translate-y-1 hover:shadow-xl hover:border-red-500">
          <h3 className="font-bold text-red-600 mb-2">Explore Our Services</h3>
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <img
                src="/images/progresstrack.png"
                alt="Progress Tracking"
                className="w-6 h-6"
              />
            </div>
            <h4 className="text-lg font-bold">Progress Tracking</h4>
          </div>
          <p className="text-gray-600">
            Iceland resources for personalized learning experiences.
          </p>
        </div>

        {/* Service 3 */}
        <div className="bg-white p-6 rounded shadow transition-all duration-300 ease-in-out border-l-4 border-transparent hover:-translate-y-1 hover:shadow-xl hover:border-red-500">
          <h3 className="font-bold text-red-600 mb-2">Explore Our Services</h3>
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <img
                src="/images/courseaccess.png"
                alt="Course Access"
                className="w-6 h-6"
              />
            </div>
            <h4 className="text-lg font-bold">Course Access</h4>
          </div>
          <p className="text-gray-600">
            Iceland resources for personalized learning experiences.
          </p>
        </div>

        {/* Service 4 */}
        <div className="bg-white p-6 rounded shadow transition-all duration-300 ease-in-out border-l-4 border-transparent hover:-translate-y-1 hover:shadow-xl hover:border-red-500">
          <h3 className="font-bold text-red-600 mb-2">Explore Our Services</h3>
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <img
                src="/images/discussionforums.png"
                alt="Discussion Forums"
                className="w-6 h-6"
              />
            </div>
            <h4 className="text-lg font-bold">Discussion Forums</h4>
          </div>
          <p className="text-gray-600">
            Iceland resources for personalized learning experiences.
          </p>
        </div>
      </div>

      {/* Yellow Banner Section */}
      <section className="w-full py-12 mt-20">
        <div className="mx-auto px-6">
          <div className="h-[360px] bg-[#dba839] rounded-tl-[200px] rounded-br-[200px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between">
            {/* Text */}
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl ml-5 md:text-4xl font-bold text-black leading-tight">
                {"Let's Find The Right"} <br /> Course For You!
              </h1>
              <p className="text-lg ml-5 text-black mt-4 max-w-md">
                Discover the perfect course tailored to your interests and goals
                with our comprehensive guide. Explore a variety of subjects,
                learn about different programs, and find the best fit for your
                educational journey.
              </p>
              <button className="mt-6 ml-5 inline-flex items-center bg-black text-white px-6 py-3 rounded hover:bg-gray-900 transition">
                Start Learning
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Image */}
            <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
              <img
                src="/images/yellowbanner.jpg"
                alt="Learning illustration"
                className="max-w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <div className="mb-12 px-4 md:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">
            Featured Online Courses
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Course 1 */}
          <div className="bg-white p-6 rounded-lg shadow hover:-translate-y-1 hover:border-b-4 hover:border-red-500 transition-all">
            <div className="flex items-center mb-4">
              <img
                src="/images/course1.jpg"
                className="mr-4 w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="text-xl font-bold">$39.99 / 40 hours</div>
            </div>
            <h3 className="text-lg font-bold mb-4">
              Full-Stack Web Development with React and Spring Boot
            </h3>
            <div className="flex space-x-6 text-gray-600">
              <span>
                <i className="fas fa-book-open text-red-600 mr-1"></i>120
                Lessons
              </span>
              <span>
                <i className="fas fa-users text-red-600 mr-1"></i>850 Students
              </span>
            </div>
          </div>

          {/* Course 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:-translate-y-1 hover:border-b-4 hover:border-red-500 transition-all">
            <div className="flex items-center mb-4">
              <img
                src="/images/course2.jpg"
                className="mr-4 w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="text-xl font-bold">$29.99 / 32 hours</div>
            </div>
            <h3 className="text-lg font-bold mb-4">
              Mastering Data Structures and Algorithms in Java
            </h3>
            <div className="flex space-x-6 text-gray-600">
              <span>
                <i className="fas fa-book-open text-red-600 mr-1"></i>90 Lessons
              </span>
              <span>
                <i className="fas fa-users text-red-600 mr-1"></i>950 Students
              </span>
            </div>
          </div>

          {/* Course 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:-translate-y-1 hover:border-b-4 hover:border-red-500 transition-all">
            <div className="flex items-center mb-4">
              <img
                src="/images/course3.jpg"
                className="mr-4 w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="text-xl font-bold">$34.99 / 36 hours</div>
            </div>
            <h3 className="text-lg font-bold mb-4">
              Cybersecurity Essentials:From Zero to Hero
            </h3>
            <div className="flex space-x-6 text-gray-600">
              <span>
                <i className="fas fa-book-open text-red-600 mr-1"></i>110
                Lessons
              </span>
              <span>
                <i className="fas fa-users text-red-600 mr-1"></i>780 Students
              </span>
            </div>
          </div>

          {/* Course 4 */}
          <div className="bg-white p-6 rounded-lg shadow hover:-translate-y-1 hover:border-b-4 hover:border-red-500 transition-all">
            <div className="flex items-center mb-4">
              <img
                src="/images/course4.jpg"
                className="mr-4 w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="text-xl font-bold">$45.00 / 50 hours</div>
            </div>
            <h3 className="text-lg font-bold mb-4">
              Artificial Intelligence and Mchine Learning Bootcamp
            </h3>
            <div className="flex space-x-6 text-gray-600">
              <span>
                <i className="fas fa-book-open text-red-600 mr-1"></i>150
                Lessons
              </span>
              <span>
                <i className="fas fa-users text-red-600 mr-1"></i>1200 Students
              </span>
            </div>
          </div>

          {/* Course 5 */}
          <div className="bg-white p-6 rounded-lg shadow hover:-translate-y-1 hover:border-b-4 hover:border-red-500 transition-all">
            <div className="flex items-center mb-4">
              <img
                src="/images/course5.jpg"
                className="mr-4 w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="text-xl font-bold">$38.50 / 42 hours</div>
            </div>
            <h3 className="text-lg font-bold mb-4">
              Cloud Computing with AWS,Azure and Google Cloud
            </h3>
            <div className="flex space-x-6 text-gray-600">
              <span>
                <i className="fas fa-book-open text-red-600 mr-1"></i>100
                Lessons
              </span>
              <span>
                <i className="fas fa-users text-red-600 mr-1"></i>640 Students
              </span>
            </div>
          </div>

          {/* Course 6 */}
          <div className="bg-white p-6 rounded-lg shadow hover:-translate-y-1 hover:border-b-4 hover:border-red-500 transition-all">
            <div className="flex items-center mb-4">
              <img
                src="/images/course6.jpg"
                className="mr-4 w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="text-xl font-bold">$27.99 / 28 hours</div>
            </div>
            <h3 className="text-lg font-bold mb-4">
              Building Scalable APIs with Node.js and Express
            </h3>
            <div className="flex space-x-6 text-gray-600">
              <span>
                <i className="fas fa-book-open text-red-600 mr-1"></i>85 Lessons
              </span>
              <span>
                <i className="fas fa-users text-red-600 mr-1"></i>710 Students
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block px-8 py-3 rounded-md font-bold text-red-600 border-2 border-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-white"
          >
            View All Courses
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;
