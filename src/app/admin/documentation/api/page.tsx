"use client";

import { useThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { FaArrowLeft, FaCode, FaLock, FaGlobe } from "react-icons/fa";

export default function APIDocumentationPage() {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const apiEndpoints = [
    {
      category: "Blogs",
      endpoints: [
        {
          method: "GET",
          path: "/api/blogs",
          description: "Get all blogs with pagination and search",
          auth: "Optional (Admin only for full access)",
          params: ["page", "limit", "search", "suggest"],
          example: "/api/blogs?page=1&limit=10&search=keyword",
        },
        {
          method: "POST",
          path: "/api/blogs",
          description: "Create a new blog post",
          auth: "Required (Admin)",
          body: "FormData (title, content, slug, image, categoryIds, etc.)",
        },
        {
          method: "GET",
          path: "/api/blogs/[slug]",
          description: "Get a single blog by slug",
          auth: "Public",
          example: "/api/blogs/my-blog-post",
        },
        {
          method: "PUT",
          path: "/api/blogs/edit/[id]",
          description: "Update an existing blog",
          auth: "Required (Admin)",
          params: ["id"],
        },
        {
          method: "DELETE",
          path: "/api/blogs/delete/[id]",
          description: "Delete a blog",
          auth: "Required (Admin)",
          params: ["id"],
        },
        {
          method: "GET",
          path: "/api/blogs/check-slug",
          description: "Check if a slug is available",
          auth: "Public",
          params: ["slug", "excludeId"],
        },
        {
          method: "GET",
          path: "/api/blogs/categories/[slug]/blogs",
          description: "Get blogs by category with pagination",
          auth: "Public",
          params: ["slug", "page", "limit"],
        },
      ],
    },
    {
      category: "Categories",
      endpoints: [
        {
          method: "GET",
          path: "/api/blogs/categories",
          description: "Get all categories",
          auth: "Public",
          params: ["limit", "status", "slug"],
        },
        {
          method: "POST",
          path: "/api/blogs/categories",
          description: "Create a new category",
          auth: "Required (Admin)",
          body: "FormData (name, slug, description, image, status)",
        },
        {
          method: "PUT",
          path: "/api/blogs/categories/updatecategories",
          description: "Update a category",
          auth: "Required (Admin)",
        },
        {
          method: "DELETE",
          path: "/api/blogs/categories/delete/[id]",
          description: "Delete a category",
          auth: "Required (Admin)",
        },
        {
          method: "GET",
          path: "/api/blogs/categories/[slug]",
          description: "Get a single category by slug",
          auth: "Public",
        },
      ],
    },
    {
      category: "Comments",
      endpoints: [
        {
          method: "GET",
          path: "/api/comments",
          description: "Get comments for a blog with pagination",
          auth: "Public",
          params: ["blogId", "page", "limit"],
        },
        {
          method: "POST",
          path: "/api/comments",
          description: "Create a new comment or reply",
          auth: "Required (User)",
          body: "JSON (blogId, content, parentId?)",
        },
      ],
    },
    {
      category: "Admin Comments",
      endpoints: [
        {
          method: "GET",
          path: "/api/admin/comments",
          description: "Get all comments for admin management",
          auth: "Required (Admin)",
          params: ["page", "limit", "status", "search"],
        },
        {
          method: "DELETE",
          path: "/api/admin/comments/[id]",
          description: "Delete a comment",
          auth: "Required (Admin)",
        },
        {
          method: "PATCH",
          path: "/api/admin/comments/[id]",
          description: "Update comment status (approve/block)",
          auth: "Required (Admin)",
        },
        {
          method: "POST",
          path: "/api/admin/comments/block-user",
          description: "Block a user from commenting",
          auth: "Required (Admin)",
        },
        {
          method: "DELETE",
          path: "/api/admin/comments/block-user",
          description: "Unblock a user from commenting",
          auth: "Required (Admin)",
        },
      ],
    },
    {
      category: "Products",
      endpoints: [
        {
          method: "GET",
          path: "/api/products",
          description: "Get all products with filters",
          auth: "Public",
          params: ["status", "category", "featured", "limit", "page"],
        },
        {
          method: "POST",
          path: "/api/products",
          description: "Create a new product",
          auth: "Required (Admin)",
        },
        {
          method: "GET",
          path: "/api/products/[id]",
          description: "Get a single product",
          auth: "Public",
        },
        {
          method: "GET",
          path: "/api/products/sync",
          description: "Sync products from ipshopy.com",
          auth: "Required (Admin)",
        },
        {
          method: "GET",
          path: "/api/products/sync/status",
          description: "Get product sync status",
          auth: "Required (Admin)",
        },
      ],
    },
    {
      category: "Events",
      endpoints: [
        {
          method: "GET",
          path: "/api/events",
          description: "Get all events",
          auth: "Public",
          params: ["status", "limit"],
        },
        {
          method: "POST",
          path: "/api/events",
          description: "Create a new event",
          auth: "Required (Admin)",
        },
        {
          method: "GET",
          path: "/api/events/[id]",
          description: "Get a single event",
          auth: "Public",
        },
        {
          method: "GET",
          path: "/api/events/upcoming",
          description: "Get upcoming events",
          auth: "Public",
        },
      ],
    },
    {
      category: "Site Settings",
      endpoints: [
        {
          method: "GET",
          path: "/api/site-settings/public",
          description: "Get public site settings (colors, theme)",
          auth: "Public",
        },
        {
          method: "GET",
          path: "/api/admin/site-settings",
          description: "Get all site settings (admin)",
          auth: "Required (Admin)",
        },
        {
          method: "PUT",
          path: "/api/admin/site-settings",
          description: "Update site settings",
          auth: "Required (Admin)",
        },
      ],
    },
    {
      category: "Admin Management",
      endpoints: [
        {
          method: "GET",
          path: "/api/admin/blogs",
          description: "Get blogs for admin panel",
          auth: "Required (Admin)",
        },
        {
          method: "GET",
          path: "/api/admin/categories",
          description: "Get categories for admin panel",
          auth: "Required (Admin)",
        },
        {
          method: "GET",
          path: "/api/admin/comments",
          description: "Get comments for admin panel",
          auth: "Required (Admin)",
        },
        {
          method: "GET",
          path: "/api/admin/dashboard",
          description: "Get dashboard statistics",
          auth: "Required (Admin)",
        },
        {
          method: "GET",
          path: "/api/admin/user-info",
          description: "Get current admin user info",
          auth: "Required (Admin)",
        },
      ],
    },
    {
      category: "Authentication",
      endpoints: [
        {
          method: "POST",
          path: "/api/auth/admin/login",
          description: "Admin login",
          auth: "Public",
        },
        {
          method: "POST",
          path: "/api/auth/user/login",
          description: "User login",
          auth: "Public",
        },
        {
          method: "POST",
          path: "/api/auth/admin/forgot-password",
          description: "Request password reset (admin)",
          auth: "Public",
        },
        {
          method: "POST",
          path: "/api/auth/admin/reset-password",
          description: "Reset password (admin)",
          auth: "Public",
        },
      ],
    },
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-500";
      case "POST":
        return "bg-green-500";
      case "PUT":
        return "bg-yellow-500";
      case "PATCH":
        return "bg-orange-500";
      case "DELETE":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

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
            API Documentation
          </h1>
          <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Complete API reference for all endpoints
          </p>
        </div>

        {/* API Endpoints */}
        <div className="space-y-8">
          {apiEndpoints.map((category, catIndex) => (
            <div
              key={catIndex}
              className={`p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}
            >
              <h2 className={`text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.endpoints.map((endpoint, epIndex) => (
                  <div
                    key={epIndex}
                    className={`p-4 rounded-lg border ${
                      isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <span
                        className={`px-3 py-1 rounded text-white text-sm font-semibold ${getMethodColor(
                          endpoint.method
                        )}`}
                      >
                        {endpoint.method}
                      </span>
                      <code className={`flex-1 text-sm ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                        {endpoint.path}
                      </code>
                      {endpoint.auth === "Public" ? (
                        <span className="flex items-center gap-1 text-xs text-green-500">
                          <FaGlobe />
                          Public
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-orange-500">
                          <FaLock />
                          {endpoint.auth}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {endpoint.description}
                    </p>
                    {endpoint.params && (
                      <div className="mb-2">
                        <span className={`text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          Parameters:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {endpoint.params.map((param, pIndex) => (
                            <span
                              key={pIndex}
                              className={`px-2 py-1 rounded text-xs ${
                                isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {param}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {endpoint.body && (
                      <div className="mb-2">
                        <span className={`text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          Body:
                        </span>
                        <p className={`text-xs mt-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          {endpoint.body}
                        </p>
                      </div>
                    )}
                    {endpoint.example && (
                      <div>
                        <span className={`text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          Example:
                        </span>
                        <code
                          className={`block mt-1 p-2 rounded text-xs ${
                            isDark ? "bg-gray-900 text-green-400" : "bg-gray-100 text-green-700"
                          }`}
                        >
                          {endpoint.example}
                        </code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Authentication Info */}
        <div className={`mt-8 p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-2xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            Authentication
          </h2>
          <div className={`space-y-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            <p>
              Most admin endpoints require authentication. Use NextAuth session tokens or API keys
              (if configured) to authenticate requests.
            </p>
            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                Admin Authentication:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Login via <code className="text-blue-500">/api/auth/admin/login</code></li>
                <li>Session token stored in cookies</li>
                <li>Middleware checks for admin role</li>
              </ul>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                User Authentication:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Login via <code className="text-blue-500">/api/auth/user/login</code></li>
                <li>OAuth providers supported (Google, Facebook, etc.)</li>
                <li>Required for commenting and user-specific features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


