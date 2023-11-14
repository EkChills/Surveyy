import { db } from "@/server/db"
import { surveys } from "@/server/db/schema"
import CopyLink from "./CopyLink"
import { eq } from "drizzle-orm"
import { baseUrl, cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

export async function OverviewHero({surveyId}:{surveyId:string}) {
    const surveyTitle = await db.select().from(surveys).where(eq(surveys.id, surveyId))
    const copyUrl = `${baseUrl}/survey/${surveyId}`
    return (
        <>
        <span className='p-2 rounded-xl bg-[#EEFBE4] font-semibold text-sm text-[#5F843A]'>Active</span>
        <h1 className='text-center text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-semibold antialiased'>{surveyTitle[0]?.name}</h1>
        <span className={cn('rounded-lg border flex items-center max-w-[26rem]', buttonVariants({variant:'outline'}))}><span className='text-sm md:text-base font-semibold text-[#1B324D] truncate'>{copyUrl}</span><CopyLink copyText={copyUrl} /></span>
        </>
        
    )
  }
  