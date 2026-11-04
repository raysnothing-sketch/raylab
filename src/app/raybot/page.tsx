import React from "react";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  Shield,
  Code2,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Check,
  Server,
  Zap,
  HelpCircle,
  Briefcase,
  Lock,
  Flame,
  Globe,
  Sliders,
  ExternalLink,
} from "lucide-react";
import InteractiveAiWidget from "@/components/InteractiveAiWidget";

export const metadata = {
  title: "RayBot AI — Le Mentor Technique de RayLab",
  description:
    "Découvrez RayBot, le mentor intelligent de RayLab. Revue de code Python, décodage de logs SOC, explications réseau TCP/IP et simulation d'entretiens techniques.",
};

export default function RayBotPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-[#1c222b]">
        {/* Ambient lighting effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-gold/10 via-amber-500/5 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#161a22] border border-[#2d3540] text-xs font-mono text-gold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span>RayBot AI • Mentor Pédagogique &amp; Co-Pilote d&apos;Ingénierie</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-ivory tracking-tight leading-tight">
              L&apos;Intelligence Artificielle au Service de la{" "}
              <span className="bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
                Rigueur Technique
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ivory-muted leading-relaxed">
              RayBot n&apos;est pas un simple générateur de texte superficiel. C&apos;est un mentor conçu pour décortiquer les mécanismes profonds de l&apos;informatique : de la mémoire en Python à l&apos;analyse d&apos;artefacts d&apos;attaques dans un SIEM.
            </p>

            {/* Quick Status Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-ivory-dim pt-2">
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#141820] border border-[#222934]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="text-ivory">Moteur Souverain Actif</span>
              </span>
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#141820] border border-[#222934]">
                <Zap className="w-3.5 h-3.5 text-gold" />
                <span>Compatible Modèles Gratuits (Opencode / Omniroute)</span>
              </span>
              <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#141820] border border-[#222934]">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Confidentialité &amp; Zéro Télémétrie Vendue</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LE STUDIO INTERACTIF EN DIRECT */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Sandbox */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-gold">
                  Console Opérationnelle
                </h2>
                <h3 className="text-2xl font-bold text-ivory">
                  Interrogez RayBot en Temps Réel
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Prêt à répondre</span>
              </span>
            </div>

            <p className="text-xs text-ivory-muted leading-relaxed">
              Testez une question conceptuelle, demandez une explication sur la création de Python, soumettez un cas de détection d&apos;incident ou préparez un entretien d&apos;embauche.
            </p>

            <InteractiveAiWidget />
          </div>

          {/* Right: How to use & Architecture */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#141820] rounded-3xl border border-[#222935] p-7 space-y-6">
              <h3 className="text-base font-bold text-ivory flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-gold" />
                <span>Modes de Fonctionnement</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0f1217] border border-[#1f2633] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gold font-mono">1. Moteur Souverain RayLab (Local)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">Par défaut</span>
                  </div>
                  <p className="text-ivory-muted leading-relaxed">
                    Fournit des réponses techniques instantanées, déterministes et validées par les ingénieurs du Lab, sans dépendance externe ni latence réseau.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0f1217] border border-[#1f2633] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ivory font-mono">2. Modèles Gratuits Opencode &amp; Omniroute</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono">Optionnel</span>
                  </div>
                  <p className="text-ivory-muted leading-relaxed">
                    Permet de router vos questions vers des modèles open-source de pointe (Llama 3, DeepSeek, Qwen) via les passerelles gratuites d&apos;Opencode ou le routeur Omniroute.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0f1217] border border-[#1f2633] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ivory font-mono">3. Clé API Personnalisée</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono">BYOK</span>
                  </div>
                  <p className="text-ivory-muted leading-relaxed">
                    Vous pouvez insérer votre propre clé API (stockée uniquement dans le localStorage de votre navigateur) pour un contrôle total de votre consommation de tokens.
                  </p>
                </div>
              </div>

              {/* Sample Prompts to Try */}
              <div className="pt-4 border-t border-[#1e2530] space-y-3">
                <h4 className="text-xs font-mono font-bold text-ivory uppercase tracking-wider">
                  Exemples de Requêtes Types :
                </h4>
                <div className="space-y-2 text-xs font-mono text-ivory-dim">
                  <div className="p-2.5 rounded-lg bg-[#101319] border border-[#1e2530]">
                    « Quand a été créé Python et pourquoi Guido van Rossum l&apos;a nommé ainsi ? »
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#101319] border border-[#1e2530]">
                    « Donne-moi un exemple concret d&apos;attaque violant l&apos;Intégrité mais pas la Confidentialité. »
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#101319] border border-[#1e2530]">
                    « Comment sécuriser un script Python qui lit des fichiers système sensibles ? »
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LES 4 RÔLES DE RAYBOT */}
      <section className="py-20 bg-[#0d0f13] border-y border-[#1c222b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-gold">
              Capacités &amp; Spécialisations
            </h2>
            <p className="text-3xl font-black text-ivory">
              Quatre Domaines d&apos;Intervention Précis
            </p>
            <p className="text-xs sm:text-sm text-ivory-dim">
              RayBot est entraîné pour répondre avec la rigueur d&apos;un ingénieur senior, sans raccourcis trompeurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Mentor Python */}
            <div className="bg-[#141820] p-8 rounded-3xl border border-[#222935] hover:border-gold/50 transition-all duration-300 space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ivory">
                1. Mentor Python &amp; Audit d&apos;Architecture
              </h3>
              <p className="text-xs text-ivory-muted leading-relaxed">
                RayBot relit vos scripts, identifie la complexité algorithmique en notation Big-O ($\mathcal O(1), \mathcal O(n), \mathcal O(n \log n)$), signale les fuites de mémoire et veille au respect scrupuleux de la PEP 8 et du typage statique (\`mypy\`).
              </p>
              <ul className="space-y-2 text-xs text-ivory-dim pt-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-gold" />
                  <span>Programmation Orientée Objet &amp; Design Patterns</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-gold" />
                  <span>Traitement des flux et fichiers volumineux (générateurs)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-gold" />
                  <span>Prévention des vulnérabilités (\`pickle\`, injections)</span>
                </li>
              </ul>
            </div>

            {/* 2. Analyste SOC */}
            <div className="bg-[#141820] p-8 rounded-3xl border border-[#222935] hover:border-blue-500/50 transition-all duration-300 space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ivory">
                2. Blue Team &amp; Enquêtes SOC
              </h3>
              <p className="text-xs text-ivory-muted leading-relaxed">
                RayBot vous aide à décoder les alertes de SIEM (*Wazuh, Splunk*), à repérer les requêtes malveillantes dans les journaux de serveurs web (SQLi, Path Traversal, XSS) et à qualifier les faux positifs selon le framework NIST.
              </p>
              <ul className="space-y-2 text-xs text-ivory-dim pt-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>Analyse des journaux Windows Event Logs &amp; Syslog</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>Cartographie des tactiques MITRE ATT&amp;CK</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>Rédaction de règles de corrélation et playbooks</span>
                </li>
              </ul>
            </div>

            {/* 3. Réseaux & Systèmes */}
            <div className="bg-[#141820] p-8 rounded-3xl border border-[#222935] hover:border-emerald-500/50 transition-all duration-300 space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ivory">
                3. Systèmes Linux &amp; Protocoles Réseau
              </h3>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Comprenez chaque étape de la poignée de main TCP (SYN, SYN-ACK, ACK), interprétez des captures Wireshark, dépannez la résolution DNS et maîtrisez les permissions Unix (\`chmod\`, SUID/SGID, chroot).
              </p>
              <ul className="space-y-2 text-xs text-ivory-dim pt-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sockets Berkeley et architecture client-serveur</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Diagnostic des services d&apos;infrastructure avec \`systemd\`</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Durcissement de serveurs Linux &amp; conteneurs Docker</span>
                </li>
              </ul>
            </div>

            {/* 4. Carrière & CV */}
            <div className="bg-[#141820] p-8 rounded-3xl border border-[#222935] hover:border-purple-500/50 transition-all duration-300 space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-ivory">
                4. Coaching Carrière &amp; Audit de CV ATS
              </h3>
              <p className="text-xs text-ivory-muted leading-relaxed">
                RayBot simule des entretiens d&apos;embauche réels en posant les questions techniques pièges des recruteurs, et audite votre CV pour garantir une compatibilité maximale avec les analyseurs ATS européens.
              </p>
              <ul className="space-y-2 text-xs text-ivory-dim pt-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>Application de la formule Google XYZ pour vos puces de CV</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>Simulation d&apos;entretiens techniques pour postes Junior / L1</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>Préparation aux certifications officielles (Security+, CCNA)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OÙ RETROUVER RAYBOT DANS LE SITE ? */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gold">
            Intégration Continue
          </h2>
          <p className="text-3xl font-black text-ivory">
            RayBot Présent Partout sur RayLab
          </p>
          <p className="text-xs text-ivory-dim">
            Vous n&apos;êtes jamais bloqué : RayBot est accessible en un clic dans chaque espace de travail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#141820] p-6 rounded-2xl border border-[#222935] space-y-3">
            <div className="text-xs font-mono text-gold font-bold">DANS LES LEÇONS</div>
            <h4 className="text-base font-bold text-ivory">Lecteur de Cours Interactif</h4>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Dans chaque leçon, un panneau latéral permet d&apos;interroger RayBot sur le code ou de demander un indice sans donner la solution brute.
            </p>
            <Link
              href="/paths"
              className="inline-flex items-center space-x-1 text-xs text-gold hover:text-gold-light pt-2 font-mono"
            >
              <span>Voir les Cursus →</span>
            </Link>
          </div>

          <div className="bg-[#141820] p-6 rounded-2xl border border-[#222935] space-y-3">
            <div className="text-xs font-mono text-emerald-400 font-bold">DANS LE LAB PROJETS</div>
            <h4 className="text-base font-bold text-ivory">Revue de Code GitHub</h4>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Avant de publier vos projets (FIM, Log Analyzer, Network Scanner) sur GitHub, faites auditer vos spécifications par RayBot.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center space-x-1 text-xs text-gold hover:text-gold-light pt-2 font-mono"
            >
              <span>Explorer les Projets →</span>
            </Link>
          </div>

          <div className="bg-[#141820] p-6 rounded-2xl border border-[#222935] space-y-3">
            <div className="text-xs font-mono text-purple-400 font-bold">DANS L&apos;ESPACE CARRIÈRE</div>
            <h4 className="text-base font-bold text-ivory">Générateur de CV ATS</h4>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Le constructeur de CV intègre un assistant IA pour calculer votre score d&apos;impact et reformuler vos réalisations selon les standards des recruteurs.
            </p>
            <Link
              href="/career/cv-builder"
              className="inline-flex items-center space-x-1 text-xs text-gold hover:text-gold-light pt-2 font-mono"
            >
              <span>Créer mon CV ATS →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ENGAGEMENT DE CONFIDENTIALITÉ & ÉTHIQUE */}
      <section className="py-16 bg-[#101319] border-t border-[#1c222b]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-ivory">
            Confidentialité Totale et Éthique Rigoureuse
          </h3>
          <p className="text-xs text-ivory-muted leading-relaxed max-w-2xl mx-auto">
            Vos questions, votre code et vos notes d&apos;apprentissage ne sont ni conservés sur des serveurs tiers ni revendus pour entraîner des modèles commerciaux. RayLab privilégie l&apos;autonomie intellectuelle de l&apos;apprenant : RayBot guide vers la compréhension, il ne fait pas le travail à votre place.
          </p>
          <div className="pt-4">
            <Link
              href="/about"
              className="px-6 py-2.5 rounded-xl bg-[#181d26] hover:bg-[#202734] border border-[#2c3645] text-xs font-mono text-gold inline-flex items-center space-x-2"
            >
              <span>Consulter les 10 Principes Directeurs du Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
