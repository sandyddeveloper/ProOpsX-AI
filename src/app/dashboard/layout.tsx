"use client"

import Sidebar from "@/components/Sidebar"
import React, { useState } from "react"
import clsx from "clsx"
import Header from "@/components/Header"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            {/* Sidebar */}
            <div
                className={clsx(
                    "transition-all duration-300 border-r border-gray-200 bg-white",
                    collapsed ? "w-[70px]" : "w-[240px]"
                )}
            >
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                <Header />
                <div className="p-3">
                    {children}
                </div>
            </div>
        </div>
    )
}
