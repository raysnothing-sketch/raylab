# RAYLAB
## Référentiel pédagogique complet — Proposition V4

**Signature : Learn. Build. Secure. Become.**

**Statut :** Document de référence pédagogique V4  
**Public :** Débutants motivés, étudiants en informatique, développeurs, administrateurs systèmes et futurs professionnels de la cybersécurité.  
**Langue principale :** Français, avec préparation à l'anglais technique et versions allemande et anglaise.

---

# PARTIE I — ARCHITECTURE GÉNÉRALE

## 1. Vision pédagogique

RayLab forme des personnes capables de comprendre, construire, administrer, sécuriser et analyser des systèmes informatiques.

La formation ne se limite pas à transmettre des connaissances théoriques. Chaque notion est reliée à une compétence pratique.

Les quatre piliers fondamentaux sont :

- **LEARN** : comprendre les principes et les mécanismes réels sous le capot.
- **BUILD** : construire des programmes, des systèmes et des outils robustes.
- **SECURE** : identifier les risques, auditer et appliquer des mesures défensives.
- **BECOME** : démontrer ses compétences à travers des projets vérifiables et un portfolio professionnel.

## 2. Organisation des formations

RayLab comprend huit académies spécialisées, un parcours intégrateur et un pôle d'accompagnement transversal.

| Formation | Finalité | Durée Cible |
|---|---|---|
| **Python Academy** | Programmer, concevoir des outils et automatiser | 100 à 120 h |
| **Linux & Systems Academy** | Administrer, durcir et superviser les systèmes | 80 à 100 h |
| **Networks Academy** | Comprendre les flux, protocoles et analyser le trafic | 80 à 100 h |
| **Blue Team & SOC Academy** | Détecter les menaces, analyser les logs et répondre aux incidents | 90 à 110 h |
| **Ethical Hacking Academy** | Évaluer la sécurité applicative et système en cadre autorisé | 90 à 110 h |
| **DFIR Academy** | Préserver, examiner et investiguer les preuves numériques | 80 à 100 h |
| **Cloud & DevSecOps Academy** | Construire, conteneuriser et sécuriser les pipelines modernes | 90 à 110 h |
| **IA & Sécurité Appliquée** | Modéliser et évaluer la sécurité des composants d'IA | 70 à 90 h |
| **CyberPath Master** | Parcours intégrateur réunissant l'ensemble des compétences (12 Volumes) | 180 à 220 h |
| **Career Launchpad** | Préparer le CV ATS, les certifications et l'insertion professionnelle | 25 à 35 h |

Les huit académies sont des pôles de spécialisation. Le **CyberPath Master** est le parcours intégrateur structuré qui réutilise et ordonne ces enseignements. Le **Career Launchpad** accompagne transversalement les apprenants de toutes les académies vers l'emploi.

## 3. Niveaux pédagogiques normalisés

- **Niveau 0 — Foundation :** découvrir les concepts, comprendre le modèle mental et acquérir le vocabulaire.
- **Niveau 1 — Beginner :** réaliser des opérations simples avec accompagnement pas-à-pas.
- **Niveau 2 — Intermediate :** travailler de manière autonome sur des cas pratiques et des scripts complets.
- **Niveau 3 — Advanced :** résoudre des problèmes complexes, diagnostiquer et concevoir des architectures.
- **Niveau 4 — Professional Practice :** produire des livrables professionnels, justifier ses choix et auditer en conditions réelles.

L'attribution d'un niveau ne dépend jamais du simple volume d'heures ou du visionnage passif, mais de compétences validées par des exercices et projets.

## 4. Format standard d'une leçon (15 Points Clés)

1. Titre et numéro de référence.
2. Niveau de difficulté (Niv. 0 à 4).
3. Durée estimée.
4. Prérequis obligatoires.
5. Objectifs d'apprentissage mesurables.
6. Introduction contextualisée et cas d'usage réel.
7. Explication théorique progressive (30% du volume).
8. Schémas, architecture et exemples visuels.
9. Démonstration technique pas-à-pas.
10. Exercice pratique guidé (sandbox).
11. Exercice autonome d'application.
12. Quiz de validation de compréhension (avec explications).
13. Synthèse des notions clés à retenir.
14. Références officielles et documentation technique.
15. Critères de réussite mesurables.

---

# PARTIE II — DÉTAIL DES MODULES PAR ACADÉMIE

## 6. PYTHON ACADEMY (100 à 120 h)

- **PYA-01** : Découverte de Python, environnement et première application
- **PYA-02** : Logique de programmation, conditions et boucles
- **PYA-03** : Collections, listes, dictionnaires et structures de données
- **PYA-04** : Fonctions, modularité et organisation en packages
- **PYA-05** : Gestion robuste des exceptions, fichiers et logging
- **PYA-06** : Programmation orientée objet, héritage et dataclasses
- **PYA-07** : Algorithmique, complexité Big O et tests pytest
- **PYA-08** : Python avancé, générateurs, décorateurs et asyncio
- **PYA-09** : Python pour les systèmes, sous-processus et sockets TCP/UDP
- **PYA-10** : Sécurité applicative, validation, hachage et secrets
- **PYA-11** : Bases de données SQLite relationnelles et APIs FastAPI
- **PYA-12** : Projet Capstone Synthèse : **Python Security Toolkit**

## 7. LINUX & SYSTEMS ACADEMY (80 à 100 h)

- **LSA-01** : Architecture Linux, noyau, distributions et virtualisation
- **LSA-02** : Terminal interactif, pipelines et manipulation de texte (sed/awk/grep)
- **LSA-03** : Système de fichiers, droits Unix, SUID/SGID et ACL
- **LSA-04** : Processus, signaux, gestion des services Systemd et cron
- **LSA-05** : Administration système, paquets, disques et maintenance
- **LSA-06** : Scripting Bash robuste, variables, fonctions et automatisation
- **LSA-07** : Réseau sous Linux, interfaces, routage, ss/ip et SSH sécurisé
- **LSA-08** : Durcissement Linux, modèle moindre privilège et pare-feu
- **Projet Final** : **Linux Security Auditor** (Script d'audit d'intégrité et conformité)

## 8. NETWORKS ACADEMY (80 à 100 h)

- **NA-01** : Fondamentaux réseaux, modèles OSI et TCP/IP, encapsulation
- **NA-02** : Adressage IPv4/IPv6, sous-réseaux CIDR, NAT et PAT
- **NA-03** : Protocoles fondamentaux (ARP, ICMP, TCP 3-way handshake, UDP, DNS, TLS)
- **NA-04** : Switching, tables MAC, VLAN, trunking et routage statique/dynamique
- **NA-05** : Analyse de trafic en profondeur, Wireshark, filtres et dissection PCAP
- **NA-06** : Programmation réseau, sockets TCP/UDP et injection Scapy en sandbox
- **NA-07** : Sécurité des réseaux, segmentation, firewalls et architecture Zero Trust
- **Projet Final** : **Network Analysis & Security Lab** (Conception topologie et analyse de trames)

## 9. BLUE TEAM & SOC ACADEMY (90 à 110 h)

- **BSA-01** : Fondamentaux de la sécurité défensive, triade CIA et cycle de vie SOC
- **BSA-02** : Collecte, formats de logs, Syslog, événements Windows et Sysmon
- **BSA-03** : Architecture SIEM, ingestion, corrélation et réduction de faux positifs
- **BSA-04** : Détection des menaces, IOC/IOA, MITRE ATT&CK, règles Sigma et YARA
- **BSA-05** : Télémétrie endpoint, architecture EDR et confinement
- **BSA-06** : Threat Hunting, formulation d'hypothèses et corrélation multi-sources
- **BSA-07** : Réponse aux incidents (PICERL : Triage, Confinement, Éradication)
- **BSA-08** : Cyber Threat Intelligence (CTI), TLP et reporting technique
- **Projet Final** : **SOC Investigation Challenge** (Reconstitution d'incident et règles Sigma)

## 10. ETHICAL HACKING ACADEMY (90 à 110 h)

- **EHA-01** : Cadre légal strict, règles d'engagement et méthodologie d'audit
- **EHA-02** : Reconnaissance passive (OSINT) et cartographie autorisée
- **EHA-03** : Analyse de services, scans de ports, Nmap et vulnérabilités CVE/CVSS
- **EHA-04** : Sécurité Web OWASP Top 10 (SQLi, XSS, CSRF, SSRF, IDOR, Burp Suite)
- **EHA-05** : Sécurité des configurations systèmes et audit d'escalade de privilèges
- **EHA-06** : Preuves de concept (PoC) non destructives en environnements de test isolés
- **EHA-07** : Rédaction de rapports de test d'intrusion professionnels et remédiations
- **Projet Final** : **Web Application Penetration Test** (Rapport d'audit complet avec remédiations)

## 11. DFIR ACADEMY (80 à 100 h)

- **DFA-01** : Principes d'investigation, chaîne de conservation et empreintes forensiques
- **DFA-02** : Systèmes de fichiers (NTFS, ext4), métadonnées et analyse disque
- **DFA-03** : Windows Forensics, Registre, Event Logs, Prefetch, Amcache et Timelines
- **DFA-04** : Linux Forensics, artefacts système, logs, shell history et crontabs
- **DFA-05** : Memory Forensics, acquisition de RAM et analyse avec Volatility
- **DFA-06** : Network Forensics, sessions réseau, flux suspects et corrélation
- **DFA-07** : Malware Analysis fondamental en sandbox isolée (statique et dynamique inerte)
- **DFA-08** : Synthèse d'investigation, chronologie des faits et rapport d'expertise
- **Projet Final** : **Digital Incident Investigation** (Analyse disque, mémoire et réseau intégrée)

## 12. CLOUD & DEVSECOPS ACADEMY (90 à 110 h)

- **CDA-01** : Fondamentaux Cloud, modèles IaaS/PaaS, IAM et responsabilité partagée
- **CDA-02** : Gestion de versions Git avancée, branches, revues et GitHub
- **CDA-03** : Conteneurisation avec Docker, Dockerfile optimisés et sécurité des images
- **CDA-04** : Intégration et déploiement continus (CI/CD) avec GitHub Actions
- **CDA-05** : DevSecOps : Shift-Left, SAST, DAST, SCA, analyse de dépendances et SBOM
- **CDA-06** : Infrastructure as Code (IaC) déclarative avec Terraform
- **CDA-07** : Orchestration avec Kubernetes, Pods, Deployments et Network Policies
- **CDA-08** : Sécurité Cloud, gestion des secrets, conformité et IAM moindre privilège
- **CDA-09** : Observabilité, télémétrie, métriques, traces et supervision
- **Projet Final** : **Secure DevOps Pipeline** (Pipeline CI/CD complet avec gates de sécurité)

---

# PARTIE III — PARCOURS INTÉGRATEUR : CYBERPATH MASTER (180 à 220 h)

Le **CyberPath Master** fédère l'ensemble des compétences de RayLab à travers 12 volumes structurés :

- **Volume 1** : Computer Science Foundations (Architecture, Binaire, Logique)
- **Volume 2** : Python Engineering (POO, Algorithmes, Automatisation)
- **Volume 3** : Linux Systems (Administration, Shell Bash, Durcissement)
- **Volume 4** : Networking Essentials (Modèle OSI, TCP/IP, Wireshark)
- **Volume 5** : Web & Application Security (OWASP, Sécurisation d'APIs)
- **Volume 6** : Ethical Hacking Fundamentals (Méthodologie d'audit autorisée)
- **Volume 7** : Blue Team & SOC (Analyse de logs, Détection, Sigma/YARA)
- **Volume 8** : Digital Forensics (Acquisition, Timelines, Preuves numériques)
- **Volume 9** : Cryptography & Identity Security (Chiffrement, Hashing, PBKDF2, PKI)
- **Volume 10** : Cloud & DevSecOps (Docker, Kubernetes, CI/CD Sécurisé)
- **Volume 11** : Security Operations & Architecture (Zero Trust, Modélisation)
- **Volume 12** : Professional Integration (Portfolio GitHub, CV ATS, Attestation finale)

**Conditions Strictes d'Attestation CyberPath :**
L'attestation finale et le badge certifié RayLab exigent la complétion des 12 volumes, la validation des 7 projets Capstones et la soutenance d'un rapport de synthèse.

---

# PARTIE IV — ACCOMPAGNEMENT PROFESSIONNEL : CAREER LAUNCHPAD (25 à 35 h)

- **CL-01** : Analyse du marché IT et de la cybersécurité en Europe (France, Allemagne, Suisse)
- **CL-02** : CV Technique multilingue (FR / EN / DE - Lebenslauf) et optimisation ATS
- **CL-03** : GitHub d'excellence, portfolios documentés et valorisation du code
- **CL-04** : LinkedIn et présence professionnelle technique
- **CL-05** : Préparation aux entretiens techniques et simulations de questions
- **CL-06** : Stratégie de certifications industrielles (CompTIA, Cisco, OffSec, GIAC)

---

# PARTIE V — BARÈME STANDARD D'ÉVALUATION DES PROJETS (SUR 100 POINTS)

Chaque projet Capstone est évalué selon une grille analytique rigoureuse :

1. **Fonctionnement et résultats opérationnels (25 pts)** : Le programme répond strictement au cahier des charges sans crash.
2. **Qualité technique et conception (20 pts)** : Architecture modulaire, respect de la PEP 8 / conventions et clarté du code.
3. **Sécurité et robustesse (20 pts)** : Gestion des erreurs, validation des entrées, absence de secrets exposés.
4. **Documentation et livrables (15 pts)** : README soigné, schéma d'architecture, guide d'installation et cas d'usage.
5. **Tests et reproductibilité (10 pts)** : Présence de tests automatisés (pytest/unitaires) reproductibles.
6. **Présentation et justification (10 pts)** : Capacité de l'apprenant à expliquer et défendre ses arbitrages techniques.

**Seuil d'admission :** 70 / 100 points, avec au moins 50% dans chaque catégorie éliminatoire.
