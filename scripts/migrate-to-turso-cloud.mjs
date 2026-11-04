import { createClient } from "@libsql/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Charge les variables d'environnement depuis .env ou .env.local
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

async function migrate() {
  console.log("----------------------------------------------------------------");
  console.log("⚡ RAYLAB - MIGRATION AUTOMATIQUE VERS TURSO CLOUD (libSQL)");
  console.log("----------------------------------------------------------------");

  if (!url || url.startsWith("file:")) {
    console.error("❌ ERREUR : TURSO_DATABASE_URL n'est pas configuré pour Turso Cloud.");
    console.error("   Format attendu : libsql://votre-base-nom.turso.io");
    console.error("   Veuillez définir TURSO_DATABASE_URL et TURSO_AUTH_TOKEN dans .env.local ou en variable d'environnement.");
    process.exit(1);
  }

  console.log(`[*] Connexion à l'instance Turso Cloud : ${url}`);
  const client = createClient({
    url,
    authToken,
  });

  try {
    // Test de connexion ping
    const ping = await client.execute("SELECT 1 AS alive;");
    console.log("✔ Connexion réussie à l'instance Turso Cloud ! Ping OK :", ping.rows[0]);

    // Lecture du dump SQL complet CyberPath v2
    const sqlPath = path.resolve(process.cwd(), "raylab_turso_complete_v2.sql");
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`Fichier SQL introuvable : ${sqlPath}`);
    }

    console.log(`[*] Lecture du schéma et des données complètes (${sqlPath})...`);
    const sqlContent = fs.readFileSync(sqlPath, "utf-8");

    console.log("[*] Injection du schéma et des 33 tables dans Turso Cloud...");
    await client.executeMultiple(sqlContent);
    console.log("✔ Injection terminée avec succès !");

    // Vérification du nombre de tables et de cours
    const coursesCount = await client.execute("SELECT count(*) as total FROM courses;");
    const lessonsCount = await client.execute("SELECT count(*) as total FROM lessons;");
    const projectsCount = await client.execute("SELECT count(*) as total FROM capstone_projects;");

    console.log("----------------------------------------------------------------");
    console.log("🎉 BASE DE DONNÉES RAYLAB SYNCHRONISÉE AVEC SUCCÈS SUR TURSO !");
    console.log(`   - Cours / Volumes CyberPath : ${coursesCount.rows[0].total}`);
    console.log(`   - Leçons Pratiques Approfondies : ${lessonsCount.rows[0].total}`);
    console.log(`   - Projets Capstones Professionnels : ${projectsCount.rows[0].total}`);
    console.log("----------------------------------------------------------------");
  } catch (err) {
    console.error("❌ Erreur lors de la migration Turso :", err.message || err);
    process.exit(1);
  }
}

migrate();
