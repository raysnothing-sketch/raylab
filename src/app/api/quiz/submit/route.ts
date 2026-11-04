import { NextResponse } from "next/server";
import { dbQueryOne, dbQuery, dbExecute } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId, quizId, userAnswers } = await req.json();

    if (!userId || !quizId || !userAnswers) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const quiz = await dbQueryOne("SELECT * FROM quizzes WHERE id = ?", [quizId]);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const questions = await dbQuery("SELECT * FROM quiz_questions WHERE quiz_id = ?", [quizId]);

    let totalPoints = 0;
    let earnedPoints = 0;
    const feedback: Record<string, { correct: boolean; explanation: string }> = {};

    for (const q of questions) {
      totalPoints += q.points;
      let isCorrect = false;

      let keyObj: any = {};
      try {
        keyObj = JSON.parse(q.answer_key_json);
      } catch (e) {
        keyObj = { correct: q.answer_key_json };
      }

      const expected = keyObj.correct;
      const given = userAnswers[q.id];

      if (given && String(given).toLowerCase().trim() === String(expected).toLowerCase().trim()) {
        isCorrect = true;
        earnedPoints += q.points;
      }

      feedback[q.id] = {
        correct: isCorrect,
        explanation: q.explanation_md || "Explication validée.",
      };
    }

    const scorePercent = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = scorePercent >= quiz.passing_score ? 1 : 0;
    const now = new Date().toISOString();

    // Record attempt
    await dbExecute(`
      INSERT INTO quiz_attempts (id, quiz_id, user_id, answers_json, score, passed, started_at, submitted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      `qa_${Date.now()}`,
      quizId,
      userId,
      JSON.stringify(userAnswers),
      scorePercent,
      passed,
      now,
      now
    ]);

    return NextResponse.json({
      score: scorePercent,
      passed: Boolean(passed),
      passingScore: quiz.passing_score,
      feedback,
      xpGained: passed ? 100 : 25,
    });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json({ error: "Error grading quiz" }, { status: 500 });
  }
}
