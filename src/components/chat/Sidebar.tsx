"use client";
import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import { FiMoreVertical, FiSearch, FiX } from "react-icons/fi";

interface Chat {
  id: string;
  title: string;
  lastMessage?: string;
  unread?: number;
  isGroup?: boolean;
}

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  setActiveChatId: (id: string) => void;
  onNewChat?: () => void;
}

type FilterType = "all" | "unread" | "groups";

export default function ChatSidebar({
  chats,
  activeChatId,
  setActiveChatId,
  onNewChat,
}: SidebarProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [highlightIndex, setHighlightIndex] = useState(0);

  // Filter chats by search + tab
  const filteredChats = chats.filter((c) => {
    const matchesSearch = c.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "unread"
        ? c.unread && c.unread > 0
        : c.isGroup;
    return matchesSearch && matchesFilter;
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (filteredChats.length === 0) return;
      if (e.key === "ArrowDown") {
        setHighlightIndex((prev) => (prev + 1) % filteredChats.length);
      } else if (e.key === "ArrowUp") {
        setHighlightIndex(
          (prev) => (prev - 1 + filteredChats.length) % filteredChats.length
        );
      } else if (e.key === "Enter") {
        setActiveChatId(filteredChats[highlightIndex].id);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [filteredChats, setActiveChatId, highlightIndex]);

  return (
    <aside className="md:col-span-1 lg:col-span-1 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
      {/* Profile Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
            U
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              Username
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Online
            </div>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <FiMoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        </button>
      </div>

      {/* Search */}
      <div className="p-3 flex items-center gap-2">
        <FiSearch className="w-5 h-5 text-gray-400 absolute ml-3" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chats"
          className="w-full rounded-lg border border-gray-200 pl-10 pr-8 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-6 text-gray-400 hover:text-gray-600"
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="px-3 flex gap-2 text-sm border-b border-gray-200 dark:border-gray-800">
        {(["all", "unread", "groups"] as FilterType[]).map((tab) => {
          const count =
            tab === "unread"
              ? chats.filter((c) => c.unread && c.unread > 0).length
              : tab === "groups"
              ? chats.filter((c) => c.isGroup).length
              : chats.length;
          return (
            <button
              key={tab}
              onClick={() => {
                setFilter(tab);
                setHighlightIndex(0);
              }}
              className={`px-3 py-2 relative ${
                filter === tab
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {count > 0 && (
                <span className="ml-1 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Chat List */}
      <div className="px-3 pt-3 pb-4 overflow-auto flex-1 custom-scrollbar">
        {filteredChats.length > 0 ? (
          <ChatList
            chats={filteredChats}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
          />
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400 p-4">
            No chats found
          </div>
        )}
      </div>
    </aside>
  );
}
