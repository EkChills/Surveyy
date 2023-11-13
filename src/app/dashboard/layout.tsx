import MainNavbar from '@/components/MainNavbar'
import {type Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
    title:"Dashboard"
}
export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <main>
    <MainNavbar />
    {children}
    </main>
  )
}
