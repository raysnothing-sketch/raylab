"use client";

import React, { useState, useEffect } from "react";
import { Flag, Shield, Trophy, CheckCircle2, AlertCircle, Key, Sparkles, Terminal, Unlock, RefreshCw } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  category: "Linux PrivEsc" | "Forensics" | "Web AppSec" | "Crypto" | "SOC & SIEM";
  difficulty: "Facile" | "Intermédiaire" | "Avancé";
  points: number;
  description: string;
  hints: string[];
  flag: string;
  solved: boolean;
}

const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: "ctf-1",
    title: "Élévation de Privilèges SUID Linux",
    category: "Linux PrivEsc",
    difficulty: "Facile",
    points: 150,
    description: "Un administrateur négligent a laissé un binaire avec le bit SUID actif sur le système. Utilisez le terminal virtuel RayLab pour lister les binaires SUID avec 'find / -perm -4000 2>/dev/null' ou devenez root avec 'sudo su' pour lire le flag dans /root/flag.txt !",
    hints: [
      "Dans le Terminal Linux RayLab, tapez : cat /root/flag.txt (vous devez être root)",
      "Pour passer root : sudo su (mot de passe : raylab2027) ou exécutez le binaire SUID.",
    ],
    flag: "RayLab{suid_privesc_root_master_2027}",
    solved: false,
  },
  {
    id: "ctf-2",
    title: "Déchiffrement de Payload Obfusqué",
    category: "Forensics",
    difficulty: "Intermédiaire",
    points: 200,
    description: "Une sonde réseau RayLab a intercepté cette chaîne Base64 encodée dans un payload HTTP suspect : 'UmF5TGFiY29weWNhdF9iYXNlNjRfc3RyZWFtX2RlY29kZWRfMjAyN30='. Décodez cette charge utile en Python dans le Runner WebAssembly ou avec 'echo <str> | base64 -d' dans le terminal !",
    hints: [
      "En Python : import base64; print(base64.b64decode('UmF5TGFi...').decode())",
      "Dans le Terminal Linux : echo 'UmF5TGFi...' | base64 -d",
    ],
    flag: "RayLab{copycat_base64_stream_decoded_2027}",
    solved: false,
  },
  {
    id: "ctf-3",
    title: "Contournement d'Authentification SQLi",
    category: "Web AppSec",
    difficulty: "Facile",
    points: 100,
    description: "Un formulaire d'administration non sécurisé concatène directement l'entrée utilisateur : SELECT * FROM users WHERE username = 'VOTRE_ENTREE' AND password = '...'. Quel payload classique permet de transformer cette clause WHERE en tautologie toujours vraie ?",
    hints: [
      "Pensez au payload classique de type ' OR '1'='1",
      "La réponse attendue pour le flag est : RayLab{' OR 1=1 --}",
    ],
    flag: "RayLab{' OR 1=1 --}",
    solved: false,
  },
  {
    id: "ctf-4",
    title: "Analyse d'Incident SOC & Traque d'IP",
    category: "SOC & SIEM",
    difficulty: "Intermédiaire",
    points: 250,
    description: "Dans le runner Python, lancez le preset 'Moteur Détection Menaces SIEM'. Repérez l'adresse IP publique externe qui a déclenché l'attaque PATH_TRAVERSAL (/download?file=../../../../etc/shadow). Soumettez le flag sous la forme RayLab{IP_TROUVEE}.",
    hints: [
      "Regardez les logs dans le preset SIEM du Live Runner : quelle est l'IP devant GET /download?file=../../../../etc/shadow ?",
      "Format : RayLab{45.33.32.156}",
    ],
    flag: "RayLab{45.33.32.156}",
    solved: false,
  },
  {
    id: "ctf-5",
    title: "Rétro-Ingénierie de Clé Cryptographique",
    category: "Crypto",
    difficulty: "Avancé",
    points: 300,
    description: "Pour valider l'intégrité du protocole RayLab, calculez le hachage SHA-256 de la chaîne exacte 'RayLabSecurity2027' en minuscule dans le runner Python : import hashlib; print(hashlib.sha256(b'raylabsecurity2027').hexdigest()). Le flag est RayLab{premiers_12_caractères_du_hash}.",
    hints: [
      "Exécutez en Python : import hashlib; h = hashlib.sha256('raylabsecurity2027'.encode()).hexdigest(); print(h[:12])",
      "Le résultat commence par 'd50599...'",
    ],
    flag: "RayLab{d50599bbcf0b}",
    solved: false,
  },
];

export default function CtfArena() {
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { type: "success" | "error"; msg: string }>>({});
  const [activeTab, setActiveTab] = useState<string>("all");

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("raylab_ctf_solved");
      if (saved) {
        const solvedIds = JSON.parse(saved) as string[];
        setChallenges((prev) =>
          prev.map((c) => ({
            ...c,
            solved: solvedIds.includes(c.id),
          }))
        );
      }
    } catch (e) {
      console.warn("Could not read localStorage for CTF:", e);
    }
  }, []);

  const totalPoints = challenges.reduce((acc, c) => acc + c.points, 0);
  const earnedPoints = challenges
    .filter((c) => c.solved)
    .reduce((acc, c) => acc + c.points, 0);

  const handleSubmitFlag = (id: string) => {
    const userFlag = (inputs[id] || "").trim();
    const challenge = challenges.find((c) => c.id === id);
    if (!challenge) return;

    if (!userFlag) {
      setFeedback((prev) => ({
        ...prev,
        [id]: { type: "error", msg: "Veuillez entrer un flag avant de valider." },
      }));
      return;
    }

    const clean = (s: string) => s.trim().toLowerCase().replace(/^raylab\{|\}$/g, "");
    const isCorrect = userFlag === challenge.flag || clean(userFlag) === clean(challenge.flag);

    if (isCorrect) {
      const updated = challenges.map((c) =>
        c.id === id ? { ...c, solved: true } : c
      );
      setChallenges(updated);
      setFeedback((prev) => ({
        ...prev,
        [id]: {
          type: "success",
          msg: `🎉 Flag validé avec succès ! +${challenge.points} XP ajoutés à votre profil RayLab.`,
        },
      }));

      // Save to localStorage
      try {
        const solvedIds = updated.filter((c) => c.solved).map((c) => c.id);
        localStorage.setItem("raylab_ctf_solved", JSON.stringify(solvedIds));
      } catch (e) {}
    } else {
      setFeedback((prev) => ({
        ...prev,
        [id]: {
          type: "error",
          msg: "❌ Flag incorrect. Analysez les indices et vérifiez la casse ou les espaces.",
        },
      }));
    }
  };

  const handleResetProgress = () => {
    if (confirm("Réinitialiser tous les challenges résolus dans ce navigateur ?")) {
      setChallenges((prev) => prev.map((c) => ({ ...c, solved: false })));
      setFeedback({});
      setInputs({});
      try {
        localStorage.removeItem("raylab_ctf_solved");
      } catch (e) {}
    }
  };

  const filteredChallenges =
    activeTab === "all"
      ? challenges
      : challenges.filter((c) => c.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Banner / Score Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/60 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Arène CTF & Défis Hands-On RayLab</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Laboratoire de Tests & Résolution de Drapeaux
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Mettez vos compétences à l&apos;épreuve : utilisez conjointement le Terminal Linux interactif et le Live Runner Python pour percer les failles, décoder les charges utiles et capturer les drapeaux officiels <code className="text-cyan-300 font-mono">RayLab&#123;...&#125;</code>.
          </p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 min-w-[200px] text-right flex flex-col items-end">
          <span className="text-xs text-slate-400 uppercase font-mono">Votre Score XP</span>
          <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400">
            {earnedPoints} / {totalPoints} XP
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${(earnedPoints / totalPoints) * 100}%` }}
            />
          </div>
          <button
            onClick={handleResetProgress}
            className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1 mt-3 transition"
          >
            <RefreshCw className="w-3 h-3" /> Réinitialiser le score
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2">
        {["all", "Linux PrivEsc", "Forensics", "Web AppSec", "SOC & SIEM", "Crypto"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === cat
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {cat === "all" ? "Tous les Défis" : cat}
          </button>
        ))}
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredChallenges.map((c) => (
          <div
            key={c.id}
            className={`border rounded-xl p-5 transition ${
              c.solved
                ? "bg-emerald-950/20 border-emerald-500/30"
                : "bg-slate-900/90 border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                    c.solved
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-slate-800 text-slate-300 border border-slate-700"
                  }`}
                >
                  {c.solved ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Flag className="w-4 h-4 text-cyan-400" />}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 text-base flex items-center gap-2">
                    {c.title}
                    {c.solved && (
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                        RÉSOLU
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="text-cyan-400 font-mono">{c.category}</span>
                    <span>•</span>
                    <span className="text-slate-400 font-mono">Difficulté : {c.difficulty}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-amber-400 font-mono">
                  +{c.points} XP
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {c.description}
            </p>

            {/* Hints Box */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 mb-4 space-y-1 text-xs">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Indice & Commande suggérée :
              </span>
              {c.hints.map((hint, idx) => (
                <p key={idx} className="text-slate-400 font-mono">
                  {hint}
                </p>
              ))}
            </div>

            {/* Submission Input */}
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              <div className="relative flex-1">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="RayLab{votre_flag_ici}"
                  value={inputs[c.id] || ""}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, [c.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmitFlag(c.id);
                  }}
                  disabled={c.solved}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 disabled:opacity-60"
                />
              </div>
              <button
                onClick={() => handleSubmitFlag(c.id)}
                disabled={c.solved}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap ${
                  c.solved
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                    : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold"
                }`}
              >
                {c.solved ? "Défi validé" : "Soumettre le Flag"}
              </button>
            </div>

            {/* Feedback message */}
            {feedback[c.id] && (
              <p
                className={`text-xs mt-2 font-mono ${
                  feedback[c.id].type === "success"
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {feedback[c.id].msg}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
