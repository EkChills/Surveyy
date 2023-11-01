"use client"


import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Camera } from "lucide-react";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import UploadImageButton from "./UploadImageButton";
import { z } from "zod";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { addBasicInfo } from "@/lib/BasicInfoAction";
import { experimental_useFormState as useFormState, useFormStatus } from 'react-dom'
import { cn } from "@/lib/utils";

export const BasicinfoSchema = z.object({
  jobTitle:z.string()
})

const initialState = {
  message:null
}

export type BasicinfoType = z.infer<typeof BasicinfoSchema>
export default function BasicInfoForm() {
  const [jobTitleText, setJobTitleText] = useState<string>('')
  
  const [state, formAction] = useFormState(addBasicInfo, initialState)
  const {pending} = useFormStatus()
  

  return (
    <form action={formAction} className="mt-6">
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="job-title" className="font-semibold text-[#939299]">
          Job title
        </Label>
        <Input
          type="text"
          className="w-full font-semibold"
          id="job-title"
          placeholder="Manager"
          name="jobTitle"
          value={jobTitleText}
          required
          onChange={(e) => setJobTitleText(e.target.value)}
        />
      </div>
      <div className="pt-4">
        <Label className="font-semibold text-[#939299] ">
          Add your profile pic
        </Label>
        <div className="mt-4 flex items-center gap-4">
        <UploadImageButton />
          <div className="flex flex-col ">
            <span className="leading-0 text-base font-semibold text-[#15253D]">
              Upload your profile pic
            </span>
            <span className="font-semibold text-[#939299] ">
              Square/circular icons work best. Minimum 256px x 256px
            </span>
          </div>
        </div>
      </div>
      <Button size={"lg"} className={cn('mt-6 font-semibold', pending && 'brightness-150')}>
        Continue
      </Button>
    </form>
  );
}
