# -*- coding: utf-8 -*-
"""
Métadonnées globales : Découpage des Modules pour les 12 Volumes, Certifications Officielles et Carrières.
"""

MODULES_DATA = [
    # Vol 1
    {"id": "m_vol1_1", "course_id": "c_vol1_foundations", "title": "Module 1 : Découvrir la Cybersécurité, Éthique & Légalité", "description": "Triade CIA, aspects juridiques (Art. 323-1), déontologie et gestion des risques.", "position": 1},
    {"id": "m_vol1_2", "course_id": "c_vol1_foundations", "title": "Module 2 : Fondamentaux Matériels, OS & Laboratoire Isolé", "description": "Architecture processeur, mémoire, hyperviseurs et configuration VirtualBox.", "position": 2},
    
    # Vol 2
    {"id": "m_vol2_1", "course_id": "c_vol2_linux_bash", "title": "Module 1 : Maîtrise du Terminal Linux & Gestion Système", "description": "Navigation, filtres grep/sed/awk, gestion de processus et permissions octales.", "position": 1},
    {"id": "m_vol2_2", "course_id": "c_vol2_linux_bash", "title": "Module 2 : Scripting Bash & Automatisation d'Audit", "description": "Variables, conditions, boucles et développement du script d'audit du Projet 01.", "position": 2},

    # Vol 3
    {"id": "m_vol3_1", "course_id": "c_vol3_python_core", "title": "Module 1 : Syntaxe Moderne, Typage PEP 484 & Collections", "description": "Typage statique, match/case, deque, Counter et structures de données.", "position": 1},
    {"id": "m_vol3_2", "course_id": "c_vol3_python_core", "title": "Module 2 : POO Avancée, Dunder Methods & Architecture", "description": "Encapsulation, property, constructeurs, gestionnaires de contexte et SOLID.", "position": 2},

    # Vol 4
    {"id": "m_vol4_1", "course_id": "c_vol4_networking", "title": "Module 1 : Architecture Réseau & Protocoles Fondamentaux", "description": "Modèles OSI (7 couches) et TCP/IP, encapsulation et adressage MAC/IP.", "position": 1},
    {"id": "m_vol4_2", "course_id": "c_vol4_networking", "title": "Module 2 : Le Protocole TCP, Handshake & Routage IP", "description": "Poignée de main à 3 voies (SYN/ACK), drapeaux TCP, CIDR et NAT.", "position": 2},

    # Vol 5
    {"id": "m_vol5_1", "course_id": "c_vol5_net_analysis", "title": "Module 1 : Capture de Trafic & Dissection Scapy", "description": "Wireshark, filtres BPF, tcpdump et forge de paquets en Python avec Scapy.", "position": 1},
    {"id": "m_vol5_2", "course_id": "c_vol5_net_analysis", "title": "Module 2 : Attaques Man-in-the-Middle & Sécurité ARP", "description": "ARP Cache Poisoning, forward IP, interception et défenses Dynamic ARP Inspection.", "position": 2},

    # Vol 6
    {"id": "m_vol6_1", "course_id": "c_vol6_web_sql", "title": "Module 1 : Architecture Web, Protocole HTTP & Sessions", "description": "Requêtes, réponses, verbes HTTP, codes d'état, en-têtes et cookies de session.", "position": 1},
    {"id": "m_vol6_2", "course_id": "c_vol6_web_sql", "title": "Module 2 : Bases de Données SQL & Injections (SQLi)", "description": "Modélisation relationnelle, injections SQL (UNION, Blind) et requêtes préparées.", "position": 2},

    # Vol 7
    {"id": "m_vol7_1", "course_id": "c_vol7_web_security", "title": "Module 1 : Le Top 10 OWASP en Pratique", "description": "Cross-Site Scripting (XSS), CSRF, failles d'autorisation IDOR et SSRF.", "position": 1},
    {"id": "m_vol7_2", "course_id": "c_vol7_web_security", "title": "Module 2 : Authentification Robuste & Gestion de Jetons", "description": "Hachage salé PBKDF2, jetons JWT signés, OAuth 2.0 et anti-bruteforce (Projet 03).", "position": 2},

    # Vol 8
    {"id": "m_vol8_1", "course_id": "c_vol8_pentest_tools", "title": "Module 1 : Reconnaissance Active & Outils de Pentest", "description": "Nmap avancé (-sS, -sV, NSE), Burp Suite Proxy/Repeater et Gobuster.", "position": 1},
    {"id": "m_vol8_2", "course_id": "c_vol8_pentest_tools", "title": "Module 2 : Méthodologie CTF & Élévation de Privilèges", "description": "Challenges Boot2Root, recherche d'accès initial et scripts LinPEAS/WinPEAS.", "position": 2},

    # Vol 9
    {"id": "m_vol9_1", "course_id": "c_vol9_python_rat", "title": "Module 1 : Programmation Sockets Réseau & Modélisation Client-Serveur", "description": "Sockets TCP natifs, gestion de flux de données bidirectionnels et simulation de sessions.", "position": 1},
    {"id": "m_vol9_2", "course_id": "c_vol9_python_rat", "title": "Module 2 : Analyse des Signatures C2 & Mécanismes de Détection Défensive", "description": "Modélisation de balisage C2, détection de flux anormaux, analyse d'intervalles et règles de détection.", "position": 2},

    # Vol 10
    {"id": "m_vol10_1", "course_id": "c_vol10_crypto_cloud", "title": "Module 1 : Cryptographie Moderne & Protocole TLS 1.3", "description": "Chiffrement AES-GCM, paires asymétriques RSA-4096 / ECC et négociation TLS.", "position": 1},
    {"id": "m_vol10_2", "course_id": "c_vol10_crypto_cloud", "title": "Module 2 : Sécurité des Architectures Cloud & RLS", "description": "Contrôle d'accès IAM, règles Row Level Security Supabase/Firebase et Projet 04.", "position": 2},

    # Vol 11
    {"id": "m_vol11_1", "course_id": "c_vol11_blue_soc", "title": "Module 1 : Cycle DevSecOps & Durcissement Applicatif", "description": "Analyse statique SAST, composition logicielle SCA et remédiation du Projet 05.", "position": 1},
    {"id": "m_vol11_2", "course_id": "c_vol11_blue_soc", "title": "Module 2 : Opérations Blue Team, SIEM & Gestion d'Incidents", "description": "Centralisation Syslog/EVTX, règles Sigma, File Integrity Monitoring et cycle PICERL (Projet 06).", "position": 2},

    # Vol 12
    {"id": "m_vol12_1", "course_id": "c_vol12_forensics_cap", "title": "Module 1 : Digital Forensics & Rédaction de Rapport d'Audit", "description": "Chaîne de custody (RFC 3227), Volatility mémoire, cotation CVSS 3.1 et Projet 07.", "position": 1},
    {"id": "m_vol12_2", "course_id": "c_vol12_forensics_cap", "title": "Module 2 : Le Capstone Final CyberPath 2026-2027", "description": "Évaluation intégrale de synthèse couvrant l'ensemble des compétences des 12 volumes.", "position": 2}
]

CERTIFICATIONS_DATA = [
    {
        "id": "cert_comptia_secplus",
        "slug": "comptia-security-plus",
        "name": "CompTIA Security+ (SY0-701)",
        "provider": "CompTIA",
        "domain": "Cybersecurity",
        "level": "Associate / Entry",
        "prerequisites_md": "Connaissances fondamentales en réseaux (Volume 4) et en administration système (Volume 2).",
        "official_url": "https://www.comptia.org/certifications/security",
        "price_description": "Env. 392 $ USD selon les centres d'examen Pearson VUE",
        "exam_description": "90 questions maximum (QCM et questions basées sur les performances PBQ) réparties en 90 minutes. Score de passage : 750/900."
    },
    {
        "id": "cert_cisco_ccna",
        "slug": "cisco-certified-network-associate",
        "name": "Cisco Certified Network Associate (CCNA 200-301)",
        "provider": "Cisco Systems",
        "domain": "Networks",
        "level": "Associate",
        "prerequisites_md": "Maîtrise complète du routage IP, des modèles OSI/TCP-IP et des protocoles réseau (Volume 4 de CyberPath).",
        "official_url": "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html",
        "price_description": "Env. 300 $ USD",
        "exam_description": "120 minutes, environ 100 questions portant sur l'accès réseau, la connectivité IP, les services IP et les fondamentaux de sécurité."
    },
    {
        "id": "cert_offsec_oscp",
        "slug": "offsec-certified-professional-oscp",
        "name": "OffSec Certified Professional (OSCP / PEN-200)",
        "provider": "OffSec",
        "domain": "Cybersecurity",
        "level": "Professional / Advanced",
        "prerequisites_md": "Excellente maîtrise de Linux, de Python, des outils de reconnaissance réseau et de la méthodologie CTF (Volumes 5, 8 et 9).",
        "official_url": "https://www.offsec.com/courses/pen-200/",
        "price_description": "Env. 1 649 $ USD (cours PEN-200 + 90 jours de lab + 1 passage d'examen)",
        "exam_description": "Examen pratique continu de 24 heures sous surveillance vidéo, suivi de 24 heures pour la rédaction d'un rapport de test d'intrusion professionnel complet."
    },
    {
        "id": "cert_comptia_netplus",
        "slug": "comptia-network-plus",
        "name": "CompTIA Network+ (N10-009)",
        "provider": "CompTIA",
        "domain": "Networks",
        "level": "Entry / Associate",
        "prerequisites_md": "Volumes 1 et 4 de CyberPath (Architecture des ordinateurs, modèle OSI et couches TCP/IP).",
        "official_url": "https://www.comptia.org/certifications/network",
        "price_description": "392 $ USD (~365 €) selon les centres Pearson VUE (Vérifié 2026)",
        "exam_description": "90 questions maximum (QCM et questions de performance PBQ) en 90 minutes. Évalue l'architecture réseau, l'adressage IPv4/IPv6, les protocoles de routage et la sécurité périmétrique."
    },
    {
        "id": "cert_giac_gcih",
        "slug": "giac-certified-incident-handler",
        "name": "GIAC Certified Incident Handler (GCIH)",
        "provider": "GIAC / SANS Institute",
        "domain": "Cybersecurity",
        "level": "Professional",
        "prerequisites_md": "Volumes 11 et 12 de CyberPath (Surveillance SOC, SIEM, cycle de réponse à incident PICERL et Digital Forensics).",
        "official_url": "https://www.giac.org/certifications/certified-incident-handler-gcih/",
        "price_description": "Env. 979 $ USD (examen seul)",
        "exam_description": "Examen pratique de 4 heures combinant questions à choix multiples et exercices pratiques CyberLive dans des laboratoires virtuels."
    },
    {
        "id": "cert_isc2_ccsp",
        "slug": "certified-cloud-security-professional-ccsp",
        "name": "Certified Cloud Security Professional (CCSP)",
        "provider": "(ISC)²",
        "domain": "Cybersecurity",
        "level": "Expert",
        "prerequisites_md": "Volume 10 de CyberPath (Architectures Cloud, RLS, IAM, chiffrement hybride).",
        "official_url": "https://www.isc2.org/certifications/ccsp",
        "price_description": "Env. 599 $ USD",
        "exam_description": "150 questions en 4 heures. Valide les compétences avancées en architecture et opérations de sécurité Cloud."
    },
    {
        "id": "cert_eccouncil_ceh",
        "slug": "certified-ethical-hacker-ceh",
        "name": "Certified Ethical Hacker (CEH v13 AI)",
        "provider": "EC-Council",
        "domain": "Cybersecurity",
        "level": "Intermediate",
        "prerequisites_md": "Volumes 4, 6, 8 et 9 de CyberPath (Réseau, Web OWASP, Outils Pentest, Sockets & Détection).",
        "official_url": "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
        "price_description": "1 199 $ USD (Vérifié 2026)",
        "exam_description": "125 questions en 4 heures couvrant les vecteurs d'attaque, la reconnaissance réseau, le sniffing et l'audit de sécurité encadré."
    }
]

CAREER_PATHS_DATA = [
    {
        "id": "career_soc_analyst",
        "slug": "analyste-soc-l1-l2",
        "title": "Analyste SOC L1 / L2 (Cyberdéfense & Triage d'Incidents)",
        "description_md": """# Analyste SOC L1 / L2 : La Sentinelle des Systèmes

L'analyste en Centre des Opérations de Sécurité (SOC) est en première ligne face aux cyberattaques quotidiennes. Il surveille en temps réel les consoles de sécurité (SIEM, EDR, IDS/IPS), analyse les anomalies, écarte les faux positifs et déclenche les procédures de confinement en cas d'intrusion.

## Compétences Maîtresses Attendues :
- Analyse approfondie des flux de journaux (Linux Syslog, Windows EVTX, logs Web Apache/Nginx).
- Maîtrise des requêtes de détection (Splunk SPL, Elastic KQL, règles universelles Sigma).
- Compréhension des tactiques et techniques d'attaque selon la matrice MITRE ATT&CK.
- Application rigoureuse de la procédure de réponse à incident (norme NIST SP 800-61 / PICERL).

## Volumes CyberPath Recommandés :
- Volume 2 (Linux & Bash), Volume 4 (Réseaux TCP/IP), Volume 11 (Blue Team & SIEM), Volume 12 (Forensics).

## Certifications Associées :
- CompTIA Security+ (SY0-701), Cisco CyberOps Associate, GIAC GCIH.
"""
    },
    {
        "id": "career_pentester",
        "slug": "pentesteur-auditeur-red-team",
        "title": "Pentesteur / Consultant Red Team (Sécurité Offensive)",
        "description_md": """# Pentesteur / Consultant Red Team : L'Attaquant Éthique

Le pentesteur (Penetration Tester) est mandaté légalement par les entreprises pour éprouver la solidité de leurs défenses en simulant des attaques réelles. Il cartographie la surface exposée, identifie les failles de sécurité, développe des preuves de concept (PoC) et rédige des rapports d'audit détaillant les mesures de remédiation prioritaires.

## Compétences Maîtresses Attendues :
- Reconnaissance et énumération fine avec Nmap, Burp Suite Pro, Gobuster.
- Exploitation des vulnérabilités Web de l'OWASP Top 10 (SQLi, XSS, SSRF, IDOR).
- Scripting offensif en Python (Scapy, manipulation de sockets réseau, automatisation).
- Techniques d'élévation de privilèges sous Linux et Windows (GTFOBins, DLL Hijacking).
- Rédaction impeccable de rapports d'audit managériaux et techniques cotés en CVSS 3.1.

## Volumes CyberPath Recommandés :
- Volumes 4, 5, 6, 7, 8, 9 et 12 (Projet 07 Capstone).

## Certifications Associées :
- OffSec Certified Professional (OSCP), CEH v12, CompTIA PenTest+.
"""
    },
    {
        "id": "career_devsecops",
        "slug": "ingenieur-devsecops-cloud",
        "title": "Ingénieur DevSecOps & Sécurité Cloud",
        "description_md": """# Ingénieur DevSecOps : La Sécurité Intégrée au Code

L'ingénieur DevSecOps comble le fossé entre les équipes de développement logiciel, les opérations d'infrastructure et la cybersécurité. Il intègre des contrôles de sécurité automatisés tout au long du cycle de développement logiciel (Secure SDLC) dans les pipelines d'intégration et de déploiement continus (CI/CD).

## Compétences Maîtresses Attendues :
- Automatisation des analyses statiques de code (SAST), dynamiques (DAST) et de dépendances (SCA).
- Sécurisation des conteneurs Docker et des clusters Kubernetes (Images minimales, non-root, PodSecurity).
- Configuration des règles de contrôle d'accès dans le Cloud (AWS IAM, Supabase Postgres RLS, Firebase Rules).
- Maîtrise de l'Infrastructure as Code sécurisée (Terraform, Ansible) et gestion des secrets (HashiCorp Vault).

## Volumes CyberPath Recommandés :
- Volume 2 (Linux), Volume 3 (Manuel Python), Volume 7 (Web Security), Volume 10 (Cloud) et Volume 11 (DevSecOps).

## Certifications Associées :
- Certified Cloud Security Professional (CCSP), AWS Certified Security - Specialty, CKA.
"""
    },
    {
        "id": "career_appsec_engineer",
        "slug": "ingenieur-developpement-python-appsec",
        "title": "Ingénieur en Développement Python Sécurisé (AppSec)",
        "description_md": """# Ingénieur Développement Python & Application Security

L'ingénieur AppSec conçoit des architectures logicielles résilientes dès leur conception (Security by Design). En combinant une maîtrise pointue du langage Python moderne et des protocoles de sécurité, il développe des APIs sécurisées, implémente des architectures cryptographiques sans faille et garantit la conformité des données sensibles.

## Compétences Maîtresses Attendues :
- Programmation orientée objet avancée, typage statique PEP 484 et conception modulaire SOLID.
- Cryptographie appliquée : dérivation de clés PBKDF2/Argon2, chiffrement authentifié AES-256-GCM, TLS.
- Protection contre les attaques par canaux auxiliaires temporels (`secrets.compare_digest`).
- Écriture de requêtes SQL préparées infaillibles et conception de suites de tests unitaires/fuzzing.

## Volumes CyberPath Recommandés :
- Volume 3 (Manuel Complet de Python), Volume 6 (Web & SQL), Volume 7 (OWASP) et Volume 10 (Cryptographie).
"""
    },
    {
        "id": "career_dfir_specialist",
        "slug": "specialiste-forensic-incident-response",
        "title": "Spécialiste Criminalistique Numérique (DFIR)",
        "description_md": """# Spécialiste Digital Forensics & Réponse à Incident (DFIR)

Véritable détective du cyberespace, l'expert DFIR intervient après une compromission ou une fraude pour collecter des pièces à conviction numériques, analyser la mémoire vive (RAM) et reconstituer la chronologie exacte de l'intrusion tout en préservant la chaîne de traçabilité juridique.

## Compétences Maîtresses Attendues :
- Acquisition conforme à la RFC 3227 (ordre de volatilité, écriture bloquée, scellés numériques SHA-256).
- Analyse de mémoire vive avec le framework Volatility 3 (processus injectés, connexions réseau masquées).
- Analyse forensique de disques (registre Windows, Master File Table MFT, journaux EVTX, prefetch).
- Rédaction de rapports d'expertise judiciaire recevables devant les tribunaux.

## Volumes CyberPath Recommandés :
- Volume 1 (Architecture matérielle), Volume 2 (Linux), Volume 5 (Réseau Wireshark) et Volume 12 (Forensics).

## Certifications Associées :
- GIAC GCFE (Certified Forensic Examiner), GIAC GCFA, EnCE.
"""
    },
    {
        "id": "career_grc_auditor",
        "slug": "auditeur-gouvernance-risque-iso27001",
        "title": "Auditeur Gouvernance, Risque & Conformité (GRC / ISO 27001)",
        "description_md": """# Auditeur GRC & Conformité : Le Stratège de la Résilience

L'auditeur GRC assure l'alignement des systèmes d'information avec les lois en vigueur (RGPD, NIS 2, DORA) et les normes internationales de sécurité de l'information (ISO/IEC 27001, SOC 2, NIST CSF). Il évalue les risques métiers, rédige les politiques de sécurité (PSSI) et pilote les audits de conformité annuels.

## Compétences Maîtresses Attendues :
- Connaissance intime des cadres normatifs mondiaux (ISO 27001:2022, ISO 27005, EBIOS RM).
- Maîtrise du cadre légal (Code pénal Art. 323-1, RGPD, directive NIS 2).
- Évaluation et formalisation des plans de continuité d'activité (PCA) et de reprise d'activité (PRA).
- Vulgarisation des enjeux de cybersécurité auprès des conseils d'administration.

## Volumes CyberPath Recommandés :
- Volume 1 (Triade CIA & Éthique), Volume 7 (Authentification), Volume 11 (Secure SDLC) et Volume 12 (Rapport d'audit).

## Certifications Associées :
- CISA (Certified Information Systems Auditor), CRISC, Lead Auditor ISO/IEC 27001.
"""
    }
]

print("Loaded metadata for modules, certifications, and career paths.")
