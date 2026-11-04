import React from "react";
import Link from "next/link";
import { getLearningPaths } from "@/lib/data";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Shield,
  Terminal,
  Award,
  Sparkles,
  Layers,
  CheckCircle2,
  Cpu,
  Server,
  Code2,
} from "lucide-react";

export default async function PathsPage() {
  const paths = await getLearningPaths();

  const getPathIcon = (slug: string) => {
    if (slug.includes("python")) return Code2;
    if (slug.includes("cyber")) return Shield;
    if (slug.includes("system")) return Server;
    return Award;
  };

  const getPathAccentColor = (slug: string) => {
    if (slug.includes("python")) return "text-gold border-gold/30 bg-gold/10";
    if (slug.includes("cyber")) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (slug.includes("system")) return "text-blue-400 border-blue-500/30 bg-blue-500/10";
    return "text-purple-400 border-purple-500/30 bg-purple-500/10";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono border border-gold/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Cursus Pédagogiques RayLab</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight">
          Académies &amp; Cursus Structurés
        </h1>
        <p className="text-sm sm:text-base text-ivory-muted leading-relaxed">
          Une progression académique du niveau débutant aux compétences d&apos;ingénierie confirmées.
          Chaque parcours comprend des cours théoriques rigoureux, des ateliers d&apos;application pratique et des projets intégrateurs publiables.
        </p>
      </div>

      {/* Grid of Learning Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paths.map((p) => {
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
                  <h2 className="text-2xl font-bold text-ivory group-hover:text-gold transition-colors">
                    <Link href={`/paths/${p.slug}`}>{p.title}</Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-ivory-muted mt-2.5 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Key competencies tags */}
                <div className="pt-2 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-ivory-dim">
                    Compétences &amp; Outils Visés
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-ivory-muted border border-[#252e3c] font-mono">
                      {p.course_count} cours approfondis
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-gold/90 border border-gold/20 font-mono">
                      Validation par projets
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#11141a] text-[11px] text-emerald-400 border border-emerald-500/20 font-mono">
                      QCM &amp; Exercices inclus
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1d232e] flex items-center justify-between">
                <span className="text-xs text-ivory-dim font-mono">
                  Cursus complet
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

      {/* Philosophy Callout Banner */}
      <div className="bg-gradient-to-r from-[#141923] via-[#101318] to-[#141923] rounded-3xl border border-[#242d3b] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <h3 className="text-xl font-bold text-ivory">
            Une progression pédagogique basée sur des preuves
          </h3>
          <p className="text-xs text-ivory-muted leading-relaxed">
            Chez RayLab, chaque notion théorique est suivie d&apos;un cas pratique. Vous ne collectionnez pas des certificats de complétion passifs : vous construisez un portfolio technique public sur GitHub, documenté selon la formule Google XYZ et valorisable en entretien.
          </p>
        </div>
        <Link
          href="/projects"
          className="px-6 py-3.5 rounded-xl bg-[#1c222b] hover:bg-gold hover:text-[#101216] text-ivory font-bold text-xs uppercase tracking-wider transition-all border border-[#2d3746] whitespace-nowrap"
        >
          Voir les Projets du Lab →
        </Link>
      </div>
    </div>
  );
}
