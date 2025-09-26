import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ThemeProvider from "@/context/ThemeProvider";
import DashboardShell from "./DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get JWT token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get("jwt")?.value;

  // Redirect if not authenticated
  if (!token) {
    redirect("/auth/signin");
  }

  // Get theme from cookies
  const theme = (cookieStore.get("theme")?.value as "light" | "dark") || "light";

  return (
    <ThemeProvider defaultTheme={theme}>
      <DashboardShell>{children}</DashboardShell>
    </ThemeProvider>
  );
}
