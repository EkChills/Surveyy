
import {type AuthEndpoints,  handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
import {type NextRequest } from "next/server";

export async function GET(request:NextRequest, {params}:{params:{kindeAuth:AuthEndpoints}}) {
	await Promise.resolve()
	const endpoint =  params.kindeAuth;
	return handleAuth(request, endpoint) as Response ;
}