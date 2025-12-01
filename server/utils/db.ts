import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "../database/schema";

const sqlite = new Database(process.env.SQLITE_DB_PATH || "sqlite.db");
export const db = drizzle(sqlite, { schema });
