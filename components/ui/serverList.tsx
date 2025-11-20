"use client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Loading from "@/app/loading";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import { getServerList } from "@/lib/actions/server-action";
import { useEffect, useState } from "react";

interface serverListProps {
  currentServerId: string;
}
const ServerList = ({ currentServerId }: serverListProps) => {
  const [servers, setServers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getServerList();
      setServers(res);
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-2">
      {servers.map((server) => (
        <Link
          key={server.id}
          href={`/servers/${server.id}/${server.channels[0].id}`}
          className={cn(
            "relative group px-3",
            currentServerId === server.id &&
              "after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-6 after:bg-white after:rounded-r"
          )}
        >
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              <Loading />
            </AvatarFallback>
            <AvatarImage src={server.imageUrl} />
          </Avatar>
        </Link>
      ))}
    </div>
  );
};

export default ServerList;
