import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"

interface SearchableModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  items: string[]
  onSelect: (item: string | string[]) => void
  multiSelect?: boolean
  selectedItems?: string[]
}

export const SearchableModal: React.FC<SearchableModalProps> = ({
  isOpen,
  onClose,
  title,
  items,
  onSelect,
  multiSelect = false,
  selectedItems = [],
}) => {
  const [query, setQuery] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [selected, setSelected] = useState<string[]>(selectedItems)

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  )

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "ArrowDown") {
        setHighlightedIndex((prev) =>
          prev + 1 < filteredItems.length ? prev + 1 : 0
        )
      } else if (e.key === "ArrowUp") {
        setHighlightedIndex((prev) =>
          prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1
        )
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filteredItems[highlightedIndex]) {
          handleSelect(filteredItems[highlightedIndex])
        }
      } else if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredItems, highlightedIndex])

  const handleSelect = (item: string) => {
    if (multiSelect) {
      let updated
      if (selected.includes(item)) {
        updated = selected.filter((i) => i !== item)
      } else {
        updated = [...selected, item]
      }
      setSelected(updated)
      onSelect(updated)
    } else {
      onSelect(item)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 relative"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-500 transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setHighlightedIndex(0)
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

            {/* Items */}
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const isHighlighted = index === highlightedIndex
                  const isSelected = selected.includes(item)

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(item)}
                      className={`w-full flex justify-between items-center px-3 py-2 rounded-md transition ${isHighlighted
                        ? "bg-indigo-100 dark:bg-neutral-700"
                        : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                        } ${isSelected
                          ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                          : "text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      {item}
                      {multiSelect && isSelected && <Check size={18} />}
                    </button>
                  )
                })
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
                  No results found
                </p>
              )}
            </div>

            {/* Done button for multi-select */}
            {multiSelect && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}