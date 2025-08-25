import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const knowledgebaseData = [
  {
    title: "About Products",
    slug: "about-products",
    items: [
      "Mobile App",
      "Advanced Search",
      "Best Practices",
      "Account Management",
      "Basic knowledge requirements",
    ],
  },
  {
    title: "Configuration",
    slug: "configuration",
    items: [
      "Multi-Factor Auth",
      "Notifications",
      "FAQs",
      "Billing & Payments",
      "Getting Started & What is next",
    ],
  },
  {
    title: "Documentation",
    slug: "documentation",
    items: [
      "API Docs",
      "Password Reset",
      "System Requirements",
      "Product Features",
      "How to use this documentation?",
    ],
  },
  {
    title: "Account Settings",
    slug: "account-settings",
    items: [
      "Account Recovery",
      "Change Email",
      "Delete Account",
      "Manage Subscriptions",
      "Privacy Preferences",
    ],
  },
  {
    title: "Training & Tutorials",
    slug: "training-tutorials",
    items: [
      "Service Status",
      "Getting Started Video",
      "Intermediate Tutorials",
      "Advanced Use Cases",
      "Use Case Walkthroughs",
    ],
  },
  {
    title: "Installation Guides",
    slug: "installation-guides",
    items: [
      "File Management",
      "Windows Setup",
      "Linux Deployment",
      "macOS Installation",
      "Environment Configuration",
    ],
  },
];

const Grid = () => {
  return (
    <section className="bg-[#14094a] py-12 px-4 mt-20 md:px-16 lg:px-24 text-white">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-3">Explore Our Topics</h2>
        <p className="text-lg text-gray-300">
          Explore our comprehensive knowledgebase to find detailed articles,
          guides, and answers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {knowledgebaseData.map((category, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-2xl shadow-md p-6 space-y-3"
          >
            <h3 className="text-xl font-bold">{category.title}</h3>
            <ul className="space-y-2">
              {category.items.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <FaFileAlt className="text-green-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to={`/knowledgebase/${category.slug}`}
              className="inline-block mt-4 px-4 py-2 border border-green-400 text-green-600 rounded-md hover:bg-green-50 transition"
            >
              View all
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Grid;
