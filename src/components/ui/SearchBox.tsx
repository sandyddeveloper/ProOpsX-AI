"use client"
import React, { useEffect, useState, useCallback } from "react"
import { IoSearch } from "react-icons/io5"
import { FaTimes } from "react-icons/fa"

interface SearchBoxProps {
  placeholder?: string
  width?: number | string
  suggestions?: string[]
  onSearch?: (query: string) => void
}

const AdvancedSearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search…",
  width = 400,
  suggestions = [],
  onSearch,
}) => {
  const [open, setOpen] = useState(false) // toggle box
  const [query, setQuery] = useState("")
  const [filtered, setFiltered] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Filter suggestions
  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([])
    } else {
      setFiltered(
        suggestions.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      )
    }
  }, [query, suggestions])

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Handle Enter press
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % filtered.length)
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) =>
          prev === 0 ? filtered.length - 1 : prev - 1
        )
      } else if (e.key === "Enter") {
        const selected =
          filtered.length > 0 ? filtered[activeIndex] : query
        onSearch?.(selected)
        setOpen(false)
      } else if (e.key === "Escape") {
        setOpen(false)
      }
    },
    [filtered, activeIndex, query, onSearch]
  )

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border 
                   bg-white dark:bg-gray-900 dark:border-gray-700 
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        style={{ width: typeof width === "number" ? `${width}px` : width }}
      >
        <IoSearch className="text-gray-500" />
        <span className="text-gray-500 text-sm">{placeholder}</span>
        <kbd className="ml-auto text-[11px] bg-black dark:bg-gray-700 px-2 py-0.5 rounded">
          ⌘K
        </kbd>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40">
          <div
            className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
                       rounded-lg shadow-lg w-full max-w-lg"
          >
            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
              <IoSearch size={18} className="text-gray-500" />
              <input
                autoFocus
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 outline-none bg-transparent text-gray-900 dark:text-gray-100 text-sm"
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            {/* Suggestions */}
            {filtered.length > 0 && (
              <ul className="max-h-60 overflow-y-auto text-sm">
                {filtered.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      onSearch?.(item)
                      setOpen(false)
                    }}
                    className={`px-3 py-2 cursor-pointer ${i === activeIndex
                        ? "bg-gray-100 dark:bg-gray-800"
                        : ""
                      }`}
                  >
                    {item.split(new RegExp(`(${query})`, "gi")).map(
                      (part, idx) =>
                        part.toLowerCase() === query.toLowerCase() ? (
                          <span
                            key={idx}
                            className="font-medium text-purple-600 dark:text-purple-400"
                          >
                            {part}
                          </span>
                        ) : (
                          <span key={idx}>{part}</span>
                        )
                    )}
                  </li>
                ))}
              </ul>
            )}

            {query && filtered.length === 0 && (
              <div className="px-3 py-2 text-gray-500 text-sm">
                No results found.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AdvancedSearchBox
