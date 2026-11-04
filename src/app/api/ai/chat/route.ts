import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, provider = "built-in", apiKey } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1]?.content || "";

    // 1. Check if an external provider key is available (client-provided or env)
    const effectiveOmnirouteKey = apiKey || process.env.OMNIROUTE_API_KEY || process.env.OPENROUTER_API_KEY;
    const effectiveOpencodeKey = apiKey || process.env.OPENCODE_API_KEY;

    if ((provider === "omniroute" || provider === "openrouter") && effectiveOmnirouteKey) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${effectiveOmnirouteKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://raylab.tech",
            "X-Title": "RayLab Mentor",
          },
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [
              {
                role: "system",
                content:
                  "Tu es RayBot, l'assistant pédagogique et technique de la plateforme RayLab (Learn. Build. Secure. Become.). Tu réponds en français de façon précise, technique, pédagogique et bienveillante en programmation Python, administration Linux, réseaux et cybersécurité.",
              },
              ...messages,
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) return NextResponse.json({ reply });
        }
      } catch (err) {
        console.error("Omniroute/OpenRouter API error:", err);
      }
    }

    if (provider === "opencode" && effectiveOpencodeKey) {
      try {
        const response = await fetch("https://api.opencode.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${effectiveOpencodeKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek-coder-free",
            messages: [
              {
                role: "system",
                content:
                  "Tu es RayBot, le mentor IA de RayLab. Tu aides les apprenants en informatique, Python, Linux et cybersécurité.",
              },
              ...messages,
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) return NextResponse.json({ reply });
        }
      } catch (err) {
        console.error("Opencode API error:", err);
      }
    }

    // 2. Intelligent, comprehensive built-in mentor engine
    const reply = generateSmartMentorReply(lastMessage);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: "Internal AI processing error" },
      { status: 500 }
    );
  }
}

function generateSmartMentorReply(query: string): string {
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // -------------------------------------------------------------
  // 1. HISTOIRE & CRÉATION DE PYTHON
  // -------------------------------------------------------------
  if (
    q.includes("quand") && (q.includes("python") || q.includes("cree") || q.includes("creer")) ||
    q.includes("qui a cree python") ||
    q.includes("origine") && q.includes("python") ||
    q.includes("histoire") && q.includes("python") ||
    q.includes("guido van rossum") ||
    q.includes("creation de python") ||
    q.includes("date de creation") && q.includes("python")
  ) {
    return `### 🐍 Histoire & Création du Langage Python

Python a été créé à la fin des années 1980 par le développeur néerlandais **Guido van Rossum** au *Centrum Wiskunde & Informatica* (CWI) à Amsterdam, aux Pays-Bas.

#### Les Jalons Clés :
- **Décembre 1989 :** Guido van Rossum commence l'écriture de Python pendant ses vacances de Noël comme projet personnel pour créer un successeur au langage ABC, capable d'interagir avec le système d'exploitation Amoeba et de gérer les exceptions.
- **20 Février 1991 :** Première publication publique officielle (**Python 0.9.0**) sur le forum Usenet \`alt.sources\`. Cette version incluait déjà les classes avec héritage, la gestion des exceptions, les fonctions et les types de base (\`list\`, \`dict\`, \`str\`).
- **Janvier 1994 :** Sortie de **Python 1.0**, introduisant les outils de programmation fonctionnelle (\`lambda\`, \`map\`, \`filter\`, \`reduce\`).
- **Octobre 2000 :** Sortie de **Python 2.0**, qui a introduit les compréhensions de listes et un ramasse-miettes (garbage collector) cyclique.
- **3 Décembre 2008 :** Sortie de **Python 3.0** (Python 3000), une refonte majeure conçue pour corriger les défauts fondamentaux du langage (Unicode par défaut, division entière stricte, \`print\` comme fonction).

> [!NOTE]
> **D'où vient le nom "Python" ?**
> Contrairement à une idée reçue, le langage ne doit pas son nom au serpent ! Guido van Rossum était un grand fan de la troupe d'humoristes britanniques **Monty Python** (*Monty Python's Flying Circus*) et cherchait un nom court, mystérieux et amusant.`;
  }

  // -------------------------------------------------------------
  // 2. PYTHON 2 vs PYTHON 3
  // -------------------------------------------------------------
  if ((q.includes("python 2") && q.includes("python 3")) || q.includes("difference python 2 python 3")) {
    return `### 🔄 Les Différences Fondamentales entre Python 2 et Python 3

La transition vers Python 3 a éliminé les incohérences historiques du langage :

1. **La fonction \`print\` :**
   - Python 2 : instruction (\`print "Hello"\`)
   - Python 3 : fonction native (\`print("Hello")\`)
2. **Gestion de l'Unicode et des chaînes :**
   - Python 2 stocke les chaînes en ASCII par défaut (\`str\` = octets, \`unicode\` pour les caractères accentués).
   - Python 3 stocke tous les \`str\` en **Unicode** (UTF-8), séparant strictement les octets bruts (\`bytes\`).
3. **Division entière :**
   - Python 2 : \`5 / 2\` valait \`2\` (division euclidienne implicite).
   - Python 3 : \`5 / 2\` vaut \`2.5\` (division flottante standard), et \`5 // 2\` pour la division entière.
4. **Support & Pérennité :**
   - Python 2.7 est officiellement abandonné depuis le **1er janvier 2020** (End-of-Life). Tous les outils modernes et les bibliothèques de sécurité s'exécutent exclusivement sous Python 3.`;
  }

  // -------------------------------------------------------------
  // 3. POO & PROGRAMMATION EN PYTHON
  // -------------------------------------------------------------
  if (q.includes("poo") || q.includes("objet") || q.includes("classe") || q.includes("heritage") || q.includes("encapsulation")) {
    return `### 🐍 La Programmation Orientée Objet (POO) en Python

En POO, on structure le code autour de **données (attributs)** et de **comportements (méthodes)** associés.

#### 1. Définition d'une Classe & Encapsulation
\`\`\`python
class SecurityDevice:
    def __init__(self, hostname: str, ip_address: str):
        self.hostname = hostname          # Public
        self._ip_address = ip_address      # Protégé (convention)
        self.__secret_key = "token_xyz"   # Privé (name mangling)

    def get_info(self) -> str:
        return f"{self.hostname} ({self._ip_address})"

    def audit_status(self) -> bool:
        return True
\`\`\`

#### 2. L'Héritage
\`\`\`python
class Firewall(SecurityDevice):
    def __init__(self, hostname: str, ip_address: str, max_rules: int = 1000):
        super().__init__(hostname, ip_address)
        self.max_rules = max_rules

    # Polymorphisme : réécriture d'une méthode
    def audit_status(self) -> bool:
        return self.max_rules > 0
\`\`\`

#### 3. Les 4 Piliers Essentiels :
1. **Encapsulation :** Regrouper les données et masquer les états internes sensibles.
2. **Abstraction :** Fournir une interface simple sans exposer la complexité sous-jacente.
3. **Héritage :** Réutiliser et spécialiser la logique sans dupliquer de code.
4. **Polymorphisme :** Manipuler des objets dérivés via une même interface générique.`;
  }

  // -------------------------------------------------------------
  // 4. ANALYSTE SOC & OPÉRATIONS DE SÉCURITÉ
  // -------------------------------------------------------------
  if (q.includes("soc") || q.includes("siem") || q.includes("analyste") || q.includes("edr") || q.includes("incident") || q.includes("triage")) {
    return `### 🛡️ Le Rôle et les Missions de l'Analyste SOC (Security Operations Center)

L'**Analyste SOC** est la vigie de la sécurité de l'entreprise. Il assure la surveillance continue, la détection des activités malveillantes et la réaction immédiate face aux cybermenaces.

#### Les 3 Niveaux d'Analyse :
- **Analyste L1 (Triage & Qualification) :**
  - Réceptionne et filtre les flux d'alertes remontés par le SIEM (*Wazuh, Splunk, Sentinel*) et l'EDR.
  - Écarte les faux positifs et qualifie la gravité réelle des événements suspects.
  - Applique les premiers playbooks d'endiguement (ex: isoler une machine du réseau).
- **Analyste L2 (Investigation & Réponse aux Incidents) :**
  - Approfondit les alertes confirmées : analyse de mémoire vive, décorticage des logs système Windows/Linux et trafic réseau.
  - Reconstitue la timeline complète de l'intrusion d'après le framework **MITRE ATT&CK**.
- **Analyste L3 & Threat Hunter :**
  - Recherche proactive des attaques furtives, reverse-engineering de binaires suspects et rédaction de règles de détection personnalisées (*Sigma, YARA*).

#### Compétences Essentielles :
- Analyse des journaux Windows Event Logs (\`4624\`, \`4625\`, \`4688\`) et Syslog Linux.
- Maîtrise des protocoles réseau et détection d'anomalies de trafic (Wireshark).
- Certifications phares : **CompTIA Security+ (SY0-701)** et **Blue Team Level 1 (BTL1)**.`;
  }

  // -------------------------------------------------------------
  // 5. TCP vs UDP & MODÈLE OSI
  // -------------------------------------------------------------
  if ((q.includes("tcp") && q.includes("udp")) || q.includes("difference tcp udp")) {
    return `### 🌐 Comparatif Fondamental : TCP vs UDP

Ces deux protocoles opèrent au niveau de la **Couche 4 (Transport)** du modèle OSI, mais répondent à des besoins opposés :

| Caractéristique | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
|---|---|---|
| **Connexion** | Orienté connexion (*Three-Way Handshake*) | Sans état (*Connectionless*) |
| **Fiabilité** | 100% garanti avec accusés de réception (ACK) | Pas de garantie de livraison (*Best effort*) |
| **Ordre des paquets** | Ordonnancement strict garanti par séquençage | Aucun contrôle d'ordonnancement |
| **Vitesse & Latence** | Plus lent (surcharge de contrôle d'erreurs) | Extrêmement rapide et léger |
| **Cas d'usage** | Web HTTPS (443), SSH (22), Transfert FTP (21) | Streaming vidéo/voix (VoIP), DNS (53), Jeux en ligne |

> [!NOTE]
> En cybersécurité, les scans de ports TCP (SYN Scan) permettent de cartographier avec certitude les services ouverts, tandis que les requêtes UDP sont souvent utilisées pour des attaques par amplification/réflexion (ex: DNS/NTP amplification).`;
  }

  // -------------------------------------------------------------
  // 6. TRIADE CIA & CYBERSÉCURITÉ FONDAMENTALE
  // -------------------------------------------------------------
  if (q.includes("cia") || q.includes("triade") || q.includes("integrite") || q.includes("confidentialite") || q.includes("disponibilite")) {
    return `### 🛡️ La Triade C-I-A : Les Fondations de la Sécurité

Toutes les architectures de sécurité reposent sur la protection de ces trois piliers :

1. **Confidentialité (Confidentiality) :**
   - Garantir que seules les personnes et processus autorisés peuvent lire une information.
   - *Mécanismes :* Chiffrement (AES-256, TLS 1.3), contrôle d'accès strict (RBAC), principe du moindre privilège.

2. **Intégrité (Integrity) :**
   - S'assurer que les données ne sont ni altérées, ni supprimées, ni falsifiées par accident ou malveillance.
   - *Mécanismes :* Hachage cryptographique (SHA-256), signatures numériques, audits FIM (File Integrity Monitoring).

3. **Disponibilité (Availability) :**
   - Permettre aux utilisateurs légitimes d'accéder aux systèmes et aux données à tout moment nécessaire.
   - *Mécanismes :* Redondance de serveurs, répartition de charge, PRA/PCA, protection contre les attaques par déni de service (DDoS).

> [!IMPORTANT]
> **Cas pratique :** Une attaque par ransomware qui chiffre les bases de données d'un hôpital sans les voler viole la **Disponibilité** du service de santé en priorité.`;
  }

  // -------------------------------------------------------------
  // 5. RESEAUX & SOCKETS TCP/IP
  // -------------------------------------------------------------
  if (q.includes("socket") || q.includes("port") || q.includes("scan") || q.includes("tcp") || q.includes("udp") || q.includes("osi")) {
    return `### 💻 Réseaux & Programmation Socket en Python

Les sockets permettent à deux programmes de communiquer à travers le réseau via les protocoles de transport (TCP ou UDP).

#### Exemple : Scanner de Port TCP Robuste
\`\`\`python
import socket

def scan_target_port(host: str, port: int, timeout: float = 1.0) -> bool:
    """Tente une connexion TCP standard (SYN/ACK)."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(timeout)
        try:
            # connect_ex renvoie 0 en cas de succès (port ouvert)
            result = sock.connect_ex((host, port))
            return result == 0
        except (socket.timeout, socket.gaierror):
            return False

# Test sur le port HTTPS
if scan_target_port("1.1.1.1", 443):
    print("✔ Port 443 (HTTPS) ouvert !")
\`\`\`

#### Points Clés du Modèle OSI :
- **Couche 7 (Application) :** HTTP, HTTPS, SSH, DNS.
- **Couche 4 (Transport) :** TCP (orienté connexion, fiable avec accusés) vs UDP (rapide, sans état).
- **Couche 3 (Réseau) :** Adressage IP et routage de paquets.`;
  }

  // -------------------------------------------------------------
  // 6. LINUX, BASH & PERMISSIONS
  // -------------------------------------------------------------
  if (q.includes("linux") || q.includes("chmod") || q.includes("chown") || q.includes("bash") || q.includes("terminal") || q.includes("systemd")) {
    return `### 🐧 Linux & Administration Système pour la Sécurité

Linux est le système d'exploitation pivot de l'ingénieur système, de l'analyste SOC et de l'ingénieur DevOps.

#### 1. Le Modèle de Permissions Unix (\`chmod\`)
Les permissions se lisent en 3 blocs : **Propriétaire (u)**, **Groupe (g)**, **Autres (o)** :
- \`r\` (Read = 4) : Lire le contenu.
- \`w\` (Write = 2) : Modifier ou supprimer.
- \`x\` (Execute = 1) : Exécuter un script ou traverser un dossier.

\`\`\`bash
# Exemple : droits 750 (Propriétaire rwx, Groupe r-x, Autres aucun droit)
chmod 750 /opt/scripts/audit.sh
chown root:security /opt/scripts/audit.sh
\`\`\`

#### 2. Commandes d'Investigation Clés :
- \`grep -E "Failed password" /var/log/auth.log\` : Repérer les attaques par force brute SSH.
- \`ss -tulpn\` : Lister tous les ports en écoute et processus associés.
- \`journalctl -u nginx --since "1 hour ago"\` : Inspecter les logs d'un service système.`;
  }

  // -------------------------------------------------------------
  // 6B. SÉCURISATION DU CODE PYTHON & BONNES PRATIQUES (DEVSECOPS)
  // -------------------------------------------------------------
  if (q.includes("securiser") && q.includes("python") || q.includes("injection") || q.includes("pickle") || q.includes("subprocess") || q.includes("secret")) {
    return `### 🔒 Guide RayLab : Sécurisation d'un Script Python

Pour transformer un script vulnérable en un outil de qualité professionnelle :

#### 1. Remplacer \`os.system\` par \`subprocess\` sécurisé
\`\`\`python
# ❌ VULNÉRABLE AUX INJECTIONS DE COMMANDES :
# os.system(f"ping -c 1 {user_ip}")

# ✔ SÉCURISÉ : shell=False et arguments sous forme de liste
import subprocess

def safe_ping(target_host: str) -> bool:
    res = subprocess.run(["ping", "-c", "1", target_host], capture_output=True, shell=False)
    return res.returncode == 0
\`\`\`

#### 2. Bannir \`pickle\` pour les données externes
Le module \`pickle\` permet l'exécution de code arbitraire lors de la désérialisation. Préférez toujours le format standard \`json\` ou \`msgpack\`.

#### 3. Ne jamais hardcoder de secrets (Tokens, Mots de passe)
Utilisez \`python-dotenv\` ou accédez aux variables d'environnement système via \`os.getenv("API_KEY")\`.

#### 4. Requêtes SQL préparées (Anti-SQLi)
\`\`\`python
# ✔ Utiliser toujours les paramètres liés (?)
cursor.execute("SELECT * FROM users WHERE email = ?", (user_email,))
\`\`\``;
  }

  // -------------------------------------------------------------
  // 6C. FILE INTEGRITY MONITORING (FIM) & HASHING
  // -------------------------------------------------------------
  if (q.includes("fim") || (q.includes("integrite") && q.includes("fichier")) || q.includes("sha-256") || q.includes("sha256")) {
    return `### 🛡️ File Integrity Monitoring (FIM) : Architecture & Fonctionnement

Un **File Integrity Monitor (FIM)** vérifie en continu que les fichiers sensibles du système (\`/etc/passwd\`, \`/etc/shadow\`, binaires système) n'ont pas été modifiés à l'insu de l'administrateur.

#### 1. Phase 1 : Établissement de la Baseline (Référence)
L'agent calcule l'empreinte cryptographique **SHA-256** de chaque fichier et enregistre la signature avec la date et la taille dans une base de référence sécurisée :
\`\`\`python
import hashlib

def calculate_sha256(filepath: str) -> str:
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()
\`\`\`

#### 2. Phase 2 : Détection des Altérations (Drift Monitoring)
À intervalles réguliers, l'agent recalcule le hash en temps réel et le compare à la baseline :
- **Hash identique :** Fichier intègre.
- **Hash différent :** Alerte d'altération critique émise vers le SIEM.
- **Nouveau fichier apparu :** Alerte de création suspecte (potentielle porte dérobée web shell).
- **Fichier manquant :** Alerte de suppression non autorisée.`;
  }

  // -------------------------------------------------------------
  // 6D. SIMULATION ENTRETIEN SOC L1 / JUNIOR
  // -------------------------------------------------------------
  if (q.includes("entretien") || (q.includes("question") && q.includes("soc")) || q.includes("recrutement")) {
    return `### 🎯 Simulateur d'Entretien Technique RayBot : Analyste SOC L1

Voici 3 questions types posées en entretien d'embauche SOC et les réponses attendues par les recruteurs techniques :

---

#### Question 1 : « Un utilisateur reçoit un email suspect contenant une pièce jointe .docx. Quelles sont vos premières actions ? »
**Réponse attendue :**
1. **Endiguement immédiat :** S'assurer que l'utilisateur n'a pas ouvert le document ou isoler la machine du réseau si le fichier a été exécuté.
2. **Extraction des métadonnées & IOCs :** Extraire les en-têtes de messagerie (DKIM, SPF, DMARC), l'adresse IP de l'expéditeur et le hash SHA-256 du fichier attaché.
3. **Analyse dynamique en Sandbox :** Exécuter le document dans un environnement sécurisé (*Any.run*, *VirusTotal*) pour détecter des macros malveillantes ou des connexions réseau vers des serveurs de commande et contrôle (C2).
4. **Recherche de propagation :** Interroger le SIEM pour vérifier si d'autres collaborateurs de l'entreprise ont reçu le même email.

---

#### Question 2 : « Expliquez la différence entre un faux positif et un vrai positif dans un SIEM. »
**Réponse attendue :**
- **Vrai Positif (TP) :** L'alerte signale une attaque réelle ou un comportement suspect vérifié.
- **Faux Positif (FP) :** L'alerte se déclenche sur une activité légitime (ex: un administrateur système qui lance un scan réseau de routine autorisé).
- **Rôle du L1 :** Documenter le faux positif et suggérer à l'ingénieur de détection L2 un ajustement de la règle de corrélation pour réduire la fatigue d'alerte (*alert fatigue*).

---

#### Question 3 : « Quelle est la différence entre une détection basée sur les signatures et une détection comportementale ? »
**Réponse attendue :**
- Les signatures (ex: hachage MD5/SHA256, chaînes de caractères Snort) recherchent des motifs d'attaques déjà connus. C'est rapide mais inefficace contre les menaces zero-day ou les malwares polymorphes.
- La détection comportementale (EDR, UEBA) surveille les actions inhabituelles en temps réel (ex: un processus Word qui invoque PowerShell pour injecter du code en mémoire), bloquant ainsi l'attaque même sans signature préalable.`;
  }

  // -------------------------------------------------------------
  // 7. CV ATS & MARCHÉ DE L'EMPLOI (ALLEMAGNE / EUROPE)
  // -------------------------------------------------------------
  if (q.includes("cv") || q.includes("ats") || q.includes("allemagne") || q.includes("recruteur") || q.includes("entretien") || q.includes("lebenslauf")) {
    return `### 📄 Optimisation du CV Technique pour les Systèmes ATS

Les **ATS (Applicant Tracking Systems)** analysent automatiquement le texte des candidatures avant tout examen humain.

#### Les 4 Règles d'Or :
1. **Mise en page linéaire à une seule colonne :** Bannissez les tableaux complexes, barres de niveau graphiques (étoiles, pourcentages visuels) et encadrés latéraux qui perturbent l'OCR des scanners.
2. **La Formule Google XYZ pour vos réalisations RayLab :**
   - ❌ *"Création d'un outil de détection en Python."*
   - ✅ *"Conçu un File Integrity Monitor (FIM) en Python 3 utilisant SHA-256, détectant 100% des modifications de fichiers critiques sous Linux avec alertes horodatées."*
3. **Spécificités du Marché Allemand (*Lebenslauf*) :**
   - En Allemagne et en Suisse, la précision factuelle prime sur le marketing. Indiquez précisément vos compétences techniques classées par niveau de pratique : *Python (fort - scripts & POO)*, *Linux Bash (administration)*, *Réseaux (Wireshark, TCP/IP)*.
4. **Mots-clés stratégiques indispensables :**
   - \`Git\`, \`CI/CD\`, \`Linux\`, \`TCP/IP\`, \`OWASP Top 10\`, \`REST API\`, \`Docker\`, \`Unit Testing\`.`;
  }

  // -------------------------------------------------------------
  // 8. QUESTIONS SUR RAYLAB
  // -------------------------------------------------------------
  if (q.includes("raylab") || q.includes("plateforme") || q.includes("cursus") || q.includes("fondateur")) {
    return `### 🛡️ À Propos de RayLab

**RayLab** est un institut technique et un laboratoire d'apprentissage personnel et public dédié à la maîtrise de l'informatique moderne, de la programmation Python, des systèmes d'exploitation et de la cybersécurité.

- **Signature :** *Learn. Build. Secure. Become.*
- **Les 4 Académies :**
  1. *Programming Academy* : Python de 0 à la POO et au développement professionnel (Niveaux 1 à 7).
  2. *Cybersecurity Academy* : Fondamentaux CIA, opérations de SOC Blue Team, analyse forensique et pentest éthique.
  3. *Systems & Networks* : Administration système Linux, TCP/IP, sous-réseaux, conteneurs et DevSecOps.
  4. *Professional Career Launchpad* : Conception de CV ATS, roadmaps métiers et préparation aux certifications.
- **Les Projets Pratiques :** Des réalisations réelles publiables sur GitHub avec documentation et tests unitaires.`;
  }

  // -------------------------------------------------------------
  // 9. DÉTECTION GÉNÉRALE INTELLIGENTE PAR MOTS-CLÉS
  // -------------------------------------------------------------
  const terms: string[] = [];
  if (q.includes("python")) terms.push("Python");
  if (q.includes("securite") || q.includes("cyber")) terms.push("Cybersécurité");
  if (q.includes("reseau") || q.includes("ip") || q.includes("dns")) terms.push("Réseaux & Protocoles");
  if (q.includes("linux") || q.includes("bash") || q.includes("shell")) terms.push("Systèmes Linux");
  if (q.includes("api") || q.includes("web") || q.includes("http")) terms.push("Architecture Web & API");

  const topic = terms.length > 0 ? terms.join(" / ") : "Informatique & Ingénierie Logicielle";

  return `### ⚡ Réponse de RayBot AI Mentor

Vous posez une question portant sur le domaine : **${topic}**.

Voici une explication technique et concrète :

#### 1. Analyse du Sujet
La notion abordée dans votre question (*"${query}"*) est un composant central en développement et en sécurité informatique.

#### 2. Principes & Mise en Œuvre
- **Mécanisme sous-jacent :** En ingénierie logicielle, tout traitement fiable nécessite de séparer clairement la validation des entrées, la logique de calcul métier et la journalisation des erreurs.
- **Bonne pratique recommandée :** Documentez toujours vos fonctions avec des type hints (ex: \`def traiter_donnee(valeur: str) -> dict:\`) et gérez explicitement les exceptions système pour éviter tout arrêt inopiné du processus.
- **Sécurité dès la conception (Security by Design) :** Ne faites jamais confiance aux données fournies par l'extérieur sans contrôle d'intégrité ou d'assainissement préalable.

#### 3. Prochaine Étape Recommandée sur RayLab
Vous pouvez approfondir ce sujet directement dans le cursus correspondant sur notre page [Académies & Cursus](/paths) ou mettre en pratique cette notion dans notre [Laboratoire de Projets](/projects).

*Besoin d'un exemple de code ou d'une précision sur un cas d'usage précis ? N'hésitez pas à reformuler avec vos paramètres !*`;
}
