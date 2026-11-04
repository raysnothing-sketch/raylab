# -*- coding: utf-8 -*-
"""
Données pédagogiques exhaustives pour les Volumes 10, 11 et 12 de CyberPath.
Couvre la Cryptographie, le Cloud, la Blue Team (SOC & FIM), le Forensics et le Capstone Final.
"""

import json

LESSONS_VOL10_TO_12 = [
    # -------------------------------------------------------------------------
    # VOLUME 10 : CRYPTOGRAPHIE APPLIQUÉE & SÉCURITÉ CLOUD
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol10_crypto",
        "module_id": "m_vol10_1",
        "slug": "cryptographie-symetrique-aes-gcm-asymetrique-rsa-tls",
        "title": "Cryptographie Symétrique (AES-GCM), Asymétrique (RSA) & TLS",
        "summary": "Maîtriser les fondements cryptographiques modernes : chiffrement de bloc authentifié AES-256-GCM, cryptographie asymétrique RSA-4096 / ECC et négociation TLS 1.3.",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 50,
        "content_md": """# Cryptographie Moderne : AES-256-GCM, RSA & Protocole TLS 1.3

La cryptographie est la science mathématique permettant de protéger la confidentialité et l'intégrité de l'information. En ingénierie logicielle comme en cybersécurité, comprendre la différence fondamentale entre chiffrement symétrique et asymétrique évite les erreurs de conception critiques.

---

## 1. Chiffrement Symétrique Authentifié (AES-GCM)

Dans le chiffrement symétrique, une **seule et même clé secrète** est partagée entre l'émetteur et le récepteur pour chiffrer et déchiffrer.

* **AES (Advanced Encryption Standard - FIPS 197) :** Chiffre des blocs de 128 bits avec une clé de 128, 192 ou 256 bits.
* **Le Mode GCM (Galois/Counter Mode) :** Fournit un chiffrement authentifié avec données associées (**AEAD**). En plus de chiffrer le message, il génère un tag d'authentification cryptographique de 128 bits. Si un attaquant modifie un seul bit du message chiffré en transit, le déchiffrement échoue immédiatement !

```python
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

def demonstrer_aes_gcm():
    # Génération d'une clé AES 256 bits hautement aléatoire (CSPRNG)
    cle = AESGCM.generate_key(bit_length=256)
    aesgcm = AESGCM(cle)
    
    # Vecteur d'initialisation (Nonce) unique de 96 bits (12 octets)
    nonce = os.urandom(12)
    message_clair = b"Donnees ultra-confidentielles du serveur RayLab"
    
    # Chiffrement authentifié
    chiffre_avec_tag = aesgcm.encrypt(nonce, message_clair, associated_data=None)
    print(f"[*] Message chiffré ({len(chiffre_avec_tag)} octets) : {chiffre_avec_tag.hex()[:32]}...")
    
    # Déchiffrement et validation d'intégrité
    message_recupere = aesgcm.decrypt(nonce, chiffre_avec_tag, associated_data=None)
    print(f"[✓] Message restauré avec succès : {message_recupere.decode()}")

demonstrer_aes_gcm()
```

> [!WARNING]
> En mode AES-GCM, **ne réutilisez JAMAIS le même couple (clé, nonce)** ! La réutilisation d'un nonce avec la même clé permet à un attaquant d'extraire la clé d'authentification par simple opération mathématique XOR.

---

## 2. Chiffrement Asymétrique & Signature (RSA & ECC)

Le chiffrement asymétrique utilise une **paire de clés mathématiquement liées** :
* **Clé publique :** Diffusée librement à tout le monde.
* **Clé privée :** Conservée jalousement et secrètement par son propriétaire.

### Les Deux Grands Usages :
1. **Confidentialité (Chiffrement) :** Alice chiffre avec la clé publique de Bob. Seul Bob peut déchiffrer avec sa clé privée.
2. **Authenticité & Non-répudiation (Signature) :** Alice signe l'empreinte d'un document avec sa clé privée. Tout le monde peut vérifier la signature avec la clé publique d'Alice.

---

## 3. Le Chiffrement Hybride & TLS 1.3

Le chiffrement asymétrique (RSA/ECC) est très coûteux en calcul CPU (environ 1 000 fois plus lent qu'AES). Par conséquent, les protocoles modernes comme **TLS 1.3 (HTTPS)** utilisent le **Chiffrement Hybride** :
1. Les deux parties négocient une clé de session symétrique éphémère grâce à un échange de clés asymétrique (Diffie-Hellman à courbes elliptiques - ECDHE).
2. Tout le flux de données HTTP est ensuite chiffré ultra-rapidement avec cette clé symétrique en AES-256-GCM ou ChaCha20-Poly1305.
""",
        "exercise": {
            "title": "Génération de Nonce Aléatoire CSPRNG",
            "description_md": "Écrivez une fonction Python `generer_nonce_gcm(taille_octets: int = 12) -> bytes` qui utilise le générateur pseudo-aléatoire cryptographiquement sécurisé `os.urandom` pour générer un nonce unique.",
            "starter_code": "import os\n\ndef generer_nonce_gcm(taille_octets: int = 12) -> bytes:\n    # Votre code ici\n    pass\n",
            "solution_code": "import os\n\ndef generer_nonce_gcm(taille_octets: int = 12) -> bytes:\n    return os.urandom(taille_octets)\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Cryptographie Appliquée",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quel avantage décisif offre le mode AES-GCM (Galois/Counter Mode) par rapport au mode classique AES-CBC ?",
                    "explanation_md": "AES-GCM est un mode AEAD qui intègre nativement l'authentification et l'intégrité grâce à un tag cryptographique, évitant les attaques par oracle de rembourrage (Padding Oracle).",
                    "options_json": json.dumps([
                        {"text": "Il garantit à la fois la confidentialité et l'intégrité des données (chiffrement authentifié AEAD)", "is_correct": True},
                        {"text": "Il n'a pas besoin de clé secrète", "is_correct": False},
                        {"text": "Il compresse automatiquement les données de 50%", "is_correct": False},
                        {"text": "Il fonctionne sans processeur", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Dans un système de signature numérique asymétrique, quelle clé est utilisée par l'émetteur pour signer l'empreinte d'un document ?",
                    "explanation_md": "L'émetteur signe avec sa propre clé privée, et les destinataires valident la signature à l'aide de sa clé publique.",
                    "options_json": json.dumps([
                        {"text": "La clé privée de l'émetteur", "is_correct": True},
                        {"text": "La clé publique du destinataire", "is_correct": False},
                        {"text": "La clé symétrique AES de session", "is_correct": False},
                        {"text": "Le certificat racine de l'autorité", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },

    # -------------------------------------------------------------------------
    # VOLUME 11 : SECURE DEVELOPMENT & BLUE TEAM (SOC & FIM)
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol11_soc",
        "module_id": "m_vol11_2",
        "slug": "surveillance-soc-analyse-logs-siem-regles-sigma-fim",
        "title": "Surveillance SOC : Analyse de Logs, SIEM, Règles Sigma & FIM",
        "summary": "Architecture opérationnelle d'un Security Operations Center (SOC) : collecte Syslog/EVTX, corrélation SIEM, détection d'anomalies, règles Sigma et moniteur d'intégrité de fichiers FIM.",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 55,
        "content_md": """# Opérations Blue Team : Surveillance SOC, SIEM & Règles Sigma

Dans une organisation moderne, la **Blue Team** assure la défense en continu des systèmes. Le centre névralgique de cette mission est le **SOC (Security Operations Center)**, appuyé par un **SIEM (Security Information and Event Management)** qui centralise, normalise et corrèle des millions d'événements réseau et système par seconde.

---

## 1. La Pyramide de Détection du SOC

```
               [ ALERTES PRIORITAIRES (L3 / Incident Response) ]
                                   /    \\
                                  /      \\
                  [ RÈGLES DE CORRÉLATION SIEM (L2 / Threat Hunting) ]
                                /          \\
                               /            \\
            [ FILTRAGE & TRIAGE DES ÉVÉNEMENTS (L1 / Automatisation) ]
                            /                    \\
                           /                      \\
[ LOGS BRUTS : Firewalls, Syslog Linux, Windows EVTX, EDR, Cloudtrail, DNS, Web Nginx ]
```

### Les Niveaux d'Analyse au sein d'un SOC :
* **Niveau 1 (Triage & Qualification) :** Surveillance de la console d'alertes en temps réel, qualification des faux positifs, escalade vers le N2.
* **Niveau 2 (Investigation Approfondie) :** Corrélation des sources, extraction d'artéfacts (IoC - *Indicators of Compromise*), écriture de nouvelles règles de détection.
* **Niveau 3 (Chasse aux Menaces & Incident Response) :** Threat Hunting proactif, analyse de malwares et pilotage de crise lors d'une cyberattaque avérée.

---

## 2. Le Standard des Règles Sigma pour la Détection

Tout comme les règles **Yara** standardisent la détection de fichiers malveillants, les règles **Sigma** constituent le standard ouvert et universel pour décrire des requêtes de détection de comportements suspects sur les flux de journaux (indépendamment du SIEM utilisé : Splunk, Elastic, QRadar ou Microsoft Sentinel) :

```yaml
title: Détection d'Attaque par Empoisonnement ARP
id: 5b4c102b-9273-455b-a621-raylab001
status: production
description: Détecte les messages de conflit d'adresses MAC signalant une attaque MITM sur le réseau local.
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

## 3. Le Moniteur d'Intégrité de Fichiers (File Integrity Monitoring - FIM)

Un composant clé de la défense d'hôte (HIDS) consiste à surveiller l'intégrité cryptographique des fichiers critiques du système d'exploitation.

```python
import hashlib
from pathlib import Path

def generer_base_de_reference(dossier: Path) -> dict[str, str]:
    \"\"\"Calcule et enregistre la signature SHA-256 de chaque fichier d'un dossier sensible.\"\"\"
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
    \"\"\"Compare l'état actuel avec la base de référence pour lever une alerte immédiate.\"\"\"
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
""",
        "exercise": {
            "title": "Comparateur de Hash FIM en Python",
            "description_md": "Écrivez une fonction Python `verifier_fichier_fim(hash_reference: str, hash_courant: str) -> str` qui utilise `secrets.compare_digest` et retourne 'INTACT' si les empreintes correspondent, et 'ALTÉRÉ' en cas de divergence.",
            "starter_code": "import secrets\n\ndef verifier_fichier_fim(hash_reference: str, hash_courant: str) -> str:\n    # Votre code ici\n    pass\n",
            "solution_code": "import secrets\n\ndef verifier_fichier_fim(hash_reference: str, hash_courant: str) -> str:\n    if secrets.compare_digest(hash_reference.lower().strip(), hash_courant.lower().strip()):\n        return 'INTACT'\n    return 'ALTÉRÉ'\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Opérations Blue Team & SOC",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "À quoi servent les règles de détection au format universel Sigma au sein d'une équipe de cyberdéfense ?",
                    "explanation_md": "Sigma est un format générique et ouvert permettant d'écrire des règles de détection d'incidents qui peuvent être compilées et exportées vers n'importe quel SIEM (Splunk, Elastic, Sentinel...).",
                    "options_json": json.dumps([
                        {"text": "À décrire des règles de détection de comportements suspects portables sur n'importe quel SIEM", "is_correct": True},
                        {"text": "À désinfecter automatiquement les postes de travail infectés par un ransomware", "is_correct": False},
                        {"text": "À remplacer les analystes humains de niveau L1", "is_correct": False},
                        {"text": "À bloquer les ports de commutateurs réseau", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Quelle est la mission principale d'un analyste de sécurité SOC de Niveau 1 (L1) ?",
                    "explanation_md": "L'analyste L1 surveille les flux d'alertes en temps réel, élimine les faux positifs et qualifie les événements suspects avant escalade.",
                    "options_json": json.dumps([
                        {"text": "Le triage, la qualification initiale des alertes et l'élimination des faux positifs", "is_correct": True},
                        {"text": "La rétro-ingénierie assembleur des malwares de pointe", "is_correct": False},
                        {"text": "La négociation contractuelle avec les clients", "is_correct": False},
                        {"text": "Le reconditionnement physique des serveurs en panne", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },

    # -------------------------------------------------------------------------
    # VOLUME 12 : DIGITAL FORENSICS, RAPPORT & CAPSTONE FINAL
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol12_forensics",
        "module_id": "m_vol12_1",
        "slug": "lab-10-digital-forensics-chaine-custody-analyse-ram-timeline",
        "title": "LAB 10 : Digital Forensics — Chaîne de Custody & Analyse de RAM",
        "summary": "Méthodologie de la criminalistique numérique (DFIR) selon la RFC 3227 : ordre de volatilité, extraction d'artéfacts de mémoire vive (Volatility) et reconstruction de timeline d'attaque.",
        "lesson_type": "lab",
        "position": 1,
        "estimated_minutes": 55,
        "content_md": """# LAB 10 : Digital Forensics — Préservation de Preuves & Analyse Mémoire

La criminalistique numérique (**Digital Forensics & Incident Response - DFIR**) intervient lorsqu'un incident de sécurité s'est produit. Son but est de répondre méthodiquement aux cinq questions fondamentales : **Qui ? Quoi ? Quand ? Où ? Comment ?**, tout en garantissant la recevabilité des preuves devant une juridiction légale.

---

## 1. L'Ordre de Volatilité des Preuves (RFC 3227)

Toute intervention sur une machine compromise doit respecter strictement l'ordre de volatilité : les données disparaissant le plus vite doivent être collectées en priorité absolue avant d'éteindre ou de modifier le système !

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
| 6. Journaux distants (SIEM, Syslog centralisé) et sauvegardes d'archives |
+--------------------------------------------------------------------------+
```

> [!CAUTION]
> N'éteignez JAMAIS brutalement un serveur compromis ! En débranchant la prise électrique, vous détruisez irrémédiablement le contenu de la mémoire vive (RAM) qui contenait la clé de déchiffrement du malware ou l'adresse IP de commande et contrôle (C2) de l'intrus.

---

## 2. La Chaîne de Traçabilité (Chain of Custody)

Pour qu'un artéfact numérique soit recevable juridiquement, l'enquêteur doit prouver qu'il n'a subi aucune altération :
1. **Acquisition en lecture seule (Write-Blocker) :** L'image disque ou mémoire est réalisée à l'aide d'un bloqueur d'écriture matériel ou logiciel.
2. **Calcul d'empreinte immédiat :** Dès la fin de la capture, l'empreinte SHA-256 de l'image est calculée et consignée sur un registre d'audit physique et numérique.
3. **Travail exclusif sur copie :** L'analyste forensique ne travaille **jamais** sur la preuve originale, mais toujours sur une copie bit-à-bit vérifiée par hash.

---

## 3. Analyse de Mémoire Volatile avec Volatility 3

**Volatility 3** est le framework de référence pour inspecter les images de mémoire RAM (`memdump.raw`) :

```bash
# 1. Lister les processus qui tournaient en mémoire lors de l'incident
python3 vol.py -f memdump.raw windows.pslist

# 2. Détecter les processus cachés par un rootkit (analyse croisée EPROCESS)
python3 vol.py -f memdump.raw windows.psscan

# 3. Lister les connexions réseau actives (IPs distantes, sockets)
python3 vol.py -f memdump.raw windows.netscan

# 4. Extraire un binaire suspect de la mémoire pour rétro-ingénierie
python3 vol.py -f memdump.raw windows.dumpfiles --pid 1337
```
""",
        "exercise": {
            "title": "Vérificateur de Scellé Numérique Forensique",
            "description_md": "Écrivez une fonction Python `valider_chaine_custody(hash_scelle: str, hash_copie_travail: str) -> bool` qui compare les deux empreintes hexadécimales en temps constant avec `secrets.compare_digest` pour valider l'intégrité de la pièce à conviction.",
            "starter_code": "import secrets\n\ndef valider_chaine_custody(hash_scelle: str, hash_copie_travail: str) -> bool:\n    # Votre code ici\n    pass\n",
            "solution_code": "import secrets\n\ndef valider_chaine_custody(hash_scelle: str, hash_copie_travail: str) -> bool:\n    return secrets.compare_digest(hash_scelle.strip().lower(), hash_copie_travail.strip().lower())\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Digital Forensics & RFC 3227",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Selon la RFC 3227, quel composant doit être capturé en priorité absolue lors de la réponse à incident sur un poste compromis en marche ?",
                    "explanation_md": "La mémoire vive (RAM) et l'état des registres sont les plus volatils et disparaissent immédiatement dès la coupure d'alimentation.",
                    "options_json": json.dumps([
                        {"text": "La mémoire vive (RAM) et l'état des registres", "is_correct": True},
                        {"text": "Le disque dur SSD", "is_correct": False},
                        {"text": "La table des partitions NTFS", "is_correct": False},
                        {"text": "Les sauvegardes sur bandes magnétiques", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Pourquoi l'expert forensique calcule-t-il systématiquement le hachage SHA-256 de l'image de disque dès la fin de son acquisition ?",
                    "explanation_md": "Ce hachage constitue le scellé numérique qui prouve que l'image analysée est rigoureusement identique bit-à-bit à la preuve d'origine sans aucune altération.",
                    "options_json": json.dumps([
                        {"text": "Pour garantir l'intégrité de la preuve et maintenir la chaîne de traçabilité (Chain of Custody)", "is_correct": True},
                        {"text": "Pour compresser l'image disque et économiser du stockage", "is_correct": False},
                        {"text": "Pour empêcher le redémarrage de la machine victime", "is_correct": False},
                        {"text": "Pour désactiver les malwares résiduels", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },
    {
        "id": "les_cp_vol12_capstone",
        "module_id": "m_vol12_2",
        "slug": "capstone-final-cyberpath-scenario-evaluation-integrale",
        "title": "Le Capstone Final CyberPath 2026-2027 : Évaluation Opérationnelle",
        "summary": "Mise en situation complète intégrant les 12 volumes : audit d'infrastructure hybride, exploitation éthique contrôlée, remédiation de code et soutenance professionnelle.",
        "lesson_type": "interactive",
        "position": 2,
        "estimated_minutes": 60,
        "content_md": """# Le Capstone Final CyberPath 2026-2027 : Épreuve de Synthèse

Félicitations pour votre progression à travers l'ensemble des volumes de **CyberPath 2026-2027** et du **Manuel Complet de Python**. Le Capstone Project constitue l'épreuve d'ingénierie intégrale qui valide votre transition de débutant à spécialiste opérationnel crédible sur le marché du travail.

---

## 1. Scénario Opérationnel de l'Épreuve Capstone

Vous êtes mandaté en tant que consultant de sécurité indépendant par l'entreprise fictive **« NovaPay Financial Systems »** pour réaliser l'audit technique complet de sa nouvelle plateforme de micropaiements :

```
                                [ PERIMÈTRE AUDITÉ : NOVAPAY ]
                                              |
        +-------------------------------------+-------------------------------------+
        |                                                                           |
[ SURFACE EXTERNE ]                                                   [ APPLICATION BACKEND & BD ]
  - Domaine public : api.novapay.internal                               - API REST Python FastAPI
  - Pare-feu Linux (iptables / UFW)                                     - Base de données PostgreSQL
  - Services exposés : Ports 22, 80, 443, 8080                         - Microservice d'authentification JWT
```

---

## 2. Les 4 Phases Obligatoires du Projet Capstone

### Phase 1 : Reconnaissance & Cartographie de Surface (Volumes 1 à 5)
* Réaliser un inventaire précis des ports, démons et versions logicielles avec Nmap.
* Analyser la topologie réseau, identifier les interfaces exposées et vérifier la présence de pare-feux applicatifs (WAF).

### Phase 2 : Évaluation des Vulnérabilités & Exploitation Éthique (Volumes 6 à 9)
* Identifier et reproduire en laboratoire isolé une vulnérabilité critique de l'OWASP Top 10 (ex: injection SQL sur le module de facturation ou faille d'autorisation IDOR sur les transactions).
* Démontrer l'impact potentiel (preuve de concept - PoC) sans perturber la disponibilité des services.

### Phase 3 : Durcissement, FIM & Détection Blue Team (Volumes 10 et 11)
* Développer et injecter le correctif définitif en Python (requêtes préparées, validation d'entrées, algorithme de hachage salé PBKDF2 et comparaison en temps constant `compare_digest`).
* Configurer une règle Sigma dans le SIEM pour alerter immédiatement en cas de nouvelle tentative d'exploitation.

### Phase 4 : Rédaction du Rapport Exécutif Professionnel (Volume 12)
* Rédiger un rapport d'audit exhaustif comprenant :
  1. Un **Résumé Managérial (Executive Summary)** d'une page vulgarisant les risques pour la direction générale.
  2. Une **Matrice des Vulnérabilités** avec cotation standardisée **CVSS 3.1** (Score de base, vecteur temporel et environnemental).
  3. Des **Fiches Techniques Détaillées** pour chaque vulnérabilité (Description, Preuve de Concept, Impact métier, Solution technique éprouvée).

---

## 3. Critères d'Évaluation & Grille de Notation RayLab

| Domaine Évalué | Pondération | Attentes Clés |
| :--- | :--- | :--- |
| **Rigueur Déontologique & Périmètre** | 20% | Respect absolu de l'ordre de mission, aucune action destructive. |
| **Maîtrise Technique & Code Python** | 30% | Qualité du code, typage PEP 484, gestion des exceptions, performance. |
| **Remédiation Défensive (Blue Team)** | 25% | Efficacité des contre-mesures, durcissement, règles de détection SIEM. |
| **Qualité du Rapport d'Audit** | 25% | Clarté de la cotation CVSS, pertinence des recommandations, professionnalisme. |

Ce livrable constituera la pièce maîtresse de votre **Portfolio GitHub** et de vos entretiens d'embauche pour des postes d'**Analyste SOC**, de **Pentesteur Junior** ou d'**Ingénieur DevSecOps**.
""",
        "exercise": {
            "title": "Calculateur de Score CVSS 3.1 Qualitatif",
            "description_md": "Écrivez une fonction Python `qualifier_score_cvss(score_numerique: float) -> str` qui retourne 'FAIBLE' (0.1 à 3.9), 'MOYEN' (4.0 à 6.9), 'ÉLEVÉ' (7.0 à 8.9), 'CRITIQUE' (9.0 à 10.0), ou 'AUCUN' (0.0).",
            "starter_code": "def qualifier_score_cvss(score_numerique: float) -> str:\n    # Votre code ici\n    pass\n",
            "solution_code": "def qualifier_score_cvss(score_numerique: float) -> str:\n    if score_numerique <= 0.0:\n        return 'AUCUN'\n    elif score_numerique <= 3.9:\n        return 'FAIBLE'\n    elif score_numerique <= 6.9:\n        return 'MOYEN'\n    elif score_numerique <= 8.9:\n        return 'ÉLEVÉ'\n    elif score_numerique <= 10.0:\n        return 'CRITIQUE'\n    return 'INVALIDE'\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Synthèse & Capstone CyberPath",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quelle section d'un rapport de test d'intrusion professionnel est spécifiquement rédigée pour les directeurs généraux et décideurs non techniques ?",
                    "explanation_md": "L'Executive Summary (Résumé managérial) synthétise les risques métiers, les impacts financiers et les priorités stratégiques dans un langage accessible aux décideurs.",
                    "options_json": json.dumps([
                        {"text": "Le Résumé Managérial (Executive Summary)", "is_correct": True},
                        {"text": "L'annexe des dumps de mémoire hexadécimaux", "is_correct": False},
                        {"text": "Le code source assembleur des exploits", "is_correct": False},
                        {"text": "La liste des bannières Nmap brutes", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Dans la métrique de vulnérabilité CVSS 3.1, à partir de quel score numérique une vulnérabilité est-elle formellement classée comme 'CRITIQUE' ?",
                    "explanation_md": "Selon le standard CVSS 3.1 du FIRST, tout score compris entre 9.0 et 10.0 est classé comme Critique.",
                    "options_json": json.dumps([
                        {"text": "Score supérieur ou égal à 9.0", "is_correct": True},
                        {"text": "Score supérieur à 7.0", "is_correct": False},
                        {"text": "Score supérieur à 5.0", "is_correct": False},
                        {"text": "Score égal à 10.0 uniquement", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    }
]

print(f"Loaded {len(LESSONS_VOL10_TO_12)} lessons for Volumes 10-12.")
