

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from "@/env.mjs";
import * as schema1 from './schema'
 
const connectionString = env.DATABASE_URL
const client = postgres(connectionString)
export const db = drizzle(client, {schema:{...schema1}});