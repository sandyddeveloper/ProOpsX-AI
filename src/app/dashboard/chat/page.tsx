"use client";
import { ChatWindow } from "@/components/chat/ChatWindow";
import ChatSidebar from "@/components/chat/Sidebar";
import { useState, useRef } from "react";

export default function ChatApp() {
  const [activeChatId, setActiveChatId] = useState<string | null>("1");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  const chats = [
    { id: "1", title: "Alice", lastMessage: "Hey there!", unread: 2 },
    { id: "2", title: "Bob", lastMessage: "Dinner tonight?", unread: 0 },
  ];

  const messages = [
    { id: "m1", text: "Hello Alice", isMine: true, time: "10:00 AM", date: "2025-09-23" },
    { id: "m2", text: "Hi!", isMine: false, time: "10:01 AM", date: "2025-09-23" },
  ];

  const handleSend = (text: string) => {
    console.log("Send:", text);
  };

  const activeChat = chats.find((c) => c.id === activeChatId);

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setMobileSidebarOpen(false);
  };

  // Touch handlers for swipe-to-close
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchCurrentX.current !== null) {
      const diff = touchCurrentX.current - touchStartX.current;
      // Swipe left to close (threshold 50px)
      if (diff < -50) {
        setMobileSidebarOpen(false);
      }
    }
    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 h-full">
      <div className="relative flex h-full">
        {/* Desktop sidebar */}
        <div className="hidden md:block md:w-[300px] h-full border-r border-gray-200 dark:border-gray-700">
          <ChatSidebar
            chats={chats}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            onNewChat={() => console.log("New Chat clicked")}
          />
        </div>

        {/* Mobile Sidebar overlay with swipe */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-[250px] bg-white dark:bg-gray-900 h-full border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col">
            {/* Close button */}
            <div className="flex justify-end p-2 border-b border-gray-200 dark:border-gray-700">
              <button
                className="text-gray-900 dark:text-gray-100 text-lg font-bold"
                onClick={() => setMobileSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
            <ChatSidebar
              chats={chats}
              activeChatId={activeChatId}
              setActiveChatId={handleSelectChat}
              onNewChat={() => console.log("New Chat clicked")}
            />
          </div>
          {/* Clickable overlay */}
          <div
            className={`flex-1 bg-black bg-opacity-50 transition-opacity duration-300 ${
              mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
        </div>

        {/* Chat Window */}
        <main className="flex-1 flex flex-col h-full">
          {/* Mobile top bar with hamburger */}
          <div className="md:hidden flex items-center p-2 border-b border-gray-200 dark:border-gray-700">
            <button
              className="text-gray-900 dark:text-gray-100 mr-2"
              onClick={() => setMobileSidebarOpen(true)}
            >
              ☰
            </button>
            <div className="font-medium">
              {activeChat ? activeChat.title : "Select a chat"}
            </div>
          </div>

          {activeChat ? (
            <ChatWindow chatTitle={activeChat.title} messages={messages} onSend={handleSend} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                Select a chat to start messaging
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
