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
  surveyId:string | null;
  options?: {
    id: string;
    answerText: string;
  }[];
}[];

export type CurrentlyEditingSurveyType =  {
  surveyId: string | null;
  id: string;
  questionText: string | null;
  options: {
      id: string;
      resultId: string;
      answerText: string;
  }[];
}

export type SurveyContextTypes = {
  allSurveys: AllSurveysType;
  currentSurveyIndex: number;
  setCurrentSurveyIndex: Dispatch<SetStateAction<number>>;
  setAllSurveys: Dispatch<SetStateAction<AllSurveysType>>;
  answeredSurveys:{id:string; userId:string; optionId:string; surveyId:string | null; resultId:string | null;}[]
  setAnsweredSurveys:Dispatch<SetStateAction<{id:string; userId:string; optionId:string; surveyId:string | null; resultId:string;}[]>>
  currentlyEditingSurvey:CurrentlyEditingSurveyType,
  setCurrentlyEditingSurvey:Dispatch<SetStateAction<CurrentlyEditingSurveyType>>
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
  },
  currentlyEditingSurvey:{
    id:'',
    options:[],
    questionText:'',
    surveyId:''
  },
  setCurrentlyEditingSurvey:() => {
    return
  }
});

export const SurveyContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [allSurveys, setAllSurveys] = useState<AllSurveysType>([]);
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState<number>(0);
  const [answeredSurveys, setAnsweredSurveys] = useState<{id:string; userId:string; optionId:string; surveyId:string | null; resultId:string;}[]>([])
  const [currentlyEditingSurvey, setCurrentlyEditingSurvey] = useState<CurrentlyEditingSurveyType>({
    id:'',
    options:[],
    questionText:'',
    surveyId:''
  })
  return (
    <SurveyContext.Provider
      value={{
        allSurveys,
        currentSurveyIndex,
        setAllSurveys,
        setCurrentSurveyIndex,
        answeredSurveys,
        setAnsweredSurveys,
        currentlyEditingSurvey,
        setCurrentlyEditingSurvey
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};


export const useSurveyContext = () => {
    return useContext(SurveyContext)
}

