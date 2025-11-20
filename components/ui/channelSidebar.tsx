import { ServerOptions } from "./serverOptions";
import SearchBar from "./searchBar";
import User from "./user";
import { getServerDetailsById } from "@/lib/actions/server-action";
import ChannelList from "./channelList";
import { userCurrent } from "@/lib/utils/currentUser";

interface ChannelSidebarProps {
  channelId: string;
  serverId: string;
}

export default async function ChannelSidebar({
  channelId,
  serverId,
}: ChannelSidebarProps) {
  const serverDetails = await getServerDetailsById(serverId);
  const user = await userCurrent();

  return (
    <aside className="fixed left-20 top-0 h-screen w-72 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* Header with Server Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h1 className="font-bold text-white text-sm truncate">
            {serverDetails.name}
          </h1>
          <ServerOptions
            inviteCode={serverDetails.inviteCode}
            serverId={serverId}
            admin={user.id === serverDetails.profileId}
          />
        </div>

        {/*search bar*/}
        <SearchBar />
      </div>

      {/* Content - scrollable area */}
      <ChannelList channelList={serverDetails.channels} />

      {/* Footer - User Profile */}
      <User />
    </aside>
  );
}
