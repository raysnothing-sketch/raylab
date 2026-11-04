"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Shield,
  Award,
  Sparkles,
  Server,
  Code2,
  Globe,
  Flame,
  Search,
  Cloud,
  Briefcase,
  Layers,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { LearningPath } from "@/lib/data";

interface PathsCatalogClientProps {
  paths: LearningPath[];
}

export default function PathsCatalogClient({ paths }: PathsCatalogClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const getPathIcon = (slug: string) => {
    if (slug.includes("python")) return Code2;
    if (slug.includes("system") || slug.includes("linux")) return Server;
    if (slug.includes("reseau")) return Globe;
    if (slug.includes("cybersecurity") || slug.includes("blue")) return Shield;
    if (slug.includes("ethical") || slug.includes("offensive") || slug.includes("pentest")) return Flame;
    if (slug.includes("forensic") || slug.includes("dfir")) return Search;
    if (slug.includes("cloud") || slug.includes("devsecops")) return Cloud;
    if (slug.includes("ia")) return Sparkles;
    if (slug.includes("career")) return Briefcase;
    return Award;
  };

  const getPathAccentColor = (slug: string) => {
    if (slug.includes("python")) return "text-gold border-gold/30 bg-gold/10";
    if (slug.includes("system") || slug.includes("linux")) return "text-blue-400 border-blue-500/30 bg-blue-500/10";
    if (slug.includes("reseau")) return "text-cyan-400 border-cyan-500/30 bg-cyan-500/10";
    if (slug.includes("cybersecurity") || slug.includes("blue")) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (slug.includes("ethical") || slug.includes("offensive") || slug.includes("pentest")) return "text-rose-400 border-rose-500/30 bg-rose-500/10";
    if (slug.includes("forensic") || slug.includes("dfir")) return "text-purple-400 border-purple-500/30 bg-purple-500/10";
    if (slug.includes("cloud") || slug.includes("devsecops")) return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    if (slug.includes("ia")) return "text-indigo-400 border-indigo-500/30 bg-indigo-500/10";
    if (slug.includes("career")) return "text-teal-400 border-teal-500/30 bg-teal-500/10";
    return "text-gold border-gold/30 bg-gold/10";
  };

  const getDomainFromSlug = (slug: string): string => {
    if (slug.includes("python")) return "python";
    if (slug.includes("system") || slug.includes("linux")) return "systems";
    if (slug.includes("reseau")) return "networks";
    if (slug.includes("cybersecurity") || slug.includes("blue")) return "blue_team";
    if (slug.includes("ethical") || slug.includes("offensive") || slug.includes("pentest")) return "offensive";
    if (slug.includes("forensic") || slug.includes("dfir")) return "forensics";
    if (slug.includes("cloud") || slug.includes("devsecops")) return "devsecops";
    if (slug.includes("career")) return "career";
    return "other";
  };

  // Filtered list
  const filteredPaths = useMemo(() => {
    return paths.filter((p) => {
      // Keyword search
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchTerm.toLowerCase());

      // Domain filter
      const domain = getDomainFromSlug(p.slug);
      const matchesDomain = selectedDomain === "all" || domain === selectedDomain;

      // Difficulty filter
      const matchesDifficulty =
        selectedDifficulty === "all" || p.difficulty === selectedDifficulty;

      return matchesSearch && matchesDomain && matchesDifficulty;
    });
  }, [paths, searchTerm, selectedDomain, selectedDifficulty]);

  const masterPath = paths.find((p) => p.slug.includes("cyberpath"));

  return (
    <div className="space-y-12">
      {/* 1. GRAND CURSUS INTÉGRATEUR (CYBERPATH MASTER) */}
      {masterPath && (
        <div className="relative rounded-3xl border-2 border-gold/50 bg-gradient-to-br from-[#181d26] via-[#12161e] to-[#0e1117] p-8 lg:p-10 shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-gold text-[#101216] font-bold tracking-wider uppercase">
                  ★ Cursus Intégrateur Maître
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1e2430] text-gold border border-gold/30">
                  12 Volumes • 7 Projets Capstone
                </span>
                <span className="text-ivory-dim flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  <span>~200h de pratique</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-ivory tracking-tight group-hover:text-gold transition-colors">
                <Link href={`/paths/${masterPath.slug}`}>{masterPath.title}</Link>
              </h2>
              <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed">
                {masterPath.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  01. Hardware &amp; Noyau Linux
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  02. Shell Bash &amp; Admin
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  03. Manuel Complet Python
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  04. Réseaux TCP/IP
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  05. Analyse Wireshark &amp; Scapy
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  07. OWASP Top 10 Web
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  11. Blue Team SOC &amp; SIEM
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  12. Capstone Forensique DFIR
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link
                href={`/paths/${masterPath.slug}`}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs tracking-wider uppercase transition-all shadow-gold flex items-center justify-center space-x-2"
              >
                <span>Accéder au Cursus Intégrateur</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. BARRE DE FILTRES ET RECHERCHE DU CATALOGUE */}
      <div className="bg-[#141820] p-6 rounded-3xl border border-[#222935] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ivory-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une académie ou une technologie (ex: Python, Bash, SOC, Scapy)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0d1016] border border-[#222938] rounded-xl pl-10 pr-4 py-2.5 text-xs text-ivory placeholder-ivory-dim/60 outline-none focus:border-gold font-mono"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-ivory-dim">
            <Filter className="w-4 h-4 text-gold" />
            <span>{filteredPaths.length} cursus trouvé(s)</span>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-ivory-dim">
            Filtrer par Domaine Pédagogique :
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "Tous les Domaines" },
              { id: "python", label: "🐍 Programmation Python" },
              { id: "systems", label: "🐧 Linux & Systèmes" },
              { id: "networks", label: "🌐 Réseaux TCP/IP" },
              { id: "blue_team", label: "🛡️ Blue Team & SOC" },
              { id: "offensive", label: "🔥 Audit & Pentest" },
              { id: "forensics", label: "🔍 Forensique DFIR" },
              { id: "devsecops", label: "☁️ Cloud & DevSecOps" },
              { id: "career", label: "💼 Insertion Professionnelle" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedDomain(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedDomain === f.id
                    ? "bg-gold text-[#101216] font-bold shadow-sm"
                    : "bg-[#0d1016] text-ivory-muted hover:text-ivory hover:bg-[#1a202c] border border-[#202735]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Level Filter Pills */}
        <div className="flex items-center space-x-3 pt-2 border-t border-[#1d232e]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ivory-dim">Niveau :</span>
          <div className="flex items-center space-x-2">
            {[
              { id: "all", label: "Tous" },
              { id: "beginner", label: "Débutant" },
              { id: "intermediate", label: "Intermédiaire" },
              { id: "advanced", label: "Avancé" },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedDifficulty(lvl.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  selectedDifficulty === lvl.id
                    ? "bg-gold text-[#101216] font-bold"
                    : "bg-[#0d1016] text-ivory-muted hover:text-ivory border border-[#202735]"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. GRILLE DES CURSUS FILTRÉS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPaths.map((p) => {
          const Icon = getPathIcon(p.slug);
          const accentStyle = getPathAccentColor(p.slug);

          return (
            <div
              key={p.id}
              className="bg-[#141820] rounded-3xl border border-[#222935] p-8 flex flex-col justify-between hover:border-gold/40 transition-all duration-300 relative group overflow-hidden space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${accentStyle}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-mono text-ivory-dim">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1b212c] text-gold border border-gold/20">
                      {p.difficulty.toUpperCase()}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>~{Math.round(p.estimated_minutes / 60)}h</span>
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-ivory group-hover:text-gold transition-colors">
                    <Link href={`/paths/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-ivory-muted mt-2.5 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Continuum Badges */}
                <div className="pt-2 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-ivory-dim">
                    Continuité Pédagogique :
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                      {p.course_count} cours approfondis
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-gold/90 border border-gold/20 font-mono">
                      Exercices &amp; Sandbox WASM
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-emerald-400 border border-emerald-500/20 font-mono">
                      Validation Projet Capstone
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1d232e] flex items-center justify-between">
                <span className="text-xs text-ivory-dim font-mono">
                  Accès libre &amp; persistant
                </span>
                <Link
                  href={`/paths/${p.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] text-xs font-bold transition-all flex items-center space-x-2 shadow-gold group"
                >
                  <span>Consulter le Programme</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPaths.length === 0 && (
        <div className="bg-[#141820] p-12 rounded-3xl border border-[#222935] text-center space-y-3">
          <BookOpen className="w-8 h-8 text-gold/40 mx-auto" />
          <h3 className="text-lg font-bold text-ivory">Aucun cursus ne correspond à vos filtres</h3>
          <p className="text-xs text-ivory-muted">
            Essayez de réinitialiser le terme de recherche ou de sélectionner &quot;Tous les Domaines&quot;.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedDomain("all");
              setSelectedDifficulty("all");
            }}
            className="px-4 py-2 rounded-xl bg-gold text-[#101216] text-xs font-bold font-mono mt-2"
          >
            Réinitialiser les Filtres
          </button>
        </div>
      )}
    </div>
  );
}
