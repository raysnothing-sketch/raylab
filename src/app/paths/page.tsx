import React from "react";
import Link from "next/link";
import { getLearningPaths } from "@/lib/data";
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
} from "lucide-react";

export default async function PathsPage() {
  const paths = await getLearningPaths();

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

  // Distinct grouping: Cursus Maître, Académies Spécialisées, Accompagnement
  const masterPath = paths.find((p) => p.slug.includes("cyberpath"));
  const academyPaths = paths.filter((p) => !p.slug.includes("cyberpath") && !p.slug.includes("career"));
  const careerPath = paths.find((p) => p.slug.includes("career"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono border border-gold/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Référentiel Pédagogique V3.0 • Section 6</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight">
          Académies &amp; Cursus Structurés
        </h1>
        <p className="text-sm sm:text-base text-ivory-muted leading-relaxed">
          Une progression académique exigeante du niveau fondamental aux opérations avancées d&apos;ingénierie et de sécurité.
          Chaque cursus articule théorie rigoureuse, exercices interactifs avec validation immédiate et projets capstones publiables sur GitHub.
        </p>
      </div>

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
                  Hardware &amp; Noyau Linux
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  Python Avancé &amp; Sockets
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  Réseau TCP/IP &amp; Scapy
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  OWASP Top 10
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  Blue Team SOC &amp; SIEM
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                  Digital Forensics DFIR
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

      {/* 2. LES 8 ACADÉMIES SPÉCIALISÉES (SECTION 6 DU CAHIER DES CHARGES) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#1c222b] pb-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-ivory">
              Les 8 Académies Spécialisées
            </h2>
            <p className="text-xs text-ivory-muted">
              Parcours thématiques ciblés conformes à la hiérarchie officielle du Cahier des Charges V3.0
            </p>
          </div>
          <span className="text-xs font-mono text-gold px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
            {academyPaths.length} Académies Actives
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {academyPaths.map((p) => {
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
                        <Clock className="w-3.5 h-3.5" />
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

                  {/* Competencies info */}
                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-ivory-dim">
                      Organisation &amp; Validation
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                        {p.course_count} volume(s) ciblé(s)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-gold/90 border border-gold/20 font-mono">
                        70% Pratique / 30% Théorie
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-emerald-400 border border-emerald-500/20 font-mono">
                        Sandbox &amp; Quiz Intégrés
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1d232e] flex items-center justify-between">
                  <span className="text-xs text-ivory-dim font-mono">
                    Accès immédiat
                  </span>
                  <Link
                    href={`/paths/${p.slug}`}
                    className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] text-xs font-bold transition-all flex items-center space-x-2 shadow-gold group"
                  >
                    <span>Consulter l&apos;Académie</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CAREER LAUNCHPAD & CERTIFICATIONS (SECTION 12 & 13) */}
      {careerPath && (
        <div className="bg-[#141923] rounded-3xl border border-[#242d3b] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-teal-400">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Insertion Professionnelle &amp; Certifications</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-ivory">
              {careerPath.title}
            </h3>
            <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed">
              {careerPath.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/career/cv-builder"
              className="px-5 py-3 rounded-xl bg-[#1c222b] hover:bg-[#252e3b] text-ivory font-bold text-xs uppercase tracking-wider border border-[#2d3746] text-center"
            >
              CV ATS Bilingue
            </Link>
            <Link
              href="/certifications"
              className="px-5 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider shadow-gold text-center"
            >
              Guide Certifications →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
