"use client"

import React, { useState, ReactNode, useEffect } from "react"
import { ThemeContext, ThemeContextType } from "./ThemeContext"
import Cookies from "js-cookie"

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme: "light" | "dark" // <- comes from server (SSR)
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme }) => {
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme)

  // Keep <html> class + cookie synced with state
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    Cookies.set("theme", theme, { expires: 365 }) // store for 1 year
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const values: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
