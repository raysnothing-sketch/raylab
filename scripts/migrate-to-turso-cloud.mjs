import { createClient } from "@libsql/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const remoteUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

async function migrate() {
  console.log("================================================================");
  console.log("⚡ RAYLAB - MIGRATION AUTOMATIQUE VERS TURSO CLOUD (libSQL)");
  console.log("================================================================");

  if (!remoteUrl || !authToken) {
    console.error("❌ ERREUR : TURSO_DATABASE_URL ou TURSO_AUTH_TOKEN manquant.");
    process.exit(1);
  }

  console.log(`[*] Connexion à l'instance Turso Cloud : ${remoteUrl}`);
  const remoteClient = createClient({
    url: remoteUrl,
    authToken,
  });

  const localClient = createClient({
    url: "file:raylab.sqlite",
  });

  try {
    // 1. Test ping
    const ping = await remoteClient.execute("SELECT 1 AS alive;");
    console.log("✔ Ping Turso Cloud réussi ! Statut :", ping.rows[0]);

    // 2. Création des 33 tables dans l'ordre strict des dépendances
    const schemaFile = path.resolve(
      "C:/Users/raysn/.gemini/antigravity/brain/dce71671-bf6e-4d47-a0e2-c74401ed82ec/.user_uploaded/media_1793819190162_033924e2.sql"
    );
    console.log(`[*] Lecture du schéma DDL officiel : ${schemaFile}`);
    const schemaSql = fs.readFileSync(schemaFile, "utf-8");

    console.log("[*] Création des 33 tables sur Turso Cloud...");
    await remoteClient.executeMultiple(schemaSql);
    console.log("✔ Les 33 tables ont été créées avec succès sur Turso Cloud !");

    // 3. Migration des données depuis raylab.sqlite
    const tableOrder = [
      "users",
      "roles",
      "user_roles",
      "learning_paths",
      "courses",
      "path_courses",
      "modules",
      "lessons",
      "lesson_resources",
      "skills",
      "course_skills",
      "lesson_prerequisites",
      "path_enrollments",
      "lesson_progress",
      "user_notes",
      "bookmarks",
      "exercises",
      "exercise_attempts",
      "quizzes",
      "quiz_questions",
      "quiz_attempts",
      "projects",
      "project_skills",
      "project_submissions",
      "project_bookmarks",
      "career_paths",
      "career_path_skills",
      "certifications",
      "user_certifications",
      "user_goals",
      "achievements",
      "user_achievements",
      "activity_events",
    ];

    let totalMigratedRows = 0;

    for (const table of tableOrder) {
      const res = await localClient.execute(`SELECT * FROM "${table}"`);
      const rows = res.rows;
      if (!rows || rows.length === 0) continue;

      console.log(`[*] Synchronisation de ${rows.length} lignes dans [${table}]...`);
      const cols = res.columns;
      const colNames = cols.map((c) => `"${c}"`).join(", ");
      const placeholders = cols.map(() => "?").join(", ");
      const insertSql = `INSERT OR REPLACE INTO "${table}" (${colNames}) VALUES (${placeholders})`;

      for (const row of rows) {
        const values = cols.map((c) => row[c]);
        await remoteClient.execute({ sql: insertSql, args: values });
        totalMigratedRows++;
      }
    }

    console.log("================================================================");
    console.log("🎉 MIGRATION TURSO CLOUD COMPLÉTÉE AVEC SUCCÈS !");
    console.log(`✔ Total de lignes synchronisées : ${totalMigratedRows}`);

    // Vérification finale sur le cluster Turso
    const verifyCourses = await remoteClient.execute("SELECT count(*) as count FROM courses;");
    const verifyLessons = await remoteClient.execute("SELECT count(*) as count FROM lessons;");
    const verifyProjects = await remoteClient.execute("SELECT count(*) as count FROM projects;");
    const verifyQuizzes = await remoteClient.execute("SELECT count(*) as count FROM quizzes;");
    const verifyTables = await remoteClient.execute(
      "SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
    );

    console.log(`✔ Vérification Turso Cloud :`);
    console.log(`   - Tables créées : ${verifyTables.rows[0].count} / 33`);
    console.log(`   - Cours / Volumes CyberPath : ${verifyCourses.rows[0].count}`);
    console.log(`   - Leçons Pratiques : ${verifyLessons.rows[0].count}`);
    console.log(`   - Projets Capstones : ${verifyProjects.rows[0].count}`);
    console.log(`   - Quiz & Évaluations : ${verifyQuizzes.rows[0].count}`);
    console.log("================================================================");
  } catch (err) {
    console.error("❌ Erreur de synchronisation Turso :", err);
    process.exit(1);
  }
}

migrate();
