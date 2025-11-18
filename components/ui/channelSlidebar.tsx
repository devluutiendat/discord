"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChannelType } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { useState } from "react";

interface channel {
  name: string;
  type: ChannelType;
  id: string;
}

interface ChannelSidebarProps {
  serverName: string;
  channels: channel[];
  inviteCode: string;
}

export function ChannelSidebar({
  serverName,
  channels,
  inviteCode,
}: ChannelSidebarProps) {
  const [channelSelected, setChannelSelected] = useState("");

  const textChannels = channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const videoChannels = channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  return (
    <aside className="fixed left-20 top-0 h-screen w-72 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Header with Server Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h1 className="font-bold text-white text-sm truncate">
            {serverName}
          </h1>
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
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
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
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Button>
          </div>
          <div className="space-y-1">
            {textChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setChannelSelected(channel.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  channelSelected === channel.id
                    ? "bg-slate-600 text-white"
                    : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                )}
              >
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4 4h2v14h-2zm4-4h2v18h-2z" />
                </svg>
                <span className="truncate">{channel.name}</span>
                {channel.name === "general" && (
                  <svg
                    className="h-3 w-3 ml-auto shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
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
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Button>
          </div>
          <div className="space-y-1">
            {videoChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setChannelSelected(channel.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  channelSelected === channel.id
                    ? "bg-slate-600 text-white"
                    : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                )}
              >
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
                <span className="truncate">{channel.name}</span>
              </button>
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
        </div>
      </div>
    </aside>
  );
}
