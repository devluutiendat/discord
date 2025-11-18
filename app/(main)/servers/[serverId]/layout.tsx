import { ServerList } from "@/components/ui/serverSildebar";
import { getServerList } from "@/lib/actions/server-action";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { servers, user: userImageUrl } = await getServerList();
  const { slug } = params;
  return (
    <div className="flex h-screen bg-background">
      <ServerList
        currentServerId={slug}
        servers={servers}
        userImageUrl={userImageUrl}
      />
      {children}
    </div>
  );
}
