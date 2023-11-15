"use client"

import React,{useEffect, useState} from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { experimental_useFormState as useFormState } from 'react-dom'
import {  createSurveyAction } from '@/lib/actions/createSurveyAction'
import { initialSurveyState } from '@/lib/validation/zod-schemas'
import CreateSurveyButton from './CreateSurveyButton'


export default function CreateSurveyForm() {
    const searchParams = useSearchParams()
    const [state, formAction] = useFormState(createSurveyAction, initialSurveyState)
    const [formInputs, setFormInputs] = useState<{name:string; desc:string; noq:string;}>({desc:'', name:'', noq:''})
    const pathname = usePathname()
    const router = useRouter()

    function handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        // const params = new URLSearchParams(searchParams)
        // if(e.target.name === 'name' ) {
        //     params.set('name', e.target.value)
        // } 
        // if(e.target.name === 'noq') {
        //     params.set('noq', e.target.value)
        // }
        // if(e.target.name === 'desc') {
        //     params.set('desc', e.target.value)
        // }
        // router.replace(`${pathname}?${params.toString()}`)
      const {name, value} = e.target
      setFormInputs((prevInputs) => {
        return {...prevInputs, [name]:value}
      })
    }
    console.log(state, formInputs);

    useEffect(() => {
      if(state.success) {
        router.push(`/dashboard/overview/${state.surveyId}`)
      }
    },[state.success, state.surveyId])
    
    
  return (
    <form action={formAction}>
    <h1 className="text-4xl  font-bold text-[#343434] antialiased">
      Create your survey in <br /> seconds with{" "}
      <span className="text-[#EA3496]">AI</span>
    </h1>
    <div className="mt-5 grid w-full items-center gap-1.5">
      <Label htmlFor="email" className="font-semibold text-[#666666]">
        Give your survey a name
      </Label>
      <Input
        type="text"
        id="name"
        name='name'
        value={formInputs.name}
        className="border-2 font-semibold text-[#0D1625] shadow-sm"
        placeholder="Eg. User experience survey"
        onChange={handleChange}
      />
          {state.name?.error && <span className='text-sm text-red-700'>{state.name.message}</span>}

    </div>
    <div className="mt-5 grid w-full gap-1.5">
      <Label htmlFor="desc" className="font-semibold text-[#666666]">
        Give a detailed description of the product
      </Label>{" "}
      <Textarea
        className="resize-none border-2 font-semibold text-[#0D1625] shadow-sm"
        placeholder="Eg. a social media website that focuses on sharing images related to product design"
        id="desc"
        name='desc'
        value={formInputs.desc}
        onChange={handleChange}
      />
          {state.desc?.error && <span className='text-sm text-red-700'>{state.desc.message}</span>}

    </div>
    <div className="mt-5 grid w-full items-center gap-1.5">
      <Label htmlFor="noq" className="font-semibold text-[#666666]">
        Number of questions
      </Label>
      <Input
        type="number"
        id="noq"
        className="border-2 font-semibold text-[#0D1625] shadow-sm"
        placeholder="Eg. 10"
        value={formInputs.noq}
        name='noq'
        min={0}
        max={5}
        onChange={handleChange}
      />
    {state.noq?.error && <span className='text-sm text-red-700'>{state.noq.message}</span>}
    </div>
  <CreateSurveyButton />
  </form>
  )
}
