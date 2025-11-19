"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { channelDetail } from "./channelSidebar";
import { ChannelType } from "@prisma/client";

interface ChannelsProps {
  channelList: channelDetail[];
}

const Channels = ({ channelList }: ChannelsProps) => {
  const [channelSelected, setChannelSelected] = useState("");

  const textChannels = channelList.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const videoChannels = channelList.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  return (
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
  );
};

export default Channels;
