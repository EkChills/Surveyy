CREATE TABLE IF NOT EXISTS "options" (
	"id" text PRIMARY KEY NOT NULL,
	"result_id" text,
	"answer_text" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "surveyResults" (
	"id" text PRIMARY KEY NOT NULL,
	"survey_id" text,
	"question_text" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "surveys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"survey_name" varchar(255),
	"description" text,
	"number_of_questions" integer,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"given_name" varchar(200),
	"family_name" varchar(200),
	"email" varchar(256),
	"picture" text,
	"job_title" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "options" ADD CONSTRAINT "options_result_id_surveyResults_id_fk" FOREIGN KEY ("result_id") REFERENCES "surveyResults"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "surveys" ADD CONSTRAINT "surveys_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
