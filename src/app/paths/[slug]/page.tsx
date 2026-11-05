import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLearningPathBySlug, getLearningPaths } from "@/lib/data";

export async function generateStaticParams() {
  const paths = await getLearningPaths();
  return paths.map((p) => ({ slug: p.slug }));
}
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ChevronRight,
  Layers,
  ArrowRight,
  Shield,
  FileCode,
  Sparkles,
  Terminal,
  Award,
} from "lucide-react";

const capstoneMilestones: Record<number, { title: string; slug: string; desc: string }> = {
  2: {
    title: "PROJET 01 : Script d'Administration & d'Audit Système Linux",
    slug: "projet-01-script-administration-linux",
    desc: "Validez les Volumes 1 & 2 : scripting Bash pur, inspection des permissions SUID, détection UID 0 et conformité CIS Benchmarks (Évalué sur 100 points).",
  },
  4: {
    title: "PROJET 02 : Python Security Toolkit & Analyseur Réseau",
    slug: "projet-02-python-security-toolkit",
    desc: "Validez les Volumes 3 & 4 : typage moderne PEP 484, programmation de sockets, analyse des trames TCP/IP et manipulation Scapy.",
  },
  6: {
    title: "PROJET 03 : Architecture d'Authentification Sécurisée & Anti-Bruteforce",
    slug: "projet-03-authentification-securisee",
    desc: "Validez les Volumes 5 & 6 : modélisation de bases SQL préparées, hachage PBKDF2/Argon2, jetons JWT et défense contre les injections.",
  },
  8: {
    title: "PROJET 04 : Audit de Sécurité Cloud, Cryptographie & RLS",
    slug: "projet-04-audit-cloud-crypto",
    desc: "Validez les Volumes 7 & 8 : chiffrement authentifié AES-256-GCM, règles Row Level Security (RLS) et reconnaissance Nmap.",
  },
  10: {
    title: "PROJET 05 : Durcissement Applicatif OWASP & Pipeline DevSecOps",
    slug: "projet-05-durcissement-application-owasp",
    desc: "Validez les Volumes 9 & 10 : analyse statique SAST (Semgrep), analyse de dépendances SCA, remédiation de failles OWASP et CI/CD.",
  },
  11: {
    title: "PROJET 06 : Investigation d'Incident en SOC & Détection Sigma",
    slug: "projet-06-investigation-incident-soc",
    desc: "Validez le Volume 11 : centralisation de journaux Linux/Windows, règles universelles Sigma, analyse MITRE ATT&CK et cycle PICERL.",
  },
  12: {
    title: "PROJET 07 : Pentest Complet & Rapport Professionnel Exécutif",
    slug: "projet-07-pentest-complet-rapport-professionnel",
    desc: "Le Capstone Final Intégrateur : audit d'intrusion de synthèse, chaîne de traçabilité forensique, cotation CVSS 3.1 et rapport exécutif.",
  },
};

export default async function PathDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = await getLearningPathBySlug(slug);

  if (!path) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-ivory-dim mb-6 font-mono">
        <Link href="/paths" className="hover:text-gold transition-colors">
          Parcours
        </Link>
        <span>/</span>
        <span className="text-gold">{path.title}</span>
      </div>

      {/* Path Header Card */}
      <div className="bg-[#141820] rounded-3xl border border-[#222935] p-8 lg:p-10 mb-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-gold/15 text-gold border border-gold/40">
            {path.difficulty.toUpperCase()}
          </span>
          <div className="flex items-center space-x-4 text-xs font-mono text-ivory-dim">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>{Math.round(path.estimated_minutes / 60)} heures de formation certifiée</span>
            </span>
            <span>•</span>
            <span>{path.courses?.length || 0} volumes / cours</span>
          </div>
        </div>

        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-ivory tracking-tight">
            {path.title}
          </h1>
          <p className="text-sm text-ivory-muted leading-relaxed">
            {path.description}
          </p>
        </div>

        {/* Pedagogical Breakdown Ratios */}
        <div className="p-4 bg-[#0e1117] rounded-2xl border border-gold/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-ivory font-semibold">Méthode RayLab :</span>
            <span className="text-gold font-bold">70% Pratique</span>
            <span className="text-ivory-dim">/</span>
            <span className="text-ivory font-bold">30% Théorie</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-ivory-dim">
            <span>• Théorie &amp; RFCs : <strong className="text-ivory">{Math.round((path.estimated_minutes * 0.3) / 60)}h</strong></span>
            <span>• Labs &amp; Sandbox : <strong className="text-emerald-400">{Math.round((path.estimated_minutes * 0.5) / 60)}h</strong></span>
            <span>• Projets Autonomes : <strong className="text-cyan-400">{Math.round((path.estimated_minutes * 0.2) / 60)}h</strong></span>
          </div>
        </div>
      </div>

      {/* Virtual Lab Callout Banner */}
      <div className="mb-12 p-6 rounded-2xl bg-[#11151c] border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
            <Terminal className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-ivory">
              Atelier Pratique &amp; Terminal Interactif
            </h3>
            <p className="text-xs text-ivory-muted mt-0.5">
              Mettez en application directe les compétences de « {path.title} » dans notre bac à sable interactif et terminal pratique.
            </p>
          </div>
        </div>
        <Link
          href="/lab"
          className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all shadow-gold flex items-center space-x-1.5"
        >
          <span>Ouvrir le Labo Virtuel</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Curriculum Outline */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-ivory mb-1">
            Programme Pédagogique du Cursus
          </h2>
          <p className="text-xs text-ivory-dim">
            Suivez les cours dans l&apos;ordre recommandé pour valider l&apos;ensemble des compétences.
          </p>
        </div>

        <div className="space-y-6">
          {path.courses?.map((course: any, cIndex: number) => {
            const courseNumber = cIndex + 1;
            const milestone = path.slug.includes("cyberpath") ? capstoneMilestones[courseNumber] : null;

            return (
              <React.Fragment key={course.id}>
                <div className="bg-[#141820] rounded-2xl border border-[#222935] overflow-hidden">
                  {/* Course Header */}
                  <div className="p-6 bg-[#181d25] border-b border-[#222935] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs font-mono text-gold">
                        <span>VOLUME #{courseNumber}</span>
                        <span>•</span>
                        <span className="text-ivory-dim">{course.domain}</span>
                      </div>
                      <h3 className="text-lg font-bold text-ivory">{course.title}</h3>
                      <p className="text-xs text-ivory-muted max-w-2xl">{course.summary}</p>
                    </div>
                    <div className="text-xs font-mono text-ivory-dim whitespace-nowrap">
                      {Math.round(course.estimated_minutes / 60)}h d&apos;&eacute;tude
                    </div>
                  </div>

                  {/* Modules & Lessons */}
                  <div className="p-6 space-y-6">
                    {course.modules?.map((mod: any) => (
                      <div key={mod.id} className="space-y-3">
                        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-ivory-dim flex items-center space-x-2">
                          <Layers className="w-3.5 h-3.5 text-gold" />
                          <span>{mod.title}</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-5 border-l border-[#242c38]">
                          {mod.lessons?.map((les: any) => (
                            <Link
                              key={les.id}
                              href={`/lessons/${les.id}`}
                              className="p-3.5 rounded-xl bg-[#11141a] hover:bg-[#181d26] border border-[#1f2632] hover:border-gold/40 transition-all flex items-center justify-between group"
                            >
                              <div className="space-y-1">
                                <div className="text-xs font-semibold text-ivory group-hover:text-gold transition-colors flex items-center space-x-2">
                                  <span>{les.title}</span>
                                </div>
                                <div className="text-[11px] text-ivory-dim font-mono">
                                  {les.lesson_type.toUpperCase()} • {les.estimated_minutes} min
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-ivory-dim group-hover:text-gold group-hover:translate-x-1 transition-all" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Capstone Project Callout */}
                {milestone && (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-[#181d26] via-[#1b2330] to-[#12161f] border-2 border-emerald-500/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold">
                        <Award className="w-4 h-4" />
                        <span>JALON PROJET CAPSTONE OBLIGATOIRE (BAR&Egrave;ME 100 PTS)</span>
                      </div>
                      <h4 className="text-base font-bold text-ivory">{milestone.title}</h4>
                      <p className="text-xs text-ivory-muted leading-relaxed">{milestone.desc}</p>
                    </div>
                    <Link
                      href={`/projects/${milestone.slug}`}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0d1117] font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all shadow-md flex items-center space-x-2 flex-shrink-0"
                    >
                      <span>Consulter le Projet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
