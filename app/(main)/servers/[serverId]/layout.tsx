import ServerList from "@/components/ui/serverSidebar";
import { currentUser } from "@clerk/nextjs/server";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;
  const user = await currentUser();
  return (
    <div className="flex h-screen bg-background">
      <ServerList currentServerId={serverId} userImageUrl={user!.imageUrl} />
      {children}
    </div>
  );
}
