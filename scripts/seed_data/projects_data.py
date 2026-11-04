# -*- coding: utf-8 -*-
"""
Les 7 Projets Intégrateurs Majeurs de CyberPath 2026-2027.
Chaque projet possède des prérequis précis, des spécifications détaillées et des consignes de sécurité strictes.
"""

PROJECTS_DATA = [
    {
        "id": "proj_01_bash_audit",
        "slug": "projet-01-script-administration-linux",
        "title": "PROJET 01 : Script d'Administration et d'Audit Système Linux",
        "summary": "Développer un outil Bash modulaire qui audite les comptes à hauts privilèges, les binaires SUID dangereux et les permissions système selon les recommandations CIS Benchmarks.",
        "description_md": """# PROJET 01 : Script d'Administration & d'Audit Système Linux

## Contexte Opérationnel
En tant que jeune administrateur ou auditeur système, vous devez rapidement évaluer le niveau de durcissement d'un serveur Linux (Debian/Ubuntu) sans installer de dépendances lourdes tierces.

## Objectifs du Projet
1. Développer un script Bash autonome `audit_hardening.sh` respectant les règles `set -euo pipefail`.
2. Identifier les anomalies de sécurité critiques :
   * Comptes disposant de l'UID 0 en dehors de `root`.
   * Mots de passe vides dans `/etc/shadow`.
   * Binaires SUID/SGID non standards pouvant être exploités pour une élévation de privilèges (référence GTFOBins).
   * Permissions excessives en écriture publique (`chmod 777`) sur des dossiers système.
3. Générer un rapport d'audit formaté en Markdown et un résumé synthétique dans le terminal avec code couleur ANSI.
""",
        "domain": "Systems",
        "difficulty": "beginner",
        "prerequisites_md": "Avoir validé le Volume 2 de CyberPath (Commandes Linux, Pipelines, Expressions rationnelles et Scripting Bash).",
        "requirements_md": "- Script écrit en Bash pur sans dépendance externe.\n- Gestion des erreurs et messages clairs.\n- Détection d'au moins 5 indicateurs de durcissement.\n- Code commenté et documenté dans un README.md avec instructions de lancement.",
        "safety_notes_md": "Le script doit être exécuté en lecture seule : aucune modification de configuration ne doit être effectuée sans confirmation explicite de l'utilisateur.",
        "estimated_minutes": 360,
        "status": "published"
    },
    {
        "id": "proj_02_python_toolkit",
        "slug": "projet-02-python-security-toolkit",
        "title": "PROJET 02 : Python Security Toolkit & Scanner Réseau Multi-threads",
        "summary": "Concevoir une boîte à outils en Python moderne intégrant un scanner de ports TCP asynchrone non-bloquant, un extracteur de bannières et un calculateur d'empreintes de fichiers.",
        "description_md": """# PROJET 02 : Python Security Toolkit & Network Scanner

## Contexte Opérationnel
La plupart des outils du commerce sont trop volumineux pour des interventions rapides. Vous devez concevoir un ensemble d'utilitaires légers en Python 3 pour cartographier un périmètre réseau et analyser des fichiers suspects.

## Fonctionnalités Requises
1. **Module Scanner TCP :** Balayage rapide de plages de ports à l'aide de threads (`concurrent.futures.ThreadPoolExecutor`) ou `asyncio`, avec détection de bannières applicatives.
2. **Module Hashing & Intégrité :** Calcul simultané d'empreintes MD5, SHA-1 et SHA-256 sur des fichiers suspects avec détection de collisions potentielles.
3. **Interface CLI Ergonomique :** Utilisation du module standard `argparse` pour permettre l'exécution en ligne de commande avec drapeaux (`--target`, `--ports`, `--threads`, `--output`).
""",
        "domain": "Programming",
        "difficulty": "intermediate",
        "prerequisites_md": "Validation du Volume 3 de CyberPath et des parties I à VI du Manuel Complet de Python (POO, Concurrence, Fichiers, Exceptions).",
        "requirements_md": "- Typage PEP 484 complet.\n- Architecture modulaire orientée objet.\n- Tests unitaires `unittest` ou `pytest` couvrant au moins 80% du code.\n- Gestion propre des interruptions clavier (Ctrl+C).",
        "safety_notes_md": "Ne scannez que des adresses autorisées au sein de votre laboratoire local (127.0.0.1 ou sous-réseau Host-Only). Le balayage non autorisé de cibles externes est strictement prohibé.",
        "estimated_minutes": 480,
        "status": "published"
    },
    {
        "id": "proj_03_secure_auth",
        "slug": "projet-03-authentification-securisee",
        "title": "PROJET 03 : Système d'Authentification Sécurisé (PBKDF2 & JWT)",
        "summary": "Construire un microservice d'authentification complet résistant aux attaques par brute-force, avec dérivation de clé étirée, jetons JWT sécurisés et limitation de débit.",
        "description_md": """# PROJET 03 : Système d'Authentification Sécurisé & Anti-Bruteforce

## Contexte Opérationnel
L'authentification est le premier rempart protégeant les données des utilisateurs. Une implémentation naïve (mots de passe en clair, MD5 sans sel, jetons sans signature) expose l'application à des fuites catastrophiques.

## Livrables Techniques
1. **Stockage Cryptographique :** Dérivation de clés avec **PBKDF2-HMAC-SHA256** avec sel aléatoire CSPRNG (`os.urandom(16)`) et 600 000 itérations recommandées par l'OWASP.
2. **Vérification Temporelle Constante :** Utilisation obligatoire de `secrets.compare_digest()` pour neutraliser les attaques par canaux auxiliaires temporels.
3. **Limitation de Débit (Rate Limiting) :** Verrouillage temporaire d'un compte ou temporisation exponentielle après 5 tentatives infructueuses consécutives.
4. **Gestion de Sessions JWT :** Émission de jetons signés avec algorithme asymétrique RS256 ou HMAC-SHA256 et date d'expiration stricte.
""",
        "domain": "Web",
        "difficulty": "intermediate",
        "prerequisites_md": "Volume 6 et 7 de CyberPath (HTTP, Cryptographie appliquée, OWASP Top 10).",
        "requirements_md": "- Backend réalisé en Python (FastAPI ou Flask).\n- Base de données SQLite ou PostgreSQL avec requêtes préparées.\n- Aucun mot de passe stocké en clair.\n- Suite de tests d'intrusion automatisés validant la résistance au bruteforce.",
        "safety_notes_md": "N'utilisez jamais d'algorithmes dépréciés tels que MD5 ou SHA-1 pour le stockage des mots de passe.",
        "estimated_minutes": 540,
        "status": "published"
    },
    {
        "id": "proj_04_cloud_crypto",
        "slug": "projet-04-audit-cloud-crypto",
        "title": "PROJET 04 : Audit Cryptographique Hybride & Évaluation Cloud",
        "summary": "Mettre en œuvre un coffre-fort de données chiffrées en AES-256-GCM / RSA-4096 et auditer les règles de sécurité Row Level Security (RLS) d'une architecture Cloud moderne.",
        "description_md": """# PROJET 04 : Chiffrement Hybride & Audit Cloud

## Contexte Opérationnel
Les entreprises déportent massivement leurs données vers le Cloud (Supabase, Firebase, AWS S3). Cependant, une mauvaise politique d'accès ou l'absence de chiffrement de bout en bout entraîne des fuites de données massives.

## Missions du Projet
1. **Coffre-Fort Numérique :** Implémenter un système de chiffrement d'enveloppe (Envelope Encryption) : un fichier volumineux est chiffré localement avec une clé symétrique AES-256-GCM éphémère, laquelle est ensuite chiffrée avec la clé publique RSA-4096 du destinataire.
2. **Audit de Règles Cloud :** Examiner les politiques d'accès aux bases de données (Supabase Postgres RLS ou Firebase Security Rules) pour détecter les failles d'exposition publique involontaire (`auth.uid() IS NULL`).
""",
        "domain": "Cybersecurity",
        "difficulty": "intermediate",
        "prerequisites_md": "Volume 7 et 10 de CyberPath (Cryptographie moderne, Modèles Cloud).",
        "requirements_md": "- Code Python utilisant la bibliothèque `cryptography` officielle.\n- Rapport d'audit de sécurité des règles Cloud avec matrice de remédiation.\n- Validation de l'intégrité des données à l'aide des tags d'authentification GCM.",
        "safety_notes_md": "Veillez à protéger rigoureusement vos clés privées : ne les commitez jamais sur des dépôts GitHub publics.",
        "estimated_minutes": 480,
        "status": "published"
    },
    {
        "id": "proj_05_app_hardening",
        "slug": "projet-05-durcissement-application-owasp",
        "title": "PROJET 05 : Transformation & Durcissement d'une Application Vulnérable",
        "summary": "Recevoir le code source d'une application criblée de failles OWASP Top 10 (SQLi, XSS, CSRF, IDOR), documenter les vulnérabilités et injecter les correctifs définitifs.",
        "lesson_type": "interactive",
        "description_md": """# PROJET 05 : Durcissement Applicatif & Remédiation OWASP

## Contexte Opérationnel
Le rôle d'un ingénieur sécurité ou DevSecOps ne se limite pas à trouver des failles : il doit être capable d'accompagner les développeurs dans l'écriture de correctifs robustes.

## Déroulement du Laboratoire
1. Vous recevez le code source d'une application de gestion d'utilisateurs contenant volontairement :
   * Une injection SQL sur le module de recherche.
   * Une faille XSS stockée dans le profil utilisateur.
   * Une faille IDOR permettant de consulter les messages privés d'autrui.
   * Une absence d'en-têtes HTTP de sécurité (CSP, HSTS).
2. Pour chaque faille :
   * Rédiger une preuve de concept (PoC) documentée.
   * Remplacer le code vulnérable par du code durci (requêtes préparées, échappement contextuel, vérification d'autorisation RBAC).
   * Valider que l'exploitation échoue désormais systématiquement.
""",
        "domain": "Web",
        "difficulty": "intermediate",
        "prerequisites_md": "Volumes 6, 7 et 8 de CyberPath.",
        "requirements_md": "- Rapport de correction sous format Markdown avant/après.\n- Code entièrement corrigé et testé.\n- Configuration d'en-têtes de sécurité stricts (Content-Security-Policy).",
        "safety_notes_md": "Les tests doivent être conduits exclusivement au sein du conteneur de laboratoire local fourni.",
        "estimated_minutes": 540,
        "status": "published"
    },
    {
        "id": "proj_06_soc_investigation",
        "slug": "projet-06-investigation-incident-soc",
        "title": "PROJET 06 : Détecteur d'Incidents SOC & Analyseur SIEM Automatisé",
        "summary": "Concevoir un mini-moteur de corrélation SIEM en Python qui ingère des journaux d'accès bruts, détecte les attaques en temps réel et génère des alertes selon le cycle PICERL.",
        "description_md": """# PROJET 06 : Détecteur d'Incidents SOC & SIEM

## Contexte Opérationnel
Les équipes de détection font face à un déluge de données. L'automatisation du parsing et de la corrélation d'événements est le cœur de métier d'un analyste SOC L2.

## Spécifications Logicielles
1. **Ingestion Multi-Sources :** Lecture en flux de fichiers de logs Apache/Nginx (format Combined Log Format) et Syslog Linux.
2. **Moteur de Détection par Expressions Rationnelles :** Identification automatique de signatures d'injections SQL, tentatives de traversée de répertoires (`/etc/passwd`), exécution de commandes et scans d'outils automatisés (Sqlmap, Nikto).
3. **Corrélation Temporelle :** Détection de rafales d'échecs de connexion (Brute-force) : plus de 10 codes HTTP 401 sur la même IP en moins de 60 secondes.
4. **Génération d'Alertes :** Notification horodatée avec niveau de sévérité (CRITICAL, HIGH, MEDIUM), adresse IP source, et recommandation d'action immédiate.
""",
        "domain": "Cybersecurity",
        "difficulty": "advanced",
        "prerequisites_md": "Volumes 8 et 11 de CyberPath (Surveillance Blue Team, Regex, SIEM).",
        "requirements_md": "- Script Python orienté objet performant.\n- Prise en charge d'au moins 4 règles de détection distinctes.\n- Sortie formatée JSON pour intégration dans un SIEM moderne.\n- Document de modélisation de réponse à incident selon le standard PICERL.",
        "safety_notes_md": "Manipulez les journaux d'attaques avec précaution pour éviter toute exécution accidentelle de commandes via injection de terminal.",
        "estimated_minutes": 600,
        "status": "published"
    },
    {
        "id": "proj_07_pentest_pro",
        "slug": "projet-07-pentest-complet-rapport-professionnel",
        "title": "PROJET 07 : Pentest Complet en Laboratoire & Rapport d'Audit Exécutif",
        "summary": "Réalisation d'un test d'intrusion complet de bout en bout sur une cible de laboratoire isolée et rédaction d'un rapport d'audit exécutif coté au standard CVSS 3.1.",
        "description_md": """# PROJET 07 : Pentest Complet & Rapport d'Audit Professionnel

## Contexte Opérationnel
Le test d'intrusion ne se termine pas lorsqu'on obtient les droits administrateurs (`root` ou `SYSTEM`). La valeur ajoutée d'un auditeur de sécurité réside dans la qualité, la clarté et la pertinence de son rapport d'audit remis aux dirigeants et aux équipes techniques.

## Déroulement de l'Audit
1. **Phase de Cadrage :** Formalisation de l'ordre de mission (Rules of Engagement) et validation du périmètre.
2. **Reconnaissance & Énumération :** Cartographie complète des ports et services ouverts via Nmap.
3. **Analyse de Vulnérabilités & Exploitation :** Identification d'un point d'entrée, obtention d'un accès initial (Reverse Shell) et élévation de privilèges locale (PrivEsc).
4. **Rédaction du Rapport d'Audit Exécutif :**
   * Résumé managérial vulgarisé pour les décideurs.
   * Matrice des risques et tableau récapitulatif avec cotations CVSS 3.1 officielles.
   * Fiches techniques détaillées avec captures d'écran, preuves de concept et plans d'action correctifs hiérarchisés.
""",
        "domain": "Cybersecurity",
        "difficulty": "advanced",
        "prerequisites_md": "Avoir complété l'intégralité des Volumes 1 à 12 de CyberPath 2026-2027.",
        "requirements_md": "- Rapport d'audit de 15 à 25 pages au format PDF professionnel (rédigé en Markdown puis compilé).\n- Respect strict de la cotation CVSS 3.1 pour chaque vulnérabilité identifiée.\n- Recommandations techniques réalistes et budgétées.\n- Code des scripts d'exploitation annexé et commenté.",
        "safety_notes_md": "L'audit doit être mené exclusivement sur la machine virtuelle de laboratoire dédiée mise à disposition dans le cadre de ce projet.",
        "estimated_minutes": 720,
        "status": "published"
    }
]

print(f"Loaded {len(PROJECTS_DATA)} Capstone projects for CyberPath.")
