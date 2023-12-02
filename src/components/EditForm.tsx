"use client"

import {type CurrentlyEditingSurveyType } from '@/lib/surveyContext/surveyContext'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { Label } from './ui/label';
import {useFormState,useForm, useFieldArray, SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { string, z } from 'zod';
import { GripVertical, Loader2, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { v4 as uuid } from 'uuid';
import { AnimateFramesPresence, MotionDiv } from './MotionDiv';
import { animate } from 'framer-motion';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';

type CompleteSurveyType = {
  questionText:string;
  options:{answerText:string}[]
}

export default function EditForm({currentQuestion}:{currentQuestion:CurrentlyEditingSurveyType}) {
  const [currentQuestionSState, setCurrentQuestionState] = useState<{surveyId:string | null; id:string; questionText:string | null; options:Array<{id:string; resultId:string; answerText:string;}>}>(currentQuestion)
  const {mutate:handleSave, data, isLoading, isSuccess} = api.survey.saveSurveyQuestion.useMutation()
  const router = useRouter()
  const {register, formState:{errors}, control, handleSubmit} = useForm<CompleteSurveyType>({resolver:zodResolver(z.object({
    questionText:z.string(),
    options:z.array(z.object({
      answerText:z.string()
    }))
  }))})
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "options",
    shouldUnregister:true,
    rules:{
      minLength:0
    }
     // unique name for your Field Array
  });

  useEffect(() => {
    // const reformed = currentQuestionSState.options.map((opt) => ({answerText:opt.answerText}))
    // currentQuestionSState.options.forEach((item, idx) => {
    // })
    insert(0,currentQuestion.options)
  },[insert, currentQuestion.options])


  function AddOption(){
    // setCurrentQuestionState(prev => {
    //   return {
    //     id:prev.id,
    //     surveyId:prev.surveyId,
    //     questionText:prev.questionText,
    //     options:[...prev.options, {answerText:'', id:uuid(), resultId:currentQuestion.id}]
    //   }
    // })
    append({answerText:''})
  }

  function deleteChat(optionId:string) {
    const filteredOptions = currentQuestionSState.options.filter((option) => option.id !== optionId)
    setCurrentQuestionState(prev => {
      return {
        id:prev.id,
        surveyId:prev.surveyId,
        questionText:prev.questionText,
        options:filteredOptions
      }
    })
  }

  const handleSurveySubmit:SubmitHandler<CompleteSurveyType> = (data) => {
    console.log(data,'yes');
    const finishedSurvey = {
      id:currentQuestion.id,
      surveyId:currentQuestion.surveyId!,
      questionText:data.questionText,
      options:data.options.map(option => ({id:uuid(), resultId:currentQuestion.id, answerText:option.answerText}))
    }
    
    handleSave(finishedSurvey)

  }

  useEffect(() => {
    if(isSuccess && !isLoading) {
      console.log('success');
      
      router.back()
      router.refresh()
    }
  }, [isSuccess, isLoading])

  console.log(currentQuestionSState);
  

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(handleSurveySubmit)}>
    <div> 
      <Label className='font-semibold text-[#939299]' htmlFor='questionText'>Question</Label>
      <Input className='text-[#112746] font-semibold' {...register('questionText', {value:currentQuestionSState.questionText!})} />
    </div>
    <h3 className='font-semibold mt-8'>Options</h3>
    <div className='flex flex-col gap-4'>
      <AnimateFramesPresence>
    {fields.map((field, index) => {
      return <MotionDiv key={field.id} initial={
        {scale:0,opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0,opacity:0}} className='flex items-center gap-4'>
      {/* <Label className='font-semibold text-[#939299]' htmlFor='question'>Question</Label> */}
      <Input  className='text-[#112746] font-semibold'  {...register(`options.${index}.answerText`, {value:field.answerText})} />
      <div className='flex item-center gap-2'>
      <GripVertical className='text-[#939393]' />
      <XCircle onClick={() => remove(index)} className='text-[#939393] cursor-pointer' />
      </div>
    </MotionDiv>
    })}
    <Button type='button' className='font-semibold mt-2 bg-[#EFEFEF] self-start' onClick={AddOption} variant={'outline'}> Add another option</Button>
    </AnimateFramesPresence>
    </div>
    <Button type='submit' className='flex'>{isLoading ? <Loader2 className='w-6 h-6 animate-spin mx-auto' /> : 'Save changes'}</Button>
    </form>
  )
}
