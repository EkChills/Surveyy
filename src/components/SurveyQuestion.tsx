import {useState} from 'react'
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useSurveyContext } from '@/lib/surveyContext/surveyContext';
import { v4 as uuid } from 'uuid';
import { api } from '@/trpc/react';
import { Check, Loader2 } from 'lucide-react';

interface SurveyQuestionProps {
    currentSurvey:{
        id: string;
        questionText: string | null;
        options?: {
            id: string;
            answerText: string;
        }[]
    },
    totalSurveys:number;
    surveyIndex:number;
    creatorId:string;
}
export default function SurveyQuestion({currentSurvey, surveyIndex, totalSurveys, creatorId}:SurveyQuestionProps) {
    const [currentlySelected, setCurrentlySelected] = useState<string>('')
    const {setCurrentSurveyIndex, currentSurveyIndex, setAnsweredSurveys,answeredSurveys} = useSurveyContext()
    let allSurveyAnswers:typeof answeredSurveys
    
    function nextSurvey() {
        
        setAnsweredSurveys(prev => [...prev, {id:uuid(), optionId:currentlySelected, userId:creatorId, surveyId:currentSurvey.id}])
        setCurrentSurveyIndex((prev) => {
            if(prev + 1 >= totalSurveys) {
                return prev
            }
           else return prev + 1
        })
    }

    const {data, isLoading, mutate:handleSubmit, isSuccess} = api.survey.answerSurveys.useMutation()
  if(!isSuccess){ return (
    <div className=' p-4 xl:pt-[9rem] pt-8 sm:pl-[4rem] md:pl-[6rem] md:pt-[6rem] sm:pt-[4rem] xl:pl-[9rem] xl:pr-0'>
        <p className='text-base text-[#7A7A7A] font-semibold'>Question {surveyIndex + 1} of {totalSurveys}</p>
        <h4 className='text-[#000620] font-semibold text-lg mt-6'>{currentSurvey.questionText}</h4>
        <div className='flex max-w-lg md:max-w-3xl xl:max-w-[827px] flex-wrap gap-4 mt-4'>
            {currentSurvey.options?.map((option) => {
                const {answerText, id} = option
                return <Button key={id} className={cn('min-w-full sm:min-w-[12rem] px-4 font-semibold py-[1.9rem] border-2', currentlySelected === id ? 'border-[#3158D4]' : '')} onClick={() => setCurrentlySelected(id)} size={'lg'} variant={'outline'}>
                    {answerText}
                </Button>
            })}
        </div>
        {currentSurveyIndex + 1 < totalSurveys && <Button className='font-semibold mt-8 py-[1.5rem]' onClick={nextSurvey} size={'lg'}>Continue</Button>}
        {currentSurveyIndex + 1 >= totalSurveys && <Button onClick={() => {
            setAnsweredSurveys(prev => {
                const updatedSnapshot = [...prev, {id:uuid(), optionId:currentlySelected, userId:creatorId, surveyId:currentSurvey.id,}]
                allSurveyAnswers = updatedSnapshot
                return updatedSnapshot
            })
            handleSubmit(allSurveyAnswers)

        }} size={'lg'} className='font-semibold mt-8 py-[1.5rem] flex items-center justify-center'>{isLoading ? <Loader2 className='w-6 h-6 animate-spin' /> : 'Submit'}</Button>}
    </div>
  )}

  return <SurveyComplete />
}

const SurveyComplete = () => {
    return (
        <div className='mt-48 flex flex-col mx-auto text-center items-center '>
            <span className='w-14 h-14 flex items-center justify-center bg-[#3364FA] font-bold rounded-full'>
                <Check className='w-6 h-6 font-bold text-white' />
            </span>
            <p className='text-lg font-bold text-[#090E23] mt-6 text-center'>Survey Complete</p>
            <p className='text-base font-medium text-[#838B93]'>Thank you for taking part in our survey</p>
            <p className='text-base font-medium text-[#838B93]'>You can now close this page</p>
        </div>
    )
}
