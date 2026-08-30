import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

type DbInstance = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as { pool?: Pool; db?: DbInstance };

function getDb(): DbInstance {
  if (globalForDb.db) return globalForDb.db;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }

  const pool = globalForDb.pool ?? new Pool({ connectionString: databaseUrl });
  if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

  const db = drizzle(pool, { schema });
  if (process.env.NODE_ENV !== "production") globalForDb.db = db;

  return db;
}

// Lazy proxy: only connects to the database when a property is actually accessed,
// preventing build-time failures when DATABASE_URL is not yet configured
// (e.g. during `next build` on Netlify before env vars are set).
export const db: DbInstance = new Proxy({} as DbInstance, {
  get(_target, prop, receiver) {
    const instance = getDb();
    return Reflect.get(instance as object, prop, receiver);
  },
});

export * from "./schema";
