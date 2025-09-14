import React, { useContext } from "react"
import SearchBox from "./ui/SearchBox"
import { Button, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { BsCloudMoon, BsSun } from "react-icons/bs"
import { IoIosNotificationsOutline } from "react-icons/io"
import { ThemeContext } from "@/context/ThemeContext"
import Cookies from "js-cookie";
import UserLabel from "./ui/UserLabel"


interface HeaderProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const Header: React.FC<HeaderProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {

  const context = useContext(ThemeContext)
  const changeTheme = () => {
    const newTheme = context.theme === 'dark' ? 'light' : 'dark';
    context.setTheme(newTheme);
    Cookies.set('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }

  const handleLogout = () => {
    console.log("User logged out!")
  }
  return (
    <header
      className="w-full sticky top-0 z-10 flex items-center justify-between py-3 px-4 shadow-sm 
             border-b-2 border-gray-300 dark:border-medium 
             bg-gray-50 dark:bg-dark transition-colors duration-300"
    >


      {/* Left Section: Sidebar toggle + Search */}
      <div className="flex items-center gap-3">
        {/* Desktop toggle */}
        <div className="hidden lg:block">
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
            className="hover:bg-gray-200 dark:hover:bg-medium rounded-full transition-colors"
          >
            <MenuIcon className="text-gray-700 dark:text-gray-100" />
          </IconButton>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden">
          <IconButton
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open sidebar"
            className="hover:bg-gray-200 dark:hover:bg-medium rounded-full transition-colors"
          >
            <MenuIcon className="text-gray-700 dark:text-gray-100" />
          </IconButton>
        </div>

        {/* Search box visible only on lg+ */}
        <div className="hidden lg:block">
          <SearchBox placeholder="Search here..." width={300} />
        </div>
      </div>

      {/* Right Section: Theme icons */}
      <div className="flex items-center gap-3 text-xl">
        <Button
          onClick={changeTheme}
          className="!min-w-[40px] !w-[40px] !h-[40px] !rounded-full
                 text-gray-700 dark:text-gray-100
                 hover:bg-gray-200 dark:hover:bg-medium transition-colors"
        >
          {context.theme === "dark" ? (
            <BsSun size={22} className="text-yellow-400" />
          ) : (
            <BsCloudMoon size={22} className="text-blue-500" />
          )}
        </Button>

        <Button
          className="!min-w-[40px] !w-[40px] !h-[40px] !rounded-full
                 text-gray-700 dark:text-gray-100
                 hover:bg-gray-200 dark:hover:bg-medium transition-colors"
        >
          <IoIosNotificationsOutline size={22} />
        </Button>

        <div className="flex items-center gap-2">
          <UserLabel
            name="Santhosh Raj"
            email="santhosh@example.com"
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>


  )
}

export default Header
