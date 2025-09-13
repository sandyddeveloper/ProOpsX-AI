import React from 'react'
import SearchBox from './ui/SearchBox'

const Header = () => {
  return (
    <header className="w-full sticky top-0 z-10 bg-gray-50 flex items-center gap-2 py-2 px-4 shadow-sm">
      <SearchBox placeholder="Search here..." width={300}/>
    </header>
  )
}

export default Header
