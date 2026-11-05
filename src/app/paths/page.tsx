import React from "react";
import Link from "next/link";
import { getLearningPaths } from "@/lib/data";
import PathsCatalogClient from "@/components/PathsCatalogClient";
import { BookOpen, Briefcase, Award, Layers } from "lucide-react";

export default async function PathsPage() {
  const paths = await getLearningPaths();
  const careerPath = paths.find((p) => p.slug.includes("career"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono border border-gold/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>R&eacute;f&eacute;rentiel P&eacute;dagogique V3.0 &bull; Section 6</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight">
          Acad&eacute;mies &amp; Cursus Structur&eacute;s
        </h1>
        <p className="text-sm sm:text-base text-ivory-muted leading-relaxed">
          Une progression acad&eacute;mique du niveau fondamental aux op&eacute;rations avanc&eacute;es d&apos;ing&eacute;nierie et de s&eacute;curit&eacute;.
          Chaque cursus articule th&eacute;orie rigoureuse, exercices interactifs avec validation imm&eacute;diate et projets capstones publiables sur GitHub.
        </p>

        {/* Pedagogical Hierarchy Reference Bar (Règle V3.0) */}
        <div className="pt-2">
          <div className="p-3.5 bg-[#12161f] rounded-xl border border-gold/20 flex flex-wrap items-center gap-2 text-xs font-mono text-ivory-dim">
            <span className="text-gold font-bold flex items-center space-x-1.5 mr-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Hi&eacute;rarchie Unique :</span>
            </span>
            <span className="text-ivory font-semibold bg-[#1a202c] px-2 py-0.5 rounded">Acad&eacute;mies (8)</span>
            <span className="text-gold">&rarr;</span>
            <span className="text-ivory font-semibold bg-[#1a202c] px-2 py-0.5 rounded">Parcours</span>
            <span className="text-gold">&rarr;</span>
            <span className="text-ivory font-semibold bg-[#1a202c] px-2 py-0.5 rounded">Cours (Volumes)</span>
            <span className="text-gold">&rarr;</span>
            <span className="text-ivory font-semibold bg-[#1a202c] px-2 py-0.5 rounded">Modules</span>
            <span className="text-gold">&rarr;</span>
            <span className="text-emerald-400 font-semibold bg-[#1a202c] px-2 py-0.5 rounded">Le&ccedil;ons</span>
          </div>
        </div>
      </div>

      {/* Interactive Client Catalog with Filters and Search */}
      <PathsCatalogClient paths={paths} />

      {/* Career Launchpad Callout Banner */}
      {careerPath && (
        <div className="bg-[#141923] rounded-3xl border border-[#242d3b] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-teal-400">
              <Briefcase className="w-3.5 h-3.5" />
              <span>P&ocirc;le Carri&egrave;re &amp; Insertion Professionnelle (Cat&eacute;gorie Transversale)</span>
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
              CV Studio ATS
            </Link>
            <Link
              href="/certifications"
              className="px-5 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider shadow-gold text-center"
            >
              Guide Certifications &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
