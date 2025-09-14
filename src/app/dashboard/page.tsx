"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import React, { useState } from "react"
import clsx from "clsx"
import MainArea from "./MainArea"
import { DashboardFooter } from "@/components/DashboardFooter"

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={clsx(
          "transition-all duration-300 border-r",
          collapsed ? "lg:w-[70px]" : "lg:w-[240px]",
          "bg-white dark:bg-dark border-gray-200 dark:border-dark" // Custom colors
        )}
      >
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-dark">
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 h-full">
            <MainArea />
          </div>
        </div>
      <DashboardFooter />

      </div>
    </div>

  )
}
