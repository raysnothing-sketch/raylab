"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Bot, Send, Sparkles, X, Terminal, Key, ShieldCheck } from "lucide-react";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default function AiMentorModal() {
  const { isAiDrawerOpen, setIsAiDrawerOpen } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Bonjour ! Je suis **RayBot**, votre mentor IA RayLab. Je peux vous expliquer les origines de Python, analyser un script, détailler la triade CIA ou vous orienter dans la préparation de vos certifications. Quelle est votre question ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelProvider, setModelProvider] = useState<"built-in" | "omniroute" | "opencode">("built-in");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [customKey, setCustomKey] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem("raylab_ai_key");
    if (savedKey) setCustomKey(savedKey);
  }, []);

  useEffect(() => {
    if (isAiDrawerOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAiDrawerOpen]);

  if (!isAiDrawerOpen) return null;

  const handleSaveKey = (val: string) => {
    setCustomKey(val);
    localStorage.setItem("raylab_ai_key", val);
  };

  const handleSend = async (textToSend?: string) => {
    const question = textToSend || input;
    if (!question.trim() || loading) return;

    const userMsg: Message = { role: "user", content: question };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          provider: modelProvider,
          apiKey: customKey || undefined,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Désolé, une anomalie est survenue lors de l'appel au modèle IA.",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erreur de connexion avec le service IA. Vérifiez vos paramètres réseau.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { label: "🐍 Quand a été créé Python ?", text: "Quand a été créé le langage Python et par qui ?" },
    { label: "🛡️ Triade CIA & Cas concret", text: "Donne-moi un exemple concret d'attaque qui viole l'Intégrité mais pas la Confidentialité." },
    { label: "💻 Déboguer un socket TCP", text: "Comment gérer proprement le timeout et les exceptions lors d'un scan de port TCP avec Python socket ?" },
    { label: "📄 Astuce CV ATS pour l'Allemagne", text: "Quels sont les éléments indispensables pour qu'un CV de développeur Python passe les filtres ATS en Allemagne ?" },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#13171e] border-l border-[#2d3540] shadow-2xl flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#242b35] bg-[#181d24]">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-ivory text-sm">RayBot AI Mentor</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Online
              </span>
            </div>
            <p className="text-[11px] text-ivory-dim">Support Python, Cyber &amp; Carrière</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={modelProvider}
            onChange={(e) => setModelProvider(e.target.value as any)}
            className="text-xs bg-[#101216] border border-[#2d3540] rounded px-2 py-1 text-ivory-muted focus:outline-none focus:border-gold"
          >
            <option value="built-in">Lab Engine (Local)</option>
            <option value="omniroute">Omniroute Router</option>
            <option value="opencode">Opencode Free</option>
          </select>
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="p-1.5 rounded-lg text-ivory-dim hover:text-gold hover:bg-[#20252c] transition-colors"
            title="Paramétrer une clé API (optionnel)"
          >
            <Key className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAiDrawerOpen(false)}
            className="p-1.5 rounded-lg text-ivory-dim hover:text-ivory hover:bg-[#20252c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Optional API Key banner */}
      {showKeyInput && (
        <div className="p-3 bg-[#181d24] border-b border-[#242b35] space-y-2 text-xs">
          <div className="flex items-center justify-between text-ivory font-medium">
            <span>Clé API Opencode / Omniroute (Optionnel) :</span>
            <button onClick={() => setShowKeyInput(false)} className="text-ivory-dim hover:text-ivory">
              Fermer
            </button>
          </div>
          <input
            type="password"
            value={customKey}
            onChange={(e) => handleSaveKey(e.target.value)}
            placeholder="sk-..."
            className="w-full bg-[#101216] border border-[#2d3540] rounded px-3 py-1.5 text-xs text-ivory font-mono focus:border-gold outline-none"
          />
          <p className="text-[10px] text-ivory-dim">
            La clé est conservée localement dans votre navigateur pour vos sessions. Si vide, le moteur autonome RayLab répond instantanément.
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[88%] rounded-xl px-4 py-3 ${
                m.role === "user"
                  ? "bg-gold text-[#101216] font-medium rounded-br-none"
                  : "bg-[#1c222b] text-ivory border border-[#2a323d] rounded-bl-none shadow-sm"
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                {m.content}
              </div>
            </div>
            <span className="text-[10px] text-ivory-dim mt-1 px-1 font-mono">
              {m.role === "user" ? "Vous" : "RayBot"}
            </span>
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-xs text-gold animate-pulse py-2">
            <Sparkles className="w-4 h-4" />
            <span>RayBot formule une réponse détaillée...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 border-t border-[#222832] bg-[#141820] flex gap-1.5 overflow-x-auto text-[11px]">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p.text)}
            className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#1b212b] border border-[#2d3644] text-ivory-muted hover:text-gold hover:border-gold/50 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-[#222832] bg-[#181d24]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question technique..."
            className="flex-1 bg-[#101216] border border-[#2d3540] rounded-lg px-3 py-2 text-sm text-ivory placeholder-ivory-dim focus:outline-none focus:border-gold"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2 rounded-lg bg-gold text-[#101216] hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
