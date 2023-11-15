import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import {NextResponse, type NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    const body = await req.json() as {imageUrl:string, userId:string;}
    const {getUser} = getKindeServerSession() 
    const kindeuser = getUser()
    try {
     await db.update(user).set({picture:body.imageUrl}).where(eq(user.id, body.userId))
     return NextResponse.json({
        msg:"user updated"
     })   
    } catch (error) {
        console.log(error);
        return new NextResponse('something went wrong', {status:500})
    }
}