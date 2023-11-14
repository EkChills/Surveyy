// import { openai } from "@/lib/openai";
// import { createTRPCRouter, privateProcedure } from "../trpc";
// import {z} from 'zod'

// interface ResOut {
//   surveyName:string
//   surveyDescription:string;
//   options:{id:string, answerText:string}
// }


// export const surveyRouter = createTRPCRouter({
//     createSurvey:privateProcedure.input(z.object({
//         surveyName:z.string(),
//         surveyDescription:z.string(),
//         numberOfQuestions:z.coerce.number()
//     })).mutation(async({ctx, input}) => {
//         const chatCompletion = await openai.chat.completions.create({
//             messages: [
//               {
//                 role: "system",
//                 content:
//                   `your sole role is to create surveys depending on the users input. the inputs are the name of the survey, description of the survey, and number of questions this is how the input will look like from the user: \n {
//                     surveyName:'survey name from user',
//                     surveyDescription:'survey description from user',
//                     numberOfQuestions:'number of questions provided by the user'
//                   } \n \n and you should reply with the survey questions with arrays  of the stringified questions like this: \n {results: [
//                     {
//                         "id":"should be a random string id",
//                         "questionText":"question text",
//                         "options":[
//                             {"id":"random id", "answerText":"string of the option text"}
//                         ],
//                     }
//                   ] } \n the length of the results array can be more depending on the number of questions value from the user.  make sure the questions are exactly the number of questions provided by the user and when i run JSON.parse it must parse correctly. dont add any string literals that would cause this error to show  unterminated string literal at line 1 column 420 of the JSON data `,
//               },
//                {
//                 role: "user",
//                 content:
//                   `{"surveyName":${input.surveyName}, "surveyDescription":${input.surveyDescription}, "numberOfQuestions":${input.numberOfQuestions}}`,
//               },
//             ],
//             model: "gpt-3.5-turbo",
//             temperature:1,
//             // max_tokens:100
//           });
//           if(!chatCompletion) {
//             throw new Error('OpenAI API error');
//           }
//           const parsableJson = chatCompletion?.choices[0]!.message.content
//           const parsed = JSON.parse(parsableJson!) as {results:ResOut[]};
//           const validatedResults = SurveyResultsSchema.safeParse(parsed)

          
//         return {
//             ...validatedResults
//         }
//     })
// })