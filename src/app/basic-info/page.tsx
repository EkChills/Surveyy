import BasicInfoForm from '@/components/BasicInfoForm'
import { db } from '@/server/db'
import { user } from '@/server/db/schema'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function BasicInfo() {
  const {getUser} = getKindeServerSession()
  const kindeUser = getUser()
  if(!kindeUser?.id) {
    redirect('/')
  }
  const dbUser = await db.select().from(user).where(eq(user.id, kindeUser.id))
  console.log(dbUser);
  
  if(!dbUser[0]) {
    redirect('/auth-callback?origin=basic-info')
  }
  return (
    <div className='flex justify-center pt-[10rem]'>
      <div className='max-w-[35rem]'>
        <h2 className='text-[#030303] text-2xl lg:text-3xl antialiased font-semibold'>Nice, lets get some basic info about you.</h2>
        <p className='text-base text-[#939299] font-semibold antialiased mt-4'>We need your job title and your profile pics to show with any surveys you create.</p>
        <BasicInfoForm />
      </div>
    </div>
  )
}
