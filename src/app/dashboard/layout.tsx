import { cookies } from "next/headers"
import ThemeProvider from "@/context/ThemeProvider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get theme from cookies on the server
  const cookieStore = cookies()
  const theme = (cookieStore.get("theme")?.value as "light" | "dark") || "light"

  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <body>
        {/* Pass theme into ThemeProvider so client starts in sync */}
        <ThemeProvider defaultTheme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
