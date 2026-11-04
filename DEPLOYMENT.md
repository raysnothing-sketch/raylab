# 🚀 Guide de Déploiement : Turso + GitHub + Cloudflare Pages

Ce guide vous accompagne pas à pas pour connecter votre base de données **Turso**, publier votre code sur **GitHub** et mettre votre site en ligne sur **Cloudflare Pages**.

---

## 1. 🗄️ Étape 1 : Connecter la Base de Données Turso

RayLab intègre nativement le client officiel `@libsql/client`.

### Option A : En 60 secondes via la CLI Turso
1. Installez la CLI Turso si ce n'est pas déjà fait :
   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   ```
2. Connectez-vous à votre compte Turso :
   ```bash
   turso auth login
   ```
3. Créez votre base de données Cloud :
   ```bash
   turso db create raylab
   ```
4. Récupérez l'URL et le jeton d'authentification :
   ```bash
   turso db show raylab --url
   # Exemple : libsql://raylab-votre-pseudo.turso.io

   turso db tokens create raylab
   # Exemple : eyJhbGciOi...
   ```

### Option B : Via la Console Web Turso
1. Rendez-vous sur [turso.tech](https://turso.tech) et connectez-vous.
2. Cliquez sur **Create Database**, nommez-la `raylab`, choisissez la région la plus proche (ex: Paris `cdg` ou Francfort `fra`).
3. Copiez la **Database URL** et générez un **Auth Token**.

### Déployer les 30+ tables et le contenu vers Turso :
1. Créez votre fichier `.env.local` à la racine du projet :
   ```env
   TURSO_DATABASE_URL=libsql://raylab-votre-pseudo.turso.io
   TURSO_AUTH_TOKEN=votre-token-secret
   ```
2. Lancez la synchronisation automatique :
   ```bash
   pnpm run db:push
   ```
> ✅ Le schéma SQL complet et l'ensemble des parcours sont instantanément provisionnés sur Turso Cloud !

---

## 2. 🐙 Étape 2 : Publier le Code sur GitHub

Le projet est déjà initialisé en Git local avec tous les fichiers commités sur la branche `main`.

### Avec GitHub CLI (`gh`) :
Si vous avez installé GitHub CLI :
```bash
# 1. Connectez-vous à GitHub
gh auth login

# 2. Créez et poussez le dépôt en une seule commande
gh repo create raylab --public --source=. --remote=origin --push
```

### Manuellement depuis GitHub.com :
1. Allez sur [github.com/new](https://github.com/new).
2. Créez un nouveau dépôt nommé `raylab`.
3. Liez et poussez votre code local :
   ```bash
   git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/raylab.git
   git push -u origin main
   ```

---

## 3. ☁️ Étape 3 : Mise en Ligne sur Cloudflare Pages

Cloudflare Pages offre un hébergement mondial gratuit ultra-rapide avec CDN et protection anti-DDoS.

### Connexion Automatique GitHub -> Cloudflare Pages :
1. Rendez-vous sur votre [Tableau de bord Cloudflare](https://dash.cloudflare.com).
2. Dans le menu de gauche, naviguez vers **Compute (Workers) > Workers & Pages**.
3. Cliquez sur **Create Application** puis sur l'onglet **Pages** > **Connect to Git**.
4. Sélectionnez votre dépôt GitHub `raylab`.
5. Configurez les paramètres de build :
   - **Framework Preset** : `Next.js`
   - **Build Command** : `pnpm run build`
   - **Build Output Directory** : `.next`
   - **Root Directory** : `/`
6. Dans la section **Environment Variables (Advanced)**, ajoutez :
   - `TURSO_DATABASE_URL` = `libsql://raylab-votre-pseudo.turso.io`
   - `TURSO_AUTH_TOKEN` = `votre-token-secret-turso`
   - `NODE_VERSION` = `20`
7. Cliquez sur **Save and Deploy**.

> 🎉 Cloudflare compile votre application et vous attribue une URL mondiale sécurisée en HTTPS (ex: `https://raylab.pages.dev`). Chaque futur `git push` sur GitHub déploiera automatiquement la nouvelle version !
