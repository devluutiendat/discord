"use client";

import { useState, useRef, useEffect } from "react";
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
import {
  createServer,
  getDetail,
  updateServer,
} from "@/lib/actions/server-action";
import { useRouter } from "next/navigation";

interface ModalProps {
  open: boolean;
  setOpen?: (value: boolean) => void;
  serverId?: string;
}

export default function ServerModal({ open, setOpen, serverId }: ModalProps) {
  const [serverName, setServerName] = useState("");
  const [oldImage, setOldImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const isEditMode = Boolean(serverId);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      const imageUrl = res?.[0]?.ufsUrl ?? null;

      if (isEditMode) {
        await updateServer({ name: serverName, imageUrl, serverId: serverId! });
      } else {
        const newId = await createServer({ name: serverName, imageUrl });
        router.push(`/servers/${newId}`);
      }

      setOpen?.(false);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setOldImage(null);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode && !file && oldImage) {
        await updateServer({
          name: serverName,
          imageUrl: null,
          serverId: serverId!,
        });
        setOpen?.(false);
        return;
      }

      if (file) {
        startUpload([file]);
        return;
      }

      if (!isEditMode) {
        console.log("No file selected");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!serverId) return;
    async function load() {
      const detail = await getDetail(serverId as string);
      if (detail) {
        setServerName(detail.name);
        setOldImage(detail.imageUrl);
      }
    }

    load();
  }, [serverId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {isEditMode ? "Edit Server" : "Create Server"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Upload Area */}
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
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
                alt="Upload preview"
                width={96}
                height={96}
                className="w-24 h-24 mx-auto mb-3 rounded-full object-cover"
              />
            ) : oldImage ? (
              <Image
                src={oldImage}
                alt="Server Icon"
                width={96}
                height={96}
                className="w-24 h-24 mx-auto mb-3 rounded-full object-cover"
              />
            ) : (
              <CloudUpload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            )}

            <Button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 w-full"
              size="sm"
            >
              Upload
            </Button>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wide">
              SERVER NAME
            </label>
            <Input
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              placeholder="Enter server name"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            disabled={!serverName.trim()}
            onClick={handleSubmit}
            className="min-w-24"
          >
            {isEditMode ? "Update" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
