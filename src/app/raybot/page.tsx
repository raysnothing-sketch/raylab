import React from "react";
import Link from "next/link";
import { Terminal, Shield, ArrowRight, Network, KeyRound, FileSearch, Lock, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Labo Virtuel & Terminal Interactif — RayLab",
  description:
    "Le simulateur conversationnel a été remplacé par le Laboratoire Virtuel & Terminal Interactif RayLab, conçu pour l'apprentissage pratique 70/30 de la cybersécurité et de Python.",
};

export default function RayBotPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-center">
      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-mono border border-gold/40">
        <Terminal className="w-3.5 h-3.5 text-gold animate-pulse" />
        <span>NOUVEAU PARADIGME : 70% PRATIQUE / 30% THÉORIE</span>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight">
          Bienvenue dans le <span className="text-gold">Labo Virtuel</span> RayLab
        </h1>
        <p className="text-sm sm:text-base text-ivory-muted leading-relaxed">
          Pour garantir un apprentissage concret, rigoureux et sans réponses préconçues, RayLab privilégie désormais l&apos;expérimentation pratique directe. Notre <strong>Laboratoire Virtuel &amp; Terminal Interactif</strong> remplace le mentor conversationnel pour vous permettre de manipuler du vrai code, des sockets et des trames réseau en direct dans votre navigateur.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="p-6 rounded-2xl bg-[#12161f] border border-[#232b38] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ivory text-base">Terminal Python Sandbox</h3>
          <p className="text-xs text-ivory-dim leading-relaxed">
            Exécutez vos algorithmes, scripts de balayage réseau et parsers avec console temps réel et métriques d&apos;exécution.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#12161f] border border-[#232b38] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
            <Network className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ivory text-base">Scanner de Ports TCP &amp; Scapy</h3>
          <p className="text-xs text-ivory-dim leading-relaxed">
            Simulez des handshakes à 3 voies (SYN/ACK), construisez des trames ARP et analysez les vecteurs Man-in-the-Middle.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#12161f] border border-[#232b38] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
            <FileSearch className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ivory text-base">Analyseur SOC &amp; Moniteur FIM</h3>
          <p className="text-xs text-ivory-dim leading-relaxed">
            Détectez les injections SQL et traversées de répertoires dans des logs bruts et surveillez l&apos;intégrité SHA-256 de fichiers système.
          </p>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/lab"
          className="px-8 py-3.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider shadow-gold flex items-center space-x-2 transition-all"
        >
          <span>Ouvrir le Laboratoire Virtuel</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/paths"
          className="px-8 py-3.5 rounded-xl bg-[#161a22] hover:bg-[#1d232e] border border-[#252c38] text-ivory font-semibold text-xs uppercase tracking-wider transition-all"
        >
          <span>Consulter les Cursus Complets</span>
        </Link>
      </div>
    </div>
  );
}
