"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Settings,
  Users,
  Plus,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { deleteServer } from "@/lib/actions/server-action";
import { ManageMembersModal } from "../modals/memberModal";
// import CreateChannelModal from "../modals/channelModal";
import InviteModal from "../modals/inviteModal";

interface ServerOptionProps {
  inviteCode: string;
  serverId: string;
}
export function ServerOptions({ inviteCode, serverId }: ServerOptionProps) {
  const [channelModal, setchannelModal] = useState(false);
  const [memberModal, setMemberModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);

  const onDeleteServer = async () => {
    await deleteServer();
  };
  const onServerSettings = () => {};
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md bg-slate-600 hover:bg-muted"
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={() => setInviteModal(true)}
          className="cursor-pointer"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Invite People</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onServerSettings} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Server Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setMemberModal(true)}
          className="cursor-pointer"
        >
          <Users className="mr-2 h-4 w-4" />
          <span>Manage Members</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setchannelModal(true)}
          className="cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>Create Channel</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onDeleteServer}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete Server</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ManageMembersModal
        isOpen={memberModal}
        onClose={() => setMemberModal(false)}
        serverId={serverId}
      />
      {/* <CreateChannelModal /> */}
      <InviteModal
        open={inviteModal}
        inviteCode={inviteCode}
        serverId={serverId}
        onclose={() => setInviteModal(false)}
      />
    </DropdownMenu>
  );
}
