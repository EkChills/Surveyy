"use server"

import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

const BasicinfoSchema = z.object({
    jobTitle:z.string()
  })

export const addBasicInfo = async(prevState:{message:string | null}, formData:FormData) => {
    console.log(formData);
    const {getUser} = getKindeServerSession()
    const kindeUser = getUser()
   
    const jobTitleData = formData.get('jobTitle')
    const data =  BasicinfoSchema.parse({jobTitle:jobTitleData})
    await db.update(user).set({jobTitle:data.jobTitle}).where(eq(user.id, kindeUser.id!))
    redirect('/dashboard')
    return {
        message:`updated users job title to ${data.jobTitle}`
    }
  }