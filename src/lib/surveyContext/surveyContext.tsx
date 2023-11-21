"use client";

import {
  useContext,
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type AllSurveysType = {
  id: string;
  questionText: string | null;
  options?: {
    id: string;
    answerText: string;
  }[];
}[];

export type SurveyContextTypes = {
  allSurveys: AllSurveysType;
  currentSurveyIndex: number;
  setCurrentSurveyIndex: Dispatch<SetStateAction<number>>;
  setAllSurveys: Dispatch<SetStateAction<AllSurveysType>>;
  answeredSurveys:{id:string; userId:string; optionId:string; surveyId:string;}[]
  setAnsweredSurveys:Dispatch<SetStateAction<{id:string; userId:string; optionId:string; surveyId:string;}[]>>
};

export const SurveyContext = createContext<SurveyContextTypes>({
  allSurveys: [],
  currentSurveyIndex: 0,
  setAllSurveys: () => {
    return
  },
  setCurrentSurveyIndex: () => {
    return
  },
  answeredSurveys:[],
  setAnsweredSurveys:() => {
    return
  }
});

export const SurveyContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [allSurveys, setAllSurveys] = useState<AllSurveysType>([]);
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState<number>(0);
  const [answeredSurveys, setAnsweredSurveys] = useState<{id:string; userId:string; optionId:string; surveyId:string;}[]>([])
  return (
    <SurveyContext.Provider
      value={{
        allSurveys,
        currentSurveyIndex,
        setAllSurveys,
        setCurrentSurveyIndex,
        answeredSurveys,
        setAnsweredSurveys
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};


export const useSurveyContext = () => {
    return useContext(SurveyContext)
}

