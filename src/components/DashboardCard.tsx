import * as React from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"


type DashboardCardProps = {
    header:string;
    footer:string;
    content:number;
}
export function DashboardCard({header, footer, content}:DashboardCardProps) {
  return (
    <Card className="min-w-[310px] flex flex-col gap-2 p-4">
      <CardHeader className="p-0 text-base text-[#B4B6B8] font-semibold">{header}</CardHeader>
      <CardContent className="p-0 text-3xl font-bold">{content}</CardContent>
      <CardFooter className="p-0 text-base text-[#B4B6B8] font-semibold">{footer}</CardFooter>
    </Card>
  )
}
