"use client"

import React from 'react'
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const GeneratingState = () => {
    return( <span className='flex items-center gap-1'><Loader2 className='animate-spin w-5 h-5' /></span> )
}
export default function CreateSurveyButton() {
    const {pending} = useFormStatus()
    const router = useRouter()
  
  return (
    <Button
    className="mt-4 w-full font-semibold flex items-center justify-center"
    type="submit"
    size={"lg"}
  >
    {pending ? <GeneratingState /> : ' Create Survey'}
  </Button>
  )
}
