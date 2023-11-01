import { NextResponse } from "next/server";

export async function GET() {
    await new Promise((res) => res('hello'))
    return NextResponse.json({
        msg:'hello'
    })
}