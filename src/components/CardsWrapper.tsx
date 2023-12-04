import React from 'react'
import { DashboardCard } from './DashboardCard'
import { db } from '@/server/db'
import { eq } from 'drizzle-orm'
import { surveys } from '@/server/db/schema'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function CardsWrapper() {
  const {getUser} = getKindeServerSession()
  const surveysCreated = await db.query.surveys.findMany({
    where:eq(surveys.userId, getUser().id!)
  })

  const currentDate = new Date();

// Calculate the date one month ago
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(currentDate.getMonth() - 1);

// Filter surveys created within the past month
const surveysWithinPastMonth = surveysCreated.filter(
  (survey) => survey.createdAt! >= oneMonthAgo && survey.createdAt! <= currentDate
);
 
  return (
    <div className='mt-6 flex items-center gap-6 overflow-x-scroll scrollbar-thumb-gray-900 scrollbar-none scrollbar-track-gray-100'>
        <DashboardCard content={surveysCreated.length} footer={`${(surveysWithinPastMonth.length / surveysCreated.length) * 100}% from last month`} header='Surveys created'/>
        <DashboardCard content={surveysWithinPastMonth.length} header='Survey responses this month' footer={`${(surveysWithinPastMonth.length / surveysCreated.length) * 100}% from last month`} />
        <DashboardCard content={0} header='Question views this month' footer='0% from last month' />
        <DashboardCard content={0} header='Question engagement rate' footer='Views vs Questions completions' />
    </div>
  )
}
