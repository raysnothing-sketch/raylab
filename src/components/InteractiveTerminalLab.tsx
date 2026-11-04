"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Play, RotateCcw, Copy, Check, ArrowRight, Shield, Network, FileSearch } from "lucide-react";

export default function InteractiveTerminalLab() {
  const [activeSnippet, setActiveSnippet] = useState<"scan" | "arp" | "sqli">("scan");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>(
    `[*] Prêt. Cliquez sur "Exécuter" pour lancer la simulation dans le terminal RayLab.`
  );
  const [copied, setCopied] = useState(false);

  const snippets = {
    scan: {
      name: "port_scanner.py",
      icon: Network,
      code: `import socket

ports = [22, 80, 443, 3306]
for port in ports:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.3)
    if s.connect_ex(("127.0.0.1", port)) == 0:
        print(f"[+] Port {port:4d}/TCP : OUVERT (Service détecté)")
    else:
        print(f"[-] Port {port:4d}/TCP : FERMÉ")
    s.close()`,
      output: `[*] Connexion à la boucle locale 127.0.0.1...
[+] Port   22/TCP : OUVERT (Service SSH-2.0-OpenSSH)
[+] Port   80/TCP : OUVERT (Serveur Web HTTP)
[+] Port  443/TCP : OUVERT (Serveur Sécurisé TLSv1.3)
[-] Port 3306/TCP : FERMÉ (RST reçu)
[✓] Audit terminé en 18ms — Sandbox RayLab isolée`,
    },
    arp: {
      name: "scapy_arp_spoof.py",
      icon: Shield,
      code: `from scapy.all import ARP

# Forge d'une trame ARP Reply (op=2)
packet = ARP(
    op=2,
    pdst="192.168.1.50",
    hwdst="AA:BB:CC:11:22:33",
    psrc="192.168.1.1" # Passerelle usurpée
)
print("[!] Trame Scapy forgée avec succès.")
print(f"    Tromper {packet.pdst} -> {packet.psrc} est chez moi")`,
      output: `[!] Trame Scapy forgée avec succès.
    Tromper 192.168.1.50 -> 192.168.1.1 est chez moi
###[ ARP ]###
  op = is-at (2)
  hwsrc = DE:AD:BE:EF:00:01 (MAC locale)
  psrc  = 192.168.1.1 (Passerelle par défaut)
  hwdst = AA:BB:CC:11:22:33 (Victime)
[NOTE SÉCURITÉ] Défense : Déployer Dynamic ARP Inspection (DAI).`,
    },
    sqli: {
      name: "siem_regex_sqli.py",
      icon: FileSearch,
      code: `import re

log = '10.0.0.99 - [04/Nov/2026] "GET /user?id=1%20UNION%20SELECT%20null,password%20FROM%20users-- HTTP/1.1" 403'
pattern = re.compile(r"('|\bUNION\b|\bSELECT\b|--)", re.IGNORECASE)

if pattern.search(log):
    print("[🚨 ALERTE SIEM] Signature SQL Injection détectée (T1190) !")
    print("[ACTION] Blocage immédiat de l'adresse 10.0.0.99.")`,
      output: `[*] Analyse du flux d'accès HTTP en cours...
[🚨 ALERTE SIEM] Signature SQL Injection détectée (T1190) !
[ACTION] Blocage immédiat de l'adresse 10.0.0.99.
[SCORE RISQUE] Sévérité CRITIQUE (Score CVSS 9.1)`,
    },
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput("[*] Compilation du script et transmission aux sockets virtuels...\n");
    setTimeout(() => {
      setIsRunning(false);
      setOutput(snippets[activeSnippet].output);
    }, 350);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeSnippet].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-[#0e1117] rounded-3xl border border-[#202735] overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header */}
      <div className="bg-[#141820] px-5 py-3 border-b border-[#202735] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          <span className="ml-2 text-xs font-mono text-ivory font-bold">
            raylab-terminal ~ interactive
          </span>
        </div>

        {/* Snippet selectors */}
        <div className="flex items-center space-x-1.5">
          {(["scan", "arp", "sqli"] as const).map((key) => {
            const item = snippets[key];
            const Icon = item.icon;
            const isSel = activeSnippet === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveSnippet(key);
                  setOutput("[*] Nouveau script sélectionné. Cliquez sur 'Exécuter'.");
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono flex items-center space-x-1 transition-all ${
                  isSel
                    ? "bg-gold/20 text-gold border border-gold/40 font-bold"
                    : "bg-[#181d27] text-ivory-dim hover:text-ivory border border-[#232c3c]"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Editor Preview */}
      <div className="p-4 bg-[#0a0c10] border-b border-[#1b212d] relative">
        <div className="flex items-center justify-between text-[11px] font-mono text-ivory-dim mb-2">
          <span className="text-gold font-semibold">Script Python : {snippets[activeSnippet].name}</span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 hover:text-ivory transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copié" : "Copier"}</span>
          </button>
        </div>
        <pre className="text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre">
          {snippets[activeSnippet].code}
        </pre>
      </div>

      {/* Controls Bar */}
      <div className="bg-[#12161f] px-5 py-2.5 border-b border-[#1f2634] flex items-center justify-between">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="px-4 py-1.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs font-mono flex items-center space-x-2 shadow-gold transition-all disabled:opacity-50"
        >
          <Play className={`w-3 h-3 fill-current ${isRunning ? "animate-spin" : ""}`} />
          <span>{isRunning ? "Calcul en cours..." : "Exécuter dans le Terminal"}</span>
        </button>

        <Link
          href="/lab"
          className="text-xs font-mono text-gold hover:text-gold-light flex items-center space-x-1 font-semibold"
        >
          <span>Ouvrir l&apos;Atelier Complet &gt;&gt;</span>
        </Link>
      </div>

      {/* Terminal Output */}
      <div className="p-4 bg-[#08090c] font-mono text-xs text-ivory-muted min-h-[140px] whitespace-pre-wrap leading-relaxed">
        {output}
      </div>

      {/* Footer Status */}
      <div className="bg-[#0f131a] px-4 py-2 text-[10px] font-mono text-ivory-dim flex items-center justify-between border-t border-[#181d26]">
        <span>Méthodologie CyberPath : 70% Pratique / 30% Théorie</span>
        <span className="text-emerald-400">● Système Opérationnel</span>
      </div>
    </div>
  );
}
