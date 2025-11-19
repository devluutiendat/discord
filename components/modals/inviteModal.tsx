"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateInviteCode } from "@/lib/actions/server-action";

interface InviteFriendsModalProps {
  open: boolean;
  onclose: (open: boolean) => void;
  inviteCode: string;
  serverId: string;
}

export default function InviteModal({
  open,
  serverId,
  inviteCode,
  onclose,
}: InviteFriendsModalProps) {
  const [inviteLink, setInviteLink] = useState(inviteCode);
  const [coppy, setCoppy] = useState(false);
  const link = "http://localhost:3000/invite/";
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${link}${inviteLink}`);
    setCoppy(true);
  };

  const handleGenerateNewLink = async () => {
    const newCode = await generateInviteCode(serverId);
    setInviteLink(newCode);
    setCoppy(false);
  };

  return (
    <Dialog open={open} onOpenChange={onclose}>
      <DialogContent className="w-full max-w-md gap-6 border-0 p-8">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase text-muted-foreground">
              Server Invite Link
            </label>
            <div className="flex gap-2">
              <Input
                value={`${link}${inviteLink}`}
                readOnly
                className="flex-1 bg-muted text-foreground"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleCopyLink}
                className="shrink-0"
              >
                {coppy ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <button
            onClick={() => handleGenerateNewLink()}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Generate a new link
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
