"use client";
import { useState, useRef } from "react";
import { FiPaperclip, FiSmile } from "react-icons/fi";

interface MessageInputProps {
  onSend: (text: string) => void;
   className?: string; 
}

export function MessageInput({ onSend, className }: MessageInputProps) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
    setShowEmoji(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setText((prev) => prev + emoji);
    setShowEmoji(false);
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onSend(`📎 ${files[0].name}`);
      e.target.value = "";
    }
  };

  return (
        <div className={`p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 ${className || ""}`}>
      <div className="flex items-center gap-2 relative">
        {/* Emoji Picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FiSmile className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          </button>
          {showEmoji && (
            <div className="absolute bottom-10 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg grid grid-cols-6 gap-2 w-48 z-50">
              {["😀","😂","😍","😭","😎","👍","🙏","🎉","💯","🔥","🥳","😢"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="text-lg hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Attach / File */}
        <button
          type="button"
          onClick={handleAttachClick}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FiPaperclip className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          className="flex-1 rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        />

      </div>
    </div>
  );
}
