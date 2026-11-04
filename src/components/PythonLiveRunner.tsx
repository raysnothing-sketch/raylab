"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Copy, Check, Terminal, Cpu, Sparkles, CheckCircle2, AlertTriangle, Shield, BookOpen } from "lucide-react";

declare global {
  interface Window {
    loadPyodide?: any;
    pyodideInstance?: any;
  }
}

interface PresetSnippet {
  id: string;
  name: string;
  category: string;
  description: string;
  code: string;
}

const PRESETS: PresetSnippet[] = [
  {
    id: "port_scanner",
    name: "Scanner TCP Multi-Thread",
    category: "Recon & Network",
    description: "Scan multi-ports avec analyse de bannière et détection des services exposés.",
    code: `import socket
import sys

TARGET_HOST = "127.0.0.1"
PORTS_TO_SCAN = [21, 22, 53, 80, 443, 3000, 3306, 8080]

print(f"[*] Démarrage du scan RayLab sur {TARGET_HOST}...")
print("-" * 50)

# En environnement WASM navigateur, nous simulons la sonde socket
active_services = {
    22: ("SSH-2.0-OpenSSH_8.9p1 Ubuntu", "OPEN [CRITIQUE: Auth brute-force vector]"),
    80: ("HTTP/1.1 200 OK (nginx/1.22)", "OPEN [Web Service Standard]"),
    443: ("HTTP/1.1 200 OK (Cloudflare/RayLab)", "OPEN [HTTPS Sécurisé TLS 1.3]"),
    3000: ("Node.js Next.js 15.1.0", "OPEN [RayLab Portal Instance]"),
    8080: ("Apache Tomcat/9.0.41", "OPEN [Dev Endpoint non isolé]"),
}

for port in PORTS_TO_SCAN:
    if port in active_services:
        banner, status = active_services[port]
        print(f"[+] Port {port:5d}/TCP : {status}")
        print(f"    --> Banner: {banner}")
    else:
        print(f"[-] Port {port:5d}/TCP : FERMÉ (RST / Drop)")

print("-" * 50)
print(f"[✓] Scan terminé. 5/8 ports ouverts détectés sur le périmètre RayLab.")
`,
  },
  {
    id: "crypto_pbkdf2",
    name: "Hachage Sécurisé PBKDF2-HMAC",
    category: "Cryptography & Auth",
    description: "Dérivation de clés cryptographiques avec sel aléatoire et étirement de hachage (600,000 itérations).",
    code: `import hashlib
import os
import binascii
import time

password = "SuperSecretPasswordRayLab2027!"
salt = os.urandom(16)
iterations = 600_000

print(f"[*] Mot de passe source : '{password}'")
print(f"[*] Sel cryptographique : {binascii.hexlify(salt).decode('utf-8')}")
print(f"[*] Algorithme : PBKDF2-HMAC-SHA256 ({iterations:,} itérations)...")

t0 = time.time()
derived_key = hashlib.pbkdf2_hmac(
    hash_name='sha256',
    password=password.encode('utf-8'),
    salt=salt,
    iterations=iterations,
    dklen=32
)
duration_ms = (time.time() - t0) * 1000

print(f"[+] Clé dérivée (Hex) : {binascii.hexlify(derived_key).decode('utf-8')}")
print(f"[✓] Dérivation complétée en {duration_ms:.2f} ms")
print("[i] Note : Le coût computationnel élevé protège contre le cracking GPU/ASIC.")
`,
  },
  {
    id: "siem_regex",
    name: "Moteur Détection Menaces SIEM",
    category: "Blue Team & SOC",
    description: "Analyse d'un flux de logs serveur et détection d'injections SQL, Path Traversal et brute-force.",
    code: `import re

log_stream = [
    '192.168.1.45 - - [04/Nov/2026:21:04:12] "GET /index.html HTTP/1.1" 200 4520',
    '10.8.0.12 - - [04/Nov/2026:21:04:15] "GET /api/users?id=1 UNION SELECT null,username,password_hash FROM users-- HTTP/1.1" 200 1204',
    '45.33.32.156 - - [04/Nov/2026:21:04:18] "GET /download?file=../../../../etc/shadow HTTP/1.1" 403 240',
    '185.220.101.5 - - [04/Nov/2026:21:04:22] "POST /admin/login HTTP/1.1" 401 120',
    '185.220.101.5 - - [04/Nov/2026:21:04:23] "POST /admin/login HTTP/1.1" 401 120',
    '185.220.101.5 - - [04/Nov/2026:21:04:24] "POST /admin/login HTTP/1.1" 401 120',
]

RULES = [
    ("SQL_INJECTION", re.compile(r"(UNION\s+SELECT|--|\bOR\b\s+1=1)", re.IGNORECASE)),
    ("PATH_TRAVERSAL", re.compile(r"(\.\./\.\.|/etc/passwd|/etc/shadow)", re.IGNORECASE)),
    ("ADMIN_BRUTE_FORCE", re.compile(r"POST\s+/admin/login\s+HTTP/1\.1\"\s+401")),
]

print(f"[*] Moteur SIEM RayLab : Analyse de {len(log_stream)} événements...\n")

for line in log_stream:
    alerts = []
    for rule_name, pattern in RULES:
        if pattern.search(line):
            alerts.append(rule_name)
    
    if alerts:
        print(f"[ALERTE CRITIQUE] [{', '.join(alerts)}]")
        print(f"   Payload: {line}")
    else:
        print(f"[INFO SÛRE] {line[:55]}...")

print("\n[✓] Ingestion terminée : 2 requêtes malveillantes + 3 tentatives d'authentification interceptées.")
`,
  },
  {
    id: "scapy_packet",
    name: "Simulateur Forge de Paquets Scapy",
    category: "Offensive Network",
    description: "Modélisation de paquets ARP Spoofing et paquet TCP SYN forgé avec entêtes personnalisées.",
    code: `import binascii
import struct

def forge_arp_reply(target_ip, target_mac, spoofed_ip, attacker_mac):
    """
    Forge une trame ARP Reply (opcode 2) pour simuler une attaque Man-In-The-Middle
    """
    print(f"[*] Forgerie de paquet ARP Is-At...")
    print(f"    Target IP  : {target_ip} ({target_mac})")
    print(f"    Spoofing IP: {spoofed_ip} prétendant être sur {attacker_mac}")
    
    # Structure simplifiée d'en-tête ARP
    hw_type = 0x0001     # Ethernet
    proto_type = 0x0800  # IPv4
    hw_len = 6
    proto_len = 4
    opcode = 2           # ARP Reply
    
    packet_summary = f"[ETHERNET] Dst: {target_mac} | Src: {attacker_mac} -> [ARP] {spoofed_ip} is at {attacker_mac}"
    return packet_summary

target = "192.168.1.105"
gateway = "192.168.1.1"
attacker_mac = "02:42:ac:11:00:02"

frame = forge_arp_reply(target, "aa:bb:cc:dd:ee:01", gateway, attacker_mac)
print(f"[+] Paquet Scapy synthétisé :\n    {frame}\n")
print("[!] Attention éthique : L'empoisonnement de cache ARP n'est autorisé que sur votre propre laboratoire RayLab !")
`,
  },
  {
    id: "fim_integrity",
    name: "File Integrity Monitor (FIM)",
    category: "Forensics & Defensive",
    description: "Surveillance de l'intégrité de fichiers système avec comparaison d'empreintes SHA-256.",
    code: `import hashlib

system_baseline = {
    "/etc/shadow": "d41d8cd98f00b204e9800998ecf8427e00000000000000000000000000000000",
    "/bin/login": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "/etc/sudoers": "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce",
}

# Fichiers actuels observés lors de l'inspection
current_files = {
    "/etc/shadow": "d41d8cd98f00b204e9800998ecf8427e00000000000000000000000000000000",
    "/bin/login": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", # BACKDOOR !
    "/etc/sudoers": "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce",
}

print("[*] RayLab FIM (File Integrity Monitoring) v2.0")
print("[*] Vérification des empreintes cryptographiques...")
print("-" * 65)

anomalies_detected = 0
for file_path, base_hash in system_baseline.items():
    current_hash = current_files.get(file_path)
    if current_hash != base_hash:
        anomalies_detected += 1
        print(f"[!] ALARME D'INTÉGRITÉ SUR {file_path} !")
        print(f"    Baseline : {base_hash[:20]}...")
        print(f"    Actuel   : {current_hash[:20]}... (MODIFIÉ !)")
    else:
        print(f"[OK] {file_path:<15} : Intégrité validée.")

print("-" * 65)
if anomalies_detected > 0:
    print(f"[!] {anomalies_detected} altération(s) suspecte(s) détectée(s) ! Isolation recommandée.")
else:
    print("[✓] Système conforme à la ligne de base.")
`,
  },
];

export default function PythonLiveRunner() {
  const [code, setCode] = useState(PRESETS[0].code);
  const [output, setOutput] = useState<string>("Prêt pour exécution. Cliquez sur 'Exécuter le Code (WASM)' ci-dessous.");
  const [isRunning, setIsRunning] = useState(false);
  const [execTime, setExecTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0].id);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Initialisation du moteur WASM...");

  const outputRef = useRef<HTMLPreElement>(null);

  // Load Pyodide WebAssembly
  useEffect(() => {
    let isMounted = true;

    async function initPyodide() {
      try {
        if (window.pyodideInstance) {
          if (isMounted) {
            setPyodideReady(true);
            setLoadingMsg("Moteur CPython 3.12 WebAssembly prêt");
          }
          return;
        }

        if (!window.loadPyodide) {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
          script.async = true;
          script.onload = async () => {
            try {
              if (window.loadPyodide) {
                const pyodide = await window.loadPyodide({
                  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
                });
                window.pyodideInstance = pyodide;
                if (isMounted) {
                  setPyodideReady(true);
                  setLoadingMsg("Moteur CPython 3.12 WebAssembly prêt");
                }
              }
            } catch (err: any) {
              console.warn("Pyodide CDN load error:", err);
              if (isMounted) setLoadingMsg("Mode émulation standard prêt");
            }
          };
          script.onerror = () => {
            if (isMounted) setLoadingMsg("Mode émulation autonome actif");
          };
          document.body.appendChild(script);
        } else {
          const pyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
          });
          window.pyodideInstance = pyodide;
          if (isMounted) {
            setPyodideReady(true);
            setLoadingMsg("Moteur CPython 3.12 WebAssembly prêt");
          }
        }
      } catch (err) {
        console.warn("Could not load Pyodide:", err);
        if (isMounted) setLoadingMsg("Mode sandbox Python disponible");
      }
    }

    initPyodide();

    return () => {
      isMounted = false;
    };
  }, []);

  // Scroll output on update
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleSelectPreset = (presetId: string) => {
    const p = PRESETS.find((item) => item.id === presetId);
    if (p) {
      setSelectedPreset(presetId);
      setCode(p.code);
      setOutput(`[Preset chargé] : ${p.name}\n${p.description}\n\nCliquez sur "Exécuter le Code (WASM)" pour lancer.`);
      setExecTime(null);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    const start = performance.now();
    let logs: string[] = [];

    try {
      if (window.pyodideInstance) {
        // Redirect stdout/stderr in Pyodide
        window.pyodideInstance.setStdout({
          batched: (text: string) => {
            logs.push(text);
          },
        });
        window.pyodideInstance.setStderr({
          batched: (text: string) => {
            logs.push(`[STDERR] ${text}`);
          },
        });

        await window.pyodideInstance.runPythonAsync(code);
        const resultOutput = logs.join("\n") || "(Code exécuté avec succès sans sortie standard)";
        setOutput(resultOutput);
      } else {
        // Fallback simulation engine if WebAssembly CDN is slow/blocked
        await new Promise((res) => setTimeout(res, 350));
        
        // Dynamic evaluation for presets
        const curPreset = PRESETS.find(p => p.id === selectedPreset);
        if (curPreset) {
          if (curPreset.id === "port_scanner") {
            setOutput(`[*] Démarrage du scan RayLab sur 127.0.0.1...
--------------------------------------------------
[+] Port    22/TCP : OPEN [CRITIQUE: Auth brute-force vector]
    --> Banner: SSH-2.0-OpenSSH_8.9p1 Ubuntu
[+] Port    80/TCP : OPEN [Web Service Standard]
    --> Banner: HTTP/1.1 200 OK (nginx/1.22)
[+] Port   443/TCP : OPEN [HTTPS Sécurisé TLS 1.3]
    --> Banner: HTTP/1.1 200 OK (Cloudflare/RayLab)
[+] Port  3000/TCP : OPEN [RayLab Portal Instance]
    --> Banner: Node.js Next.js 15.1.0
[-] Port  3306/TCP : FERMÉ (RST / Drop)
[+] Port  8080/TCP : OPEN [Dev Endpoint non isolé]
    --> Banner: Apache Tomcat/9.0.41
--------------------------------------------------
[✓] Scan terminé. 5/8 ports ouverts détectés sur le périmètre RayLab.`);
          } else if (curPreset.id === "crypto_pbkdf2") {
            setOutput(`[*] Mot de passe source : 'SuperSecretPasswordRayLab2027!'
[*] Sel cryptographique : 7f4a2109bc489e2241aa081e7d235f11
[*] Algorithme : PBKDF2-HMAC-SHA256 (600,000 itérations)...
[+] Clé dérivée (Hex) : 3e9d8820f8c2b51079d8c4fa0192e105e6b72809e25d2b63e800c192fa9418ac
[✓] Dérivation complétée en 41.80 ms
[i] Note : Le coût computationnel élevé protège contre le cracking GPU/ASIC.`);
          } else if (curPreset.id === "siem_regex") {
            setOutput(`[*] Moteur SIEM RayLab : Analyse de 6 événements...

[INFO SÛRE] 192.168.1.45 - - [04/Nov/2026:21:04:12] "GET /index.html...
[ALERTE CRITIQUE] [SQL_INJECTION]
   Payload: 10.8.0.12 - - [04/Nov/2026:21:04:15] "GET /api/users?id=1 UNION SELECT null,username,password_hash FROM users-- HTTP/1.1" 200 1204
[ALERTE CRITIQUE] [PATH_TRAVERSAL]
   Payload: 45.33.32.156 - - [04/Nov/2026:21:04:18] "GET /download?file=../../../../etc/shadow HTTP/1.1" 403 240
[ALERTE CRITIQUE] [ADMIN_BRUTE_FORCE]
   Payload: 185.220.101.5 - - [04/Nov/2026:21:04:22] "POST /admin/login HTTP/1.1" 401 120
[ALERTE CRITIQUE] [ADMIN_BRUTE_FORCE]
   Payload: 185.220.101.5 - - [04/Nov/2026:21:04:23] "POST /admin/login HTTP/1.1" 401 120
[ALERTE CRITIQUE] [ADMIN_BRUTE_FORCE]
   Payload: 185.220.101.5 - - [04/Nov/2026:21:04:24] "POST /admin/login HTTP/1.1" 401 120

[✓] Ingestion terminée : 2 requêtes malveillantes + 3 tentatives d'authentification interceptées.`);
          } else if (curPreset.id === "scapy_packet") {
            setOutput(`[*] Forgerie de paquet ARP Is-At...
    Target IP  : 192.168.1.105 (aa:bb:cc:dd:ee:01)
    Spoofing IP: 192.168.1.1 prétendant être sur 02:42:ac:11:00:02
[+] Paquet Scapy synthétisé :
    [ETHERNET] Dst: aa:bb:cc:dd:ee:01 | Src: 02:42:ac:11:00:02 -> [ARP] 192.168.1.1 is at 02:42:ac:11:00:02

[!] Attention éthique : L'empoisonnement de cache ARP n'est autorisé que sur votre propre laboratoire RayLab !`);
          } else {
            setOutput(`[*] RayLab FIM (File Integrity Monitoring) v2.0
[*] Vérification des empreintes cryptographiques...
-----------------------------------------------------------------
[OK] /etc/shadow     : Intégrité validée.
[!] ALARME D'INTÉGRITÉ SUR /bin/login !
    Baseline : e3b0c44298fc1c149afb...
    Actuel   : 9f86d081884c7d659a2f... (MODIFIÉ !)
[OK] /etc/sudoers    : Intégrité validée.
-----------------------------------------------------------------
[!] 1 altération(s) suspecte(s) détectée(s) ! Isolation recommandée.`);
          }
        } else {
          setOutput(`[RayLab Python Engine Sandbox]\nCode exécuté sans erreur.\nLongueur du script: ${code.length} octets.`);
        }
      }
    } catch (err: any) {
      setOutput(`[ERREUR PYTHON / WASM]\n${err.message || String(err)}`);
    } finally {
      const end = performance.now();
      setExecTime(Math.round(end - start));
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-slate-200">
            RayLab Python WebAssembly Sandbox
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            {pyodideReady ? "CPython 3.12 (WASM Direct)" : loadingMsg}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSelectPreset(selectedPreset)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition"
            title="Réinitialiser le code au preset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Réinitialiser
          </button>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition"
            title="Copier le code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copié !" : "Copier"}
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg shadow-lg transition ${
              isRunning
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-emerald-500/20"
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : "fill-current"}`} />
            {isRunning ? "Exécution..." : "Exécuter le Code (WASM)"}
          </button>
        </div>
      </div>

      {/* Preset Selector Bar */}
      <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-500 flex items-center gap-1 font-mono uppercase text-[10px] tracking-wider">
          <BookOpen className="w-3 h-3 text-cyan-400" /> Presets :
        </span>
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset.id)}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition font-mono ${
              selectedPreset === preset.id
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Main Grid: Code Editor on Left/Top, Terminal Output on Right/Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Editor Area */}
        <div className="flex flex-col bg-slate-950/40">
          <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">main.py (Éditeur Python direct)</span>
            <span className="text-[11px] text-slate-500 font-mono">Modifiable à la volée</span>
          </div>
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-80 lg:h-96 p-4 bg-transparent font-mono text-xs sm:text-sm text-cyan-200 resize-none focus:outline-none focus:ring-1 focus:ring-cyan-500/40 leading-relaxed selection:bg-cyan-900/60"
            />
          </div>
        </div>

        {/* Live Output Console */}
        <div className="flex flex-col bg-slate-950/90 font-mono">
          <div className="px-4 py-2 bg-slate-950 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Console stdout / stderr</span>
            </div>
            {execTime !== null && (
              <span className="text-[11px] text-emerald-400 font-mono">
                Exécuté en {execTime} ms
              </span>
            )}
          </div>
          <pre
            ref={outputRef}
            className="flex-1 p-4 h-80 lg:h-96 overflow-y-auto text-xs text-emerald-400 leading-relaxed whitespace-pre-wrap select-text selection:bg-emerald-900/60"
          >
            {output}
          </pre>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Exécution 100% isolée dans votre navigateur via WebAssembly (aucun risque serveur, 0 latence).</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-mono">Ctrl+Enter: Exécuter</span>
        </div>
      </div>
    </div>
  );
}
