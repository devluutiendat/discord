"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import InitiaModal from "../modals/serverModal";
import ServerList from "./serverList";

interface serverSideserverSidebarProps {
  currentServerId: string;
  userImageUrl: string;
}
export default function serverSidebar({
  currentServerId,
  userImageUrl,
}: serverSideserverSidebarProps) {
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

      <ServerList currentServerId={currentServerId} />

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
