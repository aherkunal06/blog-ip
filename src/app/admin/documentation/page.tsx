"use client";

import { useThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { FaBook, FaDatabase, FaCode, FaHome, FaArrowRight } from "react-icons/fa";

export default function DocumentationPage() {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const docSections = [
    {
      title: "Site Documentation",
      description: "Learn about the blog site structure, features, and user guides",
      icon: <FaHome className="text-3xl" />,
      link: "/admin/documentation/site",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "API Documentation",
      description: "Complete API reference with endpoints, methods, and examples",
      icon: <FaCode className="text-3xl" />,
      link: "/admin/documentation/api",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Database Structure",
      description: "Database schema, tables, relationships, and data models",
      icon: <FaDatabase className="text-3xl" />,
      link: "/admin/documentation/database",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className={`min-h-screen p-6 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            Documentation
          </h1>
          <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Comprehensive documentation for the ipshopy Blog Platform
          </p>
        </div>

        {/* Overview */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            About This Platform
          </h2>
          <div className={`space-y-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <p>
              The ipshopy Blog Platform is a comprehensive content management system designed to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Create and manage blog posts for ipshopy products and help/support content</li>
              <li>Drive traffic from blogs to ipshopy.com</li>
              <li>Showcase multiple ipshopy products</li>
              <li>Build backlinks and improve SEO</li>
              <li>Showcase upcoming events and promotions</li>
            </ul>
            <p>
              This documentation provides detailed information about the site structure, API endpoints,
              and database schema to help developers and administrators work with the platform.
            </p>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docSections.map((section, index) => (
            <Link
              key={index}
              href={section.link}
              className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative p-6">
                <div className={`mb-4 text-center ${section.color.replace("from-", "text-").replace(" to-", "-")}`}>
                  {section.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {section.title}
                </h3>
                <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {section.description}
                </p>
                <div className={`flex items-center text-sm font-medium ${
                  section.color.replace("from-", "text-").replace(" to-", "-")
                }`}>
                  <span>View Documentation</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className={`mt-8 p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin"
              className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                isDark
                  ? "border-gray-600 hover:border-blue-500 hover:bg-gray-700"
                  : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaBook className="text-blue-500" />
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>Back to Dashboard</span>
              </div>
            </Link>
            <Link
              href="/admin/blogs/list"
              className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                isDark
                  ? "border-gray-600 hover:border-blue-500 hover:bg-gray-700"
                  : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaCode className="text-purple-500" />
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>Manage Blogs</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


