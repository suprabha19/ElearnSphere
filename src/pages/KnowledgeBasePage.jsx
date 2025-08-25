// src/pages/KnowledgeBasePage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";

const knowledgebaseData = {
  "about-products": {
    title: "About Products",
    items: [
      "Mobile App",
      "Advanced Search",
      "Best Practices",
      "Account Management",
      "Basic knowledge requirements",
    ],
  },
  configuration: {
    title: "Configuration",
    items: [
      "Multi-Factor Auth",
      "Notifications",
      "FAQs",
      "Billing & Payments",
      "Getting Started & What is next",
    ],
  },
  documentation: {
    title: "Documentation",
    items: [
      "API Docs",
      "Password Reset",
      "System Requirements",
      "Product Features",
      "How to use this documentation?",
    ],
  },
  "account-settings": {
    title: "Account Settings",
    items: [
      "Account Recovery",
      "Change Email",
      "Delete Account",
      "Manage Subscriptions",
      "Privacy Preferences",
    ],
  },
  "training-tutorials": {
    title: "Training & Tutorials",
    items: [
      "Service Status",
      "Getting Started Video",
      "Intermediate Tutorials",
      "Advanced Use Cases",
      "Use Case Walkthroughs",
    ],
  },
  "installation-guides": {
    title: "Installation Guides",
    items: [
      "File Management",
      "Windows Setup",
      "Linux Deployment",
      "macOS Installation",
      "Environment Configuration",
    ],
  },
};

const KnowledgeBasePage = () => {
  const { slug } = useParams();
  const category = knowledgebaseData[slug];

  if (!category) {
    return (
      <div className="p-8 text-center text-red-600 text-xl">
        <p>🚫 Sorry! This knowledgebase category doesn’t exist.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {category.title}
      </h1>
      <ul className="space-y-4">
        {category.items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center space-x-3 bg-white p-4 rounded shadow"
          >
            <FaFileAlt className="text-blue-500" />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KnowledgeBasePage;
