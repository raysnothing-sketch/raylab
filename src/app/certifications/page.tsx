import React from "react";
import Link from "next/link";
import { getCertifications } from "@/lib/data";
import { Award, ExternalLink, ShieldCheck, DollarSign, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default async function CertificationsPage() {
  const certs = await getCertifications();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono border border-gold/30">
          <Award className="w-3.5 h-3.5" />
          <span>Référentiel des Certifications Mondiales</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight">
          Catalogue des Certifications Officielles
        </h1>
        <p className="text-sm sm:text-base text-ivory-muted leading-relaxed">
          RayLab s&apos;engage sur la clarté et l&apos;honnêteté : nous ne délivrons pas d&apos;attestations trompeuses.
          Nos cursus préparent aux véritables examens d&apos;État et d&apos;éditeurs mondiaux surveillés (CompTIA, Cisco, LPI, AWS, OffSec).
        </p>
      </div>

      {/* Distinction Alert Card */}
      <div className="p-6 bg-gold/10 rounded-2xl border border-gold/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-ivory">
            <div className="font-bold">Différence Clé : Certifications vs Attestations de Complétion</div>
            <p className="text-ivory-muted leading-relaxed">
              Une certification officielle nécessite de passer un examen surveillé (en centre Pearson VUE ou en ligne sous surveillance vidéo) avec vérification d&apos;identité. Elles possèdent une valeur juridique et internationale indiscutable auprès des recruteurs.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {certs.map((c) => (
          <div
            key={c.id}
            className="bg-[#141820] rounded-3xl border border-[#222935] p-7 flex flex-col justify-between hover:border-gold/40 transition-all group space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1b212c] text-gold border border-gold/30">
                  {c.domain}
                </span>
                <span className="text-ivory-dim">{c.level}</span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-ivory group-hover:text-gold transition-colors">
                  {c.name}
                </h2>
                <div className="text-xs text-gold/90 font-mono mt-1">
                  Organisme : <strong>{c.provider}</strong>
                </div>
              </div>

              <div className="space-y-3 text-xs text-ivory-muted pt-3 border-t border-[#1d232e]">
                <div className="flex items-center space-x-2 text-emerald-400 font-mono font-semibold">
                  <DollarSign className="w-4 h-4" />
                  <span>Coût d&apos;examen : {c.price_description}</span>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-ivory text-[11px] font-bold uppercase tracking-wider">
                    Format de l&apos;Épreuve
                  </div>
                  <p className="text-[12px] text-ivory-dim leading-relaxed">
                    {c.exam_description}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-ivory text-[11px] font-bold uppercase tracking-wider">
                    Prérequis Recommandés
                  </div>
                  <p className="text-[12px] text-ivory-dim italic leading-relaxed">
                    {c.prerequisites_md}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[#1d232e] flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-mono flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Norme Internationale</span>
              </span>
              <a
                href={c.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#1b212c] hover:bg-gold hover:text-[#101216] text-ivory text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm"
              >
                <span>Site Officiel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
