"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Shield, CheckCircle2, RotateCcw, Copy, Check, Maximize2, Minimize2 } from "lucide-react";

type FileEntry = {
  name: string;
  type: "file" | "dir";
  content?: string;
  permissions: string; // e.g. "-rwxr-xr-x" or "drwxr-xr-x"
  owner: string;
  group: string;
  size: number;
  updatedAt: string;
};

type VirtualFS = Record<string, Record<string, FileEntry>>;

export default function LinuxTerminalEmulator() {
  const [isRoot, setIsRoot] = useState(false);
  const [currentDir, setCurrentDir] = useState("/home/raylab");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial Virtual File System (UNIX Tree)
  const initialFS: VirtualFS = {
    "/": {
      bin: { name: "bin", type: "dir", permissions: "drwxr-xr-x", owner: "root", group: "root", size: 4096, updatedAt: "Nov 04 20:00" },
      etc: { name: "etc", type: "dir", permissions: "drwxr-xr-x", owner: "root", group: "root", size: 4096, updatedAt: "Nov 04 20:00" },
      home: { name: "home", type: "dir", permissions: "drwxr-xr-x", owner: "root", group: "root", size: 4096, updatedAt: "Nov 04 20:00" },
      var: { name: "var", type: "dir", permissions: "drwxr-xr-x", owner: "root", group: "root", size: 4096, updatedAt: "Nov 04 20:00" },
      tmp: { name: "tmp", type: "dir", permissions: "drwxrwxrwt", owner: "root", group: "root", size: 4096, updatedAt: "Nov 04 20:00" },
      opt: { name: "opt", type: "dir", permissions: "drwxr-xr-x", owner: "root", group: "root", size: 4096, updatedAt: "Nov 04 20:00" },
    },
    "/bin": {
      bash: { name: "bash", type: "file", content: "ELF 64-bit LSB executable, x86-64", permissions: "-rwxr-xr-x", owner: "root", group: "root", size: 1254384, updatedAt: "Nov 04 12:00" },
      ls: { name: "ls", type: "file", content: "ELF 64-bit LSB executable", permissions: "-rwxr-xr-x", owner: "root", group: "root", size: 142144, updatedAt: "Nov 04 12:00" },
      cat: { name: "cat", type: "file", content: "ELF 64-bit LSB executable", permissions: "-rwxr-xr-x", owner: "root", group: "root", size: 43416, updatedAt: "Nov 04 12:00" },
      python3: { name: "python3", type: "file", content: "Python 3.12.3 ELF binary", permissions: "-rwxr-xr-x", owner: "root", group: "root", size: 5493240, updatedAt: "Nov 04 12:00" },
      find: { name: "find", type: "file", content: "ELF 64-bit executable with SUID", permissions: "-rwsr-xr-x", owner: "root", group: "root", size: 245120, updatedAt: "Nov 04 12:00" },
    },
    "/etc": {
      passwd: {
        name: "passwd",
        type: "file",
        content: `root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nraylab:x:1000:1000:RayLab Student:/home/raylab:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nnobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin`,
        permissions: "-rw-r--r--",
        owner: "root",
        group: "root",
        size: 284,
        updatedAt: "Nov 04 14:15",
      },
      shadow: {
        name: "shadow",
        type: "file",
        content: `root:$6$raylab$eH7.9qB...:19800:0:99999:7:::\nraylab:$6$salt2026$8Jk2Lm...:19800:0:99999:7:::`,
        permissions: "-rw-r-----",
        owner: "root",
        group: "shadow",
        size: 156,
        updatedAt: "Nov 04 14:15",
      },
      "os-release": {
        name: "os-release",
        type: "file",
        content: `NAME="RayLab GNU/Linux Hardened"\nVERSION="2026.1 (CyberPath Edition)"\nID=raylab\nID_LIKE=debian\nPRETTY_NAME="RayLab Linux 6.8.0-hardened x86_64"`,
        permissions: "-rw-r--r--",
        owner: "root",
        group: "root",
        size: 168,
        updatedAt: "Nov 04 10:00",
      },
      hosts: {
        name: "hosts",
        type: "file",
        content: `127.0.0.1   localhost\n127.0.1.1   raylab-node-01.internal\n192.168.1.1 gateway.router\n192.168.1.50 target.corp`,
        permissions: "-rw-r--r--",
        owner: "root",
        group: "root",
        size: 134,
        updatedAt: "Nov 04 10:00",
      },
      "sshd_config": {
        name: "sshd_config",
        type: "file",
        content: `# RayLab Hardened OpenSSH Server Config\nPort 22\nPermitRootLogin no\nPasswordAuthentication no\nPubkeyAuthentication yes\nX11Forwarding no`,
        permissions: "-rw-r--r--",
        owner: "root",
        group: "root",
        size: 182,
        updatedAt: "Nov 04 11:30",
      }
    },
    "/home": {
      raylab: { name: "raylab", type: "dir", permissions: "drwxr-xr-x", owner: "raylab", group: "raylab", size: 4096, updatedAt: "Nov 04 18:00" },
    },
    "/home/raylab": {
      "welcome.txt": {
        name: "welcome.txt",
        type: "file",
        content: `Bienvenue sur le terminal virtuel Linux de RayLab !\nVous disposez ici d'un environnement Unix interactif avec système de fichiers complet.\nTapez 'help' pour voir la liste des commandes disponibles.\nBonne pratique et bon apprentissage !`,
        permissions: "-rw-r--r--",
        owner: "raylab",
        group: "raylab",
        size: 212,
        updatedAt: "Nov 04 18:05",
      },
      "audit_scan.py": {
        name: "audit_scan.py",
        type: "file",
        content: `import socket\n\nports = [22, 80, 443]\nprint("[*] Audit de connectivite sur localhost :")\nfor p in ports:\n    s = socket.socket()\n    s.settimeout(0.2)\n    res = s.connect_ex(('127.0.0.1', p))\n    print(f" Port {p}: {'OUVERT' if res == 0 else 'FERME'}")\n    s.close()`,
        permissions: "-rwxr-xr-x",
        owner: "raylab",
        group: "raylab",
        size: 310,
        updatedAt: "Nov 04 19:20",
      },
      "recon.sh": {
        name: "recon.sh",
        type: "file",
        content: `#!/bin/bash\necho "=== RECONNAISSANCE SYSTEME RAYLAB ==="\nuname -a\nid\nip a\nnetstat -tulpn`,
        permissions: "-rwxr-xr-x",
        owner: "raylab",
        group: "raylab",
        size: 104,
        updatedAt: "Nov 04 19:22",
      },
    },
    "/var": {
      log: { name: "log", type: "dir", permissions: "drwxr-xr-x", owner: "root", group: "root", size: 4096, updatedAt: "Nov 04 15:00" },
    },
    "/var/log": {
      "auth.log": {
        name: "auth.log",
        type: "file",
        content: `Nov 04 14:10:01 raylab sshd[1245]: Accepted publickey for raylab from 192.168.1.10 port 51234\nNov 04 14:12:15 raylab sshd[1299]: Failed password for invalid user admin from 185.220.101.5 port 44122 ssh2\nNov 04 14:12:18 raylab sshd[1301]: Failed password for invalid user test from 185.220.101.5 port 44124 ssh2\nNov 04 14:15:30 raylab sudo: raylab : TTY=pts/0 ; PWD=/home/raylab ; USER=root ; COMMAND=/bin/cat /etc/shadow`,
        permissions: "-rw-r-----",
        owner: "root",
        group: "adm",
        size: 450,
        updatedAt: "Nov 04 14:15",
      },
      "syslog": {
        name: "syslog",
        type: "file",
        content: `Nov 04 14:00:00 raylab kernel: [    0.000000] Linux version 6.8.0-hardened-raylab\nNov 04 14:00:05 raylab systemd[1]: Started OpenBSD Secure Shell server.\nNov 04 14:00:10 raylab systemd[1]: Started Nginx HTTP and reverse proxy server.`,
        permissions: "-rw-r--r--",
        owner: "root",
        group: "adm",
        size: 260,
        updatedAt: "Nov 04 14:00",
      },
    },
    "/tmp": {},
    "/opt": {},
  };

  const [fs, setFs] = useState<VirtualFS>(initialFS);
  const [outputLines, setOutputLines] = useState<Array<{ type: "input" | "output" | "error" | "info"; text: string }>>([
    {
      type: "info",
      text: "RayLab GNU/Linux 6.8.0-hardened (x86_64)\nBienvenue dans votre environnement virtuel Linux interactif.\nTapez 'help' pour afficher la liste des commandes disponibles, ou 'cat welcome.txt'.",
    },
  ]);

  // Focus input automatically on click
  useEffect(() => {
    inputRef.current?.focus();
  }, [outputLines]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputLines]);

  // Helper to normalize paths
  const resolvePath = (target: string): string => {
    if (!target || target === "." || target === "./") return currentDir;
    if (target === "~") return "/home/raylab";
    if (target.startsWith("~/")) return `/home/raylab/${target.slice(2)}`;
    
    let path = target.startsWith("/") ? target : `${currentDir === "/" ? "" : currentDir}/${target}`;
    const segments = path.split("/").filter(Boolean);
    const resolved: string[] = [];
    
    for (const seg of segments) {
      if (seg === "..") {
        resolved.pop();
      } else if (seg !== ".") {
        resolved.push(seg);
      }
    }
    return `/${resolved.join("/")}`;
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) {
      setOutputLines((prev) => [...prev, { type: "input", text: getPrompt() }]);
      return;
    }

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    setOutputLines((prev) => [...prev, { type: "input", text: `${getPrompt()}${trimmed}` }]);

    // Support simple pipe `|`
    if (trimmed.includes("|")) {
      const parts = trimmed.split("|").map((p) => p.trim());
      handlePipeline(parts);
      return;
    }

    // Support redirection `>` or `>>`
    if (trimmed.includes(">")) {
      handleRedirection(trimmed);
      return;
    }

    const tokens = trimmed.split(/\s+/);
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    handleSingleCommand(cmd, args);
  };

  const getPrompt = () => {
    const user = isRoot ? "root" : "raylab";
    const symbol = isRoot ? "#" : "$";
    const displayDir = currentDir === "/home/raylab" ? "~" : currentDir;
    return `${user}@raylab-node:${displayDir}${symbol} `;
  };

  const handleSingleCommand = (cmd: string, args: string[]) => {
    switch (cmd) {
      case "help":
        setOutputLines((prev) => [
          ...prev,
          {
            type: "info",
            text: `Commandes Linux supportées dans le Labo :
  • Navigation : pwd, cd [dir], ls [-l|-la|-a]
  • Fichiers   : cat [file], touch [file], mkdir [dir], rm [file], rmdir [dir]
  • Écriture   : echo "texte" > fichier.txt (ou >> pour ajouter)
  • Filtrage   : grep [pattern] [file] (supporte les pipes '|')
  • Droits     : chmod [octal] [file] (ex: chmod 755, chmod 4755 pour SUID)
  • Identité   : whoami, id, sudo su, sudo [commande], exit
  • Réseau     : ip a, ifconfig, ping [host], netstat [-tulpn], ss, nmap [cible]
  • Système    : ps [aux], uname [-a], date, uptime, history, clear, reset
  • Python     : python3 [script.py] ou python3 -c "code"`,
          },
        ]);
        break;

      case "clear":
        setOutputLines([]);
        break;

      case "reset":
        setFs(initialFS);
        setCurrentDir("/home/raylab");
        setIsRoot(false);
        setOutputLines([{ type: "info", text: "Système de fichiers et terminal réinitialisés à l'état usine." }]);
        break;

      case "pwd":
        setOutputLines((prev) => [...prev, { type: "output", text: currentDir }]);
        break;

      case "whoami":
        setOutputLines((prev) => [...prev, { type: "output", text: isRoot ? "root" : "raylab" }]);
        break;

      case "id":
        if (isRoot) {
          setOutputLines((prev) => [
            ...prev,
            { type: "output", text: "uid=0(root) gid=0(root) groups=0(root)" },
          ]);
        } else {
          setOutputLines((prev) => [
            ...prev,
            { type: "output", text: "uid=1000(raylab) gid=1000(raylab) groups=1000(raylab),27(sudo),100(users)" },
          ]);
        }
        break;

      case "uname":
        if (args.includes("-a")) {
          setOutputLines((prev) => [
            ...prev,
            {
              type: "output",
              text: "Linux raylab-node 6.8.0-hardened #1 SMP PREEMPT_DYNAMIC Wed Nov 4 20:00:00 UTC 2026 x86_64 GNU/Linux",
            },
          ]);
        } else {
          setOutputLines((prev) => [...prev, { type: "output", text: "Linux" }]);
        }
        break;

      case "date":
        setOutputLines((prev) => [...prev, { type: "output", text: new Date().toUTCString() }]);
        break;

      case "uptime":
        setOutputLines((prev) => [
          ...prev,
          { type: "output", text: " 20:45:12 up 14 days,  3:12,  2 users,  load average: 0.08, 0.04, 0.01" },
        ]);
        break;

      case "sudo":
        if (args.length === 0 || args[0] === "su") {
          setIsRoot(true);
          setOutputLines((prev) => [
            ...prev,
            { type: "info", text: "[+] Privilèges administrateur root accordés (#)." },
          ]);
        } else {
          const subCmd = args[0];
          const subArgs = args.slice(1);
          // Run as root temporarily
          const prevRoot = isRoot;
          setIsRoot(true);
          handleSingleCommand(subCmd, subArgs);
          setIsRoot(prevRoot);
        }
        break;

      case "exit":
        if (isRoot) {
          setIsRoot(false);
          setOutputLines((prev) => [...prev, { type: "info", text: "Déconnexion de root. Retour au compte 'raylab'." }]);
        } else {
          setOutputLines((prev) => [
            ...prev,
            { type: "info", text: "Session utilisateur terminée. Tapez 'clear' pour nettoyer l'écran." },
          ]);
        }
        break;

      case "cd":
        handleCd(args[0] || "~");
        break;

      case "ls":
        handleLs(args);
        break;

      case "cat":
        handleCat(args);
        break;

      case "touch":
        handleTouch(args);
        break;

      case "mkdir":
        handleMkdir(args);
        break;

      case "rm":
        handleRm(args);
        break;

      case "chmod":
        handleChmod(args);
        break;

      case "echo":
        setOutputLines((prev) => [...prev, { type: "output", text: args.join(" ").replace(/^["']|["']$/g, "") }]);
        break;

      case "grep":
        handleGrep(args);
        break;

      case "ps":
        setOutputLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `  PID TTY          TIME CMD
    1 ?        00:00:02 systemd
  342 ?        00:00:00 systemd-journald
  512 ?        00:00:01 sshd: /usr/sbin/sshd -D [listener]
  784 ?        00:00:02 nginx: master process /usr/sbin/nginx
  785 ?        00:00:00 nginx: worker process
 1240 pts/0    00:00:00 bash (raylab)
 1337 ?        00:00:05 python3 /home/raylab/audit_scan.py`,
          },
        ]);
        break;

      case "ip":
      case "ifconfig":
        setOutputLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP
    link/ether de:ad:be:ef:00:01 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.50/24 brd 192.168.1.255 scope global eth0`,
          },
        ]);
        break;

      case "ping":
        const target = args[0] || "127.0.0.1";
        setOutputLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `PING ${target} (${target}) 56(84) bytes of data.
64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.038 ms
64 bytes from ${target}: icmp_seq=2 ttl=64 time=0.042 ms
64 bytes from ${target}: icmp_seq=3 ttl=64 time=0.035 ms

--- ${target} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2045ms
rtt min/avg/max = 0.035/0.038/0.042 ms`,
          },
        ]);
        break;

      case "netstat":
      case "ss":
        setOutputLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `State      Recv-Q Send-Q Local Address:Port               Peer Address:Port
LISTEN     0      128    0.0.0.0:22                      0.0.0.0:*
LISTEN     0      511    0.0.0.0:80                      0.0.0.0:*
LISTEN     0      511    0.0.0.0:443                     0.0.0.0:*
ESTAB      0      0      192.168.1.50:51234               192.168.1.1:443`,
          },
        ]);
        break;

      case "nmap":
        const nTarget = args[args.length - 1] || "127.0.0.1";
        setOutputLines((prev) => [
          ...prev,
          {
            type: "output",
            text: `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString()}
Nmap scan report for ${nTarget}
Host is up (0.00021s latency).
Not shown: 997 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.6 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http    nginx 1.18.0 (Ubuntu)
443/tcp  open  ssl/http nginx 1.18.0 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds`,
          },
        ]);
        break;

      case "python":
      case "python3":
        if (args.includes("-c")) {
          const codeIdx = args.indexOf("-c") + 1;
          const code = args.slice(codeIdx).join(" ").replace(/^["']|["']$/g, "");
          try {
            // Safe in-terminal quick evaluator
            if (code.includes("print(")) {
              const inside = code.replace(/.*print\((.*)\).*/, "$1");
              setOutputLines((prev) => [...prev, { type: "output", text: inside.replace(/['"]/g, "") }]);
            } else {
              setOutputLines((prev) => [...prev, { type: "output", text: "[Python3] Script exécuté avec succès (code 0)." }]);
            }
          } catch (e: any) {
            setOutputLines((prev) => [...prev, { type: "error", text: `SyntaxError: ${e.message}` }]);
          }
        } else if (args.length > 0) {
          const fullPath = resolvePath(args[0]);
          const dir = fullPath.substring(0, fullPath.lastIndexOf("/")) || "/";
          const file = fullPath.substring(fullPath.lastIndexOf("/") + 1);
          if (fs[dir]?.[file]) {
            setOutputLines((prev) => [
              ...prev,
              {
                type: "output",
                text: `[*] Exécution de ${file} sous Python 3.12.3...\n` +
                  (file === "audit_scan.py"
                    ? `[*] Audit de connectivite sur localhost :\n Port 22: OUVERT\n Port 80: OUVERT\n Port 443: OUVERT\n[✓] Audit terminé.`
                    : `[Python3] Fichier ${file} exécuté sans erreur.`),
              },
            ]);
          } else {
            setOutputLines((prev) => [...prev, { type: "error", text: `python3: can't open file '${args[0]}': No such file or directory` }]);
          }
        } else {
          setOutputLines((prev) => [
            ...prev,
            { type: "info", text: "Python 3.12.3 (main, Nov 4 2026, 12:00:00) [GCC 13.2.0]\nPour exécuter du code complet en direct, ouvrez l'onglet 'Exécution Python (WASM)' ci-dessus." },
          ]);
        }
        break;

      default:
        setOutputLines((prev) => [
          ...prev,
          { type: "error", text: `bash: ${cmd}: commande introuvable. Tapez 'help' pour la liste des commandes.` },
        ]);
        break;
    }
  };

  const handleCd = (target: string) => {
    const resolved = resolvePath(target);
    if (fs[resolved] !== undefined) {
      setCurrentDir(resolved);
    } else {
      setOutputLines((prev) => [...prev, { type: "error", text: `bash: cd: ${target}: Aucun dossier de ce type` }]);
    }
  };

  const handleLs = (args: string[]) => {
    const isLong = args.includes("-l") || args.includes("-la") || args.includes("-al") || args.includes("ll");
    const showHidden = args.includes("-a") || args.includes("-la") || args.includes("-al");

    const entries = fs[currentDir] || {};
    const names = Object.keys(entries);

    if (names.length === 0) {
      return;
    }

    if (isLong) {
      let output = `total ${names.length * 4}\n`;
      if (showHidden) {
        output += `drwxr-xr-x  2 ${isRoot ? "root root" : "raylab raylab"}  4096 Nov 04 20:00 .\n`;
        output += `drwxr-xr-x  4 root   root    4096 Nov 04 20:00 ..\n`;
      }
      for (const name of names) {
        const item = entries[name];
        output += `${item.permissions} 1 ${item.owner.padEnd(6)} ${item.group.padEnd(6)} ${item.size.toString().padStart(7)} ${item.updatedAt} ${item.name}\n`;
      }
      setOutputLines((prev) => [...prev, { type: "output", text: output.trimEnd() }]);
    } else {
      const output = names.join("  ");
      setOutputLines((prev) => [...prev, { type: "output", text: output }]);
    }
  };

  const handleCat = (args: string[]) => {
    if (args.length === 0) {
      setOutputLines((prev) => [...prev, { type: "error", text: "cat: argument de fichier manquant" }]);
      return;
    }

    const target = args[0];
    const fullPath = resolvePath(target);
    const dir = fullPath.substring(0, fullPath.lastIndexOf("/")) || "/";
    const file = fullPath.substring(fullPath.lastIndexOf("/") + 1);

    // Permission check for /etc/shadow
    if (fullPath === "/etc/shadow" && !isRoot) {
      setOutputLines((prev) => [
        ...prev,
        { type: "error", text: "cat: /etc/shadow: Permission non accordée (lecture réservée à root ! Tapez 'sudo cat /etc/shadow')" },
      ]);
      return;
    }

    if (fs[dir]?.[file]) {
      const item = fs[dir][file];
      if (item.type === "dir") {
        setOutputLines((prev) => [...prev, { type: "error", text: `cat: ${target}: Est un dossier` }]);
      } else {
        setOutputLines((prev) => [...prev, { type: "output", text: item.content || "(fichier vide)" }]);
      }
    } else {
      setOutputLines((prev) => [...prev, { type: "error", text: `cat: ${target}: Aucun fichier de ce type` }]);
    }
  };

  const handleTouch = (args: string[]) => {
    if (args.length === 0) return;
    const target = args[0];
    const fullPath = resolvePath(target);
    const dir = fullPath.substring(0, fullPath.lastIndexOf("/")) || "/";
    const file = fullPath.substring(fullPath.lastIndexOf("/") + 1);

    if (fs[dir]) {
      setFs((prev) => ({
        ...prev,
        [dir]: {
          ...prev[dir],
          [file]: {
            name: file,
            type: "file",
            content: "",
            permissions: "-rw-r--r--",
            owner: isRoot ? "root" : "raylab",
            group: isRoot ? "root" : "raylab",
            size: 0,
            updatedAt: "Nov 04 20:50",
          },
        },
      }));
    } else {
      setOutputLines((prev) => [...prev, { type: "error", text: `touch: impossible de toucher '${target}': Dossier parent inexistant` }]);
    }
  };

  const handleMkdir = (args: string[]) => {
    if (args.length === 0) return;
    const target = args[0];
    const fullPath = resolvePath(target);
    const dir = fullPath.substring(0, fullPath.lastIndexOf("/")) || "/";
    const newDir = fullPath.substring(fullPath.lastIndexOf("/") + 1);

    if (fs[dir]) {
      setFs((prev) => ({
        ...prev,
        [dir]: {
          ...prev[dir],
          [newDir]: {
            name: newDir,
            type: "dir",
            permissions: "drwxr-xr-x",
            owner: isRoot ? "root" : "raylab",
            group: isRoot ? "root" : "raylab",
            size: 4096,
            updatedAt: "Nov 04 20:50",
          },
        },
        [fullPath]: {},
      }));
    } else {
      setOutputLines((prev) => [...prev, { type: "error", text: `mkdir: impossible de créer le dossier '${target}': Chemin invalide` }]);
    }
  };

  const handleRm = (args: string[]) => {
    if (args.length === 0) return;
    const target = args[0];
    const fullPath = resolvePath(target);
    const dir = fullPath.substring(0, fullPath.lastIndexOf("/")) || "/";
    const file = fullPath.substring(fullPath.lastIndexOf("/") + 1);

    if (fs[dir]?.[file]) {
      setFs((prev) => {
        const copy = { ...prev };
        const dirCopy = { ...copy[dir] };
        delete dirCopy[file];
        copy[dir] = dirCopy;
        return copy;
      });
    } else {
      setOutputLines((prev) => [...prev, { type: "error", text: `rm: impossible de supprimer '${target}': Fichier inexistant` }]);
    }
  };

  const handleChmod = (args: string[]) => {
    if (args.length < 2) {
      setOutputLines((prev) => [...prev, { type: "error", text: "chmod: opérande manquant. Syntaxe: chmod [octal] [fichier]" }]);
      return;
    }
    const mode = args[0];
    const target = args[1];
    const fullPath = resolvePath(target);
    const dir = fullPath.substring(0, fullPath.lastIndexOf("/")) || "/";
    const file = fullPath.substring(fullPath.lastIndexOf("/") + 1);

    if (fs[dir]?.[file]) {
      let permString = "-rw-r--r--";
      if (mode === "755") permString = "-rwxr-xr-x";
      if (mode === "777") permString = "-rwxrwxrwx";
      if (mode === "600") permString = "-rw-------";
      if (mode === "644") permString = "-rw-r--r--";
      if (mode === "4755") permString = "-rwsr-xr-x"; // SUID !

      setFs((prev) => ({
        ...prev,
        [dir]: {
          ...prev[dir],
          [file]: {
            ...prev[dir][file],
            permissions: permString,
          },
        },
      }));
      setOutputLines((prev) => [
        ...prev,
        { type: "info", text: `[+] Droits de '${file}' modifiés en ${mode} (${permString}).` },
      ]);
    } else {
      setOutputLines((prev) => [...prev, { type: "error", text: `chmod: impossible d'accéder à '${target}': Aucun fichier de ce type` }]);
    }
  };

  const handleGrep = (args: string[], inputPipeText?: string) => {
    if (args.length === 0) return;
    const pattern = args[0].replace(/^["']|["']$/g, "");
    let textToSearch = inputPipeText || "";

    if (!inputPipeText && args.length >= 2) {
      const target = args[1];
      const fullPath = resolvePath(target);
      const dir = fullPath.substring(0, fullPath.lastIndexOf("/")) || "/";
      const file = fullPath.substring(fullPath.lastIndexOf("/") + 1);
      if (fs[dir]?.[file]) {
        textToSearch = fs[dir][file].content || "";
      } else {
        setOutputLines((prev) => [...prev, { type: "error", text: `grep: ${target}: Aucun fichier de ce type` }]);
        return;
      }
    }

    const reg = new RegExp(pattern, "i");
    const matching = textToSearch.split("\n").filter((l) => reg.test(l));
    if (matching.length > 0) {
      setOutputLines((prev) => [...prev, { type: "output", text: matching.join("\n") }]);
    }
  };

  const handlePipeline = (parts: string[]) => {
    // Basic 2-command pipeline: cmd1 | grep pattern
    const [c1, c2] = parts;
    if (c2.startsWith("grep ")) {
      const pattern = c2.replace("grep ", "").trim().replace(/^["']|["']$/g, "");
      const c1Tokens = c1.split(/\s+/);
      const cmd = c1Tokens[0];
      const args = c1Tokens.slice(1);

      let textOutput = "";
      if (cmd === "cat" && args.length > 0) {
        const fullPath = resolvePath(args[0]);
        const dir = fullPath.substring(0, fullPath.lastIndexOf("/")) || "/";
        const file = fullPath.substring(fullPath.lastIndexOf("/") + 1);
        textOutput = fs[dir]?.[file]?.content || "";
      } else if (cmd === "ps") {
        textOutput = "  PID TTY TIME CMD\n    1 ?   00:00:02 systemd\n  512 ?   00:00:01 sshd\n  784 ?   00:00:02 nginx\n 1337 ?   00:00:05 python3";
      }

      handleGrep([pattern], textOutput);
    } else {
      setOutputLines((prev) => [...prev, { type: "error", text: "Pipeline complexe non supporté dans la simulation simple." }]);
    }
  };

  const handleRedirection = (cmdStr: string) => {
    const isAppend = cmdStr.includes(">>");
    const delimiter = isAppend ? ">>" : ">";
    const [left, right] = cmdStr.split(delimiter).map((s) => s.trim());
    const targetFile = right;
    const content = left.replace(/^echo\s+/, "").replace(/^["']|["']$/g, "");

    const fullPath = resolvePath(targetFile);
    const dir = fullPath.substring(0, fullPath.lastIndexOf("/")) || "/";
    const file = fullPath.substring(fullPath.lastIndexOf("/") + 1);

    if (fs[dir]) {
      const prevContent = isAppend && fs[dir][file] ? (fs[dir][file].content || "") + "\n" : "";
      setFs((prev) => ({
        ...prev,
        [dir]: {
          ...prev[dir],
          [file]: {
            name: file,
            type: "file",
            content: prevContent + content,
            permissions: "-rw-r--r--",
            owner: isRoot ? "root" : "raylab",
            group: isRoot ? "root" : "raylab",
            size: (prevContent + content).length,
            updatedAt: "Nov 04 20:55",
          },
        },
      }));
    } else {
      setOutputLines((prev) => [...prev, { type: "error", text: `bash: ${targetFile}: Chemin invalide` }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInputVal("");
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx] || "");
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Auto-complete files/folders in current dir
      const tokens = inputVal.split(" ");
      const lastToken = tokens[tokens.length - 1];
      if (lastToken) {
        const entries = Object.keys(fs[currentDir] || {});
        const match = entries.find((n) => n.startsWith(lastToken));
        if (match) {
          tokens[tokens.length - 1] = match;
          setInputVal(tokens.join(" "));
        }
      }
    }
  };

  return (
    <div
      className={`bg-[#0a0d13] rounded-3xl border border-[#202735] overflow-hidden shadow-2xl flex flex-col font-mono text-xs transition-all ${
        isFullScreen ? "fixed inset-4 z-50 rounded-2xl" : "h-[540px]"
      }`}
    >
      {/* Top Header Bar */}
      <div className="bg-[#12161f] px-5 py-3 border-b border-[#202735] flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setOutputLines([])} title="Clear terminal" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer" onClick={() => handleSingleCommand("reset", [])} title="Reset system" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer" onClick={() => setIsFullScreen(!isFullScreen)} title="Toggle fullscreen" />
          <span className="ml-2 text-xs font-bold text-ivory flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-gold" />
            <span>raylab-bash — {isRoot ? "root@raylab-node:~#" : "raylab@raylab-node:~$"}</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-gold/10 text-gold text-[10px] font-bold border border-gold/30">
            Linux 6.8.0-hardened
          </span>
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1.5 rounded-lg text-ivory-dim hover:text-ivory hover:bg-[#1a202c] transition-colors"
            title="Plein écran"
          >
            {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Screen & Scroll Area */}
      <div
        className="flex-1 p-5 overflow-y-auto space-y-2 bg-[#080a0e] text-ivory-muted leading-relaxed select-text"
        onClick={() => inputRef.current?.focus()}
      >
        {outputLines.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line.type === "input" && (
              <span className="text-emerald-400 font-bold">{line.text}</span>
            )}
            {line.type === "output" && (
              <span className="text-ivory-muted">{line.text}</span>
            )}
            {line.type === "error" && (
              <span className="text-red-400 font-semibold">{line.text}</span>
            )}
            {line.type === "info" && (
              <span className="text-gold/90">{line.text}</span>
            )}
          </div>
        ))}

        {/* Live Input Prompt */}
        <div className="flex items-center space-x-1 text-emerald-400 font-bold pt-1">
          <span>{getPrompt()}</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-xs caret-gold p-0"
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Bottom Command Helpers */}
      <div className="bg-[#0e1219] px-4 py-2 border-t border-[#1c222e] text-[11px] text-ivory-dim flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-gold font-bold">Raccourcis :</span>
          <span>Tab (Autocomplétion)</span>
          <span>•</span>
          <span>↑/↓ (Historique)</span>
          <span>•</span>
          <span className="text-emerald-400 cursor-pointer hover:underline" onClick={() => executeCommand("ls -la")}>ls -la</span>
          <span>•</span>
          <span className="text-emerald-400 cursor-pointer hover:underline" onClick={() => executeCommand("cat /etc/passwd")}>cat /etc/passwd</span>
          <span>•</span>
          <span className="text-emerald-400 cursor-pointer hover:underline" onClick={() => executeCommand("sudo su")}>sudo su</span>
        </div>
        <div>
          <span className="text-emerald-400">● Système Fichiers Actif</span>
        </div>
      </div>
    </div>
  );
}
