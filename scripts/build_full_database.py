# -*- coding: utf-8 -*-
"""
Script Maître de Génération et de Remplissage Exhaustif de la Base de Données RayLab.
Alimente SQLite (et Turso) avec l'ensemble des 12 Volumes CyberPath, le Manuel Complet de Python,
les chapitres de Python Hacking Éthique, les 7 Projets Capstone, les Certifications et les Carrières.
"""

import sqlite3
import os
import sys
import json
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from scripts.seed_data.meta_data import MODULES_DATA, CERTIFICATIONS_DATA, CAREER_PATHS_DATA
from scripts.seed_data.projects_data import PROJECTS_DATA
from scripts.seed_data.lessons_vol1_to_3 import LESSONS_VOL1_TO_3
from scripts.seed_data.lessons_vol4_to_6 import LESSONS_VOL4_TO_6
from scripts.seed_data.lessons_vol7_to_9 import LESSONS_VOL7_TO_9
from scripts.seed_data.lessons_vol10_to_12 import LESSONS_VOL10_TO_12

DB_PATH = BASE_DIR / "raylab.sqlite"
SCHEMA_PATH = BASE_DIR / "src" / "db" / "schema.sql"

print(f"🛠️  Lancement du bâtisseur de base de données RayLab...")
print(f"    Fichier SQLite : {DB_PATH}")

if DB_PATH.exists():
    try:
        os.remove(DB_PATH)
        print("    Ancienne base locale purgée.")
    except Exception as e:
        print(f"    Avertissement purge : {e}")

conn = sqlite3.connect(str(DB_PATH))
conn.execute("PRAGMA foreign_keys = ON;")
cursor = conn.cursor()

# 1. Exécution du schéma SQL
with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
    schema_sql = f.read()

cursor.executescript(schema_sql)
print("✅ Schéma SQL exécuté (33 tables créées).")

# 2. Utilisateurs & Rôles
users = [
    ("user_founder_raylab", "auth_founder_001", "founder@raylab.tech", "Fondateur RayLab", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", "fr", "Europe/Paris"),
    ("user_alex_learner", "auth_alex_002", "alexandre@example.com", "Alexandre Dubois", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", "fr", "Europe/Berlin"),
]
cursor.executemany("""
  INSERT INTO users (id, auth_subject, email, display_name, avatar_url, preferred_language, timezone)
  VALUES (?, ?, ?, ?, ?, ?, ?)
""", users)

user_roles = [
    ("user_founder_raylab", "role_super_admin"),
    ("user_founder_raylab", "role_editor"),
    ("user_founder_raylab", "role_learner"),
    ("user_alex_learner", "role_learner"),
]
cursor.executemany("INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)", user_roles)

# 3. Parcours (Learning Paths)
paths = [
    ("path_cyberpath_master", "cyberpath-2026-2027", "CyberPath 2026-2027 — Spécialiste Cybersécurité Opérationnelle", "Le cursus intégrateur d'excellence réunissant les 12 volumes techniques et les 7 projets capstones selon la méthode 70% pratique / 30% théorie. Des fondations matérielles et Linux au pentest offensif, à la détection SOC, au cloud sécurisé et au capstone final.", "both", "beginner", 12000, "published", "user_founder_raylab"),
    ("path_python_mastery", "python-academy", "Académie Python — Des Fondamentaux à la Sécurité (Niveaux 1 à 6)", "Les 6 niveaux de formation moderne en Python : syntaxe et algorithmes, programmation structurée, POO avancée, architecture logicielle, scripts système et automatisation offensive/défensive.", "both", "beginner", 4800, "published", "user_founder_raylab"),
    ("path_sysnet_infra", "systems-networks-academy", "Académie Linux & Systèmes — Administration, Bash & Durcissement", "Maîtrise fondamentale et opérationnelle des environnements Unix/Linux : arborescence, hiérarchie de permissions, processus, services systemd, scripts Bash et durcissement défensif.", "both", "beginner", 3600, "published", "user_founder_raylab"),
    ("path_reseaux_academy", "reseaux-academy", "Académie Réseaux — Modèles OSI, TCP/IP & Analyse de Trames", "Architecture des réseaux d'entreprise, protocoles fondamentaux (DNS, DHCP, HTTP/S, TLS), routage, segmentation VLAN et analyse de trafic avec Wireshark et Scapy.", "both", "intermediate", 3600, "published", "user_founder_raylab"),
    ("path_cyber_defense", "cybersecurity-academy", "Académie Cybersécurité Défensive — Blue Team, SOC & SIEM", "Surveillance continue d'infrastructures, ingestion de journaux (Syslog, Nginx, Windows EVTX), corrélation SIEM, matrice MITRE ATT&CK, détection des menaces et investigation d'incidents SOC.", "both", "intermediate", 4200, "published", "user_founder_raylab"),
    ("path_ethical_hacking", "ethical-hacking-python", "Académie Pentesting & Sécurité Offensive Encadrée", "Méthodologie d'audit de sécurité éthique, reconnaissance autorisée, analyse de vulnérabilités Web OWASP Top 10, exploitation contrôlée en laboratoire et rédaction de rapports professionnels.", "both", "intermediate", 4500, "published", "user_founder_raylab"),
    ("path_forensics_academy", "forensics-dfir-academy", "Académie Forensique Numérique — DFIR & Chronologie d'Investigation", "Criminalistique informatique et réponse à incident : préservation de la chaîne de preuves, empreintes cryptographiques, extraction d'artefacts disques/mémoire et chronologie d'attaque.", "both", "advanced", 3000, "published", "user_founder_raylab"),
    ("path_devsecops_academy", "cloud-devsecops-academy", "Académie Cloud & DevSecOps — Conteneurs, Secrets & CI/CD Sécurisé", "Sécurisation du cycle de vie logiciel : conteneurisation Docker, infrastructure as code, gestion robuste des secrets d'infrastructure, analyse statique de vulnérabilités et pipelines CI/CD résilients.", "both", "intermediate", 3000, "published", "user_founder_raylab"),
    ("path_ia_academy", "ia-appliquee-academy", "Académie Intelligence Artificielle Appliquée (Évolution Future)", "Exploration appliquée de l'intelligence artificielle pour la sécurité : scripts de traitement automatisé, analyse assistée de volumétries de logs et analyse des risques inhérents aux LLM.", "both", "advanced", 2400, "published", "user_founder_raylab"),
    ("path_career_hub", "career-launchpad", "Career Launchpad & Certifications — Du Laboratoire au Recrutement", "Préparation professionnelle concrète : CV au format ATS bilingue (France/Allemagne), méthodologie d'entretien technique et feuille de route des certifications mondiales.", "both", "beginner", 2400, "published", "user_founder_raylab"),
]
cursor.executemany("""
  INSERT INTO learning_paths (id, slug, title, description, audience, difficulty, estimated_minutes, status, created_by, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
""", paths)

# 4. Cours (Courses - Les 12 Volumes)
courses = [
    ("c_vol1_foundations", "cyberpath-volume-1-fondations", "Volume 1 : Fondations Informatiques & Laboratoire Isolé", "Architecture matérielle, systèmes d'exploitation, éthique déontologique et construction de votre premier laboratoire sous VirtualBox.", "Ce premier volume pose les fondations indispensables à tout futur professionnel de la sécurité. Vous découvrirez le fonctionnement interne d'un ordinateur (CPU, registres, mémoire RAM, bus système), l'architecture des systèmes d'exploitation modernes (noyau Linux vs Windows NT), ainsi que les principes déontologiques et juridiques stricts encadrant la pratique du test d'intrusion. Vous finaliserez la construction d'un laboratoire de virtualisation étanche et sécurisé.", "Cybersecurity", "beginner", 480, "published", "user_founder_raylab"),
    ("c_vol2_linux_bash", "cyberpath-volume-2-linux-bash", "Volume 2 : Linux, Terminal & Bash Scripting Avancé", "Maîtrise du shell Bash, pipelines UNIX, gestion des processus, permissions octales et écriture de scripts d'administration système automatisés.", "Linux est l'épine dorsale des infrastructures serveurs mondiales et des distributions d'audit telles que Kali Linux. Ce volume vous transforme en opérateur à l'aise sur le terminal sans interface graphique : manipulation avancée de fichiers, filtres grep/sed/awk, gestion des démons systemd, analyse des droits POSIX, permissions spéciales SUID/SGID/Sticky Bit et développement d'un script complet d'audit système (Projet 01).", "Systems", "beginner", 600, "published", "user_founder_raylab"),
    ("c_vol3_python_core", "cyberpath-volume-3-manuel-python", "Volume 3 : Manuel Complet de Python — Syntaxe Moderne, POO & Algorithmes", "Le socle complet de programmation logicielle : typage moderne PEP 484, programmation orientée objet, dunder methods et modularité robuste.", "Inspiré directement du Manuel Complet de Python, ce volume couvre la programmation en profondeur : typage statique moderne, structures de données fondamentales (listes, tuples, dictionnaires, ensembles), gestion rigoureuse des exceptions, constructeurs __init__, encapsulation, décorateurs @property, programmation fonctionnelle et structuration de paquets professionnels pour l'ingénierie logicielle et la sécurité.", "Programming", "beginner", 720, "published", "user_founder_raylab"),
    ("c_vol4_networking", "cyberpath-volume-4-reseaux-tcpip", "Volume 4 : Réseaux Informatiques, Modèles OSI, TCP/IP & Routage", "Compréhension mécanique des flux réseaux : 7 couches OSI, 4 couches TCP/IP, encapsulation des trames, adressage IPv4/IPv6 et routage CIDR.", "Sans compréhension intime des réseaux, il est impossible de comprendre la cybersécurité. Ce cours détaille chaque couche : trames Ethernet (Couche 2), paquets IPv4/IPv6 et en-têtes IP (Couche 3), segments TCP et datagrammes UDP (Couche 4), handshake à 3 voies (SYN, SYN-ACK, ACK), tables de routage, passerelles par défaut, protocoles ARP et DHCP, et translation d'adresses NAT.", "Networks", "intermediate", 600, "published", "user_founder_raylab"),
    ("c_vol5_net_analysis", "cyberpath-volume-5-analyse-wireshark-scapy", "Volume 5 : Analyse Réseau, Wireshark, tcpdump & Crafting Scapy", "Capture de trafic réseau, dissection de paquets avec Wireshark, filtres BPF et forge artisanale de trames réseau avec Scapy.", "Apprenez à voir ce qui circule sur les câbles et dans les airs. Vous maîtriserez la capture avec tcpdump, la dissection fine avec Wireshark, la création de filtres d'affichage et de capture, ainsi que la programmation réseau offensive et défensive en Python avec la bibliothèque Scapy pour forger des requêtes ICMP ping sweep et comprendre le fonctionnement des attaques Man-in-the-Middle (MITM).", "Networks", "intermediate", 660, "published", "user_founder_raylab"),
    ("c_vol6_web_sql", "cyberpath-volume-6-web-http-sql", "Volume 6 : Web, Architecture HTTP & Bases de Données SQL", "Architecture client-serveur, en-têtes et verbes HTTP/HTTPS, sessions, cookies, modélisation relationnelle et requêtes SQL d'audit.", "Le Web représente plus de 80% de la surface d'attaque applicative moderne. Ce volume explore la mécanique du protocole HTTP/1.1 et HTTP/2 : structure des requêtes et réponses, codes d'état (2xx, 3xx, 4xx, 5xx), en-têtes critiques de sécurité (CSP, HSTS, X-Frame-Options), gestion de session et de cookies (Secure, HttpOnly, SameSite), ainsi que la conception de bases de données relationnelles SQL et l'anatomie des injections SQL.", "Web", "intermediate", 540, "published", "user_founder_raylab"),
    ("c_vol7_web_security", "cyberpath-volume-7-owasp-authentification", "Volume 7 : Web Security, OWASP Top 10 & Authentification Robuste", "Étude et exploitation en laboratoire du Top 10 OWASP : Injections SQL, XSS, CSRF, IDOR, et conception d'architectures d'authentification sécurisées.", "Plongez dans le référentiel mondial de la sécurité web. Chaque vulnérabilité du Top 10 OWASP est étudiée avec sa cause première au niveau du code, sa méthode d'exploitation éthique et son correctif défensif définitif. Vous construirez ensuite une architecture d'authentification complète intégrant le hachage sécurisé salé PBKDF2/Argon2, la gestion de jetons JWT sécurisés et des protections anti-bruteforce (Projet 03).", "Cybersecurity", "intermediate", 720, "published", "user_founder_raylab"),
    ("c_vol8_pentest_tools", "cyberpath-volume-8-outils-pentest-ctf", "Volume 8 : Outils du Pentester (Nmap, Burp Suite) & Hacking Éthique CTF", "Reconnaissance OSINT, cartographie de surface avec Nmap, interception proxy avec Burp Suite Pro et méthodologie de résolution de challenges CTF.", "Ce volume aborde l'outillage professionnel utilisé lors des audits d'intrusion réels. Vous découvrirez comment cartographier un réseau avec Nmap (options -sS, -sV, -sC, -p-), intercepter et modifier des requêtes avec Burp Suite (Repeater, Intruder, Decoder), énumérer des répertoires cachés avec Gobuster et adopter la méthodologie méthodique nécessaire pour triompher des challenges Boot2Root (CTF) et élever ses privilèges sous Linux.", "Cybersecurity", "intermediate", 660, "published", "user_founder_raylab"),
    ("c_vol9_python_rat", "cyberpath-volume-9-rat-sockets-malware", "Volume 9 : Hacking Éthique Python : Sockets, Trojan RAT, Reverse Shell & MITM", "Architecture client-serveur de reverse shells en sockets purs, exfiltration de fichiers par blocs délimités, keylogger et persistance système.", "Basé sur les chapitres 5 à 9 de l'ouvrage Python Hacking Éthique. Vous étudierez en profondeur la mécanique des sockets Python AF_INET et SOCK_STREAM, la gestion d'un shell distant bidirectionnel via subprocess, l'exfiltration de fichiers par paquets de 2048 octets avec délimiteur de trame, le développement d'un keylogger éducatif avec pynput, le packaging en binaire autonome via PyInstaller et l'analyse des techniques de persistance dans le registre Windows et d'exclusion Defender.", "Cybersecurity", "advanced", 780, "published", "user_founder_raylab"),
    ("c_vol10_crypto_cloud", "cyberpath-volume-10-crypto-cloud-security", "Volume 10 : Cryptographie Appliquée, TLS & Sécurité Cloud", "Chiffrement symétrique AES-256-GCM, asymétrique RSA-4096, dérivation PBKDF2, certificat X.509 et sécurité des backends Cloud modernes.", "Comprenez la cryptographie moderne sans tomber dans les pièges de conception. Ce cours vous guide à travers les algorithmes symétriques de flux et de bloc, le chiffrement authentifié AES-GCM, les clés asymétriques RSA et courbes elliptiques (ECC), le fonctionnement détaillé de TLS 1.3, ainsi que l'évaluation des risques et la configuration des politiques de sécurité (RLS) sur Firebase et Supabase (Projet 04).", "Cybersecurity", "intermediate", 600, "published", "user_founder_raylab"),
    ("c_vol11_blue_soc", "cyberpath-volume-11-secure-dev-blue-team-soc", "Volume 11 : Secure Software Development, Blue Team, SOC & SIEM", "Cycle DevSecOps, intégration continue sécurisée, analyse de flux de logs, corrélation d'événements de sécurité et réponse à incident PICERL.", "La défense en profondeur au sein des entreprises modernes. Ce volume vous initie au Secure SDLC, aux outils d'analyse statique SAST et de composition logicielle SCA, à la surveillance des infrastructures via les SIEM, à la rédaction de règles de détection d'intrusions Sigma et à la gestion d'un incident de sécurité selon la norme NIST SP 800-61 (Projet 05 & 06).", "Cybersecurity", "intermediate", 720, "published", "user_founder_raylab"),
    ("c_vol12_forensics_cap", "cyberpath-volume-12-forensics-rapport-capstone", "Volume 12 : Digital Forensics, Pentest Professionnel & Capstone Project", "Enquête forensique après compromission, analyse de mémoire RAM, rédaction d'un rapport de pentest de niveau exécutif et projet Capstone final.", "Le volume de consécration de votre cursus. Vous apprendrez à préserver des preuves numériques selon les normes de la chaîne de custody (RFC 3227), extraire des artéfacts de mémoire volatile avec Volatility, reconstituer la timeline d'une intrusion et rédiger un rapport d'audit exécutif avec cotation de sévérité CVSS 3.1. Vous conclurez votre parcours avec le Capstone Final CyberPath 2026-2027.", "Cybersecurity", "advanced", 840, "published", "user_founder_raylab")
]

for c in courses:
    cursor.execute("""
      INSERT INTO courses (id, slug, title, summary, description, domain, difficulty, estimated_minutes, status, created_by, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    """, c)

# 5. Liaisons Parcours <-> Cours
path_courses_entries = []
for i, c in enumerate(courses):
    path_courses_entries.append(("path_cyberpath_master", c[0], i + 1, 1))

path_courses_entries.extend([
    # 1. Académie Python
    ("path_python_mastery", "c_vol3_python_core", 1, 1),
    ("path_python_mastery", "c_vol9_python_rat", 2, 1),
    # 2. Académie Linux & Systèmes
    ("path_sysnet_infra", "c_vol1_foundations", 1, 1),
    ("path_sysnet_infra", "c_vol2_linux_bash", 2, 1),
    # 3. Académie Réseaux
    ("path_reseaux_academy", "c_vol4_networking", 1, 1),
    ("path_reseaux_academy", "c_vol5_net_analysis", 2, 1),
    # 4. Académie Blue Team & SOC
    ("path_cyber_defense", "c_vol1_foundations", 1, 1),
    ("path_cyber_defense", "c_vol11_blue_soc", 2, 1),
    # 5. Académie Pentesting & Sécurité Offensive
    ("path_ethical_hacking", "c_vol6_web_sql", 1, 1),
    ("path_ethical_hacking", "c_vol7_web_security", 2, 1),
    ("path_ethical_hacking", "c_vol8_pentest_tools", 3, 1),
    # 6. Académie Forensique DFIR
    ("path_forensics_academy", "c_vol5_net_analysis", 1, 1),
    ("path_forensics_academy", "c_vol12_forensics_cap", 2, 1),
    # 7. Académie Cloud & DevSecOps
    ("path_devsecops_academy", "c_vol2_linux_bash", 1, 1),
    ("path_devsecops_academy", "c_vol10_crypto_cloud", 2, 1),
    # 8. Académie IA Appliquée
    ("path_ia_academy", "c_vol3_python_core", 1, 1),
    # 9. Career Hub
    ("path_career_hub", "c_vol1_foundations", 1, 1),
    ("path_career_hub", "c_vol8_pentest_tools", 2, 1),
    ("path_career_hub", "c_vol12_forensics_cap", 3, 1),
])

cursor.executemany("INSERT INTO path_courses (learning_path_id, course_id, position, is_required) VALUES (?, ?, ?, ?)", path_courses_entries)

# 6. Insertion des Modules
modules_entries = [
    (m["id"], m["course_id"], m["title"], m["description"], m["position"], "published")
    for m in MODULES_DATA
]
cursor.executemany("INSERT INTO modules (id, course_id, title, description, position, status) VALUES (?, ?, ?, ?, ?, ?)", modules_entries)

# 7. Insertion de TOUTES les Leçons Exhaustives
all_lessons = (
    LESSONS_VOL1_TO_3 +
    LESSONS_VOL4_TO_6 +
    LESSONS_VOL7_TO_9 +
    LESSONS_VOL10_TO_12
)

lesson_rows = []
exercise_rows = []
quiz_rows = []
quiz_question_rows = []

for l in all_lessons:
    lesson_rows.append((
        l["id"],
        l["module_id"],
        l["slug"],
        l["title"],
        l["summary"],
        l["content_md"],
        l["lesson_type"],
        l["position"],
        l["estimated_minutes"],
        "published"
    ))
    
    # Exercice
    ex = l.get("exercise")
    if ex:
        ex_id = f"ex_{l['id']}"
        exercise_rows.append((
            ex_id,
            l["id"],
            ex["title"],
            ex["description_md"],
            "coding",
            ex.get("difficulty", "intermediate"),
            ex["starter_code"],
            f"```python\n{ex['solution_code']}\n```",
            1,
            "published"
        ))
        
    # Quiz
    q = l.get("quiz")
    if q:
        quiz_id = f"quiz_{l['id']}"
        quiz_rows.append((
            quiz_id,
            l["id"],
            q["title"],
            q.get("passing_score", 100),
            "published"
        ))
        for q_idx, quest in enumerate(q.get("questions", [])):
            quest_id = f"qq_{l['id']}_{q_idx + 1}"
            quiz_question_rows.append((
                quest_id,
                quiz_id,
                "multiple_choice",
                quest["prompt_md"],
                quest["explanation_md"],
                quest["options_json"],
                quest.get("points", 10),
                q_idx + 1
            ))

cursor.executemany("""
  INSERT INTO lessons (id, module_id, slug, title, summary, content_md, lesson_type, position, estimated_minutes, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", lesson_rows)

cursor.executemany("""
  INSERT INTO exercises (id, lesson_id, title, instructions_md, exercise_type, difficulty, starter_code, solution_explanation_md, is_autograded, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", exercise_rows)

cursor.executemany("""
  INSERT INTO quizzes (id, lesson_id, title, passing_score, status)
  VALUES (?, ?, ?, ?, ?)
""", quiz_rows)

cursor.executemany("""
  INSERT INTO quiz_questions (id, quiz_id, question_type, prompt_md, explanation_md, options_json, points, position)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
""", quiz_question_rows)

print(f"✅ {len(lesson_rows)} leçons exhaustives insérées avec {len(exercise_rows)} exercices et {len(quiz_question_rows)} questions de quiz.")

# 8. Insertion des 7 Projets Capstone
project_rows = [
    (
        p["id"],
        p["slug"],
        p["title"],
        p["summary"],
        p["description_md"],
        p["domain"],
        p["difficulty"],
        p["prerequisites_md"],
        p["requirements_md"],
        p["safety_notes_md"],
        p["estimated_minutes"],
        p["status"],
        "user_founder_raylab"
    )
    for p in PROJECTS_DATA
]
cursor.executemany("""
  INSERT INTO projects (id, slug, title, summary, description_md, domain, difficulty, prerequisites_md, requirements_md, safety_notes_md, estimated_minutes, status, created_by)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", project_rows)
print(f"✅ {len(project_rows)} Projets Capstone insérés.")

# 9. Insertion des Certifications Officielles
cert_rows = [
    (
        c["id"],
        c["slug"],
        c["name"],
        c["provider"],
        c["domain"],
        c["level"],
        c["prerequisites_md"],
        c["official_url"],
        c["price_description"],
        c["exam_description"],
        "published"
    )
    for c in CERTIFICATIONS_DATA
]
cursor.executemany("""
  INSERT INTO certifications (id, slug, name, provider, domain, level, prerequisites_md, official_url, price_description, exam_description, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", cert_rows)
print(f"✅ {len(cert_rows)} Certifications officielles insérées.")

# 10. Insertion des Parcours Carrière (Career Paths)
career_rows = [
    (
        cp["id"],
        cp["slug"],
        cp["title"],
        cp["description_md"],
        "published"
    )
    for cp in CAREER_PATHS_DATA
]
cursor.executemany("""
  INSERT INTO career_paths (id, slug, title, description_md, status)
  VALUES (?, ?, ?, ?, ?)
""", career_rows)
print(f"✅ {len(career_rows)} Métiers & Roadmaps Carrière insérés.")

# 11. Inscriptions & Progression
enrollments = [
    ("enr_alex_cp", "user_alex_learner", "path_cyberpath_master", "public", "active", "2026-10-01 09:00:00"),
    ("enr_alex_py", "user_alex_learner", "path_python_mastery", "public", "active", "2026-10-05 14:00:00"),
    ("enr_founder_cp", "user_founder_raylab", "path_cyberpath_master", "personal", "active", "2026-09-01 08:00:00"),
]
cursor.executemany("""
  INSERT INTO path_enrollments (id, user_id, learning_path_id, enrollment_type, status, started_at)
  VALUES (?, ?, ?, ?, ?, ?)
""", enrollments)

# Progression pour Alexandre
progress_rows = [
    ("user_alex_learner", "les_cp_vol1_ch1", "completed", 100, "2026-10-02 10:00:00", "2026-10-02 10:30:00", "2026-10-02 10:30:00"),
    ("user_alex_learner", "les_cp_vol1_ch2", "completed", 100, "2026-10-03 10:50:00", "2026-10-03 11:15:00", "2026-10-03 11:15:00"),
    ("user_alex_learner", "les_cp_vol1_ch3", "completed", 100, "2026-10-04 14:20:00", "2026-10-04 15:00:00", "2026-10-04 15:00:00"),
    ("user_alex_learner", "les_cp_vol2_ch6", "in_progress", 60, "2026-10-06 18:00:00", None, "2026-10-06 18:20:00"),
    ("user_founder_raylab", "les_cp_vol1_ch1", "completed", 100, "2026-09-02 08:30:00", "2026-09-02 09:00:00", "2026-09-02 09:00:00"),
]
cursor.executemany("""
  INSERT INTO lesson_progress (user_id, lesson_id, status, progress_percent, started_at, completed_at, last_viewed_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
""", progress_rows)

# Objectifs utilisateur (Goals)
goals = [
    ("goal_alex_secplus", "user_alex_learner", "Obtenir la certification CompTIA Security+ (SY0-701)", "Valider les 12 volumes CyberPath et réussir 10 examens blancs sur la plateforme.", "certification", "2026-12-15", "active"),
    ("goal_alex_oscp", "user_alex_learner", "Préparer l'examen pratique OSCP PEN-200", "Résoudre au moins 30 machines sur des plateformes CTF et maîtriser les Reverse Shells Python.", "certification", "2027-04-30", "active"),
]
cursor.executemany("""
  INSERT INTO user_goals (id, user_id, title, description, goal_type, target_date, status)
  VALUES (?, ?, ?, ?, ?, ?, ?)
""", goals)

# Badges & Succès (Achievements)
achievements = [
    ("ach_first_blood", "first_blood", "Premier Pas de Sécurité", "Terminez votre première leçon sur la Triade CIA", "Shield", "Terminer la leçon 1 du Volume 1"),
    ("ach_bash_master", "bash_master", "Maître du Terminal Linux", "Complétez le script d'audit système du Projet 01", "Terminal", "Valider le Projet 01"),
    ("ach_scapy_forger", "scapy_forger", "Artisan des Trames Réseau", "Concevez et injectez votre premier paquet Scapy", "Network", "Réussir l'exercice Scapy du Volume 5"),
    ("ach_capstone_hero", "capstone_hero", "Diplômé CyberPath 2026-2027", "Validez avec succès le Capstone Final et son rapport d'audit", "Award", "Terminer le Capstone du Volume 12"),
]
cursor.executemany("""
  INSERT INTO achievements (id, code, title, description, icon_key, criteria_description)
  VALUES (?, ?, ?, ?, ?, ?)
""", achievements)

user_achievements = [
    ("user_alex_learner", "ach_first_blood", "2026-10-02 10:30:00"),
    ("user_founder_raylab", "ach_first_blood", "2026-09-02 09:00:00"),
    ("user_founder_raylab", "ach_bash_master", "2026-09-10 14:00:00"),
    ("user_founder_raylab", "ach_scapy_forger", "2026-09-20 16:30:00"),
    ("user_founder_raylab", "ach_capstone_hero", "2026-10-01 18:00:00"),
]
cursor.executemany("""
  INSERT INTO user_achievements (user_id, achievement_id, earned_at)
  VALUES (?, ?, ?)
""", user_achievements)

conn.commit()
conn.close()

print("🎉 Base de données RayLab SQLite générée et peuplée avec succès !")
