"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Target,
  Plus,
  ArrowRight,
  Shield,
  Code2,
  Calendar,
  Lock,
  Globe,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Terminal,
} from "lucide-react";

export default function DashboardClient({ dashboardData }: { dashboardData: any }) {
  const { mode, setMode, user, userXp, streakDays } = useApp();
  const [goals, setGoals] = useState(dashboardData.goals || []);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDate, setNewGoalDate] = useState("");
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const newGoal = {
      id: `goal_${Date.now()}`,
      user_id: user.id,
      title: newGoalTitle,
      goal_type: "learning",
      target_date: newGoalDate || "2026-12-31",
      status: "active",
      is_private: 1,
    };

    setGoals([newGoal, ...goals]);
    setNewGoalTitle("");
    setNewGoalDate("");
    setIsAddingGoal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#20252C]">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar_url}
            alt={user.display_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-gold shadow-gold"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-ivory">{user.display_name}</h1>
              {mode === "personal" ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-gold/15 text-gold border border-gold/40">
                  <Lock className="w-2.5 h-2.5 mr-1" />
                  Mode Personnel Fondateur
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/15 text-blue-400 border border-blue-500/40">
                  <Globe className="w-2.5 h-2.5 mr-1" />
                  Mode Public Apprenant
                </span>
              )}
            </div>
            <p className="text-xs text-ivory-muted font-mono mt-0.5">
              Identifiant : {user.id} • Rôles : {user.roles?.join(", ")}
            </p>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="bg-[#141820] px-4 py-2.5 rounded-xl border border-[#222935] flex items-center space-x-2">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <div>
              <div className="text-[10px] text-ivory-dim">SÉRIE EN COURS</div>
              <div className="font-bold text-amber-400">{streakDays} jours</div>
            </div>
          </div>

          <div className="bg-[#141820] px-4 py-2.5 rounded-xl border border-[#222935] flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <div>
              <div className="text-[10px] text-ivory-dim">TOTAL XP</div>
              <div className="font-bold text-gold">{userXp} XP</div>
            </div>
          </div>

          <Link
            href="/lab"
            className="px-4 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs flex items-center space-x-1.5 shadow-gold transition-all"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Labo Virtuel &gt;_</span>
          </Link>
        </div>
      </div>

      {/* Mode Banner notification */}
      {mode === "personal" && (
        <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <Lock className="w-4 h-4 text-gold" />
            <span className="text-ivory">
              <strong>Espace Privé du Fondateur :</strong> Vos objectifs personnels, notes confidentielles et certifications cibles ne sont visibles par aucun tiers.
            </span>
          </div>
          <button
            onClick={() => setMode("public")}
            className="underline text-gold hover:text-gold-light font-semibold"
          >
            Basculer en Mode Public
          </button>
        </div>
      )}

      {/* Grid: Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: In Progress Courses & Goals */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Path Enrollments */}
          <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-ivory">Parcours en Cours</h2>
                <p className="text-xs text-ivory-dim">Reprenez votre formation là où vous l&apos;avez laissée.</p>
              </div>
              <Link
                href="/paths"
                className="text-xs text-gold hover:text-gold-light font-semibold flex items-center space-x-1"
              >
                <span>Explorer d&apos;autres parcours</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {dashboardData.enrollments?.map((enr: any) => (
                <div
                  key={enr.id}
                  className="p-5 rounded-2xl bg-[#101318] border border-[#202732] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-gold">
                      <span className="uppercase">{enr.enrollment_type}</span>
                      <span>•</span>
                      <span>{enr.difficulty.toUpperCase()}</span>
                    </div>
                    <h3 className="font-bold text-base text-ivory">{enr.path_title}</h3>
                    <p className="text-xs text-ivory-dim font-mono">
                      Statut : {enr.status === "active" ? "Actif" : enr.status}
                    </p>
                  </div>

                  <Link
                    href={`/paths/${enr.path_slug}`}
                    className="px-4 py-2 rounded-xl bg-[#1c222b] hover:bg-gold hover:text-[#101216] text-ivory text-xs font-semibold transition-all flex items-center justify-center space-x-1 group"
                  >
                    <span>Continuer</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Goals (Cahier des charges §6.3 Personal Learning Path) */}
          <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-ivory flex items-center space-x-2">
                  <Target className="w-4 h-4 text-gold" />
                  <span>Objectifs &amp; Échéances Personnelles</span>
                </h2>
                <p className="text-xs text-ivory-dim">
                  Planifiez vos certifications ciblées et livrables techniques.
                </p>
              </div>
              <button
                onClick={() => setIsAddingGoal(!isAddingGoal)}
                className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold hover:bg-gold/25 border border-gold/30 text-xs font-semibold flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nouvel Objectif</span>
              </button>
            </div>

            {isAddingGoal && (
              <form onSubmit={handleAddGoal} className="p-4 rounded-xl bg-[#101318] border border-[#202732] space-y-3 text-xs">
                <div>
                  <label className="text-ivory-muted font-medium">Titre de l&apos;objectif</label>
                  <input
                    type="text"
                    required
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    placeholder="Ex: Passer la certification CompTIA Security+..."
                    className="w-full bg-[#141820] border border-[#262f3c] rounded-lg p-2.5 text-ivory mt-1 focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="text-ivory-muted font-medium">Date cible</label>
                  <input
                    type="date"
                    value={newGoalDate}
                    onChange={(e) => setNewGoalDate(e.target.value)}
                    className="w-full bg-[#141820] border border-[#262f3c] rounded-lg p-2.5 text-ivory mt-1 focus:border-gold outline-none font-mono"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingGoal(false)}
                    className="px-3 py-1.5 rounded-lg text-ivory-dim hover:text-ivory"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-gold text-[#101216] font-bold shadow-gold"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {goals.map((g: any) => (
                <div
                  key={g.id}
                  className="p-4 rounded-xl bg-[#101318] border border-[#202732] flex items-center justify-between text-xs"
                >
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-ivory">{g.title}</div>
                      <div className="text-[11px] text-ivory-dim font-mono mt-0.5 flex items-center space-x-2">
                        <span>Échéance : {g.target_date || "2026"}</span>
                        <span>•</span>
                        <span className="text-gold capitalize">{g.goal_type}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {g.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Portfolio Submissions */}
          <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-ivory">Mon Portfolio de Projets</h2>
                <p className="text-xs text-ivory-dim">
                  Vos réalisations techniques validées et prêtes à être partagées.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-xs text-gold hover:text-gold-light font-semibold"
              >
                Explorer les Projets
              </Link>
            </div>

            {dashboardData.submissions?.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#262f3c] rounded-2xl text-xs text-ivory-dim space-y-2">
                <Code2 className="w-6 h-6 mx-auto text-gold/60" />
                <p>Aucun projet encore soumis.</p>
                <Link
                  href="/projects"
                  className="inline-block mt-2 text-gold hover:underline font-semibold"
                >
                  Commencer le projet Password Strength Analyzer →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {dashboardData.submissions?.map((s: any) => (
                  <div
                    key={s.id}
                    className="p-4 rounded-xl bg-[#101318] border border-[#202732] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-ivory">{s.project_title}</div>
                      <div className="text-[11px] text-ivory-dim truncate max-w-md mt-0.5">
                        {s.description || "Projet complété avec succès"}
                      </div>
                    </div>
                    {s.repository_url && (
                      <a
                        href={s.repository_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-lg bg-[#181d24] text-gold hover:bg-gold hover:text-[#101216] transition-all flex items-center space-x-1"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Achievements & Quick Actions */}
        <div className="space-y-8">
          {/* Achievements / Badges */}
          <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-ivory flex items-center space-x-2">
                <Award className="w-4 h-4 text-gold" />
                <span>Badges &amp; Récompenses</span>
              </h2>
              <span className="text-xs font-mono text-gold font-bold">
                {dashboardData.achievements?.length || 0} Débloqués
              </span>
            </div>

            <div className="space-y-3">
              {dashboardData.achievements?.map((ach: any) => (
                <div
                  key={ach.id}
                  className="p-3.5 rounded-xl bg-[#101318] border border-gold/30 flex items-center space-x-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-ivory">{ach.title}</div>
                    <div className="text-[11px] text-ivory-dim">{ach.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Toolkit Shortcuts */}
          <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 space-y-3 text-xs">
            <h3 className="font-bold text-ivory uppercase tracking-wider text-gold font-mono">
              Outils Rapides
            </h3>
            <div className="space-y-2">
              <Link
                href="/career/cv-builder"
                className="block p-3 rounded-xl bg-[#101318] hover:bg-[#181e28] border border-[#222935] text-ivory font-semibold transition-all"
              >
                📄 Ouvrir le CV ATS Builder
              </Link>
              <Link
                href="/certifications"
                className="block p-3 rounded-xl bg-[#101318] hover:bg-[#181e28] border border-[#222935] text-ivory font-semibold transition-all"
              >
                🎯 Consulter le Guide CompTIA Security+
              </Link>
              <Link
                href="/projects/password-strength-checker"
                className="block p-3 rounded-xl bg-[#101318] hover:bg-[#181e28] border border-[#222935] text-ivory font-semibold transition-all"
              >
                💻 Lancer le Lab Entropie Mot de Passe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
