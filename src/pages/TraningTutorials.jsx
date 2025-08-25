import React, { useState } from "react";

const topics = [
  {
    id: "service-status",
    title: "Service Status",
    content: (
      <>
        <p className="text-2xl mb-5">SERVICE STATUS</p>
        <p>
          Wondering if ElearnSphere is running smoothly? Our real-time service
          status keeps you informed about platform uptime and any scheduled
          maintenance.
        </p>
        <blockquote className="border-l-4 border-green-500 pl-4 italic my-4 text-gray-600">
          Learning doesn’t stop, and neither should our servers.
        </blockquote>
        <p>
          Downtime alerts, system health reports, and performance logs —
          everything you need to stay in the loop.
        </p>
      </>
    ),
  },
  {
    id: "getting-started",
    title: "Getting Started",
    content: (
      <>
        <p className="text-2xl mb-5">GETTING STARTED VIDEO</p>
        <p>
          New here? No worries — watch our quick-start video to understand how
          ElearnSphere works, from course browsing to quiz submissions.
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600">
          A visual guide to your new learning playground.
        </blockquote>
        <p>
          This beginner-friendly tour gets you up to speed with your dashboard,
          profile, and finding the right content fast.
        </p>
        <video controls className="w-full mt-4 rounded shadow-lg">
          <source src="/videos/getting-started.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </>
    ),
  },
  {
    id: "intermediate-tutorials",
    title: "Intermediate Tutorials",
    content: (
      <>
        <p className="text-2xl mb-5">INTERMEDIATE TUTORIALS</p>
        <p>
          Already got your feet wet? These tutorials dig deeper — optimizing
          your learning pace, setting up custom schedules, and tracking your
          skill growth.
        </p>
        <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4 text-gray-600">
          Level up your learning habits — no fluff, just progress.
        </blockquote>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Time-saving navigation shortcuts</li>
          <li>Using bookmarks, highlights, and notes</li>
          <li>Managing multiple courses</li>
        </ul>
      </>
    ),
  },
  {
    id: "advanced-usecases",
    title: "Advanced Use Cases",
    content: (
      <>
        <p className="text-2xl mb-5">ADVANCED USE CASES</p>
        <p>
          Master the platform like a pro. This section is for educators, team
          managers, and power users looking to scale learning across their
          organizations.
        </p>
        <blockquote className="border-l-4 border-red-500 pl-4 italic my-4 text-gray-600">
          Go beyond watching — design, lead, and create.
        </blockquote>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Create custom learning paths</li>
          <li>Integrate with external tools via API</li>
          <li>Use ElearnSphere as an internal training portal</li>
        </ul>
      </>
    ),
  },
  {
    id: "usecase-walkthroughs",
    title: "Use Case Walkthroughs",
    content: (
      <>
        <p className="text-2xl mb-5">USE CASE WALKTHROUGHS</p>
        <p>
          Learn through real stories. We’ve mapped out step-by-step guides based
          on actual learners and organizations using ElearnSphere to solve big
          problems.
        </p>
        <blockquote className="border-l-4 border-yellow-500 pl-4 italic my-4 text-gray-600">
          Real users. Real strategies. Real wins.
        </blockquote>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>How a school used ElearnSphere for hybrid learning</li>
          <li>Upskilling teams in under 30 days</li>
          <li>Designing engaging quizzes for student retention</li>
        </ul>
      </>
    ),
  },

  // Add more topics as needed
];

export default function TraningTutorials() {
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
