"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useLocalStorage } from "../hooks";
import { ThemeContextShape } from "@/types";

export const ThemeContext = createContext<ThemeContextShape | null>(null);

export default function ThemeContextProvider({ children }: {children: React.ReactNode}) {

    const [dark, setDark] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});


    const { getItem } = useLocalStorage('value');
    const savedMode: boolean = getItem();
  
    useEffect(() => {
      setDark(savedMode);
    }, []);
 
    return (
        <ThemeContext.Provider
            value={{dark, setDark, loading, setLoading, notify, setNotify}}
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
