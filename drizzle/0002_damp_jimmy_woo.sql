CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"given_name" varchar(200),
	"family_name" varchar(200),
	"email" varchar(256),
	"picture" text,
	"job_title" text
);
--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "id" DROP DEFAULT;