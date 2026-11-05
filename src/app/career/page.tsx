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
  Calendar,
  Globe,
  Info,
  MapPin,
} from "lucide-react";

export default async function CareerPage() {
  const careers = await getCareerPaths();
  const certs = await getCertifications();

  // Helper markdown rendering
  function renderSimpleMarkdown(md: string) {
    if (!md) return "";
    return md
      .replace(/^### (.*$)/gim, '<h4 class="text-sm font-bold text-ivory mt-3 mb-1">$1</h4>')
      .replace(/^## (.*$)/gim, '<h3 class="text-base font-bold text-gold mt-4 mb-2">$1</h3>')
      .replace(/^# (.*$)/gim, '<h2 class="text-lg font-bold text-ivory mt-4 mb-2">$1</h2>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-ivory font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="text-ivory-dim">$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-xs text-ivory-muted">$1</li>')
      .replace(/\n\n/gim, '<p class="my-2 text-xs leading-relaxed text-ivory-muted">')
      .replace(/\n/gim, "<br/>");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono border border-gold/30">
          <Briefcase className="w-3.5 h-3.5" />
          <span>P&ocirc;le Carri&egrave;re &bull; Grilles Salariales &amp; Fiches M&eacute;tiers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight">
          Centre de Carri&egrave;re &amp; Insertion Professionnelle
        </h1>
        <p className="text-sm sm:text-base text-ivory-muted leading-relaxed">
          Donn&eacute;es du march&eacute; IT &amp; Cybers&eacute;curit&eacute; consolid&eacute;es, grilles de r&eacute;mun&eacute;ration v&eacute;rifi&eacute;es en Europe (France, Allemagne, Suisse) et fiches de comp&eacute;tences m&eacute;tiers.
        </p>
      </div>

      {/* SALARY BENCHMARK SECTION (Conforme Exigence 06) */}
      <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202732] pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-gold" />
              <h2 className="text-lg sm:text-xl font-bold text-ivory">
                Observatoire des Salaires IT &amp; Cybers&eacute;curit&eacute; en Europe
              </h2>
            </div>
            <p className="text-xs text-ivory-dim">
              R&eacute;mun&eacute;rations brutes annuelles &amp; mensuelles indicatives, ventil&eacute;es par niveau d&apos;exp&eacute;rience et bassin d&apos;emploi.
            </p>
          </div>
          <div className="flex flex-col sm:items-end text-xs font-mono text-ivory-dim space-y-0.5">
            <span className="text-gold font-semibold flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Derni&egrave;re v&eacute;rification : Janvier 2026</span>
            </span>
            <span>Sources : Michael Page Cyber 2025/2026 &bull; Hays IT Germany &bull; SwissICT</span>
          </div>
        </div>

        {/* 3 Country Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. FRANCE */}
          <div className="bg-[#0f1217] rounded-2xl border border-[#1e2532] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b212c] pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold text-ivory">France &bull; &euro; Brut</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                &Icirc;le-de-France / R&eacute;gions
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#131720] rounded-xl border border-[#1e2534] space-y-1">
                <div className="flex justify-between text-ivory-dim text-[11px]">
                  <span>Junior (0 &ndash; 2 ans)</span>
                  <span className="text-gold font-bold">~3 250 &ndash; 4 150 &euro; /mois</span>
                </div>
                <div className="text-lg font-black text-ivory">39 000 &euro; &agrave; 50 000 &euro; <span className="text-[11px] font-normal text-ivory-dim">brut/an</span></div>
                <div className="text-[10px] text-ivory-dim">&Icirc;le-de-France (35k-42k &euro; en r&eacute;gions : Lyon, Nantes, Toulouse)</div>
              </div>

              <div className="p-3 bg-[#131720] rounded-xl border border-[#1e2534] space-y-1">
                <div className="flex justify-between text-ivory-dim text-[11px]">
                  <span>Confirm&eacute; (3 &ndash; 5 ans)</span>
                  <span className="text-gold font-bold">~4 250 &ndash; 5 400 &euro; /mois</span>
                </div>
                <div className="text-lg font-black text-ivory">51 000 &euro; &agrave; 65 000 &euro; <span className="text-[11px] font-normal text-ivory-dim">brut/an</span></div>
                <div className="text-[10px] text-ivory-dim">Analyste SOC N2, Ing&eacute;nieur D&eacute;tection, DevSecOps</div>
              </div>

              <div className="p-3 bg-[#131720] rounded-xl border border-[#1e2534] space-y-1">
                <div className="flex justify-between text-ivory-dim text-[11px]">
                  <span>Senior / Lead (6+ ans)</span>
                  <span className="text-gold font-bold">~5 500 &ndash; 7 500+ &euro; /mois</span>
                </div>
                <div className="text-lg font-black text-gold">66 000 &euro; &agrave; 90 000+ &euro; <span className="text-[11px] font-normal text-ivory-dim">brut/an</span></div>
                <div className="text-[10px] text-ivory-dim">Architecte S&eacute;curit&eacute;, Responsable SOC, Lead Pentester</div>
              </div>
            </div>
          </div>

          {/* 2. ALLEMAGNE */}
          <div className="bg-[#0f1217] rounded-2xl border border-[#1e2532] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b212c] pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold text-ivory">Allemagne &bull; &euro; Brut</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Berlin / Munich / Francfort
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#131720] rounded-xl border border-[#1e2534] space-y-1">
                <div className="flex justify-between text-ivory-dim text-[11px]">
                  <span>Junior (0 &ndash; 2 ans)</span>
                  <span className="text-emerald-400 font-bold">~4 150 &ndash; 5 400 &euro; /mois</span>
                </div>
                <div className="text-lg font-black text-ivory">50 000 &euro; &agrave; 65 000 &euro; <span className="text-[11px] font-normal text-ivory-dim">brut/an</span></div>
                <div className="text-[10px] text-ivory-dim">Berlin : 50k-58k &euro; &bull; Munich / Francfort : 55k-65k &euro;</div>
              </div>

              <div className="p-3 bg-[#131720] rounded-xl border border-[#1e2534] space-y-1">
                <div className="flex justify-between text-ivory-dim text-[11px]">
                  <span>Confirm&eacute; (3 &ndash; 5 ans)</span>
                  <span className="text-emerald-400 font-bold">~5 500 &ndash; 7 100 &euro; /mois</span>
                </div>
                <div className="text-lg font-black text-ivory">66 000 &euro; &agrave; 85 000 &euro; <span className="text-[11px] font-normal text-ivory-dim">brut/an</span></div>
                <div className="text-[10px] text-ivory-dim">SOC Specialist, IT Security Consultant, Cloud Architect</div>
              </div>

              <div className="p-3 bg-[#131720] rounded-xl border border-[#1e2534] space-y-1">
                <div className="flex justify-between text-ivory-dim text-[11px]">
                  <span>Senior / Principal (6+ ans)</span>
                  <span className="text-emerald-400 font-bold">~7 250 &ndash; 9 500+ &euro; /mois</span>
                </div>
                <div className="text-lg font-black text-emerald-400">87 000 &euro; &agrave; 115 000+ &euro; <span className="text-[11px] font-normal text-ivory-dim">brut/an</span></div>
                <div className="text-[10px] text-ivory-dim">Senior Security Engineer, Principal DFIR, CISO Advisor</div>
              </div>
            </div>
          </div>

          {/* 3. SUISSE */}
          <div className="bg-[#0f1217] rounded-2xl border border-[#1e2532] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1b212c] pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold text-ivory">Suisse &bull; CHF Brut</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Zurich / Gen&egrave;ve / Lausanne
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#131720] rounded-xl border border-[#1e2534] space-y-1">
                <div className="flex justify-between text-ivory-dim text-[11px]">
                  <span>Junior (0 &ndash; 2 ans)</span>
                  <span className="text-cyan-400 font-bold">~7 500 &ndash; 9 200 CHF /mois</span>
                </div>
                <div className="text-lg font-black text-ivory">90 000 &agrave; 110 000 CHF <span className="text-[11px] font-normal text-ivory-dim">brut/an</span></div>
                <div className="text-[10px] text-ivory-dim">Gen&egrave;ve : 90k-105k CHF &bull; Zurich : 95k-115k CHF</div>
              </div>

              <div className="p-3 bg-[#131720] rounded-xl border border-[#1e2534] space-y-1">
                <div className="flex justify-between text-ivory-dim text-[11px]">
                  <span>Confirm&eacute; (3 &ndash; 5 ans)</span>
                  <span className="text-cyan-400 font-bold">~9 300 &ndash; 11 600 CHF /mois</span>
                </div>
                <div className="text-lg font-black text-ivory">112 000 &agrave; 140 000 CHF <span className="text-[11px] font-normal text-ivory-dim">brut/an</span></div>
                <div className="text-[10px] text-ivory-dim">Cyber Incident Handler, SOC Analyst L2/L3, Pentester</div>
              </div>

              <div className="p-3 bg-[#131720] rounded-xl border border-[#1e2534] space-y-1">
                <div className="flex justify-between text-ivory-dim text-[11px]">
                  <span>Senior / Head (6+ ans)</span>
                  <span className="text-cyan-400 font-bold">~12 000 &ndash; 15 500+ CHF /mois</span>
                </div>
                <div className="text-lg font-black text-cyan-400">145 000 &agrave; 185 000+ CHF <span className="text-[11px] font-normal text-ivory-dim">brut/an</span></div>
                <div className="text-[10px] text-ivory-dim">Head of Cyber Defense, Senior DevSecOps Architect</div>
              </div>
            </div>
          </div>
        </div>

        {/* Methodology & Notes Footer */}
        <div className="pt-4 border-t border-[#1d232e] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-ivory-dim gap-2">
          <div className="flex items-center space-x-2">
            <Info className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span>
              Les r&eacute;mun&eacute;rations incluent le salaire fixe de base hors primes variables. R&eacute;gions m&eacute;tropolitaines : diff&eacute;rentiel moyen de 10 &agrave; 15% par rapport aux capitales &eacute;conomiques.
            </span>
          </div>
          <Link
            href="/career/cv-builder"
            className="text-gold hover:text-gold-light underline whitespace-nowrap self-start sm:self-auto"
          >
            Optimiser mon CV pour ces grilles &rarr;
          </Link>
        </div>
      </div>

      {/* Grid of Career Paths */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-ivory mb-2">
            Fiches M&eacute;tiers D&eacute;taill&eacute;es &amp; Comp&eacute;tences
          </h2>
          <p className="text-xs text-ivory-dim">
            Consultez les missions op&eacute;rationnelles, les hard skills et les certifications exig&eacute;es par les entreprises.
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
                      Fiche R&eacute;f&eacute;rentielle RayLab
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
                  <span>Certifications associ&eacute;es</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
