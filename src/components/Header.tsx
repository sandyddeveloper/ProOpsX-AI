"use client";
import React, { useContext } from "react";
import SearchBox from "./ui/SearchBox";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BsCloudMoon, BsSun } from "react-icons/bs";
import { ThemeContext } from "@/context/ThemeContext";
import Cookies from "js-cookie";
import UserLabel from "./ui/UserLabel";
import Notification from "./ui/Notification";
import axios from "axios";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const context = useContext(ThemeContext);


  const { user, loading, error } = useUser(true);


  const changeTheme = () => {
    const newTheme = context.theme === "dark" ? "light" : "dark";
    context.setTheme(newTheme);
    Cookies.set("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/signout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/auth/signin";
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = "/auth/signin";
    }
  };

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
          <SearchBox
            placeholder="Search here..."
            width={300}
            suggestions={["a", "b", "c"]}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 text-xl">
        {/* Theme toggle */}
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

        {/* Notifications */}
        <Notification />

        {/* User info */}
        <div className="flex items-center gap-2">
          {loading ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : error ? (
            <span className="text-sm text-red-500">{error}</span>
          ) : user ? (
            <UserLabel
              name={`${user.username} - ${user.role?.toUpperCase()}`}
              email={user.email}
              onLogout={handleLogout}
            />
          ) : (
            <span className="text-sm text-gray-500">No user</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
