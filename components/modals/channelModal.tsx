"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createChannel } from "@/lib/actions/channel-action";
import { ChannelType } from "@prisma/client";

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  serverId: string;
}

export function CreateChannelModal({
  isOpen,
  onClose,
  serverId,
}: CreateChannelModalProps) {
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState<ChannelType>(ChannelType.TEXT);

  const handleCreate = async (name: string, type: ChannelType) => {
    await createChannel(serverId, name, type);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Channel</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="channel-name" className="text-sm font-semibold">
              CHANNEL NAME
            </Label>
            <Input
              id="channel-name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Enter channel name"
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="channel-type" className="text-sm font-semibold">
              Channel Type
            </Label>
            <Select
              value={channelType}
              onValueChange={(value) => setChannelType(value as ChannelType)}
            >
              <SelectTrigger id="channel-type" className="bg-muted">
                <SelectValue placeholder="Select channel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ChannelType.TEXT}>
                  {ChannelType.TEXT}{" "}
                </SelectItem>
                <SelectItem value={ChannelType.AUDIO}>
                  {ChannelType.AUDIO}
                </SelectItem>
                <SelectItem value={ChannelType.VIDEO}>
                  {ChannelType.VIDEO}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={() => handleCreate(channelName, channelType)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
