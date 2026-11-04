import sys
import re

db_builder_path = r"C:\Users\raysn\.gemini\antigravity\scratch\rayan-lab\scripts\build_full_database.py"

with open(db_builder_path, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern for paths
old_paths_pattern = re.compile(r"paths = \[.*?\]\s*cursor\.executemany", re.S)

new_paths_replacement = """paths = [
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
cursor.executemany"""

content = old_paths_pattern.sub(new_paths_replacement, content, count=1)

# Pattern for path_courses_entries.extend([ ... ])
old_courses_pattern = re.compile(r"path_courses_entries\.extend\(\[.*?\]\)", re.S)

new_courses_replacement = """path_courses_entries.extend([
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
])"""

content = old_courses_pattern.sub(new_courses_replacement, content, count=1)

with open(db_builder_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated build_full_database.py successfully!")
