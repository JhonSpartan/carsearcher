"use client"

import { createContext, useContext, useState } from "react"
import { useLocalStorage } from "../hooks";
import { ThemeContextShape } from "@/types";

export const ThemeContext = createContext<ThemeContextShape | null>(null);

export default function ThemeContextProvider({ children }: {children: React.ReactNode}) {
    const { getItem } = useLocalStorage('value');

    const savedMode: boolean = getItem();
    const [dark, setDark] = useState<boolean>(savedMode ?? false);
    const [loading, setLoading] = useState<boolean>(false);

 
    return (
        <ThemeContext.Provider
            value={{dark, setDark, loading, setLoading}}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Theme context should be used within ThemeContextProvider")
  }
  return context;
}
