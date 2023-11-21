"use client"

import {useState, useEffect} from 'react'
import SurveySidePanel from './SurveySidePanel'
import {type  SurveyResultsType } from '@/lib/validation/zod-schemas';
import { useSurveyContext } from '@/lib/surveyContext/surveyContext';
import SurveyQuestion from './SurveyQuestion';

type AllSurveysType = {
    id: string;
    questionText: string | null;
    options?: {
      id: string;
      answerText: string;
    }[];
  }[];

type SurveyAnswerLayoutProps = {
    creatorImage:string;
    allSurveyResults:AllSurveysType
    surveyTitle:string;
    surveyDescription:string;
    creatorName:string;
    creatorId:string;
}
export default function SurveyAnswerLayout({allSurveyResults , creatorId, creatorImage, surveyTitle, surveyDescription, creatorName}:SurveyAnswerLayoutProps) {
    // const [surveys, setSurveys] = useState<AllSurveysType>(allSurveys)
    // const [currentSurveyIndex, setCurrentSurveyIndex] = useState<number>(0)
    const {setAllSurveys, allSurveys, currentSurveyIndex} = useSurveyContext()

    useEffect(() => {
        setAllSurveys(allSurveyResults)
    },[])
    
  return (
    <div className='flex flex-col xl:flex-row min-h-[100lvh] w-full'>
            <div className='hidden xl:block bg-white px-8 pt-[13rem] min-w-[25rem] border-r shadow-md'>
                <SurveySidePanel creatorImage={creatorImage} creatorName={creatorName} surveyTitle={surveyTitle} surveyDescription={surveyDescription} />
            </div>
            <div className='w-full'>
                <SurveyQuestion currentSurvey={allSurveyResults[currentSurveyIndex]!} creatorId={creatorId} surveyIndex={currentSurveyIndex} totalSurveys={allSurveys.length} />
            </div>
        </div>
  )
}
