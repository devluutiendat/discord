"use server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "../utils/db";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";


export async function createServer(data: { name: string; imageUrl: string }) {
  const { name, imageUrl } = data;
  try {
    const user = await currentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });
   
    await prisma.server.create({
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
    console.log("succes");
    
    return {
      status: 200,
      message: "Server created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}
