import React from "react";
import Link from "next/link";
import {
  Shield,
  Terminal,
  Code2,
  Lock,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Flame,
  Layers,
  Award,
  Globe,
  FileCheck,
  ChevronRight,
  Server,
  Zap,
  HelpCircle,
  ExternalLink,
  BookOpen,
  Briefcase,
  Share2,
} from "lucide-react";
import { getLearningPaths, getProjects, getCertifications } from "@/lib/data";
import InteractiveTerminalLab from "@/components/InteractiveTerminalLab";

export default async function HomePage() {
  const paths = await getLearningPaths();
  const projects = await getProjects();
  const certs = await getCertifications();

  // Separate the CyberPath Master, the 8 Academies, and the Career Launchpad
  const masterPath = paths.find((p) => p.slug === "cyberpath-2026-2027");
  const careerPath = paths.find((p) => p.slug.includes("career"));
  const specializedAcademies = paths.filter(
    (p) => p.slug !== "cyberpath-2026-2027" && !p.slug.includes("career")
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-28 lg:pb-36 border-b border-[#1c222b]">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-gold/10 via-amber-500/5 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />
        <div className="absolute top-12 right-12 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-7">
            {/* Top pill badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#161a22] border border-[#2d3540] text-xs font-mono text-gold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>RayLab &bull; Plateforme d&apos;Ing&eacute;nierie &amp; Cybers&eacute;curit&eacute; Pratique</span>
            </div>

            {/* Main title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-ivory tracking-tight leading-[1.12]">
              Apprenez l&apos;Informatique, les Syst&egrave;mes et la{" "}
              <span className="bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
                Cybers&eacute;curit&eacute; par la Pratique
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-ivory-muted max-w-2xl mx-auto leading-relaxed">
              De l&apos;initiation Python &agrave; la d&eacute;tection d&apos;incidents en SOC : des cursus structur&eacute;s, des simulations en sandbox et des projets document&eacute;s sur GitHub.
            </p>

            {/* Signature */}
            <div className="text-xs sm:text-sm font-mono tracking-widest text-gold uppercase pt-1">
              Learn. Build. Secure. Become.
            </div>

            {/* Action buttons: Dual Pathway (Débutant vs Pratiquant) */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/paths"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs tracking-wider uppercase shadow-gold transition-all flex items-center justify-center space-x-2 group"
              >
                <BookOpen className="w-4 h-4" />
                <span>D&eacute;butant : D&eacute;couvrir les 8 Acad&eacute;mies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/lab"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#161a22] hover:bg-[#1f2530] border border-gold/40 text-gold font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all group shadow-sm"
              >
                <Terminal className="w-4 h-4 text-gold animate-pulse" />
                <span>Pratiquant : Cyber Range &amp; Sandbox &gt;_</span>
              </Link>
              <Link
                href="/portfolio"
                className="w-full sm:w-auto px-5 py-4 rounded-xl bg-[#1b212b] hover:bg-[#232b38] border border-[#2d3644] text-ivory font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all"
              >
                <Share2 className="w-4 h-4 text-gold" />
                <span>Portfolio Public</span>
              </Link>
            </div>

            {/* Official Brand Banner Card */}
            <div className="pt-8 max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-2xl bg-[#0d1016] group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1218]/80 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src="/raylab-banner.png"
                  alt="Banniere Officielle RayLab - Academie de Cybersecurite et Laboratoire Virtuel"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-4 z-20 flex items-center space-x-2 text-[11px] font-mono text-gold bg-[#10141b]/90 px-3 py-1 rounded-full border border-gold/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>RAYLAB ACAD&Eacute;MIE &bull; CYBERPATH 2026-2027</span>
                </div>
              </div>
            </div>

            {/* Pedagogical Hierarchy Reference Bar (Règle V3.0) */}
            <div className="pt-6 max-w-3xl mx-auto">
              <div className="p-3.5 bg-[#12161f] rounded-xl border border-gold/20 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-ivory-dim">
                <span className="text-gold font-bold">Hi&eacute;rarchie Unique :</span>
                <span className="text-ivory font-semibold bg-[#1a202c] px-2 py-0.5 rounded">Acad&eacute;mies</span>
                <span className="text-gold">&rarr;</span>
                <span className="text-ivory font-semibold bg-[#1a202c] px-2 py-0.5 rounded">Parcours</span>
                <span className="text-gold">&rarr;</span>
                <span className="text-ivory font-semibold bg-[#1a202c] px-2 py-0.5 rounded">Cours</span>
                <span className="text-gold">&rarr;</span>
                <span className="text-ivory font-semibold bg-[#1a202c] px-2 py-0.5 rounded">Modules</span>
                <span className="text-gold">&rarr;</span>
                <span className="text-emerald-400 font-semibold bg-[#1a202c] px-2 py-0.5 rounded">Le&ccedil;ons</span>
              </div>
            </div>

            {/* Statistics Row (Harmonisé Données Réelles) */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#1c222b]">
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-gold font-mono">8 Acad&eacute;mies</div>
                <div className="text-xs text-ivory-dim mt-1">Python, Linux, R&eacute;seaux, SOC, DFIR...</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-ivory font-mono">12 Volumes</div>
                <div className="text-xs text-ivory-dim mt-1">CyberPath : 70% Pratique / 30% Th&eacute;orie</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-emerald-400 font-mono">7 Projets</div>
                <div className="text-xs text-ivory-dim mt-1">Capstones document&eacute;s sur GitHub</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-gold font-mono">100% Sandbox&eacute;</div>
                <div className="text-xs text-ivory-dim mt-1">WASM &amp; Terminal &eacute;mul&eacute; in-browser</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LE MANIFESTE DU LAB */}
      <section className="py-24 bg-[#0d0f13] border-b border-[#1c222b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-gold">
              Le Manifeste RayLab
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ivory leading-tight">
              &laquo; L&apos;ambition n&apos;est pas de produire des personnes qui suivent des tutoriels. L&apos;ambition est de former des personnes capables de concevoir, r&eacute;soudre et d&eacute;montrer ce qu&apos;elles savent faire. &raquo;
            </h2>
            <div className="h-0.5 w-16 bg-gold mx-auto" />
            <p className="text-sm text-ivory-muted leading-relaxed text-justify sm:text-center">
              Dans un secteur inond&eacute; de promesses superficielles, <strong>RayLab</strong> a &eacute;t&eacute; con&ccedil;u comme un espace d&apos;ing&eacute;nierie et d&apos;exp&eacute;rimentation rigoureux. Ici, les concepts fondamentaux (m&eacute;moire, protocoles, permissions) pr&eacute;c&egrave;dent la manipulation des outils avanc&eacute;s, et chaque notion apprise d&eacute;bouche sur une r&eacute;alisation concr&egrave;te et v&eacute;rifiable.
            </p>
          </div>
        </div>
      </section>

      {/* 3. LES 4 PILIERS DE LA SIGNATURE */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gold">
            Notre M&eacute;thodologie
          </h2>
          <p className="text-3xl font-extrabold text-ivory">
            Quatre &Eacute;tapes vers l&apos;Excellence Technique
          </p>
          <p className="text-xs sm:text-sm text-ivory-dim">
            Chaque module suit un cycle rigoureux garantissant une assimilation p&eacute;renne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* LEARN */}
          <div className="bg-[#141820] p-7 rounded-2xl border border-[#222935] hover:border-gold/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-mono font-bold text-sm group-hover:scale-110 transition-transform">
              01
            </div>
            <h3 className="text-lg font-bold text-ivory">LEARN</h3>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Comprenez les mécanismes réels sous le capot. Pas de boîte noire : de la gestion mémoire en Python aux en-têtes TCP/IP et permissions Unix.
            </p>
          </div>

          {/* BUILD */}
          <div className="bg-[#141820] p-7 rounded-2xl border border-[#222935] hover:border-emerald-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm group-hover:scale-110 transition-transform">
              02
            </div>
            <h3 className="text-lg font-bold text-ivory">BUILD</h3>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Développez des outils concrets : Password Entropy Analyzer, dissecteur de trames Scapy, analyseur de logs et surveillance d&apos;intégrité FIM.
            </p>
          </div>

          {/* SECURE */}
          <div className="bg-[#141820] p-7 rounded-2xl border border-[#222935] hover:border-blue-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-sm group-hover:scale-110 transition-transform">
              03
            </div>
            <h3 className="text-lg font-bold text-ivory">SECURE</h3>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Intégrez la sécurité dès la conception. Maîtrisez la triade CIA, les règles de détection d&apos;intrusion (Suricata), le durcissement et l&apos;éthique de l&apos;audit.
            </p>
          </div>

          {/* BECOME */}
          <div className="bg-[#141820] p-7 rounded-2xl border border-[#222935] hover:border-purple-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-sm group-hover:scale-110 transition-transform">
              04
            </div>
            <h3 className="text-lg font-bold text-ivory">BECOME</h3>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Valorisez vos réalisations : CV technique trilingue compatible ATS, dépôts GitHub professionnels vérifiés et préparation aux entretiens.
            </p>
          </div>
        </div>
      </section>

      {/* 4. LE GRAND PARCOURS MAÎTRE TRANSVERSAL : CYBERPATH */}
      {masterPath && (
        <section className="py-16 bg-[#0c0e12] border-y border-[#1c222b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 lg:p-10 rounded-3xl bg-gradient-to-r from-gold/10 via-[#131720] to-[#0e1117] border-2 border-gold/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-mono border border-gold/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Grand Parcours Ma&icirc;tre &bull; 12 Volumes CyberPath</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ivory">
                  {masterPath.title}
                </h3>
                <p className="text-sm text-ivory-muted leading-relaxed">
                  Le cursus de r&eacute;f&eacute;rence int&eacute;grant l&apos;ensemble de la progression RayLab : des fondamentaux de l&apos;architecture machine &agrave; l&apos;investigation num&eacute;rique et au triage d&apos;incidents en SOC.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-ivory-dim">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-gold" />
                    <span>12 Volumes Structur&eacute;s</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>7 Projets Capstone</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Attestation Finale RayLab</span>
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/paths/${masterPath.slug}`}
                  className="px-6 py-4 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider shadow-gold flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Explorer le Parcours Ma&icirc;tre</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. LES 8 ACADÉMIES SPÉCIALISÉES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono border border-gold/30 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Niveau 1 de la Hi&eacute;rarchie P&eacute;dagogique</span>
            </div>
            <h2 className="text-3xl font-extrabold text-ivory">
              Les 8 Acad&eacute;mies Sp&eacute;cialis&eacute;es
            </h2>
            <p className="text-sm text-ivory-dim mt-1">
              Chaque acad&eacute;mie regroupe des parcours, cours et modules d&eacute;di&eacute;s &agrave; un domaine technique pr&eacute;cis.
            </p>
          </div>
          <Link
            href="/paths"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gold hover:text-gold-light"
          >
            <span>Consulter le catalogue complet avec filtres</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specializedAcademies.map((p) => (
            <div
              key={p.id}
              className="bg-[#141820] rounded-2xl border border-[#222935] p-6 hover:border-gold/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-gold/15 text-gold border border-gold/30">
                    {p.difficulty.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-mono text-ivory-dim">
                    {p.course_count || 1} cours
                  </span>
                </div>
                <h3 className="text-base font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-ivory-muted line-clamp-3 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-5 border-t border-[#1f2530] mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-ivory-dim">
                  ~{Math.round((p.estimated_minutes || 600) / 60)}h estim&eacute;es
                </span>
                <Link
                  href={`/paths/${p.slug}`}
                  className="text-xs font-semibold text-gold group-hover:text-gold-light inline-flex items-center space-x-1"
                >
                  <span>D&eacute;couvrir</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PÔLE TRANSVERSAL : CARRIÈRE & CERTIFICATIONS (CATÉGORIE DISTINCTE) */}
      {careerPath && (
        <section className="py-16 bg-[#0f131a] border-y border-[#1c222b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#141923] rounded-3xl border border-[#242d3b] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-teal-400">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>P&ocirc;le Carri&egrave;re &amp; Insertion Professionnelle</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ivory">
                  Career Launchpad, CV Studio &amp; Certifications
                </h3>
                <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed">
                  Ce p&ocirc;le transversal n&apos;est pas un simple cours th&eacute;orique : il convertit vos comp&eacute;tences de laboratoire en opportunit&eacute;s concr&egrave;tes via le CV Builder ATS trilingue, les pr&eacute;parations certifiantes (CompTIA, Cisco, OffSec) et le portfolio public.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/career/cv-builder"
                  className="px-5 py-3 rounded-xl bg-[#1c222b] hover:bg-[#252e3b] text-ivory font-bold text-xs uppercase tracking-wider border border-[#2d3746] text-center"
                >
                  CV Studio ATS
                </Link>
                <Link
                  href="/certifications"
                  className="px-5 py-3 rounded-xl bg-[#1c222b] hover:bg-[#252e3b] text-ivory font-bold text-xs uppercase tracking-wider border border-[#2d3746] text-center"
                >
                  Certifications Mondiales
                </Link>
                <Link
                  href="/career"
                  className="px-5 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider shadow-gold text-center"
                >
                  Centre de Carri&egrave;re
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. LABORATOIRE VIRTUEL INTERACTIF */}
      <section className="py-24 bg-[#0a0c0f] border-b border-[#1c222b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono border border-gold/30 mb-3">
                <Terminal className="w-3.5 h-3.5" />
                <span>Environnement Sandbox&eacute; 100% In-Browser</span>
              </div>
              <h2 className="text-3xl font-extrabold text-ivory">
                Laboratoire Virtuel &amp; Cyber Range
              </h2>
              <p className="text-sm text-ivory-dim mt-1">
                Ex&eacute;cution Python r&eacute;elle via WebAssembly (Pyodide CPython 3.12) et terminal virtuel avec syst&egrave;me de fichiers isol&eacute;.
              </p>
            </div>
            <Link
              href="/lab"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 text-xs font-mono font-bold transition-all"
            >
              <span>Acc&eacute;der au Cyber Range Complet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive Lab Widget */}
          <div className="rounded-3xl border border-[#222935] overflow-hidden shadow-2xl bg-[#101216]">
            <InteractiveTerminalLab />
          </div>
        </div>
      </section>

      {/* 8. LES 7 PROJETS CONCRETS CAPSTONES */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-gold mb-2">
              Le Volet Build
            </h2>
            <p className="text-3xl font-extrabold text-ivory">
              7 Projets Capstone &amp; R&eacute;alisations
            </p>
            <p className="text-sm text-ivory-dim mt-1">
              Des projets structur&eacute;s avec code source, architecture d&eacute;taill&eacute;e et livrables document&eacute;s sur GitHub.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gold hover:text-gold-light"
          >
            <span>Voir les 7 projets</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((proj) => (
            <div
              key={proj.id}
              className="bg-[#141820] rounded-2xl border border-[#222935] p-6 hover:border-gold/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {proj.difficulty}
                  </span>
                  <span className="text-[11px] font-mono text-ivory-dim">
                    ~{Math.round((proj.estimated_minutes || 600) / 60)}h estim&eacute;es
                  </span>
                </div>
                <h3 className="text-base font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs text-ivory-muted line-clamp-3 leading-relaxed">
                  {proj.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1f2530] mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-ivory-dim">
                  Livrable : D&eacute;p&ocirc;t GitHub
                </span>
                <Link
                  href={`/projects/${proj.slug}`}
                  className="text-xs font-semibold text-gold group-hover:text-gold-light inline-flex items-center space-x-1"
                >
                  <span>D&eacute;tails</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
