CREATE TABLE IF NOT EXISTS "options" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"result_id" text,
	"answer_text" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "surveyResults" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"survey_id" text,
	"question_text" text
);
