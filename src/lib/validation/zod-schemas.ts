import {z} from 'zod'
import { type SurveyState } from '../actions/createSurveyAction'

export const BasicinfoSchema = z.object({
    jobTitle:z.string()
  })

  export const CreateSurveySchema = z.object({
    name:z.string().min(3, {message:'name of the survey cant be less than 3 characters'}),
    desc:z.string().min(1, {message:'survey description cant be empty'}),
    noq:z.coerce.number().min(1).max(5)
  })

  export type CreateSurveyType = z.infer<typeof CreateSurveySchema>

  export const initialSurveyState:SurveyState = {
    desc:{
     error:false,
     message:''
    } ,
    name:{
     error:false,
     message:''
    } ,
    noq:{
     error:false,
     message:''
    } ,
    success:false,
   }

   export const createSurveyInputSchema = z.object({
    surveyName:z.string(),
    surveyDescription:z.string(),
    numberOfQuestions:z.coerce.number()
})

export type createInputSchemaTypes = z.infer<typeof createSurveyInputSchema>


export const SurveyResultsSchema = z.object({
  results:z.array(z.object({id:z.string(), questionText:z.string(), options:z.array(z.object({id:z.string(), answerText:z.string()}))}))
})
export type SurveyResultsType = z.infer<typeof SurveyResultsSchema>