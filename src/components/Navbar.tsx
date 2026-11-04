"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  BookOpen,
  Code2,
  Briefcase,
  Info,
  Mail,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Award,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const { setIsAiDrawerOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "À Propos & Vision", href: "/about" },
    { label: "Académies & Cursus", href: "/paths" },
    { label: "RayBot IA", href: "/raybot", highlight: true },
    { label: "Projets du Lab", href: "/projects" },
    { label: "Carrière & Certifs", href: "/career" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#101216]/95 backdrop-blur-md border-b border-[#20252C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1e242d] to-[#12151b] border border-gold/40 flex items-center justify-center text-gold group-hover:border-gold transition-all duration-300 shadow-gold">
              <Shield className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-ivory flex items-center gap-0.5">
                Ray<span className="text-gold font-black">Lab</span>
              </span>
              <span className="text-[10px] text-ivory-dim font-mono tracking-widest uppercase">
                Learn • Build • Secure • Become
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-xs font-medium tracking-wide transition-all flex items-center space-x-1.5 ${
                    item.highlight
                      ? isActive
                        ? "text-gold bg-gold/15 border border-gold font-bold shadow-sm"
                        : "text-amber-300 bg-gold/5 border border-gold/30 hover:bg-gold/15 hover:border-gold"
                      : isActive
                      ? "text-gold bg-gold/10 border border-gold/30 font-semibold"
                      : "text-ivory-muted hover:text-ivory hover:bg-[#181d24]"
                  }`}
                >
                  {item.highlight && <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* AI Assistant Button */}
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#161a22] hover:bg-[#1d232e] border border-gold/40 text-gold text-xs font-semibold flex items-center space-x-2 transition-all shadow-sm group"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-gold" />
              <span>RayBot IA</span>
            </button>

            {/* Main Action Button */}
            <Link
              href="/paths"
              className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs tracking-wide shadow-gold transition-all duration-200 flex items-center space-x-1.5 group"
            >
              <span>Découvrir les Cursus</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="p-2 rounded-lg text-gold bg-gold/10 border border-gold/30"
              title="Ouvrir l'IA"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-ivory-dim hover:text-ivory bg-[#181d24] border border-[#262e3b]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#20252C] bg-[#12151b] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-xs font-medium ${
                item.highlight
                  ? "text-gold bg-gold/10 border border-gold/30 font-bold"
                  : "text-ivory-muted hover:text-ivory hover:bg-[#1a1f29]"
              }`}
            >
              {item.highlight ? "✨ " : ""}{item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#1d232e]">
            <Link
              href="/paths"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gold text-[#101216] font-bold text-xs flex items-center justify-center space-x-2 shadow-gold"
            >
              <span>Explorer les Cursus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
