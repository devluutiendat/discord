import ServerList from "@/components/ui/serverSidebar";
import { userCurrent } from "@/lib/utils/currentUser";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  const user = await userCurrent();
  return (
    <div className="flex h-screen bg-background">
      <ServerList currentServerId={serverId} userImageUrl={user.imageUrl} />
      {children}
    </div>
  );
}
