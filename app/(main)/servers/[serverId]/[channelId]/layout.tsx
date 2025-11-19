import ChannelSidebar from "@/components/ui/channelSidebar";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string; channelId: string }>;
}) {
  const { serverId, channelId } = await params;
  return (
    <div>
      <ChannelSidebar serverId={serverId} channelId={channelId} />
      {children}
    </div>
  );
}
