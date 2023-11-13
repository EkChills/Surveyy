import CopyLink from '@/components/CopyLink'
import OverviewTabs from '@/components/OverviewTabs'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { db } from '@/server/db'
import { surveys } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { Copy } from 'lucide-react'
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

  export async function OverviewHero({surveyId}:{surveyId:string}) {
    const surveyTitle = await db.select().from(surveys).where(eq(surveys.id, surveyId))
    const copyUrl = `http://localhost:3000/survey/${surveyId}`
    return (
        <>
        <span className='p-2 rounded-xl bg-[#EEFBE4] font-semibold text-sm text-[#5F843A]'>Active</span>
        <h1 className='text-center text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-semibold antialiased'>{surveyTitle[0]?.name}</h1>
        <span className={cn('rounded-lg border flex items-center max-w-[26rem]', buttonVariants({variant:'outline'}))}><span className='text-sm md:text-base font-semibold text-[#1B324D] truncate'>{copyUrl}</span><CopyLink copyText={copyUrl} /></span>
        </>
        
    )
  }
  
  // export  function OverviewBody({surveyId}:{surveyId:string;}) {
  //   return (
  //       <div>
  //           <OverviewTabs surveyId='hj' />
  //       </div>
  //   )
  // }