import { NextResponse } from "next/server";
import { dbExecute } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId, projectId, repositoryUrl, demoUrl, description, visibility = "public" } = await req.json();

    if (!userId || !projectId || !repositoryUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const id = `sub_${Date.now()}`;
    const now = new Date().toISOString();

    await dbExecute(`
      INSERT INTO project_submissions (id, project_id, user_id, description, repository_url, demo_url, status, visibility, started_at, completed_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'completed', ?, ?, ?, ?)
    `, [id, projectId, userId, description || "", repositoryUrl, demoUrl || "", visibility, now, now, now]);

    // Record activity
    await dbExecute(`
      INSERT INTO activity_events (id, user_id, event_type, entity_type, entity_id, created_at)
      VALUES (?, ?, 'project_submitted', 'project', ?, ?)
    `, [`evt_${Date.now()}`, userId, projectId, now]);

    return NextResponse.json({ success: true, submissionId: id });
  } catch (error) {
    console.error("Project submission error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
