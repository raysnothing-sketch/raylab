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
    if (slug.includes("ia")) return "ai";
    if (slug.includes("career")) return "career";
    return "cyberpath";
  };

  const getV4TargetHours = (slug: string): string => {
    if (slug.includes("cyberpath")) return "180 \u00e0 220 h";
    if (slug.includes("python")) return "100 \u00e0 120 h";
    if (slug.includes("system") || slug.includes("linux")) return "80 \u00e0 100 h";
    if (slug.includes("reseau")) return "80 \u00e0 100 h";
    if (slug.includes("cybersecurity") || slug.includes("blue")) return "90 \u00e0 110 h";
    if (slug.includes("ethical") || slug.includes("offensive")) return "90 \u00e0 110 h";
    if (slug.includes("forensic") || slug.includes("dfir")) return "80 \u00e0 100 h";
    if (slug.includes("cloud") || slug.includes("devsecops")) return "90 \u00e0 110 h";
    if (slug.includes("ia")) return "70 \u00e0 90 h";
    if (slug.includes("career")) return "25 \u00e0 35 h";
    return "80 \u00e0 100 h";
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
      let matchesDifficulty = true;
      if (selectedDifficulty !== "all") {
        if (selectedDifficulty === "foundation") {
          matchesDifficulty = p.difficulty === "beginner" || p.slug.includes("python") || p.slug.includes("system");
        } else if (selectedDifficulty === "beginner") {
          matchesDifficulty = p.difficulty === "beginner";
        } else if (selectedDifficulty === "intermediate") {
          matchesDifficulty = p.difficulty === "intermediate";
        } else if (selectedDifficulty === "advanced") {
          matchesDifficulty = p.difficulty === "advanced" || p.slug.includes("cyberpath");
        } else if (selectedDifficulty === "professional") {
          matchesDifficulty = p.slug.includes("career") || p.slug.includes("cyberpath");
        }
      }

      return matchesSearch && matchesDomain && matchesDifficulty;
    });
  }, [paths, searchTerm, selectedDomain, selectedDifficulty]);

  const masterPath = paths.find((p) => p.slug.includes("cyberpath"));

  return (
    <div className="space-y-12">
      {/* 1. GRAND CURSUS INTÉGRATEUR (CYBERPATH MASTER V4) */}
      {masterPath && (
        <div className="relative rounded-3xl border-2 border-gold/50 bg-gradient-to-br from-[#181d26] via-[#12161e] to-[#0e1117] p-8 lg:p-10 shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-gold text-[#101216] font-bold tracking-wider uppercase">
                  Parcours Int&eacute;grateur V4
                </span>
                <span className="text-ivory-dim font-bold">&bull;</span>
                <span className="text-gold font-semibold flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Grand Cursus F&eacute;d&eacute;rateur (180 &agrave; 220 h)</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-ivory tracking-tight">
                {masterPath.title}
              </h2>

              <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed">
                Ce parcours transversal regroupe les comp&eacute;tences fondamentales et avanc&eacute;es des 8 acad&eacute;mies RayLab : de l&apos;architecture binaire &agrave; l&apos;ing&eacute;nierie Python, aux r&eacute;seaux TCP/IP, au SOC, au durcissement et &agrave; l&apos;audit de s&eacute;curit&eacute;.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ivory-dim pt-2">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span>12 Volumes Int&eacute;gr&eacute;s</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>7 Capstones &amp; Livrables GitHub</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Attestation V&eacute;rifi&eacute;e RayLab</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <Link
                href={`/paths/${masterPath.slug}`}
                className="px-6 py-4 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider transition-all shadow-gold flex items-center justify-center space-x-2"
              >
                <span>Explorer le CyberPath</span>
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
              placeholder="Rechercher une acad&eacute;mie ou une technologie (ex: Python, Bash, SOC, Scapy, Docker)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0d1016] border border-[#222938] rounded-xl pl-10 pr-4 py-2.5 text-xs text-ivory placeholder-ivory-dim/60 outline-none focus:border-gold font-mono"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-ivory-dim">
            <Filter className="w-4 h-4 text-gold" />
            <span>{filteredPaths.length} cursus trouv&eacute;(s)</span>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-ivory-dim">
            Filtrer par Domaine P&eacute;dagogique (8 Acad&eacute;mies &amp; P&ocirc;les) :
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "Tous les Domaines" },
              { id: "python", label: "Python Academy" },
              { id: "systems", label: "Linux & Syst\u00e8mes" },
              { id: "networks", label: "R\u00e9seaux & Protocoles" },
              { id: "blue_team", label: "Blue Team & SOC" },
              { id: "offensive", label: "Ethical Hacking" },
              { id: "forensics", label: "DFIR Forensics" },
              { id: "devsecops", label: "Cloud & DevSecOps" },
              { id: "ai", label: "IA Appliqu\u00e9e" },
              { id: "career", label: "P\u00f4le Carri\u00e8re" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDomain(d.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedDomain === d.id
                    ? "bg-gold text-[#101216] font-bold shadow-gold"
                    : "bg-[#0d1016] text-ivory-dim hover:text-ivory border border-[#202735]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter Pills (V4 Scale: Niv 0 à Niv 4) */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#1d2430]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ivory-dim">
            Niveau de Comp&eacute;tence V4 :
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "Tous les Niveaux" },
              { id: "foundation", label: "Niv. 0 Foundation" },
              { id: "beginner", label: "Niv. 1 Beginner" },
              { id: "intermediate", label: "Niv. 2 Intermediate" },
              { id: "advanced", label: "Niv. 3 Advanced" },
              { id: "professional", label: "Niv. 4 Professional Practice" },
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

      {/* 3. CATALOGUE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPaths.map((p) => {
          const Icon = getPathIcon(p.slug);
          const accentStyle = getPathAccentColor(p.slug);
          const targetHours = getV4TargetHours(p.slug);

          return (
            <div
              key={p.id}
              className="bg-[#141820] rounded-3xl border border-[#222935] p-8 hover:border-gold/40 transition-all flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-4">
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
                      <span>{targetHours}</span>
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
                    Continuit&eacute; P&eacute;dagogique V4 :
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                      Modules codifi&eacute;s
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-gold/90 border border-gold/20 font-mono">
                      TP &amp; Sandbox WASM
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-emerald-400 border border-emerald-500/20 font-mono">
                      Projet Capstone &amp; GitHub
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1d232e] flex items-center justify-between">
                <span className="text-xs text-ivory-dim font-mono">
                  Acc&egrave;s libre &amp; persistant
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
          <h3 className="text-lg font-bold text-ivory">Aucun cursus ne correspond &agrave; vos filtres</h3>
          <p className="text-xs text-ivory-muted">
            Essayez de r&eacute;initialiser le terme de recherche ou de s&eacute;lectionner &laquo; Tous les Domaines &raquo;.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedDomain("all");
              setSelectedDifficulty("all");
            }}
            className="px-4 py-2 rounded-xl bg-gold text-[#101216] text-xs font-bold font-mono mt-2"
          >
            R&eacute;initialiser les Filtres
          </button>
        </div>
      )}
    </div>
  );
}
