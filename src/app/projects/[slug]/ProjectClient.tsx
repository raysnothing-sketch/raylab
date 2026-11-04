"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import confetti from "canvas-confetti";
import {
  Code2,
  Clock,
  ShieldAlert,
  CheckCircle2,
  GitBranch,
  Globe,
  FileText,
  Lock,
  ArrowRight,
  Sparkles,
  Send,
} from "lucide-react";

export default function ProjectClient({ project }: { project: any }) {
  const { user, addXp } = useApp();
  const [repoUrl, setRepoUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/projects/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          projectId: project.id,
          repositoryUrl: repoUrl,
          demoUrl: demoUrl,
          description: notes,
          visibility,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        addXp(150);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#C6A66B", "#10B981"],
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-ivory-dim mb-6 font-mono">
        <Link href="/projects" className="hover:text-gold transition-colors">
          Projets
        </Link>
        <span>/</span>
        <span className="text-gold">{project.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Project Description, Requirements, Safety */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#141820] rounded-3xl border border-[#222935] p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-gold/15 text-gold border border-gold/40">
                {project.domain} • {project.difficulty.toUpperCase()}
              </span>
              <div className="flex items-center space-x-2 text-xs font-mono text-ivory-dim">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>Estimé : {project.estimated_minutes} min</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-ivory tracking-tight">
                {project.title}
              </h1>
              <p className="text-sm text-ivory-muted mt-2 leading-relaxed">
                {project.summary}
              </p>
            </div>
          </div>

          {/* Specifications Markdown */}
          <div className="bg-[#141820] rounded-2xl border border-[#222935] p-8 prose-raylab">
            <div
              dangerouslySetInnerHTML={{
                __html: renderProjectMarkdown(project.description_md),
              }}
            />
          </div>

          {/* Requirements & Safety */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#141820] rounded-2xl border border-[#222935] p-6 space-y-3">
              <h3 className="font-bold text-sm text-ivory flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Prérequis &amp; Spécifications</span>
              </h3>
              <p className="text-xs text-ivory-muted leading-relaxed whitespace-pre-line">
                {project.requirements_md || project.prerequisites_md}
              </p>
            </div>

            <div className="bg-[#141820] rounded-2xl border border-red-500/20 p-6 space-y-3">
              <h3 className="font-bold text-sm text-red-400 flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Règles d&apos;Éthique &amp; Sécurité</span>
              </h3>
              <p className="text-xs text-ivory-muted leading-relaxed whitespace-pre-line">
                {project.safety_notes_md ||
                  "Tout test doit se dérouler strictement en local ou sur des environnements autorisés."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Submission Box */}
        <div className="space-y-6">
          <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 sm:p-7 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-gold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Portfolio Submission</span>
              </div>
              <h2 className="text-lg font-bold text-ivory">
                Enregistrer ma Réalisation
              </h2>
              <p className="text-xs text-ivory-dim mt-1">
                Liez votre code source et intégrez ce projet à votre portfolio RayLab.
              </p>
            </div>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 space-y-2 text-xs font-mono">
                <div className="flex items-center space-x-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Projet enregistré avec succès !</span>
                </div>
                <p className="text-[11px] text-ivory-muted">
                  +150 XP accordés. Votre projet apparaît désormais dans votre Tableau de Bord et votre Portfolio.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-ivory flex items-center space-x-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-gold" />
                    <span>Lien du Dépôt GitHub *</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/votre-compte/mon-projet"
                    className="w-full bg-[#101216] border border-[#262f3c] rounded-lg px-3 py-2 text-ivory placeholder-ivory-dim focus:outline-none focus:border-gold font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-ivory flex items-center space-x-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Lien Démo ou Documentation (Optionnel)</span>
                  </label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://demo.example.com"
                    className="w-full bg-[#101216] border border-[#262f3c] rounded-lg px-3 py-2 text-ivory placeholder-ivory-dim focus:outline-none focus:border-gold font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-ivory">
                    Visibilité du projet
                  </label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as any)}
                    className="w-full bg-[#101216] border border-[#262f3c] rounded-lg px-3 py-2 text-ivory focus:outline-none focus:border-gold"
                  >
                    <option value="public">Public (Affiché sur mon profil RayLab)</option>
                    <option value="private">Privé (Visible uniquement par moi)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-ivory">
                    Notes &amp; Résultats obtenus (Formule Google XYZ)
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Conçu un scanner asynchrone réduisant l'analyse de 45%..."
                    className="w-full bg-[#101216] border border-[#262f3c] rounded-lg p-3 text-ivory placeholder-ivory-dim focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !repoUrl.trim()}
                  className="w-full py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs shadow-gold transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Enregistrement..." : "Soumettre mon Projet (+150 XP)"}</span>
                </button>
              </form>
            )}
          </div>

          {/* RayBot Code Review Card */}
          <div className="p-5 rounded-2xl bg-[#101319] border border-gold/30 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-gold font-bold">
              <Sparkles className="w-4 h-4 animate-pulse text-gold" />
              <span>Audit de Projet avec RayBot</span>
            </div>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Un doute sur l&apos;architecture de votre code, les tests unitaires ou la sécurité des dépendances ? RayBot peut auditer vos spécifications.
            </p>
            <Link
              href="/raybot"
              className="w-full py-2.5 rounded-xl bg-[#161a22] hover:bg-[#1e2430] border border-gold/40 text-gold text-xs font-bold font-mono flex items-center justify-center space-x-1.5 transition-all shadow-sm"
            >
              <span>Consulter RayBot AI Mentor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderProjectMarkdown(md: string): string {
  let html = md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/`([^`]+)`/gim, "<code>$1</code>")
    .replace(/\n\n/gim, "<br/><br/>");

  return html;
}
