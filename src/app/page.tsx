import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { LoginLink, RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export default function Home() {
  const {getUser} = getKindeServerSession()
  const user = getUser()
  console.log(user);
  
  return (
    <main className='min-h-screen flex flex-col relative'>
      <nav className='flex items-center  px-4 '>
        <div className='flex items-center gap-0'>
          <Image className='w-[3rem] h-[3rem] object-cover' width={48} height={48} src={'/bird_2.jpg'} alt='logo' />
          <h2 className='text-2xl font-bold antialiased'>Surveyy</h2>
        </div>
        <div className='flex font-semibold items-center gap-8 ml-10 text-base text-[#7B7995] antialiased'>
          <Link href={'/pricing'}>Features</Link>
          <Link href={'/pricing'}>Pricing</Link>
        </div>
        <div className='ml-auto flex items-center gap-4 pt-4'>
          <LoginLink className={cn(buttonVariants({variant:'outline'}), 'font-semibold rounded-lg')}>Login</LoginLink>
          <RegisterLink className={cn(buttonVariants(), 'font-semibold rounded-lg')}>Create account</RegisterLink>
        </div>
      </nav>
      <div className='flex items-center mt-[6rem] flex-col'>
        <div className='w-full lg:max-w-[32rem] rounded-full bg-[#FEF6F0] min-h-[2.25rem] flex px-6 items-center gap-4 justify-center'>
        <Sparkles className='w-6 h-6 text-[#DA724C]' />
          <p className='text-base antialiased text-center mx-auto font-semibold text-[#DA724C] my-auto'>Create surveys and understand your responses with AI</p>
        </div>
        <h3 className='text-4xl lg:5xl xl:text-6xl mt-[3rem] max-w-[45rem] text-balance text-center font-bold antialiased'>
          Create surveys with AI and collect insights from your <span className=' text-[#EA3494]  rounded-md p-0 m-0 leading-none '> audience</span>
        </h3>
        <div className='flex items-center gap-4 mt-6'>
        <RegisterLink className={cn(buttonVariants(), 'font-semibold rounded-lg')}>Create your account</RegisterLink>
        <Button className={cn(buttonVariants({variant:'outline'}), 'font-semibold text-[#3F4C61] rounded-lg')}>Demo Survey</Button>
        </div>
        <p className='text-sm text-[#8D8C93] font-semibold mt-4'>Get up to 150 responses a month for free</p>
      </div>
      <div className='hidden absolute bottom-0 lg:flex flex-col px-[10rem] text-start justify-start pb-4'>
        <span className='text-base text-[#EA3494] font-bold'>Surveys</span>
        <h2 className='text-4xl lg:5xl  mt-4 max-w-[45rem] text-balance font-bold antialiased'>Survey types.</h2>
        <p className='text-[#474F65] text-base max-w-[50rem]'>At Surveyy, we offer a variety of survey types to ensure that you receive the most accurate and valuable feedback from your audience</p>
      </div>
    </main>
  )
}
