import SurveyAnswerLayout from '@/components/SurveyAnswerLayout'
import SurveySidePanel from '@/components/SurveySidePanel'
import { SurveyContextProvider } from '@/lib/surveyContext/surveyContext'
import { db } from '@/server/db'
import { results, surveys, user } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

type AllSurveysType = {
    id: string;
    questionText: string | null;
    surveyId:string | null
    resultId:string | null;
    options?: {
      id: string;
      answerText: string;
    }[]
  }[]

  

export default async function SurveysPage({params}:{params:{surveyId:string}}) {
const survey = await db.select().from(surveys).where(eq(surveys.id, params.surveyId))
const userId = survey[0]?.userId
const userImage = await db.select().from(user).where(eq(user.id, userId!))
console.log(userImage);

const allSurveys = await db.query.results.findMany({
    where:eq(results.surveyId, params.surveyId),
    with:{
        options:true
    }
}) 
console.log(allSurveys);





  return (
    <main className='bg-[#FCFBFC] w-full'>
        <SurveyContextProvider>
        <SurveyAnswerLayout allSurveyResults={allSurveys} creatorName={userImage[0]!.givenName! + " " + userImage[0]!.familyName!} surveyTitle={survey[0]!.name!} surveyDescription={survey[0]!.description!} creatorImage={userImage[0]!.picture!} creatorId={userImage[0]!.id!} />

        </SurveyContextProvider>
    </main>
  )
}
