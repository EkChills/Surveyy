import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { db } from "@/server/db"
import { answered } from "@/server/db/schema"
import { eq } from "drizzle-orm"
import { Card } from "./ui/card"
import { DashboardCard } from "./DashboardCard"

type QuestionSummaryProps = {
  questionNo:number;
  id:string;
  questionText:string | null;
  surveyId:string | null;
  options:{ id: string,
  resultId: string,
  answerText: string}[],
  answeredQuestions: {
    surveyId: string | null;
    resultId:string | null;
    id: string;
    userId: string | null;
    optionId: string | null;
}[]
}

export function QuestionSummary({questionNo, questionText, id, surveyId, options, answeredQuestions}:QuestionSummaryProps) {
  console.log(answeredQuestions);
  const totalVotes = answeredQuestions.filter((ans) => ans.resultId === id)
  // E9E8ED
  // 07132D
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="outline">Summary</Button>
      </SheetTrigger>
      <SheetContent >
        <SheetHeader className="text-sm text-[#9191A1] font-semibold ">Question Summary</SheetHeader>  
        <h3 className="text-lg font-semibold text-black antialiased max-w-lg mt-4">{questionNo + ' ' + questionText}</h3>    
        <Card className="px-4 pb-6 pt-2 mt-6">
          {options.map((option) => {
            const totalOptions = answeredQuestions.length
            const numberAnswered = answeredQuestions.filter((ans) => ans.optionId === option.id).length
            const percentAnswered = Math.floor(((numberAnswered / totalVotes.length) * 100))
            return <div key={option.id} className="flex flex-col mt-4">
              <div className="w-full flex items-center justify-between">
              <span className="text-base text-[#07132D] font-semibold">{option.answerText}</span>
              <span className="text-base text-black font-semibold">{percentAnswered ? percentAnswered + '%' : '0%' }</span>
              </div>
              <span className="w-full rounded-lg h-[5px] mt-4 bg-[#E9E8ED]"></span>
            </div>
          })}
        </Card>   
        <div className="flex flex-col gap-4 mt-6">
          <span className="text-base font-semibold text-[#343549]">Stats</span>
          <DashboardCard content={totalVotes.length || 0} footer="0% change from yesterday" header="Total votes"  />
        </div>
      </SheetContent>
    </Sheet>
  )
}
