"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import React, { useState } from "react"
import clsx from "clsx"

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={clsx(
          "transition-all duration-300 border-r border-gray-200  dark:bg-gray-900 dark:border-gray-700",
          collapsed ? "w-[70px]" : "w-[240px]"
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
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <div className="flex-1 overflow-y-auto p-6">
          {/* <div className="p-3">{children}</div> */}
        </div>
      </div>
    </div>
  )
}
