import React from 'react'
import { DashboardCard } from './DashboardCard'

export default function CardsWrapper() {
 
  return (
    <div className='mt-6 flex items-center gap-6 overflow-x-scroll scrollbar-thumb-gray-900 scrollbar-none scrollbar-track-gray-100'>
        <DashboardCard content={0} footer='0% from last month' header='Surveys created'/>
        <DashboardCard content={0} header='Survey responses this month' footer='0% from last month' />
        <DashboardCard content={0} header='Question views this month' footer='0% from last month' />
        <DashboardCard content={0} header='Question engagement rate' footer='Views vs Questions completions' />
    </div>
  )
}
