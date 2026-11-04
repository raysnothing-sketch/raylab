# 🚀 RayLab — Statut & Guide de Déploiement

Ce document résume le statut de mise en production de **RayLab**, les URLs en direct, et la procédure pour connecter votre instance Turso Cloud.

---

## 🟢 1. Statut en Direct

| Service | Statut | Détails / Liens |
|---|---|---|
| **Cloudflare Pages** | **LIVE (Production)** | 🌐 [https://raylab.pages.dev](https://raylab.pages.dev) |
| **Cloudflare Edge API** | **FONCTIONNEL** | ⚡ `POST https://raylab.pages.dev/api/ai/chat` (Laboratoire Virtuel (WASM & Linux)) |
| **Dépôt GitHub** | **SYNCHRONISÉ** | 🐙 [https://github.com/raysnothing-sketch/raylab](https://github.com/raysnothing-sketch/raylab) |
| **Base de Données** | **PRÊTE (libSQL / Turso)** | Moteur `@libsql/client` actif (Local `raylab.sqlite` / Prêt pour Turso Cloud) |

---

## 🗄️ 2. Connecter votre base de données Turso Cloud

Le code est 100% prêt pour **Turso** grâce au SDK officiel `@libsql/client` (voir `src/lib/db.ts`).

### Si vous avez déjà créé votre base Turso sur [turso.tech](https://turso.tech) :
1. Récupérez vos deux identifiants sur le dashboard Turso :
   - **Database URL** (ex: `libsql://raylab-nom.turso.io`)
   - **Auth Token** (jeton secret commençant par `ey...`)

2. **En local :** Créez un fichier `.env.local` dans le dossier du projet :
   ```env
   TURSO_DATABASE_URL=libsql://raylab-votre-pseudo.turso.io
   TURSO_AUTH_TOKEN=votre_jeton_secret_turso
   ```
   Puis lancez la synchronisation instantanée du schéma et des données :
   ```bash
   pnpm run db:push
   ```
   *Ce script crée automatiquement les 30+ tables du schéma et injecte les cours, leçons, projets et certifications.*

3. **Sur Cloudflare Pages :**
   - Rendez-vous sur votre [Tableau de bord Cloudflare](https://dash.cloudflare.com) > **Workers & Pages** > Projet **`raylab`**.
   - Allez dans **Settings** > **Environment variables**.
   - Ajoutez :
     - `TURSO_DATABASE_URL` = `libsql://raylab-votre-pseudo.turso.io`
     - `TURSO_AUTH_TOKEN` = `votre_jeton_secret_turso`
     - `OMNIROUTE_API_KEY` = `sk-c0d0262b91767837-80ca49-4ff67cda` *(optionnel pour booster Laboratoire Virtuel (WASM & Linux) avec vos modèles)*

---

## 🐙 3. Synchronisation avec GitHub

Le dépôt GitHub a été automatiquement créé et configuré sur votre compte :
- **URL :** [https://github.com/raysnothing-sketch/raylab](https://github.com/raysnothing-sketch/raylab)
- **Branche principale :** `main`

Pour pousser de futures modifications :
```bash
git add .
git commit -m "feat: mes nouvelles fonctionnalités"
git push origin main
```

---

## ⚡ 4. Redéploiement sur Cloudflare Pages

Pour redéployer le site sur Cloudflare Pages à tout moment :
```bash
pnpm run deploy:pages
```
Ou avec Wrangler directement :
```bash
node scripts/prepare-cloudflare-dist.mjs
npx wrangler pages deploy cloudflare-dist --project-name=raylab
```
