import { type Config } from "drizzle-kit";

import { env } from "@/env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle/migrations",
  driver:"pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
