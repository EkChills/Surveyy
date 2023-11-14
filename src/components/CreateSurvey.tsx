import React from 'react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import {  buttonVariants } from './ui/button'
import { Rocket } from 'lucide-react'
import Link from 'next/link'

export default function CreateSurvey() {
  return (
    <div className='basis-[28rem] mt-[6.3rem]'>
    <Card className='p-6 flex items-center flex-col'>
      <span className={cn(buttonVariants(), 'w-[3.25rem] h-[3.25rem] flex items-center justify-center p-2 rounded-full')}>
      <Rocket className='' />
      </span>
      <h4 className='text-lg text-[#2E334F] font-semibold mt-4 text-center'>Create a new Survey</h4>
      <p className='text-base text-center font-semibold text-[#8F969F]'>Click the button below and start collecting <br /> responses in minutes</p>
      <Link href={'/dashboard/new-survey'} className={cn('font-semibold mt-4 w-full',buttonVariants({size:'lg'}))} >Create Survey</Link>
    </Card>
  </div>
  )
}
