# -*- coding: utf-8 -*-
"""
Données pédagogiques exhaustives pour les Volumes 4, 5 et 6 de CyberPath & Python Hacking.
Couvre les réseaux, Wireshark, Scapy, les attaques MITM ARP, le Web HTTP et l'Injection SQL.
"""

import json

LESSONS_VOL4_TO_6 = [
    # -------------------------------------------------------------------------
    # VOLUME 4 : RÉSEAUX INFORMATIQUES & PROTOCOLES
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol4_ch12",
        "module_id": "m_vol4_1",
        "slug": "modeles-osi-tcpip-encapsulation-adressage-mac-ip",
        "title": "Modèles OSI vs TCP/IP : Encapsulation, Adressage Réseau & Protocoles Clés",
        "summary": "Maîtrisez le parcours complet d'une donnée à travers les 7 couches du modèle OSI et les 4 couches TCP/IP : encapsulation, en-têtes, positionnement rigoureux d'ICMP et ARP, et diagnostic réseau.",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 45,
        "content_md": """# Modèles OSI vs TCP/IP : Encapsulation & Architecture des Flux Réseau

> **Fiche Pédagogique V4**  
> **Niveau :** Niveau 1 – Beginner  
> **Durée estimée :** 45 minutes (15 min Théorie • 20 min Laboratoire Pratique • 10 min Évaluation & Synthèse)  
> **Prerequisites :** Notions de base sur les systèmes de numération (binaire et hexadécimal) et compréhension élémentaire d'un réseau local (LAN).

---

## 1. Objectifs Pédagogiques Mesurables

À l'issue de cette leçon, vous serez capable de :
1. **Distinguer** sans ambiguïté les 7 couches du modèle théorique OSI et les 4 couches du modèle opérationnel TCP/IP.
2. **Décrire** le processus mécanique d'encapsulation et de désencapsulation d'une trame à travers chaque en-tête.
3. **Positionner rigoureusement** les protocoles pivots tels qu'**ICMP (Couche 3)** et **ARP (Couche 2 / Liaison)** selon les normes IETF.
4. **Comprendre la réalité de l'adresse MAC** : du constructeur (BIA) à la randomisation logicielle moderne (Privacy MAC sous iOS/Android/Windows).
5. **Disséquer** une trame réseau réelle issue d'une capture Wireshark octet par octet (Ethernet II, IPv4, ICMP Echo Request).
6. **Diagnostiquer** les pannes d'infrastructure et les anomalies de connectivité en isolant la couche réseau défaillante (Bottom-Up Troubleshooting).

---

## 2. Contexte Opérationnel Réel

Dans le quotidien d'un ingénieur réseau ou d'un analyste en cybersécurité, plus de 70% des incidents de connectivité et des alertes de sécurité sont initialement qualifiés par rapport à leur couche réseau. 

Lorsqu'un serveur web ne répond plus, l'analyste applique la méthode de **dépannage en entonnoir (Bottom-Up Troubleshooting)** :
* *Le lien physique est-il actif (Couche 1) ?*
* *La passerelle répond-elle aux requêtes ARP locales (Couche 2) ?*
* *Le paquet IP est-il routé et le ping ICMP traverse-t-il les routeurs (Couche 3) ?*
* *Le port TCP 443 est-il ouvert et le handshake est-il validé (Couche 4) ?*
* *Le certificat TLS et la requête applicative HTTP sont-ils valides (Couches 6 et 7) ?*

---

## 3. Correspondance entre Modèle OSI et Modèle Internet TCP/IP

Le modèle **OSI (Open Systems Interconnection)**, standardisé par l'ISO en 1984, est une référence architecturale universelle en 7 couches. Le modèle **TCP/IP (RFC 1122)** est l'implémentation opérationnelle pragmatique qui régit l'ensemble de l'Internet moderne.

```
+------------------------------------+--------------------------+-----------------------+
|        MODÈLE OSI (7 COUCHES)      |    MODÈLE TCP/IP (RFC 1122) |   UNITÉ DE DONNÉE (PDU) |
+------------------------------------+--------------------------+-----------------------+
| 7. Application (HTTP, DNS, SSH)    |                          |                       |
| 6. Présentation (TLS, ASCII, JSON) | 4. APPLICATION           | Message / Payload     |
| 5. Session (RPC, Sockets, NetBIOS) |                          |                       |
+------------------------------------+--------------------------+-----------------------+
| 4. Transport (TCP, UDP, SCTP)      | 3. TRANSPORT             | Segment (TCP) /       |
|                                    |                          | Datagramme (UDP)      |
+------------------------------------+--------------------------+-----------------------+
| 3. Réseau (IPv4, IPv6, ICMP, IPsec)| 2. INTERNET              | Paquet (Packet)       |
+------------------------------------+--------------------------+-----------------------+
| 2. Liaison de Données (Ethernet,   |                          |                       |
|    Wi-Fi 802.11, ARP, VLAN 802.1Q) | 1. ACCÈS RÉSEAU          | Trame (Frame)         |
| 1. Physique (Câbles RJ45, Fibres,  |    (Network Interface)   | Bits (0 et 1)         |
|    Ondes Radio)                    |                          |                       |
+------------------------------------+--------------------------+-----------------------+
```

---

## 4. Précision Technique Critique : Le Positionnement d'ICMP, d'ARP et de l'Adresse MAC

Trois éléments fondamentaux sont fréquemment imprécis dans les documentations vulgarisées :

### A. ICMP (Internet Control Message Protocol – RFC 792) : Couche 3 (Internet / Réseau)
* **Pourquoi pas en Couche 4 (Transport) ?**  
  Bien que les messages ICMP soient transportés à l'intérieur de paquets IP (champ *Protocol = 1* dans l'en-tête IP), ICMP **ne fournit aucun service de transport applicatif**.
* Il ne dispose **ni de numéros de port source/destination**, ni de mécanisme d'ordonnancement, ni de contrôle de flux.
* ICMP est une partie intégrante et indissociable de la couche Internet : son rôle unique est de **transporter des messages de contrôle, de diagnostic et de signalement d'erreurs** (ex : *Echo Request/Reply [ping]*, *Destination Unreachable*, *Time to Live [TTL] Expired [traceroute]*).

### B. ARP (Address Resolution Protocol – RFC 826) : Couche 2 (Liaison de Données / Accès Réseau)
* **Pourquoi pas en Couche 3 (Réseau) ?**  
  ARP ne transporte pas de données à travers des routeurs et **n'utilise pas d'en-tête IP**. Il est directement encapsulé dans les trames Ethernet avec son propre code EtherType (`0x0806`).
* Son rôle est strictement local au domaine de diffusion (*broadcast domain*) de Couche 2 : il résout la correspondance entre une adresse logique de couche supérieure (IPv4) et une adresse matérielle physique (MAC).

### C. L'Adresse MAC : Entre Burned-In Address (BIA) et Randomisation Moderne
* **Structure :** Une adresse MAC standard (EUI-48) comporte 48 bits (6 octets hexadécimaux, ex: `00:1A:2B:3C:4D:5E`). Les 3 premiers octets constituent l'**OUI (Organizationally Unique Identifier)** attribué par l'IEEE au fabricant de la puce, et les 3 derniers octets constituent l'identifiant de la carte.
* **Non immuable :** Historiquement appelée BIA (*Burned-In Address*) car gravée dans la ROM de l'interface réseau, l'adresse MAC utilisée par le système d'exploitation n'est **absolument pas figée**. Elle est configurable par logiciel (*MAC Spoofing* via `ip link set dev eth0 address` sous Linux ou via le registre Windows).
* **Randomisation MAC pour la vie privée :** Pour contrer le traçage des utilisateurs via les requêtes de sonde Wi-Fi (*Probe Requests*) dans les lieux publics, tous les systèmes d'exploitation modernes (**iOS Private Wi-Fi Address**, **Android MAC Randomization**, **Windows Random Hardware Addresses**) génèrent par défaut une adresse MAC aléatoire différente pour chaque réseau Wi-Fi !
* **Bits de contrôle du premier octet :**
  * **Bit 0 (I/G - Individual/Group) :** `0` = Unicast (machine individuelle), `1` = Multicast.
  * **Bit 1 (U/L - Universal/Local) :** `0` = Universelle (OUI IEEE officiel du fabricant), `1` = **Localement administrée** (adresse modifiée ou randomisée logiciellement).

---

## 5. Le Mécanisme de l'Encapsulation et de la Désencapsulation

Chaque couche réseau ajoute un en-tête (*Header*) spécifique contenant les métadonnées nécessaires à son homologue récepteur.

```
[ Données Applicatives (Requête HTTP GET) ]                 (Couche 7 / Application)
                       |
                       v  + En-tête TCP (Port source 54321, Port cible 80)
[ En-tête TCP | Données Applicatives ]                     (Couche 4 : Segment)
                       |
                       v  + En-tête IP (IP Source 192.168.1.50, IP Cible 93.184.216.34)
[ En-tête IP | En-tête TCP | Données Applicatives ]        (Couche 3 : Paquet)
                       |
                       v  + En-tête Ethernet (MAC Source, MAC Cible) et FCS (Checksum)
[ En-tête Eth | En-tête IP | En-tête TCP | Données | FCS ] (Couche 2 : Trame)
                       |
                       v  Conversion en signal physique
0 1 1 0 1 0 0 1 0 1 1 0 1 1 0 1 0 0 1 0 1 1 0 1 0 1 1 0    (Couche 1 : Bits)
```

Lors de la réception, le processus inverse (**désencapsulation**) est appliqué : la carte réseau valide le CRC, retire l'en-tête Ethernet, transmet le paquet au noyau IP, qui retire l'en-tête IP, transmet le segment à la pile TCP, et la charge utile applicative est remise au processus écoutant sur le port cible (ex : serveur Nginx ou Apache).

---

## 6. Dissection Réelle d'une Trame Wireshark (Echo Request ICMP)

Examinons une véritable trame réseau capturée lors d'une commande `ping 192.168.1.1` :

```text
0000   00 15 5d 01 2a 3b 00 15 5d 01 2a 3c 08 00 45 00
0010   00 54 f3 a2 40 00 40 01 a1 75 c0 a8 01 32 c0 a8
0020   01 01 08 00 4d 5b 00 01 00 01 61 62 63 64 65 66
```

### Découpage Octet par Octet :
1. **Couche 2 (En-tête Ethernet II - 14 octets) :**
   * `00 15 5d 01 2a 3b` (Octets 0 à 5) : **MAC Destination** (Passerelle / Routeur).
   * `00 15 5d 01 2a 3c` (Octets 6 à 11) : **MAC Source** (Machine émettrice).
   * `08 00` (Octets 12 et 13) : **EtherType** (`0x0800` = IPv4, `0x0806` = ARP).
2. **Couche 3 (En-tête IPv4 - 20 octets) :**
   * `45` (Octet 14) : Version IPv4 (`4`) et Longueur d'en-tête IHL = 5 mots de 32 bits (`20 octets`).
   * `40` (Octet 22) : **TTL (Time to Live)** = 64 sauts.
   * `01` (Octet 23) : **Protocole supérieur = 1 (ICMP - RFC 792)** (si `06` = TCP, si `11` = UDP).
   * `c0 a8 01 32` (Octets 26 à 29) : **IP Source** (`192.168.1.50`).
   * `c0 a8 01 01` (Octets 30 à 33) : **IP Destination** (`192.168.1.1`).
3. **Protocole de Contrôle Réseau (ICMP - RFC 792) :**
   * `08` (Octet 34) : **Type ICMP = 8 (Echo Request)** (le ping d'émission).
   * `00` (Octet 35) : **Code ICMP = 0** (aucun sous-code).
   * `4d 5b` (Octets 36 et 37) : Checksum ICMP.
   * `61 62 63 64 ...` (Octets 42+) : Données de test (alphabet ASCII `abcdef...`).

---

## 7. Synthèse des Références Officielles

* **RFC 791 :** *Internet Protocol (IPv4 Specification)* – Standard de la couche Internet.
* **RFC 792 :** *Internet Control Message Protocol (ICMP)* – Diagnostic et contrôle de couche 3.
* **RFC 826 :** *Ethernet Address Resolution Protocol (ARP)* – Résolution locale de couche 2.
* **RFC 793 :** *Transmission Control Protocol (TCP)* – Protocole orienté connexion fiable.
* **RFC 1122 :** *Requirements for Internet Hosts -- Communication Layers* – Spécification normative des couches TCP/IP.""",
        "exercise": {
            "title": "Dissecteur Réseau Python : Analyse d'une Trame Hexadécimale Wireshark",
            "description_md": """Développez une fonction Python `dissequer_trame_hex(trame_hex: str) -> dict` qui prend une chaîne hexadécimale brute (contenant les octets d'une trame Ethernet + IPv4 + ICMP séparés ou non par des espaces) et extrait un dictionnaire avec :
- `mac_dst`: l'adresse MAC destination formatée (ex: '00:15:5D:01:2A:3B')
- `mac_src`: l'adresse MAC source formatée (ex: '00:15:5D:01:2A:3C')
- `ethertype`: l'EtherType en hexadécimal (ex: '0x0800')
- `ip_src`: l'adresse IPv4 source décimale pointée (ex: '192.168.1.50')
- `ip_dst`: l'adresse IPv4 destination décimale pointée (ex: '192.168.1.1')
- `protocole_l3`: 'ICMP' si l'octet de protocole vaut 1, sinon 'AUTRE'
- `type_icmp`: le code numérique du type ICMP (ex: 8 pour Echo Request).""",
            "starter_code": """def dissequer_trame_hex(trame_hex: str) -> dict:
    # Votre code de dissection ici
    pass
""",
            "solution_code": """def dissequer_trame_hex(trame_hex: str) -> dict:
    # Nettoyage et conversion en octets
    nettoyee = trame_hex.replace(' ', '').replace('\n', '').strip()
    octets = bytes.fromhex(nettoyee)
    if len(octets) < 38:
        raise ValueError('Trame trop courte pour contenir Ethernet + IPv4 + ICMP')

    mac_dst = ':'.join(f'{b:02X}' for b in octets[0:6])
    mac_src = ':'.join(f'{b:02X}' for b in octets[6:12])
    ethertype = f'0x{octets[12]:02X}{octets[13]:02X}'

    # En-tête IPv4 (commence à l'octet 14)
    proto_num = octets[23]
    ip_src = '.'.join(str(b) for b in octets[26:30])
    ip_dst = '.'.join(str(b) for b in octets[30:34])

    # En-tête ICMP (commence à l'octet 34)
    type_icmp = octets[34]

    return {
        'mac_dst': mac_dst,
        'mac_src': mac_src,
        'ethertype': ethertype,
        'ip_src': ip_src,
        'ip_dst': ip_dst,
        'protocole_l3': 'ICMP' if proto_num == 1 else 'AUTRE',
        'type_icmp': type_icmp
    }
""",
            "difficulty": "intermediate"
        },
        "quiz": {
            "title": "Quiz Évaluatif - Modèles Réseau, Encapsulation, ICMP & ARP",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "À quelle couche du modèle OSI et de la pile TCP/IP le protocole ICMP (RFC 792) appartient-il rigoureusement ?",
                    "explanation_md": "ICMP relève strictement de la Couche 3 (Réseau / Internet). Bien qu'encapsulé dans un paquet IP (champ Protocole = 1), il ne possède pas de ports et assure le diagnostic et le contrôle réseau, sans rôle de transport applicatif.",
                    "options_json": json.dumps([
                        {"text": "Couche 3 Réseau (OSI) / Couche Internet (TCP/IP)", "is_correct": True},
                        {"text": "Couche 4 Transport (OSI) / Couche Transport (TCP/IP)", "is_correct": False},
                        {"text": "Couche 2 Liaison de données (OSI) / Accès Réseau (TCP/IP)", "is_correct": False},
                        {"text": "Couche 7 Application (OSI) / Application (TCP/IP)", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Pourquoi le protocole ARP (RFC 826) est-il classé dans la Couche 2 (Liaison de données / Accès Réseau) ?",
                    "explanation_md": "ARP est encapsulé directement dans des trames Ethernet (EtherType 0x0806). Il ne possède pas d'en-tête IP et opère exclusivement sur le domaine de diffusion local de niveau 2 pour associer une IP à une MAC.",
                    "options_json": json.dumps([
                        {"text": "Il est encapsulé directement dans une trame Ethernet sans en-tête IP et opère sur le broadcast local", "is_correct": True},
                        {"text": "Il est routé à travers tous les routeurs d'Internet", "is_correct": False},
                        {"text": "Il utilise des numéros de ports TCP pour transmettre ses requêtes", "is_correct": False},
                        {"text": "Il crypte les données de session applicative", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "L'adresse MAC d'un équipement moderne est-elle immuable à vie ?",
                    "explanation_md": "Non. Même si l'adresse constructeur est inscrite en ROM (Burned-In Address), l'adresse MAC manipulée par l'OS peut être modifiée logiciellement (MAC spoofing) et est randomisée par défaut sur les OS modernes (iOS, Android, Windows) pour protéger la vie privée sur les réseaux Wi-Fi.",
                    "options_json": json.dumps([
                        {"text": "Non : elle est modifiable logiciellement et randomisée par défaut sur les OS mobiles et récents", "is_correct": True},
                        {"text": "Oui : c'est un identifiant matériel scellé physiquement dans le silicium impossible à modifier", "is_correct": False},
                        {"text": "Oui : l'IEEE interdit formellement toute modification au niveau du pilote réseau", "is_correct": False},
                        {"text": "Non : elle change automatiquement à chaque redémarrage de la machine sur tous les systèmes", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },
    {
        "id": "les_cp_vol4_ch14",
        "module_id": "m_vol4_2",
        "slug": "handshake-trois-voies-tcp-drapeaux-gestion-sockets",
        "title": "Le Handshake à 3 Voies TCP (SYN, SYN-ACK, ACK) & Drapeaux",
        "summary": "Étude détaillée de la RFC 793 : poignée de main TCP, séquence des drapeaux (SYN, ACK, FIN, RST, PSH, URG), états de connexion et analyse des attaques de déni de service SYN Flood.",
        "lesson_type": "article",
        "position": 2,
        "estimated_minutes": 45,
        "content_md": """# Le Handshake TCP à 3 Voies, Drapeaux & États Réseau

Le protocole **TCP (Transmission Control Protocol - RFC 793)** est un protocole orienté connexion, fiable et ordonné. Contrairement à UDP qui transmet sans garantie de livraison, TCP établit formellement une session bilatérale avant d'échanger le moindre octet de données.

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

1. **Étape 1 : Le SYN (Synchronize)** : Le client choisit un numéro de séquence initial aléatoire (ISN - *Initial Sequence Number*) et l'envoie avec le drapeau `SYN=1`.
2. **Étape 2 : Le SYN-ACK** : Le serveur reçoit la demande, alloue une structure mémoire (socket TCB), choisit son propre ISN et confirme la réception en incrémentant le numéro de séquence du client (`Ack = ISN_C + 1`).
3. **Étape 3 : Le ACK (Acknowledge)** : Le client confirme la réception de l'ISN du serveur. La session passe à l'état `ESTABLISHED`.

---

## 2. Les Drapeaux TCP (TCP Control Bits)

Dans l'en-tête TCP de 20 octets, 6 drapeaux binaires (Flags) contrôlent la machine à états de la session :

| Drapeau | Nom Complet | Rôle Opérationnel | Utilisation Pentest / Sécurité |
| :--- | :--- | :--- | :--- |
| **SYN** | Synchronize | Initialise une connexion et négocie les ISN. | Utilisé pour les scans de ports (SYN Stealth scan `nmap -sS`). |
| **ACK** | Acknowledgment | Confirme la bonne réception d'octets de données. | Tout segment suivant le premier SYN a ACK=1. |
| **FIN** | Finish | Demande la fermeture propre et ordonnée de la session. | Utilisé dans le scan FIN (`nmap -sF`). |
| **RST** | Reset | Interrompt brutalement la connexion (rejet ou erreur). | Envoyé par un port fermé lorsqu'il reçoit un SYN. |
| **PSH** | Push | Demande à la pile TCP de délivrer immédiatement les données au buffer de l'application sans attendre que le paquet soit plein. | Utilisé pour les shells interactifs et frappes clavier. |
| **URG** | Urgent | Indique que des données prioritaires sont présentes (champ Urgent Pointer). | Scan XMAS (`nmap -sX`). |

---

## 3. Vecteur d'Attaque : L'Attaque SYN Flood (Déni de Service)

Un attaquant envoie une rafale massive de paquets `SYN` avec des adresses IP sources falsifiées (IP Spoofing) sans jamais envoyer le troisième segment `ACK`.
* Le serveur alloue des ressources en mémoire et reste bloqué à l'état `SYN_RECEIVED` en attendant le `ACK` jusqu'au timeout.
* Lorsque la table des connexions en attente (SYN Backlog) est saturée, le serveur refuse toute nouvelle connexion légitime.

### Contre-Mesure Défensive : Les SYN Cookies
Le noyau Linux implémente les **SYN Cookies** (`sysctl -w net.ipv4.tcp_syncookies=1`) : au lieu de stocker la connexion dans le backlog, le serveur encode les informations de la session dans le numéro de séquence initial lui-même à l'aide d'un hash cryptographique avec clé secrète. Aucune mémoire n'est allouée tant que le client n'a pas répondu par un `ACK` valide !
""",
        "exercise": {
            "title": "Interprétation des Réponses de Ports TCP",
            "description_md": "Écrivez une fonction Python `analyser_reponse_tcp(drapeaux_recus: str) -> str` qui retourne 'OUVERT' si les drapeaux contiennent à la fois 'SYN' et 'ACK', 'FERMÉ' s'ils contiennent 'RST', et 'INCONNU' sinon.",
            "starter_code": "def analyser_reponse_tcp(drapeaux_recus: str) -> str:\n    # Votre code ici\n    pass\n",
            "solution_code": "def analyser_reponse_tcp(drapeaux_recus: str) -> str:\n    flags = drapeaux_recus.upper()\n    if 'SYN' in flags and 'ACK' in flags:\n        return 'OUVERT'\n    elif 'RST' in flags:\n        return 'FERMÉ'\n    return 'INCONNU'\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Le Protocole TCP & Handshake",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quel paquet est renvoyé par un système d'exploitation standard lorsqu'il reçoit un segment SYN sur un port TCP fermé ?",
                    "explanation_md": "Conformément à la RFC 793, un port fermé répond par un segment portant le drapeau RST (Reset) pour notifier le rejet de la connexion.",
                    "options_json": json.dumps([
                        {"text": "Un paquet RST (Reset)", "is_correct": True},
                        {"text": "Un paquet FIN (Finish)", "is_correct": False},
                        {"text": "Un paquet ICMP Echo Reply", "is_correct": False},
                        {"text": "Aucune réponse (Drop silencieux)", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Comment la technologie des SYN Cookies protège-t-elle un serveur contre les attaques de déni de service SYN Flood ?",
                    "explanation_md": "Les SYN Cookies permettent de ne pas allouer d'espace mémoire dans la table des sessions tant que le client n'a pas renvoyé le segment ACK final validant le cookie.",
                    "options_json": json.dumps([
                        {"text": "En évitant d'allouer de la mémoire tant que le handshake n'est pas finalisé", "is_correct": True},
                        {"text": "En bloquant automatiquement l'adresse IP de l'attaquant au niveau du commutateur", "is_correct": False},
                        {"text": "En basculant le trafic TCP sur le protocole UDP", "is_correct": False},
                        {"text": "En chiffrant les données transmises en RSA-4096", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },

    # -------------------------------------------------------------------------
    # VOLUME 5 : ANALYSE RÉSEAU, WIRESHARK & SCAPY
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol5_scapy",
        "module_id": "m_vol5_1",
        "slug": "dissection-injection-paquets-scapy-python",
        "title": "Forge & Injection de Paquets Réseau avec Scapy (Python)",
        "summary": "Apprenez à manipuler les couches 2, 3 et 4 en Python pur à l'aide de Scapy : création de trames Ethernet, paquets IP, balayage ICMP et envoi réseau.",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 50,
        "content_md": """# Dissection & Forge Artisanale de Paquets avec Scapy

Issu du manuel de référence **Python Hacking Éthique (Chapitres 3 et 4)**, ce cours explore la bibliothèque Python **Scapy**, le standard mondial pour l'artisanat de paquets, l'audit réseau, le fuzzing et la découverte de vulnérabilités.

---

## 1. La Syntaxe d'Empilement des Couches dans Scapy

Scapy utilise l'opérateur de division `/` pour empiler les couches de la pile réseau de gauche à droite (de la couche basse vers la couche haute) :

```python
from scapy.all import Ether, IP, TCP, Raw

# Création d'un paquet TCP complet encapsulé dans IP et Ethernet
trame = Ether(dst="aa:bb:cc:11:22:33") / IP(dst="192.168.1.1") / TCP(dport=80, flags="S") / Raw(b"GET / HTTP/1.0\\r\\n\\r\\n")

# Inspection détaillée des champs de chaque couche
trame.show()
```

Lorsque vous instanciez un paquet, Scapy calcule automatiquement les valeurs par défaut non spécifiées (sommes de contrôle Checksum, longueurs de trames, protocole sous-jacent, adresses IP sources).

---

## 2. Balayage ICMP Ping Sweep Automatisé en Python

Voici un script complet permettant de sonder un sous-réseau entier en quelques secondes à l'aide de requêtes `ICMP Echo Request` (Type 8) :

```python
from scapy.all import IP, ICMP, sr, conf
import sys

# Désactivation des messages verbeux internes de Scapy
conf.verb = 0

def balayer_reseau_icmp(plage_cidr: str) -> list[str]:
    \"\"\"
    Envoie des requêtes ICMP Echo Request et récupère les hôtes actifs.
    Exemple de plage : '192.168.1.0/24'
    \"\"\"
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

## 3. Les Fonctions d'Envoi Fondamentales de Scapy

* **`send(paquet)` :** Envoie des paquets en **Couche 3** (Scapy gère la couche 2 Ethernet automatiquement).
* **`sendp(trame)` :** Envoie des trames en **Couche 2** (vous devez spécifier l'en-tête `Ether()` et l'interface réseau).
* **`sr(paquet)` :** Send & Receive en Couche 3. Retourne deux listes : les paquets ayant reçu une réponse et les paquets sans réponse.
* **`sr1(paquet)` :** Variante de `sr()` qui retourne uniquement la **première** réponse reçue (idéal pour tester l'état d'un port TCP).
* **`sniff(filter="...", prn=callback)` :** Capture le trafic réseau en temps réel avec des filtres BPF (Berkeley Packet Filters).
""",
        "exercise": {
            "title": "Création d'une Trame SYN Scapy",
            "description_md": "Écrivez une fonction Python `creer_syn_packet(ip_cible: str, port_cible: int)` qui utilise Scapy pour retourner un paquet combinant `IP(dst=ip_cible)` et `TCP(dport=port_cible, flags='S')`.",
            "starter_code": "from scapy.all import IP, TCP\n\ndef creer_syn_packet(ip_cible: str, port_cible: int):\n    # Votre code ici\n    pass\n",
            "solution_code": "from scapy.all import IP, TCP\n\ndef creer_syn_packet(ip_cible: str, port_cible: int):\n    return IP(dst=ip_cible) / TCP(dport=port_cible, flags='S')\n",
            "difficulty": "intermediate"
        },
        "quiz": {
            "title": "Quiz - Manipulation de Paquets Scapy",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Quel opérateur Python est surchargé par Scapy pour empiler les différentes couches de protocoles réseau ?",
                    "explanation_md": "Scapy surcharge l'opérateur de division `/` pour assembler les couches, par exemple : `Ether() / IP() / TCP()`.",
                    "options_json": json.dumps([
                        {"text": "L'opérateur de division /", "is_correct": True},
                        {"text": "L'opérateur d'addition +", "is_correct": False},
                        {"text": "L'opérateur pipe |", "is_correct": False},
                        {"text": "L'opérateur de décalage >>", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Quelle fonction Scapy doit être utilisée lorsqu'on souhaite envoyer une trame personnalisée de niveau Couche 2 (incluant Ether()) ?",
                    "explanation_md": "`sendp()` permet l'émission directe au niveau Couche 2 (Liaison de données), alors que `send()` opère en Couche 3.",
                    "options_json": json.dumps([
                        {"text": "sendp()", "is_correct": True},
                        {"text": "send()", "is_correct": False},
                        {"text": "emit()", "is_correct": False},
                        {"text": "inject()", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },
    {
        "id": "les_cp_vol5_arp",
        "module_id": "m_vol5_2",
        "slug": "attaque-man-in-the-middle-arp-spoofing-scapy-defense",
        "title": "Attaque Man-in-the-Middle (MITM) : Empoisonnement ARP & Défense DAI",
        "summary": "Étude mécanique approfondie de l'ARP Cache Poisoning : détournement de flux réseau, activation du routage sysctl ip_forward et contre-mesures de sécurité (DAI, tables statiques).",
        "lesson_type": "article",
        "position": 2,
        "estimated_minutes": 55,
        "content_md": """# Attaque Man-in-the-Middle : Empoisonnement de Table ARP & Contre-Mesures

Basé sur le **Chapitre 5 de Python Hacking Éthique**, ce cours décortique l'une des attaques de réseau local (LAN) les plus redoutables : l'usurpation d'adresses ARP (**ARP Cache Poisoning / ARP Spoofing**), permettant à un attaquant de positionner sa machine au milieu des communications chiffrées ou en clair.

---

## 1. La Vulnérabilité Intrinsèque du Protocole ARP (RFC 826)

Conçu au début des années 1980 pour des réseaux locaux de confiance, le protocole ARP souffre d'un défaut de conception majeur : **il ne dispose d'aucun mécanisme d'authentification ou de signature cryptographique**.
* Tout hôte accepte des réponses ARP (**Gratuitous ARP Reply** - `op=2`) même s'il n'a jamais émis de requête !
* Lorsqu'une machine reçoit une réponse ARP affirmant qu'une IP est associée à une nouvelle adresse MAC, elle met immédiatement à jour sa table ARP locale sans vérification.

---

## 2. Mécanique de l'Attaque en Sablier (Man-in-the-Middle)

```
        AVANT L'ATTAQUE (Flux Normal) :
[ Victime (192.168.1.50) ] --------------------> [ Passerelle / Box (192.168.1.1) ]
     MAC: AA:AA:AA:AA:AA:AA                             MAC: GG:GG:GG:GG:GG:GG

------------------------------------------------------------------------------------

        PENDANT L'ATTAQUE (Empoisonnement Bilatéral) :
[ Victime (192.168.1.50) ]                      [ Passerelle / Box (192.168.1.1) ]
  Table ARP Victime :                             Table ARP Passerelle :
  192.168.1.1 -> EE:EE:EE:EE:EE:EE                192.168.1.50 -> EE:EE:EE:EE:EE:EE
              \\                                        /
               \\                                      /
                v                                     v
                 [ ATTAQUANT KALI (192.168.1.100) ]
                     MAC: EE:EE:EE:EE:EE:EE
                   (sysctl net.ipv4.ip_forward = 1)
```

1. L'attaquant envoie en boucle des paquets ARP falsifiés à la Victime : *« L'adresse IP 192.168.1.1 (la passerelle) est à mon adresse MAC EE:EE... »*.
2. L'attaquant envoie en boucle des paquets ARP falsifiés à la Passerelle : *« L'adresse IP 192.168.1.50 (la victime) est à mon adresse MAC EE:EE... »*.
3. L'attaquant active le transfert de paquets sur son noyau Linux :
   ```bash
   sudo sysctl -w net.ipv4.ip_forward=1
   ```
   Désormais, tout le trafic Web, DNS ou VoIP de la victime transite par la machine de l'attaquant avant d'être retransmis vers Internet sans interruption de service !

---

## 3. Implémentation du Script Python d'Audit ARP avec Scapy

```python
from scapy.all import ARP, send, getmacbyip
import time
import sys

def forger_reponse_arp(ip_cible: str, ip_usurpee: str):
    \"\"\"
    Envoie un paquet ARP op=2 ('is-at') associant l'IP usurpée à notre propre MAC.
    \"\"\"
    mac_cible = getmacbyip(ip_cible)
    if not mac_cible:
        print(f"[!] Impossible de résoudre l'adresse MAC pour l'IP : {ip_cible}")
        return False
        
    paquet = ARP(
        op=2,                 # Réponse ARP
        pdst=ip_cible,        # IP de la machine à tromper
        hwdst=mac_cible,      # MAC physique de la cible
        psrc=ip_usurpee       # IP dont on s'attribue l'identité
    )
    send(paquet, verbose=False)
    return True

def restaurer_tables(ip_cible: str, ip_source: str):
    \"\"\"Restaure l'état d'origine des tables ARP en envoyant les vraies adresses MAC.\"\"\"
    mac_cible = getmacbyip(ip_cible)
    mac_source = getmacbyip(ip_source)
    paquet = ARP(op=2, pdst=ip_cible, hwdst=mac_cible, psrc=ip_source, hwsrc=mac_source)
    send(paquet, count=5, verbose=False)
    print(f"[*] Tables ARP saines restaurées entre {ip_cible} et {ip_source}.")
```

---

## 4. Contre-Mesures & Défense en Entreprise

1. **Dynamic ARP Inspection (DAI) :** Fonctionnalité des commutateurs managés (Cisco, Juniper) qui inspecte chaque paquet ARP transitant sur les ports et compare l'association IP/MAC avec la base de données de confiance DHCP Snooping. Toute fausse réponse est instantanément rejetée au niveau du matériel !
2. **Tables ARP Statiques (`arp -s`) :** Définir de manière immuable l'adresse MAC de la passerelle par défaut sur les serveurs critiques pour empêcher toute modification dynamique.
3. **Détection SOC :** Un système de détection d'intrusions (ex: `arpwatch`, Snort, Suricata) lève une alerte immédiate lorsqu'il observe un conflit : deux adresses IP différentes revendiquant la même adresse MAC.
""",
        "exercise": {
            "title": "Détecteur d'Adresses MAC Dupliquées",
            "description_md": "Écrivez une fonction Python `detecter_usurpation_arp(table_arp: dict[str, str]) -> list[str]` qui prend un dictionnaire associant des adresses IP à des adresses MAC, et retourne la liste des adresses MAC qui apparaissent plus d'une fois (signe caractéristique d'un spoofing).",
            "starter_code": "def detecter_usurpation_arp(table_arp: dict[str, str]) -> list[str]:\n    # Votre code ici\n    pass\n",
            "solution_code": "from collections import Counter\n\ndef detecter_usurpation_arp(table_arp: dict[str, str]) -> list[str]:\n    compteur = Counter(table_arp.values())\n    return [mac for mac, count in compteur.items() if count > 1]\n",
            "difficulty": "intermediate"
        },
        "quiz": {
            "title": "Quiz - Attaques MITM & Sécurité ARP",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Pourquoi l'attaquant doit-il impérativement activer 'net.ipv4.ip_forward = 1' sur sa machine Linux lors d'une attaque Man-in-the-Middle ?",
                    "explanation_md": "Par défaut, Linux rejette les paquets dont l'IP de destination ne lui appartient pas. L'activation du forward IP permet au noyau de retransmettre les paquets interceptés vers leur vraie destination pour ne pas couper Internet à la victime.",
                    "options_json": json.dumps([
                        {"text": "Pour retransmettre les paquets interceptés vers leur destination réelle sans bloquer la victime", "is_correct": True},
                        {"text": "Pour masquer l'adresse MAC de l'attaquant dans les logs", "is_correct": False},
                        {"text": "Pour forcer le chiffrement automatique du trafic en HTTPS", "is_correct": False},
                        {"text": "Pour saturer la bande passante du routeur", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Quelle technologie sur les commutateurs réseau managés (switches) permet de bloquer automatiquement les attaques d'ARP Spoofing ?",
                    "explanation_md": "Dynamic ARP Inspection (DAI) vérifie la validité des trames ARP en les confrontant à la table de baux du DHCP Snooping.",
                    "options_json": json.dumps([
                        {"text": "Dynamic ARP Inspection (DAI)", "is_correct": True},
                        {"text": "Spanning Tree Protocol (STP)", "is_correct": False},
                        {"text": "Network Address Translation (NAT)", "is_correct": False},
                        {"text": "VLAN Trunking Protocol (VTP)", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    },

    # -------------------------------------------------------------------------
    # VOLUME 6 : ARCHITECTURE WEB & INJECTIONS SQL
    # -------------------------------------------------------------------------
    {
        "id": "les_cp_vol6_sqli",
        "module_id": "m_vol6_2",
        "slug": "lab-05-mecanismes-injection-sql-requetes-preparees",
        "title": "LAB 05 : Anatomie des Injections SQL & Requêtes Préparées",
        "summary": "Comprendre et reproduire les différentes familles d'injections SQL (In-Band UNION, Error-Based, Blind Boolean/Time) et implémenter la remédiation par requêtes paramétrées.",
        "lesson_type": "lab",
        "position": 1,
        "estimated_minutes": 55,
        "content_md": """# LAB 05 : Anatomie des Injections SQL & Requêtes Préparées

L'**Injection SQL (SQL Injection - SQLi)** figure depuis plus de 20 ans parmi les vulnérabilités les plus dévastatrices répertoriées par l'OWASP (Catégorie A03:2021 - Injection). Elle permet à un attaquant de briser le contexte de données pour injecter des commandes SQL directement interprétées par le moteur de base de données.

---

## 1. La Cause Première : La Concaténation Naïve de Chaînes

L'erreur fondamentale réside dans l'assemblage dynamique d'une requête SQL par simple concaténation de texte avec des entrées fournies par l'utilisateur :

```python
# ❌ CODE CRITIQUEMENT VULNÉRABLE :
def authentifier_utilisateur_vulnerable(username_input: str, password_input: str):
    # L'entrée utilisateur est directement collée dans la chaîne SQL !
    requete = f"SELECT id, role FROM users WHERE username = '{username_input}' AND password = '{password_input}'"
    return db.execute(requete)
```

Si un attaquant saisit dans le champ utilisateur :
```sql
admin' --
```
La requête exécutée par la base de données devient :
```sql
SELECT id, role FROM users WHERE username = 'admin' --' AND password = '...'
```
Les caractères `--` (ou `#` sous MySQL) indiquent un commentaire SQL. Toute la clause de vérification du mot de passe est purement et simplement ignorée ! L'attaquant se connecte instantanément en tant qu'administrateur sans connaître le mot de passe.

---

## 2. Les Différentes Familles d'Injections SQL

```
                       [ INJECTIONS SQL ]
                        /       |        \\
                       /        |         \\
         [ IN-BAND ]      [ INFERENTIAL ]   [ OUT-OF-BAND ]
          /       \\          (BLIND)          (DNS / HTTP)
    UNION-Based  Error-Based   /        \\
                        Boolean-Based  Time-Based
```

### A. L'Injection In-Band UNION (`UNION SELECT`)
Permet de joindre le résultat de la requête légitime avec les tables confidentielles du système :
```sql
' UNION SELECT null, username, password, email FROM users--
```

### B. L'Injection Blind Temporelle (Time-Based Blind)
Lorsque l'application n'affiche aucun message d'erreur ni aucune donnée à l'écran, l'attaquant force la base de données à marquer une pause temporelle pour déduire les données caractère par caractère :
```sql
' OR (SELECT CASE WHEN (SUBSTR(password,1,1)='a') THEN pg_sleep(5) ELSE pg_sleep(0) END FROM users WHERE username='admin')--
```
Si la page met 5 secondes à répondre, le premier caractère du mot de passe de l'administrateur est validé comme étant la lettre 'a' !

---

## 3. Le Remède Définitif : Les Requêtes Préparées (Paramétrage)

La seule méthode de remédiation infaillible et pérenne est l'utilisation stricte de **Requêtes Préparées avec Paramètres Liés (Prepared Statements / Parameterized Queries)** :

```python
# ✅ CODE TOTALEMENT SÉCURISÉ :
def authentifier_utilisateur_securise(username_input: str, password_input: str):
    # La requête est pré-compilée par le SGBD avec des marqueurs de position '?'
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

Dans une requête préparée, le moteur SQL compile la syntaxe de la requête **avant** de recevoir les données. Même si l'entrée utilisateur contient des guillemets, des apostrophes ou `UNION SELECT`, le moteur SQL traite l'intégralité de l'entrée comme une valeur littérale (donnée pure) et non comme du code exécutable. L'injection est mathématiquement impossible.
""",
        "exercise": {
            "title": "Générateur de Requêtes Préparées Sécurisées",
            "description_md": "Écrivez une fonction Python `construire_requete_securisee(table: str, colonne: str) -> str` qui génère la chaîne de requête préparée standard utilisant un point d'interrogation comme marqueur de paramètre (ex: 'SELECT * FROM users WHERE email = ?'). Lève ValueError si le nom de table ou de colonne contient des caractères non alphanumériques.",
            "starter_code": "def construire_requete_securisee(table: str, colonne: str) -> str:\n    # Votre code ici\n    pass\n",
            "solution_code": "def construire_requete_securisee(table: str, colonne: str) -> str:\n    if not table.isidentifier() or not colonne.isidentifier():\n        raise ValueError(\"Caractères non autorisés dans les identifiants SQL\")\n    return f\"SELECT * FROM {table} WHERE {colonne} = ?\"\n",
            "difficulty": "intermediate"
        },
        "quiz": {
            "title": "Quiz - Injections SQL & Défense",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "Pourquoi l'utilisation de requêtes préparées (Prepared Statements) élimine-t-elle le risque d'injection SQL ?",
                    "explanation_md": "Le SGBD sépare la structure de la commande SQL de ses données. Les entrées utilisateur sont transmises après la compilation et sont strictement traitées comme des chaînes littérales.",
                    "options_json": json.dumps([
                        {"text": "Car le SGBD sépare la phase d'analyse syntaxique du traitement des données transmises", "is_correct": True},
                        {"text": "Car elle supprime automatiquement les guillemets des entrées utilisateur", "is_correct": False},
                        {"text": "Car elle chiffre la base de données avec AES-256", "is_correct": False},
                        {"text": "Car elle interdit l'utilisation de comptes administrateurs", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Comment appelle-t-on la technique d'injection SQL où l'attaquant déduit l'existence d'une information en mesurant le temps de réponse du serveur ?",
                    "explanation_md": "L'injection SQL aveugle temporelle (Time-Based Blind SQLi) exploite des fonctions comme `sleep()` ou `pg_sleep()` pour exfiltrer des données par inférence temporelle.",
                    "options_json": json.dumps([
                        {"text": "Time-Based Blind SQL Injection", "is_correct": True},
                        {"text": "UNION-Based SQL Injection", "is_correct": False},
                        {"text": "Error-Based SQL Injection", "is_correct": False},
                        {"text": "Cross-Site Scripting (XSS)", "is_correct": False}
                    ]),
                    "points": 10
                }
            ]
        }
    }
]

print(f"Loaded {len(LESSONS_VOL4_TO_6)} lessons for Volumes 4-6.")
