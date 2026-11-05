"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Globe,
  Trash2,
  Plus,
  RefreshCw,
  Save,
  Check,
  Briefcase,
  GraduationCap,
  Award,
  Shield,
  HelpCircle,
  Eye,
  Info,
} from "lucide-react";

type Language = "fr" | "en" | "de";
type TemplateId = "ats_minimal" | "cyber_soc" | "dev_cloud";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

const DEMO_DATA: Record<Language, {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: string[];
  experiences: Experience[];
  educations: Education[];
}> = {
  fr: {
    fullName: "Alexandre R.",
    headline: "D\u00e9veloppeur Python & Analyste Cybers\u00e9curit\u00e9 Junior",
    email: "alexandre@raylab.tech",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France / Remote",
    linkedin: "linkedin.com/in/alexandre-raylab",
    github: "github.com/raylab-project",
    summary:
      "Passionn\u00e9 par l'architecture logicielle Python, l'administration Linux et la s\u00e9curit\u00e9 d\u00e9fensive (SOC). Rigoureux et orient\u00e9 r\u00e9sultats mesurables (formule Google XYZ). Exp\u00e9rience concr\u00e8te en scripts d'automatisation, d\u00e9tection d'incidents et conception d'outils de surveillance syst\u00e8me (FIM).",
    skills: [
      "Python 3.12 (POO, AsyncIO, Sockets)",
      "Linux / Shell Bash & Durcissement",
      "R\u00e9seaux (TCP/IP, Wireshark, DNS/TLS)",
      "Cybers\u00e9curit\u00e9 D\u00e9fensive (SIEM, FIM, OWASP)",
      "Conteneurs Docker & CI/CD GitHub Actions",
      "Cryptographie Appliqu\u00e9e (PBKDF2, SHA-256)",
    ],
    experiences: [
      {
        title: "Concepteur File Integrity Monitor (FIM) & Audit SIEM",
        company: "Laboratoire RayLab (Projet Capstone 06)",
        period: "2026",
        description:
          "D\u00e9veloppement d'un agent de surveillance d'int\u00e9grit\u00e9 de fichiers en Python utilisant le hachage cryptographique SHA-256. R\u00e9duction des faux positifs de 60% et d\u00e9tection en temps r\u00e9el des alt\u00e9rations syst\u00e8me sur serveurs Linux.",
      },
      {
        title: "D\u00e9veloppeur Outil d'Audit R\u00e9seau Multi-thread\u00e9",
        company: "Laboratoire RayLab (Projet Capstone 02)",
        period: "2026",
        description:
          "Conception d'un scanner de ports TCP multi-thread\u00e9 en sockets purs capable d'auditer 1024 ports en moins de 15 secondes avec prise d'empreinte banni\u00e8re et journalisation au format JSON.",
      },
    ],
    educations: [
      {
        degree: "CyberPath 2026-2027 \u2014 Sp\u00e9cialiste Cybers\u00e9curit\u00e9 Op\u00e9rationnelle",
        institution: "RayLab Institute (12 Volumes, 7 Projets Capstones)",
        year: "2026",
      },
      {
        degree: "Pr\u00e9paration Active : CompTIA Security+ (SY0-701) & CompTIA Network+ (N10-009)",
        institution: "Programme de Pr\u00e9paration Certifications RayLab",
        year: "2026 \u2014 2027",
      },
    ],
  },
  en: {
    fullName: "Alexandre R.",
    headline: "Junior Python Software Engineer & SOC Cybersecurity Analyst",
    email: "alexandre@raylab.tech",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France / Remote Europe",
    linkedin: "linkedin.com/in/alexandre-raylab",
    github: "github.com/raylab-project",
    summary:
      "Passionate about Python software architecture, Linux systems administration, and defensive security (SOC). Result-oriented professional utilizing the Google XYZ formula: accomplished measurable impact through automated tooling, intrusion detection scripts, and robust system integrity monitoring (FIM).",
    skills: [
      "Python 3.12 (OOP, AsyncIO, Sockets)",
      "Linux / Bash Shell Scripting & Hardening",
      "Networking (TCP/IP, Wireshark, DNS/TLS)",
      "Defensive Security (SIEM, FIM, OWASP)",
      "Docker Containers & GitHub Actions CI/CD",
      "Applied Cryptography (PBKDF2, SHA-256)",
    ],
    experiences: [
      {
        title: "File Integrity Monitor (FIM) & SIEM Ingestion Designer",
        company: "RayLab Engineering Lab (Capstone 06)",
        period: "2026",
        description:
          "Engineered a real-time Linux file integrity daemon in Python using SHA-256 cryptographic hashing. Reduced false positives by 60% and automated security alerts generation into syslog formats.",
      },
      {
        title: "Multi-threaded Network Audit Toolkit Developer",
        company: "RayLab Engineering Lab (Capstone 02)",
        period: "2026",
        description:
          "Built a modular TCP socket scanner capable of auditing 1,024 network ports in under 15 seconds with automated banner grabbing and structured JSON logging.",
      },
    ],
    educations: [
      {
        degree: "CyberPath 2026-2027 \u2014 Operational Cybersecurity Specialist",
        institution: "RayLab Institute (12 Practical Volumes, 7 Capstones)",
        year: "2026",
      },
      {
        degree: "Active Preparation: CompTIA Security+ (SY0-701) & Network+ (N10-009)",
        institution: "Pearson VUE Examination Target",
        year: "2026 \u2014 2027",
      },
    ],
  },
  de: {
    fullName: "Alexandre R.",
    headline: "Junior Python-Entwickler & SOC Cyber-Security Analyst",
    email: "alexandre@raylab.tech",
    phone: "+49 30 1234567",
    location: "Berlin, Deutschland / Remote",
    linkedin: "linkedin.com/in/alexandre-raylab",
    github: "github.com/raylab-project",
    summary:
      "Strukturierter und ergebnisorientierter Entwickler mit Schwerpunkt auf Python-Backend, Linux-Systemadministration und defensiver Cybersicherheit (SOC / SIEM). Erfahrung in der Entwicklung von Sicherheitswerkzeugen, Dateiintegrit\u00e4ts\u00fcberwachung (FIM) und Netzwerkverkehrsanalyse.",
    skills: [
      "Python 3.12 (OOP, AsyncIO, Sockets)",
      "Linux / Bash Shell-Scripting & H\u00e4rtung",
      "Netzwerktechnik (TCP/IP, Wireshark, DNS/TLS)",
      "Defensive Sicherheit (SIEM, FIM, OWASP)",
      "Docker-Container & CI/CD Pipelines",
      "Angewandte Kryptographie (PBKDF2, SHA-256)",
    ],
    experiences: [
      {
        title: "Entwickler f\u00fcr Dateiintegrit\u00e4ts\u00fcberwachung (FIM)",
        company: "RayLab Engineering Labor (Capstone-Projekt 06)",
        period: "2026",
        description:
          "Entwicklung eines Linux-Daemons zur Echtzeit\u00fcberwachung von Systemdateien in Python mittels SHA-256-Hashing. Reduzierung von Fehlalarmen um 60% und nahtlose Weiterleitung an zentrale SIEM-Instanzen.",
      },
      {
        title: "Entwickler Netzwerk-Audit & Socket-Tools",
        company: "RayLab Engineering Labor (Capstone-Projekt 02)",
        period: "2026",
        description:
          "Konzeption eines multi-threaded TCP-Portscanners in Python mit vollst\u00e4ndiger Banner-Erfassung f\u00fcr 1024 Ports in unter 15 Sekunden.",
      },
    ],
    educations: [
      {
        degree: "CyberPath 2026-2027 \u2014 Zertifizierter Cyber-Security-Spezialist",
        institution: "RayLab Institut (12 B\u00e4nde, 7 Praxisprojekte)",
        year: "2026",
      },
      {
        degree: "Zertifizierungsvorbereitung: CompTIA Security+ & Network+ (N10-009)",
        institution: "Pearson VUE Pr\u00fcfungsziel",
        year: "2026 \u2014 2027",
      },
    ],
  },
};

export default function CvBuilderPage() {
  const [lang, setLang] = useState<Language>("fr");
  const [template, setTemplate] = useState<TemplateId>("cyber_soc");
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  // Form states - Empty by default so user can build their real personal CV
  const [fullName, setFullName] = useState("");
  const [headline, setHeadline] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load from localStorage on mount if saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem("raylab_cv_data");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.fullName !== undefined) setFullName(data.fullName);
        if (data.headline !== undefined) setHeadline(data.headline);
        if (data.email !== undefined) setEmail(data.email);
        if (data.phone !== undefined) setPhone(data.phone);
        if (data.location !== undefined) setLocation(data.location);
        if (data.linkedin !== undefined) setLinkedin(data.linkedin);
        if (data.github !== undefined) setGithub(data.github);
        if (data.summary !== undefined) setSummary(data.summary);
        if (Array.isArray(data.skills)) setSkills(data.skills);
        if (Array.isArray(data.experiences)) setExperiences(data.experiences);
        if (Array.isArray(data.educations)) setEducations(data.educations);
        if (data.lang) setLang(data.lang);
        if (data.template) setTemplate(data.template);
        if (data.isDemoMode !== undefined) setIsDemoMode(data.isDemoMode);
      }
    } catch (e) {
      console.warn("Storage load error", e);
    }
  }, []);

  const handleSaveCv = () => {
    try {
      const data = {
        fullName,
        headline,
        email,
        phone,
        location,
        linkedin,
        github,
        summary,
        skills,
        experiences,
        educations,
        lang,
        template,
        isDemoMode,
      };
      localStorage.setItem("raylab_cv_data", JSON.stringify(data));
      setSaveStatus("CV sauvegard\u00e9 localement avec succ\u00e8s !");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      setSaveStatus("Erreur lors de la sauvegarde.");
    }
  };

  const handleLoadDemo = (targetLang: Language = lang) => {
    const demo = DEMO_DATA[targetLang] || DEMO_DATA.fr;
    setFullName(demo.fullName);
    setHeadline(demo.headline);
    setEmail(demo.email);
    setPhone(demo.phone);
    setLocation(demo.location);
    setLinkedin(demo.linkedin);
    setGithub(demo.github);
    setSummary(demo.summary);
    setSkills(demo.skills);
    setExperiences(demo.experiences);
    setEducations(demo.educations);
    setIsDemoMode(true);
    setLang(targetLang);
  };

  const handleClearCv = () => {
    setFullName("");
    setHeadline("");
    setEmail("");
    setPhone("");
    setLocation("");
    setLinkedin("");
    setGithub("");
    setSummary("");
    setSkills([]);
    setExperiences([]);
    setEducations([]);
    setIsDemoMode(false);
    localStorage.removeItem("raylab_cv_data");
    setSaveStatus("CV r\u00e9initialis\u00e9 : commencez votre CV personnel.");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: "Titre du poste ou projet technique",
        company: "Entreprise ou RayLab Project",
        period: "2026",
        description: "D\u00e9crivez vos r\u00e9alisations avec des verbes d'action et des r\u00e9sultats mesurables (% ou temps gagn\u00e9).",
      },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        degree: "Dipl\u00f4me, Titre ou Certification vis\u00e9e",
        institution: "RayLab Institute ou Universit\u00e9",
        year: "2026",
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  // --- DYNAMIC REAL-TIME ATS DIAGNOSTIC CRITERIA ---
  const allText = `${fullName} ${headline} ${summary} ${skills.join(" ")} ${experiences.map((e) => e.description).join(" ")}`.toLowerCase();

  const hasKeywords = ["python", "linux", "soc", "siem", "tcp", "bash", "audit", "security", "s\u00e9curit\u00e9", "docker", "wireshark", "owasp", "c2"].some(
    (kw) => allText.includes(kw)
  );

  const hasMetrics = /\d+[\s%|\$|€|k]|r\u00e9duit|am\u00e9lior|con\u00e7u|d\u00e9velopp\u00e9|engineered|reduced|built/i.test(allText);

  const atsCriteria = [
    {
      id: "contact_complete",
      label: "Coordonn\u00e9es valides (Nom, Email, Localisation)",
      passed: Boolean(fullName.trim() && email.trim() && location.trim()),
      points: 15,
      tip: "Le nom, un email professionnel et la r\u00e9gion g\u00e9ographique sont indispensables pour l'indexation ATS.",
    },
    {
      id: "headline_defined",
      label: "Titre professionnel cibl\u00e9 & r\u00e9sum\u00e9 (> 50 caract\u00e8res)",
      passed: Boolean(headline.trim().length >= 5 && summary.trim().length >= 50),
      points: 15,
      tip: "Un titre de poste pr\u00e9cis (ex: Analyste SOC Junior) facilite le matching des recruteurs.",
    },
    {
      id: "keywords_density",
      label: "Mots-cl\u00e9s techniques IT & Cybers\u00e9curit\u00e9",
      passed: hasKeywords && skills.length >= 3,
      points: 25,
      tip: "Mentionnez au moins 3 comp\u00e9tences concr\u00e8tes (Python, Linux, Sockets, SIEM, TCP/IP, Docker).",
    },
    {
      id: "metrics_impact",
      label: "R\u00e9alisations chiffr\u00e9es (Formule Google XYZ)",
      passed: hasMetrics,
      points: 25,
      tip: "Int\u00e9grez des indicateurs d'impact chiffr\u00e9s : 'R\u00e9duit de 60%', '1024 ports en 15s', etc.",
    },
    {
      id: "experience_structure",
      label: "Projets ou Exp\u00e9riences pratiques d\u00e9taill\u00e9s",
      passed: experiences.length >= 1,
      points: 20,
      tip: "Ajoutez au moins un projet capstone RayLab ou une exp\u00e9rience professionnelle document\u00e9e.",
    },
  ];

  const totalAtsScore = atsCriteria.reduce((acc, c) => acc + (c.passed ? c.points : 0), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1c222b]">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono border border-gold/30">
            <FileText className="w-3.5 h-3.5" />
            <span>CV Studio V3 &bull; Normes ATS Internationales</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-ivory tracking-tight">
            G&eacute;n&eacute;rateur de CV Technique &amp; Score ATS
          </h1>
          <p className="text-sm text-ivory-muted max-w-2xl">
            R&eacute;digez un CV adapt&eacute; aux filtres automatis&eacute;s (Applicant Tracking Systems) pour les march&eacute;s fran&ccedil;ais, europ&eacute;ens et allemands.
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          {isDemoMode ? (
            <button
              onClick={handleClearCv}
              className="px-4 py-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 text-xs font-mono font-bold flex items-center space-x-2 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Cr&eacute;er mon CV Vierge</span>
            </button>
          ) : (
            <button
              onClick={() => handleLoadDemo(lang)}
              className="px-4 py-2.5 rounded-xl bg-gold/15 hover:bg-gold/25 text-gold border border-gold/30 text-xs font-mono font-bold flex items-center space-x-2 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Charger l&apos;Exemple de D&eacute;monstration (Alexandre R.)</span>
            </button>
          )}

          <button
            onClick={handleSaveCv}
            className="px-4 py-2.5 rounded-xl bg-[#1e2533] hover:bg-[#283244] text-ivory border border-[#2e3a4e] text-xs font-mono flex items-center space-x-1.5 transition-all"
          >
            <Save className="w-3.5 h-3.5 text-gold" />
            <span>Sauvegarder</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wide shadow-gold flex items-center space-x-2 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer / PDF A4</span>
          </button>
        </div>
      </div>

      {/* DEMO / REAL PROFILE NOTICE BANNER */}
      {isDemoMode ? (
        <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center space-x-3">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="text-xs text-ivory-dim leading-relaxed">
              <strong className="text-amber-400">Mode D&eacute;monstration Actif :</strong> Vous visualisez le profil d&apos;exemple optimis&eacute; (Alexandre R. &mdash; Score 100/100). Pour mesurer votre score r&eacute;el et enregistrer vos propres informations, cliquez sur <strong>&laquo; Cr&eacute;er mon CV Vierge &raquo;</strong>.
            </div>
          </div>
          <button
            onClick={handleClearCv}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-mono font-bold whitespace-nowrap self-start sm:self-center transition-all"
          >
            Passer en mode r&eacute;el &rarr;
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-[#12161f] border border-[#222a38] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2 text-ivory-dim">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span><strong>Mode Donn&eacute;es Personnelles :</strong> Le score ATS ci-dessous est calcul&eacute; en direct &agrave; partir de vos v&eacute;ritables saisies.</span>
          </div>
          <button
            onClick={() => handleLoadDemo(lang)}
            className="text-gold hover:text-gold-light underline text-[11px] whitespace-nowrap"
          >
            Voir l&apos;exemple type
          </button>
        </div>
      )}

      {saveStatus && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-mono flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveStatus}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: EDIT CONTROLS & ATS DIAGNOSTIC (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* ATS Real-Time Diagnostic Box */}
          <div className="bg-[#141820] p-6 rounded-2xl border border-[#232c3a] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gold" />
                <h3 className="text-sm font-bold text-ivory uppercase tracking-wider font-mono">
                  Diagnostic ATS en Direct
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono text-ivory-dim">
                  {isDemoMode ? "(Exemple Démo)" : "(Vos Données)"}
                </span>
                <div
                  className={`text-xl font-black font-mono px-3 py-1 rounded-xl border ${
                    totalAtsScore >= 80
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : totalAtsScore >= 50
                      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      : "bg-red-500/15 text-red-400 border-red-500/30"
                  }`}
                >
                  {totalAtsScore}/100
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {atsCriteria.map((crit) => (
                <div
                  key={crit.id}
                  className={`p-3 rounded-xl border space-y-1 text-xs transition-all ${
                    crit.passed
                      ? "bg-[#0f131a] border-emerald-500/30 text-ivory"
                      : "bg-[#0b0d12] border-[#1e2532] text-ivory-dim"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-semibold">
                      {crit.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-ivory-dim flex-shrink-0" />
                      )}
                      <span className={crit.passed ? "text-ivory" : "text-ivory-dim"}>{crit.label}</span>
                    </div>
                    <span className="font-mono text-[10px] text-gold font-bold">
                      +{crit.points} pts
                    </span>
                  </div>
                  {!crit.passed && (
                    <p className="text-[11px] text-ivory-muted pl-5 leading-relaxed">
                      {crit.tip}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#0d1016] rounded-xl border border-[#1e2532] flex items-center space-x-2 text-[11px] font-mono text-ivory-dim">
              <HelpCircle className="w-4 h-4 text-gold flex-shrink-0" />
              <span>
                RayLab applique les standards ATS internationaux (lisibilit&eacute; machine, mise en page mono-colonne s&eacute;curis&eacute;e, pas de tableaux imbriqu&eacute;s).
              </span>
            </div>
          </div>

          {/* Form Inputs Container */}
          <div className="bg-[#141820] p-6 rounded-2xl border border-[#232c3a] space-y-5">
            <h3 className="text-sm font-bold text-ivory uppercase tracking-wider font-mono">
              Informations du Profil
            </h3>

            {/* Language & Template Pickers */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="text-ivory-dim block mb-1">Langue du CV</label>
                <div className="grid grid-cols-3 gap-1">
                  {(["fr", "en", "de"] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        if (isDemoMode) handleLoadDemo(l);
                      }}
                      className={`py-1.5 rounded-lg uppercase font-bold text-center border transition-all ${
                        lang === l
                          ? "bg-gold text-[#101216] border-gold"
                          : "bg-[#0f1217] text-ivory-dim border-[#1e2532] hover:border-gold/40"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-ivory-dim block mb-1">Mod&egrave;le ATS</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as TemplateId)}
                  className="w-full bg-[#0f1217] border border-[#1e2532] rounded-lg py-1.5 px-2 text-ivory text-xs focus:border-gold outline-none"
                >
                  <option value="cyber_soc">Cyber &amp; SOC</option>
                  <option value="dev_cloud">Python &amp; Cloud</option>
                  <option value="ats_minimal">Minimaliste Standard</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-ivory-dim font-mono block mb-1">Nom Complet</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (isDemoMode) setIsDemoMode(false);
                  }}
                  placeholder="ex: Alexandre Dupont"
                  className="w-full bg-[#0f1217] border border-[#1e2532] rounded-xl p-2.5 text-ivory focus:border-gold outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-ivory-dim font-mono block mb-1">Titre Professionnel vis&eacute;</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => {
                    setHeadline(e.target.value);
                    if (isDemoMode) setIsDemoMode(false);
                  }}
                  placeholder="ex: Analyste Cybersécurité SOC Junior"
                  className="w-full bg-[#0f1217] border border-[#1e2532] rounded-xl p-2.5 text-ivory focus:border-gold outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-ivory-dim font-mono block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (isDemoMode) setIsDemoMode(false);
                    }}
                    placeholder="contact@exemple.fr"
                    className="w-full bg-[#0f1217] border border-[#1e2532] rounded-xl p-2.5 text-ivory focus:border-gold outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-ivory-dim font-mono block mb-1">T&eacute;l&eacute;phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (isDemoMode) setIsDemoMode(false);
                    }}
                    placeholder="+33 6 00 00 00 00"
                    className="w-full bg-[#0f1217] border border-[#1e2532] rounded-xl p-2.5 text-ivory focus:border-gold outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-ivory-dim font-mono block mb-1">Localisation &amp; Mobilit&eacute;</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (isDemoMode) setIsDemoMode(false);
                  }}
                  placeholder="ex: Paris, France / Remote"
                  className="w-full bg-[#0f1217] border border-[#1e2532] rounded-xl p-2.5 text-ivory focus:border-gold outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-ivory-dim font-mono block mb-1">LinkedIn</label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => {
                      setLinkedin(e.target.value);
                      if (isDemoMode) setIsDemoMode(false);
                    }}
                    placeholder="linkedin.com/in/..."
                    className="w-full bg-[#0f1217] border border-[#1e2532] rounded-xl p-2.5 text-ivory focus:border-gold outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-ivory-dim font-mono block mb-1">GitHub</label>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => {
                      setGithub(e.target.value);
                      if (isDemoMode) setIsDemoMode(false);
                    }}
                    placeholder="github.com/..."
                    className="w-full bg-[#0f1217] border border-[#1e2532] rounded-xl p-2.5 text-ivory focus:border-gold outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-ivory-dim font-mono block mb-1">R&eacute;sum&eacute; Professionnel (3 &agrave; 5 lignes)</label>
                <textarea
                  rows={4}
                  value={summary}
                  onChange={(e) => {
                    setSummary(e.target.value);
                    if (isDemoMode) setIsDemoMode(false);
                  }}
                  placeholder="Présentez vos compétences clés, vos projets concrets et vos objectifs professionnels..."
                  className="w-full bg-[#0f1217] border border-[#1e2532] rounded-xl p-2.5 text-ivory focus:border-gold outline-none font-mono text-xs leading-relaxed"
                />
              </div>
            </div>

            {/* Skills Editor */}
            <div className="space-y-3 pt-3 border-t border-[#1e2532]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-ivory">Comp&eacute;tences Techniques</label>
                <span className="text-[10px] font-mono text-ivory-dim">{skills.length} ajout&eacute;es</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  placeholder="ex: Wireshark, Docker, Sockets..."
                  className="flex-1 bg-[#0f1217] border border-[#1e2532] rounded-xl px-3 py-2 text-ivory focus:border-gold outline-none font-mono text-xs"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-3 py-2 bg-gold/15 hover:bg-gold/25 text-gold border border-gold/30 rounded-xl text-xs font-mono font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#0f1217] border border-[#202735] text-[11px] font-mono text-ivory"
                  >
                    <span>{s}</span>
                    <button
                      onClick={() => handleRemoveSkill(idx)}
                      className="text-ivory-dim hover:text-red-400"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Experiences Editor */}
            <div className="space-y-3 pt-3 border-t border-[#1e2532]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-ivory">Projets &amp; Exp&eacute;riences</label>
                <button
                  onClick={handleAddExperience}
                  className="text-xs font-mono text-gold hover:text-gold-light inline-flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Ajouter</span>
                </button>
              </div>
              {experiences.map((exp, idx) => (
                <div key={idx} className="p-3 bg-[#0f1217] rounded-xl border border-[#1e2532] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gold font-mono">Exp&eacute;rience #{idx + 1}</span>
                    <button onClick={() => handleRemoveExperience(idx)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => {
                      const next = [...experiences];
                      next[idx].title = e.target.value;
                      setExperiences(next);
                      if (isDemoMode) setIsDemoMode(false);
                    }}
                    placeholder="Titre du poste"
                    className="w-full bg-[#131720] border border-[#242c3b] rounded-lg p-1.5 text-ivory font-mono text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const next = [...experiences];
                        next[idx].company = e.target.value;
                        setExperiences(next);
                        if (isDemoMode) setIsDemoMode(false);
                      }}
                      placeholder="Entreprise ou Projet"
                      className="w-full bg-[#131720] border border-[#242c3b] rounded-lg p-1.5 text-ivory font-mono text-xs"
                    />
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => {
                        const next = [...experiences];
                        next[idx].period = e.target.value;
                        setExperiences(next);
                        if (isDemoMode) setIsDemoMode(false);
                      }}
                      placeholder="Période (ex: 2026)"
                      className="w-full bg-[#131720] border border-[#242c3b] rounded-lg p-1.5 text-ivory font-mono text-xs"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={exp.description}
                    onChange={(e) => {
                      const next = [...experiences];
                      next[idx].description = e.target.value;
                      setExperiences(next);
                      if (isDemoMode) setIsDemoMode(false);
                    }}
                    placeholder="Réalisations chiffrées (% ou temps gagné)..."
                    className="w-full bg-[#131720] border border-[#242c3b] rounded-lg p-1.5 text-ivory font-mono text-xs"
                  />
                </div>
              ))}
            </div>

            {/* Education Editor */}
            <div className="space-y-3 pt-3 border-t border-[#1e2532]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-ivory">Formations &amp; Certifications</label>
                <button
                  onClick={handleAddEducation}
                  className="text-xs font-mono text-gold hover:text-gold-light inline-flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Ajouter</span>
                </button>
              </div>
              {educations.map((edu, idx) => (
                <div key={idx} className="p-3 bg-[#0f1217] rounded-xl border border-[#1e2532] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gold font-mono">Formation #{idx + 1}</span>
                    <button onClick={() => handleRemoveEducation(idx)} className="text-red-400 hover:text-red-300">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const next = [...educations];
                      next[idx].degree = e.target.value;
                      setEducations(next);
                      if (isDemoMode) setIsDemoMode(false);
                    }}
                    placeholder="Intitulé du diplôme ou certification"
                    className="w-full bg-[#131720] border border-[#242c3b] rounded-lg p-1.5 text-ivory font-mono text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const next = [...educations];
                        next[idx].institution = e.target.value;
                        setEducations(next);
                        if (isDemoMode) setIsDemoMode(false);
                      }}
                      placeholder="Organisme ou École"
                      className="w-full bg-[#131720] border border-[#242c3b] rounded-lg p-1.5 text-ivory font-mono text-xs"
                    />
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => {
                        const next = [...educations];
                        next[idx].year = e.target.value;
                        setEducations(next);
                        if (isDemoMode) setIsDemoMode(false);
                      }}
                      placeholder="Année (ex: 2026)"
                      className="w-full bg-[#131720] border border-[#242c3b] rounded-lg p-1.5 text-ivory font-mono text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE ATS PREVIEW SHEET (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-ivory-dim px-2">
            <span>Aper&ccedil;u Conforme A4 &bull; {template.replace("_", " ").toUpperCase()}</span>
            <span className="text-gold font-bold">100% Compatible Impression &amp; PDF</span>
          </div>

          {/* A4 Sheet Container */}
          <div
            id="cv-printable-area"
            className={`bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-300 min-h-[900px] flex flex-col justify-between space-y-8 ${
              template === "cyber_soc"
                ? "border-t-8 border-t-slate-900"
                : template === "dev_cloud"
                ? "border-t-8 border-t-amber-600"
                : "border-t-4 border-t-slate-400"
            }`}
          >
            {/* CV Header */}
            <div className="space-y-3 pb-6 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  {fullName || "VOTRE NOM ET PR\u00c9NOM"}
                </h2>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">
                  {headline || "Titre professionnel"}
                </span>
              </div>

              {/* Contact strip */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 font-mono">
                {email && <span>{email}</span>}
                {phone && <span>&bull; {phone}</span>}
                {location && <span>&bull; {location}</span>}
                {linkedin && <span>&bull; {linkedin}</span>}
                {github && <span>&bull; {github}</span>}
              </div>

              {/* Professional Summary */}
              {summary && (
                <p className="text-xs text-slate-700 leading-relaxed pt-2 text-justify">
                  {summary}
                </p>
              )}
            </div>

            {/* CV Body */}
            <div className="space-y-6 flex-1">
              {/* Technical Skills */}
              {skills.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">
                    {lang === "de" ? "Fachliche Kompetenzen" : lang === "en" ? "Technical Skills" : "Comp\u00e9tences Techniques"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-800">
                    {skills.map((s, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <span className="text-slate-400 font-bold">&bull;</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experiences & Capstones */}
              {experiences.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">
                    {lang === "de" ? "Praktische Projekte & Erfahrung" : lang === "en" ? "Practical Projects & Experience" : "Projets &amp; Exp\u00e9riences Pratiques"}
                  </h3>
                  <div className="space-y-3">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                          <span className="font-bold text-slate-900">{exp.title}</span>
                          <span className="text-slate-500 font-mono text-[11px]">{exp.period}</span>
                        </div>
                        <div className="text-xs italic text-slate-600">{exp.company}</div>
                        <p className="text-xs text-slate-700 leading-relaxed text-justify">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Certifications */}
              {educations.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-mono">
                    {lang === "de" ? "Ausbildung & Zertifizierungen" : lang === "en" ? "Education & Certifications" : "Formations &amp; Certifications"}
                  </h3>
                  <div className="space-y-2">
                    {educations.map((edu, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-900">{edu.degree}</span>
                          <span className="text-slate-600"> &mdash; {edu.institution}</span>
                        </div>
                        <span className="text-slate-500 font-mono text-[11px]">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Watermark */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>{isDemoMode ? "Exemple de D\u00e9monstration RayLab" : "Document G\u00e9n\u00e9r\u00e9 sur RayLab Platform"}</span>
              <span>Conforme Format ATS &bull; A4 Mono-Colonne</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
