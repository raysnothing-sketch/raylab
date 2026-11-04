# -*- coding: utf-8 -*-
"""
Données pédagogiques exhaustives pour les Volumes 1, 2 et 3 de CyberPath & Manuel Complet de Python.
Chaque leçon comporte un cours magistral complet, un exercice pratique et un quiz d'évaluation.
"""

import json

LESSONS_VOL1_TO_3 = [
    # -------------------------------------------------------------------------
    # VOLUME 1 : FONDATIONS INFORMATIQUES & LABORATOIRE
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol1_ch1",
        "module_id": "m_vol1_1",
        "slug": "comprendre-la-cybersecurite-triade-cia",
        "title": "Comprendre la Cybersécurité : Triade CIA, Risques & Gouvernance",
        "summary": "Découvrez les piliers fondamentaux de la sécurité de l'information : Confidentialité, Intégrité, Disponibilité et modélisation des menaces.",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 35,
        "content_md": """# Comprendre la Cybersécurité : La Triade CIA & Gouvernance

La cybersécurité ne se résume pas à l'utilisation d'outils d'attaque ou de scripts automatisés. Elle constitue une discipline d'ingénierie rigoureuse visant à garantir la résilience, la conformité et la pérennité des systèmes d'information face aux menaces numériques.

---

## 1. La Triade C.I.A. (Fondement de la Sécurité des Systèmes d'Information)

Toute politique de sécurité des systèmes d'information (PSSI), toute norme internationale (ISO/IEC 27001, NIST SP 800-53) et tout mécanisme cryptographique reposent sur trois objectifs primordiaux :

```
             [ CONFIDENTIALITÉ ]
             /                 \\
            /   SÉCURITÉ DE     \\
           /   L'INFORMATION     \\
          /                       \\
[ INTÉGRITÉ ] ----------------- [ DISPONIBILITÉ ]
```

### A. La Confidentialité (Confidentiality)
La confidentialité garantit que les informations sensibles ne sont accessibles qu'aux entités (utilisateurs, processus, machines) dûment autorisées.
* **Menaces types :** Écoute clandestine (Eavesdropping, Man-in-the-Middle), fuites de données (Data Exfiltration), injection SQL avec extraction de table, vol d'identifiants.
* **Mécanismes de protection :** Chiffrement fort des données en transit (TLS 1.3) et au repos (AES-256-GCM), contrôle d'accès basé sur les rôles (RBAC), principe du moindre privilège, masquage et anonymisation.

### B. L'Intégrité (Integrity)
L'intégrité assure que les données et les systèmes n'ont pas été altérés, modifiés ou corrompus de manière accidentelle ou malveillante entre leur création et leur consultation.
* **Menaces types :** Modification non autorisée de fichiers système (`/etc/passwd`, `/etc/shadow`), corruption de base de données, falsification de paquets réseau (ARP/DNS Spoofing), injection de logiciels malveillants.
* **Mécanismes de protection :** Fonctions de hachage cryptographique (SHA-256, BLAKE3), signatures numériques (RSA, Ed25519), moniteurs d'intégrité de fichiers (File Integrity Monitoring - FIM), contrôle de versions immuable.

### C. La Disponibilité (Availability)
La disponibilité garantit que les services informatiques, les réseaux et les données restent opérationnels et accessibles aux utilisateurs légitimes chaque fois qu'ils en ont besoin.
* **Menaces types :** Attaques par déni de service distribué (DDoS volumétrique, SYN Flood), ransomwares bloquant l'accès au stockage, pannes matérielles, défaillances électriques.
* **Mécanismes de protection :** Redondance matérielle (RAID, alimentations doubles), équilibrage de charge (Load Balancing), clustering haute disponibilité (Kubernetes, AWS Auto-Scaling), sauvegardes hors-ligne (stratégie 3-2-1) et plans de reprise d'activité (PRA/PCA).

---

## 2. Authentification, Autorisation & Traçabilité (Le Modèle AAA)

Pour opérationnaliser la triade CIA, les architectures de sécurité mettent en œuvre le cadre AAA :
1. **Identification :** L'affirmation d'une identité (ex: transmettre son nom d'utilisateur `admin`).
2. **Authentification (Authentication) :** La preuve de cette identité (ex: mot de passe salé + jeton TOTP d'authentification multifacteur MFA).
3. **Autorisation (Authorization) :** La vérification des droits alloués à l'identité validée (ex: l'utilisateur a-t-il le droit de lire `/var/log/audit.log` ?).
4. **Traçabilité / Imputabilité (Accounting / Non-repudiation) :** L'enregistrement horodaté et infalsifiable de toutes les actions réalisées dans des journaux d'audit (Syslog, SIEM).

---

## 3. Exemple Pratique en Python : Calcul de l'Empreinte d'Intégrité

Voici comment un auditeur technique vérifie l'intégrité d'un fichier sensible en Python moderne à l'aide de la bibliothèque standard `hashlib` :

```python
import hashlib
from pathlib import Path

def verifier_integrite_fichier(chemin_fichier: Path, empreinte_attendue: str) -> bool:
    \"\"\"
    Calcule le hachage SHA-256 par blocs de 64 Ko pour éviter d'engorger la mémoire vive
    sur de gros fichiers, puis compare en temps constant.
    \"\"\"
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
    print(f"    Statut d'intégrité  : {'CONFORME' if est_valide else 'COMPROMIS / ALTÉRÉ'}")
    return est_valide
```

> [!IMPORTANT]
> Un compromis sur l'une des branches de la triade CIA peut entraîner l'effondrement de l'ensemble du système. Par exemple, si l'intégrité d'un système d'exploitation est violée par l'injection d'un rootkit noyau, la confidentialité des données qui y transitent et la disponibilité des processus ne peuvent plus être garanties.
""",
        "exercise": {
            "title": "Calculateur d'Intégrité SHA-256",
            "description_md": "Complétez la fonction Python `calculer_sha256(donnees: bytes) -> str` qui prend en entrée des octets bruts et retourne la chaîne hexadécimale du hachage SHA-256.",
            "starter_code": "import hashlib\n\ndef calculer_sha256(donnees: bytes) -> str:\n    # Votre code ici\n    pass\n",
            "solution_code": "import hashlib\n\ndef calculer_sha256(donnees: bytes) -> str:\n    return hashlib.sha256(donnees).hexdigest()\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Fondements de la Triade CIA",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quel pilier de la sécurité de l'information est violé lorsqu'un attaquant altère subrepticement les soldes bancaires dans une base de données ?",
                    "explanation_md": "La modification non autorisée ou la falsification de données constitue une violation directe du pilier d'Intégrité.",
                    "options_json": json.dumps([
                        {"text": "L'Intégrité", "is_correct": True},
                        {"text": "La Confidentialité", "is_correct": False},
                        {"text": "La Disponibilité", "is_correct": False},
                        {"text": "La Non-répudiation", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Pourquoi utilise-t-on `secrets.compare_digest()` plutôt que l'opérateur classique `==` pour comparer deux empreintes cryptographiques ?",
                    "explanation_md": "`secrets.compare_digest()` effectue une comparaison en temps constant, ce qui empêche un attaquant de déduire les octets valides en mesurant les variations de temps de calcul (Timing Attacks).",
                    "options_json": json.dumps([
                        {"text": "Pour empêcher les fuites par canaux auxiliaires temporels (Timing Attacks)", "is_correct": True},
                        {"text": "Parce que l'opérateur == ne supporte pas les chaînes de plus de 32 caractères", "is_correct": False},
                        {"text": "Pour convertir automatiquement la chaîne en majuscules", "is_correct": False},
                        {"text": "Parce que compare_digest chiffre la mémoire RAM", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },
    {
        "id": "les_cp_vol1_ch2",
        "module_id": "m_vol1_1",
        "slug": "ethique-legalite-responsabilite-professionnelle",
        "title": "Éthique, Cadre Légal (Art. 323-1 Code Pénal) & Déontologie",
        "summary": "Comprendre les limites légales strictes entre le hacking éthique autorisé et les infractions pénales relatives aux atteintes aux STAD.",
        "lesson_type": "article",
        "position": 2,
        "estimated_minutes": 30,
        "content_md": """# Éthique, Cadre Légal & Responsabilité du Pentesteur

La maîtrise des techniques offensives confère un pouvoir d'investigation considérable. Sans un cadre déontologique et juridique inébranlable, ce pouvoir bascule instantanément dans l'illégalité et la responsabilité pénale.

---

## 1. Le Cadre Juridique Français : Les Atteintes aux STAD

En droit français, la loi dite « Godfrain » a introduit dans le Code pénal les articles 323-1 et suivants relatifs aux **Systèmes de Traitement Automatisé de Données (STAD)** :

### Article 323-1 du Code Pénal :
> *« Le fait d'accéder ou de se maintenir, frauduleusement, dans tout ou partie d'un système de traitement automatisé de données est puni de **trois ans d'emprisonnement et de 100 000 euros d'amende**.*
> *Lorsqu'il en est résulté soit la suppression ou la modification de données contenues dans le système, soit une altération du fonctionnement de ce système, la peine est de **cinq ans d'emprisonnement et de 150 000 euros d'amende**.*
> *Lorsque cette infraction a été commise à l'encontre d'un STAD à caractère personnel mis en œuvre par l'État, les peines sont portées à sept ans et 300 000 euros. »*

### Article 323-2 du Code Pénal :
> *« Le fait d'entraver ou de fausser le fonctionnement d'un système de traitement automatisé de données est puni de **cinq ans d'emprisonnement et de 150 000 euros d'amende**. »* (Cible typique : attaques par déni de service DDoS).

### Article 323-3-1 du Code Pénal :
> La fabrication, détention ou diffusion sans motif légitime d'outils, programmes informatiques conçus ou spécialement adaptés pour commettre une ou plusieurs infractions (outils d'attaque, malwares, botnets) est sévèrement sanctionnée.

---

## 2. La Règle d'Or du Pentest : L'Ordre de Mission Écrit

Un test d'intrusion (Penetration Test) n'est **légal que s'il dispose d'une autorisation explicite, écrite, préalable et délimitée**, appelée **Ordre de Mission (Rules of Engagement - RoE)**.

Ce document contractuel doit obligatoirement stipuler :
1. **Le périmètre strict (Scope) :** Adresses IP, noms de domaine, plages d'adresses expressément autorisées. Tout scan ou requête dirigé contre une cible hors scope (ex: le fournisseur de cloud ou la passerelle voisine) constitue une infraction pénale !
2. **La période d'audit :** Dates et créneaux horaires précis (ex: du 10 au 14 novembre 2026, entre 20h00 et 04h00).
3. **Les méthodologies proscrites :** Interdiction des attaques par déni de service volumétrique, interdiction de l'ingénierie sociale physique sans accord spécifique, interdiction de détruire des données opérationnelles.
4. **Le protocole de contact d'urgence :** Numéros d'astreinte de l'équipe de sécurité du client en cas d'incident critique imprévu.

---

## 3. Les Trois Postures : White Hat, Grey Hat, Black Hat

| Posture | Intention | Autorisation | Légalité |
| :--- | :--- | :--- | :--- |
| **White Hat (Hacker Éthique)** | Défensive, protection, audit autorisé | Explicite et contractuelle | **100% Légal** |
| **Grey Hat** | Curiosité, recherche sans contrat, divulgation unilatérale | Absente ou ambiguë | **Illégal** (Poursuites possibles) |
| **Black Hat (Cybercriminel)** | Nuisance, extorsion, vol de secrets, sabotage | Aucune | **Infraction Criminelle Grave** |

> [!WARNING]
> La mention « C'était juste pour tester la sécurité » ou « Je n'ai rien volé » ne constitue en aucun cas une défense juridique valable devant un tribunal. L'accès non autorisé, même passif, suffit à caractériser l'infraction de l'article 323-1.
""",
        "exercise": {
            "title": "Validation du Périmètre d'Audit (In-Scope Verification)",
            "description_md": "Écrivez une fonction Python `est_dans_le_perimetre(cible_ip: str, perimetre_autorise: list[str]) -> bool` qui vérifie si une adresse IP auditée fait strictement partie de la liste autorisée.",
            "starter_code": "def est_dans_le_perimetre(cible_ip: str, perimetre_autorise: list[str]) -> bool:\n    # Votre code ici\n    pass\n",
            "solution_code": "def est_dans_le_perimetre(cible_ip: str, perimetre_autorise: list[str]) -> bool:\n    return cible_ip.strip() in [ip.strip() for ip in perimetre_autorise]\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Déontologie & Droit du Numérique",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quelle condition légale est indispensable pour débuter un test d'intrusion sur l'infrastructure d'un client ?",
                    "explanation_md": "L'Ordre de Mission signé (Rules of Engagement) est le seul document juridique qui autorise formellement l'auditeur à sonder les systèmes cibles sans enfreindre l'art. 323-1.",
                    "options_json": json.dumps([
                        {"text": "Un ordre de mission (RoE) écrit, daté et signé délimitant le périmètre", "is_correct": True},
                        {"text": "Un accord verbal donné lors d'une réunion informelle", "is_correct": False},
                        {"text": "Une attestation de réussite à une certification de pentest", "is_correct": False},
                        {"text": "L'utilisation exclusive d'adresses IP anonymisées par VPN", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Quelle est la peine maximale prévue par l'article 323-1 du Code Pénal pour un accès et maintien frauduleux simple dans un STAD ?",
                    "explanation_md": "L'article 323-1 alinéa 1 prévoit jusqu'à trois ans d'emprisonnement et 100 000 euros d'amende.",
                    "options_json": json.dumps([
                        {"text": "3 ans d'emprisonnement et 100 000 € d'amende", "is_correct": True},
                        {"text": "6 mois avec sursis et 5 000 € d'amende", "is_correct": False},
                        {"text": "10 ans de réclusion criminelle", "is_correct": False},
                        {"text": "Une simple injonction administrative de l'ANSSI", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },
    {
        "id": "les_cp_vol1_ch3",
        "module_id": "m_vol1_2",
        "slug": "architecture-materielle-cpu-memoire-os",
        "title": "Architecture Matérielle, Mémoire RAM, CPU & Systèmes d'Exploitation",
        "summary": "Comprendre comment le processeur exécute les instructions, la gestion de la mémoire virtuelle, les registres et le rôle du noyau (Kernel).",
        "lesson_type": "article",
        "position": 3,
        "estimated_minutes": 40,
        "content_md": """# Architecture Matérielle, Mémoire & Systèmes d'Exploitation

Pour comprendre comment les exploits de sécurité (dépassements de tampon, élévations de privilèges) fonctionnent au niveau le plus bas, il est indispensable de maîtriser l'architecture des ordinateurs selon le modèle de Von Neumann.

---

## 1. Le Modèle de Von Neumann & le Processeur (CPU)

Un processeur moderne (x86_64 ou ARM64) exécute des millions d'instructions élémentaires par seconde selon le cycle continu :
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
* **RIP (Instruction Pointer) :** Pointeur sur la prochaine instruction en langage machine à exécuter. Sa prise de contrôle par un attaquant permet de détourner le flux d'exécution du programme.
* **RSP (Stack Pointer) :** Pointeur sur le sommet de la pile mémoire (Stack).
* **RBP (Base Pointer) :** Pointeur sur la base du cadre de pile (Stack Frame) de la fonction courante.
* **RAX, RBX, RCX, RDX :** Registres de travail généraux pour le calcul arithmétique et le stockage temporaire de valeurs de retour de fonctions.

---

## 2. Organisation de la Mémoire Virtuelle d'un Processus

Lorsqu'un exécutable est lancé sous Linux ou Windows, le système d'exploitation lui alloue un espace d'adressage virtuel découpé en plusieurs segments distincts :

```
Adresse Haute (0x7FFFFFFFFFFF)
+-----------------------------------------------+
| Arguments du programme & Variables d'env.     |
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
1. **ASLR (Address Space Layout Randomization) :** Aléatorise l'emplacement en mémoire de la pile, du tas et des bibliothèques partagées à chaque exécution pour compliquer les attaques par débordement de tampon.
2. **DEP / NX (Data Execution Prevention / No-Execute bit) :** Marque les zones de données (Pile et Tas) comme non-exécutables pour empêcher l'exécution d'un shellcode injecté.
3. **Stack Canaries :** Valeurs aléatoires placées sur la pile juste avant l'adresse de retour. Si un débordement écrase le canari, le noyau termine immédiatement le processus (`Stack smashing detected`).

---

## 3. Espace Noyau (Kernel Space) vs Espace Utilisateur (User Space)

Le processeur sépare l'exécution en plusieurs anneaux de privilèges (Rings) :
* **Ring 0 (Kernel Space) :** Privilège maximal. Accès direct aux périphériques matériels, à la table des pages mémoire et aux registres système. Le noyau Linux s'exécute en Ring 0.
* **Ring 3 (User Space) :** Privilège restreint. Vos programmes Python, votre navigateur et le terminal s'exécutent en Ring 3. Pour écrire un fichier ou ouvrir un socket réseau, le programme doit obligatoirement formuler un **Appel Système (Syscall)** au noyau via l'instruction assembleur `syscall`.
""",
        "exercise": {
            "title": "Analyseur de Registres x86_64",
            "description_md": "Créez une fonction Python `identifier_role_registre(nom_registre: str) -> str` qui retourne 'INSTRUCTION_POINTER' pour RIP, 'STACK_POINTER' pour RSP, 'BASE_POINTER' pour RBP et 'GENERAL_PURPOSE' pour les autres.",
            "starter_code": "def identifier_role_registre(nom_registre: str) -> str:\n    # Votre code ici\n    pass\n",
            "solution_code": "def identifier_role_registre(nom_registre: str) -> str:\n    reg = nom_registre.upper().strip()\n    if reg == 'RIP':\n        return 'INSTRUCTION_POINTER'\n    elif reg == 'RSP':\n        return 'STACK_POINTER'\n    elif reg == 'RBP':\n        return 'BASE_POINTER'\n    return 'GENERAL_PURPOSE'\n",
            "difficulty": "intermediate"
        },
        "quiz": {
            "title": "Quiz - Architecture Matérielle & Mémoire",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quel registre processeur contient l'adresse mémoire de la prochaine instruction en langage machine à exécuter ?",
                    "explanation_md": "RIP (Instruction Pointer en 64 bits) ou EIP (en 32 bits) pointe sur la prochaine instruction à charger par le CPU.",
                    "options_json": json.dumps([
                        {"text": "RIP (Instruction Pointer)", "is_correct": True},
                        {"text": "RSP (Stack Pointer)", "is_correct": False},
                        {"text": "RAX (Accumulator Register)", "is_correct": False},
                        {"text": "RBP (Base Pointer)", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Quel mécanisme de sécurité du système d'exploitation rend aléatoires les adresses mémoire de la pile et du tas à chaque lancement de programme ?",
                    "explanation_md": "L'ASLR (Address Space Layout Randomization) empêche un attaquant de prédire avec certitude les adresses mémoire lors de l'exploitation d'une faille de corruption de mémoire.",
                    "options_json": json.dumps([
                        {"text": "L'ASLR (Address Space Layout Randomization)", "is_correct": True},
                        {"text": "Le bit NX / DEP", "is_correct": False},
                        {"text": "Le pare-feu iptables", "is_correct": False},
                        {"text": "Le contrôle de compte d'utilisateur (UAC)", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },
    {
        "id": "les_cp_vol1_lab1",
        "module_id": "m_vol1_2",
        "slug": "lab-01-02-construire-son-laboratoire-isole-virtualbox-kali",
        "title": "LAB 01 & 02 : Construire son Laboratoire Isolé de Cybersécurité",
        "summary": "Mise en place pas à pas d'un environnement de virtualisation hermétique sous VirtualBox avec Kali Linux, cible vulnérable et réseau Host-Only étanche.",
        "lesson_type": "lab",
        "position": 4,
        "estimated_minutes": 45,
        "content_md": """# LAB 01 & 02 : Construire son Laboratoire Virtuel Isolé

Pour s'entraîner en toute sécurité et conformément aux règles déontologiques de RayLab, vous devez impérativement opérer dans un laboratoire virtuel étanche, sans risque de propager du trafic malveillant sur votre réseau domestique ou professionnel.

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
             PAS D'ACCÈS AU ROUTEUR EXTERNE !
```

---

## 2. Configuration Réseau Sous VirtualBox

VirtualBox propose plusieurs modes de cartes réseau :
1. **NAT :** La machine virtuelle a accès à Internet via l'IP de l'hôte, mais les autres VMs ne peuvent pas la joindre directement.
2. **Accès par pont (Bridged) :** La VM reçoit une adresse IP directe de votre box Internet. **À PROSCRIRE pour des machines vulnérables**, car elles deviennent exposées à tous les appareils du réseau local !
3. **Réseau privé hôte (Host-Only) :** Crée un commutateur virtuel purement interne entre votre hôte et vos VMs. Les paquets ne quittent jamais votre ordinateur. **C'est le mode recommandé pour les labs d'exploitation !**

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

# 4. Création d'un environnement virtuel Python isolé pour RayLab
mkdir -p ~/raylab-workspace && cd ~/raylab-workspace
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip requests scapy cryptography
```

---

## 4. Règle des Snapshots (Instantanés)

> [!TIP]
> Avant de réaliser le moindre test d'intrusion ou de lancer un script de reverse shell, prenez un **Snapshot (Instantané)** de vos machines virtuelles dans l'interface de VirtualBox. En cas de blocage, de corruption du système de fichiers ou d'infection incontrôlée, vous pourrez restaurer la machine à son état sain en moins de 10 secondes !
""",
        "exercise": {
            "title": "Vérificateur de Masque Sous-Réseau",
            "description_md": "Écrivez une fonction Python `calculer_hotes_disponibles(cidr: int) -> int` qui calcule le nombre d'adresses IP utilisables pour des machines dans un sous-réseau IPv4 de préfixe CIDR donné (en soustrayant l'adresse réseau et l'adresse de broadcast).",
            "starter_code": "def calculer_hotes_disponibles(cidr: int) -> int:\n    # Votre code ici\n    pass\n",
            "solution_code": "def calculer_hotes_disponibles(cidr: int) -> int:\n    if cidr >= 31 or cidr <= 0:\n        return 0\n    return (2 ** (32 - cidr)) - 2\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Virtualisation & Isolation de Lab",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quel mode réseau VirtualBox garantit que le trafic entre les VMs ne sortira jamais sur le réseau local physique de votre domicile ?",
                    "explanation_md": "Le mode Réseau Privé Hôte (Host-Only) isole le trafic au sein d'un commutateur virtuel interne sur votre machine hôte.",
                    "options_json": json.dumps([
                        {"text": "Réseau privé hôte (Host-Only)", "is_correct": True},
                        {"text": "Accès par pont (Bridged)", "is_correct": False},
                        {"text": "NAT simple avec redirection de ports", "is_correct": False},
                        {"text": "Réseau générique", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Combien d'hôtes IP utilisables contient un sous-réseau au masque CIDR /24 (255.255.255.0) ?",
                    "explanation_md": "Un /24 dispose de 2^(32-24) = 256 adresses, moins l'adresse réseau (.0) et le broadcast (.255), soit 254 hôtes utilisables.",
                    "options_json": json.dumps([
                        {"text": "254 hôtes", "is_correct": True},
                        {"text": "256 hôtes", "is_correct": False},
                        {"text": "512 hôtes", "is_correct": False},
                        {"text": "128 hôtes", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },

    # -------------------------------------------------------------------------
    # VOLUME 2 : LINUX, BASH & SCRIPTING D'ADMINISTRATION
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol2_ch6",
        "module_id": "m_vol2_1",
        "slug": "commandes-linux-pipelines-filtres-permissions-octales",
        "title": "Commandes Linux, Pipelines, Filtres (grep, awk, sed) & Permissions",
        "summary": "Maîtriser les flux de redirection standard (stdout, stderr), l'enchaînement de commandes et le calcul des permissions octales POSIX.",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 40,
        "content_md": """# Commandes Linux, Pipelines, Filtres & Permissions POSIX

Dans l'univers de la cybersécurité, le terminal Linux est votre interface principale de travail. La quasi-totalité des serveurs cibles, des pare-feux et des conteneurs s'administrent en ligne de commande.

---

## 1. La Philosophie des Flux Standard & Pipelines UNIX

Sous UNIX, « tout est fichier », et tout programme lancé dispose automatiquement de trois descripteurs de flux fondamentaux :
* **Descripteur 0 : Entrée standard (stdin)** — flux entrant depuis le clavier ou un pipe.
* **Descripteur 1 : Sortie standard (stdout)** — flux de sortie normale des résultats.
* **Descripteur 2 : Sortie d'erreur (stderr)** — flux des messages d'erreur et alertes.

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
Le tube (`|`) injecte directement la sortie standard du programme de gauche dans l'entrée standard du programme de droite.

Exemple d'extraction d'adresses IP uniques connectées à un serveur :
```bash
netstat -ant | grep ESTABLISHED | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr
```

---

## 2. Les Outils de Filtrage Essentiels : `grep`, `awk` et `sed`

* **`grep` (Global Regular Expression Print) :** Recherche de motifs textuels ou d'expressions régulières.
  ```bash
  # Trouver tous les échecs de connexion SSH dans le journal d'authentification
  grep -i "failed password" /var/log/auth.log
  ```
* **`awk` :** Langage complet de traitement par colonnes. Par défaut, `awk` découpe chaque ligne selon les espaces.
  ```bash
  # Afficher le nom d'utilisateur ($1) et son shell par défaut ($7) depuis /etc/passwd
  awk -F: '{print $1, "utilise le shell :", $7}' /etc/passwd
  ```
* **`sed` (Stream Editor) :** Édition de flux à la volée (rechercher/remplacer).
  ```bash
  # Remplacer toutes les occurrences de HTTP par HTTPS dans un fichier de configuration
  sed -i 's/http:/https:/g' /etc/nginx/sites-available/default
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
* **Execute (x) :** Valeur octale **1** (binaire `001`). Permet d'exécuter un script ou de traverser un répertoire (`cd`).

```
Droits :  r w x   r - x   r - -
Binaire : 1 1 1   1 0 1   1 0 0
Octal :     7       5       4
Total :  chmod 754 mon_script.sh
```

### Les Permissions Spéciales Majeures pour le Pentesteur :
* **SUID (Set User ID) — Octal 4000 :** Lorsqu'un binaire possède le bit SUID (ex: `-rwsr-xr-x`), il s'exécute toujours avec les privilèges de son **propriétaire**, souvent `root`, quel que soit l'utilisateur qui le lance !
* **SGID (Set Group ID) — Octal 2000 :** Exécute avec les privilèges du groupe propriétaire.
* **Sticky Bit — Octal 1000 :** Présent sur `/tmp` (`drwxrwxrwt`), il empêche un utilisateur de supprimer le fichier d'un autre utilisateur même dans un dossier partagé en écriture.

Pour trouver tous les binaires SUID sur un serveur Linux lors d'une phase d'élévation de privilèges :
```bash
find / -perm -4000 -type f 2>/dev/null
```
""",
        "exercise": {
            "title": "Convertisseur de Droits Symboliques en Octal",
            "description_md": "Écrivez une fonction Python `symb_to_octal(mode: str) -> str` qui prend une chaîne de 9 caractères (ex: 'rwxr-xr--') et retourne sa représentation octale à 3 chiffres (ex: '754').",
            "starter_code": "def symb_to_octal(mode: str) -> str:\n    # Votre code ici\n    pass\n",
            "solution_code": "def symb_to_octal(mode: str) -> str:\n    valeurs = {'r': 4, 'w': 2, 'x': 1, '-': 0}\n    triplets = [mode[0:3], mode[3:6], mode[6:9]]\n    octal = ''\n    for t in triplets:\n        score = sum(valeurs.get(c, 0) for c in t)\n        octal += str(score)\n    return octal\n",
            "difficulty": "intermediate"
        },
        "quiz": {
            "title": "Quiz - Permissions & Terminal Linux",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quelle commande permet de rediriger la sortie d'erreur (stderr) vers le fichier /dev/null sans impacter la sortie standard ?",
                    "explanation_md": "Le chiffre 2 désigne le descripteur de fichier de stderr, donc `2>/dev/null` redirige spécifiquement les erreurs.",
                    "options_json": json.dumps([
                        {"text": "2>/dev/null", "is_correct": True},
                        {"text": "1>/dev/null", "is_correct": False},
                        {"text": ">> /dev/null", "is_correct": False},
                        {"text": "< /dev/null", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Pourquoi les binaires possédant le bit de permission SUID (valeur octale 4000) intéressent-ils particulièrement les auditeurs en phase d'élévation de privilèges ?",
                    "explanation_md": "Un binaire SUID appartenant à root s'exécute avec les privilèges de root même s'il est lancé par un utilisateur ordinaire, offrant un vecteur d'escalade en cas de faille.",
                    "options_json": json.dumps([
                        {"text": "Car ils s'exécutent avec les privilèges de leur propriétaire (souvent root)", "is_correct": True},
                        {"text": "Car ils sont automatiquement chiffrés en mémoire", "is_correct": False},
                        {"text": "Car ils contournent le pare-feu du noyau", "is_correct": False},
                        {"text": "Car ils ne peuvent jamais être effacés par l'administrateur", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },
    {
        "id": "les_cp_vol2_proj1",
        "module_id": "m_vol2_2",
        "slug": "projet-01-script-administration-audit-securite-linux",
        "title": "PROJET 01 : Développement d'un Script d'Audit Système et Durcissement",
        "summary": "Conception et écriture d'un script Bash professionnel qui audite les comptes UID 0, les binaires SUID dangereux et les ports en écoute sur un serveur Linux.",
        "lesson_type": "interactive",
        "position": 2,
        "estimated_minutes": 50,
        "content_md": """# PROJET 01 : Script d'Administration & Audit de Sécurité Linux

Dans le cadre du **Projet 01 de CyberPath**, vous allez développer un outil d'inspection automatisé en Bash capable de dresser un bilan de sécurité rapide sur tout serveur Debian ou Ubuntu fraîchement provisionné.

---

## 1. Objectifs Techniques du Script d'Audit

Le script doit vérifier automatiquement :
1. **Les comptes utilisateurs anormaux :** Repérer tout compte autre que `root` possédant l'identifiant UID 0 dans `/etc/passwd`.
2. **Les mots de passe vides :** Vérifier qu'aucun compte n'a de champ de mot de passe vide dans `/etc/shadow`.
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
# Script d'Audit Rapide de Durcissement Linux
# Usage : sudo ./audit_securite.sh
# =============================================================================

set -euo pipefail

# Couleurs pour le terminal
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

echo -e "${BLUE}=====================================================${NC}"
echo -e "${BLUE}       AUDIT DE SÉCURITÉ SYSTÈME LINUX — RAYLAB      ${NC}"
echo -e "${BLUE}=====================================================${NC}"
echo -e "Date de l'audit : $(date '+%Y-%m-%d %H:%M:%S')"
echo -e "Hôte audité     : $(hostname -f) ($(uname -srm))\\n"

# 1. Vérification des privilèges d'exécution
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}[!] ERREUR : Ce script d'audit doit être exécuté en root (sudo).${NC}"
   exit 1
fi

# 2. Vérification des comptes UID 0
echo -e "${YELLOW}[*] Vérification des comptes avec UID 0 (Privilèges root) :${NC}"
comptes_uid0=$(awk -F: '($3 == 0) {print $1}' /etc/passwd)
for compte in $comptes_uid0; do
    if [[ "$compte" == "root" ]]; then
        echo -e "  [+] Compte root légitime identifié : ${GREEN}root${NC}"
    else
        echo -e "  ${RED}[ALERTE CRITIQUE] Compte suspect avec UID 0 détecté : $compte${NC}"
    fi
done

# 3. Vérification des binaires SUID critiques
echo -e "\\n${YELLOW}[*] Inventaire des binaires SUID critiques dans /usr/bin :${NC}"
suid_critiques=("bash" "sh" "python" "python3" "perl" "ruby" "vim" "nano" "nmap" "find")
for binaire in "${suid_critiques[@]}"; do
    if find /usr/bin -name "$binaire" -perm -4000 2>/dev/null | grep -q "$binaire"; then
        echo -e "  ${RED}[DANGER SUID GTFOBINS] Binaire exploitable en root : /usr/bin/$binaire${NC}"
    fi
done
echo -e "  ${GREEN}[✓] Contrôle des binaires SUID dangereux terminé.${NC}"

# 4. Vérification de la configuration SSH
echo -e "\\n${YELLOW}[*] Audit de la configuration SSH (/etc/ssh/sshd_config) :${NC}"
if [[ -f /etc/ssh/sshd_config ]]; then
    root_login=$(grep -Ei '^\\s*PermitRootLogin' /etc/ssh/sshd_config || echo "PermitRootLogin non spécifié (défaut)")
    echo -e "  Statut Root Login : ${root_login}"
    
    auth_pass=$(grep -Ei '^\\s*PasswordAuthentication' /etc/ssh/sshd_config || echo "PasswordAuthentication non spécifié")
    echo -e "  Statut Mot de Passe : ${auth_pass}"
else
    echo -e "  ${BLUE}[i] Aucun service SSH installé sur cet hôte.${NC}"
fi

# 5. Vérification des ports TCP en écoute
echo -e "\\n${YELLOW}[*] Services en écoute sur toutes les interfaces (0.0.0.0) :${NC}"
ss -tulpn | grep LISTEN | grep '0.0.0.0' | while read -r line; do
    echo -e "  ${YELLOW}->${NC} $line"
done

echo -e "\\n${GREEN}=====================================================${NC}"
echo -e "${GREEN}             RAPPORT D'AUDIT TERMINÉ                 ${NC}"
echo -e "${GREEN}=====================================================${NC}"
```

---

## 3. Recommandations de Durcissement (CIS Benchmarks)

À l'issue de cet audit, voici les trois règles immédiates à appliquer :
1. Désactiver la connexion directe en root sous SSH : `PermitRootLogin no`.
2. Imposer l'authentification par clé publique SSH (Ed25519) et désactiver les mots de passe : `PasswordAuthentication no`.
3. Supprimer les permissions SUID superflues sur les utilitaires administratifs : `chmod u-s /usr/bin/find`.
""",
        "exercise": {
            "title": "Détecteur de Comptes UID 0 en Python",
            "description_md": "Écrivez une fonction Python `trouver_comptes_uid_zero(contenu_passwd: str) -> list[str]` qui prend le contenu textuel d'un fichier `/etc/passwd` et retourne la liste de tous les noms d'utilisateurs possédant l'UID 0.",
            "starter_code": "def trouver_comptes_uid_zero(contenu_passwd: str) -> list[str]:\n    # Votre code ici\n    pass\n",
            "solution_code": "def trouver_comptes_uid_zero(contenu_passwd: str) -> list[str]:\n    resultats = []\n    for ligne in contenu_passwd.strip().split('\\n'):\n        if not ligne or ligne.startswith('#'):\n            continue\n        champs = ligne.split(':')\n        if len(champs) >= 3 and champs[2] == '0':\n            resultats.append(champs[0])\n    return resultats\n",
            "difficulty": "intermediate"
        },
        "quiz": {
            "title": "Quiz - Durcissement de Système Linux",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quelle directive dans /etc/ssh/sshd_config permet d'interdire totalement la connexion directe de l'administrateur suprême via SSH ?",
                    "explanation_md": "`PermitRootLogin no` bloque toute tentative de connexion SSH en tant que root, obligeant les administrateurs à se connecter avec un compte nominatif puis à utiliser `sudo`.",
                    "options_json": json.dumps([
                        {"text": "PermitRootLogin no", "is_correct": True},
                        {"text": "DenyRoot yes", "is_correct": False},
                        {"text": "DisableUser root", "is_correct": False},
                        {"text": "RootAuth false", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Que signifie la directive `set -euo pipefail` placée au début d'un script d'administration Bash professionnel ?",
                    "explanation_md": "Elle force le script à s'interrompre immédiatement en cas d'erreur de commande (-e), de variable non initialisée (-u) ou d'échec au sein d'un pipeline (-o pipefail).",
                    "options_json": json.dumps([
                        {"text": "Interrompre immédiatement le script en cas d'erreur ou de variable indéfinie", "is_correct": True},
                        {"text": "Exécuter le script en mode multi-cœurs", "is_correct": False},
                        {"text": "Désactiver l'affichage des logs dans la console", "is_correct": False},
                        {"text": "Chiffrer le code source du script en mémoire", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },

    # -------------------------------------------------------------------------
    # VOLUME 3 : MANUEL COMPLET DE PYTHON (POO, ALGORITHMES & SÉCURITÉ)
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol3_ch9",
        "module_id": "m_vol3_1",
        "slug": "python-moderne-syntaxe-typage-pep484-structures",
        "title": "Python Moderne 3.12+ : Typage Statique, Match-Case & Structures",
        "summary": "Maîtriser les spécifications modernes de Python : annotations de type PEP 484, filtrage par motif (structural pattern matching) et structures de données optimisées.",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 45,
        "content_md": """# Python Moderne 3.12+ : Typage PEP 484, Pattern Matching & Collections

Issu des **Parties I, II et III du Manuel Complet de Python**, ce cours vous initie aux pratiques d'ingénierie logicielle contemporaines de Python 3.12+. En cybersécurité comme en développement d'API, l'écriture de code typé, prévisible et robuste est une exigence absolue.

---

## 1. Le Typage Statique Optionnel (PEP 484 & PEP 526)

Python demeure un langage à typage dynamique fort, mais les annotations de types permettent d'éliminer des catégories entières de bogues avant l'exécution grâce aux analyseurs statiques (`mypy`, `pyright`) :

```python
from typing import Final, Optional
from dataclasses import dataclass

# Constante immuable avec type explicite
MAX_TENTATIVES_AUTH: Final[int] = 5

@dataclass(frozen=True)
class ReglePareFeu:
    port: int
    protocole: str
    action: str  # 'ALLOW' ou 'DENY'
    description: Optional[str] = None

def evaluer_regle(paquet_port: int, regle: ReglePareFeu) -> bool:
    \"\"\"Retourne True si le paquet est autorisé par la règle.\"\"\"
    if paquet_port == regle.port and regle.action == "ALLOW":
        return True
    return False
```

---

## 2. Le Structural Pattern Matching (`match / case` introduit en Python 3.10)

Le `match/case` remplace avantageusement les longues séries de `if / elif / else` en permettant la déconstruction directe des structures d'objets, de dictionnaires ou de tuples :

```python
def analyser_reponse_serveur(reponse: dict[str, any]) -> str:
    match reponse:
        case {"status": 200, "data": {"user_id": uid, "role": "admin"}}:
            return f"[+] Administrateur authentifié : ID={uid}"
        case {"status": 200, "data": {"user_id": uid}}:
            return f"[+] Utilisateur standard connecté : ID={uid}"
        case {"status": 401 | 403, "error": message}:
            return f"[!] Échec d'autorisation : {message}"
        case {"status": int(code), "error": message} if code >= 500:
            return f"[CRITICAL] Erreur serveur interne ({code}) : {message}"
        case _:
            return "[?] Format de réponse réseau non reconnu."
```

---

## 3. Les Collections Optimisées de la Bibliothèque Standard

Le module `collections` fournit des conteneurs hautement performants :
* **`collections.deque` :** File à double extrémité avec insertion et suppression en temps constant $O(1)$ à gauche comme à droite (contrairement aux listes Python ordinaires où `list.pop(0)` s'exécute en $O(n)$).
* **`collections.Counter` :** Idéal pour compter les fréquences d'adresses IP ou de mots de passe lors de l'analyse forensique de logs.
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
""",
        "exercise": {
            "title": "Analyseur de Codes d'État HTTP avec Pattern Matching",
            "description_md": "Écrivez une fonction Python `categoriser_http(status_code: int) -> str` qui utilise `match/case` pour retourner 'SUCCESS' (200-299), 'REDIRECTION' (300-399), 'CLIENT_ERROR' (400-499), 'SERVER_ERROR' (500-599) ou 'UNKNOWN'.",
            "starter_code": "def categoriser_http(status_code: int) -> str:\n    # Utilisez match / case\n    pass\n",
            "solution_code": "def categoriser_http(status_code: int) -> str:\n    match status_code:\n        case code if 200 <= code <= 299:\n            return 'SUCCESS'\n        case code if 300 <= code <= 399:\n            return 'REDIRECTION'\n        case code if 400 <= code <= 499:\n            return 'CLIENT_ERROR'\n        case code if 500 <= code <= 599:\n            return 'SERVER_ERROR'\n        case _:\n            return 'UNKNOWN'\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Python Moderne & Typage",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quelle structure de données de la bibliothèque standard Python offre une complexité temporelle de O(1) pour l'ajout et le retrait d'éléments à ses deux extrémités ?",
                    "explanation_md": "`collections.deque` est implémentée sous forme de liste doublement chaînée optimisée pour l'insertion et l'extraction rapide en tête et en queue.",
                    "options_json": json.dumps([
                        {"text": "collections.deque", "is_correct": True},
                        {"text": "list", "is_correct": False},
                        {"text": "tuple", "is_correct": False},
                        {"text": "collections.OrderedDict", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "À quoi servent les annotations de type PEP 484 lors de l'exécution normale par le runtime CPython standard ?",
                    "explanation_md": "En Python standard, les annotations de type ne modifient pas l'exécution ni les performances : elles sont conservées dans `__annotations__` et servent aux linters statiques (mypy) et aux IDE.",
                    "options_json": json.dumps([
                        {"text": "Elles sont ignorées à l'exécution mais validées par les analyseurs statiques (mypy)", "is_correct": True},
                        {"text": "Elles provoquent un plantage immédiat si une variable reçoit un autre type", "is_correct": False},
                        {"text": "Elles compilent le script en code assembleur natif x86_64", "is_correct": False},
                        {"text": "Elles chiffront les variables locales en mémoire", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },
    {
        "id": "les_cp_vol3_ch10",
        "module_id": "m_vol3_2",
        "slug": "poo-avancee-encapsulation-property-dunder-methods",
        "title": "Programmation Orientée Objet : Encapsulation, @property & Dunder",
        "summary": "Architecture logicielle robuste : constructeur __init__, encapsulation stricte, décorateur @property, et méthodes spéciales (__str__, __repr__, __eq__).",
        "lesson_type": "article",
        "position": 2,
        "estimated_minutes": 50,
        "content_md": """# Programmation Orientée Objet Avancée & Méthodes Spéciales

Tiré des **Parties IV et V du Manuel Complet de Python**, ce chapitre décortique l'ingénierie orientée objet en Python : encapsulation des états sensibles, validation de données par accesseurs et surcharge d'opérateurs via les méthodes dunder (*double underscore*).

---

## 1. Encapsulation & Propriétés Décorées (`@property`)

En Python, la convention veut qu'un attribut préfixé par un trait de soulignement simple `_nom` soit considéré comme privé par convention, tandis qu'un double soulignement `__nom` active le *name mangling* (renommage interne par l'interpréteur pour éviter les collisions d'héritage).

Le décorateur `@property` permet de définir des accesseurs (getters) et des mutateurs (setters) élégants avec validation automatique :

```python
class CibleAudit:
    def __init__(self, ip: str, port: int):
        self.ip = ip
        self.port = port # Déclenche automatiquement le setter de validation

    @property
    def port(self) -> int:
        \"\"\"Getter de lecture du port.\"\"\"
        return self._port

    @port.setter
    def port(self, valeur: int) -> None:
        \"\"\"Setter avec validation rigoureuse des plages réseau valides.\"\"\"
        if not isinstance(valeur, int):
            raise TypeError("Le port réseau doit être un entier.")
        if not (1 <= valeur <= 65535):
            raise ValueError(f"Port invalide : {valeur}. La plage autorisée est 1..65535.")
        self._port = valeur

    def est_port_privilegie(self) -> bool:
        \"\"\"Retourne True si le port est < 1024 (réservé aux services root sous Linux).\"\"\"
        return self._port < 1024
```

---

## 2. Les Méthodes Spéciales Dunder (`__repr__`, `__str__`, `__eq__`, `__hash__`)

Les méthodes dunder permettent d'intégrer vos propres classes au comportement natif du langage Python :

```python
class HoteReseau:
    def __init__(self, ip: str, mac: str):
        self.ip = ip
        self.mac = mac.upper()

    def __repr__(self) -> str:
        \"\"\"Représentation formelle non ambiguë destinée aux développeurs et logs.\"\"\"
        return f"HoteReseau(ip={self.ip!r}, mac={self.mac!r})"

    def __str__(self) -> str:
        \"\"\"Représentation lisible destinée à l'utilisateur final.\"\"\"
        return f"{self.ip} [{self.mac}]"

    def __eq__(self, other: object) -> bool:
        \"\"\"Deux hôtes réseau sont considérés identiques si leur adresse MAC physique est identique.\"\"\"
        if not isinstance(other, HoteReseau):
            return NotImplemented
        return self.mac == other.mac

    def __hash__(self) -> int:
        \"\"\"Permet d'utiliser l'objet comme clé de dictionnaire ou dans un ensemble (set).\"\"\"
        return hash(self.mac)
```

---

## 3. Gestionnaire de Contexte Personnalisé (`__enter__` et `__exit__`)

Le protocole de gestionnaire de contexte permet d'utiliser l'instruction `with` pour garantir la libération des ressources (fermeture de sockets, libération de verrous) même en cas d'exception non gérée :

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
        # Retourne False pour laisser propager l'exception si une erreur est survenue
        return False
```
""",
        "exercise": {
            "title": "Création d'une Classe CibleSécurisée avec Validation",
            "description_md": "Créez une classe `CibleAudit` dont le constructeur prend `ip: str` et `score_risque: int`. Implémentez un getter et un setter pour `score_risque` garantissant que le score est un entier compris entre 0 et 100 inclus (lève `ValueError` sinon).",
            "starter_code": "class CibleAudit:\n    def __init__(self, ip: str, score_risque: int):\n        # Votre code ici\n        pass\n",
            "solution_code": "class CibleAudit:\n    def __init__(self, ip: str, score_risque: int):\n        self.ip = ip\n        self.score_risque = score_risque\n\n    @property\n    def score_risque(self) -> int:\n        return self._score_risque\n\n    @score_risque.setter\n    def score_risque(self, valeur: int) -> None:\n        if not isinstance(valeur, int) or not (0 <= valeur <= 100):\n            raise ValueError(\"Le score de risque doit être compris entre 0 et 100\")\n        self._score_risque = valeur\n",
            "difficulty": "intermediate"
        },
        "quiz": {
            "title": "Quiz - Programmation Orientée Objet",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quelle méthode spéciale Python permet de définir le comportement de l'opérateur d'égalité == entre deux instances d'une classe ?",
                    "explanation_md": "La méthode `__eq__(self, other)` est appelée automatiquement par Python lors de l'évaluation de `a == b`.",
                    "options_json": json.dumps([
                        {"text": "__eq__", "is_correct": True},
                        {"text": "__cmp__", "is_correct": False},
                        {"text": "__equals__", "is_correct": False},
                        {"text": "__match__", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Quelles sont les deux méthodes obligatoires qu'une classe doit implémenter pour pouvoir être utilisée avec l'instruction 'with' ?",
                    "explanation_md": "Le protocole de Context Manager requiert `__enter__` (qui alloue la ressource) et `__exit__` (qui la libère à la fin du bloc).",
                    "options_json": json.dumps([
                        {"text": "__enter__ et __exit__", "is_correct": True},
                        {"text": "__init__ et __del__", "is_correct": False},
                        {"text": "__start__ et __stop__", "is_correct": False},
                        {"text": "__open__ et __close__", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    }
]

import json
print(f"Loaded {len(LESSONS_VOL1_TO_3)} lessons for Volumes 1-3.")
