CREATE TABLE IF NOT EXISTS "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "users";