import React from "react";

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <span className="hover:text-blue-600 cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="text-blue-600">FAQ</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">FAQ</h1>
        <p className="text-gray-600 italic">
          * Your Guide to Navigating Knowlifi
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="space-y-6">
        {/* FAQ Item 1 */}
        <div>
          <h3 className="text-lg font-medium text-gray-800">
            How do I create an account?
          </h3>
          <p className="text-gray-600 mt-2 ml-4">
            To create an account, click on the "Sign Up" button on the homepage
            and fill in the required information such as your name, email
            address, and password. You can also sign up using your Google or
            Facebook account.
          </p>
        </div>

        {/* FAQ Item 2 */}
        <div>
          <h3 className="text-lg font-medium text-gray-800">
            Is there a mobile app available?
          </h3>
        </div>

        {/* FAQ Item 3 */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <span className="mr-2">+</span> How do I enroll in a course?
          </h3>
        </div>

        {/* FAQ Item 4 */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <span className="mr-2">+</span> Can I preview a course before
            enrolling?
          </h3>
        </div>

        {/* FAQ Item 5 */}
        <div>
          <h3 className="text-lg font-medium text-gray-800">
            How are the courses structured?
          </h3>
          <p className="text-gray-600 mt-2 ml-4">
            Courses typically consist of video lectures, reading materials,
            quizzes, and assignments. Some courses may also include interactive
            elements like forums and live sessions.
          </p>
        </div>

        {/* FAQ Item 6 */}
        <div>
          <h3 className="text-lg font-medium text-gray-800">
            What payment methods are accepted?
          </h3>
        </div>

        {/* FAQ Item 7 */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <span className="mr-2">+</span> Is there a refund policy?
          </h3>
        </div>

        {/* FAQ Item 8 */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 flex items-center">
            <span className="mr-2">+</span> Are there any discounts available?
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
