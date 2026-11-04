import { NextResponse } from "next/server";
import { dbQueryOne, dbExecute } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId, lessonId, percent = 100 } = await req.json();

    if (!userId || !lessonId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Check if progress already exists
    const existing = await dbQueryOne("SELECT * FROM lesson_progress WHERE user_id = ? AND lesson_id = ?", [userId, lessonId]);

    const now = new Date().toISOString();

    if (existing) {
      await dbExecute(`
        UPDATE lesson_progress
        SET status = 'completed', progress_percent = ?, completed_at = ?, updated_at = ?
        WHERE user_id = ? AND lesson_id = ?
      `, [percent, now, now, userId, lessonId]);
    } else {
      await dbExecute(`
        INSERT INTO lesson_progress (user_id, lesson_id, status, progress_percent, started_at, completed_at, updated_at)
        VALUES (?, ?, 'completed', ?, ?, ?, ?)
      `, [userId, lessonId, percent, now, now, now]);
    }

    // Record activity event
    await dbExecute(`
      INSERT INTO activity_events (id, user_id, event_type, entity_type, entity_id, created_at)
      VALUES (?, ?, 'lesson_completed', 'lesson', ?, ?)
    `, [`evt_${Date.now()}`, userId, lessonId, now]);

    return NextResponse.json({
      success: true,
      message: "Leçon marquée comme terminée !",
      xpGained: 50,
    });
  } catch (error) {
    console.error("Progress error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
