import React, { Suspense } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Overview from './Overview'

export default function OverviewTabs({surveyId}:{surveyId:string}) {
  return (
    <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-0 bg-transparent font-bold text-sm">
          <TabsTrigger className='font-semibold shadow-none bg-transparent' value="overview">Overview</TabsTrigger>
          <TabsTrigger className='font-semibold' value="responses">Responses</TabsTrigger>
          <TabsTrigger className='font-semibold'  value="questions">Question</TabsTrigger>
        </TabsList>
       <TabsContent value='overview'>
        <Suspense fallback={<div>Loading...</div>}>
        <Overview surveyId={surveyId} />

        </Suspense>
       </TabsContent>
      </Tabs>
  )
}
