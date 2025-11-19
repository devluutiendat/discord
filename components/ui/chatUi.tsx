"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MessageCircle, Shield, FileText, Smile } from "lucide-react";
import { Plus, Search, Settings, Hash, Lock, Tv, Moon } from "lucide-react";

interface SidebarProps {
  selectedChannel: string;
  onSelectChannel: (channel: string) => void;
}

export function Sidebar({ selectedChannel, onSelectChannel }: SidebarProps) {
  const textChannels = ["general", "introductions", "announcements"];
  const videoChannels = ["daily"];
  const members = [
    {
      name: "Antonio Erdeljac",
      avatar: "A",
      color: "bg-purple-600",
      isAdmin: true,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Header with Server Icon */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4 gap-2">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-linear-to-br from-red-500 to-yellow-500 text-white font-bold text-sm">
              CA
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-white text-sm truncate">
              Code With Antonio
            </h1>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search"
            className="pl-9 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 h-8 text-xs"
          />
        </div>
      </div>

      {/* Content - scrollable area */}
      <div className="flex-1 overflow-y-auto">
        {/* Text Channels Section */}
        <div className="p-4 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Text Channels
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 hover:bg-slate-700 hover:text-slate-200"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-1">
            {textChannels.map((channel) => (
              <button
                key={channel}
                onClick={() => onSelectChannel(channel)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  selectedChannel === channel
                    ? "bg-slate-600 text-white"
                    : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                )}
              >
                <Hash className="h-4 w-4 shrink-0" />
                <span className="truncate">{channel}</span>
                {channel === "general" && (
                  <Lock className="h-3 w-3 ml-auto shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Video Channels Section */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Video Channels
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 hover:bg-slate-700 hover:text-slate-200"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-1">
            {videoChannels.map((channel) => (
              <button
                key={channel}
                onClick={() => onSelectChannel(channel)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  selectedChannel === channel
                    ? "bg-slate-600 text-white"
                    : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                )}
              >
                <Tv className="h-4 w-4 shrink-0" />
                <span className="truncate">{channel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Members Section */}
        <div className="px-4 pb-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Members
          </h2>
          <div className="space-y-2">
            {members.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback
                    className={`${member.color} text-white text-xs font-bold`}
                  >
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-slate-300 truncate">
                  {member.name}
                </span>
                {member.isAdmin && (
                  <span className="ml-auto text-slate-500" title="Admin">
                    👑
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - User Profile */}
      <div className="p-4 border-t border-slate-700 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-purple-600 text-white font-bold">
              A
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              Antonio E.
            </p>
            <p className="text-xs text-slate-400 truncate">Online</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700"
        >
          <Moon className="h-4 w-4 mr-2" />
          <span className="text-xs">Dark Mode</span>
        </Button>
      </div>
    </aside>
  );
}

interface MessageInputProps {
  channel: string;
}

export function MessageInput({ channel }: MessageInputProps) {
  return (
    <div className="bg-white border-t border-slate-200 p-4">
      <div className="flex items-center gap-3 bg-slate-100 rounded-lg px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-slate-600 hover:text-slate-900"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Input
          placeholder={`Message #${channel}`}
          className="flex-1 bg-transparent border-0 text-slate-900 placeholder:text-slate-500 focus-visible:ring-0"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-slate-600 hover:text-slate-900"
        >
          <Smile className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

interface ChatAreaProps {
  channel: string;
}

interface Message {
  id: string;
  author: string;
  avatar: string;
  color: string;
  content: string;
  timestamp: string;
  isEdited?: boolean;
  isDeleted?: boolean;
  attachment?: {
    type: "file" | "image";
    name?: string;
    src?: string;
  };
}

export function ChatArea({ channel }: ChatAreaProps) {
  const messages: Message[] = [
    {
      id: "1",
      author: "Antonio Erdeljac",
      avatar: "A",
      color: "bg-purple-600",
      content: "this is edited",
      timestamp: "21 Aug 2023, 01:43",
      isEdited: true,
    },
    {
      id: "2",
      author: "Antonio E.",
      avatar: "A",
      color: "bg-purple-600",
      content: "This message has been deleted.",
      timestamp: "21 Aug 2023, 01:44",
      isDeleted: true,
    },
    {
      id: "3",
      author: "Antonio E.",
      avatar: "A",
      color: "bg-purple-600",
      content: "",
      timestamp: "21 Aug 2023, 01:44",
      attachment: {
        type: "file",
        name: "PDF File",
      },
    },
    {
      id: "4",
      author: "Antonio Erdeljac",
      avatar: "A",
      color: "bg-purple-600",
      content: "",
      timestamp: "21 Aug 2023, 01:44",
      attachment: {
        type: "image",
        src: "/earth-planet-blue-space.jpg",
      },
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">#{channel}</h2>
          <p className="text-sm text-slate-600">
            Welcome to the #{channel} channel.
          </p>
        </div>
        <Button variant="default" className="bg-green-600 hover:bg-green-700">
          <MessageCircle className="h-4 w-4 mr-2" />
          Live: Real-Time
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-4">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback
                className={`${message.color} text-white text-sm font-bold`}
              >
                {message.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-slate-900">{message.author}</p>
                <Shield className="h-4 w-4 text-red-500" />
                <p className="text-xs text-slate-500">{message.timestamp}</p>
              </div>
              {message.isDeleted ? (
                <p className="text-sm text-slate-500 italic">
                  This message has been deleted.
                </p>
              ) : (
                <>
                  {message.content && (
                    <p className="text-sm text-slate-700">{message.content}</p>
                  )}
                  {message.isEdited && (
                    <p className="text-xs text-slate-500">(edited)</p>
                  )}
                </>
              )}
              {message.attachment && (
                <div className="mt-3">
                  {message.attachment.type === "file" ? (
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg w-fit border border-slate-200">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {message.attachment.name}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={message.attachment.src || "/placeholder.svg"}
                      alt="Message attachment"
                      className="rounded-lg max-w-sm h-auto object-cover"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
