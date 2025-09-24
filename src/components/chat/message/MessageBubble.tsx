"use client";
import React, { useState } from "react";
import { FiMoreHorizontal, FiThumbsUp, FiTrash2, FiCornerUpLeft } from "react-icons/fi";

interface MessageBubbleProps {
  text: string;
  isMine: boolean;
  time: string;
  seen?: boolean;
}

export function MessageBubble({ text, isMine, time, seen }: MessageBubbleProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2 relative group`}>
      <div
        className={`relative max-w-[80%] p-3 rounded-lg shadow-sm
          ${isMine 
            ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
            : "bg-white text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
          }`}
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        {/* Text */}
        <div className="whitespace-pre-wrap">{text}</div>

        {/* Time & Seen */}
        <div className="flex items-center justify-end mt-1 space-x-1 text-[10px] opacity-80">
          <span>{time}</span>
          {isMine && seen && <span>✓✓</span>}
        </div>

        {/* Emoji Reaction */}
        {reaction && (
          <div className="absolute -top-4 right-0 bg-white dark:bg-gray-800 px-1 py-0.5 rounded-full shadow text-sm">
            {reaction}
          </div>
        )}

        {/* Hover Menu */}
        {showMenu && (
          <div className={`absolute -top-8 right-0 flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded shadow`}>
            <button onClick={() => setReaction("👍")} className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded">
              <FiThumbsUp />
            </button>
            <button className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded">
              <FiCornerUpLeft />
            </button>
            <button className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded">
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
