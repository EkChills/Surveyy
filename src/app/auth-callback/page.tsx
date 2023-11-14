"use client"

import { api } from '@/trpc/react'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function AuthCallback() {
  const router = useRouter()
  const {data, isSuccess, isError} = api.user.authCallback.useQuery(undefined, {
    retry:true,
    retryDelay:500
  })
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')
  if(isSuccess && data.success) {
    return router.push(`/${origin}`)
  }
  if(isSuccess && !data.success) {
    return router.push('/')
  }
  if(isError) {
    return router.push('/')
  }
  
  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>Setting up your account...</h3>
        <p>you will be redirected automatically.</p>
      </div>
    </div>
  )
}
