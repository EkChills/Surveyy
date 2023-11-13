import React from 'react'
import { Card, CardContent } from './ui/card'
import RecentSurveys from './RecentSurveys'

export default function RecentsWrapper() {
  return (
    <div className='flex lg:basis-[50rem] flex-col mt-[4rem] gap-[4rem]'>
       <RecentSurveys />
        <div>
        <h3 className='text-xl font-semibold'>Recent Surveys</h3>
        <Card className='mt-2 min-h-[12rem]'>
            <CardContent>You havent received any responses yet</CardContent>
        </Card>
        </div>
    </div>
  )
}
