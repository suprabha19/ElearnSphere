import React, { useState } from "react";

const topics = [
  {
    id: "file-management",
    title: "File Management",
    content: (
      <>
        <p className="text-2xl mb-5">FILE MANAGEMENT</p>
        <p>
          Organizing your project files is the first step to mastering your dev
          workflow. In this guide, we’ll walk you through structured folder
          hierarchies, version control tips, and how to manage assets like a
          boss.
        </p>
        <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4 text-gray-600">
          “A cluttered folder is a cluttered mind. Structure gives speed.”
        </blockquote>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Best practices for folder naming</li>
          <li>Where to store media, components, and configs</li>
          <li>Managing backups and archives</li>
        </ul>
      </>
    ),
  },
  {
    id: "windows-setup",
    title: "Windows Setup",
    content: (
      <>
        <p className="text-2xl mb-5">WINDOWS SETUP</p>
        <p>
          Whether you’re coding, designing, or managing content, your Windows
          machine needs a reliable setup. This walkthrough covers installing
          dependencies, setting up your PATH variables, and optimizing
          performance.
        </p>
        <blockquote className="border-l-4 border-blue-600 pl-4 italic my-4 text-gray-600">
          One does not simply install Node.js without tweaking PowerShell.
        </blockquote>
        <p>
          Bonus: Learn how to avoid permission errors and configure WSL for
          Linux-style development on Windows.
        </p>
      </>
    ),
  },
  {
    id: "linux-deployment",
    title: "Linux Deployment",
    content: (
      <>
        <p className="text-2xl mb-5">LINUX DEPLOYMENT</p>
        <p>
          Deploy your application like a true terminal ninja. We’ll guide you
          through package management, firewall setup, systemd services, and
          deploying to popular distributions like Ubuntu or CentOS.
        </p>
        <blockquote className="border-l-4 border-green-500 pl-4 italic my-4 text-gray-600">
          SSH in. Update. Install. Restart. Ship it.
        </blockquote>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Installing Nginx or Apache</li>
          <li>Setting up SSL with Let's Encrypt</li>
          <li>Configuring auto-restarts on crashes</li>
        </ul>
      </>
    ),
  },
  {
    id: "macos-installation",
    title: "MacOS Installation",
    content: (
      <>
        <p className="text-2xl mb-5">MACOS INSTALLATION</p>
        <p>
          Apple user? Here’s how to set up your development environment using
          Homebrew, Terminal, and native macOS tools. We’ll cover everything
          from installing Node and Java to Docker and Postgres.
        </p>
        <blockquote className="border-l-4 border-pink-400 pl-4 italic my-4 text-gray-600">
          Macs are elegant. Your setup should be too.
        </blockquote>
        <p>
          Plus, tips on optimizing battery life and using Spotlight, Automator,
          and Alfred for dev workflows.
        </p>
      </>
    ),
  },
  {
    id: "environment-coniguration",
    title: "Environment Configuration",
    content: (
      <>
        <p className="text-2xl mb-5">ENVIRONMENT CONFIGURATION</p>
        <p>
          Setting up your `.env` files and config scripts ensures that your app
          behaves correctly across dev, test, and production. Learn how to
          manage secrets, API keys, and environment-specific settings.
        </p>
        <blockquote className="border-l-4 border-yellow-500 pl-4 italic my-4 text-gray-600">
          One wrong `NODE_ENV` and your whole app could break. Don’t let it.
        </blockquote>
        <ul className="list-disc list-inside space-y-1 my-4">
          <li>Creating and using `.env` files securely</li>
          <li>Switching between environments in build tools</li>
          <li>Best practices for cloud deployment config</li>
        </ul>
      </>
    ),
  },

  // Add more topics as needed
];

export default function InstallationGuides() {
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
