import { openai } from "@/lib/openai";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import {z} from 'zod'
import { results } from "@/server/db/schema";
import { eq } from "drizzle-orm";

interface ResOut {
  surveyName:string
  surveyDescription:string;
  options:{id:string, answerText:string}
}


export const surveyRouter = createTRPCRouter({
    // 
    getCurrentSurvey:publicProcedure.input(z.object({surveyId:z.string(), surveyindex:z.number()})).query(async({ctx, input}) => {
        const allSurvey = await ctx.db.select().from(results).where(eq(results.surveyId, input.surveyId))
        const currentSurvey = allSurvey[input.surveyindex]
        return 
    })
  
})