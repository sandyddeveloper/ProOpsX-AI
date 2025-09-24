"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { DateDivider } from "./message/DateDivider";
import { MessageBubble } from "./message/MessageBubble";
import { MessageInput } from "./message/MessageInput";
import { FiSearch, FiPhone, FiVideo, FiMoreVertical, FiChevronDown, FiSend } from "react-icons/fi";

export interface ChatMessage {
  id: string;
  text: string;
  isMine: boolean;
  time: string;
  date: string;
  seen?: boolean;
}

export function ChatWindow({
  chatTitle,
  chatAvatar,
  chatStatus = "online",
  messages,
  onSend,
}: {
  chatTitle: string;
  chatAvatar?: string;
  chatStatus?: string;
  messages: ChatMessage[];
  onSend: (text: string) => void;
}) {
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Group messages by date
  const grouped = useMemo(() => {
    const map: Record<string, ChatMessage[]> = {};
    messages.forEach((m) => {
      if (!map[m.date]) map[m.date] = [];
      map[m.date].push(m);
    });
    return map;
  }, [messages]);

  // Auto-scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    endRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show scroll-to-bottom button
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const isBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 10;
      setShowScrollBtn(!isBottom);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Fake typing indicator
  useEffect(() => {
    if (messages.length && !messages[messages.length - 1].isMine) {
      setIsTyping(true);
      const t = setTimeout(() => setIsTyping(false), 1500);
      return () => clearTimeout(t);
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 relative w-full min-w-[320px]">
      {/* Header */}
      <div className="px-3 sm:px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-20">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center overflow-hidden flex-shrink-0">
            {chatAvatar ? (
              <img src={chatAvatar} alt={chatTitle} className="w-full h-full object-cover" />
            ) : (
              <span className="text-indigo-700 font-bold">{chatTitle[0]}</span>
            )}
          </div>
          <div className="flex flex-col truncate min-w-0">
            <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {chatTitle}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{chatStatus}</span>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4 text-gray-500 flex-shrink-0">
          <FiSearch size={20} className="cursor-pointer hover:text-gray-700" />
          <FiPhone size={20} className="cursor-pointer hover:text-gray-700" />
          <FiVideo size={20} className="cursor-pointer hover:text-gray-700" />
          <FiMoreVertical size={20} className="cursor-pointer hover:text-gray-700" />
        </div>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto px-2 sm:px-4 py-4 space-y-4 relative scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
      >
        {Object.keys(grouped).map((date) => (
          <div key={date}>
            <DateDivider label={date} />
            {grouped[date].map((m) => (
              <MessageBubble
                key={m.id}
                text={m.text}
                isMine={m.isMine}
                time={m.time}
                seen={m.isMine ? m.seen : undefined}
              />
            ))}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 px-3 text-sm text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
            <span>typing...</span>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollBtn && (
        <button
          onClick={() => scrollToBottom("smooth")}
          className="absolute bottom-24 sm:bottom-28 right-4 sm:right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg z-30"
        >
          <FiChevronDown className="w-5 h-5" />
        </button>
      )}

      {/* Responsive Input */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-900 z-20 border-t border-gray-200 dark:border-gray-800 p-2 sm:p-4 flex items-center gap-2">
        <MessageInput
          onSend={onSend}
          className="flex-1 resize-none min-h-[36px] max-h-40 overflow-auto px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          onClick={() => {
            const inputEl = document.querySelector<HTMLTextAreaElement>(".message-input");
            if (inputEl && inputEl.value.trim()) {
              onSend(inputEl.value);
              inputEl.value = "";
            }
          }}
          className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full text-white flex items-center justify-center shadow-lg"
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
}
