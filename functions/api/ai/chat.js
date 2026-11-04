export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { messages, provider = "built-in", apiKey } = body || {};

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages array" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const lastMessage = messages[messages.length - 1]?.content || "";

    // 1. Omniroute / OpenRouter provider
    const effectiveOmnirouteKey = apiKey || env.OMNIROUTE_API_KEY || env.OPENROUTER_API_KEY;
    if ((provider === "omniroute" || provider === "openrouter") && effectiveOmnirouteKey) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${effectiveOmnirouteKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://raylab.pages.dev",
            "X-Title": "RayLab Mentor",
          },
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [
              {
                role: "system",
                content:
                  "Tu es RayBot, l'assistant pédagogique et technique de la plateforme RayLab (Learn. Build. Secure. Become.). Tu réponds en français de façon précise, technique et bienveillante en programmation Python, administration Linux, réseaux et cybersécurité.",
              },
              ...messages,
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return new Response(JSON.stringify({ reply }), {
              headers: { "Content-Type": "application/json" },
            });
          }
        }
      } catch (err) {
        console.error("Omniroute/OpenRouter API error:", err);
      }
    }

    // 2. Built-in Smart Mentor Engine
    const reply = generateSmartMentorReply(lastMessage);
    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal AI processing error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function generateSmartMentorReply(query) {
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (
    (q.includes("quand") && (q.includes("python") || q.includes("cree") || q.includes("creer"))) ||
    q.includes("qui a cree python") ||
    (q.includes("origine") && q.includes("python")) ||
    (q.includes("histoire") && q.includes("python")) ||
    q.includes("guido van rossum")
  ) {
    return `### 🐍 Histoire & Création du Langage Python

Python a été créé à la fin des années 1980 par le développeur néerlandais **Guido van Rossum** au *Centrum Wiskunde & Informatica* (CWI) à Amsterdam, aux Pays-Bas.

#### Les Jalons Clés :
- **Décembre 1989 :** Début du développement durant les vacances de Noël comme projet personnel pour succéder au langage ABC.
- **20 Février 1991 :** Première version publique (**Python 0.9.0**) sur Usenet avec classes, héritage, gestion des exceptions et types natifs.
- **Janvier 1994 :** **Python 1.0** (programmation fonctionnelle avec lambda, map, filter).
- **Octobre 2000 :** **Python 2.0** (compréhensions de listes, garbage collector cyclique).
- **3 Décembre 2008 :** **Python 3.0** (Unicode par défaut, division entière stricte).

> [!NOTE]
> Le nom vient des humoristes britanniques **Monty Python**, pas du serpent !`;
  }

  if (q.includes("soc") || q.includes("siem") || q.includes("analyste") || q.includes("incident") || q.includes("triage")) {
    return `### 🛡️ Le Rôle de l'Analyste SOC (Security Operations Center)

L'**Analyste SOC** assure la surveillance continue, la détection des menaces et la réponse aux incidents.

- **Analyste L1 (Triage) :** Filtre les alertes SIEM (Wazuh, Splunk, Sentinel), écarte les faux positifs et applique les premiers playbooks d'endiguement.
- **Analyste L2 (Investigation) :** Analyse la mémoire, décortique les logs et reconstitue la chronologie selon **MITRE ATT&CK**.
- **Analyste L3 (Threat Hunter) :** Chasse proactive des menaces zero-day et rédaction de règles de détection (Sigma, YARA).`;
  }

  if ((q.includes("tcp") && q.includes("udp")) || q.includes("difference tcp udp")) {
    return `### 🌐 Comparatif Fondamental : TCP vs UDP

| Caractéristique | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
|---|---|---|
| **Connexion** | Orienté connexion (*3-Way Handshake*) | Sans connexion (*Connectionless*) |
| **Fiabilité** | 100% garanti avec accusés de réception | Pas de garantie (*Best effort*) |
| **Vitesse** | Contrôle d'erreurs plus lourd | Ultra-rapide et temps réel |
| **Cas d'usage** | Web HTTPS (443), SSH (22), BDD | Streaming, DNS (53), VoIP, Jeux vidéo |`;
  }

  return `### ⚡ Réponse de RayBot AI Mentor (Cloudflare Edge)

Vous posez une question portant sur : **"${query}"**.

#### Principes & Mise en Œuvre
- **Mécanisme sous-jacent :** En ingénierie logicielle et sécurité, tout composant fiable sépare la validation des entrées, la logique métier et la journalisation des anomalies.
- **Bonne pratique recommandée :** Ne jamais faire confiance aux entrées non validées et appliquer le principe du moindre privilège.
- **Ressources RayLab :** Retrouvez des exercices pratiques guidés dans nos [Académies & Cursus](/paths) ou dans le [Laboratoire de Projets](/projects).`;
}
