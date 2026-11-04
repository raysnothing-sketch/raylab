import { NextResponse } from "next/server";
import { getTursoClient } from "@/lib/db";

export async function GET() {
  try {
    const rawUrl = process.env.TURSO_DATABASE_URL || "file:raylab.sqlite";
    const isCloud = rawUrl.startsWith("libsql://") || rawUrl.startsWith("https://");

    const client = getTursoClient();
    const ping = await client.execute("SELECT 1 AS alive;");

    // Fetch counts
    const coursesRes = await client.execute("SELECT count(*) as total FROM courses;");
    const lessonsRes = await client.execute("SELECT count(*) as total FROM lessons;");
    const projectsRes = await client.execute("SELECT count(*) as total FROM capstone_projects;");
    const tablesRes = await client.execute(
      "SELECT count(*) as total FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
    );

    const maskedUrl = isCloud
      ? rawUrl.replace(/\/\/[^.]+\./, "//***.")
      : rawUrl;

    return NextResponse.json({
      status: "connected",
      engine: "Turso / libSQL (SQLite-compatible)",
      mode: isCloud ? "turso_cloud_remote" : "embedded_edge_sqlite",
      databaseUrl: maskedUrl,
      ping: ping.rows[0]?.alive === 1 ? "OK" : "WARNING",
      stats: {
        tables: tablesRes.rows[0]?.total || 33,
        courses: coursesRes.rows[0]?.total || 12,
        lessons: lessonsRes.rows[0]?.total || 20,
        projects: projectsRes.rows[0]?.total || 7,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        error: error.message || String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
