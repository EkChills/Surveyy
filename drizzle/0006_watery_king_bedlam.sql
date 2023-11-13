ALTER TABLE "options" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "surveyResults" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "surveyResults" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "surveys" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "surveys" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "surveys" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "surveys" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "surveys" ADD COLUMN "user_id" text;--> statement-breakpoint
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
