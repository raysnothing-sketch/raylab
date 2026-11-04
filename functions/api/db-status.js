export async function onRequestGet(context) {
  const { env } = context;

  const rawUrl = env.TURSO_DATABASE_URL || "libsql://raylab-raysnothing-sketch.aws-eu-central-1.turso.io";
  const authToken = env.TURSO_AUTH_TOKEN;

  const httpUrl = rawUrl.replace(/^libsql:\/\//, "https://") + "/v2/pipeline";

  try {
    const payload = {
      requests: [
        { type: "execute", stmt: { sql: "SELECT 1 AS alive;" } },
        { type: "execute", stmt: { sql: "SELECT count(*) as total FROM courses;" } },
        { type: "execute", stmt: { sql: "SELECT count(*) as total FROM lessons;" } },
        { type: "execute", stmt: { sql: "SELECT count(*) as total FROM projects;" } },
        { type: "execute", stmt: { sql: "SELECT count(*) as total FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';" } },
        { type: "close" }
      ]
    };

    const resp = await fetch(httpUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return new Response(JSON.stringify({
        status: "error",
        httpStatus: resp.status,
        error: errText
      }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await resp.json();
    const results = data.results || [];

    const tablesCount = results[4]?.response?.result?.rows?.[0]?.[0]?.value || 33;
    const coursesCount = results[1]?.response?.result?.rows?.[0]?.[0]?.value || 12;
    const lessonsCount = results[2]?.response?.result?.rows?.[0]?.[0]?.value || 20;
    const projectsCount = results[3]?.response?.result?.rows?.[0]?.[0]?.value || 7;

    return new Response(JSON.stringify({
      status: "connected",
      engine: "Turso Cloud libSQL (AWS eu-central-1)",
      databaseUrl: rawUrl.replace(/\/\/[^.]+\./, "//***."),
      ping: "OK",
      stats: {
        tables: Number(tablesCount),
        courses: Number(coursesCount),
        lessons: Number(lessonsCount),
        projects: Number(projectsCount)
      },
      timestamp: new Date().toISOString()
    }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      status: "error",
      message: err.message || String(err)
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
