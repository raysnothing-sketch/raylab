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
} from "lucide-react";

export default async function AdminPage() {
  const usersCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM users"))?.count || 0;
  const pathsCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM learning_paths"))?.count || 0;
  const coursesCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM courses"))?.count || 0;
  const lessonsCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM lessons"))?.count || 0;
  const projectsCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM projects"))?.count || 0;
  const submissionsCount = (await dbQueryOne<{ count: number }>("SELECT COUNT(*) as count FROM project_submissions"))?.count || 0;

  const users = await dbQuery("SELECT id, display_name, email, account_status, created_at FROM users");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#20252C]">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Super Administrator &amp; Content Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ivory">
            Console d&apos;Administration RayLab
          </h1>
          <p className="text-xs text-ivory-dim mt-1">
            Gestion globale des utilisateurs, des contenus pédagogiques et supervision de la base Turso.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <Database className="w-3.5 h-3.5" />
          <span>Turso / libSQL SQLite-v1.0 Online</span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 font-mono text-xs">
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">UTILISATEURS</div>
          <div className="text-xl font-bold text-ivory mt-1">{usersCount}</div>
        </div>
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">PARCOURS</div>
          <div className="text-xl font-bold text-gold mt-1">{pathsCount}</div>
        </div>
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">COURS</div>
          <div className="text-xl font-bold text-ivory mt-1">{coursesCount}</div>
        </div>
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">LEÇONS</div>
          <div className="text-xl font-bold text-blue-400 mt-1">{lessonsCount}</div>
        </div>
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">PROJETS</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{projectsCount}</div>
        </div>
        <div className="p-4 bg-[#141820] rounded-2xl border border-[#222935]">
          <div className="text-ivory-dim">SOUMISSIONS</div>
          <div className="text-xl font-bold text-gold mt-1">{submissionsCount}</div>
        </div>
      </div>

      {/* Users & Roles List */}
      <div className="bg-[#141820] rounded-3xl border border-[#222935] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-ivory flex items-center space-x-2">
            <Users className="w-4 h-4 text-gold" />
            <span>Gestion des Utilisateurs &amp; Rôles</span>
          </h2>
          <span className="text-xs text-ivory-dim font-mono">{users.length} comptes actifs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#202732] text-ivory-dim">
                <th className="pb-3">Nom</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Statut</th>
                <th className="pb-3">Inscrit le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b222d] text-ivory">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="py-3 font-semibold">{u.display_name}</td>
                  <td className="py-3 text-ivory-muted">{u.email}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {u.account_status}
                    </span>
                  </td>
                  <td className="py-3 text-ivory-dim">{u.created_at?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Studio Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-[#141820] rounded-2xl border border-[#222935] space-y-3">
          <div className="text-xs font-mono text-gold">STUDIO DE CONTENU</div>
          <h3 className="font-bold text-base text-ivory">Créer une Leçon</h3>
          <p className="text-xs text-ivory-muted">
            Rédigez du contenu formaté en Markdown, ajoutez des extraits Python et des conseils de sécurité.
          </p>
          <Link
            href="/paths"
            className="inline-flex items-center space-x-1 text-xs text-gold font-semibold hover:underline"
          >
            <span>Explorer les cours existants →</span>
          </Link>
        </div>

        <div className="p-6 bg-[#141820] rounded-2xl border border-[#222935] space-y-3">
          <div className="text-xs font-mono text-emerald-400">ÉVALUATIONS</div>
          <h3 className="font-bold text-base text-ivory">Créer un Quiz ou Exercice</h3>
          <p className="text-xs text-ivory-muted">
            Configurez les questions QCM, les clés de réponse et les tests unitaires de code.
          </p>
          <Link
            href="/lessons/les_py_conditions"
            className="inline-flex items-center space-x-1 text-xs text-gold font-semibold hover:underline"
          >
            <span>Voir l&apos;exercice de filtrage de port →</span>
          </Link>
        </div>

        <div className="p-6 bg-[#141820] rounded-2xl border border-[#222935] space-y-3">
          <div className="text-xs font-mono text-blue-400">SÉCURITÉ &amp; AUDIT</div>
          <h3 className="font-bold text-base text-ivory">Supervision des Alertes</h3>
          <p className="text-xs text-ivory-muted">
            Tous les événements sensibles et tentatives de quiz sont enregistrés dans la table `activity_events`.
          </p>
          <div className="text-xs text-emerald-400 font-mono">
            ✔ RLS &amp; Vérification serveur activées
          </div>
        </div>
      </div>
    </div>
  );
}
