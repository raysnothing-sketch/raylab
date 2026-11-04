"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, MessageSquare, Send, CheckCircle2, Shield, MapPin, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-ivory tracking-tight">
          Contacter RayLab
        </h1>
        <p className="text-sm text-ivory-muted leading-relaxed">
          Une question sur un cursus, un retour d&apos;expérience sur un projet ou une proposition de collaboration ? Écrivez-nous directement via le formulaire ci-dessous.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#141820] rounded-3xl border border-[#222935] p-8 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-ivory text-base">RayLab</h3>
                <p className="text-xs text-gold/80 font-mono">Institut &amp; Laboratoire Technique</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-ivory-muted border-t border-[#1f2733] pt-6 font-mono">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-ivory font-bold">Email Direct</div>
                  <div>contact@raylab.tech</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-ivory font-bold">Localisation</div>
                  <div>Paris, France &amp; Berlin, Allemagne</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-ivory font-bold">Délai de Réponse</div>
                  <div>Moins de 24 à 48 heures ouvrées</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="lg:col-span-7">
          <div className="bg-[#141820] rounded-3xl border border-[#222935] p-8 sm:p-10">
            {submitted ? (
              <div className="p-8 text-center space-y-4 font-mono">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-ivory">Message Envoyé !</h3>
                <p className="text-xs text-ivory-muted max-w-md mx-auto">
                  Merci pour votre message. L&apos;équipe de RayLab reviendra vers vous très rapidement.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-xl bg-[#1a202a] text-xs text-gold border border-gold/30 hover:bg-gold hover:text-[#101216] transition-all"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-ivory">Votre Nom *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alexandre D."
                      className="w-full bg-[#101216] border border-[#252e3c] rounded-xl px-3.5 py-2.5 text-ivory placeholder-ivory-dim focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-ivory">Votre Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexandre@example.com"
                      className="w-full bg-[#101216] border border-[#252e3c] rounded-xl px-3.5 py-2.5 text-ivory placeholder-ivory-dim focus:outline-none focus:border-gold font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-ivory">Objet du message *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Question sur le cursus Python &amp; SOC..."
                    className="w-full bg-[#101216] border border-[#252e3c] rounded-xl px-3.5 py-2.5 text-ivory placeholder-ivory-dim focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-ivory">Votre Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Détaillez votre demande ou votre projet..."
                    className="w-full bg-[#101216] border border-[#252e3c] rounded-xl p-3.5 text-ivory placeholder-ivory-dim focus:outline-none focus:border-gold leading-relaxed resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold text-xs uppercase tracking-wider shadow-gold transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer mon Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
