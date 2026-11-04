import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

const DB_PATH = path.join(process.cwd(), "raylab.sqlite");
const SCHEMA_PATH = path.join(process.cwd(), "src", "db", "schema.sql");

console.log("🛠️  Initialisation complète de la base de données RayLab...");

if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
  console.log("   Ancienne base supprimée pour un seed exhaustif.");
}

const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA foreign_keys = ON;");

const schemaSql = fs.readFileSync(SCHEMA_PATH, "utf-8");
db.exec(schemaSql);
console.log("✅ Schéma SQL exécuté avec succès (30+ tables).");

// ---------------------------------------------------------------------------
// 1. UTILISATEURS & RÔLES
// ---------------------------------------------------------------------------
const insertUser = db.prepare(`
  INSERT INTO users (id, auth_subject, email, display_name, avatar_url, preferred_language, timezone)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

insertUser.run(
  "user_founder_raylab",
  "auth_founder_001",
  "founder@raylab.tech",
  "Fondateur RayLab",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "fr",
  "Europe/Paris"
);

insertUser.run(
  "user_alex_learner",
  "auth_alex_002",
  "alexandre@example.com",
  "Alexandre Dubois",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "fr",
  "Europe/Berlin"
);

const insertUserRole = db.prepare(`INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)`);
insertUserRole.run("user_founder_raylab", "role_super_admin");
insertUserRole.run("user_founder_raylab", "role_editor");
insertUserRole.run("user_founder_raylab", "role_learner");
insertUserRole.run("user_alex_learner", "role_learner");

// ---------------------------------------------------------------------------
// 2. COMPÉTENCES (SKILLS TAXONOMY)
// ---------------------------------------------------------------------------
const insertSkill = db.prepare(`INSERT INTO skills (id, slug, name, description, domain) VALUES (?, ?, ?, ?, ?)`);
const skillsData = [
  ["skill_py_syntax", "python-syntax", "Syntaxe & Structures Python", "Variables, boucles for/while, compréhension de listes, typage PEP 484", "Programming"],
  ["skill_py_ds", "python-data-structures", "Structures de Données Avancées", "Listes, tuples, dictionnaires, ensembles, collections et itérateurs", "Programming"],
  ["skill_py_oop", "python-oop", "Programmation Orientée Objet", "Classes, encapsulation, héritage, polymorphisme, dunder methods et SOLID", "Programming"],
  ["skill_py_net", "python-networking", "Programmation Réseau Python", "Sockets TCP/UDP, requêtes HTTP, manipulation de paquets Scapy", "Programming"],
  ["skill_py_sec", "python-security-automation", "Automatisation de la Sécurité", "Scripts d'audit, détection d'intrusions, parseurs de logs, moniteurs FIM", "Cybersecurity"],
  ["skill_cia_model", "cia-triad", "Gouvernance & Triade CIA", "Confidentialité, intégrité, disponibilité, gestion des risques et conformité", "Cybersecurity"],
  ["skill_crypto", "cryptography-fundamentals", "Cryptographie Appliquée", "Chiffrement AES, RSA/ECC, hachage SHA-256, HMAC, signatures et PKI", "Cybersecurity"],
  ["skill_soc_ops", "soc-operations", "Opérations de SOC (L1/L2)", "Triage d'alertes, corrélation SIEM, détection d'anomalies, règles Sigma", "Cybersecurity"],
  ["skill_incident_resp", "incident-response", "Réponse à Incident (PICERL)", "Confinement, éradication, collecte de preuves et leçons apprises", "Cybersecurity"],
  ["skill_forensics", "digital-forensics", "Criminalistique Numérique", "Chaîne de custody, analyse de mémoire volatile (RAM) et timeline de logs", "Cybersecurity"],
  ["skill_pentest", "ethical-hacking-pentest", "Pentesting & Audit Web", "Reconnaissance OSINT, scan Nmap, OWASP Top 10, exploitation éthique", "Cybersecurity"],
  ["skill_linux_admin", "linux-administration", "Administration Système Linux", "Arborescence FHS, permissions chmod/chown, gestion utilisateurs et systemd", "Systems"],
  ["skill_bash", "bash-scripting", "Bash & Automatisation Shell", "Scripts POSIX, boucles, conditions, gestion des flux I/O et cron jobs", "Systems"],
  ["skill_tcpip", "tcp-ip-networking", "Architecture Réseau & TCP/IP", "Modèle OSI, sous-réseaux CIDR, routage, DNS, DHCP, pare-feu nftables", "Networks"],
  ["skill_wireshark", "packet-analysis", "Analyse de Trames & Wireshark", "Capture de trafic, inspection de paquets TCP, analyse de protocoles", "Networks"],
  ["skill_docker", "docker-containers", "Conteneurisation Docker", "Dockerfile, images, layers, volumes, bridge networks, Docker Compose", "DevSecOps"],
  ["skill_cicd", "cicd-devsecops", "CI/CD & DevSecOps", "Pipelines GitHub Actions, SAST, DAST, analyse de dépendances Trivy", "DevSecOps"],
  ["skill_ats_cv", "ats-resume-craft", "Conception de CV ATS", "Structure normalisée, formule d'impact Google XYZ, norme Allemagne/UE", "Career"],
  ["skill_interview", "tech-interview-prep", "Préparation Entretiens Techniques", "Questions pièges Python/Linux, présentation de projets d'ingénierie", "Career"],
];
for (const s of skillsData) insertSkill.run(...s);

// ---------------------------------------------------------------------------
// 3. LES 4 GRANDES ACADÉMIES & PARCOURS (LEARNING PATHS)
// ---------------------------------------------------------------------------
const insertPath = db.prepare(`
  INSERT INTO learning_paths (id, slug, title, description, audience, difficulty, estimated_minutes, status, created_by, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
`);

insertPath.run(
  "path_python_mastery",
  "python-academy",
  "Programming Academy — Python du Fondamental au Professionnel",
  "Cursus complet en 7 niveaux : de la syntaxe de base à la programmation orientée objet, conception logicielle robuste, asynchronisme et automatisation de sécurité.",
  "both",
  "beginner",
  3600,
  "published",
  "user_founder_raylab"
);

insertPath.run(
  "path_cyber_defense",
  "cybersecurity-academy",
  "Cybersecurity Academy — Défense Blue Team, SOC & Forensics",
  "Formation opérationnelle axée sur la détection d'intrusions, l'analyse de logs en SOC, la réponse à incident, la criminalistique numérique et l'audit éthique.",
  "both",
  "intermediate",
  4200,
  "published",
  "user_founder_raylab"
);

insertPath.run(
  "path_sysnet_infra",
  "systems-networks-academy",
  "Systems & Networks — Linux Administration, TCP/IP & DevSecOps",
  "Maîtrisez le terminal Unix, les permissions, l'architecture réseau TCP/IP, le routage, la conteneurisation Docker et la sécurisation d'infrastructure.",
  "both",
  "intermediate",
  3400,
  "published",
  "user_founder_raylab"
);

insertPath.run(
  "path_career_hub",
  "career-launchpad",
  "Career Launchpad — CV ATS, Certifications Mondiales & Portfolio",
  "Optimisez votre profil technique pour le marché européen et allemand : CV compatible ATS, formule Google XYZ, préparation CompTIA Security+ et entretiens techniques.",
  "both",
  "beginner",
  1800,
  "published",
  "user_founder_raylab"
);

// ---------------------------------------------------------------------------
// 4. COURS EXHAUSTIFS (COURSES)
// ---------------------------------------------------------------------------
const insertCourse = db.prepare(`
  INSERT INTO courses (id, slug, title, summary, description, domain, difficulty, estimated_minutes, status, created_by, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
`);

// --- PROGRAMMING ACADEMY COURSES ---
insertCourse.run(
  "c_py_101",
  "python-fondamentaux-syntaxe",
  "Python Fondamentaux : Syntaxe & Logique de Programmation (Niv. 1 & 2)",
  "Maîtrisez les types fondamentaux, les conditions et les structures itératives.",
  "Découverte de l'environnement Python, manipulation des variables, typage dynamique, opérateurs arithmétiques/logiques, branchements conditionnels if/elif/else et boucles for/while.",
  "Programming",
  "beginner",
  600,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_py_ds",
  "python-structures-donnees-collections",
  "Structures de Données & Algorithmes en Python (Niv. 3)",
  "Exploitez la puissance des listes, dictionnaires, ensembles et compréhensions.",
  "Étude approfondie de la mutabilité, méthodes de chaînes, découpage (slicing), opérations ensemblistes, parcours de dictionnaires et compréhensions pour un code performant.",
  "Programming",
  "beginner",
  700,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_py_func",
  "python-fonctions-modularite",
  "Fonctions, Modularité & Portée LEGB (Niv. 4)",
  "Concevez des fonctions pures, des décorateurs et des modules réutilisables.",
  "Gestion des paramètres positionnels et nommés, *args et **kwargs, portée des variables (Local, Enclosing, Global, Built-in), fonctions lambdas, décorateurs et structuration de packages.",
  "Programming",
  "intermediate",
  600,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_py_io",
  "python-fichiers-donnees-exceptions",
  "Fichiers, Données Structurées & Gestion des Erreurs (Niv. 5)",
  "Traitez des fichiers CSV, JSON et gérez les exceptions de manière robuste.",
  "Utilisation des context managers with, lecture/écriture robuste de flux, manipulation de données avec json et csv, hiérarchie des exceptions Python et création d'exceptions métier.",
  "Programming",
  "intermediate",
  500,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_py_oop",
  "python-poo-design-patterns",
  "Programmation Orientée Objet & Principes SOLID (Niv. 6)",
  "Concevez des architectures modulaires basées sur les classes et l'héritage.",
  "Classes, encapsulation par propriétés, méthodes de classe et statiques, héritage simple/multiple, méthodes spéciales dunder (__repr__, __eq__), classes abstraites ABC et design patterns.",
  "Programming",
  "intermediate",
  800,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_py_pro",
  "python-professionnel-async-api",
  "Python Professionnel : Typage Mypy, Pytest & Asynchronisme (Niv. 7)",
  "Adoptez les pratiques des équipes d'ingénierie logicielle modernes.",
  "Typage statique avec mypy (PEP 484), écriture de tests unitaires automatisés avec pytest, programmation asynchrone avec asyncio, création d'API REST avec FastAPI et packaging moderne.",
  "Programming",
  "advanced",
  800,
  "published",
  "user_founder_raylab"
);

// --- CYBERSECURITY ACADEMY COURSES ---
insertCourse.run(
  "c_sec_fund",
  "fondamentaux-cybersecurite-triade-cia",
  "Fondamentaux de la Cybersécurité, Risques & Triade CIA",
  "Les concepts indispensables pour comprendre la sécurité de l'information.",
  "Analyse détaillée des piliers Confidentialité, Intégrité et Disponibilité. Modèles de menaces (STRIDE), cryptographie symétrique/asymétrique, fonctions de hachage SHA-256 et gouvernance.",
  "Cybersecurity",
  "beginner",
  700,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_sec_soc",
  "operations-soc-blue-team-detection",
  "Opérations de SOC (Blue Team) & Détection d'Intrusions",
  "Surveillez les environnements, analysez les journaux et contenez les attaques.",
  "Organisation d'un SOC (L1/L2/L3), centralisation des logs (Syslog, Windows EVTX), ingestion SIEM, détection d'anomalies, règles Sigma/YARA et cycle de réponse à incident (PICERL).",
  "Cybersecurity",
  "intermediate",
  900,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_sec_forensics",
  "criminalistique-numerique-digital-forensics",
  "Digital Forensics : Collecte de Preuves & Analyse Mémoire",
  "Enquêtez sur les compromissions sans altérer l'intégrité des données.",
  "Préservation de la preuve numérique, chaîne de conservation, analyse de la mémoire volatile (RAM dumps avec Volatility), inspection du système de fichiers et reconstruction chronologique.",
  "Cybersecurity",
  "intermediate",
  800,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_sec_pentest",
  "audit-securite-offensive-pentesting-ethique",
  "Sécurité Offensive Éthique & Pentesting Web (OWASP)",
  "Comprendre les méthodes des attaquants pour mieux sécuriser les systèmes.",
  "Méthodologie PTES, reconnaissance OSINT, scanning Nmap, étude des vulnérabilités de l'OWASP Top 10 (SQLi, XSS, CSRF, IDOR, SSRF), tests en lab isolé et rédaction de rapports d'audit.",
  "Cybersecurity",
  "intermediate",
  900,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_sec_auto",
  "automatisation-securite-python",
  "Automatisation de la Sécurité avec Python",
  "Développez vos propres outils d'audit, scanners et moniteurs d'intégrité.",
  "Création de scanners de ports TCP avec sockets, développement d'un File Integrity Monitor (FIM), analyseurs de journaux Nginx/Apache et alertes de sécurité automatisées.",
  "Cybersecurity",
  "intermediate",
  900,
  "published",
  "user_founder_raylab"
);

// --- SYSTEMS & NETWORKS COURSES ---
insertCourse.run(
  "c_sys_linux",
  "linux-administration-systeme-terminal",
  "Linux Administration : Système, Terminal & Permissions",
  "Le socle technique incontournable de tout ingénieur et analyste sécurité.",
  "Arborescence FHS, terminal Bash, permissions octales chmod/chown, utilisateurs, groupes, privilèges sudo, gestion des processus (ps, top, kill), services systemd et sécurisation SSH.",
  "Systems",
  "beginner",
  800,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_net_tcpip",
  "architecture-reseau-tcpip-protocoles",
  "Architecture Réseau : Modèle OSI, TCP/IP & Analyse de Trames",
  "Comprendre comment transitent les paquets de données à travers le monde.",
  "Étude des 7 couches du modèle OSI, adressage IPv4/IPv6, sous-réseaux et masques CIDR, protocoles DNS/DHCP, poignée de main TCP (SYN/ACK), ports, pare-feu nftables et capture Wireshark.",
  "Networks",
  "beginner",
  800,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_dev_docker",
  "docker-conteneurs-devsecops",
  "Conteneurs Docker, Cloud & Pratiques DevSecOps",
  "Déployez vos applications de manière isolée et reproductible.",
  "Principes de la conteneurisation, écriture de Dockerfile optimisés, multi-stage builds, réseaux et volumes Docker, orchestration avec Docker Compose et pipelines CI/CD sécurisés.",
  "DevSecOps",
  "intermediate",
  800,
  "published",
  "user_founder_raylab"
);

// --- CAREER COURSES ---
insertCourse.run(
  "c_car_branding",
  "personal-branding-linkedin-github",
  "Personal Branding Tech : GitHub Professionnel & LinkedIn",
  "Bâtissez une présence technique crédible auprès des recruteurs.",
  "Organisation de vos dépôts GitHub, rédaction de README soignés, mise en valeur de vos projets, optimisation du profil LinkedIn pour capter l'attention des chasseurs de têtes tech.",
  "Career",
  "beginner",
  500,
  "published",
  "user_founder_raylab"
);

insertCourse.run(
  "c_car_ats",
  "cv-technique-ats-marche-europeen-allemand",
  "CV Technique ATS & Standard International (France / Allemagne)",
  "Réussissez vos candidatures grâce à un CV lisible par les machines et les humains.",
  "Règles typographiques ATS, suppression des colonnes destructrices, application rigoureuse de la formule d'impact Google XYZ, adaptation au marché allemand (Lebenslauf) et simulation d'entretiens.",
  "Career",
  "beginner",
  500,
  "published",
  "user_founder_raylab"
);

// ---------------------------------------------------------------------------
// 5. ASSOCIATION COURS <-> PARCOURS (PATH_COURSES)
// ---------------------------------------------------------------------------
const insertPathCourse = db.prepare(`INSERT INTO path_courses (learning_path_id, course_id, position, is_required) VALUES (?, ?, ?, ?)`);

// Python Academy
insertPathCourse.run("path_python_mastery", "c_py_101", 1, 1);
insertPathCourse.run("path_python_mastery", "c_py_ds", 2, 1);
insertPathCourse.run("path_python_mastery", "c_py_func", 3, 1);
insertPathCourse.run("path_python_mastery", "c_py_io", 4, 1);
insertPathCourse.run("path_python_mastery", "c_py_oop", 5, 1);
insertPathCourse.run("path_python_mastery", "c_py_pro", 6, 1);

// Cybersecurity Academy
insertPathCourse.run("path_cyber_defense", "c_sec_fund", 1, 1);
insertPathCourse.run("path_cyber_defense", "c_sec_soc", 2, 1);
insertPathCourse.run("path_cyber_defense", "c_sec_forensics", 3, 1);
insertPathCourse.run("path_cyber_defense", "c_sec_pentest", 4, 1);
insertPathCourse.run("path_cyber_defense", "c_sec_auto", 5, 1);

// Systems & Networks
insertPathCourse.run("path_sysnet_infra", "c_sys_linux", 1, 1);
insertPathCourse.run("path_sysnet_infra", "c_net_tcpip", 2, 1);
insertPathCourse.run("path_sysnet_infra", "c_dev_docker", 3, 1);

// Career Launchpad
insertPathCourse.run("path_career_hub", "c_car_branding", 1, 1);
insertPathCourse.run("path_career_hub", "c_car_ats", 2, 1);

// ---------------------------------------------------------------------------
// 6. MODULES PÉDAGOGIQUES
// ---------------------------------------------------------------------------
const insertModule = db.prepare(`
  INSERT INTO modules (id, course_id, title, description, position, status)
  VALUES (?, ?, ?, ?, ?, ?)
`);

// Modules Python 101
insertModule.run("m_py1_1", "c_py_101", "Module 1 : L'Environnement Python & Syntaxe Fondamentale", "Installation, REPL, variables, constantes et typage dynamique", 1, "published");
insertModule.run("m_py1_2", "c_py_101", "Module 2 : Branchements Conditionnels & Logique Booléenne", "Instructions if/elif/else, expressions logiques et tables de vérité", 2, "published");
insertModule.run("m_py1_3", "c_py_101", "Module 3 : Boucles & Structures Itératives", "Boucles for, range, while, contrôle avec break/continue", 3, "published");

// Modules Python Structures de Données
insertModule.run("m_pyds_1", "c_py_ds", "Module 1 : Chaînes de Caractères & Encodage UTF-8", "Méthodes de manipulation de texte, slicing, formatage f-strings", 1, "published");
insertModule.run("m_pyds_2", "c_py_ds", "Module 2 : Listes & Tuples", "Indexation, mutabilité, copie superficielle vs profonde, tuple unpacking", 2, "published");
insertModule.run("m_pyds_3", "c_py_ds", "Module 3 : Dictionnaires, Ensembles & Compréhensions", "Tables de hachage, opérations ensemblistes, compréhensions de listes", 3, "published");

// Modules Python POO
insertModule.run("m_pyoop_1", "c_py_oop", "Module 1 : Définition des Classes & Encapsulation", "Constructeur __init__, attributs d'instance, convention _privée, @property", 1, "published");
insertModule.run("m_pyoop_2", "c_py_oop", "Module 2 : Héritage, Polymorphisme & Méthodes Spéciales", "Héritage simple, fonction super(), méthodes dunder __str__, __repr__, __eq__", 2, "published");
insertModule.run("m_pyoop_3", "c_py_oop", "Module 3 : Conception Robuste & Principes SOLID", "Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion", 3, "published");

// Modules Cybersécurité Fondamentaux
insertModule.run("m_sec_cia_1", "c_sec_fund", "Module 1 : La Triade CIA & Modélisation des Menaces", "Confidentialité, intégrité, disponibilité, matrice de risque STRIDE", 1, "published");
insertModule.run("m_sec_cia_2", "c_sec_fund", "Module 2 : Cryptographie Moderne & Hachage", "Chiffrement AES, asymétrique RSA/ECC, hachage SHA-256 et salage", 2, "published");

// Modules SOC & Blue Team
insertModule.run("m_soc_1", "c_sec_soc", "Module 1 : Architecture d'un SOC & Triage des Événements", "Rôles L1/L2/L3, gestion des logs Windows EVTX et Syslog Linux", 1, "published");
insertModule.run("m_soc_2", "c_sec_soc", "Module 2 : Détection d'Attaques & Cycle de Réponse PICERL", "Règles Sigma, identification de scans, confinement et remédiation", 2, "published");

// Modules Linux
insertModule.run("m_lin_1", "c_sys_linux", "Module 1 : Arborescence FHS & Commandes Essentielles", "Navigation dans le système de fichiers, flux de redirection et filtres grep/awk", 1, "published");
insertModule.run("m_lin_2", "c_sys_linux", "Module 2 : Permissions Unix & Gestion des Privilèges", "Notation rwx, masque octal chmod, attribution chown, suid et sudoers", 2, "published");
insertModule.run("m_lin_3", "c_sys_linux", "Module 3 : Processus, Services Systemd & Logs", "Supervision ps/top, contrôle des services systemctl et inspection journalctl", 3, "published");

// Modules Réseau
insertModule.run("m_net_1", "c_net_tcpip", "Module 1 : Les 7 Couches du Modèle OSI & Pile TCP/IP", "Encapsulation, comparaison OSI vs TCP/IP, rôles de chaque strate", 1, "published");
insertModule.run("m_net_2", "c_net_tcpip", "Module 2 : Adressage IP, Sous-Réseaux CIDR & Protocoles", "Calcul de masques de sous-réseau, DNS récursif, DHCP DORA, TCP vs UDP", 2, "published");

// Modules Carrière
insertModule.run("m_car_1", "c_car_ats", "Module 1 : L'Anatomie d'un CV Compatible ATS", "Règles typographiques, formatage linéaire et mots-clés techniques", 1, "published");
insertModule.run("m_car_2", "c_car_ats", "Module 2 : La Formule d'Impact Google XYZ & Marché Allemand", "Présentation chiffrée des projets, spécificités du Lebenslauf et entretiens", 2, "published");

// ---------------------------------------------------------------------------
// 7. LEÇONS DÉTAILLÉES AVEC CONTENU PÉDAGOGIQUE COMPLET
// ---------------------------------------------------------------------------
const insertLesson = db.prepare(`
  INSERT INTO lessons (id, module_id, slug, title, summary, content_md, lesson_type, position, estimated_minutes, status, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
`);

// Leçon 1 : Introduction Python
insertLesson.run(
  "les_py_intro",
  "m_py1_1",
  "introduction-a-python-philosophie",
  "L'Écosystème Python, Histoire & Premier Script",
  "Découvrez l'histoire de Python, sa philosophie Zen et écrivez votre premier script structuré.",
  `# L'Écosystème Python : Histoire & Fondations

Python est aujourd'hui le langage de programmation le plus utilisé au monde pour **l'ingénierie logicielle**, la **cybersécurité opérationnelle**, **l'administration système** et **l'intelligence artificielle**.

## 1. Origines & Histoire
Conçu à la fin des années 1980 par le développeur néerlandais **Guido van Rossum** au *Centrum Wiskunde & Informatica* (CWI) aux Pays-Bas, Python a été publié pour la première fois en **février 1991** (version 0.9.0).
Le nom du langage ne vient pas du reptile, mais de la troupe comique britannique **Monty Python**, dont Guido van Rossum admirait l'humour absurde dans *Monty Python's Flying Circus*.

## 2. La Philosophie du Zen de Python (PEP 20)
En tapant \`import this\` dans un terminal Python, vous affichez les principes directeurs du langage :
- **Beautiful is better than ugly.** (La clarté visuelle prime sur la complexité inutile)
- **Explicit is better than implicit.** (Tout comportement doit être transparent)
- **Simple is better than complex.**
- **Readability counts.** (Le code est lu beaucoup plus souvent qu'il n'est écrit)

## 3. Typage Dynamique & Annotations PEP 484
En Python, les variables n'ont pas besoin de déclaration explicite de type à l'allocation, mais le typage est **fort** (Python n'additionnera jamais un nombre et une chaîne sans conversion explicite) :

\`\`\`python
# Typage dynamique avec annotations professionnelles (PEP 484)
target_host: str = "192.168.1.50"
target_port: int = 443
is_encrypted: bool = True
average_latency_ms: float = 14.85

print(f"Audit de la cible {target_host}:{target_port} - TLS Actif : {is_encrypted}")
\`\`\`

> [!TIP]
> Respectez toujours la convention **PEP 8** : utilisez le \`snake_case\` pour les fonctions et variables (ex: \`scan_interval_seconds\`) et le \`PascalCase\` pour les classes.
`,
  "article",
  1,
  25,
  "published"
);

// Leçon 2 : Conditions & Logique
insertLesson.run(
  "les_py_conditions",
  "m_py1_2",
  "structures-conditionnelles-logique-booleenne",
  "Structures Conditionnelles & Opérateurs Logiques",
  "Prenez des décisions métier dans vos scripts d'audit avec if, elif, else et les tables de vérité.",
  `# Contrôle du Flux : Logique Booléenne & Conditions

Dans tout outil d'audit ou d'administration, votre script doit évaluer des conditions pour déclencher des actions appropriées.

## 1. Branchements Conditionnels (\`if / elif / else\`)

\`\`\`python
def inspect_firewall_rule(port: int, protocol: str) -> str:
    """Analyse la sévérité d'ouverture d'un port réseau."""
    if port == 22 and protocol.upper() == "TCP":
        return "Administration distante SSH (Nécessite authentification par clé)"
    elif port in (80, 8080) and protocol.upper() == "TCP":
        return "Trafic Web HTTP non chiffré - Risque d'interception"
    elif port == 443 and protocol.upper() == "TCP":
        return "Trafic Web HTTPS sécurisé (TLS 1.3 recommandé)"
    elif port == 53 and protocol.upper() == "UDP":
        return "Résolution de noms DNS"
    else:
        return f"Port inhabituel ({protocol}/{port}) - Examen recommandé"

# Test de la fonction
status = inspect_firewall_rule(80, "TCP")
print(f"[ALERTE] {status}")
\`\`\`

## 2. Opérateurs Booléens & Évaluation Court-Circuit
- \`and\` : Vrai uniquement si **tous** les opérandes sont vrais.
- \`or\` : Vrai dès qu'au moins **un** opérande est vrai.
- \`not\` : Inverse la valeur logique.

> [!IMPORTANT]
> Python évalue les expressions booléennes de gauche à droite en mode **court-circuit** (*short-circuit evaluation*) : dès que le résultat final est certain, le reste de l'expression n'est pas exécuté.
`,
  "interactive",
  1,
  20,
  "published"
);

// Leçon 3 : POO Python
insertLesson.run(
  "les_py_oop",
  "m_pyoop_1",
  "classes-encapsulation-attributs",
  "Programmation Orientée Objet : Classes & Encapsulation",
  "Structurez des architectures logicielles modulaires et maintenables grâce aux classes.",
  `# Programmation Orientée Objet (POO) en Python

La POO permet de regrouper des **données (attributs)** et les **traitements (méthodes)** qui leur sont appliqués au sein d'une même entité logique.

## 1. Déclaration d'une Classe & Constructeur \`__init__\`

\`\`\`python
class NetworkHost:
    """Représente une machine surveillée sur le réseau local."""
    
    # Attribut de classe partagé par toutes les instances
    DOMAIN_NAME: str = "internal.corp"

    def __init__(self, ip_address: str, hostname: str):
        # Attributs d'instance
        self.ip_address: str = ip_address
        self.hostname: str = hostname
        self._is_active: bool = True       # Protégé par convention (_)
        self.__secret_token: str = "none"  # Privé via Name Mangling (__)
        self.open_ports: list[int] = []

    def register_open_port(self, port: int) -> None:
        """Enregistre un port ouvert découvert lors d'un scan."""
        if port not in self.open_ports:
            self.open_ports.append(port)

    @property
    def full_fqdn(self) -> str:
        """Getter propriété exposant le nom de domaine complet."""
        return f"{self.hostname}.{self.DOMAIN_NAME}"

# Instanciation
serveur = NetworkHost("10.0.0.15", "web-prod-01")
serveur.register_open_port(443)
serveur.register_open_port(22)

print(f"Hôte : {serveur.full_fqdn} - Ports ouverts : {serveur.open_ports}")
\`\`\`

## 2. Propriétés (\`@property\`) pour l'Encapsulation
Le décorateur \`@property\` permet de transformer une méthode en attribut en lecture seule, tout en conservant la possibilité de valider les modifications via un setter dédié.
`,
  "article",
  1,
  35,
  "published"
);

// Leçon 4 : Cybersécurité Triade CIA
insertLesson.run(
  "les_sec_cia",
  "m_sec_cia_1",
  "triade-cia-securite-information",
  "La Triade C-I-A : Confidentialité, Intégrité & Disponibilité",
  "Maîtrisez le modèle fondamental qui structure l'ensemble des politiques et contrôles de sécurité.",
  `# La Triade C-I-A : Les Trois Piliers de la Sécurité

Chaque mesure de cybersécurité (pare-feu, chiffrement, gestion des accès, plan de sauvegarde) a pour vocation de protéger un ou plusieurs piliers de la triade **CIA** :

\`\`\`text
                  [ CONFIDENTIALITÉ ]
                   /               \\
                  /                 \\
                 /     SÉCURITÉ      \\
                /     DE L'INFO       \\
               /                       \\
    [ INTÉGRITÉ ] ------------------- [ DISPONIBILITÉ ]
\`\`\`

## 1. Confidentialité (Confidentiality)
- **Définition :** Seules les personnes ou systèmes dûment autorisés doivent pouvoir accéder aux données.
- **Menaces courantes :** Écoute passive sur le réseau (sniffing), fuite d'identifiants, exfiltration de bases de données, failles d'accès IDOR.
- **Contre-mesures :** Chiffrement des flux (TLS 1.3), chiffrement des données au repos (AES-256), contrôle d'accès strict (RBAC), principe du moindre privilège.

## 2. Intégrité (Integrity)
- **Définition :** Les données ne doivent pouvoir être modifiées, corrompues ou supprimées que par des opérations légitimes et vérifiables.
- **Menaces courantes :** Altération frauduleuse de transactions, falsification de logs, injection SQL de modification, modification de binaires système par un rootkit.
- **Contre-mesures :** Fonctions de hachage cryptographique (SHA-256, SHA-3), signatures numériques (Ed25519), contrôles d'intégrité de fichiers (FIM).

## 3. Disponibilité (Availability)
- **Définition :** Les ressources et services doivent être accessibles aux utilisateurs légitimes au moment où ils en ont besoin.
- **Menaces courantes :** Attaques par déni de service distribué (DDoS), pannes matérielles, ransomwares bloquants, incendie de datacenter.
- **Contre-mesures :** Haute disponibilité (clustering), réplication de bases de données, plans de reprise d'activité (PRA), protection anti-DDoS.
`,
  "article",
  1,
  30,
  "published"
);

// Leçon 5 : SOC Blue Team
insertLesson.run(
  "les_sec_soc",
  "m_soc_1",
  "architecture-soc-analyse-logs",
  "Architecture SOC & Triage d'Alertes de Sécurité",
  "Découvrez le fonctionnement d'un centre opérationnel de sécurité et l'investigation sur les journaux d'événements.",
  `# Opérations de SOC (Security Operations Center)

Le **SOC** est le centre névralgique de la défense informatique d'une organisation. Il assure une surveillance continue des réseaux, postes de travail et serveurs pour détecter et neutraliser les menaces.

## 1. Les Niveaux d'Analyse en SOC
- **Analyste L1 (Triage & Qualification) :** Réceptionne les alertes générées par le SIEM/EDR, filtre les faux positifs, valide les anomalies et applique les premiers playbooks d'endiguement.
- **Analyste L2 (Investigation & Réponse) :** Approfondit les incidents avérés, effectue l'analyse forensique des machines compromises et rédige les rapports d'incident.
- **Analyste L3 / Threat Hunter :** Recherche proactivement des menaces furtives non détectées par les règles statiques, rétro-ingénierie de malwares, création de règles de détection (Sigma, YARA).

## 2. Les Sources de Télémétrie Clés
1. **Journaux Windows (EVTX) :**
   - Event ID \`4624\` : Connexion réussie.
   - Event ID \`4625\` : Échec de connexion (indicateur de brute force).
   - Event ID \`4688\` : Création d'un nouveau processus (crucial pour repérer l'exécution de \`powershell.exe\` ou \`cmd.exe\` suspect).
2. **Journaux Linux (Syslog & Auth) :**
   - \`/var/log/auth.log\` (ou \`/var/log/secure\`) : Tentatives de connexion SSH et commandes \`sudo\`.
3. **Journaux de serveurs web :**
   - Accès Nginx/Apache au format Common Log Format (CLF).
`,
  "article",
  1,
  35,
  "published"
);

// Leçon 6 : Linux Permissions
insertLesson.run(
  "les_lin_perm",
  "m_lin_2",
  "droits-permissions-chmod-chown",
  "Modèle de Permissions Unix & Sécurisation Fichiers",
  "Maîtrisez la notation octale, les drapeaux chmod, chown et les droits spéciaux SUID.",
  `# Permissions Unix : Le Modèle de Sécurité Fondamental

Sous Linux, chaque fichier et répertoire est protégé par un système de droits attribué à trois entités :
1. **Propriétaire (User - \`u\`)**
2. **Groupe propriétaire (Group - \`g\`)**
3. **Tous les autres utilisateurs (Others - \`o\`)**

## 1. La Décomposition des Droits (\`rwx\`)

| Droit | Symbole | Valeur Binaire | Valeur Octale | Effet sur un Fichier | Effet sur un Dossier |
|---|---|---|---|---|---|
| Lecture | \`r\` | 100 | **4** | Lire le contenu | Lister les fichiers (\`ls\`) |
| Écriture | \`w\` | 010 | **2** | Modifier/enregistrer | Créer/supprimer des fichiers |
| Exécution | \`x\` | 001 | **1** | Lancer comme binaire | Traverser le dossier (\`cd\`) |

## 2. Calcul du Masque Octal
Chaque triplet est la somme arithmétique de ses permissions :
- \`rwx\` = 4 + 2 + 1 = **7**
- \`r-x\` = 4 + 0 + 1 = **5**
- \`r--\` = 4 + 0 + 0 = **4**
- \`---\` = 0 + 0 + 0 = **0**

\`\`\`bash
# Exemple concret de sécurisation d'un script d'audit
chmod 750 /usr/local/bin/audit_scanner.sh
chown root:security /usr/local/bin/audit_scanner.sh

# Vérification
ls -la /usr/local/bin/audit_scanner.sh
# Affiche : -rwxr-x--- 1 root security 4096 Nov 4 20:00 audit_scanner.sh
\`\`\`
`,
  "interactive",
  1,
  30,
  "published"
);

// Leçon 7 : Réseaux & Modèle OSI
insertLesson.run(
  "les_net_osi",
  "m_net_1",
  "modele-osi-pile-tcp-ip",
  "Le Modèle OSI & la Poignée de Main TCP (Three-Way Handshake)",
  "Comprenez comment les paquets transitent sur Internet et comment fonctionne la négociation TCP.",
  `# Architecture Réseau : Du Modèle OSI à TCP/IP

Le modèle **OSI (Open Systems Interconnection)** décompose la communication réseau en 7 couches logiques :

1. **Couche 7 (Application) :** Protocoles applicatifs (\`HTTP\`, \`HTTPS\`, \`SSH\`, \`DNS\`, \`SMTP\`).
2. **Couche 6 (Présentation) :** Encodage et chiffrement (\`TLS\`, \`ASCII\`, \`JPEG\`).
3. **Couche 5 (Session) :** Gestion de la session de communication.
4. **Couche 4 (Transport) :** Transport de bout en bout (\`TCP\` fiable et orienté connexion, \`UDP\` sans état).
5. **Couche 3 (Réseau) :** Routage logique et adressage mondial (\`IPv4\`, \`IPv6\`, \`ICMP\`).
6. **Couche 2 (Liaison de données) :** Adressage physique matériel (\`Adresses MAC\`, trames Ethernet, VLANs).
7. **Couche 1 (Physique) :** Transmission des signaux électriques, optiques ou radio.

## La Poignée de Main TCP (Three-Way Handshake)
Avant d'échanger des données en TCP, le client et le serveur synchronisent leurs numéros de séquence :

\`\`\`text
   CLIENT                                      SERVEUR
     |                                            |
     | ---------- 1. SYN [Seq = x] -------------> |
     |                                            |
     | <--- 2. SYN-ACK [Seq = y, Ack = x + 1] --- |
     |                                            |
     | ---------- 3. ACK [Ack = y + 1] ---------> |
     |                                            |
[ CONNEXION ÉTABLIE - ÉCHANGE DE DONNÉES ]
\`\`\`
`,
  "article",
  1,
  30,
  "published"
);

// Leçon 8 : CV ATS & Marché Allemand
insertLesson.run(
  "les_car_ats",
  "m_car_1",
  "redaction-cv-ats-marche-allemand",
  "Concevoir un CV Technique ATS pour le Marché Européen",
  "Structurez votre candidature selon les exigences des recruteurs en France, Allemagne et à l'international.",
  `# Guide Professionnel : Le CV Technique Optimisé ATS

Un **ATS (Applicant Tracking System)** est un logiciel utilisé par plus de 90% des grandes entreprises et cabinets de recrutement pour filtrer automatiquement les candidatures avant l'examen par un recruteur humain.

## 1. Les Pièges qui Éliminent un CV
- **Colonnes multiples ou tableaux graphiques :** La plupart des moteurs ATS lisent le document de manière strictement séquentielle de gauche à droite. Les colonnes côte à côte mélangent les dates et les descriptions.
- **Barres de compétences avec pourcentages ou étoiles :** Les robots ne comprennent pas ce que signifie *"Python 85%"*. Privilégiez des catégories textuelles : *Avancé*, *Opérationnel*, *Notions*.
- **Titres de sections créatifs :** Utilisez les intitulés standards : *Expérience Professionnelle*, *Projets Techniques*, *Compétences*, *Formation*, *Certifications*.

## 2. La Formule Google XYZ pour vos Projets
Pour chaque réalisation sur votre CV :
> **« J'ai accompli [X], mesuré par [Y], en mettant en œuvre [Z]. »**

### Exemple Concret :
- ❌ *« Création d'un outil de scan en Python. »*
- ✅ *« Conception d'un scanner de ports réseau asynchrone en Python (sockets non-bloquants), réduisant le temps d'audit d'un sous-réseau /24 de 65% avec génération de rapports CSV structurés. »*
`,
  "article",
  1,
  25,
  "published"
);

// ---------------------------------------------------------------------------
// 8. EXERCICES ASSOCIÉS
// ---------------------------------------------------------------------------
const insertEx = db.prepare(`
  INSERT INTO exercises (id, lesson_id, title, instructions_md, exercise_type, difficulty, starter_code, solution_explanation_md, is_autograded, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertEx.run(
  "ex_py_port_filter",
  "les_py_conditions",
  "Filtrage de Ports Sécurisés",
  "Écrivez une fonction `is_secure_port(port: int) -> bool` qui renvoie `True` pour les ports chiffrés standards (`443` HTTPS et `22` SSH) et `False` pour tous les autres ports.",
  "coding",
  "beginner",
  `def is_secure_port(port: int) -> bool:
    # Complétez la fonction
    pass
`,
  "La condition la plus concise et élégante est : `return port in (443, 22)` ou l'instruction conditionnelle classique.",
  1,
  "published"
);

insertEx.run(
  "ex_lin_chmod_calc",
  "les_lin_perm",
  "Calcul de Masque Octal",
  "Déterminez la valeur octale exacte à appliquer pour attribuer : Propriétaire (Lecture + Écriture + Exécution), Groupe (Lecture + Exécution), Autres (Aucun accès).",
  "multiple_choice",
  "beginner",
  null,
  "Propriétaire : 4+2+1 = 7. Groupe : 4+0+1 = 5. Autres : 0. La commande est : chmod 750 mon_fichier.",
  1,
  "published"
);

// ---------------------------------------------------------------------------
// 9. ÉVALUATIONS PAR QUIZ & QUESTIONS
// ---------------------------------------------------------------------------
const insertQuiz = db.prepare(`
  INSERT INTO quizzes (id, lesson_id, course_id, title, description, passing_score, status)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

insertQuiz.run(
  "quiz_cyber_basics",
  "les_sec_cia",
  "c_sec_fund",
  "Évaluation Fondations de la Sécurité & Triade CIA",
  "Validez votre compréhension des trois piliers fondamentaux et des mécanismes de défense.",
  75,
  "published"
);

const insertQuizQuestion = db.prepare(`
  INSERT INTO quiz_questions (id, quiz_id, question_type, prompt_md, explanation_md, options_json, answer_key_json, points, position)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertQuizQuestion.run(
  "q1",
  "quiz_cyber_basics",
  "single_choice",
  "Une attaque par ransomware qui chiffre les bases de données critiques d'une entreprise sans les exfiltrer viole en premier lieu quel pilier ?",
  "Le chiffrement malveillant empêche l'accès légitime aux données métier : c'est une atteinte directe et critique à la **Disponibilité**.",
  JSON.stringify([
    { id: "a", text: "La Confidentialité" },
    { id: "b", text: "La Disponibilité" },
    { id: "c", text: "La Non-répudiation" },
    { id: "d", text: "L'Authenticité" }
  ]),
  JSON.stringify({ correct: "b" }),
  1,
  1
);

insertQuizQuestion.run(
  "q2",
  "quiz_cyber_basics",
  "single_choice",
  "Quel mécanisme cryptographique permet de vérifier qu'un fichier téléchargé n'a pas été corrompu ni altéré pendant le transit ?",
  "L'empreinte cryptographique (hash SHA-256) garantit formellement l'intégrité binaire du fichier reçu.",
  JSON.stringify([
    { id: "a", text: "Le protocole DHCP" },
    { id: "b", text: "Le chiffrement symétrique AES-256" },
    { id: "c", text: "Une fonction de hachage cryptographique (ex: SHA-256)" },
    { id: "d", text: "L'authentification multifacteur (MFA)" }
  ]),
  JSON.stringify({ correct: "c" }),
  1,
  2
);

// ---------------------------------------------------------------------------
// 10. CATALOGUE COMPLET DES PROJETS PRATIQUES (PROJECTS & LABS)
// ---------------------------------------------------------------------------
const insertProj = db.prepare(`
  INSERT INTO projects (id, slug, title, summary, description_md, domain, difficulty, prerequisites_md, requirements_md, safety_notes_md, estimated_minutes, status, created_by)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertProj.run(
  "p_pwd_checker",
  "password-strength-checker",
  "Password Strength & Shannon Entropy Analyzer",
  "Concevez un outil d'analyse de robustesse de mot de passe en Python avec calcul rigoureux de l'entropie de Shannon.",
  `# Password Strength & Entropy Analyzer

## 1. Contexte du Projet
Les cyberattaques par dictionnaire et pulvérisation de mots de passe (*password spraying*) exploitent les secrets prévisibles. Ce projet vous apprend à évaluer mathématiquement la résistance d'un mot de passe face à la force brute sans jamais enregistrer de données en clair.

## 2. Spécifications Techniques
1. **Calcul de l'Entropie de Shannon :**
   $$E = L \\times \\log_2(R)$$
   où $L$ est la longueur de la chaîne et $R$ la taille du jeu de caractères mobilisé.
2. **Détection des motifs faibles :**
   - Répétitions consécutives (\`aaa\`, \`111\`).
   - Suites logiques (\`123456\`, \`qwerty\`, \`azerty\`).
   - Mots de passe les plus répandus (vérification par rapport à une liste de hashes ou de mots fréquents).
3. **Restitution des résultats :**
   - Score normalisé de 0 à 100.
   - Estimation du temps nécessaire pour casser le mot de passe sur un cluster de GPU moderne (10 milliards de hachages/seconde).
   - Conseils de remédiation explicites.
`,
  "Cybersecurity",
  "beginner",
  "Python fondamentaux (chaînes de caractères, module math, dictionnaires).",
  "- Code Python 3.10+ propre et typé\n- Tests unitaires avec pytest\n- Respect strict de la PEP 8",
  "Ne saisissez et ne stockez jamais de véritables secrets de production dans vos environnements de test.",
  180,
  "published",
  "user_founder_raylab"
);

insertProj.run(
  "p_log_analyzer",
  "python-log-analyzer",
  "Python Security Log Analyzer (SOC Parser)",
  "Analysez des fichiers de logs de serveurs web Nginx/Apache pour détecter automatiquement des attaques et injections.",
  `# Security Log Analyzer

## 1. Contexte du Projet
En centre opérationnel de sécurité (SOC), l'automatisation de l'analyse des journaux d'accès est essentielle pour identifier les activités suspectes parmi des millions d'entrées quotidiennes.

## 2. Fonctionnalités Requises
1. **Parser de logs robuste :**
   - Lecture de journaux au format Common Log Format (CLF) ou JSON.
   - Extraction des adresses IP, horodatages, méthodes HTTP, codes de retour et User-Agents.
2. **Détection d'anomalies de sécurité :**
   - Détection de scans de vulnérabilités (tentatives d'accès à \`/.env\`, \`/wp-login.php\`, \`/etc/passwd\`).
   - Détection de signatures d'injections SQL (\`UNION SELECT\`, \`OR 1=1\`) et XSS (\`<script>\`).
   - Détection d'attaques par force brute (plus de 30 requêtes 401/403 en moins d'une minute par une même IP).
3. **Génération de Rapports :**
   - Synthèse en console avec statistiques.
   - Export au format CSV structuré pour intégration dans un SIEM.
`,
  "Cybersecurity",
  "intermediate",
  "Python (module re pour les regex, collections, datetime, gestion des fichiers).",
  "- Traitement performant des fichiers volumineux ligne par ligne sans saturation mémoire\n- Gestion des exceptions sur les lignes malformées",
  "Exécuter uniquement sur des fichiers de logs autorisés ou de simulation.",
  300,
  "published",
  "user_founder_raylab"
);

insertProj.run(
  "p_fim_tool",
  "file-integrity-monitor",
  "File Integrity Monitor (FIM) avec Signatures SHA-256",
  "Développez un agent autonome de détection des altérations de fichiers critiques sur systèmes Linux.",
  `# File Integrity Monitor (FIM)

## 1. Contexte du Projet
Un outil indispensable en défense Blue Team : surveiller l'intégrité des répertoires système sensibles (comme \`/etc\`, \`/bin\`, scripts de démarrage) et déclencher des alertes immédiates dès qu'une modification imprévue est opérée par un attaquant ou un logiciel malveillant.

## 2. Spécifications & Architecture
1. **Mode Création de Baseline :**
   - Parcours récursif d'un répertoire cible.
   - Calcul de l'empreinte cryptographique SHA-256 de chaque fichier.
   - Stockage horodaté dans une base SQLite locale ou un fichier JSON sécurisé.
2. **Mode Surveillance & Audit :**
   - Comparaison périodique de l'état actuel des fichiers avec la baseline.
   - Détection des trois types d'anomalies :
     - **Fichier Modifié :** Hash différent.
     - **Fichier Ajouté :** Nouveau fichier non présent dans la baseline.
     - **Fichier Supprimé :** Fichier présent dans la baseline mais absent du disque.
3. **Journalisation :**
   - Horodatage UTC précis de chaque événement dans un journal dédié.
`,
  "Cybersecurity",
  "intermediate",
  "Python (hashlib, pathlib, os, sqlite3 ou json).",
  "- Gestion des fichiers temporaires et des liens symboliques\n- Traitement des fichiers volumineux par blocs de 64 Ko pour ne pas saturer la RAM",
  "Attention aux faux positifs lors de la surveillance de répertoires contenant des journaux en écriture constante.",
  360,
  "published",
  "user_founder_raylab"
);

insertProj.run(
  "p_net_scanner",
  "lab-network-scanner-sockets",
  "Lab Network Port Scanner & Banner Grabber",
  "Construisez un scanner de ports TCP non-bloquant en Python avec récupération des bannières de services.",
  `# Lab Network Port Scanner & Banner Grabber

## 1. Contexte du Projet
Comprendre les mécanismes sous-jacents aux outils comme Nmap en programmant soi-même les sockets réseau à bas niveau.

## 2. Fonctionnalités
- Scan de plages de ports spécifiées sur un hôte cible.
- Gestion stricte des timeouts pour ne pas bloquer l'exécution.
- Récupération de la bannière du service réseau (Banner Grabbing sur ports HTTP, SSH, FTP).
- Détection des services standards d'après la base IANA.
`,
  "Networks",
  "intermediate",
  "Python (socket, concurrent.futures ou asyncio, sys).",
  "- Code asynchrone ou multi-threadé pour scanner 100 ports en moins de 3 secondes\n- Gestion propre des fermetures de sockets",
  "Strictement limité aux adresses de bouclage local (127.0.0.1) ou aux machines de laboratoire autorisées.",
  240,
  "published",
  "user_founder_raylab"
);

insertProj.run(
  "p_lin_auditor",
  "linux-security-hardener-auditor",
  "Linux Security Hardener & Compliance Auditor",
  "Concevez un script Bash d'audit automatisé de la configuration de sécurité d'un serveur Linux.",
  `# Linux Security Hardener & Auditor

## 1. Contexte du Projet
Dans le cadre du durcissement système (Hardening), ce script inspecte automatiquement la conformité d'un serveur Linux par rapport aux recommandations CIS (Center for Internet Security).

## 2. Vérifications Réalisées
- Recherche des fichiers avec bits SUID/SGID non sécurisés.
- Audit de la configuration SSH (/etc/ssh/sshd_config : PermitRootLogin, PasswordAuthentication).
- Vérification de l'état du pare-feu (ufw ou iptables).
- Détection des comptes sans mot de passe ou avec UID 0 non-root.
- Rapport synthétique au format texte et sortie horodatée.
`,
  "Systems",
  "advanced",
  "Bash, commandes système Unix, expressions régulières.",
  "- Script exécutable sans dépendance externe sur Debian/Ubuntu et RHEL\n- Mode lecture seule sans altération involontaire",
  "Exécuter avec les privilèges appropriés sur un système de test.",
  300,
  "published",
  "user_founder_raylab"
);

// ---------------------------------------------------------------------------
// 11. ROADMAPS MÉTIERS & CARRIÈRE EXHAUSTIVES (CAREER PATHS)
// ---------------------------------------------------------------------------
const insertCareer = db.prepare(`
  INSERT INTO career_paths (id, slug, title, description_md, status)
  VALUES (?, ?, ?, ?, 'published')
`);

insertCareer.run(
  "career_soc",
  "junior-soc-analyst",
  "Junior SOC Analyst (Analyste Détection & Réponse L1/L2)",
  `# Métier : Junior SOC Analyst (Centre Opérationnel de Sécurité)

L'analyste SOC est le premier rempart opérationnel d'une organisation contre les cyberattaques. En poste au sein du centre de supervision, il surveille les alertes en temps réel, qualifie les anomalies et participe au confinement des menaces.

### 🎯 Missions Principales au Quotidien
- **Triage & Traitement des Alertes :** Analyser les alertes remontées par le SIEM (Wazuh, Splunk, Microsoft Sentinel) et l'EDR (CrowdStrike, Defender for Endpoint).
- **Analyse des Journaux :** Examiner les logs Windows (EVTX), Linux (Syslog), pare-feu et proxy pour reconstituer la chaîne d'attaque.
- **Confinement Précoce :** Isoler un poste de travail compromis du réseau d'entreprise pour stopper la propagation latérale.
- **Rédaction de Bilans d'Incident :** Documenter chronologiquement l'attaque et préconiser des mesures correctives.

### 🛠️ Compétences Techniques Requises
- Solides bases en réseaux TCP/IP (ports, modèle OSI, Wireshark).
- Maîtrise des commandes système Linux et des journaux d'événements Windows.
- Connaissance du framework **MITRE ATT&CK** et des indicateurs de compromission (IoC).
- Notions de scripting en Python ou Bash pour automatiser le traitement des logs.

### 💰 Grille Salariale Indicative
- **France :** 38 000 € à 46 000 € brut / an (Junior).
- **Allemagne :** 48 000 € à 62 000 € brut / an (Junior).
- **Suisse :** 85 000 CHF à 105 000 CHF brut / an.

### 🎓 Certifications Recommandées
- CompTIA Security+ (SY0-701)
- Blue Team Level 1 (BTL1)
- Microsoft Certified: Security Operations Analyst (SC-200)
`
);

insertCareer.run(
  "career_py_dev",
  "python-developer-automation",
  "Python Developer & Automation Engineer",
  `# Métier : Développeur Python & Ingénieur Automatisation

Conçoit des applications fiables, des microservices modulaires, des connecteurs d'API et des scripts d'infrastructure pour automatiser les processus techniques et fluidifier les pipelines de données.

### 🎯 Missions Principales au Quotidien
- **Architecture & Développement :** Développer des outils logiciels propres et testés selon les principes SOLID et la PEP 8.
- **Création d'API REST :** Développer des microservices rapides et documentés avec FastAPI ou Flask.
- **Automatisation & Intégration :** Concevoir des scripts d'extraction, transformation et chargement (ETL) et des connecteurs système.
- **Qualité & Tests :** Mettre en œuvre des tests unitaires automatisés avec pytest et le typage statique avec mypy.

### 🛠️ Compétences Techniques Requises
- Maîtrise approfondie de Python (POO, générateurs, context managers, async/await).
- Pratique rigoureuse de Git et des workflows GitHub.
- Bases solides en bases de données relationnelles (SQL, SQLite, PostgreSQL).
- Notions de conteneurisation Docker et de CI/CD.

### 💰 Grille Salariale Indicative
- **France :** 40 000 € à 50 000 € brut / an (Junior/Confirmé).
- **Allemagne :** 52 000 € à 68 000 € brut / an.
- **Suisse :** 90 000 CHF à 115 000 CHF brut / an.
`
);

insertCareer.run(
  "career_forensics",
  "digital-forensics-analyst",
  "Digital Forensics Analyst (Criminalistique Numérique)",
  `# Métier : Digital Forensics Analyst (Enquêteur Numérique)

Intervient suite à un incident majeur ou dans un cadre judiciaire pour extraire, préserver et analyser les traces numériques laissées par les attaquants.

### 🎯 Missions Principales
- **Acquisition Légale :** Réaliser des images binaires conformes (Bit-Stream) des disques et de la mémoire vive sans altération.
- **Reconstitution Chronologique :** Reconstruire la timeline des événements pour comprendre le vecteur initial d'intrusion.
- **Reverse Malware Débutant :** Analyser les artefacts, scripts malveillants et clés de registre modifiées.
- **Rapports d'Expertise :** Rédiger des conclusions opposables sur le plan légal et technique.

### 🎓 Certifications Recommandées
- GIAC Certified Forensic Analyst (GCFA)
- Certified Computer Examiner (CCE)
- CHFI (Computer Hacking Forensic Investigator)
`
);

insertCareer.run(
  "career_pentest",
  "penetration-tester-ethical-hacker",
  "Penetration Tester / Auditeur Sécurité Offensive",
  `# Métier : Penetration Tester (Auditeur Éthique)

Mandaté par des entreprises pour tester la robustesse de leurs défenses en simulant les techniques d'attaquants réels, dans un cadre légal strictement défini.

### 🎯 Missions Principales
- **Audits d'Applications Web :** Recherche de failles selon le référentiel OWASP Top 10.
- **Audits d'Infrastructures :** Identification des services vulnérables, défauts de segmentation réseau et mauvaises configurations Active Directory.
- **Rédaction de Rapports de Vulnérabilités :** Expliquer l'impact métier des vulnérabilités découvertes et guider les développeurs vers la remédiation.

### 🎓 Certifications Recommandées
- eLearnSecurity Junior Penetration Tester (eJPT)
- Offensive Security Certified Professional (OSCP)
- CompTIA PenTest+
`
);

insertCareer.run(
  "career_linux_admin",
  "linux-cloud-systems-engineer",
  "Administrateur Systèmes Linux & Cloud",
  `# Métier : Ingénieur Systèmes Linux & Cloud

Garantit la disponibilité, la sécurité, la performance et l'évolutivité des serveurs et infrastructures hébergeant les services stratégiques de l'entreprise.

### 🎯 Missions Principales
- Installation, durcissement et maintenance de serveurs Linux (Debian, Ubuntu, RedHat).
- Gestion des accès, permissions, tunnels VPN et règles de pare-feu.
- Automatisation des tâches système avec Bash, Ansible et conteneurs Docker.
- Supervision des performances système, de la mémoire et des disques.

### 🎓 Certifications Recommandées
- Linux Professional Institute LPIC-1 & LPIC-2
- Red Hat Certified System Administrator (RHCSA)
- AWS Certified SysOps Administrator
`
);

// ---------------------------------------------------------------------------
// 12. CATALOGUE DE CERTIFICATIONS OFFICIELLES MONDIALES
// ---------------------------------------------------------------------------
const insertCert = db.prepare(`
  INSERT INTO certifications (id, slug, name, provider, domain, level, prerequisites_md, official_url, price_description, exam_description, last_verified_at, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), 'published')
`);

insertCert.run(
  "cert_sec_plus",
  "comptia-security-plus",
  "CompTIA Security+ (SY0-701)",
  "CompTIA",
  "Cybersecurity",
  "Fondamental / Intermédiaire",
  "Compétences réseau de base recommandées (Network+ ou équivalent).",
  "https://www.comptia.org/certifications/security",
  "~392 $ USD",
  "90 questions maximum (QCM et questions de performance pratiques PBQs). Durée : 90 min. Score de passage : 750/900."
);

insertCert.run(
  "cert_ccna",
  "cisco-ccna",
  "Cisco Certified Network Associate (CCNA 200-301)",
  "Cisco",
  "Networks",
  "Intermédiaire",
  "Aucun prérequis officiel. Maîtrise des protocoles IP, switching et routage requise.",
  "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
  "~300 $ USD",
  "120 minutes, 100 questions environ axées sur le routage, le switching, l'adressage IP et la sécurité réseau."
);

insertCert.run(
  "cert_lpic1",
  "lpic-1-linux-admin",
  "Linux Professional Institute LPIC-1 (Examens 101 & 102)",
  "LPI",
  "Systems",
  "Intermédiaire",
  "Pratique régulière du terminal Linux et de l'administration système.",
  "https://www.lpi.org/our-certifications/lpic-1-overview/",
  "~200 $ USD par examen (Exam 101 + Exam 102)",
  "Deux examens écrits de 90 minutes comportant chacun 60 questions à choix multiples et à trous."
);

insertCert.run(
  "cert_btl1",
  "blue-team-level-1",
  "Blue Team Level 1 (BTL1)",
  "Security Blue Team",
  "Cybersecurity",
  "Intermédiaire Pratique",
  "Fondamentaux des réseaux, analyse de logs et architecture Windows/Linux.",
  "https://securityblue.team/courses/blue-team-level-1/",
  "~399 £ GBP (inclut formation + 2 passages d'examen)",
  "Examen 100% pratique de 24 heures en laboratoire : investigation sur un incident réel, analyse de logs, malware et rapport d'incident."
);

insertCert.run(
  "cert_ejpt",
  "elearnsecurity-junior-penetration-tester",
  "eLearnSecurity Junior Penetration Tester (eJPTv2)",
  "INE Security",
  "Cybersecurity",
  "Intermédiaire Pratique",
  "Bases solides en réseaux, commandes Linux et principes d'évaluation web.",
  "https://ine.com/certifications/ejpt-certification",
  "~249 $ USD",
  "Examen pratique de 48 heures dans un environnement de test isolé simulant une infrastructure d'entreprise réelle."
);

insertCert.run(
  "cert_aws_cloud",
  "aws-certified-cloud-practitioner",
  "AWS Certified Cloud Practitioner (CLF-C02)",
  "Amazon Web Services",
  "Cloud",
  "Débutant",
  "Connaissances générales en informatique et services Internet.",
  "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  "~100 $ USD",
  "65 questions à choix multiples. Durée : 90 minutes. Validation des fondamentaux du cloud, de la sécurité et de la tarification."
);

// ---------------------------------------------------------------------------
// 13. OBJECTIFS PERSONNELS (PERSONAL MODE RAYLAB)
// ---------------------------------------------------------------------------
const insertGoal = db.prepare(`
  INSERT INTO user_goals (id, user_id, title, description, goal_type, target_date, status, is_private)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

insertGoal.run(
  "goal_1",
  "user_founder_raylab",
  "Valider la certification officielle CompTIA Security+ (SY0-701)",
  "Révision des 5 domaines officiels, exercices de laboratoire SOC et passage de l'examen surveillé Pearson VUE.",
  "certification",
  "2026-12-15",
  "active",
  1
);

insertGoal.run(
  "goal_2",
  "user_founder_raylab",
  "Finaliser et publier le projet File Integrity Monitor (FIM) sur GitHub",
  "Ajout du mode surveillance en temps réel avec calcul d'empreintes SHA-256 et documentation conforme à la formule Google XYZ.",
  "project",
  "2026-11-20",
  "active",
  1
);

insertGoal.run(
  "goal_3",
  "user_founder_raylab",
  "Optimiser le CV ATS pour les opportunités techniques en France et Allemagne",
  "Mise en conformité avec les critères du Lebenslauf allemand et vérification du score de compatibilité ATS à 95%+.",
  "career",
  "2026-11-30",
  "active",
  1
);

// ---------------------------------------------------------------------------
// 14. BADGES D'ACCOMPLISSEMENT (ACHIEVEMENTS)
// ---------------------------------------------------------------------------
const insertAch = db.prepare(`
  INSERT INTO achievements (id, code, title, description, icon_key, criteria_description)
  VALUES (?, ?, ?, ?, ?, ?)
`);

insertAch.run("ach_1", "FIRST_STEP", "Premier Pas", "Terminez votre première leçon théorique sur RayLab", "Rocket", "Compléter 1 leçon");
insertAch.run("ach_2", "CODE_INITIATE", "Initié du Code", "Validez avec succès un exercice de programmation Python", "Terminal", "Valider un exercice de code");
insertAch.run("ach_3", "SHIELD_BEARER", "Porteur de Bouclier", "Obtenez un score parfait au quiz Fondamentaux de la Cybersécurité", "ShieldCheck", "100% sur un quiz de sécurité");
insertAch.run("ach_4", "BUILDER", "Bâtisseur Confirmé", "Enregistrez votre premier projet documenté dans votre portfolio", "Layers", "1 projet soumis sur GitHub");
insertAch.run("ach_5", "STREAK_7", "Régularité d'Acier", "Étudiez 7 jours consécutifs sans interruption", "Flame", "7 jours de streak d'apprentissage");

const insertUserAch = db.prepare(`INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)`);
insertUserAch.run("user_founder_raylab", "ach_1");
insertUserAch.run("user_founder_raylab", "ach_2");

// Inscription du compte fondateur aux parcours
const insertEnroll = db.prepare(`
  INSERT INTO path_enrollments (id, user_id, learning_path_id, enrollment_type, status)
  VALUES (?, ?, ?, ?, ?)
`);
insertEnroll.run("enr_1", "user_founder_raylab", "path_python_mastery", "personal", "active");
insertEnroll.run("enr_2", "user_founder_raylab", "path_cyber_defense", "personal", "active");
insertEnroll.run("enr_3", "user_founder_raylab", "path_sysnet_infra", "personal", "active");

console.log("🎉 Seed RayLab exhaustif complété avec succès !");
