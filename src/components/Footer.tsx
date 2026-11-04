import React from "react";
import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b0d10] border-t border-[#1c222b] mt-24 text-ivory-dim text-xs">
      {/* Top Banner / Pre-footer */}
      <div className="border-b border-[#1c222b] bg-gradient-to-r from-[#12161f] via-[#10131a] to-[#12161f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-ivory">
              Prêt à développer des compétences techniques concrètes ?
            </h3>
            <p className="text-xs text-ivory-muted max-w-xl">
              Rejoignez RayLab pour apprendre Python, maîtriser l&apos;administration Linux, comprendre les réseaux et concevoir des outils de cybersécurité opérationnels.
            </p>
          </div>
          <Link
            href="/paths"
            className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs tracking-wider uppercase transition-all shadow-gold flex items-center space-x-2"
          >
            <span>Explorer le Programme</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1c222b]">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base tracking-wider text-ivory">
                Ray<span className="text-gold">Lab</span>
              </span>
            </div>
            <p className="text-xs text-gold/90 font-mono tracking-wider uppercase">
              Learn. Build. Secure. Become.
            </p>
            <p className="text-[12px] text-ivory-dim leading-relaxed">
              Plateforme personnelle et académique dédiée à l&apos;apprentissage rigoureux de l&apos;informatique, du développement logiciel et de la cybersécurité défensive.
            </p>
          </div>

          {/* Col 2: Académies */}
          <div className="space-y-3">
            <h4 className="font-bold text-ivory text-xs uppercase tracking-wider font-mono">
              Académies &amp; Cursus
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/paths/python-academy" className="hover:text-gold transition-colors">
                  Programming Academy (Python 1 à 7)
                </Link>
              </li>
              <li>
                <Link href="/paths/cybersecurity-academy" className="hover:text-gold transition-colors">
                  Cybersecurity Academy &amp; Blue Team SOC
                </Link>
              </li>
              <li>
                <Link href="/paths/systems-networks-academy" className="hover:text-gold transition-colors">
                  Systems &amp; Networks (Linux &amp; TCP/IP)
                </Link>
              </li>
              <li>
                <Link href="/paths/career-launchpad" className="hover:text-gold transition-colors">
                  Professional Career Launchpad
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Projets & Carrière */}
          <div className="space-y-3">
            <h4 className="font-bold text-ivory text-xs uppercase tracking-wider font-mono">
              Ressources &amp; Projets
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/lab" className="hover:text-gold transition-colors text-gold flex items-center space-x-1 font-semibold">
                  <span>Labo Virtuel &amp; Terminal Interactif</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-gold transition-colors">
                  Laboratoire de Projets Open Source
                </Link>
              </li>
              <li>
                <Link href="/career/cv-builder" className="hover:text-gold transition-colors">
                  Générateur de CV Compatible ATS
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-gold transition-colors">
                  Guide des Certifications Officielles
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-gold transition-colors">
                  Roadmaps Métiers Cybersécurité &amp; Dev
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Le Lab & Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-ivory text-xs uppercase tracking-wider font-mono">
              Le Projet RayLab
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  La Vision &amp; Les Principes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contacter le Lab / Échanger
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-ivory-dim leading-relaxed">
                Les travaux offensifs présentés s&apos;effectuent exclusivement en environnements de simulation isolés.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ivory-dim gap-4">
          <p>© {new Date().getFullYear()} RayLab. Tous droits réservés.</p>
          <div className="flex items-center space-x-4 font-mono text-[11px] text-gold tracking-wider uppercase">
            <span>Learn • Build • Secure • Become</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
