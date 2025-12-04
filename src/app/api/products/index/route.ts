// app/api/products/index/route.ts
// ProductIndex listing (synced products)

import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/products/index - Get all indexed products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "active";
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;
    const search = searchParams.get("search");

    let sql = "SELECT * FROM ProductIndex WHERE 1=1";
    const params: any[] = [];

    if (status) {
      sql += " AND syncStatus = ?";
      params.push(status);
    }

    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }

    if (search) {
      sql += " AND (name LIKE ? OR description LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    sql += " ORDER BY adminPriority DESC, popularityScore DESC, createdAt DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const products = await query(sql, params);

    // Get total count
    let countSql = "SELECT COUNT(*) as total FROM ProductIndex WHERE 1=1";
    const countParams: any[] = [];
    if (status) {
      countSql += " AND syncStatus = ?";
      countParams.push(status);
    }
    if (category) {
      countSql += " AND category = ?";
      countParams.push(category);
    }
    if (search) {
      countSql += " AND (name LIKE ? OR description LIKE ?)";
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm);
    }

    const countResult = await queryOne<{ total: number }>(countSql, countParams);
    const total = countResult?.total || 0;

    return NextResponse.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error: any) {
    console.error("Error fetching indexed products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", message: error.message },
      { status: 500 }
    );
  }
}

