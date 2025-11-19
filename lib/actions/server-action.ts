"use server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "../utils/db";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

export async function createServer(data: { name: string; imageUrl: string }) {
  const { name, imageUrl } = data;
  const user = await currentUser();
  if (!user) return redirect("sign-in");
  try {
    const server = await prisma.server.create({
      data: {
        id: uuidv4(),
        name,
        imageUrl,
        profileId: user.id,
        inviteCode: uuidv4(),
        channels: {
          create: {
            name: "general",
            profileId: user.id,
          },
        },
        members: {
          create: {
            profileId: user.id,
            role: MemberRole.ADMIN,
          },
        },
      },
    });
    return server.id
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function updateServer(data: { name: string; imageUrl: string, serverId : string }) {
  const { name, imageUrl, serverId } = data;
  const user = await currentUser();
  if (!user) return redirect("sign-in");
  try {
    await prisma.server.update({
      where:{
        id: serverId
      },
      data: {
        name,
        imageUrl,
      },
    });
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function getServerList() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const servers = await prisma.server.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      imageUrl: true,
      name: true,
      channels: {
        orderBy: { createdAt: "asc" },
        take: 1,
        select: { id: true },
      },

    },
  });
  return {
    servers: servers,
    user: user.imageUrl,
  };
}

export async function getServerDetailsById(serverId: string) {
  const server = await prisma.server.findUnique({
    where: { id: serverId },
    select: {
      name: true,
      inviteCode: true,
      channels: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
  });
  if (server) return server;
  else return {
    name: "",
    inviteCode: "",
    channels: []
  }
}

export async function deleteServer(){
}

