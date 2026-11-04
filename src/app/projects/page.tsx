import React from "react";
import Link from "next/link";
import { getProjects } from "@/lib/data";
import { Code2, Clock, Shield, ArrowRight, CheckCircle2, ChevronRight, Layers, Terminal, Sparkles } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30">
          <Code2 className="w-3.5 h-3.5" />
          <span>Laboratoire &amp; Portfolio Projets</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight">
          Projets d&apos;Ingénierie &amp; Sécurité
        </h1>
        <p className="text-sm sm:text-base text-ivory-muted leading-relaxed">
          Le pilier <strong>BUILD</strong> de la méthode RayLab : chaque projet répond à un cahier des charges rigoureux, testable unitairement et documenté pour votre profil GitHub.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-[#141820] rounded-3xl border border-[#222935] p-7 hover:border-gold/40 transition-all flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1b212c] text-gold border border-gold/30">
                  {proj.domain}
                </span>
                <div className="flex items-center space-x-1 text-ivory-dim">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{proj.estimated_minutes} min</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-ivory group-hover:text-gold transition-colors">
                  <Link href={`/projects/${proj.slug}`}>{proj.title}</Link>
                </h2>
                <p className="text-xs text-ivory-muted mt-2.5 leading-relaxed line-clamp-3">
                  {proj.summary}
                </p>
              </div>

              <div className="text-[11px] font-mono text-ivory-dim pt-2 border-t border-[#1d232e]">
                Niveau d&apos;exigence : <span className="text-ivory font-semibold capitalize">{proj.difficulty}</span>
              </div>
            </div>

            <div className="pt-5 border-t border-[#1d232e] flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-mono flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Publiable GitHub</span>
              </span>
              <Link
                href={`/projects/${proj.slug}`}
                className="px-4 py-2 rounded-xl bg-[#1c222b] group-hover:bg-gold group-hover:text-[#101216] text-ivory text-xs font-bold transition-all flex items-center space-x-1 shadow-sm"
              >
                <span>Cahier des Charges</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Portfolio Guide */}
      <div className="bg-[#141923] rounded-3xl border border-[#273242] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-bold text-ivory">
            Comment valoriser vos réalisations sur GitHub et votre CV ?
          </h3>
          <p className="text-xs text-ivory-muted leading-relaxed">
            Chaque projet inclut un modèle de README professionnel, des instructions de tests unitaires et des conseils pour formuler l&apos;impact selon la formule Google XYZ sur votre CV ATS.
          </p>
        </div>
        <Link
          href="/career/cv-builder"
          className="px-6 py-3.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider transition-all shadow-gold whitespace-nowrap"
        >
          Ouvrir le CV ATS Builder →
        </Link>
      </div>
    </div>
  );
}
