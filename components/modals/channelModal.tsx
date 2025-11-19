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

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateChannelModal({
  isOpen,
  onClose,
}: CreateChannelModalProps) {
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("text");

  const handleCreate = () => {
    console.log("Creating channel:", { channelName, channelType });
    setChannelName("");
    setChannelType("text");
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
            <Select value={channelType} onValueChange={setChannelType}>
              <SelectTrigger id="channel-type" className="bg-muted">
                <SelectValue placeholder="Select channel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="voice">Voice</SelectItem>
                <SelectItem value="announcements">Announcements</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
