"use client";

import { ChannelType } from "@prisma/client";
import { ServerOptions } from "./serverOptions";
import SearchBar from "./searchBar";
import User from "./user";
import Channels from "./channels";

export interface channelDetail {
  name: string;
  type: ChannelType;
  id: string;
}

interface ChannelSidebarProps {
  serverName: string;
  channels: channelDetail[];
  inviteCode: string;
}

export default function ChannelSidebar({
  serverName,
  channels,
  inviteCode,
}: ChannelSidebarProps) {
  return (
    <aside className="fixed left-20 top-0 h-screen w-72 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Header with Server Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h1 className="font-bold text-white text-sm truncate">
            {serverName}
          </h1>
          <ServerOptions />
        </div>

        {/*search bar*/}
        <SearchBar />
      </div>

      {/* Content - scrollable area */}
      <Channels channelList={channels} />

      {/* Footer - User Profile */}
      <User />
    </aside>
  );
}
