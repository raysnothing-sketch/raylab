"use client";

import React, { useState, useEffect } from "react";
import { Bot, Send, Sparkles, Key } from "lucide-react";

export default function InteractiveAiWidget() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<"built-in" | "omniroute" | "opencode">("built-in");
  const [customKey, setCustomKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [conversation, setConversation] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content:
        "👋 Bienvenue sur le démonstrateur IA **RayBot** ! Vous pouvez me poser une question sur le cursus Python, l'architecture réseau, la détection SOC ou tester un cas d'étude.",
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("raylab_ai_key");
    if (saved) setCustomKey(saved);
  }, []);

  const handleSaveKey = (val: string) => {
    setCustomKey(val);
    localStorage.setItem("raylab_ai_key", val);
  };

  const quickPrompts = [
    { label: "Quand a été créé Python ?", text: "Quand a été créé le langage Python et par qui ?" },
    { label: "Triade CIA", text: "Donne-moi un exemple concret d'attaque qui viole l'Intégrité mais pas la Confidentialité." },
    { label: "POO Python", text: "Peux-tu m'expliquer le principe d'encapsulation et d'héritage en Python avec un exemple ?" },
    { label: "CV ATS Allemagne", text: "Quels sont les éléments clés d'un CV de développeur pour passer les filtres ATS en Allemagne ?" },
  ];

  const handleAsk = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = { role: "user", content: query };
    const updated = [...conversation, userMessage];
    setConversation(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated,
          provider,
          apiKey: customKey || undefined,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setConversation((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (err) {
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erreur de connexion au service d'inférence. Moteur de secours actif.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#12161e] rounded-3xl border border-[#262f3d] shadow-2xl overflow-hidden flex flex-col font-sans">
      {/* Console Top Bar */}
      <div className="bg-[#181d26] px-5 py-3.5 border-b border-[#242c38] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="h-4 w-px bg-[#2d3644]" />
          <div className="flex items-center space-x-2 text-xs font-mono text-ivory">
            <Bot className="w-3.5 h-3.5 text-gold" />
            <span>raybot-terminal ~ interactive</span>
          </div>
        </div>

        {/* Model Provider Selector */}
        <div className="flex items-center space-x-2">
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as any)}
            className="text-[11px] bg-[#101216] border border-[#2a3442] rounded-lg px-2 py-1 text-gold font-mono focus:outline-none"
          >
            <option value="built-in">Lab Engine (Local)</option>
            <option value="omniroute">Omniroute Router</option>
            <option value="opencode">Opencode Free</option>
          </select>
          <button
            onClick={() => setShowKey(!showKey)}
            className="p-1 rounded text-ivory-dim hover:text-gold"
            title="Clé API personnalisée"
          >
            <Key className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showKey && (
        <div className="p-3 bg-[#161a22] border-b border-[#222a36] text-[11px] space-y-1">
          <div className="flex justify-between text-ivory">
            <span>Clé API Opencode ou Omniroute (Optionnel) :</span>
            <button onClick={() => setShowKey(false)} className="text-ivory-dim">✕</button>
          </div>
          <input
            type="password"
            value={customKey}
            onChange={(e) => handleSaveKey(e.target.value)}
            placeholder="sk-..."
            className="w-full bg-[#0d0f14] border border-[#2b3543] rounded px-2.5 py-1 text-ivory font-mono"
          />
        </div>
      )}

      {/* Messages Output Area */}
      <div className="p-5 max-h-[360px] overflow-y-auto space-y-4 text-xs font-mono">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`p-3.5 rounded-xl max-w-[92%] leading-relaxed ${
                msg.role === "user"
                  ? "bg-gold text-[#101216] font-semibold font-sans"
                  : "bg-[#181e28] text-ivory border border-[#252f3d] whitespace-pre-line font-sans text-xs"
              }`}
            >
              {msg.content}
            </div>
            <span className="text-[10px] text-ivory-dim mt-1 font-mono">
              {msg.role === "user" ? "Visiteur" : "RayBot IA"}
            </span>
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-xs text-gold font-mono animate-pulse py-2">
            <Sparkles className="w-4 h-4" />
            <span>Génération de la réponse en cours...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-5 py-2.5 bg-[#10141a] border-t border-[#1f2733] flex gap-2 overflow-x-auto text-[11px]">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleAsk(p.text)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#181d26] border border-[#283240] text-ivory-dim hover:text-gold hover:border-gold/40 transition-all font-mono"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-4 bg-[#141820] border-t border-[#202733]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez une question technique (Python, Linux, Cybersécurité)..."
            className="flex-1 bg-[#0d0f14] border border-[#252e3c] rounded-xl px-4 py-2.5 text-xs text-ivory placeholder-ivory-dim focus:outline-none focus:border-gold"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#101216] font-bold disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
