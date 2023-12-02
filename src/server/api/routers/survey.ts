import { openai } from "@/lib/openai";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import {z} from 'zod'
import { answered, options, results } from "@/server/db/schema";
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
    }),
    answerSurveys:publicProcedure.input(z.array(z.object({
      id:z.string(),
      optionId:z.string(),
      userId:z.string(),
      resultId:z.string(),
      surveyId:z.string(),
    }))).mutation(async({ctx, input}) => {
      await ctx.db.insert(answered).values([...input])
      return {
        success:true
      }
    }),
    saveSurveyQuestion:privateProcedure.input(z.object({
      surveyId:z.string(),
      id:z.string(),
      questionText:z.string(),
      options:z.array(z.object({
        id:z.string(),
        answerText:z.string(),
        resultId:z.string()
      }))
    })).mutation(async ({ctx, input}) => {
      console.log(input.questionText);
      
      await ctx.db.transaction(async(tx) => {
        await tx.update(results).set({id:input.id, questionText:input.questionText, surveyId:input.surveyId}).where(eq(results.id, input.id))
        await tx.delete(answered).where(eq(answered.resultId, input.id))
        await tx.delete(options).where(eq(options.resultId, input.id))
        await tx.insert(options).values(input.options)
      })
    })
    
  
})