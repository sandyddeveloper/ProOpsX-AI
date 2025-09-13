"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import Logo from "@/assets/logo.png"
import { sideBarMenu } from "@/util/data"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"


interface SubMenuItem {
  title: string
  href: string
}
interface MenuItem {
  title: string
  href?: string
  icon: React.ElementType
  items?: SubMenuItem[]
}

interface SidebarProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const pathname = usePathname()
  const [openIndex, setOpenIndex] = useState<number | null>(null)


  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleMobileClose = () => {
    if (mobileOpen) setMobileOpen(false)
  }

  return (
    <>
      <aside
        className={clsx(
          "fixed top-0 left-0 h-screen max-h-screen flex flex-col transition-all duration-300 ease-in-out z-40 shadow-sm border-r",

          // Light / Dark backgrounds & borders
          "bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700",

          // Desktop (lg and up)
          "lg:translate-x-0",
          collapsed ? "lg:w-[70px]" : "lg:w-[240px]",

          // Mobile/Tablet (<lg)
          mobileOpen
            ? "translate-x-0 w-[70%] sm:w-[40%]"
            : "-translate-x-full w-[70%] sm:w-[40%]"
        )}
      >
        {/* Header */}
        <div
          className={clsx(
            "flex items-center justify-between gap-3 mb-4 px-4 py-3 border-b sticky top-0 z-10",
            "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700",
            collapsed && "justify-center"
          )}
        >
          <div className="flex items-center gap-3">
            <Image
              src={Logo}
              alt="Logo"
              className="rounded-lg w-10 h-10 object-contain"
            />
            {!collapsed && (
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 whitespace-nowrap">
                Pro<span className="text-purple-500">Ops</span>X
              </h2>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-2 overflow-y-auto flex-1">
          <ul className="flex flex-col gap-1 pb-6">
            {sideBarMenu.map((menu: MenuItem, index: number) => {
              const Icon = menu.icon
              const hasSubmenu = menu?.items && menu.items.length > 0
              const isOpen = openIndex === index
              const isActive =
                menu.href === pathname ||
                menu?.items?.some((sub) => sub.href === pathname)

              return (
                <li key={index} className="relative group">
                  <Link
                    href={menu.href || "#"}
                    onClick={(e) => {
                      if (hasSubmenu) {
                        e.preventDefault()
                        handleToggle(index)
                      } else {
                        handleMobileClose()
                      }
                    }}
                    className={clsx(
                      "group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      collapsed ? "justify-center" : "justify-start",
                      isActive
                        ? "bg-purple-50 dark:bg-purple-900/40 text-gray-900 dark:text-white font-semibold border-l-4 border-purple-500"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    <Icon
                      className={clsx(
                        "shrink-0 text-[20px]",
                        isActive ? "text-purple-600" : "text-gray-600 dark:text-gray-400"
                      )}
                    />
                    {!collapsed && <span>{menu.title}</span>}
                    {hasSubmenu && !collapsed && (
                      <ArrowForwardIosIcon
                        className={clsx(
                          "ml-auto transition-transform duration-300 text-gray-400 dark:text-gray-500",
                          isOpen && "rotate-90"
                        )}
                        sx={{ fontSize: 14 }}
                      />
                    )}
                  </Link>

                  {/* Tooltip when collapsed */}
                  {collapsed && (
                    <div className="absolute left-[72px] top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md">
                      {menu.title}
                    </div>
                  )}

                  {/* Submenu */}
                  {hasSubmenu && !collapsed && (
                    <div
                      className={clsx(
                        "flex flex-col pl-10 overflow-hidden transition-all duration-300 ease-in-out text-sm",
                        isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      {menu.items?.map((item, i) => {
                        const isSubActive = item.href === pathname
                        return (
                          <Link
                            key={i}
                            href={item.href}
                            onClick={handleMobileClose}
                            className={clsx(
                              "flex items-center gap-2 py-2 rounded-md transition-colors",
                              isSubActive
                                ? "text-purple-600 dark:text-purple-400 font-medium"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                            )}
                          >
                            <span className="w-[4px] h-[4px] rounded-full bg-gray-400 dark:bg-gray-500"></span>
                            {item.title}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

    </>
  )
}

export default Sidebar