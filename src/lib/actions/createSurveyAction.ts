"use server"

import { ZodError } from "zod";
import { CreateSurveySchema, type SurveyResultsType, initialSurveyState } from "../validation/zod-schemas";
import { db } from "@/server/db";
import { options, results, surveys } from "@/server/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { baseUrl } from "../utils";


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
    
    // await new Promise((res) => setTimeout(() => res('hello'), 3000))
//  




const createdSurveysPromise = await axios.post(`${baseUrl}/api/createSurvey`,{numberOfQuestions:validatedInputs.noq, surveyDescription:validatedInputs.desc, surveyName:validatedInputs.name} )
const surv = await db.insert(surveys).values({description:validatedInputs.desc, name:validatedInputs.name, noq:validatedInputs.noq, userId:user.id}).returning({surveyId:surveys.id})
const createdSurveys = await createdSurveysPromise.data as SurveyResultsType

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