import React, { useState } from "react";

const topics = [
  {
    id: "account-recovery",
    title: "Account Recovery",
    content: (
      <>
        <p className="text-2xl mb-5">ACCOUNT RECOVERY</p>
        <p>
          Lost access? We’ve got your back. Secure and quick recovery options
          ensure you never lose your learning journey.
        </p>
        <blockquote className="border-l-4 border-red-500 pl-4 italic my-4 text-gray-600">
          We help you bounce back — no stress, no sweat.
        </blockquote>
        <p>
          Just verify your identity through your email or linked phone number,
          and get right back in.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Reset forgotten passwords</li>
          <li>Two-step recovery options</li>
          <li>24/7 support if needed</li>
        </ul>
      </>
    ),
  },
  {
    id: "change-email",
    title: "Change Email",
    content: (
      <>
        <p className="text-2xl mb-5">CHANGE EMAIL</p>
        <p>
          Need to switch your email? Whether you're going professional or just
          cleaning up inbox chaos — we make it simple.
        </p>
        <blockquote className="border-l-4 border-purple-500 pl-4 italic my-4 text-gray-600">
          Your learning identity, always up to date.
        </blockquote>
        <p>
          Update your registered email and confirm it through a secure
          verification link sent to your new address.
        </p>
      </>
    ),
  },
  {
    id: "delete-account",
    title: "Delete Account",
    content: (
      <>
        <p className="text-2xl mb-5">DELETE ACCOUNT</p>
        <p>
          We hate goodbyes, but if you must — here’s how to permanently remove
          your ElearnSphere account.
        </p>
        <blockquote className="border-l-4 border-gray-600 pl-4 italic my-4 text-gray-600">
          Your data, your choice.
        </blockquote>
        <p>
          This action is irreversible. All courses, progress, and data will be
          erased. Make sure you’ve backed up anything you need.
        </p>
      </>
    ),
  },
  {
    id: "manage-subscriptions",
    title: "Manage Subscriptions",
    content: (
      <>
        <p className="text-2xl mb-5">MANAGE SUBSCRIPTIONS</p>
        <p>
          From free learning to premium perks — take control of what you pay for
          and when.
        </p>
        <blockquote className="border-l-4 border-green-500 pl-4 italic my-4 text-gray-600">
          Learn on your terms — no hidden fees, no surprises.
        </blockquote>
        <p>
          Upgrade, downgrade, pause, or cancel your plan anytime. Track your
          billing history and next renewal date here.
        </p>
      </>
    ),
  },
  {
    id: "privacy-preferences",
    title: "Privacy Preferences",
    content: (
      <>
        <p className="text-2xl mb-5">PRIVACY PREFERENCES</p>
        <p>
          You deserve control over your data. Fine-tune how your info is used,
          shared, or stored.
        </p>
        <blockquote className="border-l-4 border-yellow-500 pl-4 italic my-4 text-gray-600">
          Because privacy isn't a feature — it's a right.
        </blockquote>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Manage cookies and analytics tracking</li>
          <li>Toggle promotional emails</li>
          <li>Request data export or deletion</li>
        </ul>
      </>
    ),
  },

  // Add more topics as needed
];

export default function AccountSettings() {
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
