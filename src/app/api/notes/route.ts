import { NextResponse } from "next/server";
import { dbQueryOne, dbExecute } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const lessonId = searchParams.get("lessonId");

    if (!userId || !lessonId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const note = await dbQueryOne("SELECT * FROM user_notes WHERE user_id = ? AND lesson_id = ?", [userId, lessonId]);
    return NextResponse.json({ note: note || null });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, lessonId, body, title } = await req.json();

    if (!userId || !lessonId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const existing = await dbQueryOne("SELECT * FROM user_notes WHERE user_id = ? AND lesson_id = ?", [userId, lessonId]);
    const now = new Date().toISOString();

    if (existing) {
      await dbExecute(`
        UPDATE user_notes
        SET body = ?, title = ?, updated_at = ?
        WHERE id = ?
      `, [body, title || "Note de leçon", now, existing.id]);
    } else {
      await dbExecute(`
        INSERT INTO user_notes (id, user_id, lesson_id, title, body, is_private, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 1, ?, ?)
      `, [`note_${Date.now()}`, userId, lessonId, title || "Note de leçon", body, now, now]);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}
