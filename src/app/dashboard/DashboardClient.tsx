"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Shield,
  Code2,
  ExternalLink,
  Target,
  Trophy,
  Flame,
  FileText,
  Bookmark,
  Share2,
  Sparkles,
  Play,
  RotateCcw,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function DashboardClient({ dashboardData }: { dashboardData: any }) {
  const { user: contextUser, userXp } = useApp();
  const { user, enrollments, progressList, goals, achievements, submissions, notes = [] } = dashboardData;

  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "goals" | "projects" | "notes">("overview");

  // Determine the next lesson to resume
  const completedLessonIds = new Set(
    progressList.filter((p: any) => p.status === "completed").map((p: any) => p.lesson_id)
  );

  const activeLesson = progressList.find((p: any) => p.status !== "completed") || progressList[0] || {
    lesson_id: "les_cp_vol1_ch1",
    lesson_title: "Chapitre 1 : Triade CIA & Modélisation des Menaces",
    lesson_slug: "triade-cia-modelisation-menaces",
    progress_percent: 0,
    estimated_minutes: 45,
  };

  const totalCompletedLessons = progressList.filter((p: any) => p.status === "completed").length;
  const totalSubmissions = submissions.length;
  const totalAchievements = achievements.length;
  const totalEstimatedHours = Math.round(
    progressList.reduce((acc: number, cur: any) => acc + (cur.estimated_minutes || 30), 0) / 60
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. TOP WELCOME & STATS BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#141923] via-[#11141c] to-[#141923] border border-[#232c3b] p-8 lg:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* User profile details */}
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-2xl bg-gold/15 border-2 border-gold/40 flex items-center justify-center text-gold font-bold text-xl shadow-gold font-mono">
              {user.display_name?.charAt(0) || "R"}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-black text-ivory tracking-tight">
                  {user.display_name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-[10px] font-mono uppercase font-bold">
                  Apprenant Vérifié
                </span>
              </div>
              <p className="text-xs text-ivory-muted font-mono">
                {user.email} • Membre depuis {new Date(user.created_at || "2026-09-01").toLocaleDateString("fr-FR")}
              </p>
              <div className="flex items-center space-x-3 text-xs pt-1 font-mono">
                <span className="text-gold font-bold flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Niveau 3 • {userXp || 450} XP</span>
                </span>
                <span className="text-ivory-dim">•</span>
                <span className="text-emerald-400 flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Turso Cloud Sync: OK</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/portfolio"
              className="px-4 py-2.5 rounded-xl bg-[#181e28] hover:bg-[#202735] text-ivory border border-[#2b3544] text-xs font-mono flex items-center space-x-2 transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-gold" />
              <span>Voir mon Portfolio Public</span>
            </Link>
            <Link
              href="/career/cv-builder"
              className="px-4 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs tracking-wide uppercase transition-all shadow-gold flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Éditer mon CV ATS</span>
            </Link>
          </div>
        </div>

        {/* Real Statistics Bar */}
        <div className="mt-8 pt-6 border-t border-[#1d2532] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-gold font-mono">{totalCompletedLessons}</div>
            <div className="text-[11px] text-ivory-dim font-mono mt-0.5">Leçons Validées</div>
          </div>
          <div className="p-4 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-ivory font-mono">~{totalEstimatedHours}h</div>
            <div className="text-[11px] text-ivory-dim font-mono mt-0.5">Temps de Laboratoire</div>
          </div>
          <div className="p-4 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-emerald-400 font-mono">{totalSubmissions} / 7</div>
            <div className="text-[11px] text-ivory-dim font-mono mt-0.5">Projets Capstone</div>
          </div>
          <div className="p-4 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-purple-400 font-mono">{totalAchievements}</div>
            <div className="text-[11px] text-ivory-dim font-mono mt-0.5">Badges &amp; Succès</div>
          </div>
        </div>
      </div>

      {/* 2. REPRISE AUTOMATIQUE DE LA DERNIÈRE LEÇON (CONTINUITÉ PÉDAGOGIQUE) */}
      {activeLesson && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-gold/15 via-[#161a22] to-[#12151b] border-2 border-gold/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-gold uppercase tracking-wider">
              <Play className="w-3.5 h-3.5 text-gold fill-gold animate-pulse" />
              <span>Reprendre où vous en étiez (Dernière Session Active)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ivory">
              {activeLesson.lesson_title}
            </h2>
            <div className="flex items-center space-x-4 text-xs font-mono text-ivory-dim">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>~{activeLesson.estimated_minutes || 45} minutes</span>
              </span>
              <span>•</span>
              <span className="text-emerald-400">Progression : {activeLesson.progress_percent || 0}%</span>
            </div>
          </div>

          <Link
            href={`/lessons/${activeLesson.lesson_id}`}
            className="px-6 py-3.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs tracking-wider uppercase transition-all shadow-gold flex items-center space-x-2 whitespace-nowrap"
          >
            <span>Continuer la Leçon</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* 3. NAVIGATION ONGLETS ESPACE PERSONNEL */}
      <div className="flex flex-wrap gap-2 border-b border-[#202734] pb-3">
        {[
          { id: "overview", label: "Vue d'Ensemble", icon: Target },
          { id: "courses", label: "Mes Cursus & Volumes", icon: BookOpen },
          { id: "projects", label: "Portfolio Projets (7)", icon: Code2 },
          { id: "goals", label: "Objectifs & Certifs", icon: Calendar },
          { id: "notes", label: "Carnet de Notes", icon: Bookmark },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all ${
                isActive
                  ? "bg-gold text-[#101216] font-bold shadow-gold"
                  : "bg-[#141820] text-ivory-muted hover:text-ivory hover:bg-[#1a202c] border border-[#222a36]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. CONTENU DE L'ONGLET ACTIF */}

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column: Active enrolled paths */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-ivory flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-gold" />
                <span>Mes Parcours Actifs</span>
              </h3>
              <Link href="/paths" className="text-xs text-gold hover:underline font-mono">
                Explorer d&apos;autres académies →
              </Link>
            </div>

            <div className="space-y-4">
              {enrollments.map((enr: any) => (
                <div
                  key={enr.id}
                  className="bg-[#141820] p-6 rounded-2xl border border-[#222935] hover:border-gold/30 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-[10px] font-mono uppercase font-bold">
                      {enr.difficulty?.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-ivory-dim">
                      Inscrit le {new Date(enr.started_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-ivory hover:text-gold transition-colors">
                      <Link href={`/paths/${enr.path_slug}`}>{enr.path_title}</Link>
                    </h4>
                    <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                      Progression pédagogique vérifiée sur le cluster de données Turso libSQL.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1d232e]">
                    <div className="flex items-center space-x-2 text-xs font-mono text-ivory-dim">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>~{Math.round((enr.estimated_minutes || 2400) / 60)}h au total</span>
                    </div>
                    <Link
                      href={`/paths/${enr.path_slug}`}
                      className="px-4 py-2 rounded-xl bg-gold/10 hover:bg-gold hover:text-[#101216] text-gold border border-gold/30 text-xs font-bold font-mono transition-all flex items-center space-x-1.5"
                    >
                      <span>Consulter le Cursus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Column: Goals & Achievements */}
          <div className="lg:col-span-4 space-y-6">
            {/* Achievements Card */}
            <div className="bg-[#141820] p-6 rounded-2xl border border-[#222935] space-y-4">
              <h3 className="text-sm font-bold text-ivory uppercase tracking-wider font-mono flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-gold" />
                <span>Succès Débloqués</span>
              </h3>
              <div className="space-y-3">
                {achievements.map((ach: any) => (
                  <div
                    key={ach.id}
                    className="p-3 bg-[#0f1217] rounded-xl border border-[#1e2532] flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-ivory">{ach.title}</div>
                      <div className="text-[10px] text-ivory-dim">{ach.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Goals */}
            <div className="bg-[#141820] p-6 rounded-2xl border border-[#222935] space-y-4">
              <h3 className="text-sm font-bold text-ivory uppercase tracking-wider font-mono flex items-center space-x-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>Objectifs en Cours</span>
              </h3>
              <div className="space-y-2.5">
                {goals.map((g: any) => (
                  <div
                    key={g.id}
                    className="p-3 bg-[#0f1217] rounded-xl border border-[#1e2532] space-y-1 text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="font-semibold text-ivory">{g.title}</span>
                    </div>
                    <div className="text-[10px] font-mono text-ivory-dim pl-5">
                      Échéance : {g.target_date || "2026-12-31"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COURSES & MODULES */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-ivory">Historique &amp; Progression des Volumes</h3>
            <p className="text-xs text-ivory-muted">
              Suivi détaillé de vos modules et leçons terminées sur RayLab
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressList.map((prog: any) => (
              <div
                key={prog.lesson_id}
                className="p-5 bg-[#141820] rounded-2xl border border-[#222935] flex items-center justify-between"
              >
                <div className="space-y-1 max-w-sm">
                  <div className="flex items-center space-x-2">
                    {prog.status === "completed" ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    )}
                    <span className="text-xs font-mono text-ivory-dim">
                      {prog.status === "completed" ? "TERMINÉ" : "EN COURS"}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-ivory">{prog.lesson_title}</h4>
                  <div className="text-[11px] font-mono text-ivory-dim">
                    ~{prog.estimated_minutes || 30} min • {prog.progress_percent}%
                  </div>
                </div>

                <Link
                  href={`/lessons/${prog.lesson_id}`}
                  className="px-3.5 py-2 rounded-xl bg-[#1b212c] hover:bg-gold hover:text-[#101216] text-ivory text-xs font-mono font-semibold transition-all border border-[#2a3443]"
                >
                  Ouvrir →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROJECTS */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-ivory">Mon Portfolio de Projets Capstones</h3>
              <p className="text-xs text-ivory-muted">
                Projets d&apos;ingénierie réels documentés et publiables sur votre profil GitHub
              </p>
            </div>
            <Link
              href="/projects"
              className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-[#101216] text-xs font-bold font-mono shadow-gold"
            >
              Catalogue des 7 Projets →
            </Link>
          </div>

          <div className="space-y-4">
            {submissions.map((sub: any) => (
              <div
                key={sub.id}
                className="bg-[#141820] p-6 rounded-2xl border border-[#222935] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase">
                      {sub.status || "VALIDÉ"}
                    </span>
                    <span className="text-xs font-mono text-ivory-dim">
                      Soumis le {new Date(sub.submitted_at || sub.started_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-ivory">{sub.project_title}</h4>
                  <p className="text-xs text-ivory-muted leading-relaxed">
                    {sub.submission_notes || "Code source et rapport d'architecture validés selon les critères de qualité logicielle et sécurité de RayLab."}
                  </p>
                  {sub.repository_url && (
                    <a
                      href={sub.repository_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs text-gold hover:underline font-mono"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{sub.repository_url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <Link
                  href={`/projects/${sub.project_slug}`}
                  className="px-4 py-2.5 rounded-xl bg-[#1a202a] hover:bg-[#222b39] text-ivory border border-[#2a3443] text-xs font-mono transition-all whitespace-nowrap"
                >
                  Revoir le Cahier des Charges
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GOALS & CERTIFICATIONS */}
      {activeTab === "goals" && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-ivory">Objectifs &amp; Préparation aux Certifications</h3>
            <p className="text-xs text-ivory-muted">
              Feuille de route personnelle vers les certifications mondiales et l&apos;insertion professionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((g: any) => (
              <div
                key={g.id}
                className="bg-[#141820] p-6 rounded-2xl border border-[#222935] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-[10px] font-mono uppercase font-bold">
                    {g.goal_type?.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-ivory-dim">
                    Cible : {g.target_date || "2026-12-31"}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-ivory">{g.title}</h4>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  {g.description}
                </p>
                <div className="pt-2 border-t border-[#1d232e] flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Statut : {g.status === "active" ? "En cours de révision" : "Atteint"}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: NOTES */}
      {activeTab === "notes" && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-ivory">Mon Carnet de Notes Pédagogiques</h3>
            <p className="text-xs text-ivory-muted">
              Notes personnelles synchronisées et attachées à chaque leçon
            </p>
          </div>

          {notes.length === 0 ? (
            <div className="bg-[#141820] p-10 rounded-2xl border border-[#222935] text-center space-y-3">
              <Bookmark className="w-8 h-8 text-gold/40 mx-auto" />
              <p className="text-xs text-ivory-muted">
                Vous n&apos;avez pas encore de notes enregistrées. Ouvrez une leçon et utilisez l&apos;onglet &quot;Mes Notes&quot; pour conserver vos mémos techniques.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((n: any) => (
                <div
                  key={n.id}
                  className="bg-[#141820] p-6 rounded-2xl border border-[#222935] space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-ivory-dim">
                    <span className="text-gold font-semibold">{n.lesson_title || "Leçon"}</span>
                    <span>{new Date(n.updated_at).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <p className="text-xs text-ivory-muted font-mono bg-[#0e1117] p-3 rounded-xl border border-[#1e2532] whitespace-pre-wrap">
                    {n.body}
                  </p>
                  <Link
                    href={`/lessons/${n.lesson_id}`}
                    className="inline-flex items-center space-x-1 text-xs text-gold hover:underline font-mono"
                  >
                    <span>Accéder à la leçon</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
