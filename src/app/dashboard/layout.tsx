import { cookies } from "next/headers";
import ThemeProvider from "@/context/ThemeProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = (cookieStore.get("theme")?.value as "light" | "dark") || "light";

  return (
    <html lang="en">
      <body className={`h-full bg-black text-white antialiased ${theme === "dark" ? "dark" : "light"}`}>
        <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}

