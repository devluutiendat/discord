import { ServerList } from "@/components/ui/serversSildebar";
import { serverList } from "@/lib/actions/server-action";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const { servers, user: userImageUrl } = await serverList();
  const { slug } = params;
  return (
    <div className="flex h-screen bg-background">
      <ServerList
        currentId={slug}
        servers={servers}
        userImageUrl={userImageUrl}
      />
      {children}
    </div>
  );
}
