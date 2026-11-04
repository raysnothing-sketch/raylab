import React from "react";
import Link from "next/link";
import { getCareerPaths, getCertifications } from "@/lib/data";
import {
  Briefcase,
  ArrowRight,
  Shield,
  Terminal,
  Award,
  FileText,
  ChevronRight,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default async function CareerPage() {
  const careers = await getCareerPaths();
  const certs = await getCertifications();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono border border-gold/30">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Professional Development &amp; Roadmaps</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight">
          Centre de Carrière &amp; Fiches Métiers
        </h1>
        <p className="text-sm sm:text-base text-ivory-muted leading-relaxed">
          Découvrez les compétences recherchées, les missions réelles sur le terrain, les grilles salariales en Europe (France, Allemagne, Suisse) et les certifications mondiales à cibler.
        </p>
      </div>

      {/* Salary Comparison Strip */}
      <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 lg:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#202732] pb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-gold" />
            <h2 className="text-lg font-bold text-ivory">
              Panorama Salarial Indicatif en Europe (Profils Juniors / Débutants)
            </h2>
          </div>
          <span className="text-xs font-mono text-ivory-dim">Source : Marché IT 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 bg-[#101216] rounded-2xl border border-[#1f2632] space-y-1">
            <div className="text-ivory-dim font-bold">FRANCE (Paris &amp; Régions)</div>
            <div className="text-lg font-black text-gold">38 000 € — 50 000 €</div>
            <div className="text-[11px] text-ivory-dim">Analyste SOC / Développeur Python</div>
          </div>
          <div className="p-4 bg-[#101216] rounded-2xl border border-[#1f2632] space-y-1">
            <div className="text-ivory-dim font-bold">ALLEMAGNE (Berlin / Munich)</div>
            <div className="text-lg font-black text-emerald-400">48 000 € — 68 000 €</div>
            <div className="text-[11px] text-ivory-dim">Norme Lebenslauf &amp; Compétences Prouvées</div>
          </div>
          <div className="p-4 bg-[#101216] rounded-2xl border border-[#1f2632] space-y-1">
            <div className="text-ivory-dim font-bold">SUISSE (Genève / Zurich)</div>
            <div className="text-lg font-black text-blue-400">85 000 CHF — 115 000 CHF</div>
            <div className="text-[11px] text-ivory-dim">Cybersécurité &amp; Ingénierie Cloud</div>
          </div>
        </div>
      </div>

      {/* Grid of Career Paths */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-ivory mb-2">
            Fiches Métiers Détaillées &amp; Compétences
          </h2>
          <p className="text-xs text-ivory-dim">
            Consultez les missions opérationnelles, les hard skills et les certifications exigées par les entreprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careers.map((career) => (
            <div
              key={career.id}
              className="bg-[#141820] rounded-3xl border border-[#222935] p-8 space-y-6 hover:border-gold/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ivory">{career.title}</h3>
                    <div className="text-[11px] font-mono text-gold mt-0.5">
                      Fiche Référentielle RayLab
                    </div>
                  </div>
                </div>

                <div className="prose-raylab text-xs text-ivory-muted leading-relaxed">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderSimpleMarkdown(career.description_md),
                    }}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-[#1d232e] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <Link
                  href="/career/cv-builder"
                  className="px-4 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs flex items-center justify-center space-x-1.5 shadow-gold transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Adapter mon CV ATS pour ce poste</span>
                </Link>
                <Link
                  href="/certifications"
                  className="text-xs text-ivory-dim hover:text-gold flex items-center space-x-1 font-mono justify-center"
                >
                  <span>Certifications ciblées →</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href="/career/cv-builder"
          className="p-7 rounded-3xl bg-[#181e28] border border-[#263140] hover:border-gold/40 transition-all group"
        >
          <FileText className="w-8 h-8 text-gold mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-lg text-ivory mb-1">Générateur de CV ATS</h3>
          <p className="text-xs text-ivory-muted leading-relaxed">
            Créez votre CV technique compatible avec les scanners ATS pour la France et l&apos;Allemagne.
          </p>
        </Link>

        <Link
          href="/certifications"
          className="p-7 rounded-3xl bg-[#181e28] border border-[#263140] hover:border-gold/40 transition-all group"
        >
          <Award className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-lg text-ivory mb-1">Guide des Certifications</h3>
          <p className="text-xs text-ivory-muted leading-relaxed">
            Sélectionnez les certifications internationales reconnues (Security+, CCNA, LPIC-1, BTL1).
          </p>
        </Link>

        <Link
          href="/projects"
          className="p-7 rounded-3xl bg-[#181e28] border border-[#263140] hover:border-gold/40 transition-all group"
        >
          <Terminal className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-lg text-ivory mb-1">Projets du Portfolio</h3>
          <p className="text-xs text-ivory-muted leading-relaxed">
            Construisez des outils logiciels démontrant votre rigueur et votre autonomie sur GitHub.
          </p>
        </Link>
      </div>
    </div>
  );
}

function renderSimpleMarkdown(md: string): string {
  let html = md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/- (.*$)/gim, "<li>$1</li>")
    .replace(/\n\n/gim, "<br/>");
  return html;
}
