

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from "@/env.mjs";

// Schema imports
import * as schema from './schema';

let dbInstance: typeof drizzle | null | any = null;

declare global {
  const _drizzleDb: typeof drizzle | undefined | any;
}

if (process.env.NODE_ENV === 'production') {

  const client = postgres(env.DATABASE_URL);

  dbInstance = drizzle(client, {
    schema
  });

} else {

  if (!global._drizzleDb) {
    const client = postgres(env.DATABASE_URL);
    
    global._drizzleDb = drizzle(client, {
      schema
    });
  }

  dbInstance = global._drizzleDb as any; 
}

export { dbInstance as db };