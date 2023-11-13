import { openai } from "@/lib/openai";
import { SurveyResultsSchema,type SurveyResultsType,type createInputSchemaTypes, createSurveyInputSchema } from "@/lib/validation/zod-schemas";
import { db } from "@/server/db";
import { surveys } from "@/server/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {NextResponse, type NextRequest } from "next/server";
import {v4 as uuid} from 'uuid'



export async function POST (req:NextRequest) {
  console.log('triggered');
  
  const body = await req.json() as createInputSchemaTypes
  const surveyInputs = createSurveyInputSchema.parse({...body})
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            `your sole role is to create surveys depending on the users input. the inputs are the name of the survey, description of the survey, and number of questions this is how the input will look like from the user: \n {
              surveyName:'survey name from user',
              surveyDescription:'survey description from user',
              numberOfQuestions:'number of questions provided by the user'
            } \n \n and you should reply with the survey questions with arrays  of the stringified questions like this: \n {results: [
              {
                  "id":"should be a random string id",
                  "questionText":"question text",
                  "options":[
                      {"id":"random id", "answerText":"string of the option text"}
                  ],
              }
            ] } \n the length of the results array can be more depending on the number of questions value from the user.  make sure the questions are exactly the number of questions provided by the user and when i run JSON.parse it must parse correctly. dont add any string literals that would cause this error to show  unterminated string literal at line 1 column 420 of the JSON data `,
        },
         {
          role: "user",
          content:
            `{"surveyName":${surveyInputs.surveyName}, "surveyDescription":${surveyInputs.surveyDescription}, "numberOfQuestions":${surveyInputs.numberOfQuestions}}`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature:1,
      // max_tokens:100
    });
    if(!chatCompletion) {
      throw new Error('OpenAI API error');
    }
    const parsableJson = chatCompletion?.choices[0]!.message.content
    const parsed = JSON.parse(parsableJson!) as {results:SurveyResultsType[]};
    const validatedResults = SurveyResultsSchema.parse(parsed)
    const uniqueResults = validatedResults.results.map((res) => ({...res, id:uuid()}))
    console.log(validatedResults);
    return NextResponse.json({results:uniqueResults})
    

  } catch (error) {
    console.log(error);
   return new NextResponse('something went wrong') 
  }
}