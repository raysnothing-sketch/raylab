import { execSync } from "node:child_process";
import path from "node:path";

console.log("🛠️  Exécution du script de seed exhaustif RayLab...");
try {
  execSync("python scripts/build_full_database.py", {
    stdio: "inherit",
    cwd: process.cwd(),
  });
  console.log("✅ Seed terminé avec succès !");
} catch (error) {
  console.error("❌ Erreur lors de l'exécution du script Python de seed :", error.message);
  process.exit(1);
}
