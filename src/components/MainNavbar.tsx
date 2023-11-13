import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { Bell, ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function MainNavbar() {
    const {getUser} = getKindeServerSession()
    const kindeUser = getUser()
    const userImage = db.select({picture:user.picture}).from(user).where(eq(user.id, kindeUser.id!))
    const imageUrl = (await userImage).at(0)
  return (
    <nav className="sticky inset-x-0 top-0  w-full items-center border border-b  border-gray-200 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-lg transition-all z-20">
      <div className="flex items-center">
        <div className="hidden lg:flex items-center gap-0 ">
          <Image
            className="h-[3rem] w-[3rem] object-cover"
            width={48}
            height={48}
            src={"/bird_2.jpg"}
            alt="logo"
          />
          <h2 className="text-base font-semibold text-[#2D58CD] antialiased">
            Dashboard
          </h2>
          <div className="ml-10 flex items-center gap-8  text-base font-semibold text-[#7B7995] antialiased">
            <Link href={"/pricing"}>Surveys</Link>
            <Link href={"/pricing"}>Responses</Link>
            <Link href={"/pricing"} className="flex items-center gap-2">
              <span>Account</span> <ChevronDown className="my-auto h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="flex lg:hidden items-center">
          <Menu />
        <Image
            className="h-[3rem] w-[3rem] object-cover"
            width={48}
            height={48}
            src={"/bird_2.jpg"}
            alt="logo"
          />
          <h2 className="text-base font-semibold text-[#2D58CD] antialiased">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-4 ml-auto">
        <Bell className="w-6 h-6 text-[#D5D4DB]" />
        <Image className="object-cover w-[3rem] h-[3rem] rounded-full" alt="user avatar" width={48} src={imageUrl?.picture ?? ''} height={48} />
        </div>
      </div>
    </nav>
  );
}
