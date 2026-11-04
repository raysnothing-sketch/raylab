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
} from "lucide-react";
import { getLearningPaths, getProjects, getCertifications } from "@/lib/data";
import InteractiveTerminalLab from "@/components/InteractiveTerminalLab";

export default async function HomePage() {
  const paths = await getLearningPaths();
  const projects = await getProjects();
  const certs = await getCertifications();

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
              <span>RayLab • Institut Technique &amp; Plateforme d&apos;Apprentissage</span>
            </div>

            {/* Main title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-ivory tracking-tight leading-[1.12]">
              Apprenez l&apos;Informatique, les Systèmes et la{" "}
              <span className="bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
                Cybersécurité par la Pratique
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-ivory-muted max-w-2xl mx-auto leading-relaxed">
              De l&apos;initiation en Python à la détection d&apos;incidents en SOC : des parcours progressifs, des projets réels publiables et un accompagnement vers l&apos;emploi.
            </p>

            {/* Signature */}
            <div className="text-xs sm:text-sm font-mono tracking-widest text-gold uppercase pt-1">
              Learn. Build. Secure. Become.
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/paths"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs tracking-wider uppercase shadow-gold transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>Explorer les Cursus</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/lab"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#161a22] hover:bg-[#1f2530] border border-gold/40 text-gold font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all group shadow-sm"
              >
                <Terminal className="w-4 h-4 text-gold animate-pulse" />
                <span>Labo Virtuel &amp; Terminal &gt;_</span>
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#1b212b] hover:bg-[#232b38] border border-[#2d3644] text-ivory font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all"
              >
                <Shield className="w-4 h-4 text-gold" />
                <span>La Vision du Lab</span>
              </Link>
            </div>

            {/* Statistics Row */}
            <div className="pt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#1c222b]">
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-gold font-mono">4 Cursus</div>
                <div className="text-xs text-ivory-dim mt-1">Python, Cyber, Systèmes, Carrière</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-ivory font-mono">Niv. 1 à 7</div>
                <div className="text-xs text-ivory-dim mt-1">Du débutant au Dev professionnel</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-emerald-400 font-mono">100% Concret</div>
                <div className="text-xs text-ivory-dim mt-1">Projets documentés sur GitHub</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-gold font-mono">Norme ATS</div>
                <div className="text-xs text-ivory-dim mt-1">CV prêt pour France &amp; Allemagne</div>
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
              « L&apos;ambition n&apos;est pas de produire des personnes qui suivent des tutoriels. L&apos;ambition est de former des personnes capables de concevoir, résoudre et démontrer ce qu&apos;elles savent faire. »
            </h2>
            <div className="h-0.5 w-16 bg-gold mx-auto" />
            <p className="text-sm text-ivory-muted leading-relaxed text-justify sm:text-center">
              Dans un secteur inondé de promesses superficielles, <strong>RayLab</strong> a été pensé comme un espace d&apos;ingénierie et d&apos;expérimentation rigoureux. Ici, les concepts fondamentaux (mémoire, protocoles, permissions) précèdent la manipulation des outils avancés, et chaque notion apprise débouche sur une réalisation concrète et vérifiable.
            </p>
          </div>
        </div>
      </section>

      {/* 3. LES 4 PILIERS DE LA SIGNATURE */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gold">
            Notre Méthodologie
          </h2>
          <p className="text-3xl font-extrabold text-ivory">
            Quatre Étapes vers l&apos;Excellence Technique
          </p>
          <p className="text-xs sm:text-sm text-ivory-dim">
            Chaque module suit un cycle rigoureux garantissant une assimilation pérenne.
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
              Découvrez les mécanismes réels sous le capot. Pas de magie : de la gestion mémoire en Python aux entêtes TCP/IP et permissions Unix.
            </p>
          </div>

          {/* BUILD */}
          <div className="bg-[#141820] p-7 rounded-2xl border border-[#222935] hover:border-emerald-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm group-hover:scale-110 transition-transform">
              02
            </div>
            <h3 className="text-lg font-bold text-ivory">BUILD</h3>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Développez des outils concrets : Password Entropy Analyzer, analyseur de logs de serveurs web, surveillance de fichiers FIM.
            </p>
          </div>

          {/* SECURE */}
          <div className="bg-[#141820] p-7 rounded-2xl border border-[#222935] hover:border-blue-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-sm group-hover:scale-110 transition-transform">
              03
            </div>
            <h3 className="text-lg font-bold text-ivory">SECURE</h3>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Intégrez la sécurité dès la conception. Maîtrisez la triade CIA, les règles de détection d&apos;intrusion et l&apos;éthique de l&apos;audit.
            </p>
          </div>

          {/* BECOME */}
          <div className="bg-[#141820] p-7 rounded-2xl border border-[#222935] hover:border-purple-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold text-sm group-hover:scale-110 transition-transform">
              04
            </div>
            <h3 className="text-lg font-bold text-ivory">BECOME</h3>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Valorisez vos réalisations : CV technique compatible ATS pour l&apos;Europe et l&apos;Allemagne, dépôts GitHub professionnels et entretiens.
            </p>
          </div>
        </div>
      </section>

      {/* 4. LES GRANDES ACADÉMIES */}
      <section className="py-20 bg-[#0c0e12] border-y border-[#1c222b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-gold mb-2">
                Le Catalogue Pédagogique
              </h2>
              <p className="text-3xl font-extrabold text-ivory">
                Les Académies Spécialisées
              </p>
            </div>
            <Link
              href="/paths"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gold hover:text-gold-light"
            >
              <span>Consulter l&apos;intégralité des cursus</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paths.map((p) => (
              <div
                key={p.id}
                className="bg-[#141820] rounded-2xl border border-[#222935] p-7 hover:border-gold/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-gold/15 text-gold border border-gold/30">
                      {p.difficulty.toUpperCase()}
                    </span>
                    <span className="text-xs text-ivory-dim font-mono">
                      ~{Math.round(p.estimated_minutes / 60)}h au programme
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-ivory hover:text-gold transition-colors">
                      <Link href={`/paths/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <p className="text-xs text-ivory-muted mt-2.5 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1d232e] flex items-center justify-between">
                  <span className="text-xs text-ivory-dim font-mono">
                    {p.course_count} cours approfondis
                  </span>
                  <Link
                    href={`/paths/${p.slug}`}
                    className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-[#101216] text-xs font-bold transition-all flex items-center space-x-1.5 shadow-gold"
                  >
                    <span>Découvrir le Cursus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LES PROJETS PHARE DU LAB */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gold">
            Laboratoire de Projets
          </h2>
          <p className="text-3xl font-extrabold text-ivory">
            Construisez des Outils, Pas Juste du Code
          </p>
          <p className="text-xs sm:text-sm text-ivory-dim">
            Chaque réalisation suit un cahier des charges rigoureux prêt à être présenté en entretien d&apos;embauche.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#141820] rounded-2xl border border-[#222935] p-6 flex flex-col justify-between hover:border-gold/40 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#1b212c] text-gold font-mono border border-gold/30">
                    {proj.domain}
                  </span>
                  <span className="text-ivory-dim font-mono">{proj.estimated_minutes} min</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-ivory group-hover:text-gold transition-colors">
                    <Link href={`/projects/${proj.slug}`}>{proj.title}</Link>
                  </h3>
                  <p className="text-xs text-ivory-muted mt-2 leading-relaxed line-clamp-3">
                    {proj.summary}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-ivory-dim">
                  Niveau d&apos;exigence : <span className="text-ivory capitalize font-semibold">{proj.difficulty}</span>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#1d232e] flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-mono flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Spécifications Claires</span>
                </span>
                <Link
                  href={`/projects/${proj.slug}`}
                  className="text-xs font-semibold text-gold hover:text-gold-light inline-flex items-center space-x-1"
                >
                  <span>Fiche Projet</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LABORATOIRE VIRTUEL & TERMINAL INTERACTIF (Méthode CyberPath 70/30) */}
      <section className="py-24 bg-[#0d1015] border-t border-[#1c222b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-mono border border-gold/30">
                <Terminal className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span>Labo Virtuel • 70% Pratique / 30% Théorie</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ivory leading-tight">
                L&apos;Ingénierie Pratique les Mains sur le Terminal
              </h2>
              <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed">
                Conformément aux principes de CyberPath 2026-2027, la maîtrise technique s&apos;acquiert par l&apos;expérimentation concrète. Testez vos scripts Python, simulez des poignées de main TCP SYN/ACK, décortiquez des trames réseau et analysez des journaux de cyberattaques en temps réel directement dans votre navigateur.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-[#13171f] rounded-xl border border-[#202734] space-y-1">
                  <div className="text-gold font-bold">🐍 Python Sandbox</div>
                  <div className="text-[11px] text-ivory-dim">Sockets, Algorithmes &amp; PEP 8</div>
                </div>
                <div className="p-3 bg-[#13171f] rounded-xl border border-[#202734] space-y-1">
                  <div className="text-blue-400 font-bold">🌐 Scan TCP &amp; Handshake</div>
                  <div className="text-[11px] text-ivory-dim">Sondes SYN, Bannières &amp; Ports</div>
                </div>
                <div className="p-3 bg-[#13171f] rounded-xl border border-[#202734] space-y-1">
                  <div className="text-emerald-400 font-bold">🛡️ Scapy &amp; ARP Spoofing</div>
                  <div className="text-[11px] text-ivory-dim">Dissection de Trames &amp; MITM</div>
                </div>
                <div className="p-3 bg-[#13171f] rounded-xl border border-[#202734] space-y-1">
                  <div className="text-purple-400 font-bold">📜 SIEM &amp; Détection Regex</div>
                  <div className="text-[11px] text-ivory-dim">SQLi, Traversal &amp; MITRE ATT&amp;CK</div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/lab"
                  className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider shadow-gold inline-flex items-center justify-center space-x-2"
                >
                  <span>Ouvrir le Laboratoire Virtuel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Interactive Live Terminal Widget */}
            <div className="lg:col-span-7">
              <InteractiveTerminalLab />
            </div>
          </div>
        </div>
      </section>

      {/* 7. LE CENTRE DE CARRIÈRE & CV ATS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141923] rounded-3xl border border-[#273242] p-8 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-gold">
              Centre de Carrière RayLab
            </span>
            <h2 className="text-3xl font-extrabold text-ivory">
              Valorisez vos Compétences sur le Marché Européen
            </h2>
            <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed">
              Nous vous apprenons à rédiger un CV technique compatible avec les filtres automatisés ATS (Applicant Tracking Systems), à appliquer la formule d&apos;impact Google XYZ et à vous positionner efficacement en France ou en Allemagne (*Lebenslauf*).
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/career/cv-builder"
                className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs shadow-gold transition-all"
              >
                Générateur de CV ATS Gratuit
              </Link>
              <Link
                href="/certifications"
                className="px-6 py-3 rounded-xl bg-[#202836] hover:bg-[#283244] text-ivory font-semibold text-xs border border-[#303d52] transition-all"
              >
                Catalogue Certifications Officielles
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-80 bg-[#101318] rounded-2xl border border-[#222935] p-6 space-y-3 font-mono text-xs">
            <div className="text-ivory font-bold border-b border-[#202732] pb-2 flex items-center justify-between">
              <span>Standard Recrutement IT</span>
              <span className="text-emerald-400">Vérifié 2026</span>
            </div>
            <div className="text-[11px] text-ivory-dim space-y-2">
              <p>✔ Titres normalisés sans graphismes destructeurs</p>
              <p>✔ Projets avec métriques chiffrées (%)</p>
              <p>✔ Format PDF lisible par machine</p>
              <p>✔ Alignement marché international</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOIRE AUX QUESTIONS (FAQ) */}
      <section className="py-20 bg-[#0c0e12] border-t border-[#1c222b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-gold">
              Questions Fréquentes
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-ivory">
              Tout ce que vous devez savoir sur RayLab
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-6 bg-[#141820] rounded-2xl border border-[#222935] space-y-2">
              <h3 className="font-bold text-ivory text-base">
                À qui s&apos;adresse la plateforme ?
              </h3>
              <p className="text-ivory-muted leading-relaxed">
                RayLab a été conçu pour les débutants motivés, les étudiants en informatique, les autodidactes et les personnes en reconversion professionnelle souhaitant acquérir des compétences pratiques et prouvées en Python, systèmes Linux et cybersécurité opérationnelle.
              </p>
            </div>

            <div className="p-6 bg-[#141820] rounded-2xl border border-[#222935] space-y-2">
              <h3 className="font-bold text-ivory text-base">
                Les cours et projets sont-ils gratuits ?
              </h3>
              <p className="text-ivory-muted leading-relaxed">
                Oui. La plateforme est entièrement gratuite dans sa phase actuelle afin de démocratiser l&apos;accès aux fondamentaux techniques de qualité et de constituer une communauté rigoureuse.
              </p>
            </div>

            <div className="p-6 bg-[#141820] rounded-2xl border border-[#222935] space-y-2">
              <h3 className="font-bold text-ivory text-base">
                Quelle est la différence entre une attestation interne et une certification officielle ?
              </h3>
              <p className="text-ivory-muted leading-relaxed">
                RayLab est transparent : nous ne délivrons pas de fausses promesses de certification. Nos cours préparent aux véritables examens d&apos;État et d&apos;éditeurs mondiaux surveillés (CompTIA Security+, Cisco CCNA, LPIC-1) et vous permettent de constituer un portfolio prouvé.
              </p>
            </div>

            <div className="p-6 bg-[#141820] rounded-2xl border border-[#222935] space-y-2">
              <h3 className="font-bold text-ivory text-base">
                Comment fonctionne le Laboratoire Virtuel RayLab ?
              </h3>
              <p className="text-ivory-muted leading-relaxed">
                Le Laboratoire Virtuel RayLab intègre un bac à sable d&apos;exécution Python dans votre navigateur, des simulateurs de sockets TCP, des dissecteurs de trames ARP Scapy et des analyseurs de journaux SOC conformes aux RFC et à la méthode 70/30 de CyberPath.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
