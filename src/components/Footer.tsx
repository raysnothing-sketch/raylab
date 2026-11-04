import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Terminal } from "lucide-react";

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
              Rejoignez RayLab pour apprendre Python, maîtriser l&apos;administration Linux, comprendre les réseaux TCP/IP et concevoir des outils de cybersécurité opérationnels.
            </p>
          </div>
          <Link
            href="/paths"
            className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs tracking-wider uppercase transition-all shadow-gold flex items-center space-x-2"
          >
            <span>Explorer les 8 Académies</span>
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
              <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center text-gold overflow-hidden">
                <img src="/raylab-logo.png" alt="RayLab Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-extrabold text-base tracking-wider text-ivory">
                Ray<span className="text-gold">Lab</span>
              </span>
            </div>
            <p className="text-xs text-gold/90 font-mono tracking-wider uppercase">
              Learn • Build • Secure • Become
            </p>
            <p className="text-[12px] text-ivory-dim leading-relaxed">
              Plateforme d&apos;apprentissage pratique et laboratoire d&apos;ingénierie spécialisé dans la programmation, l&apos;administration système et la cybersécurité opérationnelle.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#141820] border border-[#202733] text-[11px] font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Base Turso Cloud Connectée</span>
              </span>
            </div>
          </div>

          {/* Col 2: Académies (Section 6) */}
          <div className="space-y-3">
            <h4 className="font-bold text-ivory text-xs uppercase tracking-wider font-mono">
              Académies Spécialisées
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/paths/python-academy" className="hover:text-gold transition-colors">
                  Académie Python (Niveaux 1 à 6)
                </Link>
              </li>
              <li>
                <Link href="/paths/systems-networks-academy" className="hover:text-gold transition-colors">
                  Académie Linux &amp; Systèmes
                </Link>
              </li>
              <li>
                <Link href="/paths/reseaux-academy" className="hover:text-gold transition-colors">
                  Académie Réseaux TCP/IP
                </Link>
              </li>
              <li>
                <Link href="/paths/cybersecurity-academy" className="hover:text-gold transition-colors">
                  Académie Blue Team &amp; SOC
                </Link>
              </li>
              <li>
                <Link href="/paths/ethical-hacking-python" className="hover:text-gold transition-colors">
                  Académie Pentesting Encadré
                </Link>
              </li>
              <li>
                <Link href="/paths/forensics-dfir-academy" className="hover:text-gold transition-colors">
                  Académie Forensique DFIR
                </Link>
              </li>
              <li>
                <Link href="/paths/cloud-devsecops-academy" className="hover:text-gold transition-colors">
                  Académie Cloud &amp; DevSecOps
                </Link>
              </li>
              <li>
                <Link href="/paths/cyberpath-2026-2027" className="hover:text-gold transition-colors text-gold font-semibold">
                  ★ CyberPath Master (12 Volumes)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Laboratoire & Projets (Section 9 & 10) */}
          <div className="space-y-3">
            <h4 className="font-bold text-ivory text-xs uppercase tracking-wider font-mono">
              Laboratoire &amp; Projets
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/lab" className="hover:text-gold transition-colors text-gold flex items-center space-x-1.5 font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Laboratoire Virtuel Sandboxé</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-gold transition-colors">
                  Laboratoire des 7 Projets Capstones
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-gold transition-colors text-gold font-medium">
                  Portfolio Public de Compétences
                </Link>
              </li>
              <li>
                <Link href="/career/cv-builder" className="hover:text-gold transition-colors">
                  Générateur de CV Format ATS
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

          {/* Col 4: Le Projet RayLab */}
          <div className="space-y-3">
            <h4 className="font-bold text-ivory text-xs uppercase tracking-wider font-mono">
              La Plateforme
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  La Vision &amp; Les 10 Principes
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-gold transition-colors">
                  Mon Espace Apprenant
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-ivory-dim leading-relaxed border-t border-[#1a202c]">
                <strong>Éthique &amp; Légalité :</strong> Les exercices offensifs s&apos;exécutent exclusivement en environnements locaux sandboxés et autorisés.
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
