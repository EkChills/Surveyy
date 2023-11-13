import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, uuid, varchar, integer } from "drizzle-orm/pg-core";
 



export const user = pgTable('user',{
  id:text('id').primaryKey(),
  givenName:varchar('given_name', {length:200}),
  familyName:varchar('family_name', {length:200}),
  email:varchar('email', {length:256}),
  picture:text('picture'),
  jobTitle:text('job_title')
})

export const surveys = pgTable('surveys', {
  id:uuid('id').primaryKey().defaultRandom(),
  name:varchar('survey_name', {length:255}),
  description:text('description'),
  noq:integer('number_of_questions'),
  userId:text('user_id').references(() => user.id)
})



export const results = pgTable('surveyResults',{
  id:text('id').primaryKey(),
  surveyId:text('survey_id'),
  questionText:text('question_text'),
})

export const options = pgTable('options', {
  id:text('id').primaryKey(),
  resultId:text('result_id').references(() => results.id),
  answerText:varchar('answer_text', {length:256})
})

export const userRelations = relations(user, ({many}) => ({
  surveys:many(surveys)
}))

export const surveyResultsRelations = relations(surveys, ({many}) => ({
  results:many(results)
}))

export const surveysRelations = relations(surveys, ({one, many}) => ({
  user: one(user,{
    fields:[surveys.userId],
    references:[user.id],
    relationName:'userSurvey'
  }),
})) 

export const resultsRelations = relations(results, ({one}) => ({
  survey:one(surveys, {
    fields:[results.surveyId],
    references:[surveys.id]
  })
}))

export const optionRelation = relations(options, ({one}) => ({
  result:one(results, {
    fields:[options.resultId],
    references:[results.id]
  })
}))

export const resultToOptionRelations = relations(results, ({many}) => ({
  options:many(options)
}))


// export const usersRelations = relations(user, ({ many }) => ({
//     posts: many(posts),
//   }));
//   export const postsRelations = relations(posts, ({ one }) => ({
//     author: one(user, {
//       fields: [posts.userId],
//       references: [user.id],
//     }),
//   }));