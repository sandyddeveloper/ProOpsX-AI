
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Suspense } from "react";
import Loader from "@/components/ui/loader";
import GlobalLoader from "@/components/ui/GlobalLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProOpsX-AI",
  description: "A landing page for ProOpsX-AI created with Project Management AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={twMerge(inter.className, "bg-black text-white antialiased")}>
        <GlobalLoader />
        <Suspense fallback={<Loader />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
