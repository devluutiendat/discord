import ServerList from "@/components/ui/serverSidebar";
import { getServerList } from "@/lib/actions/server-action";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) {
  const { servers, user: userImageUrl } = await getServerList();
  const { serverId } = await params;
  return (
    <div className="flex h-screen bg-background">
      <ServerList
        currentServerId={serverId}
        servers={servers}
        userImageUrl={userImageUrl}
      />
      {children}
    </div>
  );
}
