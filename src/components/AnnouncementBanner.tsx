"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("raylab_banner_dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("raylab_banner_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#12161f] via-[#1a202c] to-[#12161f] border-b border-[#2b3543] text-ivory text-xs px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Banner Content */}
        <div className="flex-1 flex items-center justify-center space-x-2.5 text-center">
          <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/40 text-[10px] font-mono font-bold">
            <Sparkles className="w-3 h-3 text-gold animate-pulse" />
            <span>NOUVEAU</span>
          </span>

          <p className="text-xs text-ivory-muted leading-tight">
            <span className="text-ivory font-semibold">RayBot AI Mentor 2.0 est en ligne :</span>{" "}
            <span className="hidden md:inline">Auditez votre code Python, décodez les alertes SOC et préparez vos entretiens.</span>
          </p>

          <Link
            href="/raybot"
            className="inline-flex items-center space-x-1 text-gold hover:text-gold-light font-bold text-xs underline underline-offset-4 decoration-gold/50 hover:decoration-gold transition-all ml-1"
          >
            <span>Tester l&apos;IA</span>
            <ArrowRight className="w-3.5 h-3.5 inline-block" />
          </Link>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="p-1 rounded-md text-ivory-dim hover:text-ivory hover:bg-[#202734] transition-colors"
          aria-label="Fermer la bannière"
          title="Fermer la bannière"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
