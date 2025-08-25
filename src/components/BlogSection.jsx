// src/components/BlogSection.jsx
import React from 'react';
import { FaCalendarAlt, FaComment, FaCheckCircle } from 'react-icons/fa';

const BlogSection = () => {
  return (
    <section className="w-full px-6 md:px-20 py-20 bg-[#fcf8f3] ">
      <h2 className="text-4xl font-bold text-center mb-12">Latest from Our Blog</h2>
    
      <div className="flex flex-col md:flex-row gap-10">
        {/* RIGHT BLOG CARDS SECTION - 2/3 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Blog Card 1 */}
          <div className="bg-white shadow-lg w-full h-[440px] flex flex-col">
            <img
              src="/images/blog1.jpg"
              alt="Blog 1"
              className="w-full h-[300px] object-cover"
            />
            <div className="px-5 py-4 flex flex-col justify-between flex-grow">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt /> <span>July 10, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaComment /> <span>12 Comments</span>
                </div>
              </div>
              <h4 className="text-xl mb-10 font-semibold mt-4">
                Top 10 AI Tools Transforming Software Development
              </h4>
            </div>
          </div>
          {/*Blog Card 2*/}
          <div className="bg-white shadow-lg w-full h-[440px] flex flex-col">
            <img
              src="/images/blog3.jpg"
              alt="Blog 1"
              className="w-full h-[300px] object-cover"
            />
            <div className="px-5 py-4 flex flex-col justify-between flex-grow">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt /> <span>July 8, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaComment /> <span>8 Comments</span>
                </div>
              </div>
              <h4 className="text-xl mb-10 font-semibold mt-4">
                Cybersecurity Threats to Watch Out For in 2025
              </h4>
            </div>
          </div>

          {/* Blog Card 2 */}
          <div className="bg-white shadow-lg w-full h-[440px] flex flex-col">
            <img
              src="/images/blog2.jpg"
              alt="Blog 2"
              className="w-full h-[300px] object-cover"
            />
            <div className="px-5 py-4 flex flex-col justify-between flex-grow">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt /> <span>July 14, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaComment /> <span>8 Comments</span>
                </div>
              </div>
              <h4 className="text-xl mb-10 font-semibold mt-4">
                How Cloud Computing is Revolutionizing IT Infrastructure
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
