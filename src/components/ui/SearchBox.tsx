import React from "react"
import { IoSearch } from "react-icons/io5"

interface SearchBoxProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  width?: number | string // allow numbers (px) or Tailwind strings
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder,
  value,
  onChange,
  width = 400, 
}) => {
  return (
    <div
      className="searchBox relative"
      style={{ width: typeof width === "number" ? `${width}px` : width }}
    >
      <IoSearch
        size={18}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        placeholder={placeholder}
        aria-label={placeholder || "Search"}
        value={value}
        onChange={onChange}
        className="w-full h-[40px] outline-none border border-gray-300 rounded-md pl-10 pr-3 text-sm 
                   focus:border-gray-500 focus:ring-1 focus:ring-gray-400 transition text-black"
      />
    </div>
  )
}

export default SearchBox
