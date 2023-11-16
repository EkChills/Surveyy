"use server"

import { ZodError } from "zod";
import { CreateSurveySchema, type SurveyResultsType, initialSurveyState, SurveyResultsSchema } from "../validation/zod-schemas";
import { db } from "@/server/db";
import { options, results, surveys } from "@/server/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { baseUrl } from "../utils";
import { openai } from "../openai";


export type SurveyState = {
    name?:{
        error:boolean;
        message:string
    },
    desc?:{
        error:boolean;
        message:string;
    },
    noq?:{
        error:boolean;
        message:string;
    },
    success?:boolean;
    surveyId?:string;
}

export type SurveyData = {
    name:string;
    desc:string;
    noq:string;
}
export async function createSurveyAction(prevState:SurveyState, formData:FormData){
try {
    const {getUser} = getKindeServerSession()
    const user = getUser()

    const surveyName = formData.get('name')
    const desc = formData.get('desc')
    const noq = formData.get('noq')
    console.log(surveyName, desc, noq);
    
    const validatedInputs = CreateSurveySchema.parse({
        name:surveyName,
        desc:desc,
        noq:noq
    })
    console.log(validatedInputs);
    
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
              `{"surveyName":${validatedInputs.name}, "surveyDescription":${validatedInputs.desc}, "numberOfQuestions":${validatedInputs.noq}}`,
          },
        ],
        model: "gpt-3.5-turbo",
        temperature:1.2,
      });
      if(!chatCompletion) {
        throw new Error('OpenAI API error');
      }
      const parsableJson = chatCompletion?.choices[0]!.message.content
      console.log(parsableJson);
      
      const parsed = JSON.parse(parsableJson!) as {results:SurveyResultsType[]};
      const validatedResults = SurveyResultsSchema.parse(parsed)
      const uniqueResults = validatedResults.results.map((res) => ({...res, id:uuid()}))
      


// const createdSurveysPromise = await axios.post(`${baseUrl}/api/createSurvey`,{numberOfQuestions:validatedInputs.noq, surveyDescription:validatedInputs.desc, surveyName:validatedInputs.name} )


const surv = await db.insert(surveys).values({description:validatedInputs.desc, name:validatedInputs.name, noq:validatedInputs.noq, userId:user.id}).returning({surveyId:surveys.id})
const createdSurveys = {results:uniqueResults} 
console.log(createdSurveys);


    // await api.survey.createSurvey.mutate({numberOfQuestions:validatedInputs.noq, surveyDescription:validatedInputs.desc, surveyName:validatedInputs.name})
    // const createdSurvey = await db.insert(surveys).values({name:validatedInputs.name, description:validatedInputs.desc, noq:validatedInputs.noq, userId:user.id})
    // console.log(createdSurvey);
    
    
    await db.transaction(async(tx) => {
        const insertedResults = createdSurveys.results.map((surv) => {
            return {id:surv.id, questionText:surv.questionText}
        })
     
          const allInsertedResults = await tx.insert(results).values(insertedResults.map(res => ({...res, surveyId:surv[0]?.surveyId}))).returning({
            resultId:results.id
          });
        

        // const allResults = await tx.query.results.findMany({
        //    where:eq(results.surveyId,surv[0]!.surveyId ) 
        // })
        let allOptions = [] as {
            id: string;
            answerText: string;
        }[]
        createdSurveys.results.map((result, idx) => {
            const opts = result.options.map(op => ({...op,id:uuid(),resultId:allInsertedResults[idx]?.resultId}))
            allOptions = [...allOptions, ...opts]
            return {...result}
        })
        console.log(allOptions);
        
        await tx.insert(options).values(allOptions)
        
       
    })
    
    console.log(createdSurveys);
    

    return {
        ...initialSurveyState,
        success:true,
        surveyId:surv[0]?.surveyId
    }
} catch (error) {
    console.log(error);
    
    console.log(error instanceof ZodError);
    if(error instanceof ZodError) {
        const validationStates = {...initialSurveyState}
        error.issues.map(issue => {
            if(issue.path[0] === 'name') {
                // return {name:{
                //     error:true,
                //     message:issue.message
                // }}
                validationStates.name = {error:true, message:issue.message}
            }
            if(issue.path[0] === 'desc') {
                // return {desc:{
                //     error:true,
                //     message:issue.message
                // }}
                validationStates.desc = {
                    error:true,
                    message:issue.message
                }
            }
            if(issue.path[0] === 'noq') {
                // return {noq:{
                //     error:true,
                //     message:issue.message
                // }}
                validationStates.noq = {
                    error:true,
                    message:issue.message
                }
            }
        })
        console.log(validationStates);
        
        return {...validationStates }
    }
    return {...initialSurveyState}   
}
}