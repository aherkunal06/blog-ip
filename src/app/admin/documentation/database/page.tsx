"use client";

import { useThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { FaArrowLeft, FaDatabase, FaTable, FaKey, FaLink } from "react-icons/fa";

export default function DatabaseDocumentationPage() {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const tables = [
    {
      name: "User",
      description: "Regular users who can comment and interact with blogs",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "email", type: "VARCHAR(255)", key: "UNIQUE", description: "User email address" },
        { name: "name", type: "VARCHAR(255)", key: "", description: "User full name" },
        { name: "image", type: "VARCHAR(500)", key: "", description: "Profile image URL" },
        { name: "password", type: "VARCHAR(255)", key: "", description: "Hashed password" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Account creation date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: ["Comment", "Likes", "Favorite", "Account"],
    },
    {
      name: "AdminUser",
      description: "Administrative users who can manage blogs, categories, and content",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "name", type: "VARCHAR(255)", key: "", description: "Admin full name" },
        { name: "email", type: "VARCHAR(255)", key: "UNIQUE", description: "Admin email" },
        { name: "username", type: "VARCHAR(255)", key: "UNIQUE", description: "Admin username" },
        { name: "mobile", type: "VARCHAR(20)", key: "", description: "Mobile number" },
        { name: "image", type: "VARCHAR(500)", key: "", description: "Profile image URL" },
        { name: "password", type: "VARCHAR(255)", key: "", description: "Hashed password" },
        { name: "isSuper", type: "BOOLEAN", key: "", description: "Super admin flag" },
        { name: "role", type: "VARCHAR(50)", key: "", description: "Admin role (admin/super-admin)" },
        { name: "status", type: "VARCHAR(50)", key: "", description: "Account status (pending/approved)" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Account creation date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: ["Blog", "AdminUserGroup", "UserBlockedComment"],
    },
    {
      name: "Blog",
      description: "Blog posts/articles published on the site",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "title", type: "VARCHAR(500)", key: "", description: "Blog title" },
        { name: "slug", type: "VARCHAR(500)", key: "UNIQUE", description: "URL-friendly slug" },
        { name: "content", type: "LONGTEXT", key: "", description: "Blog content (HTML)" },
        { name: "image", type: "VARCHAR(500)", key: "", description: "Featured image URL" },
        { name: "imageAlt", type: "VARCHAR(500)", key: "", description: "Image alt text" },
        { name: "metaTitle", type: "VARCHAR(500)", key: "", description: "SEO meta title" },
        { name: "metaDescription", type: "TEXT", key: "", description: "SEO meta description" },
        { name: "metaKeywords", type: "VARCHAR(500)", key: "", description: "SEO keywords" },
        { name: "status", type: "BOOLEAN", key: "", description: "Published status (true/false)" },
        { name: "authorId", type: "INT", key: "FOREIGN", description: "Author (AdminUser.id)" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Creation date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: ["BlogCategory", "Comment", "FAQ", "BlogRelation", "Likes", "Favorite"],
    },
    {
      name: "Category",
      description: "Blog categories for organizing content",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "name", type: "VARCHAR(255)", key: "UNIQUE", description: "Category name" },
        { name: "slug", type: "VARCHAR(255)", key: "UNIQUE", description: "URL-friendly slug" },
        { name: "description", type: "TEXT", key: "", description: "Category description" },
        { name: "image", type: "VARCHAR(500)", key: "", description: "Category image URL" },
        { name: "status", type: "BOOLEAN", key: "", description: "Active status" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Creation date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: ["BlogCategory"],
    },
    {
      name: "BlogCategory",
      description: "Junction table linking blogs to categories (many-to-many)",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "blogId", type: "INT", key: "FOREIGN", description: "Blog ID" },
        { name: "categoryId", type: "INT", key: "FOREIGN", description: "Category ID" },
      ],
      relationships: ["Blog", "Category"],
    },
    {
      name: "Comment",
      description: "User comments on blog posts with reply support",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "content", type: "TEXT", key: "", description: "Comment content" },
        { name: "blogId", type: "INT", key: "FOREIGN", description: "Blog ID" },
        { name: "userId", type: "INT", key: "FOREIGN", description: "User ID" },
        { name: "parentId", type: "INT", key: "FOREIGN", description: "Parent comment ID (for replies)" },
        { name: "status", type: "VARCHAR(50)", key: "", description: "Comment status (approved/pending/rejected)" },
        { name: "isBlocked", type: "BOOLEAN", key: "", description: "Blocked flag" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Creation date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: ["Blog", "User"],
    },
    {
      name: "UserBlockedComment",
      description: "Users blocked from commenting",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "userId", type: "INT", key: "FOREIGN", description: "Blocked user ID" },
        { name: "blockedBy", type: "INT", key: "FOREIGN", description: "Admin who blocked (AdminUser.id)" },
        { name: "reason", type: "TEXT", key: "", description: "Block reason" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Block date" },
      ],
      relationships: ["User", "AdminUser"],
    },
    {
      name: "FAQ",
      description: "Frequently asked questions for blog posts",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "blogId", type: "INT", key: "FOREIGN", description: "Blog ID" },
        { name: "question", type: "VARCHAR(500)", key: "", description: "FAQ question" },
        { name: "answer", type: "TEXT", key: "", description: "FAQ answer" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Creation date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: ["Blog"],
    },
    {
      name: "Likes",
      description: "User likes on blog posts",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "userId", type: "INT", key: "FOREIGN", description: "User ID" },
        { name: "blogId", type: "INT", key: "FOREIGN", description: "Blog ID" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Like date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: ["User", "Blog"],
    },
    {
      name: "Favorite",
      description: "User favorites/bookmarks for blog posts",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "userId", type: "INT", key: "FOREIGN", description: "User ID" },
        { name: "blogId", type: "INT", key: "FOREIGN", description: "Blog ID" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Favorite date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: ["User", "Blog"],
    },
    {
      name: "BlogRelation",
      description: "Related articles linking (many-to-many)",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "blogId", type: "INT", key: "FOREIGN", description: "Blog ID" },
        { name: "relatedBlogId", type: "INT", key: "FOREIGN", description: "Related blog ID" },
      ],
      relationships: ["Blog"],
    },
    {
      name: "AdminGroup",
      description: "Admin user groups for permission management",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "name", type: "VARCHAR(255)", key: "UNIQUE", description: "Group name" },
        { name: "description", type: "TEXT", key: "", description: "Group description" },
        { name: "isSystem", type: "BOOLEAN", key: "", description: "System group flag" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Creation date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: ["AdminUserGroup", "AdminGroupPermission"],
    },
    {
      name: "AdminUserGroup",
      description: "Junction table for admin users and groups",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "userId", type: "INT", key: "FOREIGN", description: "AdminUser ID" },
        { name: "groupId", type: "INT", key: "FOREIGN", description: "AdminGroup ID" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Assignment date" },
      ],
      relationships: ["AdminUser", "AdminGroup"],
    },
    {
      name: "AdminGroupPermission",
      description: "Route permissions for admin groups",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "groupId", type: "INT", key: "FOREIGN", description: "AdminGroup ID" },
        { name: "route", type: "VARCHAR(500)", key: "", description: "Route path" },
        { name: "method", type: "VARCHAR(10)", key: "", description: "HTTP method" },
        { name: "allowed", type: "BOOLEAN", key: "", description: "Permission allowed" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Creation date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: ["AdminGroup"],
    },
    {
      name: "SiteSettings",
      description: "Site-wide settings (colors, theme, etc.)",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "key_name", type: "VARCHAR(255)", key: "UNIQUE", description: "Setting key" },
        { name: "value", type: "TEXT", key: "", description: "Setting value" },
        { name: "type", type: "VARCHAR(50)", key: "", description: "Setting type (color/string/etc.)" },
        { name: "description", type: "TEXT", key: "", description: "Setting description" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Creation date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: [],
    },
    {
      name: "Account",
      description: "OAuth account connections for users",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "userId", type: "INT", key: "FOREIGN", description: "User ID" },
        { name: "type", type: "VARCHAR(50)", key: "", description: "OAuth provider type" },
        { name: "provider", type: "VARCHAR(50)", key: "", description: "Provider name" },
        { name: "providerAccountId", type: "VARCHAR(255)", key: "", description: "Provider account ID" },
        { name: "refresh_token", type: "TEXT", key: "", description: "Refresh token" },
        { name: "access_token", type: "TEXT", key: "", description: "Access token" },
        { name: "expires_at", type: "INT", key: "", description: "Token expiration" },
        { name: "token_type", type: "VARCHAR(50)", key: "", description: "Token type" },
        { name: "scope", type: "VARCHAR(255)", key: "", description: "OAuth scope" },
        { name: "id_token", type: "TEXT", key: "", description: "ID token" },
        { name: "session_state", type: "VARCHAR(255)", key: "", description: "Session state" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Creation date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: ["User"],
    },
    {
      name: "information",
      description: "Information pages (About, Privacy, Terms)",
      columns: [
        { name: "id", type: "INT", key: "PRIMARY", description: "Primary key" },
        { name: "type", type: "VARCHAR(100)", key: "", description: "Information type" },
        { name: "content", type: "TEXT", key: "", description: "Page content" },
        { name: "status", type: "VARCHAR(50)", key: "", description: "Status (PENDING/APPROVED)" },
        { name: "createdAt", type: "DATETIME", key: "", description: "Creation date" },
        { name: "updatedAt", type: "DATETIME", key: "", description: "Last update date" },
      ],
      relationships: [],
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
            Database Structure
          </h1>
          <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Complete database schema and table relationships
          </p>
        </div>

        {/* Database Info */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center gap-3 mb-4">
            <FaDatabase className="text-3xl text-blue-500" />
            <div>
              <h2 className={`text-2xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                Database: blog_db
              </h2>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                MySQL 8.0+ | UTF8MB4 Unicode
              </p>
            </div>
          </div>
          <div className={`space-y-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <p>Total Tables: <strong>{tables.length}</strong></p>
            <p>
              The database uses InnoDB engine with proper indexing, foreign keys, and relationships
              to ensure data integrity and performance.
            </p>
          </div>
        </div>

        {/* Tables */}
        <div className="space-y-6">
          {tables.map((table, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="flex items-start gap-3 mb-4">
                <FaTable className="text-2xl text-green-500 mt-1" />
                <div className="flex-1">
                  <h2 className={`text-2xl font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {table.name}
                  </h2>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {table.description}
                  </p>
                </div>
              </div>

              {/* Columns */}
              <div className="mb-4">
                <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Columns
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                        <th className={`text-left p-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Column
                        </th>
                        <th className={`text-left p-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Type
                        </th>
                        <th className={`text-left p-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Key
                        </th>
                        <th className={`text-left p-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.columns.map((column, colIndex) => (
                        <tr
                          key={colIndex}
                          className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}
                        >
                          <td className={`p-2 font-mono text-sm ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                            {column.name}
                          </td>
                          <td className={`p-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            {column.type}
                          </td>
                          <td className="p-2">
                            {column.key && (
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  column.key === "PRIMARY"
                                    ? "bg-red-500 text-white"
                                    : column.key === "FOREIGN"
                                    ? "bg-orange-500 text-white"
                                    : "bg-blue-500 text-white"
                                }`}
                              >
                                {column.key}
                              </span>
                            )}
                          </td>
                          <td className={`p-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            {column.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Relationships */}
              {table.relationships.length > 0 && (
                <div>
                  <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}>
                    <FaLink className="text-blue-500" />
                    Relationships
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {table.relationships.map((rel, relIndex) => (
                      <span
                        key={relIndex}
                        className={`px-3 py-1 rounded-full text-sm ${
                          isDark
                            ? "bg-blue-900 text-blue-300 border border-blue-700"
                            : "bg-blue-100 text-blue-700 border border-blue-300"
                        }`}
                      >
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


