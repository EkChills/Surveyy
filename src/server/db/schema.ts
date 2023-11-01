import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
 



export const user = pgTable('user',{
  id:text('id').primaryKey(),
  givenName:varchar('given_name', {length:200}),
  familyName:varchar('family_name', {length:200}),
  email:varchar('email', {length:256}),
  picture:text('picture'),
  jobTitle:text('job_title')
})

// export const usersRelations = relations(user, ({ many }) => ({
//     posts: many(posts),
//   }));
//   export const postsRelations = relations(posts, ({ one }) => ({
//     author: one(user, {
//       fields: [posts.userId],
//       references: [user.id],
//     }),
//   }));