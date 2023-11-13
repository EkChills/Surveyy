"use client"

import { Check, Copy } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function CopyLink({copyText}:{copyText?:string}) {
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const handleCopy = async() => {
        if(copyText) {
            await navigator.clipboard.writeText(copyText)
            setIsCopied(true)
        }

    }

    useEffect(() => {
        if(isCopied) {
            setTimeout(() => setIsCopied(false), 2000)
        }
    },[isCopied])
  return (
    <>
    {isCopied ? <Check className='text-[#1B324D] font-semibold cursor-pointer'  /> : <Copy className='text-[#1B324D] font-semibold cursor-pointer' onClick={handleCopy} />}
    </>
  )
}
