"use server"

import { ChannelType } from "@prisma/client";
import prisma from "../utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const createChannel = async (
    serverId : string,
    name : string,
    type : ChannelType
)=>{
    const user = await currentUser()
    if (!user) redirect("sign-in")
    await prisma.channel.create({
        data:{
            serverId,
            name,
            type,
            profileId: user.id
        }
    })
};