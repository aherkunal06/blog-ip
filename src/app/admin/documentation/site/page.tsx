"use client";

import { useThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { FaArrowLeft, FaHome, FaBlog, FaTags, FaComments, FaUsers, FaCog } from "react-icons/fa";

export default function SiteDocumentationPage() {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const features = [
    {
      title: "Blog Management",
      icon: <FaBlog className="text-3xl" />,
      description: "Create, edit, and manage blog posts with rich content editor",
      features: [
        "Rich text editor with HTML support",
        "Image upload and management via Cloudinary",
        "SEO optimization (meta tags, descriptions, keywords)",
        "Category assignment (multiple categories per blog)",
        "Slug generation and validation",
        "Draft and publish workflow",
        "Author attribution",
      ],
    },
    {
      title: "Category Management",
      icon: <FaTags className="text-3xl" />,
      description: "Organize blogs into categories for better navigation",
      features: [
        "Create and manage categories",
        "Category images and descriptions",
        "Category-specific blog listings",
        "Category status (active/inactive)",
        "Slug-based URLs for SEO",
      ],
    },
    {
      title: "Comment System",
      icon: <FaComments className="text-3xl" />,
      description: "Full-featured commenting system with moderation",
      features: [
        "User comments on blog posts",
        "Nested replies (comment threads)",
        "Admin/author reply capability",
        "Comment moderation (approve/reject/block)",
        "User blocking from commenting",
        "Pagination for large comment sections",
        "Real-time comment updates",
      ],
    },
    {
      title: "User Management",
      icon: <FaUsers className="text-3xl" />,
      description: "Manage both regular users and admin users",
      features: [
        "User registration and authentication",
        "OAuth integration (Google, Facebook, etc.)",
        "Admin user management",
        "Role-based permissions (admin/super-admin)",
        "Admin groups and permission system",
        "User profile management",
      ],
    },
    {
      title: "Site Settings",
      icon: <FaCog className="text-3xl" />,
      description: "Customize site appearance and behavior",
      features: [
        "Dynamic color management",
        "Theme settings (light/dark mode)",
        "Header and footer customization",
        "Site-wide settings management",
        "Public API for settings",
      ],
    },
  ];

  const siteStructure = [
    {
      section: "Public Site",
      pages: [
        { path: "/", description: "Homepage with featured blogs and categories" },
        { path: "/blogs/categories/[slug]", description: "Category-wise blog listing with pagination" },
        { path: "/[slug]", description: "Individual blog post page with comments" },
        { path: "/about", description: "About page" },
        { path: "/contact", description: "Contact page" },
      ],
    },
    {
      section: "Admin Panel",
      pages: [
        { path: "/admin", description: "Admin dashboard" },
        { path: "/admin/blogs/list", description: "List all blogs" },
        { path: "/admin/blogs/create", description: "Create new blog" },
        { path: "/admin/blogs/edit/[id]", description: "Edit existing blog" },
        { path: "/admin/blogs/categories", description: "Manage categories" },
        { path: "/admin/comments", description: "Comment management" },
        { path: "/admin/site-settings", description: "Site settings" },
        { path: "/admin/admin-users", description: "Admin user management" },
        { path: "/admin/admin-groups", description: "Admin groups and permissions" },
      ],
    },
  ];

  return (
    <div className={`min-h-screen p-6 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/documentation"
            className={`inline-flex items-center gap-2 mb-4 text-sm ${
              isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FaArrowLeft />
            Back to Documentation
          </Link>
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            Site Documentation
          </h1>
          <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Complete guide to the blog site structure and features
          </p>
        </div>

        {/* Overview */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center gap-3 mb-4">
            <FaHome className="text-3xl text-blue-500" />
            <h2 className={`text-2xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Platform Overview
            </h2>
          </div>
          <div className={`space-y-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <p>
              The ipshopy Blog Platform is built with Next.js 15, React, TypeScript, and MySQL.
              It provides a comprehensive content management system for creating and managing blog
              content related to ipshopy products.
            </p>
            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                Key Technologies:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Frontend:</strong> Next.js 15, React, TypeScript, Tailwind CSS</li>
                <li><strong>Backend:</strong> Next.js API Routes, MySQL</li>
                <li><strong>Authentication:</strong> NextAuth.js</li>
                <li><strong>Image Storage:</strong> Cloudinary</li>
                <li><strong>Database:</strong> MySQL 8.0+ with InnoDB engine</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-500">{feature.icon}</div>
                  <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {feature.title}
                  </h3>
                </div>
                <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`flex items-start gap-2 text-sm ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <span className="text-green-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Site Structure */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            Site Structure
          </h2>
          <div className="space-y-6">
            {siteStructure.map((section, secIndex) => (
              <div
                key={secIndex}
                className={`p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
              >
                <h3 className={`text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {section.section}
                </h3>
                <div className="space-y-3">
                  {section.pages.map((page, pageIndex) => (
                    <div
                      key={pageIndex}
                      className={`p-4 rounded-lg border ${
                        isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <code className={`text-sm font-mono ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                        {page.path}
                      </code>
                      <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        {page.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className={`p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Best Practices
          </h2>
          <div className={`space-y-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                Content Creation:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Use descriptive titles and SEO-friendly slugs</li>
                <li>Add relevant meta descriptions and keywords</li>
                <li>Assign appropriate categories for better organization</li>
                <li>Use high-quality images with proper alt text</li>
                <li>Review content before publishing</li>
              </ul>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                Comment Moderation:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Regularly review and moderate comments</li>
                <li>Block spam and inappropriate content</li>
                <li>Engage with users through replies</li>
                <li>Use the blocking feature for repeat offenders</li>
              </ul>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                Performance:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Optimize images before uploading</li>
                <li>Use pagination for large lists</li>
                <li>Monitor site performance regularly</li>
                <li>Keep database queries optimized</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


