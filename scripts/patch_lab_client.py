with open(r"C:\Users\raysn\.gemini\antigravity\scratch\rayan-lab\src\app\lab\LabClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add ShieldCheck to imports
content = content.replace("  Shield,\n", "  Shield,\n  ShieldCheck,\n")

# 2. Add safety banner above tabs
safety_banner = """      {/* Sandbox Isolation & Security Guarantee (Cahier des Charges V3.0 - Section 9.3 & 20.3) */}
      <div className="p-4 rounded-2xl bg-gold/5 border border-gold/30 flex items-start space-x-3 text-xs">
        <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-ivory-dim">
          <div className="font-bold text-ivory">Environnement d'Expérimentation Isolé &amp; Sandboxé (Section 9.3)</div>
          <p className="text-[11px] leading-relaxed">
            L&apos;exécution Python s&apos;effectue localement dans le bac à sable WebAssembly (CPython 3.12 / Pyodide) de votre navigateur. Le terminal Linux et les émulateurs réseau fonctionnent via un système de fichiers virtuel isolé sans aucun accès à l&apos;infrastructure hôte ni risque de débordement.
          </p>
        </div>
      </div>

      {/* Tabs navigation */}"""

content = content.replace("      {/* Tabs navigation */}", safety_banner)

with open(r"C:\Users\raysn\.gemini\antigravity\scratch\rayan-lab\src\app\lab\LabClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("LabClient.tsx updated with safety banner!")
