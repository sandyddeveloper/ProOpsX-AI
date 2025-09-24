"use client";
import React from "react";
import { ChatItem } from "./ChatItem";

interface Chat {
  id: string;
  title: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
  avatarUrl?: string;
}

interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  setActiveChatId: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  activeChatId,
  setActiveChatId,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {chats.map((chat) => (
        <ChatItem
          key={chat.id}
          title={chat.title}
          lastMessage={chat.lastMessage}
          time={chat.time}
          unread={chat.unread}
          avatarUrl={chat.avatarUrl}
          active={chat.id === activeChatId}
          onClick={() => setActiveChatId(chat.id)}
        />
      ))}

      {chats.length === 0 && (
        <div className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          No chats yet
        </div>
      )}
    </div>
  );
};

export default ChatList;
