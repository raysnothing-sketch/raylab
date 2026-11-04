import { dbQuery, dbQueryOne, dbExecute } from "./db";

export type LearningPath = {
  id: string;
  slug: string;
  title: string;
  description: string;
  audience: string;
  difficulty: string;
  estimated_minutes: number;
  status: string;
  course_count?: number;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  domain: string;
  difficulty: string;
  estimated_minutes: number;
  status: string;
  modules?: Module[];
};

export type Module = {
  id: string;
  course_id: string;
  title: string;
  description: string;
  position: number;
  lessons?: Lesson[];
};

export type Lesson = {
  id: string;
  module_id: string;
  slug: string;
  title: string;
  summary: string;
  content_md: string;
  lesson_type: string;
  position: number;
  estimated_minutes: number;
  status: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description_md: string;
  domain: string;
  difficulty: string;
  prerequisites_md: string;
  requirements_md: string;
  safety_notes_md: string;
  estimated_minutes: number;
  status: string;
};

export type Certification = {
  id: string;
  slug: string;
  name: string;
  provider: string;
  domain: string;
  level: string;
  prerequisites_md: string;
  official_url: string;
  price_description: string;
  exam_description: string;
};

export type CareerPath = {
  id: string;
  slug: string;
  title: string;
  description_md: string;
  status: string;
};

// ==========================================
// TURSO / LIBSQL QUERIES (ASYNC)
// ==========================================

export async function getLearningPaths(): Promise<LearningPath[]> {
  const query = `
    SELECT lp.*, COUNT(pc.course_id) as course_count
    FROM learning_paths lp
    LEFT JOIN path_courses pc ON pc.learning_path_id = lp.id
    WHERE lp.status = 'published'
    GROUP BY lp.id
    ORDER BY lp.estimated_minutes ASC
  `;
  return dbQuery<LearningPath>(query);
}

export async function getLearningPathBySlug(slug: string) {
  const path = await dbQueryOne("SELECT * FROM learning_paths WHERE slug = ?", [slug]);
  if (!path) return null;

  const coursesQuery = `
    SELECT c.*, pc.position as path_position, pc.is_required
    FROM courses c
    JOIN path_courses pc ON pc.course_id = c.id
    WHERE pc.learning_path_id = ?
    ORDER BY pc.position ASC
  `;
  const courses = await dbQuery(coursesQuery, [path.id]);

  for (const c of courses) {
    const modules = await dbQuery(
      "SELECT * FROM modules WHERE course_id = ? ORDER BY position ASC",
      [c.id]
    );
    for (const m of modules) {
      m.lessons = await dbQuery(
        "SELECT id, slug, title, summary, lesson_type, estimated_minutes, position FROM lessons WHERE module_id = ? ORDER BY position ASC",
        [m.id]
      );
    }
    c.modules = modules;
  }

  return { ...path, courses };
}

export async function getCourseBySlug(slug: string) {
  const course = await dbQueryOne("SELECT * FROM courses WHERE slug = ?", [slug]);
  if (!course) return null;

  const modules = await dbQuery(
    "SELECT * FROM modules WHERE course_id = ? ORDER BY position ASC",
    [course.id]
  );
  for (const m of modules) {
    m.lessons = await dbQuery(
      "SELECT id, slug, title, summary, lesson_type, estimated_minutes, position FROM lessons WHERE module_id = ? ORDER BY position ASC",
      [m.id]
    );
  }

  return { ...course, modules };
}

export async function getLessonById(lessonId: string) {
  const lesson = await dbQueryOne("SELECT * FROM lessons WHERE id = ?", [lessonId]);
  if (!lesson) return null;

  const moduleInfo = await dbQueryOne("SELECT * FROM modules WHERE id = ?", [lesson.module_id]);
  const courseInfo = moduleInfo
    ? await dbQueryOne("SELECT * FROM courses WHERE id = ?", [moduleInfo.course_id])
    : null;

  // Sibling lessons in the same module
  const moduleLessons = await dbQuery(
    "SELECT id, title, slug, position FROM lessons WHERE module_id = ? ORDER BY position ASC",
    [lesson.module_id]
  );
  const currentIndex = moduleLessons.findIndex((l: any) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < moduleLessons.length - 1 ? moduleLessons[currentIndex + 1] : null;

  // Exercises
  const exercises = await dbQuery("SELECT * FROM exercises WHERE lesson_id = ?", [lesson.id]);

  // Quizzes & Questions
  const quizzes = await dbQuery("SELECT * FROM quizzes WHERE lesson_id = ?", [lesson.id]);
  for (const q of quizzes) {
    q.questions = await dbQuery(
      "SELECT id, quiz_id, question_type, prompt_md, explanation_md, options_json, points, position FROM quiz_questions WHERE quiz_id = ? ORDER BY position ASC",
      [q.id]
    );
  }

  // Resources
  const resources = await dbQuery(
    "SELECT * FROM lesson_resources WHERE lesson_id = ? ORDER BY position ASC",
    [lesson.id]
  );

  return {
    ...lesson,
    module: moduleInfo,
    course: courseInfo,
    prevLesson,
    nextLesson,
    exercises,
    quizzes,
    resources,
  };
}

export async function getProjects(): Promise<Project[]> {
  return dbQuery<Project>("SELECT * FROM projects WHERE status = 'published' ORDER BY difficulty ASC");
}

export async function getProjectBySlug(slug: string) {
  return dbQueryOne<Project>("SELECT * FROM projects WHERE slug = ?", [slug]);
}

export async function getCertifications(): Promise<Certification[]> {
  return dbQuery<Certification>(
    "SELECT * FROM certifications WHERE status = 'published' ORDER BY domain ASC, name ASC"
  );
}

export async function getCareerPaths(): Promise<CareerPath[]> {
  return dbQuery<CareerPath>(
    "SELECT * FROM career_paths WHERE status = 'published' ORDER BY title ASC"
  );
}

export async function getUserDashboard(userId: string) {
  const user = await dbQueryOne("SELECT * FROM users WHERE id = ?", [userId]);
  if (!user) return null;

  // Enrollments
  const enrollments = await dbQuery(
    `
    SELECT pe.*, lp.title as path_title, lp.slug as path_slug, lp.difficulty, lp.estimated_minutes
    FROM path_enrollments pe
    JOIN learning_paths lp ON lp.id = pe.learning_path_id
    WHERE pe.user_id = ?
    ORDER BY pe.started_at DESC
  `,
    [userId]
  );

  // Completed lessons
  const progressList = await dbQuery(
    `
    SELECT lp.*, l.title as lesson_title, l.slug as lesson_slug, l.estimated_minutes
    FROM lesson_progress lp
    JOIN lessons l ON l.id = lp.lesson_id
    WHERE lp.user_id = ?
    ORDER BY lp.updated_at DESC
  `,
    [userId]
  );

  // Goals
  const goals = await dbQuery(
    `SELECT * FROM user_goals WHERE user_id = ? ORDER BY status ASC, target_date ASC`,
    [userId]
  );

  // Achievements
  const achievements = await dbQuery(
    `
    SELECT ua.earned_at, a.*
    FROM user_achievements ua
    JOIN achievements a ON a.id = ua.achievement_id
    WHERE ua.user_id = ?
    ORDER BY ua.earned_at DESC
  `,
    [userId]
  );

  // Submissions
  const submissions = await dbQuery(
    `
    SELECT ps.*, p.title as project_title, p.slug as project_slug
    FROM project_submissions ps
    JOIN projects p ON p.id = ps.project_id
    WHERE ps.user_id = ?
    ORDER BY ps.started_at DESC
  `,
    [userId]
  );

  // Notes personnelles
  const notes = await dbQuery(
    `
    SELECT un.*, l.title as lesson_title
    FROM user_notes un
    JOIN lessons l ON l.id = un.lesson_id
    WHERE un.user_id = ?
    ORDER BY un.updated_at DESC
    `,
    [userId]
  );

  return {
    user,
    enrollments,
    progressList,
    goals,
    achievements,
    submissions,
    notes,
  };
}
