"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { createServer } from "@/lib/actions/server-action";
import { useRouter } from "next/navigation";

interface modalProp {
  open: boolean;
  setOpen?: () => void;
  serverId?: string;
}
export default function serverModal({ open, setOpen }: modalProp) {
  const [serverName, setServerName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      const serverId = await createServer({
        name: serverName,
        imageUrl: res[0].ufsUrl,
      });
      router.push(`/servers/${serverId}`);
    },
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCreate = () => {
    try {
      if (!file) return console.log("No file selected");
      startUpload([file]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Customize your server
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Give your server a personality with a name and an icon. You can
            always change it later.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {file ? (
              <Image
                src={URL.createObjectURL(file)}
                alt="Server Icon"
                width={96}
                height={96}
                className="w-24 h-24 mx-auto mb-3 rounded-full object-cover"
              />
            ) : (
              <CloudUpload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            )}

            <div className="space-y-2">
              <p className="text-blue-600 font-medium text-sm">Choose files</p>
              <p className="text-xs text-muted-foreground">(image 4MB)</p>
            </div>

            <Button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full"
              size="sm"
            >
              Upload
            </Button>
          </div>

          {/* Server Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground tracking-wide">
              SERVER NAME
            </label>
            <Input
              placeholder="Enter server name"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              className="bg-muted/50 border-input"
            />
          </div>
        </div>

        {/* Create Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleCreate}
            disabled={!serverName.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-24"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
