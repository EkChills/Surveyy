
import CreateSurveyForm from "@/components/CreateSurveyForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/server";
import React from "react";

export default function NewSurvey() {
  // const { mutate: createSurvey, data } = api.survey.createSurvey.useMutation();

  // function createSurvey () {
  //   'use server'
  //    api.survey.createSurvey.mutate({})
  // }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <div className="flex flex-col lg:w-1/2">
        <MaxWidthWrapper className="px-4 pt-[5rem] lg:px-[8rem]">
         <CreateSurveyForm />
        </MaxWidthWrapper>
      </div>
      <div className="hidden bg-[url(/emojis.jpg)] bg-cover bg-no-repeat lg:flex lg:w-1/2 "></div>
    </div>
  );
}
