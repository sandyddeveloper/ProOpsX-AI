import { cookies } from "next/headers";
import ThemeProvider from "@/context/ThemeProvider";
import DashboardShell from "./DashboardShell"; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = (cookieStore.get("theme")?.value as "light" | "dark") || "light";

  return (
    <html lang="en">
      <body
        className={`h-full antialiased ${
          theme === "dark"
            ? "dark bg-dark text-white"
            : "light bg-white text-black"
        }`}
      >
        <ThemeProvider defaultTheme={theme}>
          <DashboardShell>{children}</DashboardShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
