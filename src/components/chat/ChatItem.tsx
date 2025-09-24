"use client";
import React from "react";

interface ChatItemProps {
  title: string;
  lastMessage?: string;
  time?: string;            // ✅ add this
  active: boolean;
  unread?: number;
  avatarUrl?: string;       // ✅ add this
  onClick: () => void;
}

export function ChatItem({
  title,
  lastMessage,
  time,
  active,
  unread,
  avatarUrl,
  onClick,
}: ChatItemProps) {
  return (
    <button
      onClick={onClick}
      className={`group w-full flex gap-3 items-center px-3 py-2 rounded-lg transition-colors duration-150 text-left
        ${active ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-100 dark:hover:bg-gray-800"}
        focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={title}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
            {title[0]}
          </div>
        )}
        {unread ? (
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <div className="truncate font-medium text-gray-900 dark:text-gray-100">
            {title}
          </div>
          {time && (
            <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
              {time}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm mt-1">
          <div className="truncate text-gray-500 dark:text-gray-400">
            {lastMessage ?? "No messages yet"}
          </div>

          {unread ? (
            <div
              className={`ml-2 flex items-center justify-center min-w-[20px] h-5 px-2 rounded-full text-xs font-medium
                ${active ? "bg-indigo-600 text-white" : "bg-green-500 text-white"}
              `}
            >
              {unread > 99 ? "99+" : unread}
            </div>
          ) : null}
        </div>
      </div>
    </button>
  );
}
