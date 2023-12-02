import { db } from '@/server/db';
import { answered, options, results } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import React from 'react'
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card';
import { QuestionSummary } from './QuestionSummary';
import { Button, buttonVariants } from './ui/button';
import { Trash2 } from 'lucide-react';
import {z} from 'zod'
import { revalidatePath } from 'next/cache';
import EditSurveyButton from './EditSurveyButton';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function Questions({surveyId}:{surveyId:string}) {
    const surveyResults = await db.query.results.findMany({
        where: eq(results.surveyId, surveyId),
        with:{
          options:true
        }
      }) as  {
        surveyId: string | null;
        id: string;
        questionText: string | null;
        options:{
          id: string,
          resultId: string,
          answerText: string;
        }[]
    }[]

    const deleteQuestion = async (formData:FormData) => {
      "use server"
      const questionId = formData.get('deleteButton') as string
      console.log(questionId);
      await db.delete(answered).where(eq(answered.resultId, questionId))
      await db.delete(options).where(eq(options.resultId, questionId))
      await db.delete(results).where(eq(results.id, questionId))
      revalidatePath('/')
    }
  return (
    <div className='flex flex-col gap-4'>
        {surveyResults.map((result, idx) => {
        const { id, questionText,options } = result;
        return (
          <form key={id} action={deleteQuestion}>
          <Card key={id} className="w-full  flex items-center justify-between  pr-6">
            <CardHeader className="  flex flex-col">
              <CardTitle className="text-[#0F223A] text-base font-semibold">{idx + 1}.{" "}{questionText}</CardTitle>
              <span className='text-[#90969F] font-semibold text-sm'>Mood scale</span>
            </CardHeader>
            <div className='flex gap-2'>
                {/* <EditSurveyButton currentSurvey={result} surveyId={surveyId} /> */}
                <Link href={`/dashboard/edit/${result.id}`} className={cn('text-[#0F223A] font-semibold',buttonVariants({variant:'outline'}))}>Edit</Link>
                <Button className='text-[#B45B59] font-semibold bg-[#FBF2F2]' name='deleteButton' value={result.id} variant={'outline'}><Trash2 /></Button>
            </div>
          
          </Card>
          </form>
        );
      })}
    </div>
  )
}
