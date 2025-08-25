import React, { useState } from "react";

const topics = [
  {
    id: "multi-factor-authentication",
    title: "Multi-Factor Authentication",
    content: (
      <>
        <p className="text-2xl mb-5">MULTI-FACTOR AUTHENTICATION</p>
        <p>
          Your account, your fortress. ElearnSphere offers multi-factor
          authentication (MFA) to add an extra layer of security beyond your
          password.
        </p>
        <blockquote className="border-l-4 border-red-500 pl-4 italic my-4 text-gray-600">
          Your knowledge is valuable — so is your data. Lock it down.
        </blockquote>
        <p>
          Use SMS codes, authenticator apps, or biometric devices to verify your
          identity. MFA can be enabled from your account settings in under a
          minute.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Time-based one-time password (TOTP) support</li>
          <li>Email & SMS-based authentication options</li>
          <li>Session timeout settings for extra safety</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/5380660/pexels-photo-5380660.jpeg"
          alt="Secure login concept"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },
  {
    id: "notifications",
    title: "Notifications",
    content: (
      <>
        <p className="text-2xl mb-5">NOTIFICATIONS</p>
        <p>
          Stay in the loop with ElearnSphere’s customizable notification system.
          Choose what you want to hear about and how you want to hear it.
        </p>
        <blockquote className="border-l-4 border-orange-500 pl-4 italic my-4 text-gray-600">
          Learning is a journey — we’ll guide you every step of the way.
        </blockquote>
        <p>
          Receive email alerts for assignment deadlines, course updates, peer
          messages, and announcements. Prefer quiet mode? Mute them anytime.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Real-time push notifications</li>
          <li>Email digest summaries</li>
          <li>In-app alerts for new content or comments</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/4042806/pexels-photo-4042806.jpeg"
          alt="Notifications UI"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },
  {
    id: "frequently-asked-questions",
    title: "Frequently Asked Questions",
    content: (
      <>
        <p className="text-2xl mb-5">FREQUENTLY ASKED QUESTIONS</p>
        <p>
          Got questions? You're not alone. Our FAQ section covers everything
          from login issues to course certifications and refund policies.
        </p>
        <blockquote className="border-l-4 border-teal-500 pl-4 italic my-4 text-gray-600">
          Before you ask — we’ve probably answered it.
        </blockquote>
        <p>
          Still stuck? You can always reach out to our support team directly.
          But chances are, someone’s asked it before and it’s right here.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>“How do I reset my password?”</li>
          <li>“Where can I download my certificate?”</li>
          <li>“Can I get a refund for a course?”</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"
          alt="FAQ document concept"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },
  {
    id: "billing-and-payments",
    title: "Billing & Payements",
    content: (
      <>
        <p className="text-2xl mb-5">BILLING & PAYMENTS</p>
        <p>
          Manage your subscriptions, invoices, and payment methods directly from
          your account. ElearnSphere supports multiple currencies and global
          payment providers.
        </p>
        <blockquote className="border-l-4 border-green-500 pl-4 italic my-4 text-gray-600">
          Transparent pricing. No hidden fees. Total control.
        </blockquote>
        <p>
          Track payment history, download receipts, and switch plans with ease.
          Whether you're on monthly billing or yearly — it's all just a click
          away.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Credit/debit card, UPI & wallet support</li>
          <li>Auto-renewal settings and reminders</li>
          <li>One-click invoice downloads</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg"
          alt="Online payment concept"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },
  {
    id: "getting-started",
    title: "Getting Started & What Is Next",
    content: (
      <>
        <p className="text-2xl mb-5">GETTING STARTED & WHAT IS NEXT</p>
        <p>
          Collaboratively administrate turnkey channels whereas virtual
          e-tailers. Objectively seize scalable metrics whereas proactive
          e-services.
        </p>
        <blockquote className="border-l-4 border-orange-500 pl-4 italic my-4 text-gray-600">
          Leverage agile frameworks to provide a robust synopsis of high-level
          overviews.
        </blockquote>
        <p>
          Podcasting operational change management inside workflows enables
          real-time, data-driven decisions that move your learning forward.
        </p>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Capitalize on low hanging fruit</li>
          <li>Efficiently unleash cross-media information</li>
          <li>Completely synergize resource taxing relationships</li>
        </ul>
        <img
          src="https://images.pexels.com/photos/1181356/pexels-photo-1181356.jpeg"
          alt="Getting started"
          className="w-full max-w-screen h-[600px] mt-4"
        />
      </>
    ),
  },

  // Add more topics as needed
];

export default function Configuration() {
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
