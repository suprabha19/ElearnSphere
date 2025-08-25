import React, { useState } from "react";

const topics = [
  {
    id: "api-documentation",
    title: "API Documentation",
    content: (
      <>
        <p className="text-2xl mb-5">API DOCUMENTATION</p>
        <p>
          For developers ready to build and innovate. Our API docs provide
          complete endpoints, authentication flows, request/response schemas,
          and error handling details.
        </p>
        <blockquote className="border-l-4 border-blue-600 pl-4 italic my-4 text-gray-600">
          Power your apps with ElearnSphere — flexibility at your fingertips.
        </blockquote>
        <p>
          Use our RESTful APIs to integrate courses, fetch user data, manage
          enrollments, and more. Full examples included for easy onboarding.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>OAuth 2.0 authentication</li>
          <li>JSON request and response formats</li>
          <li>Rate limiting and best practices</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
          alt="API coding"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },
  {
    id: "password-reset",
    title: "Password Reset",
    content: (
      <>
        <p className="text-2xl mb-5">PASSWORD RESET</p>
        <p>
          Forgotten your password? No sweat. Follow these simple steps to regain
          access quickly and securely.
        </p>
        <blockquote className="border-l-4 border-red-400 pl-4 italic my-4 text-gray-600">
          Security and ease — that’s our promise.
        </blockquote>
        <p>
          Just enter your registered email, and we’ll send a secure reset link
          to get you back on track in minutes.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Secure token-based reset links</li>
          <li>Expiration and retry policies for safety</li>
          <li>Helpdesk support if needed</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg"
          alt="Password reset concept"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },
  {
    id: "system-requirements",
    title: "System Requirements",
    content: (
      <>
        <p className="text-2xl mb-5">SYSTEM REQUIREMENTS</p>
        <p>
          To get the best ElearnSphere experience, make sure your device meets
          these minimum requirements.
        </p>
        <blockquote className="border-l-4 border-green-600 pl-4 italic my-4 text-gray-600">
          Smooth learning starts with smooth setup.
        </blockquote>
        <p>
          Our platform supports most modern browsers and devices — optimized for
          desktops, tablets, and smartphones.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Latest versions of Chrome, Firefox, Safari, and Edge</li>
          <li>Stable internet connection (recommended 5 Mbps+)</li>
          <li>Screen resolution of 1024x768 or higher</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
          alt="System requirements concept"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },
  {
    id: "product-features",
    title: "Product Features",
    content: (
      <>
        <p className="text-2xl mb-5">PRODUCT FEATURES</p>
        <p>
          Discover what makes ElearnSphere more than just an e-learning platform
          — it’s a full-on knowledge experience.
        </p>
        <blockquote className="border-l-4 border-pink-500 pl-4 italic my-4 text-gray-600">
          We don’t just teach. We empower.
        </blockquote>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>AI-powered course suggestions</li>
          <li>Gamified learning progress</li>
          <li>Live sessions with experts</li>
          <li>Offline downloads and PDF exports</li>
          <li>Interactive quizzes and certifications</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/3825588/pexels-photo-3825588.jpeg"
          alt="Platform features concept"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },

  {
    id: "documentation-use",
    title: "How To Use Documentation",
    content: (
      <>
        <p className="text-2xl mb-5">HOW TO USE THIS DOCUMENTATION?</p>
        <p>
          Navigating documentation can be overwhelming — we keep it simple and
          structured for quick access.
        </p>
        <blockquote className="border-l-4 border-yellow-500 pl-4 italic my-4 text-gray-600">
          Find answers fast, so you can get back to learning and building.
        </blockquote>
        <p>
          Use the sidebar to jump between sections, utilize the search bar to
          locate topics instantly, and check out examples for hands-on guidance.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Start with “Getting Started” if new</li>
          <li>Explore API Docs for integrations</li>
          <li>Refer to FAQs and troubleshooting tips</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg"
          alt="Documentation usage concept"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },

  // Add more topics as needed
];

export default function Documentation() {
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0].id);
  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId);

  return (
    <div className="max-w-7xl mx-auto my-20 p-6 flex flex-col min-h-screen">
      {/* Title on top */}
      {/* <h2 className="text-3xl font-bold text-center uppercase mb-10">
        {selectedTopic.title}
      </h2> */}

      {/* Sidebar + Content */}
      <div className="flex gap-8 flex-1">
        {/* Sidebar */}
        <nav className="min-w-[200px] mr-20">
          <h3 className="text-xl font-semibold mb-4">About Products</h3>
          <ul className="space-y-2">
            {topics.map((topic) => (
              <li
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`cursor-pointer rounded-md px-4 py-2 select-none ${
                  topic.id === selectedTopicId
                    ? "bg-orange-600 text-white"
                    : "text-gray-700 hover:bg-orange-100"
                }`}
              >
                {topic.title}
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <main className="flex-1 prose max-w-none">{selectedTopic.content}</main>
      </div>
    </div>
  );
}
