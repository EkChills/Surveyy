ALTER TABLE "answered" ADD COLUMN "result_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "answered" ADD CONSTRAINT "answered_result_id_surveyResults_id_fk" FOREIGN KEY ("result_id") REFERENCES "surveyResults"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
