import {useState} from 'react'
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useSurveyContext } from '@/lib/surveyContext/surveyContext';

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
}
export default function SurveyQuestion({currentSurvey, surveyIndex, totalSurveys}:SurveyQuestionProps) {
    const [currentlySelected, setCurrentlySelected] = useState<string>('')
    const {setCurrentSurveyIndex} = useSurveyContext()
  return (
    <div className='pt-[9rem] pl-[9rem]'>
        <p className='text-base text-[#7A7A7A] font-semibold'>Question {surveyIndex + 1} of {totalSurveys}</p>
        <h4 className='text-[#000620] font-semibold text-lg mt-6'>{currentSurvey.questionText}</h4>
        <div className='flex max-w-[827px] flex-wrap gap-4 mt-4'>
            {currentSurvey.options?.map((option) => {
                const {answerText, id} = option
                return <Button key={id} className={cn('min-w-[12rem] px-4 font-semibold py-[1.9rem] border-2', currentlySelected === id ? 'border-[#3158D4]' : '')} onClick={() => setCurrentlySelected(id)} size={'lg'} variant={'outline'}>
                    {answerText}
                </Button>
            })}
        </div>
        <Button className='font-semibold mt-8 py-[1.5rem]' onClick={() => setCurrentSurveyIndex((prev) => prev + 1)} size={'lg'}>Continue</Button>
    </div>
  )
}
