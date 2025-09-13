"use client"

import { createContext } from "react"

export interface ThemeContextType {
  theme: "light" | "dark"
  toggleTheme: () => void
  setTheme: (theme: "light" | "dark") => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
})
