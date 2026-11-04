"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Download,
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  Code2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Share2,
} from "lucide-react";

export default function CvBuilderPage() {
  const [targetMarket, setTargetMarket] = useState<"eu_intl" | "germany">("eu_intl");

  // Form states
  const [fullName, setFullName] = useState("Alexandre R.");
  const [headline, setHeadline] = useState("Développeur Python & Analyste Cybersécurité Junior");
  const [email, setEmail] = useState("alexandre@raylab.tech");
  const [phone, setPhone] = useState("+33 6 12 34 56 78");
  const [location, setLocation] = useState("Paris, France / Berlin, Germany");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/alexandre-raylab");
  const [github, setGithub] = useState("github.com/raylab-project");
  const [summary, setSummary] = useState(
    "Passionné par l'architecture logicielle Python, l'administration Linux et la sécurité défensive (SOC). Autonome, rigoureux et orienté résultats mesurables (formule Google XYZ). Expérience solide en scripts d'automatisation, détection d'intrusions et conception d'outils FIM."
  );

  const [skills, setSkills] = useState([
    "Python (POO, Async, Regex)",
    "Linux / Bash Scripting",
    "Réseaux (TCP/IP, Wireshark, DNS/DHCP)",
    "Cybersécurité (SIEM, FIM, OWASP)",
    "Git & GitHub Actions",
    "Docker & Conteneurs",
  ]);

  const [experiences, setExperiences] = useState([
    {
      title: "Projet File Integrity Monitor (FIM)",
      company: "RayLab Projects",
      period: "2026 - Présent",
      description:
        "Conception d'un agent de surveillance de fichiers en Python utilisant le hachage SHA-256. Réduction des faux positifs de 60% et détection en temps réel des altérations système.",
    },
    {
      title: "Analyseur de Journaux de Sécurité (Log Analyzer)",
      company: "RayLab Projects",
      period: "2026",
      description:
        "Développement d'un parser d'événements de serveurs web filtrant plus de 50 000 requêtes par minute et identifiant automatiquement les signatures SQLi et scans de vulnérabilités.",
    },
  ]);

  const [educations, setEducations] = useState([
    {
      degree: "Cursus Cybersécurité & Python Mastery",
      institution: "RayLab Institute",
      year: "2026",
    },
    {
      degree: "Préparation CompTIA Security+ (SY0-701)",
      institution: "CompTIA Academy",
      year: "2026",
    },
  ]);

  // ATS Analysis Score Calculator
  const calculateAtsScore = () => {
    let score = 50;
    if (fullName.length > 3) score += 10;
    if (summary.length > 50) score += 10;
    if (skills.length >= 5) score += 10;
    if (experiences.length >= 2) score += 10;
    if (summary.includes("%") || experiences.some((e) => e.description.includes("%"))) score += 10;
    return Math.min(score, 100);
  };

  const atsScore = calculateAtsScore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#20252C] print:hidden">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Format Optimisé ATS &amp; Norme Européenne</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ivory">
            Générateur de CV ATS Professionnel
          </h1>
          <p className="text-xs text-ivory-dim mt-1">
            Construisez un CV technique sans fioritures destructrices pour les robots de recrutement.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-[#151921] p-1 rounded-lg border border-[#262e3a] text-xs">
            <button
              onClick={() => setTargetMarket("eu_intl")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                targetMarket === "eu_intl"
                  ? "bg-gold text-[#101216]"
                  : "text-ivory-dim hover:text-ivory"
              }`}
            >
              International / EU
            </button>
            <button
              onClick={() => setTargetMarket("germany")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                targetMarket === "germany"
                  ? "bg-gold text-[#101216]"
                  : "text-ivory-dim hover:text-ivory"
              }`}
            >
              Marché Allemand (Lebenslauf)
            </button>
          </div>

          <Link
            href="/raybot"
            className="px-3.5 py-2 rounded-xl bg-[#161a22] hover:bg-[#1e2430] border border-gold/40 text-gold font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>Auditer avec RayBot</span>
          </Link>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs flex items-center space-x-2 shadow-gold transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer / Exporter PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Editor (Hidden in Print) */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          {/* ATS Score card */}
          <div className="bg-[#141820] rounded-2xl border border-[#222935] p-5 space-y-3 font-mono">
            <div className="flex items-center justify-between text-xs">
              <span className="text-ivory font-bold">Diagnostic ATS en direct</span>
              <span
                className={`font-bold ${
                  atsScore >= 90 ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                Score : {atsScore}/100
              </span>
            </div>
            <div className="w-full bg-[#1b222d] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${atsScore}%` }}
              />
            </div>
            <div className="text-[11px] text-ivory-dim space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Format linéaire à une seule colonne (optimal)</span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Titres standardisés (Summary, Experience, Skills)</span>
              </div>
              {atsScore < 90 && (
                <div className="flex items-center space-x-1.5 text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Ajoutez des métriques chiffrées (%) pour maximiser le score</span>
                </div>
              )}
            </div>
          </div>

          {/* Form details */}
          <div className="bg-[#141820] rounded-2xl border border-[#222935] p-6 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-ivory uppercase tracking-wider text-gold font-mono">
              1. Informations Générales
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-ivory-muted font-medium">Nom complet</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#101216] border border-[#262f3c] rounded-lg p-2 text-ivory mt-1 focus:border-gold outline-none"
                />
              </div>
              <div>
                <label className="text-ivory-muted font-medium">Titre professionnel</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-[#101216] border border-[#262f3c] rounded-lg p-2 text-ivory mt-1 focus:border-gold outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-ivory-muted font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#101216] border border-[#262f3c] rounded-lg p-2 text-ivory mt-1 focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="text-ivory-muted font-medium">Téléphone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#101216] border border-[#262f3c] rounded-lg p-2 text-ivory mt-1 focus:border-gold outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-ivory-muted font-medium">Localisation</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#101216] border border-[#262f3c] rounded-lg p-2 text-ivory mt-1 focus:border-gold outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-ivory-muted font-medium">LinkedIn</label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full bg-[#101216] border border-[#262f3c] rounded-lg p-2 text-ivory mt-1 focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="text-ivory-muted font-medium">GitHub</label>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full bg-[#101216] border border-[#262f3c] rounded-lg p-2 text-ivory mt-1 focus:border-gold outline-none"
                  />
                </div>
              </div>
            </div>

            <h3 className="font-bold text-sm text-ivory uppercase tracking-wider text-gold font-mono pt-3 border-t border-[#202732]">
              2. Profil / Résumé Professionnel
            </h3>
            <textarea
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full bg-[#101216] border border-[#262f3c] rounded-lg p-3 text-ivory text-xs focus:border-gold outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: Live ATS Preview (Full width on print) */}
        <div className="lg:col-span-7">
          <div className="bg-white text-black p-8 sm:p-12 rounded-xl shadow-2xl font-sans min-h-[850px] text-xs leading-normal print:shadow-none print:p-0 print:m-0 print:rounded-none">
            {/* CV Header */}
            <div className="border-b-2 border-black pb-4 mb-5">
              <h1 className="text-2xl font-black tracking-tight text-black uppercase">
                {fullName}
              </h1>
              <p className="text-sm font-semibold text-gray-800 mt-1 uppercase">
                {headline}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-700 mt-2 font-mono">
                <span>{email}</span>
                <span>•</span>
                <span>{phone}</span>
                <span>•</span>
                <span>{location}</span>
                <span>•</span>
                <span>{linkedin}</span>
                <span>•</span>
                <span>{github}</span>
              </div>
            </div>

            {/* Section: Professional Summary */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-black">
                {targetMarket === "germany" ? "Profil & Zielsetzung" : "Professional Summary"}
              </h2>
              <p className="text-xs text-gray-800 leading-relaxed text-justify">
                {summary}
              </p>
            </div>

            {/* Section: Technical Skills */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-black">
                {targetMarket === "germany" ? "Technische Kenntnisse" : "Technical Skills"}
              </h2>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-gray-100 text-gray-900 px-2 py-0.5 rounded border border-gray-300 font-mono text-[11px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Section: Technical Experience & Projects */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-black">
                {targetMarket === "germany"
                  ? "Relevante Projekte & Praxiserfahrung"
                  : "Technical Experience & Projects"}
              </h2>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between font-bold text-gray-900">
                      <span>{exp.title}</span>
                      <span className="text-[11px] font-mono text-gray-600 font-normal">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-[11px] italic text-gray-700">{exp.company}</div>
                    <p className="text-xs text-gray-800 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Education & Certifications */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-2 text-black">
                {targetMarket === "germany"
                  ? "Ausbildung & Zertifizierungen"
                  : "Education & Certifications"}
              </h2>
              <div className="space-y-2">
                {educations.map((edu, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-gray-900">{edu.degree}</span>
                      <span className="text-gray-700"> — {edu.institution}</span>
                    </div>
                    <span className="text-[11px] font-mono text-gray-600">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
