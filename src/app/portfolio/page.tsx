import React from "react";
import Link from "next/link";
import {
  Code2,
  Shield,
  Award,
  ExternalLink,
  CheckCircle2,
  Clock,
  Terminal,
  FileText,
  Share2,
  Download,
  Sparkles,
  ArrowRight,
  Cpu,
  Server,
  Globe,
  Lock,
  Search,
} from "lucide-react";
import { getProjects, getUserDashboard } from "@/lib/data";

export default async function PortfolioPage() {
  const projects = await getProjects();
  const dashboard = await getUserDashboard("user_founder_raylab");
  const user = dashboard?.user || {
    display_name: "Alexandre R.",
    email: "alexandre@raylab.tech",
  };

  const skillsMatrix = [
    {
      category: "Programmation & Automatisation",
      skills: ["Python 3.12 (POO, AsyncIO)", "Sockets TCP AF_INET", "Scripts Bash UNIX", "Parsing de Logs Regex"],
      level: "Avancé",
      icon: Code2,
      color: "text-gold border-gold/30 bg-gold/10",
    },
    {
      category: "Systèmes d'Exploitation & Cloud",
      skills: ["Noyau Linux (POSIX, SUID)", "Démons systemd", "Conteneurs Docker", "GitHub Actions CI/CD"],
      level: "Opérationnel",
      icon: Server,
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    },
    {
      category: "Réseaux & Protocoles",
      skills: ["Modèle OSI & TCP/IP", "Wireshark & tcpdump", "Crafting Scapy ARP", "Protocoles DNS, TLS 1.3"],
      level: "Avancé",
      icon: Globe,
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    },
    {
      category: "Cybersécurité Défensive & SOC",
      skills: ["Corrélation SIEM", "Règles Sigma & YARA", "FIM (File Integrity)", "MITRE ATT&CK Framework"],
      level: "Opérationnel",
      icon: Shield,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    {
      category: "Cryptographie & Forensique",
      skills: ["PBKDF2 & AES-256-GCM", "Chaîne de custody (RFC 3227)", "Artefacts disques/mémoire", "Analyse post-incident"],
      level: "Intermédiaire",
      icon: Lock,
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* 1. PORTFOLIO HERO PROFILE */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#151a24] via-[#11141c] to-[#0d1016] border border-[#232c3b] p-8 lg:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/30 to-gold/10 border-2 border-gold flex items-center justify-center text-gold font-mono font-black text-2xl shadow-gold">
              {user.display_name?.charAt(0) || "R"}
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-black text-ivory tracking-tight">
                  {user.display_name}
                </h1>
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  ✓ Profil Validé RayLab
                </span>
              </div>
              <p className="text-sm text-gold font-mono">
                Développeur Python &amp; Analyste Cybersécurité Défensive (SOC)
              </p>
              <p className="text-xs text-ivory-muted max-w-xl leading-relaxed">
                Apprenant spécialisé dans la conception logicielle sécurisée, l&apos;administration système Linux et la surveillance d&apos;infrastructure. Compétences certifiées par des livrables de code réels et vérifiables.
              </p>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/career/cv-builder"
              className="px-5 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs tracking-wider uppercase transition-all shadow-gold flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Consulter le CV ATS</span>
            </Link>
            <a
              href="https://github.com/raysnothing-sketch"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-[#161a22] hover:bg-[#1d232e] text-ivory border border-[#2b3544] text-xs font-mono flex items-center space-x-2 transition-all"
            >
              <Code2 className="w-4 h-4 text-gold" />
              <span>GitHub Dépôts</span>
              <ExternalLink className="w-3 h-3 text-ivory-dim" />
            </a>
          </div>
        </div>

        {/* Verified Stats Bar */}
        <div className="mt-10 pt-6 border-t border-[#1d2532] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-3 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-gold font-mono">7 Projets</div>
            <div className="text-[11px] text-ivory-dim font-mono">Capstones Validés</div>
          </div>
          <div className="p-3 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-ivory font-mono">12 Volumes</div>
            <div className="text-[11px] text-ivory-dim font-mono">CyberPath 2026-2027</div>
          </div>
          <div className="p-3 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-emerald-400 font-mono">100% Pratique</div>
            <div className="text-[11px] text-ivory-dim font-mono">Formule Google XYZ</div>
          </div>
          <div className="p-3 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-purple-400 font-mono">Turso libSQL</div>
            <div className="text-[11px] text-ivory-dim font-mono">Preuves Persistantes</div>
          </div>
        </div>
      </div>

      {/* 2. MATRICE DES COMPÉTENCES VÉRIFIÉES */}
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Évaluations &amp; Savoir-Faire Opérationnel</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ivory">
            Matrice des Compétences Techniques
          </h2>
          <p className="text-xs sm:text-sm text-ivory-muted max-w-3xl leading-relaxed">
            Chaque compétence répertoriée correspond à des exercices réussis dans le bac à sable WASM ou des scripts testés unitairement dans le cadre des cursus RayLab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsMatrix.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#141820] rounded-2xl border border-[#222935] p-6 space-y-4 hover:border-gold/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-gold px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/20">
                    {item.level}
                  </span>
                </div>
                <h3 className="text-base font-bold text-ivory">{item.category}</h3>
                <ul className="space-y-2 text-xs text-ivory-muted">
                  {item.skills.map((sk, sIdx) => (
                    <li key={sIdx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. LES 7 PROJETS CAPSTONES ET LEURS LIVRABLES GITHUB */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Livrables d&apos;Ingénierie &amp; Code Source</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ivory">
              Projets Capstones du Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-ivory-muted">
              Réalisations complètes prêtes à être inspectées en entretien technique ou par des recruteurs
            </p>
          </div>
          <span className="text-xs font-mono text-gold px-3 py-1 rounded-full bg-gold/10 border border-gold/30 self-start sm:self-auto">
            7 / 7 Projets Disponibles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#141820] rounded-2xl border border-[#222935] p-6 hover:border-gold/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-[10px] font-bold uppercase">
                    {proj.domain}
                  </span>
                  <span className="text-ivory-dim">~{Math.round(proj.estimated_minutes / 60)}h</span>
                </div>
                <h3 className="text-lg font-bold text-ivory group-hover:text-gold transition-colors">
                  <Link href={`/projects/${proj.slug}`}>{proj.title}</Link>
                </h3>
                <p className="text-xs text-ivory-muted leading-relaxed line-clamp-3">
                  {proj.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1d232e] flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-mono flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Spécification validée</span>
                </span>
                <Link
                  href={`/projects/${proj.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-gold/10 hover:bg-gold hover:text-[#101216] text-gold text-xs font-mono font-semibold transition-all"
                >
                  Fiche &amp; Dépôt →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ATTESTATION DE COMPLÉTION INTERNE RAYLAB */}
      <div className="bg-[#11151c] rounded-3xl border border-[#222a38] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold">
            <Award className="w-4 h-4 text-gold" />
            <span>Transparence &amp; Déontologie RayLab (Section 13.2)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-ivory">
            Attestation de Réussite aux Travaux Pratiques de Laboratoire
          </h3>
          <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed">
            Ce portfolio certifie la réalisation effective des travaux pratiques au sein de RayLab. RayLab ne se substitue pas aux examens d&apos;État ou éditeurs surveillés (CompTIA, Cisco, LPI) mais fournit la preuve technique irréfutable de la maîtrise opérationnelle du candidat.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/certifications"
            className="px-5 py-3 rounded-xl bg-[#181d26] hover:bg-[#202735] text-ivory text-xs font-mono font-semibold border border-[#2b3544] text-center"
          >
            Guide des Certifications
          </Link>
          <Link
            href="/career/cv-builder"
            className="px-5 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider shadow-gold text-center"
          >
            Télécharger le CV ATS
          </Link>
        </div>
      </div>
    </div>
  );
}
