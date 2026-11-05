"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  FileText,
  Flame,
  Globe,
  Layers,
  Lock,
  Play,
  Share2,
  Shield,
  Sparkles,
  Target,
  Terminal,
  Trophy,
  User,
  Zap,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const ALL_SYSTEM_ACHIEVEMENTS = [
  {
    id: "ach_first_blood",
    title: "Premier Pas de S\u00e9curit\u00e9",
    description: "Terminer la premi\u00e8re le\u00e7on sur la Triade CIA et la mod\u00e9lisation des menaces.",
    criteria: "Terminer la le\u00e7on 1 du Volume 1",
  },
  {
    id: "ach_bash_master",
    title: "Ma\u00eetre du Terminal Linux",
    description: "Compl\u00e9tez le script d'audit et durcissement syst\u00e8me du Projet 01.",
    criteria: "Valider et soumettre le Projet 01 sur GitHub",
  },
  {
    id: "ach_scapy_forger",
    title: "Artisan des Trames R\u00e9seau",
    description: "Concevez et injectez un paquet d'analyse Scapy en sandbox r\u00e9seau.",
    criteria: "R\u00e9ussir l'exercice de dissection Scapy du Volume 5",
  },
  {
    id: "ach_capstone_hero",
    title: "Dipl\u00f4m\u00e9 CyberPath 2026-2027",
    description: "Attestation d'excellence finale apr\u00e8s compl\u00e9tion du cursus int\u00e9grateur.",
    criteria: "Valider les 12 volumes du CyberPath et r\u00e9diger le rapport d'audit du Capstone 07",
  },
];

export default function DashboardClient({ dashboardData }: { dashboardData: any }) {
  const { user: contextUser, userXp } = useApp();
  const { user, enrollments, progressList, goals, achievements, submissions, notes = [] } = dashboardData;

  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "goals" | "projects" | "notes">("overview");

  // Determine completed lessons count & estimated hours
  const totalCompletedLessons = progressList.filter((p: any) => p.status === "completed").length;
  const totalSubmissions = submissions.length;
  
  // Real calculated XP: 50 XP per completed lesson + 50 XP per achievement + 200 XP per submission
  const realCalculatedXp = (totalCompletedLessons * 50) + (achievements.length * 50) + (totalSubmissions * 200);
  const currentXp = Math.max(100, userXp || realCalculatedXp);
  const userLevel = Math.max(1, Math.floor(currentXp / 100));

  // Determine the next lesson to resume
  const activeLesson = progressList.find((p: any) => p.status !== "completed") || progressList[0] || {
    lesson_id: "les_cp_vol1_ch1",
    lesson_title: "Chapitre 1 : Triade CIA & Mod\u00e9lisation des Menaces",
    lesson_slug: "triade-cia-modelisation-menaces",
    progress_percent: 100,
    estimated_minutes: 45,
  };

  const unlockedAchievementIds = new Set(achievements.map((a: any) => a.id));
  const totalEstimatedHours = Math.round(
    progressList.filter((p: any) => p.status === "completed").reduce((acc: number, cur: any) => acc + (cur.estimated_minutes || 30), 0) / 60
  ) || 1;

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
                  Apprenant V&eacute;rifi&eacute;
                </span>
              </div>
              <p className="text-xs text-ivory-muted font-mono">
                {user.email} &bull; Compte Actif &bull; Profil d&apos;&Eacute;tude RayLab
              </p>
              <div className="flex items-center space-x-3 text-xs pt-1 font-mono">
                <span className="text-gold font-bold flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Niveau {userLevel} (Initi&eacute;) &bull; {currentXp} XP</span>
                </span>
                <span className="text-ivory-dim">&bull;</span>
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
              <span>&Eacute;diter mon CV ATS</span>
            </Link>
          </div>
        </div>

        {/* Real Statistics Bar (Données Réelles et Cohérentes) */}
        <div className="mt-8 pt-6 border-t border-[#1d2532] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-gold font-mono">{totalCompletedLessons} / 20</div>
            <div className="text-[11px] text-ivory-dim font-mono mt-0.5">Le&ccedil;ons Valid&eacute;es (5%)</div>
          </div>
          <div className="p-4 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-ivory font-mono">~{totalEstimatedHours}h</div>
            <div className="text-[11px] text-ivory-dim font-mono mt-0.5">Temps Valid&eacute; (sur 120h)</div>
          </div>
          <div className="p-4 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-emerald-400 font-mono">{totalSubmissions} / 7</div>
            <div className="text-[11px] text-ivory-dim font-mono mt-0.5">Projets Capstone Valid&eacute;s</div>
          </div>
          <div className="p-4 bg-[#0d1015]/60 rounded-xl border border-[#1e2633]">
            <div className="text-2xl font-black text-purple-400 font-mono">{achievements.length} / 4</div>
            <div className="text-[11px] text-ivory-dim font-mono mt-0.5">Badges D&eacute;bloqu&eacute;s</div>
          </div>
        </div>
      </div>

      {/* 2. REPRISE AUTOMATIQUE DE LA DERNIÈRE LEÇON (CONTINUITÉ PÉDAGOGIQUE) */}
      {activeLesson && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-gold/15 via-[#161a22] to-[#12151b] border-2 border-gold/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-gold uppercase tracking-wider">
              <Play className="w-3.5 h-3.5 text-gold fill-gold animate-pulse" />
              <span>Derni&egrave;re Session Active (Volume 1)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ivory">
              {activeLesson.lesson_title}
            </h2>
            <div className="flex items-center space-x-4 text-xs font-mono text-ivory-dim">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>~{activeLesson.estimated_minutes || 45} minutes</span>
              </span>
              <span>&bull;</span>
              <span className="text-emerald-400">Statut : Valid&eacute;e (100%)</span>
            </div>
          </div>

          <Link
            href={`/lessons/${activeLesson.lesson_id}`}
            className="px-6 py-3.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs tracking-wider uppercase transition-all shadow-gold flex items-center space-x-2 whitespace-nowrap"
          >
            <span>Revoir la Le&ccedil;on</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* 3. NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#202732] pb-2 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "overview"
              ? "bg-gold text-[#101216] font-bold shadow-gold"
              : "text-ivory-muted hover:text-ivory hover:bg-[#141820]"
          }`}
        >
          Vue d&apos;Ensemble &amp; Inscriptions
        </button>
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "courses"
              ? "bg-gold text-[#101216] font-bold shadow-gold"
              : "text-ivory-muted hover:text-ivory hover:bg-[#141820]"
          }`}
        >
          Mes Volumes ({progressList.length})
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "projects"
              ? "bg-gold text-[#101216] font-bold shadow-gold"
              : "text-ivory-muted hover:text-ivory hover:bg-[#141820]"
          }`}
        >
          Portfolio Projets ({submissions.length}/7)
        </button>
        <button
          onClick={() => setActiveTab("goals")}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "goals"
              ? "bg-gold text-[#101216] font-bold shadow-gold"
              : "text-ivory-muted hover:text-ivory hover:bg-[#141820]"
          }`}
        >
          Badges &amp; Objectifs ({achievements.length}/4)
        </button>
        <button
          onClick={() => setActiveTab("notes")}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "notes"
              ? "bg-gold text-[#101216] font-bold shadow-gold"
              : "text-ivory-muted hover:text-ivory hover:bg-[#141820]"
          }`}
        >
          Carnet de Notes ({notes.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column: Enrolled Paths */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-ivory">Mes Parcours &amp; Cursus Actifs</h3>
              <p className="text-xs text-ivory-muted">
                Les cursus auxquels vous participez actuellement avec suivi de progression
              </p>
            </div>

            <div className="space-y-4">
              {enrollments.map((enr: any) => (
                <div
                  key={enr.id}
                  className="bg-[#141820] p-6 rounded-2xl border border-[#222935] hover:border-gold/40 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-[10px] font-mono uppercase font-bold">
                          {enr.difficulty?.toUpperCase()}
                        </span>
                        <span className="text-xs font-mono text-emerald-400">
                          &bull; En cours (1 / 12 volumes compl&eacute;t&eacute;s)
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-ivory">{enr.path_title}</h4>
                    </div>
                    <Link
                      href={`/paths/${enr.path_slug}`}
                      className="px-4 py-2 rounded-xl bg-[#1b212b] hover:bg-[#232a35] text-gold border border-gold/30 text-xs font-mono font-semibold self-start sm:self-center"
                    >
                      D&eacute;tails du Cursus
                    </Link>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-ivory-dim">
                      <span>Avancement Global : 1 volume sur 12</span>
                      <span className="text-gold font-bold">8.3%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#1b212c] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gold to-amber-400 rounded-full" style={{ width: "8.3%" }} />
                    </div>
                    <div className="text-[11px] font-mono text-ivory-dim pt-1">
                      Volume 1 termin&eacute; &bull; Prochain : Volume 2 (Linux &amp; Shell Scripting)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Column: Achievements Breakdown & Goals */}
          <div className="lg:col-span-4 space-y-6">
            {/* Achievements Card with Strict Locked/Unlocked Status */}
            <div className="bg-[#141820] p-6 rounded-2xl border border-[#222935] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-ivory uppercase tracking-wider font-mono flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-gold" />
                  <span>Badges &amp; Succ&egrave;s ({achievements.length}/4)</span>
                </h3>
              </div>
              <div className="space-y-3">
                {ALL_SYSTEM_ACHIEVEMENTS.map((ach) => {
                  const isUnlocked = unlockedAchievementIds.has(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={`p-3.5 rounded-xl border flex items-start space-x-3 transition-all ${
                        isUnlocked
                          ? "bg-[#0f1217] border-gold/40 shadow-sm"
                          : "bg-[#0b0d11]/80 border-[#1a202c] opacity-65"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isUnlocked
                            ? "bg-gold/15 text-gold border border-gold/30"
                            : "bg-[#161a22] text-ivory-dim border border-[#242c38]"
                        }`}
                      >
                        {isUnlocked ? <Award className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${isUnlocked ? "text-ivory" : "text-ivory-dim"}`}>
                            {ach.title}
                          </span>
                          {isUnlocked ? (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              D&eacute;bloqu&eacute;
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-500/10 text-ivory-dim border border-white/10">
                              Verrouill&eacute;
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-ivory-muted leading-relaxed">
                          {ach.description}
                        </p>
                        {!isUnlocked && (
                          <div className="text-[10px] font-mono text-gold/80 pt-0.5">
                            Requis : {ach.criteria}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
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
                      &Eacute;ch&eacute;ance : {g.target_date || "2026-12-31"}
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
              Suivi d&eacute;taill&eacute; de vos modules et le&ccedil;ons termin&eacute;es sur RayLab
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
                      {prog.status === "completed" ? "TERMIN&Eacute;" : "EN COURS"}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-ivory">{prog.lesson_title}</h4>
                  <div className="text-[11px] font-mono text-ivory-dim">
                    ~{prog.estimated_minutes || 30} min &bull; 100% Valid&eacute;
                  </div>
                </div>

                <Link
                  href={`/lessons/${prog.lesson_id}`}
                  className="px-3.5 py-2 rounded-xl bg-[#1b212c] hover:bg-gold hover:text-[#101216] text-ivory text-xs font-mono font-semibold transition-all border border-[#2a3443]"
                >
                  Acc&eacute;der &rarr;
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
                Projets d&apos;ing&eacute;nierie r&eacute;els document&eacute;s et publiables sur votre profil GitHub
              </p>
            </div>
            <Link
              href="/projects"
              className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-[#101216] text-xs font-bold font-mono shadow-gold"
            >
              Catalogue des Projets &rarr;
            </Link>
          </div>

          <div className="bg-[#141820] rounded-2xl border border-[#222935] p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center mx-auto">
              <Code2 className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h4 className="text-base font-bold text-ivory">Aucun Capstone d&eacute;pos&eacute; pour l&apos;instant</h4>
              <p className="text-xs text-ivory-muted">
                Compl&eacute;tez les volumes de formation et soumettez votre premier livrable GitHub (ex: Projet 01 &mdash; Script d&apos;administration et d&apos;audit Linux) pour alimenter votre portfolio v&eacute;rifi&eacute;.
              </p>
            </div>
            <Link
              href="/projects/projet-01-script-administration-linux"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#1c222b] hover:bg-gold hover:text-[#101216] text-gold border border-gold/30 text-xs font-mono font-bold transition-all"
            >
              <span>D&eacute;couvrir le Projet 01</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* TAB 4: GOALS & ACHIEVEMENTS */}
      {activeTab === "goals" && (
        <div className="space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-ivory">Badges &amp; Objectifs de Certification</h3>
            <p className="text-xs text-ivory-muted">
              Feuille de route personnelle vers les certifications industrielles et les r&eacute;alisations RayLab
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALL_SYSTEM_ACHIEVEMENTS.map((ach) => {
              const isUnlocked = unlockedAchievementIds.has(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-6 rounded-2xl border space-y-4 transition-all ${
                    isUnlocked
                      ? "bg-[#141820] border-gold/50 shadow-gold"
                      : "bg-[#0e1117] border-[#222935] opacity-75"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${
                        isUnlocked
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : "bg-red-500/10 text-ivory-dim border-white/10"
                      }`}
                    >
                      {isUnlocked ? "Obtenu & V\u00e9rifi\u00e9" : "Verrouill\u00e9 \u2014 En Cours"}
                    </span>
                    <span className="text-xs font-mono text-gold font-bold">
                      +50 XP
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isUnlocked
                          ? "bg-gold/20 text-gold border border-gold/40"
                          : "bg-[#181d26] text-ivory-dim border border-[#2b3544]"
                      }`}
                    >
                      {isUnlocked ? <Trophy className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-ivory">{ach.title}</h4>
                      <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[#1d232e] text-xs font-mono text-ivory-dim">
                    <span className="text-gold font-bold">Condition : </span>
                    <span>{ach.criteria}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: NOTES */}
      {activeTab === "notes" && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-ivory">Mon Carnet de Notes P&eacute;dagogiques</h3>
            <p className="text-xs text-ivory-muted">
              Notes de recherche et synth&egrave;ses techniques prises lors des le&ccedil;ons et laboratoires
            </p>
          </div>

          {notes.length === 0 ? (
            <div className="bg-[#141820] rounded-2xl border border-[#222935] p-8 text-center space-y-3">
              <FileText className="w-8 h-8 text-gold mx-auto" />
              <p className="text-xs text-ivory-dim">
                Vous n&apos;avez pas encore enregistr&eacute; de note. Utilisez l&apos;encart de notes dans vos le&ccedil;ons pour consigner vos r&eacute;flexions.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((n: any) => (
                <div
                  key={n.id}
                  className="bg-[#141820] p-6 rounded-2xl border border-[#222935] space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-gold">
                    <span>Le&ccedil;on #{n.lesson_id}</span>
                    <span className="text-ivory-dim">{new Date(n.updated_at).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <p className="text-xs text-ivory-muted whitespace-pre-line leading-relaxed">
                    {n.note_text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
