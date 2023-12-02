
import EditForm from "@/components/EditForm"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Card } from "@/components/ui/card"
import { CurrentlyEditingSurveyType } from "@/lib/surveyContext/surveyContext"
import { db } from "@/server/db"
import { results } from "@/server/db/schema"
import { eq } from "drizzle-orm"

// export async function generateStaticParams() {
//   const questions = 
// }


export default async function Edit({params}:{params:{resultId:string}}) {
  const currentQuestion = await db.query.results.findFirst({
    where:eq(results.id, params.resultId),
    with:{
      options:true
    }
  })
  console.log(currentQuestion);
  
  return (
    <MaxWidthWrapper className="flex flex-col">
      <h1 className="text-2xl font-semibold md:text-3xl mt-12">Question</h1>
      <Card className="mt-4 p-6">
        <div className="flex flex-col gap-4">
          <EditForm currentQuestion={currentQuestion as CurrentlyEditingSurveyType} />
        </div>
      </Card>
    </MaxWidthWrapper>
  )
}
