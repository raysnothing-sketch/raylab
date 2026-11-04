"use client";

import React, { useState, useEffect } from "react";
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
  Save,
  RotateCcw,
  Languages,
  Layout,
  Award,
  Shield,
  HelpCircle,
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

export default function CvBuilderPage() {
  const [lang, setLang] = useState<Language>("fr");
  const [template, setTemplate] = useState<TemplateId>("cyber_soc");

  // Form states
  const [fullName, setFullName] = useState("Alexandre R.");
  const [headline, setHeadline] = useState("Développeur Python & Analyste Cybersécurité Junior");
  const [email, setEmail] = useState("alexandre@raylab.tech");
  const [phone, setPhone] = useState("+33 6 12 34 56 78");
  const [location, setLocation] = useState("Paris, France / Berlin, Germany");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/alexandre-raylab");
  const [github, setGithub] = useState("github.com/raylab-project");
  const [summary, setSummary] = useState(
    "Passionné par l'architecture logicielle Python, l'administration Linux et la sécurité défensive (SOC). Autonome, rigoureux et orienté résultats mesurables (formule Google XYZ). Expérience solide en scripts d'automatisation, détection d'intrusions et conception d'outils de surveillance système (FIM)."
  );

  const [skills, setSkills] = useState([
    "Python 3.12 (POO, AsyncIO, Sockets)",
    "Linux / Shell Bash & Durcissement",
    "Réseaux (TCP/IP, Wireshark, DNS/TLS)",
    "Cybersécurité Défensive (SIEM, FIM, OWASP)",
    "Conteneurs Docker & CI/CD GitHub Actions",
    "Cryptographie Appliquée (PBKDF2, SHA-256)",
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      title: "Concepteur File Integrity Monitor (FIM) & Audit SIEM",
      company: "Laboratoire RayLab (Projet Capstone 06)",
      period: "2026 - Présent",
      description:
        "Développement d'un agent de surveillance d'intégrité de fichiers en Python utilisant le hachage cryptographique SHA-256. Réduction des faux positifs de 60% et détection en temps réel des altérations système sur serveurs Linux.",
    },
    {
      title: "Développeur Python & Analyseur de Flux Réseau",
      company: "Laboratoire RayLab (Projet Capstone 02)",
      period: "2026",
      description:
        "Conception d'un scanner de ports TCP multi-threadé en sockets purs capable d'auditer 1024 ports en moins de 15 secondes avec prise d'empreinte bannière et journalisation au format JSON.",
    },
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      degree: "CyberPath 2026-2027 — Spécialiste Cybersécurité Opérationnelle",
      institution: "RayLab Institute (12 Volumes, 7 Projets Capstones)",
      year: "2026",
    },
    {
      degree: "Préparation Active : CompTIA Security+ (SY0-701) & Cisco CCNA",
      institution: "Formation Certifiante Indépendante",
      year: "2026 - 2027",
    },
  ]);

  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("raylab_cv_data");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.fullName) setFullName(data.fullName);
        if (data.headline) setHeadline(data.headline);
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.location) setLocation(data.location);
        if (data.linkedin) setLinkedin(data.linkedin);
        if (data.github) setGithub(data.github);
        if (data.summary) setSummary(data.summary);
        if (data.skills) setSkills(data.skills);
        if (data.experiences) setExperiences(data.experiences);
        if (data.educations) setEducations(data.educations);
        if (data.lang) setLang(data.lang);
        if (data.template) setTemplate(data.template);
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
      };
      localStorage.setItem("raylab_cv_data", JSON.stringify(data));
      setSaveStatus("CV sauvegardé localement avec succès !");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      setSaveStatus("Erreur lors de la sauvegarde.");
    }
  };

  const handleResetExample = (targetLang: Language) => {
    setLang(targetLang);
    if (targetLang === "en") {
      setFullName("Alexandre R.");
      setHeadline("Junior Python Software Engineer & SOC Cybersecurity Analyst");
      setLocation("Paris, France / Remote Europe");
      setSummary(
        "Passionate about Python software architecture, Linux systems administration, and defensive security (SOC). Result-oriented professional utilizing the Google XYZ formula: accomplished measurable impact through automated tooling, intrusion detection scripts, and robust system integrity monitoring (FIM)."
      );
      setSkills([
        "Python 3.12 (OOP, AsyncIO, Sockets)",
        "Linux / Bash Shell Scripting & Hardening",
        "Networking (TCP/IP, Wireshark, DNS/TLS)",
        "Defensive Security (SIEM, FIM, OWASP)",
        "Docker Containers & GitHub Actions CI/CD",
        "Applied Cryptography (PBKDF2, SHA-256)",
      ]);
      setExperiences([
        {
          title: "File Integrity Monitor (FIM) & SIEM Ingestion Designer",
          company: "RayLab Engineering Lab (Capstone 06)",
          period: "2026 - Present",
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
      ]);
      setEducations([
        {
          degree: "CyberPath 2026-2027 — Operational Cybersecurity Specialist",
          institution: "RayLab Institute (12 Practical Volumes, 7 Capstones)",
          year: "2026",
        },
        {
          degree: "In-Depth Preparation: CompTIA Security+ (SY0-701) & Cisco CCNA",
          institution: "Pearson VUE Examination Target",
          year: "2026 - 2027",
        },
      ]);
    } else if (targetLang === "de") {
      setFullName("Alexandre R.");
      setHeadline("Junior Python Entwickler & Cyber-Sicherheitsanalyst (SOC)");
      setLocation("Berlin, Deutschland / Remote");
      setSummary(
        "Engagierter Software- und Sicherheitsspezialist mit Schwerpunkt auf Python-Entwicklung, Linux-Systemadministration und Blue-Team-Sicherheitsüberwachung. Strukturierte Arbeitsweise nach der Google-XYZ-Formel: messbare Leistungssteigerung durch Automatisierungsskripte und Systemüberwachung."
      );
      setSkills([
        "Python 3.12 (OOP, AsyncIO, Netzwerk-Sockets)",
        "Linux / Bash Scripting & Systemhärtung",
        "Netzwerke (TCP/IP, Wireshark, DNS/TLS)",
        "Defensive Sicherheit (SIEM, FIM, OWASP)",
        "Docker Container & GitHub Actions CI/CD",
        "Kryptographie (PBKDF2, SHA-256)",
      ]);
      setExperiences([
        {
          title: "Entwickler für File Integrity Monitoring & SIEM-Analyse",
          company: "RayLab Forschungslabor (Capstone 06)",
          period: "2026 - Heute",
          description:
            "Konzeption eines Python-Überwachungsdienstes für Linux mit SHA-256 Hash-Validierung. Reduzierung von Fehlalarmen um 60% und Bereitstellung automatisierter Sicherheitsberichte.",
        },
        {
          title: "Entwickler für Multithread-Netzwerkaudit-Tools",
          company: "RayLab Forschungslabor (Capstone 02)",
          period: "2026",
          description:
            "Entwicklung eines TCP-Socket-Scanners mit automatischem Banner-Grabbing, der 1.024 Netzwerkports in unter 15 Sekunden strukturiert erfasst.",
        },
      ]);
      setEducations([
        {
          degree: "CyberPath 2026-2027 — Spezialist für Operative Cybersicherheit",
          institution: "RayLab Institute (12 Bände, 7 Abschlussprojekte)",
          year: "2026",
        },
        {
          degree: "Prüfungsvorbereitung: CompTIA Security+ (SY0-701)",
          institution: "Offizielles Zertifizierungsziel",
          year: "2026 - 2027",
        },
      ]);
    } else {
      // Reset to French
      setFullName("Alexandre R.");
      setHeadline("Développeur Python & Analyste Cybersécurité Junior");
      setLocation("Paris, France / Berlin, Germany");
      setSummary(
        "Passionné par l'architecture logicielle Python, l'administration Linux et la sécurité défensive (SOC). Autonome, rigoureux et orienté résultats mesurables (formule Google XYZ). Expérience solide en scripts d'automatisation, détection d'intrusions et conception d'outils de surveillance système (FIM)."
      );
    }
  };

  // ---------------------------------------------------------------------------
  // ATS DIAGNOSTIC DETAILED CRITERIA
  // ---------------------------------------------------------------------------
  const atsCriteria = [
    {
      id: "keywords",
      label: "Mots-clés techniques clés détectés (Python, Linux, TCP/IP, SIEM)",
      passed: skills.length >= 5 && skills.some(s => s.toLowerCase().includes("python")),
      points: 25,
      tip: "Mentionnez vos technologies maîtresses sans abréviations obscures.",
    },
    {
      id: "metrics",
      label: "Mesures chiffrées & Formule Google XYZ (%, chiffres, durées)",
      passed: experiences.some(e => /\d+%|\d+\s*(sec|min|ports|req)/i.test(e.description)),
      points: 25,
      tip: "Utilisez la formule : « Accompli [X], mesuré par [Y], en faisant [Z] ».",
    },
    {
      id: "contact",
      label: "Coordonnées complètes sans tableaux cachés (Email, Téléphone, GitHub)",
      passed: !!email && !!phone && !!github,
      points: 20,
      tip: "Les ATS lisent mal les en-têtes complexes ou tableaux imbriqués.",
    },
    {
      id: "action_verbs",
      label: "Verbes d'action au début des réalisations (Développé, Conçu, Déployé)",
      passed: experiences.some(e => /^(Développement|Conception|Engineered|Built|Entwicklung|Konzeption)/i.test(e.description) || /^(Développé|Conçu|Déployé)/i.test(e.description)),
      points: 15,
      tip: "Commencez chaque bullet point par un verbe d'action vigoureux.",
    },
    {
      id: "length",
      label: "Densité du résumé professionnel (50 à 500 caractères)",
      passed: summary.length >= 60 && summary.length <= 600,
      points: 15,
      tip: "Un résumé concis de 3 à 5 lignes maximise le score de lecture automatique.",
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
            <span>CV Studio V3 • Normes ATS Internationales</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-ivory tracking-tight">
            Générateur de CV Compatible ATS
          </h1>
          <p className="text-xs sm:text-sm text-ivory-muted max-w-2xl">
            Concevez un curriculum vitae technique sans fioritures superflues, directement analysable par les algorithmes de recrutement (Workday, Taleo, Greenhouse) et optimisé pour le marché français, européen et allemand.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSaveCv}
            className="px-4 py-2.5 rounded-xl bg-[#161a22] hover:bg-[#1f2532] text-ivory border border-[#2b3544] text-xs font-mono flex items-center space-x-2 transition-all"
          >
            <Save className="w-4 h-4 text-gold" />
            <span>Sauvegarder</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs tracking-wider uppercase transition-all shadow-gold flex items-center space-x-2"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer / Export PDF</span>
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Control Switchers: Language & Template */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#11141b] p-4 rounded-2xl border border-[#202734]">
        {/* Language Switcher */}
        <div className="flex items-center space-x-3">
          <Languages className="w-4 h-4 text-gold flex-shrink-0" />
          <span className="text-xs font-mono text-ivory-dim">Langue du Profil :</span>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => handleResetExample("fr")}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                lang === "fr" ? "bg-gold text-[#101216] shadow-sm" : "bg-[#181d26] text-ivory-muted hover:text-ivory"
              }`}
            >
              🇫🇷 Français
            </button>
            <button
              onClick={() => handleResetExample("en")}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                lang === "en" ? "bg-gold text-[#101216] shadow-sm" : "bg-[#181d26] text-ivory-muted hover:text-ivory"
              }`}
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => handleResetExample("de")}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                lang === "de" ? "bg-gold text-[#101216] shadow-sm" : "bg-[#181d26] text-ivory-muted hover:text-ivory"
              }`}
            >
              🇩🇪 Deutsch (Lebenslauf)
            </button>
          </div>
        </div>

        {/* Template Switcher */}
        <div className="flex items-center space-x-3 md:justify-end">
          <Layout className="w-4 h-4 text-gold flex-shrink-0" />
          <span className="text-xs font-mono text-ivory-dim">Style ATS :</span>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setTemplate("cyber_soc")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                template === "cyber_soc" ? "bg-gold text-[#101216] font-bold" : "bg-[#181d26] text-ivory-muted hover:text-ivory"
              }`}
            >
              Cyber &amp; SOC
            </button>
            <button
              onClick={() => setTemplate("dev_cloud")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                template === "dev_cloud" ? "bg-gold text-[#101216] font-bold" : "bg-[#181d26] text-ivory-muted hover:text-ivory"
              }`}
            >
              Python &amp; Cloud
            </button>
            <button
              onClick={() => setTemplate("ats_minimal")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                template === "ats_minimal" ? "bg-gold text-[#101216] font-bold" : "bg-[#181d26] text-ivory-muted hover:text-ivory"
              }`}
            >
              Minimaliste Standard
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid: Form on Left, Live A4 Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: EDIT FORM & ATS DIAGNOSTIC */}
        <div className="lg:col-span-5 space-y-6">
          {/* ATS Diagnostic Card */}
          <div className="bg-[#141820] p-6 rounded-2xl border border-[#232c3a] space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-gold">
                  Diagnostic ATS Explicable (Section 12.2)
                </span>
                <h3 className="text-lg font-bold text-ivory">Score de Compatibilité Robot</h3>
              </div>
              <div className="text-right">
                <div
                  className={`text-3xl font-black font-mono ${
                    totalAtsScore >= 80 ? "text-emerald-400" : totalAtsScore >= 60 ? "text-amber-400" : "text-rose-400"
                  }`}
                >
                  {totalAtsScore}/100
                </div>
                <span className="text-[10px] font-mono text-ivory-dim">
                  {totalAtsScore >= 80 ? "Excellente lisibilité" : "Améliorations suggérées"}
                </span>
              </div>
            </div>

            {/* Criteria checklist */}
            <div className="space-y-3 pt-2">
              {atsCriteria.map((crit) => (
                <div key={crit.id} className="p-3 bg-[#0f1217] rounded-xl border border-[#1e2532] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2 text-ivory">
                      {crit.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      )}
                      <span className={crit.passed ? "text-ivory" : "text-ivory-muted"}>{crit.label}</span>
                    </span>
                    <span className="font-mono text-gold text-[11px]">+{crit.points} pts</span>
                  </div>
                  {!crit.passed && (
                    <p className="text-[11px] text-amber-300/80 pl-6 leading-relaxed">
                      💡 {crit.tip}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="text-[11px] text-ivory-dim leading-relaxed border-t border-[#1d2430] pt-3 flex items-start space-x-2">
              <HelpCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span>
                <strong>Engagement de transparence :</strong> Les algorithmes ATS (Applicant Tracking Systems) varient selon les éditeurs. RayLab fournit des critères structurels universels sans promettre une compatibilité absolue à 100%.
              </span>
            </div>
          </div>

          {/* Edit Form Accordion / Inputs */}
          <div className="bg-[#141820] p-6 rounded-2xl border border-[#232c3a] space-y-4">
            <h3 className="text-sm font-bold text-ivory uppercase tracking-wider font-mono">
              Édition des Données
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-ivory-dim font-mono">Nom complet :</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3 py-2 text-ivory outline-none focus:border-gold font-mono mt-1"
                />
              </div>

              <div>
                <label className="text-ivory-dim font-mono">Titre du Profil (Headline) :</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3 py-2 text-ivory outline-none focus:border-gold mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-ivory-dim font-mono">Email :</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3 py-2 text-ivory outline-none focus:border-gold font-mono mt-1"
                  />
                </div>
                <div>
                  <label className="text-ivory-dim font-mono">Téléphone :</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3 py-2 text-ivory outline-none focus:border-gold font-mono mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-ivory-dim font-mono">Localisation :</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3 py-2 text-ivory outline-none focus:border-gold mt-1"
                  />
                </div>
                <div>
                  <label className="text-ivory-dim font-mono">Profil GitHub :</label>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl px-3 py-2 text-ivory outline-none focus:border-gold font-mono mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-ivory-dim font-mono">Résumé Professionnel (Summary) :</label>
                <textarea
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full bg-[#0e1117] border border-[#222a38] rounded-xl p-3 text-ivory outline-none focus:border-gold leading-relaxed mt-1 text-xs"
                />
              </div>

              {/* Skills Tags Input */}
              <div className="space-y-2 pt-2">
                <label className="text-ivory-dim font-mono flex items-center justify-between">
                  <span>Compétences Clés (Skills) :</span>
                  <span className="text-[10px] text-gold">{skills.length} ajoutées</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#0e1117] text-gold border border-gold/30 font-mono text-[11px] flex items-center space-x-1.5"
                    >
                      <span>{sk}</span>
                      <button
                        onClick={() => setSkills(skills.filter((_, i) => i !== idx))}
                        className="text-ivory-dim hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    id="newSkillInput"
                    placeholder="Ajouter une compétence (ex: Scapy, SIEM)..."
                    className="flex-1 bg-[#0e1117] border border-[#222a38] rounded-xl px-3 py-1.5 text-xs text-ivory outline-none focus:border-gold font-mono"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const val = e.currentTarget.value.trim();
                        if (val && !skills.includes(val)) {
                          setSkills([...skills, val]);
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: A4 PRINT-READY LIVE PREVIEW */}
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            <div className="text-xs font-mono text-ivory-dim mb-2 flex items-center justify-between">
              <span>Aperçu Page A4 Réelle (Format Standard 210 × 297 mm)</span>
              <span className="text-gold font-bold">100% Dédié Impression &amp; PDF</span>
            </div>

            {/* A4 Sheet Container */}
            <div
              id="cv-printable-area"
              className={`bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl transition-all border border-slate-200 text-sm leading-normal ${
                template === "ats_minimal"
                  ? "font-sans"
                  : template === "cyber_soc"
                  ? "font-sans border-l-8 border-l-slate-800"
                  : "font-sans"
              }`}
              style={{ minHeight: "1050px" }}
            >
              {/* Header */}
              <div className="border-b border-slate-300 pb-5 mb-6">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
                  {fullName}
                </h1>
                <div className="text-sm font-semibold text-slate-700 mt-1">
                  {headline}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-3 font-mono">
                  {email && <span>{email}</span>}
                  {phone && <span>• {phone}</span>}
                  {location && <span>• {location}</span>}
                  {github && <span>• {github}</span>}
                </div>
              </div>

              {/* Summary */}
              {summary && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2 font-mono">
                    {lang === "fr" ? "Profil Professionnel" : lang === "en" ? "Professional Summary" : "Kurzprofil"}
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed text-justify">
                    {summary}
                  </p>
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2 font-mono">
                    {lang === "fr" ? "Compétences Techniques & Environnements" : lang === "en" ? "Core Technical Competencies" : "Technische Fachkenntnisse"}
                  </h2>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-700">
                    {skills.map((sk, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>{sk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experiences */}
              <div className="mb-6 space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2 font-mono">
                  {lang === "fr" ? "Projets d'Ingénierie & Réalisations (Formule Google XYZ)" : lang === "en" ? "Engineering Projects & Work Experience" : "Praxiserfahrung & Ingenieurprojekte"}
                </h2>
                {experiences.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-bold text-slate-900 text-xs">{exp.title}</span>
                      <span className="text-[11px] font-mono text-slate-500">{exp.period}</span>
                    </div>
                    <div className="text-xs font-medium text-slate-600 italic">
                      {exp.company}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed pt-0.5">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Education & Certifications */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2 font-mono">
                  {lang === "fr" ? "Formations & Certifications Visées" : lang === "en" ? "Education & Professional Certifications" : "Ausbildung & Angestrebte Zertifizierungen"}
                </h2>
                {educations.map((edu, idx) => (
                  <div key={idx} className="flex flex-wrap items-baseline justify-between text-xs gap-2">
                    <div>
                      <span className="font-bold text-slate-900">{edu.degree}</span>
                      <span className="text-slate-600"> — {edu.institution}</span>
                    </div>
                    <span className="font-mono text-slate-500 text-[11px]">{edu.year}</span>
                  </div>
                ))}
              </div>

              {/* Footer Stamp */}
              <div className="mt-12 pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Vérifié par RayLab Institute • Portfolio : {github}</span>
                <span>Page 1 / 1 • Format ATS Optimisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
