import { db } from "@/server/db";
import { results } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { QuestionSummary, } from "./QuestionSummary";

export default async function Overview({ surveyId }: { surveyId: string }) {
    await new Promise(res => {
        setTimeout(() => res('yes'), 3000)
    })
  const surveyResults = await db.query.results.findMany({
    where: eq(results.surveyId, surveyId),
    with:{
      options:true
    }
  }) as  {
    surveyId: string | null;
    id: string;
    questionText: string | null;
    options:{
      id: string,
      resultId: string,
      answerText: string;
    }[]
}[]
  console.log(surveyResults);

  return (
    <div className="flex flex-col gap-4">
      {surveyResults.map((result, idx) => {
        const { id, questionText,options } = result;
        return (
          <Card key={id} className="w-full p-0">
            <CardHeader className="flex justify-between items-center border-b flex-row p-4">
              <CardTitle className="text-[#0F223A] text-base font-semibold">{idx + 1}.{" "}{questionText}</CardTitle>
              <QuestionSummary questionNo={idx + 1} {...result} />
            </CardHeader>
            <CardFooter className="p-4">
                <span className="text-[#90969F] font-semibold text-sm">No votes yet</span>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
