import { createTRPCRouter, privateProcedure } from "../trpc";
import { user } from "@/server/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
    authCallback:privateProcedure.query(async({ctx}) => {
        const {getUser} = getKindeServerSession()
        const session = getUser()
        if(!session) {
            return {success:false}
        }

        const dbUser = await ctx.db.select().from(user).where(eq(user.id, session.id!))
        const firstUser = dbUser[0]
        if(!firstUser) {
            await ctx.db.insert(user).values({
                id:session.id!,
                email:session.email!,
                familyName:session.family_name,
                givenName:session.given_name,
            })
        }
        return {success:true}
    })
})