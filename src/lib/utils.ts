import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const baseUrl = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://surveyy.vercel.app'