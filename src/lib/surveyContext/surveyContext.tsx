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
});

export const SurveyContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [allSurveys, setAllSurveys] = useState<AllSurveysType>([]);
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState<number>(0);
  return (
    <SurveyContext.Provider
      value={{
        allSurveys,
        currentSurveyIndex,
        setAllSurveys,
        setCurrentSurveyIndex,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};


export const useSurveyContext = () => {
    return useContext(SurveyContext)
}

