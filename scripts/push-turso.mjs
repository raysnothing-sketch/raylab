import { createClient } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

// Load .env.local or .env
const envLocalPath = path.join(process.cwd(), ".env.local");
const envPath = path.join(process.cwd(), ".env");

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log("==================================================================");
console.log("🚀 RayLab — Synchronisation & Déploiement vers Turso Database");
console.log("==================================================================");

if (!url) {
  console.log(`
⚠️  Variable d'environnement TURSO_DATABASE_URL manquante !

Pour connecter votre propre base Turso Cloud gratuite :
  1. Créez un compte gratuit sur https://turso.tech ou installez la CLI :
     curl -sSfL https://get.tur.so/install.sh | bash
  2. Créez votre base de données :
     turso db create raylab
  3. Récupérez l'URL et le jeton d'accès :
     turso db show raylab --url
     turso db tokens create raylab
  4. Ajoutez-les dans votre fichier .env.local :
     TURSO_DATABASE_URL=libsql://raylab-[votre-nom].turso.io
     TURSO_AUTH_TOKEN=votre-token-secret
  5. Relancez : pnpm run db:push
`);
  process.exit(1);
}

console.log(`🔗 Connexion à Turso Database : ${url}`);

const client = createClient({
  url,
  authToken,
});

async function main() {
  try {
    // 1. Déploiement du Schéma SQL
    const schemaPath = path.join(process.cwd(), "src", "db", "schema.sql");
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Fichier de schéma introuvable : ${schemaPath}`);
    }

    console.log("📄 Lecture du schéma SQL complet (30+ tables)...");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");

    // LibSQL executeMultiple allows running full SQL scripts with multiple statements
    console.log("⚡ Exécution du schéma SQL sur Turso Cloud...");
    await client.executeMultiple(schemaSql);
    console.log("✅ Schéma déployé avec succès sur Turso !");

    // 2. Vérification des tables principales
    const tablesRes = await client.execute(`
      SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;
    `);

    console.log(`\n📊 Tables créées sur Turso Cloud (${tablesRes.rows.length} tables) :`);
    console.log(tablesRes.rows.map((r) => `   - ${r.name}`).join("\n"));

    console.log("\n🎉 Votre base de données Turso est 100% opérationnelle pour RayLab !");
    console.log("Vous pouvez maintenant déployer votre site sur Cloudflare Pages.");
  } catch (error) {
    console.error("❌ Erreur lors du déploiement vers Turso :", error);
    process.exit(1);
  }
}

main();
