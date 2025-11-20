"use server";
import prisma from "../utils/db";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { userCurrent } from "../utils/currentUser";

export async function createServer(data: { name: string; imageUrl: string }) {
  const { name, imageUrl } = data;
  const user = await userCurrent();
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
    return server.id;
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function updateServer(data: {
  name: string;
  imageUrl: string | null;
  serverId: string;
}) {
  const { name, imageUrl, serverId } = data;
  const user = await userCurrent();
  try {
    await prisma.server.update({
      where: {
        id: serverId,
      },
      data: {
        name,
        ...(imageUrl !== null && { imageUrl }),
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
  const user = await userCurrent();
  if (!user) redirect("/sign-in");
  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: user.id,
        },
      },
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
  return servers;
}

export async function getServerDetailsById(serverId: string) {
  const server = await prisma.server.findUnique({
    where: { id: serverId },
    select: {
      profileId: true,
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
  else
    return {
      profileId: "",
      name: "",
      inviteCode: "",
      channels: [],
    };
}

export async function generateInviteCode(serverId: string) {
  const newInviteCode = uuidv4();
  const profile = await userCurrent();
  await prisma.server.update({
    where: { id: serverId, profileId: profile.id },
    data: {
      inviteCode: newInviteCode,
    },
  });
  return newInviteCode;
}

export async function deleteServer(serverId: string) {
  await prisma.server.delete({
    where: {
      id: serverId,
    },
  });
}

export async function getDetail(serverId: string) {
  const detail = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    select: {
      name: true,
      imageUrl: true,
    },
  });
  return detail;
}
