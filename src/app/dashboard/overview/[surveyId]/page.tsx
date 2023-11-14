import { OverviewHero } from '@/components/OverviewHero'
import OverviewTabs from '@/components/OverviewTabs'

import React, {Suspense} from 'react'


export default function Overview({params}:{params:{surveyId:string}}) {
    return (
      <div className='min-h-[calc(100vh-4rem)] w-full relative'>
        <section className='flex flex-col gap-4  bg-white py-[5rem] w-full items-start  px-4 md:px-8 xl:px-[22rem] border-b shadow-md'>
         <Suspense fallback={<div>Loading...</div>}>
          <OverviewHero surveyId={params.surveyId} />
         </Suspense>
        </section>
        <section className='bg-[#FCFBFC] w-full pt-8  px-6 md:px-8 xl:px-[22rem] pb-6'>
            <OverviewTabs surveyId={params.surveyId} />
        </section>
      </div>
    )
  }


  // export  function OverviewBody({surveyId}:{surveyId:string;}) {
  //   return (
  //       <div>
  //           <OverviewTabs surveyId='hj' />
  //       </div>
  //   )
  // }