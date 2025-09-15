"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
    FaBug,
    FaCodeBranch,
    FaTasks,
    FaBell,
    FaSearch,
} from "react-icons/fa";
import { MdOutlineUpdate } from "react-icons/md";
import { Button } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";

// Notification type
interface Notification {
    id: number;
    category: "task" | "bug" | "pr" | "mention" | "system";
    title: string;
    description: string;
    time: string;
    read: boolean;
    priority: "critical" | "high" | "normal";
    href?: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
    {
        id: 1,
        category: "bug",
        title: "Critical Bug Assigned",
        description: "Fix login crash on production",
        time: "2m ago",
        read: false,
        priority: "critical",
        href: "/dashboard/issues/123",
    },
    {
        id: 2,
        category: "pr",
        title: "PR Review Requested",
        description: "Review feature/api-refactor by @alex",
        time: "10m ago",
        read: false,
        priority: "high",
        href: "/dashboard/pull-requests/45",
    },
    {
        id: 3,
        category: "task",
        title: "New Task Assigned",
        description: "Implement user settings page",
        time: "1h ago",
        read: false,
        priority: "normal",
        href: "/dashboard/tasks/78",
    },
    {
        id: 4,
        category: "system",
        title: "System Update",
        description: "Scheduled DB maintenance at 2 AM",
        time: "Yesterday",
        read: true,
        priority: "normal",
    },
];

// Category icons
const categoryIcons: Record<string, JSX.Element> = {
    bug: <FaBug className="text-red-500" />,
    pr: <FaCodeBranch className="text-blue-500" />,
    task: <FaTasks className="text-green-500" />,
    mention: <FaBell className="text-purple-500" />,
    system: <MdOutlineUpdate className="text-gray-500" />,
};

const Notification: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] =
        useState<Notification[]>(mockNotifications);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close when clicked outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Mark all as read
    const markAllRead = () =>
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    // Mark single as read
    const toggleRead = (id: number) =>
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
        );

    // Filter search
    const filtered = notifications.filter(
        (n) =>
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.description.toLowerCase().includes(search.toLowerCase())
    );

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <Button
                onClick={() => setOpen((prev) => !prev)}
                className="!min-w-[40px] !w-[40px] !h-[40px] !rounded-full
                   text-gray-700 dark:text-gray-100
                   hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
            >
                <IoIosNotificationsOutline size={22} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </Button>

            {/* Dropdown / Drawer */}
            {open && (
                <div
                    className={clsx(
                        // Default: normal dropdown (desktop & tablet)
                        "absolute right-0 mt-2 w-[380px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg animate-fadeIn flex flex-col z-[50]",

                        // Override: for small viewports (<= 425px width or <= 490px height)
                        "max-[426px]:fixed max-[426px]:inset-0 max-[426px]:w-full max-[426px]:h-full max-[426px]:rounded-none",
                        "max-h-[491px]:fixed max-h-[491px]:inset-0 max-h-[491px]:w-full max-h-[491px]:h-full max-h-[491px]:rounded-none"
                    )}
                >
                    {/* Mobile Header with Close Button */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                            Notifications
                        </span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={markAllRead}
                                className="text-xs text-purple-600 hover:underline 
             hidden sm:block min-[427px]:block min-h-[492px]:block"
                            >
                                Mark all as read
                            </button>


                            {/* Show Close (X) only on small screens ( ≤ 426px width OR ≤ 491px height ) */}
                            <button
                                onClick={() => setOpen(false)}
                                className="hidden max-[426px]:block max-h-[491px]:block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <FaSearch className="text-gray-400" size={14} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search notifications..."
                            className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200"
                        />
                    </div>

                    {/* Notifications list */}
                    <div className="flex-1 overflow-y-auto">
                        {filtered.length > 0 ? (
                            filtered.map((n) => (
                                <div
                                    key={n.id}
                                    className={clsx(
                                        "flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-800 transition",
                                        !n.read && "bg-purple-50 dark:bg-gray-800/40 hover:bg-purple-100/70"
                                    )}
                                    onClick={() => toggleRead(n.id)}
                                >
                                    <div className="flex-shrink-0">{categoryIcons[n.category]}</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                            {n.title}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {n.description}
                                        </p>
                                        <span className="text-[11px] text-gray-400">{n.time}</span>
                                    </div>
                                    {n.href && (
                                        <Link
                                            href={n.href}
                                            className="text-xs text-purple-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                No notifications
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Notification;
