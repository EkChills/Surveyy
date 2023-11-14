import CardsWrapper from '@/components/CardsWrapper'
import CreateSurvey from '@/components/CreateSurvey'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RecentsWrapper from '@/components/RecentsWrapper'
import React, { Suspense } from 'react'


export default function Dashboard() {
  return (
    <MaxWidthWrapper className='pt-[4rem] bg-[#FCFBFC] min-h-screen'>
      <div>
        <h3 className='text-3xl font-semibold'>Dashboard</h3>
        <Suspense fallback={<div>loading...</div>}>
          <CardsWrapper />
        </Suspense>
        <div className='flex flex-col gap-4 lg:gap-6 lg:flex-row'>
            <Suspense>
              <RecentsWrapper />
            </Suspense>
         <CreateSurvey />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
