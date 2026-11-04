import { createClient, Client } from "@libsql/client";

let clientInstance: Client | null = null;

/**
 * Retourne le client Turso libSQL officiel de RayLab.
 * - En production (ou avec Turso Cloud) : utilise TURSO_DATABASE_URL (libsql://...) et TURSO_AUTH_TOKEN.
 * - En local (ou sans configuration) : bascule de manière transparente sur file:raylab.sqlite.
 */
export function getTursoClient(): Client {
  if (clientInstance) {
    return clientInstance;
  }

  const url = process.env.TURSO_DATABASE_URL || "file:raylab.sqlite";
  const authToken = process.env.TURSO_AUTH_TOKEN;

  clientInstance = createClient({
    url,
    authToken,
  });

  return clientInstance;
}

/**
 * Exécute une requête SQL et retourne la liste des résultats sous forme d'objets sérialisables.
 */
export async function dbQuery<T = any>(sql: string, args: any[] = []): Promise<T[]> {
  const client = getTursoClient();
  const res = await client.execute({ sql, args });
  return JSON.parse(JSON.stringify(res.rows)) as T[];
}

/**
 * Exécute une requête SQL et retourne le premier résultat ou null.
 */
export async function dbQueryOne<T = any>(sql: string, args: any[] = []): Promise<T | null> {
  const client = getTursoClient();
  const res = await client.execute({ sql, args });
  if (!res.rows || res.rows.length === 0) return null;
  return JSON.parse(JSON.stringify(res.rows[0])) as T;
}

/**
 * Exécute une instruction de modification (INSERT, UPDATE, DELETE).
 */
export async function dbExecute(
  sql: string,
  args: any[] = []
): Promise<{ rowsAffected: number; lastInsertRowid?: bigint | number }> {
  const client = getTursoClient();
  const res = await client.execute({ sql, args });
  return {
    rowsAffected: res.rowsAffected,
    lastInsertRowid: res.lastInsertRowid,
  };
}
