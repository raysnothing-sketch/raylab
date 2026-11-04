import React from "react";
import Link from "next/link";
import { Shield, Target, Award, CheckCircle2, ArrowRight, Heart, Sparkles, Terminal, Lock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono border border-gold/30">
          <Shield className="w-3.5 h-3.5" />
          <span>Histoire &amp; Principes Fondateurs</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight">
          La Vision de RayLab
        </h1>
        <p className="text-base text-ivory-muted leading-relaxed">
          Un espace d&apos;apprentissage technique exigeant, conçu pour relier les théories informatiques à la pratique concrète et à la valorisation professionnelle.
        </p>
      </div>

      {/* Official Lab Banner Visual */}
      <div className="relative rounded-3xl overflow-hidden border border-[#232a35] shadow-2xl group">
        <img
          src="/raylab-banner.jpg"
          alt="Bannière Officielle RayLab — Learn. Build. Secure. Become."
          className="w-full h-auto object-cover max-h-[440px] group-hover:scale-[1.01] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101216]/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-6 text-xs font-mono text-gold flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span>Bannière Officielle RayLab • Learn. Build. Secure. Become.</span>
        </div>
      </div>

      {/* Origin Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6 text-sm text-ivory-muted leading-relaxed">
          <h2 className="text-2xl font-bold text-ivory">
            Pourquoi le nom « LAB » ?
          </h2>
          <p>
            Le terme <strong>« Lab »</strong> évoque la recherche, l&apos;expérimentation, la construction continue et l&apos;exigence technique. RayLab ne se veut pas une simple bibliothèque de tutoriels passifs où l&apos;on regarde du code sans le comprendre.
          </p>
          <p>
            La plateforme répond à un double objectif :
          </p>
          <ul className="space-y-3 pl-4 border-l-2 border-gold/40">
            <li className="text-ivory">
              <strong>1. Usage Personnel :</strong> Fournir à son créateur un environnement structuré pour apprendre, pratiquer, suivre ses objectifs, préparer des certifications de référence et documenter ses projets.
            </li>
            <li className="text-ivory">
              <strong>2. Usage Public :</strong> Offrir à la communauté et aux apprenants des parcours pédagogiques progressifs, fiables, axés sur des compétences démontrables et reconnues sur le marché du travail.
            </li>
          </ul>
        </div>

        <div className="lg:col-span-5 bg-[#141820] rounded-3xl border border-[#222935] p-8 space-y-5 text-xs font-mono">
          <div className="text-gold font-bold uppercase tracking-wider text-sm">
            La Signature Fondatrice
          </div>
          <div className="space-y-3 text-ivory-dim">
            <div className="p-3 bg-[#101216] rounded-xl border border-[#1f2632]">
              <span className="text-gold font-bold">LEARN :</span> Comprendre les concepts fondamentaux sans prérequis implicites.
            </div>
            <div className="p-3 bg-[#101216] rounded-xl border border-[#1f2632]">
              <span className="text-emerald-400 font-bold">BUILD :</span> Développer des outils logiciels réels et vérifiables.
            </div>
            <div className="p-3 bg-[#101216] rounded-xl border border-[#1f2632]">
              <span className="text-blue-400 font-bold">SECURE :</span> Intégrer les principes défensifs et la légalité dès la conception.
            </div>
            <div className="p-3 bg-[#101216] rounded-xl border border-[#1f2632]">
              <span className="text-purple-400 font-bold">BECOME :</span> Bâtir une identité professionnelle crédible et reconnue.
            </div>
          </div>
        </div>
      </div>

      {/* The 10 Guiding Principles */}
      <div className="bg-[#0f1217] rounded-3xl border border-[#1f2633] p-8 lg:p-12 space-y-8">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-widest text-gold mb-1">
            Éthique &amp; Rigueur
          </h2>
          <p className="text-2xl font-bold text-ivory">
            Les 10 Principes Directeurs Définitifs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-ivory-muted">
          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">1. La qualité prime sur la quantité</h4>
            <p>Mieux vaut maîtriser en profondeur les structures de données Python que survoler vingt frameworks superficiellement.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">2. Les fondamentaux précèdent les spécialisations</h4>
            <p>La compréhension des réseaux (TCP/IP) et du noyau Linux est indispensable avant d&apos;aborder la cybersécurité avancée.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">3. Chaque notion doit pouvoir être appliquée</h4>
            <p>Toute leçon s&apos;accompagne d&apos;exemples concrets, d&apos;exercices d&apos;entraînement ou d&apos;un projet pratique.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">4. Les projets démontrent des compétences</h4>
            <p>Un recruteur juge sur du code propre, testé, documenté et versionné sur GitHub, pas sur des affirmations vagues.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">5. Des ressources fiables et actualisées</h4>
            <p>Les cours mentionnent les dates de vérification et renvoient vers la documentation officielle des technologies.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">6. Transparence sur les certifications</h4>
            <p>RayLab ne prétend jamais qu&apos;un cours interne remplace un examen d&apos;État ou une certification internationale (Sec+, CCNA).</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">7. Accessibilité universelle</h4>
            <p>Les connaissances de base doivent rester accessibles gratuitement à tous les apprenants sérieux et autodidactes.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">8. La sécurité dès la conception</h4>
            <p>Aucune pratique offensive n&apos;est encouragée hors de laboratoires isolés et explicitement autorisés.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">9. Respect de la vie privée</h4>
            <p>Les objectifs personnels, notes privées et statistiques d&apos;apprentissage des utilisateurs restent strictement protégés.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">10. Évolution continue</h4>
            <p>La plateforme s&apos;adapte en permanence aux réalités du marché de l&apos;emploi et aux avancées technologiques.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center pt-8 space-y-4">
        <h3 className="text-xl font-bold text-ivory">
          Rejoignez l&apos;aventure RayLab
        </h3>
        <div className="flex justify-center gap-4">
          <Link
            href="/paths"
            className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider shadow-gold"
          >
            Explorer les Cursus
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-[#1b212b] hover:bg-[#232b38] border border-[#2d3644] text-ivory font-semibold text-xs uppercase tracking-wider"
          >
            Nous Contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
