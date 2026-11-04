import React from "react";
import Link from "next/link";
import { dbQuery, dbQueryOne } from "@/lib/db";
import {
  ShieldAlert,
  Users,
  BookOpen,
  Code2,
  Award,
  Layers,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Database,
  Lock,
  Plus,
  Activity,
  Server,
  Sparkles,
} from "lucide-react";

export default async function AdminPage() {
  const usersCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM users"))?.count || 0;
  const pathsCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM learning_paths"))?.count || 0;
  const coursesCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM courses"))?.count || 0;
  const lessonsCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM lessons"))?.count || 0;
  const projectsCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM projects"))?.count || 0;
  const submissionsCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM project_submissions"))?.count || 0;

  const users = await dbQuery<{ id: string; display_name: string; email: string; account_status: string; created_at: string }>(
    "SELECT id, display_name, email, account_status, created_at FROM users"
  );

  const paths = await dbQuery<{ id: string; slug: string; title: string; difficulty: string; estimated_minutes: number; status: string }>(
    "SELECT id, slug, title, difficulty, estimated_minutes, status FROM learning_paths ORDER BY id ASC"
  );

  const submissions = await dbQuery<{ id: string; project_id: string; user_id: string; repository_url: string; status: string; started_at: string }>(
    "SELECT id, project_id, user_id, repository_url, status, started_at FROM project_submissions ORDER BY started_at DESC LIMIT 5"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#20252C]">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Content Studio &amp; Administration • Section 16 &amp; 17</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ivory">
            Console d&apos;Administration RayLab
          </h1>
          <p className="text-xs text-ivory-dim mt-1">
            Supervision globale des utilisateurs, des cursus académiques et télémétrie de la base de données Turso libSQL.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <Database className="w-3.5 h-3.5" />
          <span>Turso libSQL 33 Tables Online</span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 font-mono text-xs">
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">UTILISATEURS</div>
          <div className="text-xl font-bold text-ivory mt-1">{usersCount}</div>
        </div>
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">ACADÉMIES</div>
          <div className="text-xl font-bold text-gold mt-1">{pathsCount}</div>
        </div>
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">VOLUMES / COURS</div>
          <div className="text-xl font-bold text-ivory mt-1">{coursesCount}</div>
        </div>
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">LEÇONS PRATIQUES</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{lessonsCount}</div>
        </div>
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">PROJETS CAPSTONE</div>
          <div className="text-xl font-bold text-ivory mt-1">{projectsCount}</div>
        </div>
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">SOUMISSIONS</div>
          <div className="text-xl font-bold text-purple-400 mt-1">{submissionsCount}</div>
        </div>
      </div>

      {/* Content Studio: Académies & Cursus Management */}
      <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-ivory flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-gold" />
              <span>Content Studio — Inventaire des Académies Publiées</span>
            </h2>
            <p className="text-xs text-ivory-muted">
              Gérez les métadonnées, les volumes associés et l&apos;ordonnancement des formations
            </p>
          </div>
          <Link
            href="/paths"
            className="px-3.5 py-1.5 rounded-xl bg-gold/10 hover:bg-gold hover:text-[#101216] text-gold border border-gold/30 text-xs font-mono font-semibold transition-all flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <span>Voir le Catalogue Public</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#222a36] text-ivory-dim">
                <th className="pb-3 font-semibold">IDENTIFIANT</th>
                <th className="pb-3 font-semibold">TITRE DE L&apos;ACADÉMIE</th>
                <th className="pb-3 font-semibold">NIVEAU</th>
                <th className="pb-3 font-semibold">DURÉE ESTIMÉE</th>
                <th className="pb-3 font-semibold">STATUT</th>
                <th className="pb-3 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b212c]">
              {paths.map((p) => (
                <tr key={p.id} className="hover:bg-[#181e28] transition-colors">
                  <td className="py-3 text-ivory-dim">{p.id}</td>
                  <td className="py-3 font-bold text-ivory">{p.title}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-[#101318] text-gold border border-gold/20">
                      {p.difficulty.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-ivory-dim">~{Math.round(p.estimated_minutes / 60)}h</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/paths/${p.slug}`}
                      className="text-gold hover:underline font-semibold"
                    >
                      Inspecter →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2-Column: Users & Recent Project Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Accounts Management */}
        <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 space-y-4">
          <h2 className="text-base font-bold text-ivory flex items-center space-x-2">
            <Users className="w-4 h-4 text-gold" />
            <span>Comptes Utilisateurs &amp; Rôles</span>
          </h2>
          <div className="divide-y divide-[#1e2532] text-xs font-mono">
            {users.map((u) => (
              <div key={u.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-ivory">{u.display_name}</div>
                  <div className="text-[11px] text-ivory-dim">{u.email}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/20 text-[10px]">
                    {u.account_status || "ACTIF"}
                  </span>
                  <div className="text-[10px] text-ivory-dim mt-0.5">
                    {new Date(u.created_at).toLocaleDateString("fr-FR")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Submissions Queue */}
        <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 space-y-4">
          <h2 className="text-base font-bold text-ivory flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>Dernières Soumissions de Projets</span>
          </h2>
          {submissions.length === 0 ? (
            <p className="text-xs text-ivory-muted py-4">Aucune soumission en attente.</p>
          ) : (
            <div className="divide-y divide-[#1e2532] text-xs font-mono">
              {submissions.map((s) => (
                <div key={s.id} className="py-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-ivory">{s.project_id}</div>
                    <div className="text-[11px] text-ivory-dim">Auteur : {s.user_id}</div>
                    {s.repository_url && (
                      <div className="text-[10px] text-gold truncate max-w-xs">{s.repository_url}</div>
                    )}
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    {s.status?.toUpperCase() || "VALIDÉ"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
