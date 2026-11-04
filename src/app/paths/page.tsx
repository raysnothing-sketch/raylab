import React from "react";
import Link from "next/link";
import { getLearningPaths } from "@/lib/data";
import PathsCatalogClient from "@/components/PathsCatalogClient";
import { BookOpen, Briefcase, Award } from "lucide-react";

export default async function PathsPage() {
  const paths = await getLearningPaths();
  const careerPath = paths.find((p) => p.slug.includes("career"));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
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
          Une progression académique du niveau fondamental aux opérations avancées d&apos;ingénierie et de sécurité.
          Chaque cursus articule théorie rigoureuse, exercices interactifs avec validation immédiate et projets capstones publiables sur GitHub.
        </p>
      </div>

      {/* Interactive Client Catalog with Filters and Search */}
      <PathsCatalogClient paths={paths} />

      {/* Career Launchpad Callout Banner */}
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
