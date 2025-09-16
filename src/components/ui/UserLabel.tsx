"use client"
import React, { useEffect, useRef, useState, Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { FaUser, FaCog, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa"
import { MdCircle } from "react-icons/md"

interface UserDropdownProps {
  name: string
  email: string
  onLogout: () => void
}

const UserLabel: React.FC<UserDropdownProps> = ({ name, email, onLogout }) => {
  const [status, setStatus] = useState<"active" | "dnd">("active")
  const [darkMode, setDarkMode] = useState(false)
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault()
        setOpen((prev) => !prev)
        buttonRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeydown)
    return () => window.removeEventListener("keydown", handleKeydown)
  }, [])

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full 
                   bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-semibold 
                   hover:scale-105 transition-transform focus:outline-none shadow-md"
      >
        {name.charAt(0).toUpperCase()}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
            status === "active" ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        show={open}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          static
          className="absolute right-0 mt-3 w-72 origin-top-right divide-y divide-gray-200 dark:divide-gray-700 
                     rounded-xl bg-white dark:bg-gray-900 shadow-xl ring-1 ring-black/10 
                     focus:outline-none z-50 overflow-hidden"
        >
          <div className="px-5 py-4 flex items-center gap-3 bg-gray-50 dark:bg-gray-800">
            <div className="w-10 h-10 flex items-center justify-center rounded-full 
                            bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{email}</p>
            </div>
          </div>

          <div className="px-3 py-2 text-sm">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</p>
            <div className="space-y-1">
              <button
                onClick={() => setStatus("active")}
                className={`flex items-center w-full px-3 py-2 rounded-lg transition text-gray-700 dark:text-gray-100 ${
                  status === "active"
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <MdCircle className="text-green-500 mr-2" /> Active
              </button>
              <button
                onClick={() => setStatus("dnd")}
                className={`flex items-center w-full px-3 py-2 rounded-lg transition text-gray-700 dark:text-gray-100 ${
                  status === "dnd"
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <MdCircle className="text-red-500 mr-2" /> Do Not Disturb
              </button>
            </div>
          </div>

          <div className="px-3 py-2 space-y-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex items-center w-full px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-100 ${
                    active ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <FaUser className="mr-2 text-gray-500 dark:text-gray-400" /> Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex items-center w-full px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-100 ${
                    active ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <FaCog className="mr-2 text-gray-500 dark:text-gray-400" /> Settings
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="px-3 py-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    onLogout()
                    setOpen(false)
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-lg text-sm text-red-600 ${
                    active
                      ? "bg-red-100 dark:bg-red-800"
                      : "hover:bg-red-50 dark:hover:bg-red-800/50"
                  }`}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
            Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl + Shift + P</kbd> to toggle
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserLabel
