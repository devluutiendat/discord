"use client";
import { MoreVertical, Shield, ShieldOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  deleteMember,
  getMembers,
  updateMemberRole,
} from "@/lib/actions/member-action";
import { MemberRole } from "@prisma/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ManageMembersModalProps {
  isOpen: boolean;
  serverId: string;
  onClose: () => void;
}

export function ManageMembersModal({
  isOpen,
  onClose,
  serverId,
}: ManageMembersModalProps) {
  const [members, setMembers] = useState<any[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMembers(serverId);
      setMembers(res);
      console.log("this is ", res);
    };
    fetchData();
  }, []);

  const handleChange = async (memberId: string, role: MemberRole) => {
    await updateMemberRole(memberId, role);
  };
  const handleKick = async (memberId: string) => {
    await deleteMember(memberId);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Members</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {members?.length} {members?.length === 1 ? "Member" : "Members"}
          </p>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {members?.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No members yet
            </p>
          ) : (
            members?.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
              >
                {/* Member Info */}
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.profile.imageUrl} />
                  </Avatar>

                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {member.profile.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {member.profile.email}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-2">
                  <Badge
                    className={cn(
                      "text-xs",
                      member.role === MemberRole.ADMIN && "bg-blue-300"
                    )}
                  >
                    {member.role}
                  </Badge>
                  {member.role !== MemberRole.ADMIN && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <Shield size={16} className="mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuCheckboxItem
                              checked={member.role === MemberRole.GUEST}
                              onCheckedChange={() =>
                                handleChange(member.id, MemberRole.GUEST)
                              }
                            >
                              <ShieldOff size={16} className="mr-2" />
                              Guest
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={member.role === member.Moderator}
                              onCheckedChange={() =>
                                handleChange(member.id, MemberRole.MODERATOR)
                              }
                            >
                              <Shield size={16} className="mr-2" />
                              Moderator
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuItem
                          onClick={() => handleKick(member.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <span className="mr-2">⚠️</span>
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
