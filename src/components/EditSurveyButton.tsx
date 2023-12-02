"use client"

import React from 'react'
import { Button } from './ui/button'
import { CurrentlyEditingSurveyType, useSurveyContext } from '@/lib/surveyContext/surveyContext'
import { useRouter } from 'next/navigation'

type EditSurveyButtonProps = {
  currentSurvey:CurrentlyEditingSurveyType,
  surveyId:string;
}

export default function EditSurveyButton({currentSurvey, surveyId}:EditSurveyButtonProps) {
  const {currentlyEditingSurvey, setCurrentlyEditingSurvey} = useSurveyContext()
  const router = useRouter()

  const handleEdit = () => {
    setCurrentlyEditingSurvey(currentSurvey)
    router.push(`/dashboard/overview/${surveyId}/edit`)
  }
  return (
    <Button className='text-[#0F223A] font-semibold' variant={'outline'}  onClick={handleEdit}  >Edit</Button>
    )
}
