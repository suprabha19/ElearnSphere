import React from "react";

const Pricing = () => {
  return (
    <div className="bg-[#fefaf6] text-gray-800">
      {/* Breadcrumb + Title */}
      <div className="text-center py-10">
        <p className="text-sm text-gray-500">Home / Pricing</p>
        <h1 className="text-4xl font-bold">Pricing</h1>
        <div className="mt-2">
          <i className="fa fa-chevron-down text-gray-400 text-sm"></i>
        </div>
      </div>

      {/* Pricing Header */}
      <div className="text-center mb-6">
        <p className="text-sm text-red-500 font-semibold">
          ★ Flexible Pricing Plans for Every Learner
        </p>
        <h2 className="text-2xl font-bold my-2">Choose the Perfect Plan</h2>
        <p className="max-w-xl mx-auto text-sm text-gray-600">
          Start with the basics, advance your skills, or dive into an
          all-inclusive experience with our comprehensive and flexible pricing
          options.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-6 py-8">
        {/* Starter */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-80 text-center">
          <h3 className="text-lg font-semibold mb-2">Starter</h3>
          <p className="text-red-600 text-2xl font-bold">
            $15 <span className="text-sm text-gray-500 font-normal">/mo</span>
          </p>
          <ul className="mt-4 text-sm text-left space-y-2">
            <li>✔️ Unlimited Course Access</li>
            <li>✔️ Personalized Learning Pathways</li>
            <li>✔️ 24/7 Support</li>
            <li>✔️ Certification upon Completion</li>
            <li>✔️ Offline Access</li>
            <li>✔️ Community Access</li>
          </ul>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md text-sm">
            Get Started
          </button>
        </div>

        {/* Premium */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-80 text-center border-2 border-red-500">
          <h3 className="text-lg font-semibold mb-2">Premium</h3>
          <p className="text-red-600 text-2xl font-bold">
            $25 <span className="text-sm text-gray-500 font-normal">/mo</span>
          </p>
          <ul className="mt-4 text-sm text-left space-y-2">
            <li>✔️ Mentorship Program</li>
            <li>✔️ Course Completion Badges</li>
            <li>✔️ Ad-Free Learning Experience</li>
            <li>✔️ Multiple Device Support</li>
            <li>✔️ Multi-Language Support</li>
            <li>✔️ Hands-on Projects</li>
          </ul>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md text-sm">
            Get Started
          </button>
        </div>

        {/* Advanced */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-80 text-center">
          <h3 className="text-lg font-semibold mb-2">Advanced</h3>
          <p className="text-red-600 text-2xl font-bold">
            $20 <span className="text-sm text-gray-500 font-normal">/mo</span>
          </p>
          <ul className="mt-4 text-sm text-left space-y-2">
            <li>✔️ Group Discounts</li>
            <li>✔️ Job Placement Assistance</li>
            <li>✔️ Advanced Learning Tools</li>
            <li>✔️ Content Library Access</li>
            <li>✔️ Exam Preparation Guides</li>
            <li>✔️ Flexible Payment Options</li>
          </ul>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md text-sm">
            Get Started
          </button>
        </div>
      </div>

      {/* Yellow Banner Section - Adjusted Layout */}
      <section className="w-full bg-[#e7bb31] py-12 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4 px-6 md:px-10">
          {/* Text */}
          <div className="md:w-1/2 text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-black leading-tight">
              Let's Find The Right <br />
              Course For You!
            </h1>
            <p className="text-sm text-black mt-4 max-w-md">
              Discover the perfect course tailored to your interests and goals
              with our comprehensive guide. Explore a variety of subjects, learn
              about different programs, and find the best fit for your
              educational journey.
            </p>
            <button className="mt-6 inline-flex items-center bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-900 transition">
              Start Learning
              <svg
                className="ml-2 w-3 h-3"
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
          <div className="md:w-1/2 flex justify-end">
            <img
              src="/images/yellowbanner.jpg"
              alt="Learning illustration"
              className="w-[380px] h-auto object-contain -ml-10"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="text-center py-12 px-4">
        <p className="text-sm text-red-500 font-semibold">
          ★ Extensive Array of Features
        </p>
        <h2 className="text-2xl font-bold my-2">Our Unique Features</h2>
        <p className="max-w-2xl mx-auto text-sm text-gray-600">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>

        <div className="flex flex-wrap justify-center mt-8 gap-8">
          <div className="text-center w-40">
            <img
              src="/images/intutive.png"
              alt="Intuitive icon"
              className="mx-auto h-8 mb-2"
            />
            <h4 className="font-bold">Intuitive</h4>
            <p className="text-sm text-gray-500">User-Friendly Interface</p>
          </div>
          <div className="text-center w-40">
            <img
              src="/images/customizable.png"
              alt="Customizable icon"
              className="mx-auto h-8 mb-2"
            />
            <h4 className="font-bold">Customizable</h4>
            <p className="text-sm text-gray-500">Customizable Dashboard</p>
          </div>
          <div className="text-center w-40">
            <img
              src="/images/secure.png"
              alt="Secure icon"
              className="mx-auto h-8 mb-2"
            />
            <h4 className="font-bold">Secure</h4>
            <p className="text-sm text-gray-500">Secure Authentication</p>
          </div>
          <div className="text-center w-40">
            <img
              src="/images/analytical.png"
              alt="Analytical icon"
              className="mx-auto h-8 mb-2"
            />
            <h4 className="font-bold">Analytical</h4>
            <p className="text-sm text-gray-500">Advanced Analytics</p>
          </div>
        </div>
      </div>

      {/* Blue Testimonial Section */}
      <section className="py-0">
        <div className="w-full bg-[#2C3E94] flex flex-col md:flex-row items-center gap-10 p-8 md:p-12">
          {/* Left Image */}
          <div className="md:w-1/2 w-full overflow-hidden rounded-l-[6rem] rounded-r-none">
            <img
              src="/images/bluetestimonial.jpg"
              alt="Boy at desk"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="md:w-1/2 w-full text-white">
            <p className="italic text-lg leading-relaxed">
              “Since discovering this knowledge base website, my productivity
              has skyrocketed. The comprehensive and well-organized resources
              have been invaluable for both my professional and personal
              projects.”
            </p>

            <div className="mt-6 flex items-center space-x-3">
              <img
                src="/images/elena.jpeg"
                alt="Elena Jackson"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <div>
                <p className="font-bold text-xl">Elena Jackson</p>
                <p className="text-sm">Tech Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
