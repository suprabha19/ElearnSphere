import React, { useState } from "react";

const topics = [
  {
    id: "mobile-app",
    title: "Mobile App",
    content: (
      <>
        <p className="text-2xl mb-5">MOBILE APP</p>
        <p>
          Take your learning journey anywhere with the ElearnSphere mobile app.
          Whether you’re on the bus, at the park, or relaxing at home, you can
          access courses, attend live classes, and track your progress — all
          from your mobile device.
        </p>
        <blockquote className="border-l-4 border-[#e44d30] pl-4 italic my-4 text-gray-600">
          Your education, uninterrupted — because real learning happens beyond
          the classroom.
        </blockquote>
        <p>
          Designed for speed, simplicity, and accessibility, the app supports
          offline viewing, push notifications for course updates, and in-app
          messaging to keep you connected with peers and instructors. It’s more
          than a mobile version — it’s your personal learning companion.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Available on iOS and Android</li>
          <li>Offline learning and real-time sync</li>
          <li>AI assistant for smart content suggestions</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/6078127/pexels-photo-6078127.jpeg"
          alt="Mobile app interface"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },
  {
    id: "advanced-search",
    title: "Advanced Search",
    content: (
      <>
        <p className="text-2xl mb-5">ADVANCED SEARCH</p>
        <p>
          Finding the right course, topic, or document is just a few keystrokes
          away. Our advanced search engine uses intelligent keyword mapping and
          contextual filters to help users zero in on what they need —
          instantly.
        </p>
        <blockquote className="border-l-4 border-[#e44d30] pl-4 italic my-4 text-gray-600">
          Stop scrolling endlessly. Start searching smartly.
        </blockquote>
        <p>
          Filter by course type, level, instructor, topic, or date. With support
          for fuzzy search, synonyms, and AI-powered query suggestions,
          ElearnSphere makes information retrieval smoother than ever.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Instant autocomplete and smart ranking</li>
          <li>Voice search support (beta)</li>
          <li>Category-specific filters and highlights</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/6476251/pexels-photo-6476251.jpeg"
          alt="Search UI preview"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },
  {
    id: "best-practices",
    title: "Best Practices",
    content: (
      <>
        <p className="text-2xl mb-5">BEST PRACTICES</p>
        <p>
          To get the most out of ElearnSphere, we've curated a list of best
          practices that streamline your learning and teaching experience. These
          tips are gathered from top educators and power users.
        </p>
        <blockquote className="border-l-4 border-[#e44d30] pl-4 italic my-4 text-gray-600">
          Efficiency isn't about doing more — it’s about doing it better.
        </blockquote>
        <p>
          From organizing your courses to managing discussions and feedback
          loops, these best practices ensure you spend less time struggling and
          more time thriving.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Plan courses using weekly modules</li>
          <li>Enable reminders and due date notifications</li>
          <li>Use discussion forums for collaborative learning</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
          alt="Best practices concept"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },
  {
    id: "account-management",
    title: "Account Management",
    content: (
      <>
        <p className="text-2xl mb-5">ACCOUNT MANAGEMENT</p>
        <p>
          Your ElearnSphere account is your digital identity — keep it secure,
          updated, and customized. From changing your profile image to managing
          security settings, you’re in total control.
        </p>
        <blockquote className="border-l-4 border-[#e44d30] pl-4 italic my-4 text-gray-600">
          A secure account is a smart account.
        </blockquote>
        <p>
          Update your email, manage notification preferences, and link
          third-party tools like Google or GitHub with ease. Our platform
          ensures your data privacy and compliance with global standards like
          GDPR.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Two-factor authentication support</li>
          <li>Manage subscriptions and billing</li>
          <li>Export activity logs and progress reports</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/4778627/pexels-photo-4778627.jpeg"
          alt="Account settings screen"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },
  {
    id: "basic-knowledge-requirements",
    title: "Basic Knowledge requirements",
    content: (
      <>
        <p className="text-2xl mb-5">BASIC KNOWLEDGE REQUIREMENTS</p>
        <p>
          Before diving into advanced courses, learners should have foundational
          knowledge in subjects like computer basics, internet navigation, and
          basic programming concepts (for tech courses).
        </p>
        <blockquote className="border-l-4 border-[#e44d30] pl-4 italic my-4 text-gray-600">
          Every expert was once a beginner. Let’s start smart.
        </blockquote>
        <p>
          Not sure where you stand? ElearnSphere offers diagnostic quizzes to
          recommend a learning path that suits your current skill level. We
          believe that personalized learning begins with self-awareness.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Computer literacy (file management, email, typing)</li>
          <li>Familiarity with web browsers and online tools</li>
          <li>Optional: prior exposure to course domain basics</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg"
          alt="Beginner learning setup"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },

  // Add more topics as needed
];

export default function AboutProducts() {
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
