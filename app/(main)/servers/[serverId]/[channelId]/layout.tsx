import { ChannelSidebar } from "@/components/ui/channelSlidebar";
import { getServerDetailsById } from "@/lib/actions/server-action";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string; channelId: string }>;
}) {
  const { serverId, channelId } = await params;
  const serverDetails = await getServerDetailsById(serverId);
  console.log(serverId);

  return (
    <div>
      <ChannelSidebar
        serverName={serverDetails.name}
        inviteCode={serverDetails.inviteCode}
        channels={serverDetails.channels}
      />
      {children}
    </div>
  );
}
