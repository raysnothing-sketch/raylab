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
          Un espace d&apos;apprentissage technique exigeant, con&ccedil;u pour relier les th&eacute;ories informatiques &agrave; la pratique concr&egrave;te et &agrave; la valorisation professionnelle.
        </p>
      </div>

      {/* Official Lab Banner Visual */}
      <div className="relative rounded-3xl overflow-hidden border border-[#232a35] shadow-2xl group">
        <img
          src="/raylab-banner.png"
          alt="Banniere Officielle RayLab - Learn. Build. Secure. Become."
          className="w-full h-auto object-cover max-h-[440px] group-hover:scale-[1.01] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101216]/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-6 text-xs font-mono text-gold flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span>Banniere Officielle RayLab &bull; Learn. Build. Secure. Become.</span>
        </div>
      </div>

      {/* Origin Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6 text-sm text-ivory-muted leading-relaxed">
          <h2 className="text-2xl font-bold text-ivory">
            Pourquoi le nom &laquo; LAB &raquo; ?
          </h2>
          <p>
            Le terme <strong>&laquo; Lab &raquo;</strong> &eacute;voque la recherche, l&apos;exp&eacute;rimentation, la construction continue et l&apos;exigence technique. RayLab ne se veut pas une simple biblioth&egrave;que de tutoriels passifs o&ugrave; l&apos;on regarde du code sans le comprendre.
          </p>
          <p>
            La plateforme r&eacute;pond &agrave; un double objectif :
          </p>
          <ul className="space-y-3 pl-4 border-l-2 border-gold/40">
            <li className="text-ivory">
              <strong>1. Usage Personnel :</strong> Fournir &agrave; son cr&eacute;ateur un environnement structur&eacute; pour apprendre, pratiquer, suivre ses objectifs, pr&eacute;parer des certifications de r&eacute;f&eacute;rence et documenter ses projets.
            </li>
            <li className="text-ivory">
              <strong>2. Usage Public :</strong> Offrir &agrave; la communaut&eacute; et aux apprenants des parcours p&eacute;dagogiques progressifs, fiables, ax&eacute;s sur des comp&eacute;tences d&eacute;montrables et reconnues sur le march&eacute; du travail.
            </li>
          </ul>
        </div>

        <div className="lg:col-span-5 bg-[#141820] rounded-3xl border border-[#222935] p-8 space-y-5 text-xs font-mono">
          <div className="text-gold font-bold uppercase tracking-wider text-sm">
            La Signature Fondatrice
          </div>
          <div className="space-y-3 text-ivory-dim">
            <div className="p-3 bg-[#101216] rounded-xl border border-[#1f2632]">
              <span className="text-gold font-bold">LEARN :</span> Comprendre les concepts fondamentaux sans pr&eacute;requis implicites.
            </div>
            <div className="p-3 bg-[#101216] rounded-xl border border-[#1f2632]">
              <span className="text-emerald-400 font-bold">BUILD :</span> D&eacute;velopper des outils logiciels r&eacute;els et v&eacute;rifiables.
            </div>
            <div className="p-3 bg-[#101216] rounded-xl border border-[#1f2632]">
              <span className="text-blue-400 font-bold">SECURE :</span> Int&eacute;grer les principes d&eacute;fensifs et la l&eacute;galit&eacute; d&egrave;s la conception.
            </div>
            <div className="p-3 bg-[#101216] rounded-xl border border-[#1f2632]">
              <span className="text-purple-400 font-bold">BECOME :</span> B&acirc;tir une identit&eacute; professionnelle cr&eacute;dible et reconnue.
            </div>
          </div>
        </div>
      </div>

      {/* The 10 Guiding Principles */}
      <div className="bg-[#0f1217] rounded-3xl border border-[#1f2633] p-8 lg:p-12 space-y-8">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-widest text-gold mb-1">
            &Eacute;thique &amp; Rigueur
          </h2>
          <p className="text-2xl font-bold text-ivory">
            Les 10 Principes Directeurs D&eacute;finitifs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-ivory-muted">
          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">1. La qualit&eacute; prime sur la quantit&eacute;</h4>
            <p>Mieux vaut ma&icirc;triser en profondeur les structures de donn&eacute;es Python que survoler vingt frameworks superficiellement.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">2. Les fondamentaux pr&eacute;c&egrave;dent les sp&eacute;cialisations</h4>
            <p>La compr&eacute;hension des r&eacute;seaux (TCP/IP) et du noyau Linux est indispensable avant d&apos;aborder la cybers&eacute;curit&eacute; avanc&eacute;e.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">3. Chaque notion doit pouvoir &ecirc;tre appliqu&eacute;e</h4>
            <p>Toute le&ccedil;on s&apos;accompagne d&apos;exemples concrets, d&apos;exercices d&apos;entra&icirc;nement ou d&apos;un projet pratique.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">4. Les projets d&eacute;montrent des comp&eacute;tences</h4>
            <p>Un recruteur juge sur du code propre, test&eacute;, document&eacute; et versionn&eacute; sur GitHub, pas sur des affirmations vagues.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">5. Des ressources fiables et actualis&eacute;es</h4>
            <p>Les cours mentionnent les dates de v&eacute;rification et renvoient vers la documentation officielle des technologies.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">6. Transparence sur les certifications</h4>
            <p>RayLab ne pr&eacute;tend jamais qu&apos;un cours interne remplace un examen d&apos;&Eacute;tat ou une certification internationale (Sec+, CCNA).</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">7. Accessibilit&eacute; universelle</h4>
            <p>Les connaissances de base doivent rester accessibles gratuitement &agrave; tous les apprenants s&eacute;rieux et autodidactes.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">8. La s&eacute;curit&eacute; d&egrave;s la conception</h4>
            <p>Aucune pratique offensive n&apos;est encourag&eacute;e hors de laboratoires isol&eacute;s et explicitement autoris&eacute;s.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">9. Respect de la vie priv&eacute;e</h4>
            <p>Les objectifs personnels, notes priv&eacute;es et statistiques d&apos;apprentissage des utilisateurs restent strictement prot&eacute;g&eacute;s.</p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[#141820] border border-[#222935]">
            <h4 className="font-bold text-ivory">10. &Eacute;volution continue</h4>
            <p>La plateforme s&apos;adapte en permanence aux r&eacute;alit&eacute;s du march&eacute; de l&apos;emploi et aux avanc&eacute;es technologiques.</p>
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
            href="/career"
            className="px-6 py-3 rounded-xl bg-[#1b212b] hover:bg-[#232b38] border border-[#2d3644] text-ivory font-semibold text-xs uppercase tracking-wider"
          >
            Centre de Carri&egrave;re
          </Link>
        </div>
      </div>
    </div>
  );
}
