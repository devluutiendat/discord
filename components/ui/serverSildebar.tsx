"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import { AvatarImage } from "@radix-ui/react-avatar";
import InitiaModal from "../modals/initia-modal";
import Loading from "@/app/loading";
import Link from "next/link";

interface server {
  id: string;
  imageUrl: string;
}
interface serverListProps {
  servers: server[];
  userImageUrl: string;
  currentServerId: string;
}
export function ServerList({
  servers,
  userImageUrl,
  currentServerId,
}: serverListProps) {
  const [modal, setModal] = useState(false);
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-4 gap-2">
      <InitiaModal open={modal} setOpen={() => setModal(false)} />

      {/* Add Server Button */}
      <Button
        variant="ghost"
        onClick={() => setModal(true)}
        size="icon"
        className="h-12 w-12 rounded-full text-green-500 hover:text-green-400 bg-slate-700 hover:bg-slate-800"
        title="Add Server"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Button>

      {/* Divider */}
      <div className="w-8 h-px bg-slate-700" />

      {/* Server List */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {servers.map((server) => (
          <Link
            key={server.id}
            href={`/servers/${server.id}`}
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

      {/* Divider */}
      <div className="w-8 h-px bg-slate-700" />

      {/* user image*/}
      <Image
        src={userImageUrl || "/placeholder.svg"}
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
    </aside>
  );
}
