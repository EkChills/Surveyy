import React from 'react'
import { Card, CardContent } from './ui/card'
import { db } from '@/server/db'
import { surveys } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Button, buttonVariants } from './ui/button'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default async function RecentSurveys() {
    const {getUser} = getKindeServerSession()
    const kindeUser = getUser()
    const allSurveys = await db.select({name:surveys.name, description:surveys.description, id:surveys.id}).from(surveys).where(eq(surveys.userId, kindeUser.id!)) 
  return (
    <div>
    <h3 className='text-xl font-semibold'>Recent Surveys</h3>
    {allSurveys.length <= 0 ?  <Card className='mt-2 min-h-[12rem] flex items-center justify-center'>
    <CardContent className='text-gray-500 font-semibold'>You havent received any surveys yet</CardContent>
    </Card> : <div className='flex flex-col gap-4 mt-2'>
    {allSurveys.map((survey) => {
        const { name, id} = survey
        return <Card key={id} className='w-full p-8 flex flex-col gap-4 items-start'>
            <div className='flex w-full items-center justify-between'>
                <h5 className='text-base font-semibold text-[#0D253D]'>{name}</h5>
                <Link className={cn('flex p-4', buttonVariants({variant:'outline'}))} href={`/dashboard/overview/${id}`}>
                <MoreHorizontal />
                </Link>
            </div>
            <span className='p-2 rounded-md bg-[#EEFBE4] font-semibold text-sm text-[#5F843A] '>Active</span>

        </Card> })}
        </div>
    }
   
    </div>
  )
}
