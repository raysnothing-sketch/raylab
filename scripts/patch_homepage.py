with open(r"C:\Users\raysn\.gemini\antigravity\scratch\rayan-lab\src\app\page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix banner alt and caption
content = content.replace(
    'alt="RayLab Official Banner - Acad?mie de Cybers?curit? & Lab Virtuel"',
    'alt="RayLab Official Banner — Académie de Cybersécurité & Lab Virtuel"'
)
content = content.replace(
    '<span>RAYLAB ACAD?MIE ? CYBERPATH 2026-2027</span>',
    '<span>RAYLAB ACADÉMIE • CYBERPATH 2026-2027</span>'
)

# 2. Harmonize statistics row to 8 Académies / 12 Volumes / 7 Projets / 100% Sandboxé
old_stats = """            {/* Statistics Row */}
            <div className="pt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#1c222b]">
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-gold font-mono">4 Cursus</div>
                <div className="text-xs text-ivory-dim mt-1">Python, Cyber, Systèmes, Carrière</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-ivory font-mono">Niv. 1 à 7</div>
                <div className="text-xs text-ivory-dim mt-1">Du débutant au Dev professionnel</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-emerald-400 font-mono">100% Concret</div>
                <div className="text-xs text-ivory-dim mt-1">Projets documentés sur GitHub</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-gold font-mono">Norme ATS</div>
                <div className="text-xs text-ivory-dim mt-1">CV prêt pour France &amp; Allemagne</div>
              </div>
            </div>"""

new_stats = """            {/* Statistics Row (Conforme Cahier des Charges V3.0) */}
            <div className="pt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#1c222b]">
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-gold font-mono">8 Académies</div>
                <div className="text-xs text-ivory-dim mt-1">Python, Linux, Réseaux, SOC, DFIR...</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-ivory font-mono">12 Volumes</div>
                <div className="text-xs text-ivory-dim mt-1">CyberPath : 70% Pratique / 30% Théorie</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-emerald-400 font-mono">7 Projets</div>
                <div className="text-xs text-ivory-dim mt-1">Capstones documentés sur GitHub</div>
              </div>
              <div className="p-4 bg-[#13171e] rounded-2xl border border-[#202732] text-left">
                <div className="text-2xl font-black text-gold font-mono">100% Sandboxé</div>
                <div className="text-xs text-ivory-dim mt-1">WASM &amp; Terminal émulé sans risque</div>
              </div>
            </div>"""

if old_stats in content:
    content = content.replace(old_stats, new_stats)
    print("Stats replaced cleanly!")
else:
    # Try normalizing line endings
    content_normalized = content.replace("\r\n", "\n")
    old_stats_normalized = old_stats.replace("\r\n", "\n")
    new_stats_normalized = new_stats.replace("\r\n", "\n")
    if old_stats_normalized in content_normalized:
        content = content_normalized.replace(old_stats_normalized, new_stats_normalized)
        print("Stats replaced with normalized newlines!")
    else:
        print("Warning: old stats block not found")

with open(r"C:\Users\raysn\.gemini\antigravity\scratch\rayan-lab\src\app\page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Homepage updated successfully!")
