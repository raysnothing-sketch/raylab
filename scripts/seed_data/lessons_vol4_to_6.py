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
        "title": "Modèles OSI vs TCP/IP : Encapsulation & Adressage Réseau",
        "summary": "Comprendre le parcours d'une donnée à travers les 7 couches du modèle OSI et les 4 couches TCP/IP, l'encapsulation et les en-têtes.",
        "lesson_type": "article",
        "position": 1,
        "estimated_minutes": 40,
        "content_md": """# Modèles OSI vs TCP/IP : Encapsulation & Architecture des Flux

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

## 2. Le Mécanisme de l'Encapsulation des Données

Lorsqu'une application (ex: un client Web qui demande `GET /index.html`) envoie une donnée sur le réseau, chaque couche inférieure lui ajoute son propre en-tête (Header) :

```
[ Données Applicatives ]                               (Couche 7)
       |
       v  + Ajout de l'en-tête TCP (Ports source et destination)
[ En-tête TCP | Données Applicatives ]                 (Couche 4 : Segment)
       |
       v  + Ajout de l'en-tête IP (Adresses IP source et cible, TTL)
[ En-tête IP | En-tête TCP | Données Applicatives ]    (Couche 3 : Paquet)
       |
       v  + Ajout de l'en-tête Ethernet (Adresses MAC) et du FCS (Checksum)
[ En-tête Eth | En-tête IP | En-tête TCP | Données | FCS ] (Couche 2 : Trame)
```

À la réception, le destinataire effectue l'opération inverse, appelée **Désencapsulation** : il vérifie la somme de contrôle de la trame, retire l'en-tête Ethernet, traite l'en-tête IP, réassemble le segment TCP et livre les données brutes à l'application destinataire.

---

## 3. Adressage Physique (MAC) vs Adressage Logique (IP)

* **L'Adresse MAC (Media Access Control) :** Adresse matérielle unique de 48 bits (6 octets, ex: `00:1A:2B:3C:4D:5E`) gravée sur la carte réseau (NIC). Elle ne permet que la communication au sein du même réseau local (Couche 2). Les trois premiers octets désignent le constructeur (OUI - Organizationally Unique Identifier).
* **L'Adresse IP (Internet Protocol) :** Adresse logique routable (32 bits en IPv4, 128 bits en IPv6) qui permet d'acheminer un paquet d'un sous-réseau à un autre à travers des routeurs interconnectés (Couche 3).
* **Le Protocole ARP (Address Resolution Protocol) :** Fait le lien indispensable entre Couche 3 et Couche 2 en répondant à la question : *« Quelle est l'adresse MAC correspondant à l'adresse IP 192.168.1.1 ? »*.
""",
        "exercise": {
            "title": "Parseur d'Adresse MAC en Python",
            "description_md": "Écrivez une fonction Python `extraire_oui_mac(adresse_mac: str) -> str` qui prend une adresse MAC (format '00:1A:2B:3C:4D:5E' ou '00-1a-2b-3c-4d-5e') et retourne l'identifiant OUI (les 3 premiers octets) au format '00:1A:2B'.",
            "starter_code": "def extraire_oui_mac(adresse_mac: str) -> str:\n    # Votre code ici\n    pass\n",
            "solution_code": "def extraire_oui_mac(adresse_mac: str) -> str:\n    nettoyee = adresse_mac.replace('-', ':').upper()\n    octets = nettoyee.split(':')\n    if len(octets) < 3:\n        return ''\n    return ':'.join(octets[:3])\n",
            "difficulty": "beginner"
        },
        "quiz": {
            "title": "Quiz - Modèles Réseau & Encapsulation",
            "passing_score": 100,
            "questions": [
                {
                    "prompt_md": "À quelle unité de données (PDU) correspond le niveau de la Couche 2 (Liaison de données) dans le modèle OSI ?",
                    "explanation_md": "En Couche 2, les unités de données manipulées sont appelées des Trames (Frames). En Couche 3, ce sont des Paquets, et en Couche 4, des Segments.",
                    "options_json": json.dumps([
                        {"text": "Une Trame (Frame)", "is_correct": True},
                        {"text": "Un Paquet (Packet)", "is_correct": False},
                        {"text": "Un Segment", "is_correct": False},
                        {"text": "Un Datagramme", "is_correct": False}
                    ]),
                    "points": 10
                },
                {
                    "prompt_md": "Quel protocole réseau permet à une machine de découvrir l'adresse MAC matérielle correspondant à une adresse IPv4 locale ?",
                    "explanation_md": "ARP (Address Resolution Protocol - RFC 826) résout les adresses IP en adresses physiques MAC au sein du domaine de diffusion local.",
                    "options_json": json.dumps([
                        {"text": "ARP (Address Resolution Protocol)", "is_correct": True},
                        {"text": "DNS (Domain Name System)", "is_correct": False},
                        {"text": "DHCP (Dynamic Host Configuration Protocol)", "is_correct": False},
                        {"text": "BGP (Border Gateway Protocol)", "is_correct": False}
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
